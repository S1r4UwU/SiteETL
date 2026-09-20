import type { Metadata } from "next";
import { Bouton } from "@/components/Bouton";
import { Chiffre, Citation, EnTete, Section } from "@/components/Mise";
import { alumni, indicateurs } from "@/content/alumni";
import { photosDe } from "@/lib/scene";
import { GalerieAlumni } from "@/components/GalerieAlumni";

export const metadata: Metadata = {
  title: "Les alumni",
  description:
    "Ce que deviennent les élèves de l’École de Théâtre de Lyon : ENSATT, École Nationale de Théâtre du Canada, compagnies, cinéma, télévision. Sept parcours détaillés.",
  alternates: { canonical: "/alumni" },
};

export default function Alumni() {
  const insertion = indicateurs[0];

  return (
    <>
      <EnTete
        surtitre="Après l’école"
        titre="Ce que deviennent nos élèves"
        chapo="Des compagnies montées, des concours nationaux réussis, des tournages, des théâtres. Voici sept parcours, nommés et datés — pas des témoignages anonymes."
        enfants={
          <div className="max-w-xs">
            <Chiffre
              valeur={insertion.valeur}
              libelle={insertion.libelle}
              precision={insertion.precision}
            />
          </div>
        }
      />

      <Section>
        <ol className="space-y-px bg-[var(--color-filet)]">
          {alumni.map((a) => (
            <li key={a.slug} className="bg-fond py-12 md:py-16">
              <div className="grid gap-10 lg:grid-cols-12 lg:gap-16">
                <div className="lg:col-span-5">
                  <h2 className="font-display text-[length:var(--text-2xl)]">
                    {a.nom}
                  </h2>
                  <p className="mt-2 font-sans text-xs uppercase tracking-[0.14em] text-accent">
                    Promotion <span className="tnum">{a.promotion}</span> ·{" "}
                    {a.metier}
                  </p>

                  <ul className="mt-8 space-y-3.5">
                    {a.parcours.map((etape) => (
                      <li
                        key={etape}
                        className="flex gap-4 font-sans text-sm text-texte-doux"
                      >
                        <span
                          aria-hidden
                          className="mt-2.5 h-px w-5 shrink-0 bg-accent"
                        />
                        {etape}
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="lg:col-span-7 lg:pt-2">
                  <Citation
                    texte={a.citation}
                    auteur={a.nom}
                    precision={`Promotion ${a.promotion}`}
                  />

                  {/* Si les crédits des photographies la nomment, on la montre
                      en scène — dans le spectacle qu'elle raconte. */}
                  <GalerieAlumni nom={a.nom} medias={photosDe(a.nom)} />
                </div>
              </div>
            </li>
          ))}
        </ol>
      </Section>

      <Section registre="creme" className="!py-16">
        <div className="flex flex-col gap-6 sm:flex-row sm:items-center sm:justify-between">
          <p className="max-w-xl font-display text-[length:var(--text-xl)]">
            Trois ans, et une promotion de vingt personnes qui ne se quittent
            plus.
          </p>
          <div className="flex flex-wrap gap-4">
            <Bouton href="/candidater">Candidater</Bouton>
            <Bouton href="/l-ecole/resultats" variante="fantome" fleche={false}>
              Nos indicateurs
            </Bouton>
          </div>
        </div>
      </Section>
    </>
  );
}
