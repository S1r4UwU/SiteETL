import { photos, type Media } from "@/content/medias";

/**
 * Retrouve les photographies où une personne apparaît en scène.
 *
 * Les crédits de l'ancien site nomment les comédiennes et comédiens sur
 * certaines images. Deux des alumni dont le site publie le témoignage —
 * Clara Last et Perle Andremont-Dimanche — y figurent. On peut donc les
 * montrer en scène, à vingt ans, dans le spectacle qu'elles racontent.
 *
 * La comparaison se fait sur le NOM DE FAMILLE en majuscules, parce que c'est
 * ainsi que les crédits sont écrits, et sur le prénom : « Perle Dimanche » sur
 * la page alumni est « Perle ANDREMONT-DIMANCHE » dans les crédits.
 */
function normaliser(s: string) {
  return s
    .normalize("NFD")
    .replace(/[̀-ͯ]/g, "")
    .toLowerCase();
}

export function photosDe(nomComplet: string): Media[] {
  const morceaux = normaliser(nomComplet)
    .split(/[\s-]+/)
    .filter((m) => m.length > 3);
  if (morceaux.length === 0) return [];

  return photos.filter((p) => {
    if (!p.enScene) return false;
    const credit = normaliser(p.enScene);
    // Il faut au moins deux correspondances — prénom ET nom — pour éviter
    // qu'un homonyme partiel ne fasse remonter la mauvaise photographie.
    const touches = morceaux.filter((m) => credit.includes(m)).length;
    return touches >= 2;
  });
}
