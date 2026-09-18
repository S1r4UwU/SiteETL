import type { Stage } from "./types";

/* L’ancien site affichait « Dates : (dates 26-27 publiées prochainement) » et un
   champ « Horaires : » vide. Ici, `dates: null` est un état explicite : la page
   affiche une liste d’attente au lieu d’un trou. */

export const stages: Stage[] = [
  {
    slug: "escrime-et-combat-de-scene",
    titre: "Escrime & combat de scène",
    duree: "30 heures — deux niveaux : initiation et renforcement",
    intervenant: "Florence Leguy",
    intervenantBio:
      "Vice-championne de France au fleuret, maître d’armes diplômée d’État, chorégraphe, directrice de combat, comédienne et pédagogue.",
    tarif: "300 € par niveau",
    lieu: "École de Théâtre de Lyon — 53 rue des Tables Claudiennes, Lyon 1er",
    niveau: "Comédiennes et comédiens débutants ou confirmés",
    chapo:
      "Apprendre les techniques du maniement des armes et leur mise en action dans le spectacle vivant.",
    contenu: [
      "Se déplacer dans l’espace",
      "Réagir aux temps donnés",
      "Être en constante relation avec son partenaire",
      "Accéder à la connaissance comme à la maîtrise de soi",
    ],
    dates: null,
    horaires: null,
  },
  {
    slug: "marionnettes",
    titre: "Marionnettes & théâtre d’objet",
    duree: "20 heures",
    intervenant: "Clément Peretjatko",
    intervenantBio:
      "Metteur en scène et marionnettiste, diplômé de l’Université Rennes 2 et de l’ESNAM de Charleville-Mézières. Président de la Commission Europe de l’UNIMA.",
    tarif: "300 €",
    lieu: "École de Théâtre de Lyon — 53 rue des Tables Claudiennes, Lyon 1er",
    niveau: "Comédiennes et comédiens débutants ou confirmés",
    chapo:
      "Les techniques du théâtre d’ombre, le maniement des marionnettes et des objets, et leur mise en action sur un plateau.",
    contenu: [
      "Théâtre d’ombre",
      "Maniement des marionnettes",
      "Manipulation d’objets",
      "Mise en action dans le spectacle vivant",
    ],
    dates: null,
    horaires: null,
  },
  {
    slug: "commedia-dell-arte",
    titre: "Commedia dell’Arte",
    duree: "15 heures",
    intervenant: "Christophe Herrada",
    intervenantBio:
      "Comédien, chanteur, metteur en scène. Formé aux Conservatoires de Luxembourg et de Mons, puis avec Antonio Fava, Carlo Boso, Guy Ramet, Yoshi Oïda.",
    tarif: "300 €",
    lieu: "École de Théâtre de Lyon — 53 rue des Tables Claudiennes, Lyon 1er",
    niveau: "Comédiennes et comédiens débutants ou confirmés",
    chapo:
      "Travailler le jeu théâtral en privilégiant le corps comme appui — et y trouver de quoi construire ses futurs personnages.",
    contenu: [
      "Première phase : le corps et la voix",
      "Seconde phase : les personnages de la Commedia dell’Arte",
      "Des appuis techniques réutilisables pour la construction de personnages en création",
    ],
    dates: null,
    horaires: null,
  },
  {
    slug: "cinema",
    titre: "Jeu face caméra",
    duree: "Formations intensives, à Lyon et à Paris",
    intervenant: "Plein Cadre Formation",
    intervenantBio:
      "Une équipe forte de plus de quinze années d’expérience dans la pédagogie et l’encadrement d’intervenants, en collaboration directe avec des réalisateurs, directeurs de casting, agents artistiques, scénaristes et coordinatrices d’intimité.",
    tarif: "100 % finançable — AFDAS, France Travail",
    lieu: "Lyon et Paris",
    niveau:
      "Comédiennes et comédiens professionnels ou débutants, justifiant d’au moins une expérience en cinéma ou audiovisuel",
    chapo:
      "Des stages de jeu face caméra en conditions professionnelles, menés avec notre partenaire Plein Cadre Formation.",
    contenu: [
      "Travail du jeu face caméra",
      "Expérimentation de la direction d’acteur",
      "Scènes filmées par un professionnel",
      "Mises en situation directes et concrètes",
    ],
    dates: "Prochaine session : du lundi 16 au vendredi 20 novembre 2026",
    horaires: null,
    externe: { partenaire: "Plein Cadre Formation" },
  },
];

export const stageParSlug = (slug: string) => stages.find((s) => s.slug === slug);
