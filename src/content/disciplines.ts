import type { Discipline } from "./types";

/* Contenu repris du site actuel (/formation), où les six disciplines étaient
   aplaties sur une seule page. La triade Principe / Méthode / Objectif est
   une bonne structure pédagogique : elle devient ici la structure de page. */

export const disciplines: Discipline[] = [
  {
    slug: "jeu-et-interpretation",
    photos: [
      "7dee3f_8a6fb994a3354a7293e930f7f323ad46~mv2.jpg",
      "7dee3f_7f1cd7b55ebb491cbd8d46fee5484bc5~mv2_d_5184_3456_s_4_2.jpg",
    ],
    titre: "Jeu d’acteur & interprétation",
    annees: "1re, 2e et 3e années",
    accroche:
      "Plusieurs intervenants, plusieurs approches. La colonne vertébrale des trois années.",
    principe:
      "Transmettre les bases techniques, théoriques et artistiques indispensables à la pratique professionnelle du théâtre d’aujourd’hui, tel qu’il s’exprime dans sa richesse et sa diversité.",
    methode: [
      "La méthode Stanislavski",
      "La méthode de Grotowski",
      "Le travail avec le partenaire",
      "La mise en œuvre de l’énergie créatrice du groupe",
      "La création participative de la mise en scène par le plateau",
    ],
    objectif:
      "Accompagner les élèves vers l’autonomie, et leur donner les outils nécessaires à la compréhension et aux différentes pratiques de cet art.",
    intervenants: ["thierry-buenafuente", "ivan-herisson", "karin-martin-prevel", "laurie-iversen", "maxime-cella"],
    photo: "7dee3f_1ab04061e5c44394a84a96e90a9d0477~mv2.jpg",
  },
  {
    slug: "jeu-face-camera",
    photos: [
      "7dee3f_bf08fa2d07324f88a2775854a65b7f98~mv2.jpg",
    ],
    titre: "Jeu d’acteur face caméra",
    annees: "3e année",
    accroche:
      "L’outil caméra implique une sensibilité de jeu différente de celle du plateau.",
    principe:
      "Découvrir et maîtriser les bases techniques de l’acteur dans l’audiovisuel et le cinéma.",
    methode: [
      "Sessions d’apprentissage en conditions réelles",
      "Gestion du jeu et de l’interprétation adaptés à la caméra",
      "Travail de la continuité et du raccord",
    ],
    objectif:
      "Savoir se présenter à des castings et interpréter des rôles dans l’audiovisuel.",
    intervenants: ["thierry-buenafuente"],
    photo: "7dee3f_0e6854a41e3649df98510410665972f8~mv2.jpg",
  },
  {
    slug: "voix-et-corps",
    photos: [
      "7dee3f_23b6a8e5abbc46af933a3b0097f4d757~mv2.jpg",
      "7dee3f_003650d3cd2e45979c69fc96b0e70419~mv2.jpg",
    ],
    titre: "Voix & corps",
    annees: "1re année",
    accroche:
      "Les deux outils essentiels du comédien — et ceux qu’il faut savoir gérer toute une vie d’acteur.",
    principe:
      "Découvrir et maîtriser la voix et le corps. Savoir les gérer, tout au long de la vie d’acteur.",
    methode: [
      "Exercices physiques d’ancrage du corps et de respiration par le diaphragme",
      "Comprendre et maîtriser ce que l’on appelle le médium",
      "Un travail appuyé sur différents types de textes",
    ],
    objectif:
      "Être capable de conduire seul un échauffement vocal et physique, réutilisable dans toute sa vie professionnelle, en lien avec les productions sur lesquelles on travaille.",
    intervenants: ["maxime-cella"],
    photo: "7dee3f_d2bba4aceb9145aa870a532e48acad1d~mv2.jpg",
  },
  {
    slug: "dire-le-vers",
    titre: "Dire le vers",
    annees: "1re et 2e années",
    accroche: "De l’alexandrin au vers libre, de la fable aux grandes tragédies.",
    principe:
      "À l’aide de techniques de base puis de leur approfondissement, améliorer sa diction et son interprétation.",
    methode: [
      "Un travail pratique et théorique sur l’alexandrin et sur le vers",
      "Du classique au vers libre",
      "De la fable aux grandes tragédies",
    ],
    objectif:
      "Acquérir la fluidité nécessaire pour dépasser la musicalité des alexandrins et du vers en général, dramatique et poétique.",
    intervenants: ["louise-buenafuente"],
    photo: "7dee3f_8103020061ff4761bbd03ceb1a6ab80f~mv2.jpg",
  },
  {
    slug: "chant",
    photos: [
      "7dee3f_1397fdb3bf174a778badfe4b26249b29~mv2.jpg",
      "7dee3f_1ab04061e5c44394a84a96e90a9d0477~mv2.jpg",
    ],
    titre: "Chant",
    annees: "1re et 2e années",
    accroche:
      "Polyphonies, chants individuels, afro-cubains, anglo-saxons, jazz, chanson française.",
    principe:
      "Un atout supplémentaire pour l’élève-comédien·ne : savoir chanter. Comment se situer, et situer le son.",
    methode: [
      "Découvrir sa voix, étoffer sa palette de sons, trouver la justesse",
      "Prendre conscience de soi, de son corps et de l’espace",
      "Ressentir le rythme",
      "Adopter une posture physique",
      "Acquérir une technique de souffle",
      "Trouver le bon placement vocal",
    ],
    objectif:
      "Le chant est un élément essentiel du travail de l’acteur : il élargit la palette, et il ouvre le répertoire musical.",
    intervenants: ["elisabeth-herbepin"],
    photo: "7dee3f_fd17212045864dcfa7ba202bc4d32902~mv2.jpg",
  },
  {
    slug: "danse",
    photos: [
      "7dee3f_e8e37463bca0434787de4787aab7eb2c~mv2.jpg",
    ],
    titre: "Danse",
    annees: "1re et 2e années",
    accroche:
      "Tango, samba, west coast, jazz swing, danse africaine, contemporaine, hip-hop.",
    principe:
      "Un atout essentiel pour l’élève-comédien·ne : savoir danser. Maîtrise du rythme, lâcher-prise du corps, expérience du contact physique.",
    methode: [
      "Équilibre : être ancré dans le sol, trouver l’équilibre avec son partenaire en tenant compte de son centre de gravité",
      "Technique : aborder l’aspect technique, physique et rigoureux de certaines danses",
      "Le lien entre danse et théâtre",
    ],
    objectif:
      "Cette discipline ne peut qu’enrichir et compléter la formation de l’acteur — et ouvrir les rôles avec danse.",
    intervenants: ["sebastien-jacquemin"],
    photo: "7dee3f_18be080342a14554a0f21724b90220ca~mv2.jpg",
  },
];

export const modules = [
  {
    titre: "Escrime & combat de scène",
    photo: "7dee3f_7af43e1e2e5b4912b85c73954f03b8e5~mv2.jpg",
    intervenant: "florence-leguy",
    description:
      "Maniement des armes et mise en action dans le spectacle vivant. Se déplacer dans l’espace, réagir aux temps donnés, être en constante relation avec son partenaire.",
  },
  {
    titre: "Clown",
    photo: "7dee3f_0e6854a41e3649df98510410665972f8~mv2.jpg",
    intervenant: "maude-lallier",
    description:
      "Trouver son clown, c’est-à-dire trouver ce qui, chez soi, fait rire sans qu’on le décide. Un travail sur l’échec, l’adresse au public et la présence.",
  },
  {
    titre: "Marionnette & théâtre d’objet",
    photo: "7dee3f_74c3bc963bb34c8aa5d8d15dea75c8fe~mv2.jpg",
    intervenant: "clement-peretjatko",
    description:
      "Théâtre d’ombre, maniement des marionnettes et des objets, et leur mise en action dans le spectacle vivant.",
  },
  {
    titre: "Biomécanique",
    intervenant: null,
    description:
      "Le système d’entraînement de l’acteur mis au point par Meyerhold : précision du geste, rythme, conscience de l’espace scénique.",
  },
  {
    titre: "Administration & communication",
    photo: "7dee3f_ed97f1cd82ac4177b3c1a29abdc12318~mv2.jpg",
    intervenant: "thierry-buenafuente",
    description:
      "Cours théoriques. Monter une compagnie, comprendre le régime de l’intermittence, construire un dossier, s’adresser à un lieu, à une institution, à un public.",
  },
] as const;

export const repertoire = [
  "Aristophane", "Euripide", "Sophocle", "Sénèque", "Corneille", "Voltaire",
  "Molière", "Shakespeare", "Marivaux", "Rostand", "Schwartz", "Tchekhov",
  "Gorki", "Feydeau", "Koltès", "Bernhard", "Brecht", "Renaude", "Claudel",
  "Pinter", "Bond", "Kane", "Grumberg", "De Obaldia", "Novarina", "Kelly", "Levin",
] as const;

/**
 * La feuille de service de la formation.
 *
 * Remplace le triptyque de trois grands chiffres — la forme qu'une machine
 * produit quand on lui donne trois données (voir docs/anti-ia.md). Une feuille
 * de service est dense, alignée sur des colonnes, et on peut y ajouter des
 * lignes sans casser la composition. Toutes les valeurs viennent de la
 * plaquette de l'école.
 */
export const feuilleFormation = [
  {
    valeur: "3",
    unite: "ans",
    libelle: "De la première année au spectacle de sortie",
    note: "de septembre à juin",
  },
  {
    valeur: "1 500",
    unite: "h",
    libelle: "Volume horaire total de la formation",
    note: "14 à 18 h par semaine",
  },
  {
    valeur: "95",
    unite: "%",
    libelle: "De pratique — on apprend sur le plateau",
    note: "5 % de théorie",
  },
  {
    valeur: "20",
    unite: "max",
    libelle: "Élèves par promotion",
    note: "suivi individuel, bilan semestriel",
  },
  {
    valeur: "1",
    unite: "par an",
    libelle: "Stage obligatoire en milieu professionnel",
    note: "théâtres, compagnies",
  },
  {
    valeur: "6",
    unite: "+ 5",
    libelle: "Disciplines au cursus, et cinq modules",
    note: "escrime, clown, marionnette, biomécanique, administration",
  },
] as const;
