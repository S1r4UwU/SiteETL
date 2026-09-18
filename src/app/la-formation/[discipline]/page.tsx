import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import { Bouton } from "@/components/Bouton";
import { Photo } from "@/components/Photo";
import { EnTete, Section } from "@/components/Mise";
import { disciplines } from "@/content/disciplines";
import { equipe } from "@/content/equipe";
import { site } from "@/lib/site";

type Params = { params: Promise<{ discipline: string }> };

export function generateStaticParams() {
  return disciplines.map((d) => ({ discipline: d.slug }));
}

export async function generateMetadata({ params }: Params): Promise<Metadata> {
  const { discipline: slug } = await params;
  const d = disciplines.find((x) => x.slug === slug);
  if (!d) return {};
  return {
    title: d.titre,
    description: `${d.accroche} — ${d.annees} du cursus de comédien·ne de l’École de Théâtre de Lyon.`,
    alternates: { canonical: `/la-formation/${d.slug}` },
  };
}

export default async function DisciplinePage({ params }: Params) {
  const { discipline: slug } = await params;
  const d = disciplines.find((x) => x.slug === slug);
  if (!d) notFound();

  const index = disciplines.findIndex((x) => x.slug === slug);
  const suivante = disciplines[(index + 1) % disciplines.length];
  const enseignants = d.intervenants
    .map((s) => equipe.find((i) => i.slug === s))
    .filter((i): i is NonNullable<typeof i> => Boolean(i));

  /* Schéma Course : c’est ce qui déclenche les résultats enrichis pour une
     formation, et que l’ancien site ne déclarait nulle part. */
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Course",
    name: d.titre,
    description: d.accroche,
    inLanguage: "fr",
    provider: {
      "@type": "EducationalOrganization",
      name: site.nom,
      url: site.url,
    },
    teaches: d.objectif,
  };

  return (
    <>
      <EnTete
        surtitre={`Discipline — ${d.annees}`}
        titre={d.titre}
        chapo={d.accroche}
        photo={d.photo}
      />

      <Section className="!pt-0">
        <div className="grid gap-16 lg:grid-cols-12 lg:gap-20">
          {/* La triade Principe / Méthode / Objectif — la structure
              pédagogique de l’école, rendue lisible au lieu d’être aplatie
              en trois blocs de texte gris. */}
          <div className="space-y-14 lg:col-span-7">
            <div>
              <p className="surtitre">Le principe</p>
              <p className="prose-etl mt-5 text-[length:var(--text-lg)] !text-ivoire">
                {d.principe}
              </p>
            </div>

            <div className="filet pt-14">
              <p className="surtitre">La méthode</p>
              <ul className="mt-6 space-y-4">
                {d.methode.map((m, i) => (
                  <li key={m} className="flex gap-5">
                    <span className="mt-0.5 font-display text-sm text-scene tnum">
                      {String(i + 1).padStart(2, "0")}
                    </span>
                    <span className="font-sans text-sm text-ivoire-doux">{m}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="filet pt-14">
              <p className="surtitre">L’objectif</p>
              <p className="prose-etl mt-5">{d.objectif}</p>
            </div>
          </div>

          {/* Qui enseigne. */}
          <aside className="lg:col-span-5">
            <p className="surtitre surtitre-sourd">
              {enseignants.length > 1 ? "Les intervenants" : "L’intervenant·e"}
            </p>
            <ul className="mt-6 space-y-px bg-ivoire/10">
              {enseignants.map((i) => (
                <li key={i.slug}>
                  <Link
                    href={`/l-ecole/equipe/${i.slug}`}
                    className="group flex items-center gap-5 bg-salle p-5 transition-colors hover:bg-plateau"
                  >
                    {i.portrait && (
                      <Photo
                        id={i.portrait}
                        alt=""
                        decoratif
                        largeur={160}
                        hauteur={160}
                        sizes="64px"
                        className="size-16 shrink-0 object-cover grayscale"
                      />
                    )}
                    <span className="min-w-0">
                      <span className="block font-display text-[length:var(--text-lg)] group-hover:text-scene">
                        {i.prenom} {i.nom}
                      </span>
                      <span className="block font-sans text-xs text-ivoire-sourd">
                        {i.fonction}
                      </span>
                    </span>
                  </Link>
                </li>
              ))}
            </ul>

            <div className="mt-12 border border-ivoire/15 p-7">
              <p className="surtitre">Année {site.anneeScolaire}</p>
              <p className="mt-4 font-sans text-sm text-ivoire-doux">
                Cette discipline fait partie du cursus de comédien·ne en trois
                ans. Elle n’est pas dispensée séparément — hors stages ouverts
                aux comédiens extérieurs.
              </p>
              <div className="mt-7 flex flex-col gap-3">
                <Bouton href="/candidater">Candidater</Bouton>
                <Bouton href="/stages" variante="sourd">
                  Voir les stages ouverts à tous
                </Bouton>
              </div>
            </div>
          </aside>
        </div>
      </Section>

      <Section fond="plateau" className="!py-16">
        <div className="flex flex-col gap-6 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <p className="surtitre surtitre-sourd">Discipline suivante</p>
            <p className="mt-2 font-display text-[length:var(--text-xl)]">
              {suivante.titre}
            </p>
          </div>
          <div className="flex flex-wrap gap-4">
            <Bouton href={`/la-formation/${suivante.slug}`} variante="fantome">
              Continuer
            </Bouton>
            <Bouton href="/la-formation" variante="sourd" fleche={false}>
              Toutes les disciplines
            </Bouton>
          </div>
        </div>
      </Section>

      <script
        type="application/ld+json"
        // eslint-disable-next-line react/no-danger
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
    </>
  );
}
