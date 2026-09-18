import { NextResponse } from "next/server";

export const runtime = "nodejs";

/**
 * Réception des formulaires du site.
 *
 * En l’état, la route valide, filtre les robots et journalise. Le branchement
 * d’envoi (Resend) attend la clé API de l’école : dès que RESEND_API_KEY est
 * définie, le message part réellement. Sans clé, la route répond 200 et
 * journalise, pour que le tunnel reste testable de bout en bout.
 *
 * Aucune donnée n’est stockée côté serveur ici : c’est volontaire tant que la
 * politique de conservation n’a pas été arrêtée avec l’école (voir
 * docs/brief-refonte.md §7).
 */

type Corps = Record<string, unknown>;

/** Limitation simple par IP, en mémoire. Suffisant pour un site éditorial. */
const compteurs = new Map<string, { n: number; debut: number }>();
const FENETRE = 10 * 60 * 1000;
const MAX = 5;

function trop(ip: string) {
  const maintenant = Date.now();
  const entree = compteurs.get(ip);
  if (!entree || maintenant - entree.debut > FENETRE) {
    compteurs.set(ip, { n: 1, debut: maintenant });
    return false;
  }
  entree.n += 1;
  return entree.n > MAX;
}

const texte = (v: unknown, max = 2000) =>
  typeof v === "string" ? v.trim().slice(0, max) : "";

export async function POST(requete: Request) {
  const ip =
    requete.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ?? "inconnue";

  if (trop(ip)) {
    return NextResponse.json(
      { erreur: "Trop de demandes. Réessayez dans quelques minutes." },
      { status: 429 },
    );
  }

  let corps: Corps;
  try {
    corps = (await requete.json()) as Corps;
  } catch {
    return NextResponse.json({ erreur: "Requête invalide." }, { status: 400 });
  }

  /* Piège à robots : un humain ne remplit jamais ce champ. On répond 200 pour
     ne pas renseigner le spammeur sur la raison du rejet. */
  if (texte(corps["site-web"])) {
    return NextResponse.json({ ok: true });
  }

  if (corps.consentement !== "on") {
    return NextResponse.json(
      { erreur: "Le consentement est nécessaire pour traiter la demande." },
      { status: 400 },
    );
  }

  const email = texte(corps.email, 200);
  const prenom = texte(corps.prenom, 100);

  if (!prenom || !/^[^@\s]+@[^@\s]+\.[^@\s]{2,}$/.test(email)) {
    return NextResponse.json(
      { erreur: "Prénom et adresse e-mail valides requis." },
      { status: 400 },
    );
  }

  const sujet = texte(corps.sujet, 80) || "contact";
  const champs = Object.entries(corps)
    .filter(([cle]) => !["site-web", "consentement", "sujet"].includes(cle))
    .map(([cle, valeur]) => `${cle}: ${texte(valeur)}`)
    .join("\n");

  const cle = process.env.RESEND_API_KEY;
  const destinataire =
    process.env.EMAIL_DESTINATAIRE ?? "contact@ecoledetheatredelyon.com";

  if (!cle) {
    console.info(`[formulaire:${sujet}] (envoi désactivé — RESEND_API_KEY absente)\n${champs}`);
    return NextResponse.json({ ok: true, envoye: false });
  }

  try {
    const reponse = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${cle}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        from: process.env.EMAIL_EXPEDITEUR ?? "site@ecoledetheatredelyon.com",
        to: [destinataire],
        reply_to: email,
        subject: `[Site] ${sujet} — ${prenom}`,
        text: champs,
      }),
    });

    if (!reponse.ok) throw new Error(await reponse.text());
    return NextResponse.json({ ok: true, envoye: true });
  } catch (erreur) {
    console.error("[formulaire] envoi impossible", erreur);
    return NextResponse.json(
      { erreur: "L’envoi a échoué côté serveur." },
      { status: 502 },
    );
  }
}
