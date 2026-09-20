"use client";

import { useEffect, useRef, useState, type ElementType, type ReactNode } from "react";

/* ------------------------------------------------------------------------
   Les entrées en scène.

   Un seul principe tenu partout : rien ne surgit, tout s'éclaire ou se lève
   de derrière un cache. Jamais de « fade-in-up » générique.

   RÈGLE DE SÛRETÉ — du contenu ne doit JAMAIS pouvoir rester invisible.
   L'état caché n'est appliqué que sous `html[data-js]`, un attribut posé par
   un script en ligne dans le <head> : sans JavaScript, le texte est là, point.
   Et si l'IntersectionObserver tarde ou ne se déclenche pas (onglet en
   arrière-plan, navigateur qui bride), un garde-fou révèle tout au bout d'une
   seconde et demie.
   ------------------------------------------------------------------------ */

function useEnVue<T extends HTMLElement>(seuil = 0.15) {
  const ref = useRef<T>(null);
  const [vu, setVu] = useState(false);

  useEffect(() => {
    const noeud = ref.current;
    if (!noeud) return;

    if (
      window.matchMedia("(prefers-reduced-motion: reduce)").matches ||
      typeof IntersectionObserver === "undefined"
    ) {
      setVu(true);
      return;
    }

    const obs = new IntersectionObserver(
      ([e]) => {
        if (e.isIntersecting) {
          setVu(true);
          obs.disconnect();
        }
      },
      { rootMargin: "0px 0px -10% 0px", threshold: seuil },
    );
    obs.observe(noeud);

    // Garde-fou : si rien ne s'est déclenché, on montre quand même ce qui est
    // déjà dans le champ. Mieux vaut une animation manquée qu'un texte perdu.
    const secours = window.setTimeout(() => {
      const r = noeud.getBoundingClientRect();
      if (r.top < window.innerHeight && r.bottom > 0) setVu(true);
    }, 1500);

    return () => {
      obs.disconnect();
      window.clearTimeout(secours);
    };
  }, [seuil]);

  return { ref, vu };
}

/**
 * Titre qui se lève ligne par ligne derrière un cache, comme un texte qui
 * monte des dessous. Passez les lignes déjà coupées : la coupe est un choix
 * typographique, pas un hasard de largeur.
 */
export function TitreLeve({
  lignes,
  balise: Balise = "h2",
  className = "",
  delai = 0,
}: {
  /**
   * Les lignes, déjà coupées : la coupe d'un titre est un choix
   * typographique, pas un hasard de largeur de colonne.
   * Un segment entre astérisques passe en orange de scène.
   */
  lignes: string[];
  balise?: ElementType;
  className?: string;
  delai?: number;
}) {
  const { ref, vu } = useEnVue<HTMLHeadingElement>(0.15);

  return (
    <Balise ref={ref} className={className}>
      {lignes.map((ligne, i) => (
        <span key={ligne} className="leve-cache">
          <span
            className="leve-ligne"
            data-vu={vu ? "1" : undefined}
            style={{ transitionDelay: `${delai + i * 90}ms` }}
          >
            {ligne.split("*").map((bout, j) =>
              j % 2 ? (
                <span key={bout} className="text-scene">
                  {bout}
                </span>
              ) : (
                bout
              ),
            )}
          </span>
        </span>
      ))}
    </Balise>
  );
}

/** Bloc qui s'éclaire : opacité, et un cache qui se lève par le bas. */
export function Apparition({
  children,
  delai = 0,
  className = "",
}: {
  children: ReactNode;
  delai?: number;
  className?: string;
}) {
  const { ref, vu } = useEnVue<HTMLDivElement>();

  return (
    <div
      ref={ref}
      className={`apparition ${className}`}
      data-vu={vu ? "1" : undefined}
      style={{ transitionDelay: `${delai}ms` }}
    >
      {children}
    </div>
  );
}

/** Filet qui se trace de gauche à droite quand il entre dans le champ. */
export function FiletTrace({ className = "" }: { className?: string }) {
  const { ref, vu } = useEnVue<HTMLDivElement>(0.4);
  return (
    <div ref={ref} className={`h-px w-full bg-ivoire/15 ${className}`}>
      <div className="filet-trace h-px bg-scene" data-vu={vu ? "1" : undefined} />
    </div>
  );
}

/**
 * Chiffre qui se compose à l'arrivée dans le champ. Le défilement s'arrête sur
 * la valeur exacte : pas d'approximation, ce sont des indicateurs Qualiopi.
 *
 * La valeur finale est rendue côté serveur, donc lisible sans JavaScript et
 * par les lecteurs d'écran ; seule l'animation est ajoutée après coup.
 */
export function Compteur({
  valeur,
  suffixe = "",
  duree = 1500,
}: {
  valeur: number;
  suffixe?: string;
  duree?: number;
}) {
  const { ref, vu } = useEnVue<HTMLSpanElement>(0.3);
  const [n, setN] = useState<number | null>(null);

  useEffect(() => {
    if (!vu) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      setN(valeur);
      return;
    }

    let brut = 0;
    const depart = performance.now();
    const pas = (t: number) => {
      const p = Math.min(1, (t - depart) / duree);
      // Décélération franche : le chiffre se pose, il ne freine pas mollement.
      const e = 1 - Math.pow(1 - p, 4);
      setN(Math.round(valeur * e));
      if (p < 1) brut = requestAnimationFrame(pas);
    };
    brut = requestAnimationFrame(pas);
    return () => cancelAnimationFrame(brut);
  }, [vu, valeur, duree]);

  return (
    <span ref={ref} className="tnum">
      {(n ?? valeur).toLocaleString("fr-FR")}
      {suffixe}
    </span>
  );
}
