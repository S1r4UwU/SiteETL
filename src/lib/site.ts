export const site = {
  nom: "École de Théâtre de Lyon",
  nomCourt: "ETL",
  devise: "Passion et exigence",
  baseline: "L’école de la scène",
  url: "https://www.ecoledetheatredelyon.com",
  telephone: "+33 4 81 65 15 56",
  telephoneAffiche: "04 81 65 15 56",
  email: "contact@ecoledetheatredelyon.com",
  adresseAdmin: {
    rue: "1 place Chardonnet",
    cp: "69001",
    ville: "Lyon",
  },
  adresseCours: {
    rue: "53 rue des Tables Claudiennes",
    cp: "69001",
    ville: "Lyon",
    quartier: "Pentes de la Croix-Rousse",
  },
  horaires: "Du lundi au vendredi, de 9h00 à 17h30",
  anneeScolaire: "2026-2027",
  reseaux: {
    instagram: "https://instagram.com/ecoledetheatredelyon/",
    facebook: "https://www.facebook.com/Ecoledetheatredelyon/",
    youtube: "https://www.youtube.com/channel/UChHn6tjuo64HwrxQJNg0FlQ",
    linkedin: "https://www.linkedin.com/company/ecole-de-th%C3%A9%C3%A2tre-de-lyon",
  },
  legal: {
    forme: "SARL au capital de 8 000 €",
    siret: "448 230 367 00014",
    naf: "8552Z",
    declarationActivite: "84 69 25684 69",
    gerant: "Jean-Marc Andrieu",
    administratrice: "Édith Hennaut",
    referenteHandicap: "Édith Hennaut",
  },
} as const;

/* L’ancien menu mélangeait l’offre, la preuve et l’actualité. Celui-ci range
   par intention : se former / candidater / découvrir l’école / voir le travail. */
export const navigation = [
  {
    libelle: "La formation",
    href: "/la-formation",
    enfants: [
      { libelle: "Le cursus en 3 ans", href: "/la-formation" },
      { libelle: "Les disciplines", href: "/la-formation#disciplines" },
      { libelle: "Stages pour comédiens", href: "/stages" },
      { libelle: "Atelier ados 13-17 ans", href: "/atelier-ados" },
    ],
  },
  {
    libelle: "L’école",
    href: "/l-ecole",
    enfants: [
      { libelle: "Le projet pédagogique", href: "/l-ecole" },
      { libelle: "L’équipe", href: "/l-ecole/equipe" },
      { libelle: "Nos résultats", href: "/l-ecole/resultats" },
      { libelle: "Accessibilité & handicap", href: "/l-ecole/accessibilite" },
    ],
  },
  { libelle: "Spectacles", href: "/spectacles" },
  { libelle: "Alumni", href: "/alumni" },
  { libelle: "Agenda", href: "/agenda" },
  { libelle: "Contact", href: "/contact" },
] as const;

/** Image servie par le CDN. PROVISOIRE : voir next.config.ts. */
export function photo(
  id: string,
  { w = 1600, h = 1067 }: { w?: number; h?: number } = {},
) {
  return `https://static.wixstatic.com/media/${id}/v1/fill/w_${w},h_${h},al_c,q_85/photo.jpg`;
}
