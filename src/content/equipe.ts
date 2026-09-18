import type { Intervenant } from "./types";

/* Douze intervenants, tous artistes en activité. L’ancien site réduisait chacun
   à trois lignes dans une vignette, alors que ce sont les références les plus
   solides dont l’école dispose : TNS, ENSATT, ERACM, Conservatoire Royal de
   Bruxelles, ESNAM, Broadway Dance Center. */

export const equipe: Intervenant[] = [
  {
    slug: "thierry-buenafuente",
    prenom: "Thierry",
    nom: "Buenafuente",
    fonction: "Comédien, metteur en scène",
    formation: ["Formé à l’American Center of Arts de Paris"],
    matieres: ["Jeu, interprétation, comédie", "Administration, communication", "Voix en studio"],
    bio: "Comédien et metteur en scène, il assure le fil du jeu et de l’interprétation sur les trois années, et prend en charge les cours théoriques d’administration et de communication — ceux qui préparent la sortie d’école autant que le plateau.",
    portrait: "7dee3f_fb9c4477276d40bea9cd4c81a6f7d80e~mv2.jpg",
    categorie: "cursus",
  },
  {
    slug: "louise-buenafuente",
    prenom: "Louise",
    nom: "Buenafuente",
    fonction: "Comédienne, pédagogue",
    formation: [
      "Première formation à Arts en Scène, Lyon",
      "Diplômée du Conservatoire Royal de Bruxelles",
    ],
    matieres: ["Dire le vers"],
    bio: "Formée à Lyon puis au Conservatoire Royal de Bruxelles, elle prend en charge le vers — de l’alexandrin au vers libre, de la fable aux grandes tragédies.",
    portrait: "7dee3f_6865fb39ee044d898405886524c82570~mv2.jpg",
    categorie: "cursus",
  },
  {
    slug: "maxime-cella",
    prenom: "Maxime",
    nom: "Cella",
    fonction: "Comédien, danseur",
    formation: [
      "Première formation à la Scène sur Saône, Lyon",
      "Diplômé de l’ENSATT",
    ],
    matieres: ["Voix et corps", "Théâtre laboratoire", "Jeu d’acteur"],
    bio: "Diplômé de l’ENSATT, il enseigne la voix et le corps en première année et met en scène les spectacles de fin de cursus — dont « Aux premières lueurs de l’aube » et « Medéa ».",
    portrait: "7dee3f_d565715bfed6426da5aab7a3cb830562~mv2.jpg",
    categorie: "cursus",
  },
  {
    slug: "elisabeth-herbepin",
    prenom: "Élisabeth",
    nom: "Herbepin",
    fonction: "Chanteuse, auteure-interprète, pédagogue",
    formation: [
      "Diplômée en musiques actuelles et musiques traditionnelles",
      "Diplômée du CEFEDEM",
    ],
    matieres: ["Chant", "Techniques vocales"],
    bio: "Chanteuse et auteure-interprète, elle conduit le travail de chant sur les deux premières années : polyphonies, chant individuel, répertoires afro-cubain, anglo-saxon, jazz et chanson française.",
    portrait: "7dee3f_f4ca1f7e5e8249a699612bcc0c73a69c~mv2.jpg",
    categorie: "cursus",
  },
  {
    slug: "ivan-herisson",
    prenom: "Ivan",
    nom: "Hérisson",
    fonction: "Comédien, pédagogue",
    formation: ["Formé avec Pierre Debauche", "Puis au TNS de Strasbourg"],
    matieres: ["Travail de scènes", "Jeu d’acteur"],
    bio: "Formé auprès de Pierre Debauche puis au Théâtre National de Strasbourg, il conduit le travail de scènes — le cœur de l’apprentissage par la pratique.",
    portrait: "7dee3f_78fdfa5c1e92402f8b8ecc1359d9ac88~mv2.png",
    categorie: "cursus",
  },
  {
    slug: "laurie-iversen",
    prenom: "Laurie",
    nom: "Iversen",
    fonction: "Comédienne",
    formation: [
      "Première formation à l’École de Théâtre de Lyon",
      "Puis à l’École des Enfants Terribles",
      "Diplômée de l’ERACM",
    ],
    matieres: ["Jeu d’acteur", "Interprétation"],
    bio: "Ancienne élève de l’école, passée ensuite par les Enfants Terribles puis par l’ERACM, elle y enseigne aujourd’hui le jeu. Le parcours dit assez bien ce que la formation permet.",
    portrait: "7dee3f_7cd59d5f113a4223a67eb1cc55c56c61~mv2.jpg",
    categorie: "cursus",
  },
  {
    slug: "sebastien-jacquemin",
    prenom: "Sébastien",
    nom: "Jacquemin",
    fonction: "Danseur, chorégraphe",
    formation: ["Formé au Broadway Dance Center de New York City"],
    matieres: ["Danse", "Techniques corporelles"],
    bio: "Formé au Broadway Dance Center à New York, il fait traverser aux élèves le tango, la samba, le west coast, le jazz swing, la danse africaine, contemporaine et le hip-hop.",
    portrait: "7dee3f_a62e70ed2f1b4f7dbc84657bad125782~mv2.jpg",
    categorie: "cursus",
  },
  {
    slug: "maude-lallier",
    prenom: "Maude",
    nom: "Lallier",
    fonction: "Comédienne, clowne, metteuse en scène",
    formation: [
      "Formée à la Scène sur Saône, Lyon",
      "À l’École de Cirque de Lyon",
      "Et au Théâtre de l’Opprimé",
    ],
    matieres: ["Clown", "Mise en scène"],
    bio: "Comédienne et clowne, passée par l’École de Cirque de Lyon et le Théâtre de l’Opprimé, elle conduit le module clown — un travail sur l’échec, l’adresse au public et la présence.",
    portrait: "7dee3f_f8b68f25b6574b2ab879411a6ffbf917~mv2.jpg",
    categorie: "cursus",
  },
  {
    slug: "karin-martin-prevel",
    prenom: "Karin",
    nom: "Martin-Prevel",
    fonction: "Comédienne",
    formation: [
      "Conservatoires du 8e et du 15e arrondissements, Paris",
      "Studio Pygmalion, Paris",
    ],
    matieres: ["Jeu d’acteur"],
    bio: "Comédienne formée aux conservatoires parisiens et au Studio Pygmalion. Elle a mis en scène « L’Homme au treillis » avec les élèves de troisième année.",
    portrait: "7dee3f_770e600cbd4c4801b739bf08c92fa7c8~mv2.png",
    categorie: "cursus",
  },
  {
    slug: "florence-leguy",
    prenom: "Florence",
    nom: "Leguy",
    fonction: "Maître d’armes diplômée d’État, chorégraphe, directrice de combat",
    formation: [
      "Maître d’armes diplômée d’État",
      "Vice-championne de France au fleuret",
    ],
    matieres: ["Escrime & combat de scène"],
    bio: "Vice-championne de France au fleuret, maître d’armes diplômée d’État, chorégraphe et directrice de combat. Elle dirige le module escrime du cursus et le stage de 30 heures ouvert aux comédiens extérieurs.",
    portrait: "7dee3f_27a764e1c7ee4b57a5a932db3866f803~mv2.png",
    categorie: "module",
  },
  {
    slug: "clement-peretjatko",
    prenom: "Clément",
    nom: "Peretjatko",
    fonction: "Metteur en scène et marionnettiste",
    formation: [
      "Diplômé de l’Université Rennes 2",
      "Diplômé de l’ESNAM de Charleville-Mézières",
      "Président de la Commission Europe de l’UNIMA",
    ],
    matieres: ["Initiation à la marionnette", "Théâtre d’objet"],
    bio: "Diplômé de l’ESNAM, président de la Commission Europe de l’UNIMA, il conduit l’initiation à la marionnette, au théâtre d’ombre et au théâtre d’objet.",
    portrait: "7dee3f_7920b20371894480b1138925b37f6d74~mv2.png",
    categorie: "module",
  },
];

export const administration = [
  {
    nom: "Édith Hennaut",
    fonction: "Administratrice",
    precision: "Référente handicap",
  },
  { nom: "Léonie Marquet", fonction: "Assistante communication" },
] as const;

export function intervenantParSlug(slug: string) {
  return equipe.find((i) => i.slug === slug);
}

export function nomComplet(slug: string) {
  const i = intervenantParSlug(slug);
  return i ? `${i.prenom} ${i.nom}` : slug;
}
