import type { Evenement } from "./types";

/* Toutes les dates du site vivent ici, et nulle part ailleurs.
 *
 * Un événement dont la date de fin est dépassée bascule tout seul dans
 * « passés » (src/lib/agenda.ts). C’est le correctif du problème le plus
 * visible de l’ancien site : une journée portes ouvertes du 13 mars 2026
 * encore annoncée comme « à venir » au mois de septembre suivant.
 *
 * À CONFIRMER PAR L’ÉCOLE (voir docs/brief-refonte.md §7) :
 *   — dates des auditions 2027-2028
 *   — date de la journée portes ouvertes 2027
 *   — dates et horaires des stages escrime / marionnettes / commedia
 *   — date de la restitution de l’atelier ados
 */

export const evenements: Evenement[] = [
  {
    slug: "cours-essai-atelier-ados-2026",
    type: "stage",
    titre: "Cours d’essai — atelier ados",
    debut: "2026-09-30T18:30:00+02:00",
    fin: "2026-09-30T20:00:00+02:00",
    lieu: "École de Théâtre de Lyon, 53 rue des Tables Claudiennes",
    description:
      "Un mercredi soir pour essayer l’atelier avant de s’engager. Ouvert aux 13-17 ans, débutants compris.",
    lien: { libelle: "L’atelier ados", href: "/atelier-ados" },
  },
  {
    slug: "stage-cinema-novembre-2026",
    type: "stage",
    titre: "L’acteur·ice dirigé·e par 5 directeur·ices de casting",
    debut: "2026-11-16T09:00:00+01:00",
    fin: "2026-11-20T18:00:00+01:00",
    lieu: "Lyon",
    description:
      "Formation intensive de jeu face caméra, avec notre partenaire Plein Cadre Formation. Inscriptions ouvertes, 100 % finançable.",
    lien: { libelle: "Le stage cinéma", href: "/stages/cinema" },
  },
  {
    slug: "auditions-septembre-2026",
    type: "audition",
    titre: "Auditions d’entrée — année 2026-2027",
    debut: "2026-09-09T09:00:00+02:00",
    fin: "2026-09-16T18:00:00+02:00",
    lieu: "École de Théâtre de Lyon",
    description:
      "Six journées d’auditions pour l’entrée en première année : une scène du répertoire, une chanson, un entretien.",
    lien: { libelle: "Candidater", href: "/candidater" },
  },
  {
    slug: "jpo-mars-2026",
    type: "portes-ouvertes",
    titre: "Journée portes ouvertes",
    debut: "2026-03-13T10:00:00+01:00",
    fin: "2026-03-13T16:00:00+01:00",
    lieu: "École de Théâtre de Lyon",
    description:
      "Démonstrations de cours, ateliers avec les élèves et les professeurs, rencontres avec l’équipe pédagogique.",
  },
  {
    slug: "nombrils-cabaret-juin-2026",
    type: "spectacle",
    titre: "Nombril’s Cabaret : Panique au Music-Hall !",
    debut: "2026-06-13T19:30:00+02:00",
    fin: "2026-06-14T18:00:00+02:00",
    lieu: "Théâtre Le Nombril du Monde, Lyon 1er",
    description: "Par la promotion Samuel Beckett — projet d’autonomie de 3e année.",
    lien: {
      libelle: "Le spectacle",
      href: "/spectacles/nombrils-cabaret-panique-au-music-hall",
    },
  },
  {
    slug: "aux-premieres-lueurs-juin-2026",
    type: "spectacle",
    titre: "Aux premières lueurs de l’aube",
    debut: "2026-06-06T19:30:00+02:00",
    fin: "2026-06-07T18:00:00+02:00",
    lieu: "Théâtre Le Nombril du Monde, Lyon 1er",
    description: "Spectacle de fin de cursus, mis en scène par Maxime Cella.",
    lien: { libelle: "Le spectacle", href: "/spectacles/aux-premieres-lueurs-de-l-aube" },
  },
];
