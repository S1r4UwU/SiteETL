import type { Metadata } from "next";
import { Bouton } from "@/components/Bouton";
import { EnTete, Fiche, Section } from "@/components/Mise";
import { site } from "@/lib/site";

export const metadata: Metadata = {
  title: "Financer sa formation",
  description:
    "École certifiée Qualiopi : AFDAS, France Travail, dispositifs régionaux, paiement échelonné. Les solutions pour financer la formation de comédien·ne à Lyon.",
  alternates: { canonical: "/candidater/financement" },
};

/* Page absente de l’ancien site, alors que « formation comédien Lyon
   financement » et « école de théâtre CPF » sont des requêtes à forte
   intention. La certification Qualiopi est ce qui les rend légitimes. */
const dispositifs = [
  {
    nom: "AFDAS",
    pour: "Intermittent·es du spectacle, artistes-auteurs, salarié·es du secteur culturel",
    texte:
      "L’opérateur de compétences de la culture et des médias peut prendre en charge tout ou partie d’une formation. C’est le dispositif le plus courant pour les stages professionnels, notamment nos stages de jeu face caméra, finançables à 100 %.",
  },
  {
    nom: "France Travail",
    pour: "Demandeurs et demandeuses d’emploi",
    texte:
      "Selon votre projet professionnel et votre région, une aide individuelle à la formation peut être mobilisée. Le dossier se monte avec votre conseiller·ère : il a besoin de notre numéro de déclaration d’activité et de notre certification.",
  },
  {
    nom: "Dispositifs régionaux",
    pour: "Selon votre situation et votre lieu de résidence",
    texte:
      "La Région Auvergne-Rhône-Alpes et certaines collectivités soutiennent des parcours de formation professionnelle. Les conditions changent régulièrement : contactez-nous, nous vous orientons.",
  },
  {
    nom: "Paiement échelonné",
    pour: "Financement personnel ou familial",
    texte:
      "Les frais pédagogiques peuvent être réglés en plusieurs fois sur l’année scolaire. Les modalités sont précisées dans le dossier d’inscription et dans les conditions générales de vente.",
  },
];

export default function Financement() {
  return (
    <>
      <EnTete
        surtitre="Prise en charge"
        titre="Financer sa formation"
        chapo="L’École de Théâtre de Lyon est un organisme de formation déclaré et certifié Qualiopi. Selon votre statut, tout ou partie du coût pédagogique peut être pris en charge."
      />

      <Section className="!pt-0">
        <div className="grid gap-16 lg:grid-cols-12 lg:gap-20">
          <div className="lg:col-span-7">
            <div className="space-y-px bg-ivoire/10">
              {dispositifs.map((d) => (
                <div key={d.nom} className="bg-salle py-8">
                  <h2 className="text-[length:var(--text-xl)]">{d.nom}</h2>
                  <p className="mt-2 font-sans text-xs uppercase tracking-[0.12em] text-scene">
                    {d.pour}
                  </p>
                  <p className="prose-etl mt-4">{d.texte}</p>
                </div>
              ))}
            </div>

            <p className="mt-10 font-sans text-sm text-ivoire-sourd">
              Ces dispositifs évoluent, et leurs conditions dépendent de votre
              situation personnelle. Nous ne montons pas les dossiers à votre
              place, mais nous fournissons toutes les pièces nécessaires — devis,
              programme détaillé, attestation Qualiopi, numéro de déclaration
              d’activité.
            </p>
          </div>

          <aside className="lg:col-span-5">
            <div className="border border-scene/40 p-7">
              <p className="surtitre">Nos références administratives</p>
              <div className="mt-6">
                <Fiche
                  entrees={[
                    { terme: "Raison sociale", valeur: `${site.nom}®` },
                    { terme: "SIRET", valeur: site.legal.siret },
                    { terme: "Code NAF", valeur: `${site.legal.naf} — enseignement culturel` },
                    {
                      terme: "Déclaration d’activité",
                      valeur: site.legal.declarationActivite,
                    },
                    {
                      terme: "Certification",
                      valeur: "Qualiopi — actions de formation",
                    },
                  ]}
                />
              </div>
              <p className="mt-6 font-sans text-xs text-ivoire-sourd">
                Ces informations sont celles à transmettre à votre financeur.
              </p>
            </div>

            <div className="mt-10">
              <p className="font-sans text-sm text-ivoire-doux">
                Un doute sur votre éligibilité&nbsp;? Écrivez-nous en précisant
                votre statut : nous vous dirons en une réponse quels dispositifs
                sont ouverts dans votre cas.
              </p>
              <div className="mt-6 flex flex-col gap-3">
                <Bouton href="/contact">Poser la question</Bouton>
                <Bouton href="/candidater" variante="sourd">
                  Revenir aux conditions d’admission
                </Bouton>
              </div>
            </div>
          </aside>
        </div>
      </Section>
    </>
  );
}
