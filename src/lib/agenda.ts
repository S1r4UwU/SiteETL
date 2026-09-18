import { evenements } from "@/content/agenda";
import type { Evenement } from "@/content/types";

/** Fin réelle d’un événement : sa date de fin, ou sa date de début. */
function finDe(e: Evenement) {
  return new Date(e.fin ?? e.debut).getTime();
}

/**
 * Le tri est fait à chaque rendu, pas une fois pour toutes à la compilation :
 * les pages qui l’utilisent sont en revalidation quotidienne (`revalidate`),
 * donc un événement passé disparaît de lui-même sans redéploiement.
 */
export function agenda(maintenant = Date.now()) {
  const aVenir = evenements
    .filter((e) => finDe(e) >= maintenant)
    .sort((a, b) => new Date(a.debut).getTime() - new Date(b.debut).getTime());

  const passes = evenements
    .filter((e) => finDe(e) < maintenant)
    .sort((a, b) => new Date(b.debut).getTime() - new Date(a.debut).getTime());

  return { aVenir, passes, prochain: aVenir[0] ?? null };
}

const JOURS = ["dimanche", "lundi", "mardi", "mercredi", "jeudi", "vendredi", "samedi"];
const MOIS = [
  "janvier", "février", "mars", "avril", "mai", "juin",
  "juillet", "août", "septembre", "octobre", "novembre", "décembre",
];

/** « samedi 13 mars 2026 » — en français, sans dépendance de formatage. */
export function dateLongue(iso: string) {
  const d = new Date(iso);
  return `${JOURS[d.getUTCDay()]} ${d.getUTCDate()} ${MOIS[d.getUTCMonth()]} ${d.getUTCFullYear()}`;
}

/** « 13 mars » / « du 16 au 20 novembre 2026 » selon que l’événement dure. */
export function periode(e: Evenement) {
  const d = new Date(e.debut);
  const f = e.fin ? new Date(e.fin) : null;
  if (!f || f.toDateString() === d.toDateString()) return dateLongue(e.debut);
  if (d.getUTCMonth() === f.getUTCMonth()) {
    return `du ${d.getUTCDate()} au ${f.getUTCDate()} ${MOIS[f.getUTCMonth()]} ${f.getUTCFullYear()}`;
  }
  return `du ${d.getUTCDate()} ${MOIS[d.getUTCMonth()]} au ${f.getUTCDate()} ${MOIS[f.getUTCMonth()]} ${f.getUTCFullYear()}`;
}

/** Heure de début, ou chaîne vide si l’événement est à la journée. */
export function heure(iso: string) {
  const d = new Date(iso);
  const h = d.getHours();
  const m = d.getMinutes();
  if (h === 0 && m === 0) return "";
  return m === 0 ? `${h}h` : `${h}h${String(m).padStart(2, "0")}`;
}

export const libelleType: Record<Evenement["type"], string> = {
  audition: "Audition",
  "portes-ouvertes": "Portes ouvertes",
  spectacle: "Spectacle",
  stage: "Stage",
};
