import type { Alumni, Indicateur } from "./types";

/* Sept parcours nommés, datés, vérifiables. C’est la preuve que l’école
   fonctionne — et sur l’ancien site, c’était dans un onglet que personne
   n’ouvrait avant d’avoir déjà décidé. Ici, ils remontent en page d’accueil. */

export const alumni: Alumni[] = [
  {
    slug: "clara-last",
    nom: "Clara Last",
    promotion: 2023,
    metier: "Comédienne, régisseuse",
    parcours: [
      "Participe à la création de multiples spectacles pendant sa formation",
      "Apprend le métier de conceptrice lumière sur le tas",
      "Régisseuse pendant deux ans au Théâtre Le Nombril du Monde, et au Festival d’Avignon en 2023",
      "Admise à l’ENSATT et à l’École Nationale de Théâtre du Canada, qu’elle intègre en 2024",
    ],
    citation:
      "À l’ETL j’ai appris la discipline nécessaire pour pratiquer le métier d’artiste. J’ai réappris à travailler et à me fixer des objectifs. Et je suis reconnaissante aux professeurs qui m’ont apporté leurs techniques de travail et leur soutien.",
  },
  {
    slug: "laurianne-di-ruzza",
    nom: "Laurianne Di Ruzza",
    promotion: 2020,
    metier: "Comédienne, directrice artistique",
    parcours: [
      "Cofonde en 2021 la compagnie Nuevo Aliento avec Elora Thivat",
      "Rejoint le groupe IGS en 2022 et y crée un cours de théâtre pour les apprenants du campus René Cassin",
      "Écrit des pièces sur commande",
      "Rappelée par l’ETL en 2023 pour animer l’atelier théâtre ados",
      "Rejoint l’équipe du Théâtre Le Nombril du Monde comme directrice artistique en 2024",
    ],
    citation:
      "L’ETL m’a ouvert la voie de ce qui allait devenir mon métier. Le programme, aussi varié que pertinent, est une véritable préparation à la vie professionnelle. La formation a consolidé mes acquis et m’a permis de développer des compétences, mais aussi un réseau.",
  },
  {
    slug: "gabrielle-chabot",
    nom: "Gabrielle Chabot",
    promotion: 2018,
    metier: "Comédienne, actrice",
    parcours: [
      "Travaille directement dans le théâtre à la sortie de l’école",
      "Cinéma et télévision : Clem, Love in Progress, INSU",
    ],
    citation:
      "L’ETL m’a apporté de la confiance en moi et en mes idées. J’ai beaucoup apprécié la créativité et la bienveillance grâce auxquelles je me suis sentie vraiment bien pour apprendre. La multiplicité des enseignements m’a appris à me centrer en tant qu’actrice sur les projets auxquels je voulais participer.",
  },
  {
    slug: "marie-foldyna",
    nom: "Marie Foldyna",
    promotion: 2019,
    metier: "Comédienne, art-thérapeute",
    parcours: [
      "Devient rapidement intermittente du spectacle",
      "Depuis 2021, travaille sur plusieurs projets de mise en scène : interventions, théâtre forum, théâtre débat",
      "Joue dans « Clôture de l’amour » de Pascal Rambert, et dans « 4 saisons », pièce jeune public",
      "Passe un diplôme d’art-thérapeute pour élargir sa vision du théâtre",
    ],
    citation:
      "L’ETL m’a permis de rencontrer un certain nombre d’intervenants qui ont su m’apporter une vision différente de ce qu’est le théâtre. L’ETL offre une palette de possibilités, où nous avons le choix de piocher dans chacune des disciplines pour nous construire artistiquement.",
  },
  {
    slug: "perle-dimanche",
    nom: "Perle Dimanche",
    promotion: 2022,
    metier: "Comédienne, actrice",
    parcours: [
      "Participe à la création de la Modeste Compagnie avec ses partenaires de promotion",
      "Passe des castings, se crée un carnet d’adresses",
      "Monte une équipe pour réaliser un court-métrage destiné aux festivals",
    ],
    citation:
      "L’ETL m’a apporté la rigueur, et m’a permis de voir la quantité de travail à fournir pour pouvoir pratiquer ce métier. L’école m’a permis d’acquérir les bases techniques nécessaires, tout en m’apportant le sens critique pour prendre les bonnes décisions.",
  },
  {
    slug: "lea-freymann",
    nom: "Léa Freymann",
    promotion: 2025,
    metier: "Comédienne",
    parcours: [
      "Intervenante artistique dans plusieurs écoles : cours de théâtre et d’arts plastiques pour enfants",
      "Monte sa compagnie pour créer ses propres projets, mêlant arts visuels et théâtre",
      "S’ouvre à d’autres formes : marionnettes, cinéma",
    ],
    citation:
      "L’ETL m’a permis de prendre confiance en moi, de faire de belles rencontres et de comprendre ce que j’avais envie de créer. La pluridisciplinarité qu’offre l’école m’a également permis de découvrir de nouvelles manières de jouer, et a enrichi mon jeu.",
  },
];

/* Indicateurs Qualiopi. L’ancien site les enterrait dans un lien de pied de
   page ; ce sont pourtant les meilleurs arguments commerciaux disponibles. */
export const indicateurs: Indicateur[] = [
  {
    valeur: "100 %",
    libelle: "d’insertion professionnelle",
    precision: "à 6 mois, promotion 2022-2025",
    source: "Enquête d’insertion, promotion 2022-2025",
  },
  {
    valeur: "100 %",
    libelle: "de satisfaction",
    precision: "sur le contenu global de la formation",
    source: "Enquête de satisfaction 2025-2026",
  },
  {
    valeur: "96 %",
    libelle: "sur la qualité de l’enseignement",
    precision: "note attribuée par les élèves",
    source: "Enquête de satisfaction 2025-2026",
  },
  {
    valeur: "75 %",
    libelle: "toujours dans le milieu à 1 an",
    precision: "théâtre et audiovisuel, promotion 2022-2025",
    source: "Enquête d’insertion, promotion 2022-2025",
  },
];

export const chiffresFormation = [
  { nombre: 1500, unite: "heures", libelle: "de formation sur trois ans" },
  { nombre: 95, unite: "%", libelle: "de pratique" },
  { nombre: 20, unite: "élèves", libelle: "au maximum par promotion" },
] as const;

export const temoignagesEleves = [
  {
    texte:
      "Je pense que l’ETL est une école qui se préoccupe sincèrement de ses élèves. J’ai plus appris ici en 10 mois qu’en deux ans dans une école dite renommée.",
    auteur: "Une étudiante de première année",
  },
  {
    texte:
      "L’école est pour moi dans l’ensemble satisfaisante. Je remercie avant tout les intervenants.",
    auteur: "Un étudiant de deuxième année",
  },
  {
    texte:
      "Je ne vais pas passer de concours pour l’instant, car je considère que j’ai un bon bagage.",
    auteur: "Une étudiante de troisième année",
  },
] as const;

export const alumniParSlug = (slug: string) => alumni.find((a) => a.slug === slug);
