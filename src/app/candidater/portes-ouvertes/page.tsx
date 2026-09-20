import type { Metadata } from "next";
import Link from "next/link";
import { Champ, Consentement, Leurre } from "@/components/Champ";
import { Formulaire } from "@/components/Formulaire";
import { Bouton } from "@/components/Bouton";
import { EnTete, Section } from "@/components/Mise";
import { agenda, periode } from "@/lib/agenda";

export const revalidate = 3600;

export const metadata: Metadata = {
  title: "Journée portes ouvertes",
  description:
    "Venez découvrir l’École de Théâtre de Lyon : démonstrations de cours, ateliers avec les élèves et les professeurs, rencontres avec l’équipe pédagogique.",
  alternates: { canonical: "/candidater/portes-ouvertes" },
};

const programme = [
  "Démonstrations de cours",
  "Participation aux ateliers avec les élèves et les professeurs",
  "Rencontres avec l’équipe pédagogique et les artistes-enseignant·es",
  "Échanges avec les élèves",
  "Possibilité de passer l’audition sur place, sur inscription préalable",
];

export default function PortesOuvertes() {
  /* La prochaine JPO vient de l’agenda. Si aucune date n’est programmée, la
     page le dit et propose une liste d’attente — au lieu de laisser en ligne
     une date passée, ce que faisait l’ancien site six mois après l’événement. */
  const { aVenir } = agenda();
  const prochaine = aVenir.find((e) => e.type === "portes-ouvertes") ?? null;

  return (
    <>
      <EnTete
        surtitre="Portes ouvertes"
        titre={
          prochaine
            ? "L’école vous ouvre ses portes"
            : "Prochaine journée portes ouvertes : date à venir"
        }
        chapo={
          prochaine
            ? `Rendez-vous ${periode(prochaine)}. Une matinée ou un après-midi pour voir comment on travaille ici, rencontrer l’équipe, et poser toutes vos questions.`
            : "La date de la prochaine journée portes ouvertes n’est pas encore arrêtée. Laissez-nous votre adresse : vous serez prévenu·e dès qu’elle sera fixée, avant l’ouverture des inscriptions."
        }
      />

      <Section>
        <div className="grid gap-16 lg:grid-cols-12 lg:gap-20">
          <div className="lg:col-span-6">
            <p className="surtitre">Au programme</p>
            <ul className="mt-6 space-y-4">
              {programme.map((p) => (
                <li key={p} className="flex gap-4 font-sans text-sm text-texte-doux">
                  <span aria-hidden className="mt-2.5 h-px w-5 shrink-0 bg-accent" />
                  {p}
                </li>
              ))}
            </ul>

            <p className="prose-etl mt-10">
              Vous pouvez venir accompagné·e — deux personnes au maximum, pour
              que chacun ait la place de circuler dans les salles. Si vous
              souhaitez passer l’audition le jour même, demandez d’abord votre{" "}
              <Link href="/candidater/dossier" className="lien">
                dossier de candidature
              </Link>
              .
            </p>

            <div className="mt-10">
              <Bouton href="/la-formation" variante="fantome">
                Le cursus en détail
              </Bouton>
            </div>
          </div>

          <div className="lg:col-span-6">
            <div className="border border-filet p-7 md:p-9">
              <p className="surtitre">
                {prochaine ? "S’inscrire" : "Être prévenu·e"}
              </p>
              <p className="mt-4 font-sans text-sm text-texte-doux">
                {prochaine
                  ? "Les places sont limitées par créneau : merci de vous inscrire à l’avance."
                  : "Nous vous écrirons dès que la date sera fixée."}
              </p>

              <div className="mt-8">
                <Formulaire
                  sujet={
                    prochaine
                      ? "Inscription journée portes ouvertes"
                      : "Liste d’attente portes ouvertes"
                  }
                  redirection="/candidater/merci"
                  intitule="Inscription aux portes ouvertes"
                >
                  <Leurre />

                  <Champ nom="prenom" libelle="Prénom et nom" requis autoComplete="name" />
                  <Champ
                    nom="email"
                    libelle="Adresse e-mail"
                    type="email"
                    inputMode="email"
                    autoComplete="email"
                    requis
                  />

                  {prochaine && (
                    <>
                      <fieldset className="border-0 p-0">
                        <legend className="font-sans text-sm text-texte">
                          Créneau souhaité
                        </legend>
                        <div className="mt-3 space-y-2">
                          {["10h — 12h30", "13h30 — 16h"].map((c) => (
                            <label
                              key={c}
                              className="flex items-center gap-3 font-sans text-sm text-texte-doux"
                            >
                              <input
                                type="radio"
                                name="creneau"
                                value={c}
                                required
                                className="size-4 accent-[var(--color-accent)]"
                              />
                              {c}
                            </label>
                          ))}
                        </div>
                      </fieldset>

                      <Champ
                        nom="accompagnants"
                        libelle="Nombre d’accompagnants"
                        inputMode="numeric"
                        aide="Deux personnes au maximum."
                      />
                    </>
                  )}

                  {/* Donnée d’acquisition — l’ancien site la collectait déjà
                      ici, et ne s’en servait nulle part. */}
                  <p className="block">
                    <label
                      htmlFor="source"
                      className="font-sans text-sm text-texte"
                    >
                      Comment avez-vous connu l’école&nbsp;?
                      <span className="ml-2 text-xs text-texte-sourd">
                        (facultatif)
                      </span>
                    </label>
                    <select
                      id="source"
                      name="source"
                      defaultValue=""
                      className="mt-2 w-full border border-filet bg-fond px-4 py-3.5 font-sans text-base text-texte focus:border-accent focus:outline-none focus:ring-2 focus:ring-scene/40"
                    >
                      <option value="">—</option>
                      <option>Internet</option>
                      <option>Salon de l’étudiant</option>
                      <option>Bouche-à-oreille</option>
                      <option>Réseaux sociaux</option>
                      <option>Établissement scolaire</option>
                      <option>Spectacle d’élèves</option>
                    </select>
                  </p>

                  <Consentement>
                    J’accepte que l’École de Théâtre de Lyon utilise ces
                    informations pour traiter mon inscription.{" "}
                    <Link href="/confidentialite" className="lien">
                      Politique de confidentialité
                    </Link>
                    .
                  </Consentement>
                </Formulaire>
              </div>
            </div>
          </div>
        </div>
      </Section>
    </>
  );
}
