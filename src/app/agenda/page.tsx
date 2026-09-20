import type { Metadata } from "next";
import Link from "next/link";
import { Bouton } from "@/components/Bouton";
import { EnTete, Section } from "@/components/Mise";
import { agenda, heure, libelleType, periode } from "@/lib/agenda";
import { Photo } from "@/components/Photo";
import { affiches } from "@/content/medias";
import { spectacleParSlug } from "@/content/spectacles";
import type { Evenement } from "@/content/types";

/* Revalidation quotidienne : un événement passé disparaît de la liste
   « à venir » sans redéploiement. C’est le correctif du problème le plus
   visible de l’ancien site. */
export const revalidate = 86400;

export const metadata: Metadata = {
  title: "Agenda",
  description:
    "Auditions, journées portes ouvertes, spectacles d’élèves et stages de l’École de Théâtre de Lyon.",
  alternates: { canonical: "/agenda" },
};

function Ligne({ e, passe = false }: { e: Evenement; passe?: boolean }) {
  const h = heure(e.debut);
  // Un événement qui pointe vers un spectacle affiche son affiche : c'est
  // l'objet qui annonce, et le public le reconnaît avant de lire le titre.
  const slug = e.lien?.href.startsWith("/spectacles/")
    ? e.lien.href.replace("/spectacles/", "")
    : null;
  const aff = slug ? spectacleParSlug(slug)?.affiche : null;
  const media = aff ? affiches[aff] : null;

  return (
    <li className={`bg-fond py-8 ${passe ? "opacity-60" : ""}`}>
      <div className="grid gap-5 md:grid-cols-12 md:gap-8">
        <div className="md:col-span-3">
          <p
            className={`font-display text-[length:var(--text-lg)] ${passe ? "text-texte-sourd" : "text-accent"}`}
          >
            {periode(e)}
          </p>
          {h && !passe && (
            <p className="mt-1 font-sans text-xs text-texte-sourd tnum">
              à partir de {h}
            </p>
          )}
        </div>

        {media && (
          <div className="md:col-span-2">
            <Photo
              id={media.id}
              alt={`Affiche du spectacle ${e.titre}`}
              largeur={400}
              hauteur={566}
              sizes="140px"
              className="w-full max-w-[9rem] bg-fond-fort object-contain shadow-[0_10px_24px_-16px_rgb(0_0_0/0.8)]"
            />
          </div>
        )}

        <div className={media ? "md:col-span-4" : "md:col-span-6"}>
          <p className="surtitre surtitre-sourd">{libelleType[e.type]}</p>
          <h3 className="mt-2 font-display text-[length:var(--text-xl)]">
            {e.titre}
          </h3>
          {e.description && (
            <p className="mt-3 font-sans text-sm text-texte-doux">
              {e.description}
            </p>
          )}
          {e.lieu && (
            <p className="mt-3 font-sans text-xs text-texte-sourd">{e.lieu}</p>
          )}
        </div>

        <div className="md:col-span-3">
          {e.lien && (
            <Link
              href={e.lien.href}
              className="font-sans text-sm text-texte transition-colors hover:text-accent-vif"
            >
              {e.lien.libelle} <span aria-hidden>→</span>
            </Link>
          )}
        </div>
      </div>
    </li>
  );
}

export default function Agenda() {
  const { aVenir, passes } = agenda();

  return (
    <>
      <EnTete
        surtitre="Agenda"
        titre="Ce qui se passe à l’école"
        chapo="Auditions, portes ouvertes, spectacles, stages. Les dates passées basculent automatiquement dans l’archive."
      />

      <Section surtitre="À venir">
        {aVenir.length > 0 ? (
          <ul className="space-y-px bg-[var(--color-filet)]">
            {aVenir.map((e) => (
              <Ligne key={e.slug} e={e} />
            ))}
          </ul>
        ) : (
          <div className="border border-filet p-8">
            <p className="font-display text-[length:var(--text-xl)]">
              Aucune date programmée pour l’instant.
            </p>
            <p className="prose-etl mt-4">
              Les candidatures, elles, restent ouvertes toute l’année : les
              auditions sont organisées à réception des dossiers.
            </p>
            <div className="mt-8">
              <Bouton href="/candidater">Candidater</Bouton>
            </div>
          </div>
        )}
      </Section>

      {passes.length > 0 && (
        <Section
          registre="creme"
          surtitre="Archive"
          titre="C’est passé"
          chapo="Pour donner une idée du rythme d’une année à l’école."
        >
          <ul className="space-y-px bg-[var(--color-filet)] [&>li]:bg-fond-doux">
            {passes.map((e) => (
              <Ligne key={e.slug} e={e} passe />
            ))}
          </ul>
        </Section>
      )}
    </>
  );
}
