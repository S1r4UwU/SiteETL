import type { Metadata } from "next";
import Link from "next/link";
import { Photo } from "@/components/Photo";
import { EnTete, Section } from "@/components/Mise";
import { spectacles, spectaclesParAnnee } from "@/content/spectacles";
import { affiches } from "@/content/medias";

export const metadata: Metadata = {
  title: "Les spectacles",
  description:
    "Quinze ans de spectacles d’élèves à l’École de Théâtre de Lyon : tragédie grecque, classique, contemporain, cabaret, comédie musicale. Textes, photos et distributions.",
  alternates: { canonical: "/spectacles" },
};

export default function Spectacles() {
  const parAnnee = spectaclesParAnnee();
  const [premier, ...autres] = spectacles;

  return (
    <>
      <EnTete
        surtitre={`${spectacles.length} spectacles depuis 2014`}
        titre="Ce qu’on a joué"
        chapo="Chaque promotion monte ses spectacles, et les joue devant un vrai public, dans un vrai théâtre. C’est la dernière épreuve de la formation, et souvent la première ligne d’un CV."
      />

      {/* Le plus récent, en grand. */}
      <Section>
        <Link
          href={`/spectacles/${premier.slug}`}
          className="group relative block min-h-[28rem] overflow-hidden md:min-h-[34rem]"
        >
          <Photo
            id={premier.photos[0]}
            alt=""
            decoratif
            largeur={1800}
            hauteur={1000}
            priority
            sizes="100vw"
            className="absolute inset-0 size-full object-cover transition-transform duration-700 ease-[var(--ease-scene)] group-hover:scale-[1.03]"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-fond via-fond/70 to-transparent" />
          <div className="relative flex min-h-[28rem] flex-col justify-end p-7 md:min-h-[34rem] md:p-12">
            <p className="surtitre">
              Le dernier en date · {premier.saison}
              {premier.niveau ? ` · ${premier.niveau}` : ""}
            </p>
            <h2 className="mt-4 max-w-3xl text-[length:var(--text-3xl)] group-hover:text-accent">
              {premier.titre}
            </h2>
            {premier.chapo && (
              <p className="prose-etl mt-4 max-w-xl !text-texte">{premier.chapo}</p>
            )}
          </div>
        </Link>
      </Section>

      {/* Les autres, par année. */}
      <Section surtitre="L’archive">
        <div className="space-y-20">
          {parAnnee.map(([annee, liste]) => {
            const affichables = liste.filter((s) => autres.includes(s));
            if (affichables.length === 0) return null;
            return (
              <div key={annee}>
                <div className="flex items-baseline gap-6 border-b border-filet pb-5">
                  <h3 className="font-display text-[length:var(--text-2xl)] text-accent tnum">
                    {annee}
                  </h3>
                  <span className="font-sans text-xs uppercase tracking-[0.14em] text-texte-sourd">
                    {affichables.length} spectacle
                    {affichables.length > 1 ? "s" : ""}
                  </span>
                </div>

                <ul className="mt-10 grid gap-x-6 gap-y-12 sm:grid-cols-2 lg:grid-cols-3">
                  {affichables.map((s) => (
                    <li key={s.slug}>
                      <Link href={`/spectacles/${s.slug}`} className="group block">
                        {/* L'affiche si elle existe, en entier et au format A ;
                            une photo de plateau sinon. */}
                        <div
                          className={`overflow-hidden bg-fond-doux ${
                            s.affiche ? "aspect-[1/1.414]" : "aspect-[10/7]"
                          }`}
                        >
                          <Photo
                            id={s.affiche ? affiches[s.affiche].id : s.photos[0]}
                            alt=""
                            decoratif
                            largeur={800}
                            hauteur={s.affiche ? 1131 : 560}
                            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                            className={`size-full transition-all duration-500 ease-[var(--ease-scene)] group-hover:scale-[1.03] ${
                              s.affiche
                                ? "object-contain"
                                : "object-cover opacity-80 group-hover:opacity-100"
                            }`}
                          />
                        </div>
                        <h4 className="mt-5 font-display text-[length:var(--text-lg)] group-hover:text-accent">
                          {s.titre}
                        </h4>
                        {s.niveau && (
                          <p className="mt-1 font-sans text-xs text-texte-sourd">
                            {s.niveau}
                            {s.miseEnScene ? ` · ${s.miseEnScene}` : ""}
                          </p>
                        )}
                        {s.chapo && (
                          <p className="mt-3 font-sans text-sm text-texte-doux">
                            {s.chapo}
                          </p>
                        )}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            );
          })}
        </div>
      </Section>
    </>
  );
}
