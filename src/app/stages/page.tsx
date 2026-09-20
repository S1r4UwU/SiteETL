import type { Metadata } from "next";
import Link from "next/link";
import { EnTete, Section } from "@/components/Mise";
import { stages } from "@/content/stages";

export const metadata: Metadata = {
  title: "Stages pour comédien·nes",
  description:
    "Escrime et combat de scène, marionnettes, commedia dell’arte, jeu face caméra : des stages courts ouverts aux comédien·nes extérieurs, débutants ou confirmés, à Lyon.",
  alternates: { canonical: "/stages" },
};

export default function Stages() {
  return (
    <>
      <EnTete
        surtitre="Formation continue"
        titre="Des stages ouverts à tous les comédiens"
        chapo="Vous n’êtes pas élève de l’école ? Certains stages vous sont ouverts, débutant·e ou confirmé·e. Des formats courts, encadrés par des spécialistes de leur discipline."
      />

      <Section>
        <ul className="space-y-px bg-[var(--color-filet)]">
          {stages.map((s) => (
            <li key={s.slug}>
              <Link
                href={`/stages/${s.slug}`}
                className="group grid gap-6 bg-fond py-10 md:grid-cols-12 md:gap-10"
              >
                <div className="md:col-span-5">
                  <h2 className="font-display text-[length:var(--text-2xl)] group-hover:text-accent">
                    {s.titre}
                  </h2>
                  <p className="mt-2 font-sans text-xs uppercase tracking-[0.12em] text-accent">
                    {s.intervenant}
                  </p>
                </div>

                <p className="font-sans text-sm text-texte-doux md:col-span-4">
                  {s.chapo}
                </p>

                <div className="md:col-span-3">
                  <p className="font-sans text-sm text-texte">{s.duree}</p>
                  <p className="mt-1 font-sans text-sm text-texte-doux">
                    {s.tarif}
                  </p>
                  {/* État explicite quand la date n’est pas arrêtée — au lieu
                      d’un champ vide comme sur l’ancien site. */}
                  <p className="mt-3 font-sans text-xs text-texte-sourd">
                    {s.dates ?? "Dates à paraître — inscription en liste d’attente"}
                  </p>
                </div>
              </Link>
            </li>
          ))}
        </ul>

        <p className="mt-12 max-w-2xl font-sans text-sm text-texte-sourd">
          Les stages sont confirmés sous réserve d’un nombre suffisant de
          participants. Le règlement s’effectue par chèque ou par virement, au
          plus tard un mois avant le début du stage.
        </p>
      </Section>
    </>
  );
}
