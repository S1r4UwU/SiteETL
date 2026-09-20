/**
 * Modèle de contenu — il reproduit exactement les types prévus pour le CMS
 * (voir docs/brief-refonte.md §6). Tant que l’école n’a pas d’instance Sanity,
 * les données vivent dans `src/content/*.ts`. Le jour où le CMS est branché,
 * seules les fonctions d’accès changent : les composants, eux, ne bougent pas.
 *
 * RÈGLE ISSUE DE L’AUDIT : aucune date en dur dans un composant. Toute date
 * affichée sur le site vient d’ici. C’est ce qui évite qu’une journée portes
 * ouvertes de mars soit encore annoncée en septembre.
 */

export type Discipline = {
  slug: string;
  titre: string;
  annees: string;
  accroche: string;
  principe: string;
  methode: string[];
  objectif: string;
  photo?: string;
  intervenants: string[];
};

export type Intervenant = {
  slug: string;
  prenom: string;
  nom: string;
  fonction: string;
  formation: string[];
  matieres: string[];
  bio?: string;
  portrait?: string;
  categorie: "cursus" | "module" | "administration";
};

export type Spectacle = {
  slug: string;
  titre: string;
  annee: number;
  saison: string;
  promotion?: string;
  niveau?: string;
  miseEnScene?: string;
  texte?: string;
  chapo?: string;
  lieu?: string;
  /** Cle de l affiche reelle du spectacle dans medias.ts. */
  affiche?: string;
  /** Eleves en scene, quand le credit de l ancien site les nommait. */
  distribution?: string[];
  photos: string[];
};

export type Stage = {
  slug: string;
  titre: string;
  duree: string;
  intervenant: string;
  intervenantBio: string;
  tarif: string;
  lieu: string;
  niveau: string;
  chapo: string;
  contenu: string[];
  /** null tant que l’école n’a pas communiqué les dates : la page le dit
   *  explicitement au lieu d’afficher un champ vide, comme l’ancien site. */
  dates: string | null;
  horaires: string | null;
  externe?: { partenaire: string; url?: string };
};

export type Alumni = {
  slug: string;
  nom: string;
  promotion: number;
  metier: string;
  parcours: string[];
  citation: string;
  portrait?: string;
};

export type Evenement = {
  slug: string;
  type: "audition" | "portes-ouvertes" | "spectacle" | "stage";
  titre: string;
  /** ISO. Un événement dont la date est passée bascule automatiquement
   *  dans « passés » — voir src/lib/agenda.ts. */
  debut: string;
  fin?: string;
  lieu?: string;
  description?: string;
  lien?: { libelle: string; href: string };
};

export type Indicateur = {
  valeur: string;
  libelle: string;
  precision?: string;
  source: string;
};
