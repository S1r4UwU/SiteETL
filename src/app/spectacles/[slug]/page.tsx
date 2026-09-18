import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import { Bouton } from "@/components/Bouton";
import { Photo } from "@/components/Photo";
import { EnTete, Fiche, Section } from "@/components/Mise";
import { spectacleParSlug, spectacles } from "@/content/spectacles";
import { site } from "@/lib/site";

type Params = { params: Promise<{ slug: string }> };

export function generateStaticParams() {
  return spectacles.map((s) => ({ slug: s.slug }));
}

export async function generateMetadata({ params }: Params): Promise<Metadata> {
  const { slug } = await params;
  const s = spectacleParSlug(slug);
  if (!s) return {};
  return {
    title: `${s.titre} (${s.annee})`,
    description:
      s.chapo ??
      `${s.titre}, spectacle des élèves de l’École de Théâtre de Lyon, saison ${s.saison}.`,
    alternates: { canonical: `/spectacles/${s.slug}` },
  };
}

export default async function FicheSpectacle({ params }: Params) {
  const { slug } = await params;
  const s = spectacleParSlug(slug);
  if (!s) notFound();

  const index = spectacles.findIndex((x) => x.slug === slug);
  const suivant = spectacles[(index + 1) % spectacles.length];

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "TheaterEvent",
    name: s.titre,
    description: s.chapo,
    startDate: `${s.annee}`,
    location: s.lieu
      ? { "@type": "Place", name: s.lieu, address: "Lyon, France" }
      : undefined,
    performer: { "@type": "Organization", name: site.nom },
    organizer: { "@type": "EducationalOrganization", name: site.nom, url: site.url },
    eventStatus: "https://schema.org/EventScheduled",
  };

  return (
    <>
      <EnTete
        surtitre={`Saison ${s.saison}${s.niveau ? ` · ${s.niveau}` : ""}`}
        titre={s.titre}
        chapo={s.chapo}
        photo={s.photos[0]}
      />

      <Section className="!pt-0">
        <div className="grid gap-16 lg:grid-cols-12 lg:gap-20">
          <div className="lg:col-span-7">
            {s.texte ? (
              <div className="prose-etl !max-w-none text-[length:var(--text-lg)]">
                {s.texte.split("\n\n").map((paragraphe) => (
                  <p key={paragraphe.slice(0, 40)}>{paragraphe}</p>
                ))}
              </div>
            ) : (
              <p className="prose-etl text-[length:var(--text-lg)]">
                Le texte de présentation de ce spectacle n’a pas encore été mis
                en ligne. Les photos, elles, sont là.
              </p>
            )}
          </div>

          <aside className="lg:col-span-5">
            <Fiche
              entrees={[
                { terme: "Année", valeur: String(s.annee) },
                { terme: "Saison", valeur: s.saison },
                ...(s.niveau ? [{ terme: "Classe", valeur: s.niveau }] : []),
                ...(s.promotion ? [{ terme: "Promotion", valeur: s.promotion }] : []),
                ...(s.miseEnScene
                  ? [{ terme: "Mise en scène", valeur: s.miseEnScene }]
                  : []),
                ...(s.lieu ? [{ terme: "Lieu", valeur: s.lieu }] : []),
              ]}
            />

            {/* Crédits photo : usage du spectacle vivant, et une demande
                faite à l’école dans le brief de refonte. */}
            <p className="mt-6 font-sans text-xs text-ivoire-sourd">
              Crédits photographiques à compléter — voir la liste des éléments à
              fournir par l’école.
            </p>
          </aside>
        </div>
      </Section>

      {/* Galerie — grille éditoriale, pas un carrousel automatique. */}
      {s.photos.length > 1 && (
        <Section fond="plateau" surtitre="En images">
          <ul className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {s.photos.map((p, i) => (
              <li
                key={p}
                className={i % 5 === 0 ? "sm:col-span-2 lg:col-span-2" : ""}
              >
                <Photo
                  id={p}
                  alt={`${s.titre} — photographie de plateau`}
                  largeur={i % 5 === 0 ? 1400 : 800}
                  hauteur={i % 5 === 0 ? 900 : 1000}
                  sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                  className="w-full object-cover"
                />
              </li>
            ))}
          </ul>
        </Section>
      )}

      <Section className="!py-16">
        <div className="flex flex-col gap-6 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <p className="surtitre surtitre-sourd">Spectacle suivant</p>
            <Link
              href={`/spectacles/${suivant.slug}`}
              className="mt-2 block font-display text-[length:var(--text-xl)] hover:text-scene"
            >
              {suivant.titre}{" "}
              <span className="text-ivoire-sourd tnum">({suivant.annee})</span>
            </Link>
          </div>
          <div className="flex flex-wrap gap-4">
            <Bouton href="/spectacles" variante="fantome" fleche={false}>
              Tous les spectacles
            </Bouton>
            <Bouton href="/candidater" variante="sourd">
              Candidater
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
