import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import { Champ, Consentement, Leurre } from "@/components/Champ";
import { Formulaire } from "@/components/Formulaire";
import { EnTete, Fiche, Section } from "@/components/Mise";
import { stageParSlug, stages } from "@/content/stages";
import { site } from "@/lib/site";
import { Galerie } from "@/components/Galerie";
import { parId } from "@/content/medias";

type Params = { params: Promise<{ slug: string }> };

export function generateStaticParams() {
  return stages.map((s) => ({ slug: s.slug }));
}

export async function generateMetadata({ params }: Params): Promise<Metadata> {
  const { slug } = await params;
  const s = stageParSlug(slug);
  if (!s) return {};
  return {
    title: `Stage ${s.titre}`,
    description: `${s.chapo} ${s.duree}, ${s.tarif}, à Lyon. Dirigé par ${s.intervenant}.`,
    alternates: { canonical: `/stages/${s.slug}` },
  };
}

export default async function FicheStage({ params }: Params) {
  const { slug } = await params;
  const s = stageParSlug(slug);
  if (!s) notFound();

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Course",
    name: `Stage ${s.titre}`,
    description: s.chapo,
    inLanguage: "fr",
    provider: { "@type": "EducationalOrganization", name: site.nom, url: site.url },
    offers: { "@type": "Offer", price: s.tarif, priceCurrency: "EUR" },
  };

  return (
    <>
      <EnTete
        surtitre={`Stage · ${s.duree}`}
        titre={s.titre}
        chapo={s.chapo}
      />

      <Section>
        <div className="grid gap-16 lg:grid-cols-12 lg:gap-20">
          <div className="lg:col-span-7">
            <p className="surtitre">L’intervenant·e</p>
            <p className="mt-4 font-display text-[length:var(--text-xl)]">
              {s.intervenant}
            </p>
            <p className="prose-etl mt-4">{s.intervenantBio}</p>

            <div className="filet mt-14 pt-12">
              <p className="surtitre">Au programme</p>
              <ul className="mt-6 space-y-4">
                {s.contenu.map((c) => (
                  <li key={c} className="flex gap-4 font-sans text-sm text-texte-doux">
                    <span aria-hidden className="mt-2.5 h-px w-5 shrink-0 bg-accent" />
                    {c}
                  </li>
                ))}
              </ul>
            </div>

            <div className="filet mt-14 pt-12">
              <Fiche
                entrees={[
                  { terme: "Durée", valeur: s.duree },
                  { terme: "Tarif", valeur: s.tarif },
                  { terme: "Lieu", valeur: s.lieu },
                  { terme: "Public", valeur: s.niveau },
                  {
                    terme: "Dates",
                    valeur:
                      s.dates ??
                      "Non arrêtées à ce jour — inscrivez-vous en liste d’attente ci-contre, vous serez prévenu·e en premier.",
                  },
                  ...(s.horaires ? [{ terme: "Horaires", valeur: s.horaires }] : []),
                ]}
              />
            </div>

            {s.externe && (
              <p className="mt-10 border border-filet p-6 font-sans text-sm text-texte-doux">
                Ce stage est organisé par{" "}
                <strong className="text-texte">{s.externe.partenaire}</strong>,
                partenaire de l’École de Théâtre de Lyon. L’inscription et le
                financement se traitent directement avec eux — nous faisons le
                lien si besoin.
              </p>
            )}

            <p className="mt-10 font-sans text-sm text-texte-sourd">
              Situation de handicap&nbsp;: nous étudions tous les dossiers et
              proposons des aménagements.{" "}
              <Link href="/l-ecole/accessibilite" className="lien">
                Notre dispositif
              </Link>
              .
            </p>
          </div>

          <aside className="lg:col-span-5">
            <div className="border border-filet p-7 md:p-9">
              <p className="surtitre">
                {s.dates ? "S’inscrire" : "Être prévenu·e des dates"}
              </p>
              <p className="mt-4 font-sans text-sm text-texte-doux">
                {s.dates
                  ? "Nous vous envoyons le formulaire d’inscription et les modalités de règlement."
                  : "Les dates ne sont pas encore fixées. Laissez-nous votre adresse : vous serez prévenu·e dès leur publication, avant l’ouverture des inscriptions."}
              </p>

              <div className="mt-8">
                <Formulaire
                  sujet={`Stage ${s.titre} — ${s.dates ? "inscription" : "liste d’attente"}`}
                  redirection="/candidater/merci"
                  intitule={`Inscription au stage ${s.titre}`}
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
                  <Champ
                    nom="experience"
                    libelle="Votre pratique du théâtre, en deux lignes"
                    multiligne
                    lignes={4}
                  />
                  <Consentement>
                    J’accepte que l’École de Théâtre de Lyon utilise ces
                    informations pour traiter ma demande.{" "}
                    <Link href="/confidentialite" className="lien">
                      Politique de confidentialité
                    </Link>
                    .
                  </Consentement>
                </Formulaire>
              </div>
            </div>
          </aside>
        </div>
      </Section>

      {s.photos && s.photos.length > 0 && (
        <Section registre="creme" surtitre="Le stage, en images">
          <Galerie
            legende={s.titre}
            colonnes="trois"
            medias={s.photos.map(
              (x) => parId(x) ?? { id: x, alt: `Stage ${s.titre}`, l: 0, h: 0 },
            )}
          />
        </Section>
      )}

      <script
        type="application/ld+json"
        // eslint-disable-next-line react/no-danger
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
    </>
  );
}
