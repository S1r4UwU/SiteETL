/**
 * Les promotions.
 *
 * Chaque promotion de l'École de Théâtre de Lyon porte le nom d'un artiste,
 * choisi par les élèves. Ariane Mnouchkine, Jean-Pierre Bacri, Meryl Streep,
 * Pierre Niney, Samuel Beckett, Kae Tempest.
 *
 * C'est l'élément le plus attachant de toute la matière de l'école — et il
 * n'apparaissait NULLE PART sur l'ancien site, sinon enfoui dans les légendes
 * des photos de galerie, d'où il a été récolté. Un tel détail ne s'invente pas :
 * il se trouve. C'est exactement ce qui donne une âme à un site et qu'aucun
 * gabarit ne fournira jamais.
 *
 * À COMPLÉTER PAR L'ÉCOLE : les années exactes de chaque promotion, les noms
 * manquants avant 2021, et l'accord des élèves pour la publication nominative
 * (usage courant au théâtre, mais qui se demande).
 */

export type Promotion = {
  nom: string;
  /** L'artiste dont la promotion porte le nom, en une ligne. */
  qui: string;
  /** Années de présence à l'école, telles que relevées. */
  periode?: string;
  /** Spectacles retrouvés pour cette promotion. */
  spectacles?: string[];
};

export const promotions: Promotion[] = [
  {
    nom: "Kae Tempest",
    qui: "Poète, slameur et dramaturge britannique",
    periode: "Entrée en 2025",
  },
  {
    nom: "Samuel Beckett",
    qui: "Auteur d'En attendant Godot, prix Nobel de littérature 1969",
    periode: "Sortie en 2026",
    spectacles: ["nombrils-cabaret-panique-au-music-hall"],
  },
  {
    nom: "Meryl Streep",
    qui: "Actrice américaine, formée à la Yale School of Drama",
    periode: "Relevée en 2023",
    spectacles: ["jouer-pour-l-ombre"],
  },
  {
    nom: "Pierre Niney",
    qui: "Acteur français, plus jeune pensionnaire de la Comédie-Française",
    periode: "Relevée en 2023",
  },
  {
    nom: "Jean-Pierre Bacri",
    qui: "Acteur et scénariste, l'art de dire les choses sans les arrondir",
    periode: "Sortie en 2023",
    spectacles: ["songes", "genes", "nasty-sparkles"],
  },
  {
    nom: "Ariane Mnouchkine",
    qui: "Metteuse en scène, fondatrice du Théâtre du Soleil",
    periode: "Sortie en 2022",
    spectacles: ["andromaque", "huit-jours-a-la-campagne"],
  },
];

/**
 * Les photographes qui ont documenté l'école. Relevés dans les crédits des
 * galeries de l'ancien site — ils n'étaient affichés nulle part.
 */
export const photographes = [
  "Charlotte Magne",
  "Maxime Charpy",
  "Ali Aouzoulène",
  "Anna Ollivier",
  "Oscar Buenafuente",
] as const;
