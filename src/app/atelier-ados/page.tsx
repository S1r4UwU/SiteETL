import type { Metadata } from "next";
import Link from "next/link";
import { Champ, Consentement, Leurre } from "@/components/Champ";
import { Formulaire } from "@/components/Formulaire";
import { EnTete, Fiche, Section } from "@/components/Mise";
import { agenda, periode } from "@/lib/agenda";
import { site } from "@/lib/site";

export const revalidate = 3600;

export const metadata: Metadata = {
  title: "Atelier théâtre ados 13-17 ans",
  description:
    "Atelier théâtre pour les 13-17 ans à Lyon 1er, le mercredi de 18h30 à 20h, d’octobre à juin. 440 € l’année, spectacle de fin d’année, cours d’essai.",
  alternates: { canonical: "/atelier-ados" },
};

/* Page pensée pour les parents, qui sont les acheteurs — l’ancien site
   s’adressait à l’adolescent, et laissait le parent sans réponse. */
const contenu = [
  "Des exercices ludiques, pour trouver sa place au sein du groupe",
  "Un travail sur la respiration, la mise en mouvement et en voix",
  "Des scènes en improvisation",
  "Le développement de la créativité, de la réactivité et de la spontanéité",
];

export default function AtelierAdos() {
  const { aVenir } = agenda();
  const essai = aVenir.find((e) => e.slug.startsWith("cours-essai-atelier-ados"));

  return (
    <>
      <EnTete
        surtitre="13-17 ans · le mercredi soir"
        titre="L’atelier théâtre pour les ados"
        chapo="Un atelier hebdomadaire d’octobre à juin, encadré par une comédienne professionnelle, dans les locaux de l’école. Aucune expérience requise — et un vrai spectacle en fin d’année."
      />

      <Section>
        <div className="grid gap-16 lg:grid-cols-12 lg:gap-20">
          <div className="lg:col-span-7">
            {essai && (
              <div className="mb-12 border border-accent/45 p-6">
                <p className="surtitre">Cours d’essai</p>
                <p className="mt-3 font-display text-[length:var(--text-xl)]">
                  {periode(essai)}
                </p>
                <p className="mt-2 font-sans text-sm text-texte-doux">
                  Une séance complète pour voir si ça lui plaît, sans engagement.
                </p>
              </div>
            )}

            <p className="surtitre">Ce qu’on y fait</p>
            <ul className="mt-6 space-y-4">
              {contenu.map((c) => (
                <li key={c} className="flex gap-4 font-sans text-sm text-texte-doux">
                  <span aria-hidden className="mt-2.5 h-px w-5 shrink-0 bg-accent" />
                  {c}
                </li>
              ))}
            </ul>

            <p className="prose-etl mt-8">
              Toute cette année de découvertes et de pratique est mise en lumière
              lors du spectacle de fin d’année, joué devant les familles.
            </p>

            <div className="filet mt-14 pt-12">
              <Fiche
                entrees={[
                  { terme: "Âge", valeur: "De 13 à 17 ans, débutant·es compris" },
                  { terme: "Jour", valeur: "Le mercredi, de 18h30 à 20h00" },
                  {
                    terme: "Période",
                    valeur: "D’octobre à juin, hors vacances scolaires",
                  },
                  { terme: "Tarif", valeur: "440 € pour l’année" },
                  { terme: "Intervenante", valeur: "Laurianne Di Ruzza, comédienne" },
                  {
                    terme: "Lieu",
                    valeur: `${site.adresseCours.rue}, Lyon 1er — métro Croix-Paquet (ligne C), bus S6 arrêt Tables Claudiennes`,
                  },
                  {
                    terme: "Spectacle",
                    valeur: "Restitution en juin — date communiquée en cours d’année",
                  },
                ]}
              />
            </div>

            <p className="mt-10 font-sans text-sm text-texte-sourd">
              Laurianne Di Ruzza est une ancienne élève de l’école, promotion
              2020, aujourd’hui directrice artistique du Théâtre Le Nombril du
              Monde.{" "}
              <Link href="/alumni" className="lien">
                Son parcours
              </Link>
              .
            </p>
          </div>

          <aside className="lg:col-span-5">
            <div className="border border-filet p-7 md:p-9">
              <p className="surtitre">Inscrire son enfant</p>
              <p className="mt-4 font-sans text-sm text-texte-doux">
                Laissez-nous vos coordonnées : nous vous rappelons pour caler le
                cours d’essai et répondre à vos questions.
              </p>

              <div className="mt-8">
                <Formulaire
                  sujet="Atelier ados — demande d’inscription"
                  redirection="/candidater/merci"
                  intitule="Inscription à l’atelier ados"
                >
                  <Leurre />
                  <Champ
                    nom="prenom"
                    libelle="Votre prénom et nom"
                    requis
                    autoComplete="name"
                  />
                  <Champ
                    nom="email"
                    libelle="Votre adresse e-mail"
                    type="email"
                    inputMode="email"
                    autoComplete="email"
                    requis
                  />
                  <Champ
                    nom="telephone"
                    libelle="Votre téléphone"
                    type="tel"
                    inputMode="tel"
                    autoComplete="tel"
                    aide="Pour vous rappeler, si c’est plus simple."
                  />
                  <Champ
                    nom="age_enfant"
                    libelle="Âge de votre enfant"
                    inputMode="numeric"
                  />
                  <Champ
                    nom="message"
                    libelle="Une question ?"
                    multiligne
                    lignes={4}
                  />
                  <Consentement>
                    J’accepte que l’École de Théâtre de Lyon utilise ces
                    informations pour traiter ma demande d’inscription.{" "}
                    <Link href="/confidentialite" className="lien">
                      Politique de confidentialité
                    </Link>
                    .
                  </Consentement>
                </Formulaire>
              </div>
            </div>

            <p className="mt-8 font-sans text-xs text-texte-sourd">
              Les données concernant un·e mineur·e sont collectées auprès du
              représentant légal, et conservées le temps de l’année scolaire
              concernée.
            </p>
          </aside>
        </div>
      </Section>
    </>
  );
}
