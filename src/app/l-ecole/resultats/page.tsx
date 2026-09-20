import type { Metadata } from "next";
import { Bouton } from "@/components/Bouton";
import { Chiffre, Citation, EnTete, Section } from "@/components/Mise";
import { indicateurs, temoignagesEleves } from "@/content/alumni";

export const metadata: Metadata = {
  title: "Nos résultats",
  description:
    "Indicateurs de résultats de l’École de Théâtre de Lyon : 100 % d’insertion professionnelle à 6 mois, 100 % de satisfaction sur le contenu de la formation. Publiés au titre de la certification Qualiopi.",
  alternates: { canonical: "/l-ecole/resultats" },
};

export default function Resultats() {
  return (
    <>
      <EnTete
        surtitre="Indicateurs Qualiopi"
        titre="Nos résultats, en clair"
        chapo="La certification Qualiopi impose de publier ces chiffres. Nous préférons les mettre ici, en évidence, plutôt qu’au fond d’un lien de pied de page : ce sont eux qui disent le mieux ce que vaut la formation."
      />

      <Section>
        <div className="grid gap-14 border-y border-filet py-16 sm:grid-cols-2 lg:grid-cols-4">
          {indicateurs.map((i) => (
            <Chiffre
              key={i.libelle}
              valeur={i.valeur}
              libelle={i.libelle}
              precision={i.precision}
            />
          ))}
        </div>
      </Section>

      <Section surtitre="Insertion professionnelle" titre="Promotion 2022-2025">
        <div className="grid gap-12 lg:grid-cols-12 lg:gap-16">
          <div className="lg:col-span-7">
            <div className="prose-etl text-[length:var(--text-lg)]">
              <p>
                <strong>À six mois de la sortie, 100 %</strong> des stagiaires de
                la promotion s’étaient professionnalisés — c’est-à-dire qu’ils
                exerçaient une activité rémunérée dans le champ artistique ou
                poursuivaient une formation supérieure dans ce champ.
              </p>
              <p>
                <strong>À un an, 75 %</strong> poursuivaient dans le milieu
                artistique, théâtral et audiovisuel.
              </p>
              <p>
                Ces chiffres portent sur une promotion de vingt élèves au
                maximum : ce sont des parcours suivis un par un, pas une
                statistique de masse. Les parcours détaillés de nos anciens sont
                publiés nommément.
              </p>
            </div>

            <div className="mt-10">
              <Bouton href="/alumni">Voir les parcours d’anciens</Bouton>
            </div>
          </div>

          <aside className="lg:col-span-5">
            <div className="border border-filet p-7">
              <p className="surtitre">Méthode</p>
              <p className="mt-4 font-sans text-sm text-texte-doux">
                Les enquêtes de satisfaction sont conduites auprès de l’ensemble
                des élèves en fin d’année scolaire. Les enquêtes d’insertion sont
                menées à six mois et à un an après la sortie de promotion.
              </p>
              <p className="mt-4 font-sans text-xs text-texte-sourd">
                Dernière enquête de satisfaction : 2025-2026. Dernière enquête
                d’insertion : promotion 2022-2025.
              </p>
            </div>
          </aside>
        </div>
      </Section>

      <Section
        registre="creme"
        surtitre="Enquête de satisfaction 2025-2026"
        titre="Ce que les élèves écrivent"
      >
        <div className="grid gap-12 lg:grid-cols-3">
          {temoignagesEleves.map((t) => (
            <Citation key={t.auteur} texte={t.texte} auteur={t.auteur} />
          ))}
        </div>
      </Section>
    </>
  );
}
