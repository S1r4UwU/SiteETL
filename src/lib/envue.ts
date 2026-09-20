/**
 * Registre d'entrée dans le champ.
 *
 * POURQUOI PAS SEULEMENT UN IntersectionObserver : parce qu'il n'est pas
 * fiable à 100 %. Onglet en arrière-plan, fenêtre sans focus, navigateur qui
 * bride le compositing — il arrive qu'il ne se déclenche jamais. Et comme nos
 * animations d'entrée partent d'un état caché, un observateur muet, c'est du
 * contenu définitivement invisible. C'est inacceptable.
 *
 * Le dispositif est donc à deux étages :
 *   1. un IntersectionObserver, qui fait le travail dans le cas normal ;
 *   2. un contrôle au défilement, partagé par TOUS les éléments (un seul
 *      écouteur pour la page, pas un par bloc), qui rattrape les cas où le
 *      premier reste silencieux.
 *
 * Un élément révélé sort des deux registres : on ne mesure jamais deux fois.
 */

type Entree = { noeud: Element; reveler: () => void; marge: number };

const registre = new Set<Entree>();
let ecouteurPose = false;
let dernier = 0;
let differe = 0;
const PAS = 90;

function visible(noeud: Element, marge: number) {
  const r = noeud.getBoundingClientRect();
  const hauteur = window.innerHeight || document.documentElement.clientHeight;
  // Un seul test : le bloc est-il monté assez haut ? Il est donc vrai aussi
  // quand on l'a dépassé (top négatif) — et c'est voulu. En défilement rapide,
  // un bloc peut passer d'« encore dessous » à « déjà au-dessus » entre deux
  // images : exiger qu'il soit dans la fenêtre à l'instant du contrôle le
  // laisserait caché pour toujours.
  return r.top < hauteur - marge;
}

function balayer() {
  differe = 0;
  dernier = Date.now();
  for (const e of registre) {
    if (visible(e.noeud, e.marge)) {
      registre.delete(e);
      e.reveler();
    }
  }
  if (registre.size === 0 && ecouteurPose) {
    window.removeEventListener("scroll", programmer);
    window.removeEventListener("resize", programmer);
    ecouteurPose = false;
  }
}

/**
 * Étranglement par horloge, et NON par requestAnimationFrame.
 *
 * rAF ne s'exécute pas quand la page ne dessine pas — fenêtre au second plan,
 * onglet masqué, compositeur en pause. Un registre qui en dépend cesse alors
 * de révéler quoi que ce soit, et le contenu reste caché. Un minuteur, lui,
 * tourne toujours. Le balayage est bon marché : quelques mesures sur un
 * ensemble qui ne fait que rétrécir.
 */
function programmer() {
  if (differe) return;
  const attente = Math.max(0, PAS - (Date.now() - dernier));
  differe = window.setTimeout(balayer, attente);
}

/**
 * Inscrit un élément. Retourne la fonction de désinscription.
 * `reveler` peut être appelée immédiatement si l'élément est déjà dans le champ.
 */
export function surveiller(
  noeud: Element,
  reveler: () => void,
  marge = 0.1,
): () => void {
  const hauteur = window.innerHeight || document.documentElement.clientHeight;
  const entree: Entree = { noeud, reveler, marge: hauteur * marge };

  // Déjà visible au montage : inutile d'attendre quoi que ce soit.
  if (visible(noeud, entree.marge)) {
    reveler();
    return () => {};
  }

  registre.add(entree);
  if (!ecouteurPose) {
    window.addEventListener("scroll", programmer, { passive: true });
    window.addEventListener("resize", programmer);
    ecouteurPose = true;
  }

  let obs: IntersectionObserver | null = null;
  if (typeof IntersectionObserver !== "undefined") {
    obs = new IntersectionObserver(
      ([e]) => {
        if (e.isIntersecting) {
          registre.delete(entree);
          obs?.disconnect();
          reveler();
        }
      },
      { rootMargin: `0px 0px -${Math.round(marge * 100)}% 0px` },
    );
    obs.observe(noeud);
  }

  return () => {
    registre.delete(entree);
    obs?.disconnect();
  };
}
