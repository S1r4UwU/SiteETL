import type { Metadata } from "next";
import Link from "next/link";
import { Bouton } from "@/components/Bouton";
import { EnTete, Fiche, Section } from "@/components/Mise";
import { spectacles } from "@/content/spectacles";
import { agenda, libelleType, periode } from "@/lib/agenda";
import { site } from "@/lib/site";

export const revalidate = 3600;

export const metadata: Metadata = {
  title: "Candidater",
  description:
    "Conditions d’admission à l’École de Théâtre de Lyon : prérequis, dossier de candidature, déroulé de l’audition, tarifs. Candidatures ouvertes pour l’année 2026-2027.",
  alternates: { canonical: "/candidater" },
};

/* Les cinq étapes, avec pour chacune ce que fait le candidat, ce que fait
   l’école, et le délai. L’ancien site posait cinq chiffres à plat, sans
   progression ni engagement de délai. */
const etapes = [
  {
    numero: "01",
    titre: "Vous demandez le dossier",
    vous: "Un formulaire de trois champs : prénom, e-mail, et votre question si vous en avez une.",
    nous: "Nous vous envoyons le dossier de candidature par e-mail.",
    delai: "Sous 48 h ouvrées",
    action: { libelle: "Demander le dossier", href: "/candidater/dossier" },
  },
  {
    numero: "02",
    titre: "Vous constituez votre dossier",
    vous: "Le formulaire rempli et signé (par vos parents si vous êtes mineur·e), en indiquant la scène du répertoire et la chanson que vous interpréterez. Plus un CV (scolaire, professionnel, artistique et sportif), une lettre de motivation, une copie de pièce d’identité, et le règlement des frais d’audition.",
    nous: "Nous étudions chaque dossier reçu.",
    delai: "À votre rythme — les candidatures sont étudiées toute l’année",
  },
  {
    numero: "03",
    titre: "Nous vous convoquons",
    vous: "Vous confirmez votre créneau.",
    nous: "Après sélection des dossiers, nous vous communiquons la date, l’horaire et le lieu de votre audition.",
    delai: "Rapidement après réception du dossier",
  },
  {
    numero: "04",
    titre: "Vous passez l’audition",
    vous: "Une scène du répertoire théâtral de cinq minutes maximum (venez avec votre réplique s’il s’agit d’un dialogue), une chanson, et un entretien.",
    nous: "Un jury composé de membres de l’équipe pédagogique vous reçoit.",
    delai: "Comptez une demi-journée sur place",
  },
  {
    numero: "05",
    titre: "Vous recevez la réponse",
    vous: "En cas d’admission, vous recevez le dossier d’inscription avec les conditions financières et les conditions générales de vente.",
    nous: "Nous vous informons de la décision du jury.",
    delai: "Rapidement après l’audition",
  },
];

export default function Candidater() {
  const { aVenir } = agenda();
  const auditions = aVenir.filter((e) => e.type === "audition");

  return (
    <>
      <EnTete
        surtitre={`Admission — année ${site.anneeScolaire}`}
        titre="Candidater à l’École de Théâtre de Lyon"
        chapo="Nous privilégions les petits groupes : le nombre de places est restreint. Les dossiers sont étudiés toute l’année, et les auditions organisées à réception des candidatures."
        photo={spectacles[3].photos[0]}
        enfants={
          <div className="flex flex-wrap gap-4">
            <Bouton href="/candidater/dossier">
              Demander mon dossier de candidature
            </Bouton>
            <Bouton
              href="/candidater/portes-ouvertes"
              variante="fantome"
              fleche={false}
            >
              Venir aux portes ouvertes
            </Bouton>
          </div>
        }
      />

      {/* Prérequis — courts, francs, sans jargon. */}
      <Section className="!pt-0" surtitre="Avant de commencer" titre="Les prérequis">
        <div className="grid gap-12 lg:grid-cols-12 lg:gap-16">
          <div className="lg:col-span-7">
            <Fiche
              entrees={[
                {
                  terme: "Âge minimum",
                  valeur: "18 ans — ou 17 ans avec l’accord des parents",
                },
                { terme: "Niveau", valeur: "Baccalauréat" },
                {
                  terme: "Expérience",
                  valeur:
                    "Avoir déjà pratiqué le théâtre et avoir une sensibilité artistique",
                },
                {
                  terme: "Exceptions",
                  valeur:
                    "Chaque demande est étudiée individuellement. Si votre parcours ne coche pas toutes les cases, écrivez-nous quand même.",
                },
                {
                  terme: "Situation de handicap",
                  valeur: (
                    <>
                      Nous étudions tous les dossiers et proposons des
                      aménagements.{" "}
                      <Link href="/l-ecole/accessibilite" className="lien">
                        Notre dispositif
                      </Link>
                    </>
                  ),
                },
              ]}
            />
          </div>

          {auditions.length > 0 && (
            <aside className="lg:col-span-5">
              <div className="border border-scene/40 p-7">
                <p className="surtitre">Prochaines auditions</p>
                <ul className="mt-5 space-y-4">
                  {auditions.map((a) => (
                    <li key={a.slug}>
                      <p className="font-display text-[length:var(--text-lg)]">
                        {periode(a)}
                      </p>
                      <p className="mt-1 font-sans text-xs text-ivoire-sourd">
                        {libelleType[a.type]} · {a.lieu}
                      </p>
                    </li>
                  ))}
                </ul>
              </div>
            </aside>
          )}
        </div>
      </Section>

      {/* Les cinq étapes, en ligne de temps. */}
      <Section
        fond="plateau"
        surtitre="Le parcours"
        titre="Candidater en cinq étapes"
        chapo="Voici exactement ce qui se passe, de votre première demande jusqu’à la réponse du jury."
      >
        <ol className="space-y-px bg-ivoire/10">
          {etapes.map((e) => (
            <li key={e.numero} className="bg-plateau p-7 md:p-10">
              <div className="grid gap-8 md:grid-cols-12 md:gap-10">
                <div className="md:col-span-3">
                  <p className="font-display text-[length:var(--text-3xl)] leading-none text-scene tnum">
                    {e.numero}
                  </p>
                  <h3 className="mt-4 text-[length:var(--text-lg)]">{e.titre}</h3>
                  <p className="mt-3 font-sans text-xs uppercase tracking-[0.12em] text-ivoire-sourd">
                    {e.delai}
                  </p>
                </div>

                <div className="md:col-span-5">
                  <p className="surtitre surtitre-sourd">Vous</p>
                  <p className="mt-3 font-sans text-sm text-ivoire-doux">
                    {e.vous}
                  </p>
                  {e.action && (
                    <div className="mt-6">
                      <Bouton href={e.action.href} variante="fantome">
                        {e.action.libelle}
                      </Bouton>
                    </div>
                  )}
                </div>

                <div className="md:col-span-4">
                  <p className="surtitre surtitre-sourd">L’école</p>
                  <p className="mt-3 font-sans text-sm text-ivoire-doux">
                    {e.nous}
                  </p>
                </div>
              </div>
            </li>
          ))}
        </ol>

        <p className="mt-10 max-w-2xl font-sans text-sm text-ivoire-sourd">
          Les scènes et chansons écrites ou composées par les candidat·es ne sont
          pas prises en compte pour l’audition : nous avons besoin d’entendre
          comment vous vous emparez d’un texte qui n’est pas le vôtre.
        </p>
      </Section>

      {/* Tarifs — affichés en clair, comme sur l’ancien site : c’est une
          bonne pratique qu’il faut conserver. */}
      <Section surtitre="Conditions financières" titre="Ce que ça coûte">
        <div className="grid gap-12 lg:grid-cols-12 lg:gap-16">
          <div className="lg:col-span-7">
            <Fiche
              entrees={[
                { terme: "Frais d’audition", valeur: "50 € — non remboursables" },
                { terme: "Frais d’inscription", valeur: "100 € — après admission" },
                { terme: "1re année", valeur: "4 300 € pour l’année" },
                { terme: "2e année", valeur: "4 500 € pour l’année" },
                { terme: "3e année", valeur: "4 700 € pour l’année" },
              ]}
            />
            <p className="mt-6 font-sans text-xs text-ivoire-sourd">
              Ces tarifs sont susceptibles d’évolution. Tout dossier
              d’inscription doit comporter le paiement des droits de réservation
              ainsi que l’ensemble des documents demandés.
            </p>
          </div>

          <aside className="lg:col-span-5">
            <div className="border border-ivoire/15 p-7">
              <p className="surtitre">Financer sa formation</p>
              <p className="mt-4 font-sans text-sm text-ivoire-doux">
                L’école est certifiée Qualiopi. Selon votre situation, tout ou
                partie de la formation peut être prise en charge : AFDAS, France
                Travail, dispositifs régionaux, financement personnel échelonné.
              </p>
              <div className="mt-7">
                <Bouton href="/candidater/financement" variante="fantome">
                  Les dispositifs
                </Bouton>
              </div>
            </div>
          </aside>
        </div>
      </Section>

      <Section fond="plateau" className="!py-16">
        <div className="flex flex-col gap-6 sm:flex-row sm:items-center sm:justify-between">
          <p className="max-w-lg font-display text-[length:var(--text-xl)]">
            Une question avant de vous lancer ?
          </p>
          <div className="flex flex-wrap gap-4">
            <Bouton href="/candidater/dossier">Demander le dossier</Bouton>
            <Bouton href="/contact" variante="fantome" fleche={false}>
              Nous écrire
            </Bouton>
          </div>
        </div>
      </Section>
    </>
  );
}
