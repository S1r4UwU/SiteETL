import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import { Bouton } from "@/components/Bouton";
import { Photo } from "@/components/Photo";
import { Poursuite } from "@/components/Poursuite";
import { EnTete, Section } from "@/components/Mise";
import { equipe } from "@/content/equipe";
import { disciplines } from "@/content/disciplines";
import { spectacles } from "@/content/spectacles";
import { site } from "@/lib/site";

type Params = { params: Promise<{ slug: string }> };

export function generateStaticParams() {
  return equipe.map((i) => ({ slug: i.slug }));
}

export async function generateMetadata({ params }: Params): Promise<Metadata> {
  const { slug } = await params;
  const i = equipe.find((x) => x.slug === slug);
  if (!i) return {};
  return {
    title: `${i.prenom} ${i.nom}`,
    description: `${i.prenom} ${i.nom}, ${i.fonction.toLowerCase()} — ${i.matieres.join(", ")} à l’École de Théâtre de Lyon.`,
    alternates: { canonical: `/l-ecole/equipe/${i.slug}` },
  };
}

export default async function FicheIntervenant({ params }: Params) {
  const { slug } = await params;
  const i = equipe.find((x) => x.slug === slug);
  if (!i) notFound();

  /* Maillage croisé : les disciplines enseignées et les spectacles mis en
     scène. Les douze fiches existaient déjà sur l’ancien site — indexées,
     mais liées depuis nulle part. */
  const sesDisciplines = disciplines.filter((d) => d.intervenants.includes(i.slug));
  const nom = `${i.prenom} ${i.nom}`;
  const sesSpectacles = spectacles.filter((s) => s.miseEnScene === nom);

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Person",
    name: nom,
    jobTitle: i.fonction,
    worksFor: { "@type": "EducationalOrganization", name: site.nom, url: site.url },
  };

  return (
    <>
      <EnTete surtitre={i.fonction} titre={nom} />

      <Section>
        <div className="grid gap-16 lg:grid-cols-12 lg:gap-20">
          <div className="lg:col-span-5">
            {i.portrait && (
              <Poursuite className="poursuite--papier aspect-[4/5] w-full bg-fond-doux">
                <Photo
                  id={i.portrait}
                  alt={`Portrait de ${nom}`}
                  largeur={800}
                  hauteur={950}
                  sizes="(max-width: 1024px) 100vw, 40vw"
                  className="poursuite-froid"
                />
                <Photo
                  id={i.portrait}
                  alt=""
                  decoratif
                  largeur={800}
                  hauteur={950}
                  sizes="(max-width: 1024px) 100vw, 40vw"
                  className="poursuite-chaud"
                />
              </Poursuite>
            )}
          </div>

          <div className="lg:col-span-7">
            {i.bio && (
              <p className="prose-etl !max-w-none text-[length:var(--text-lg)] !text-texte">
                {i.bio}
              </p>
            )}

            <div className="mt-12">
              <p className="surtitre">Formation</p>
              <ul className="mt-5 space-y-2.5">
                {i.formation.map((f) => (
                  <li key={f} className="flex gap-4 font-sans text-sm text-texte-doux">
                    <span aria-hidden className="mt-2.5 h-px w-5 shrink-0 bg-accent" />
                    {f}
                  </li>
                ))}
              </ul>
            </div>

            <div className="mt-12">
              <p className="surtitre">Enseigne</p>
              {sesDisciplines.length > 0 ? (
                <ul className="mt-5 space-y-px bg-[var(--color-filet)]">
                  {sesDisciplines.map((d) => (
                    <li key={d.slug}>
                      <Link
                        href={`/la-formation/${d.slug}`}
                        className="group flex items-baseline justify-between gap-6 bg-fond py-4 transition-colors"
                      >
                        <span className="font-display text-[length:var(--text-lg)] group-hover:text-accent">
                          {d.titre}
                        </span>
                        <span className="shrink-0 font-sans text-xs text-texte-sourd">
                          {d.annees}
                        </span>
                      </Link>
                    </li>
                  ))}
                </ul>
              ) : (
                <ul className="mt-5 flex flex-wrap gap-2">
                  {i.matieres.map((m) => (
                    <li
                      key={m}
                      className="border border-filet px-3 py-1.5 font-sans text-xs text-texte-doux"
                    >
                      {m}
                    </li>
                  ))}
                </ul>
              )}
            </div>

            {sesSpectacles.length > 0 && (
              <div className="mt-12">
                <p className="surtitre">Mises en scène à l’école</p>
                <ul className="mt-5 space-y-px bg-[var(--color-filet)]">
                  {sesSpectacles.map((s) => (
                    <li key={s.slug}>
                      <Link
                        href={`/spectacles/${s.slug}`}
                        className="group flex items-baseline justify-between gap-6 bg-fond py-4"
                      >
                        <span className="font-display text-[length:var(--text-lg)] group-hover:text-accent">
                          {s.titre}
                        </span>
                        <span className="shrink-0 font-sans text-xs text-texte-sourd tnum">
                          {s.annee}
                        </span>
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            )}

            <div className="mt-14 flex flex-wrap gap-4">
              <Bouton href="/l-ecole/equipe" variante="fantome" fleche={false}>
                Toute l’équipe
              </Bouton>
              <Bouton href="/candidater" variante="sourd">
                Candidater
              </Bouton>
            </div>
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
