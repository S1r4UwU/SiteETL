import Link from "next/link";
import Image from "next/image";
import { Bouton } from "@/components/Bouton";
import { Photo } from "@/components/Photo";
import { Poursuite } from "@/components/Poursuite";
import { PlanLent } from "@/components/PlanLent";
import { Bande } from "@/components/Bande";
import { Defilant } from "@/components/Defilant";
import {
  Apparition,
  Compteur,
  FiletTrace,
  TitreLeve,
} from "@/components/Apparition";
import { Citation, Section } from "@/components/Mise";
import { disciplines, repertoire } from "@/content/disciplines";
import { alumni, chiffresFormation, indicateurs } from "@/content/alumni";
import { spectacles } from "@/content/spectacles";
import { agenda, libelleType, periode } from "@/lib/agenda";
import { photo, site } from "@/lib/site";

export const revalidate = 3600;

/* Le trajet d'une soirée : on entre par le noir, on lit son programme sur du
   papier, la lumière retombe sur les affiches, on relit, et le noir revient
   pour l'appel. Chaque bascule de registre est un effet en soi. */

export default function Accueil() {
  const { prochain } = agenda();
  const enAvant = alumni[0];
  const affiche = spectacles[0];

  return (
    <>
      {/* ═══ NOIR ═══ Le plateau ════════════════════════════════════════════
          Une photo prise deux fois : à froid dessous, en pleine lumière
          dessus, découpée par une poursuite que le visiteur déplace. On
          n'explique pas ce qu'est une école de théâtre — on met quelqu'un
          derrière le projecteur.
         ════════════════════════════════════════════════════════════════════ */}
      <section className="registre-salle relative flex min-h-[94svh] items-end overflow-hidden">
        <PlanLent intensite={0.14} className="absolute inset-0 -z-20 scale-110">
          <Poursuite className="size-full">
            <Photo
              id={affiche.photos[0]}
              alt=""
              decoratif
              largeur={2000}
              hauteur={1200}
              priority
              sizes="100vw"
              className="poursuite-froid"
            />
            <Photo
              id={affiche.photos[0]}
              alt=""
              decoratif
              largeur={2000}
              hauteur={1200}
              priority
              sizes="100vw"
              className="poursuite-chaud"
            />
          </Poursuite>
        </PlanLent>

        <div className="pointer-events-none absolute inset-0 -z-10 bg-gradient-to-t from-[var(--color-salle)] via-[var(--color-salle)]/40 to-transparent" />

        <div className="enveloppe w-full pb-16 pt-32 md:pb-24">
          <p className="surtitre animate-[lumiere_0.8s_var(--ease-scene)_1.9s_both]">
            {site.baseline} — Lyon 1er
          </p>

          <TitreLeve
            balise="h1"
            delai={2000}
            className="mt-6 max-w-[16ch] text-[length:var(--text-5xl)]"
            lignes={["On n’apprend pas", "à jouer. *On joue.*"]}
          />

          <p className="prose-etl mt-8 max-w-xl text-[length:var(--text-lg)] animate-[lumiere_0.9s_var(--ease-scene)_2.35s_both]">
            Trois années de formation professionnalisante au métier de
            comédien·ne. <strong>1 500 heures</strong>, dont{" "}
            <strong>95 % de pratique</strong>, dans une promotion de vingt
            élèves au maximum.
          </p>

          <div className="mt-10 flex flex-wrap items-center gap-4 animate-[lumiere_0.9s_var(--ease-scene)_2.5s_both]">
            <Bouton href="/candidater">Candidater</Bouton>
            <Bouton href="/la-formation" variante="fantome" fleche={false}>
              Découvrir le cursus
            </Bouton>
          </div>

          {prochain && (
            <p className="mt-12 font-sans text-sm text-texte-doux animate-[lumiere_0.9s_var(--ease-scene)_2.65s_both]">
              <span className="text-accent">{libelleType[prochain.type]} — </span>
              {prochain.titre}, {periode(prochain)}.{" "}
              <Link href="/agenda" className="lien">
                Tout l’agenda
              </Link>
            </p>
          )}
        </div>

        <p className="pointer-events-none absolute bottom-7 right-6 hidden text-right font-sans text-[0.7rem] uppercase tracking-[0.16em] text-texte-sourd animate-[lumiere_1s_var(--ease-scene)_3s_both] lg:block">
          Déplacez la poursuite
        </p>
      </section>

      {/* ═══ PAPIER ═══ Le programme de salle ══════════════════════════════ */}

      <Defilant mots={repertoire} vitesse={68} />

      <Section className="!py-20 md:!py-24">
        <FiletTrace />
        <div className="grid gap-12 py-14 sm:grid-cols-3 sm:gap-8">
          {chiffresFormation.map((c, i) => (
            <Apparition key={c.libelle} delai={i * 110}>
              <p className="font-display text-[length:var(--text-4xl)] leading-none text-accent">
                <Compteur valeur={c.nombre} />
                <span className="ml-2 text-[length:var(--text-xl)] text-texte">
                  {c.unite}
                </span>
              </p>
              <p className="mt-4 font-sans text-sm text-texte">{c.libelle}</p>
            </Apparition>
          ))}
        </div>
        <FiletTrace />
      </Section>

      {/* Les disciplines, en notices de programme : vignette, titre, filet. */}
      <Section id="disciplines" registre="creme">
        <div className="max-w-3xl">
          <p className="surtitre">Ce qu’on y travaille</p>
          <TitreLeve
            className="mt-5 text-[length:var(--text-3xl)]"
            lignes={[
              "Six disciplines, trois ans,",
              "une seule méthode : le plateau",
            ]}
          />
          <p className="prose-etl mt-6">
            Stanislavski, Grotowski, le travail avec le partenaire, la création
            de la mise en scène par le plateau. Les élèves apprennent en jouant,
            pas en écoutant.
          </p>
        </div>

        <div className="mt-14 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {disciplines.map((d, i) => (
            <Apparition key={d.slug} delai={i * 70}>
              <Link href={`/la-formation/${d.slug}`} className="notice group block">
                {d.photo && (
                  <span className="notice-vignette block">
                    <Image
                      src={photo(d.photo, { w: 800, h: 500 })}
                      alt=""
                      aria-hidden
                      width={800}
                      height={500}
                      sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                    />
                  </span>
                )}
                <span className="surtitre surtitre-sourd mt-5 block">
                  {d.annees}
                </span>
                <span className="mt-2 block font-display text-[length:var(--text-xl)] leading-tight transition-colors group-hover:text-accent">
                  {d.titre}
                </span>
                <span className="mt-3 block font-sans text-sm text-texte-doux">
                  {d.accroche}
                </span>
                <span className="notice-filet mt-5 block" aria-hidden />
              </Link>
            </Apparition>
          ))}
        </div>

        <div className="mt-12">
          <Bouton href="/la-formation" variante="fantome">
            Le cursus complet
          </Bouton>
        </div>
      </Section>

      {/* ═══ NOIR ═══ Le mur d'affiches ════════════════════════════════════
          Le défilement vertical fait avancer quinze ans de spectacles à
          l'horizontale. C'est le moment où le site cesse d'être une page.
         ════════════════════════════════════════════════════════════════════ */}
      <section className="registre-salle py-[var(--spacing-section)]">
        <div className="enveloppe mb-4">
          <p className="surtitre">L’archive</p>
          <TitreLeve
            className="mt-5 max-w-3xl text-[length:var(--text-3xl)]"
            lignes={["Quinze ans de spectacles,", "joués devant du monde"]}
          />
        </div>
        <Bande spectacles={spectacles.slice(0, 12)} />
        <div className="enveloppe mt-12">
          <Bouton href="/spectacles" variante="fantome">
            Toute l’archive
          </Bouton>
        </div>
      </section>

      {/* ═══ PAPIER ═══ Après l'école ══════════════════════════════════════ */}
      <Section surtitre="Après l’école">
        <div className="grid gap-12 lg:grid-cols-12 lg:gap-16">
          <div className="lg:col-span-7">
            <TitreLeve
              className="text-[length:var(--text-3xl)]"
              lignes={[`${enAvant.nom},`, `promotion *${enAvant.promotion}*`]}
            />
            <p className="surtitre mt-4">{enAvant.metier}</p>

            <ul className="mt-9 space-y-4">
              {enAvant.parcours.map((etape, i) => (
                <Apparition key={etape} delai={i * 80}>
                  <li className="flex gap-4 font-sans text-sm text-texte-doux">
                    <span
                      aria-hidden
                      className="mt-2.5 block h-px w-6 shrink-0 bg-accent"
                    />
                    {etape}
                  </li>
                </Apparition>
              ))}
            </ul>

            <div className="mt-10">
              <Bouton href="/alumni" variante="fantome">
                Tous les parcours
              </Bouton>
            </div>
          </div>

          <Apparition delai={140} className="lg:col-span-5 lg:pt-4">
            <Citation
              texte={enAvant.citation}
              auteur={enAvant.nom}
              precision={`Promotion ${enAvant.promotion}`}
            />
          </Apparition>
        </div>
      </Section>

      <Section
        registre="creme"
        surtitre="Nos résultats"
        titre="Ce que deviennent nos élèves"
      >
        <FiletTrace />
        <div className="grid gap-12 py-14 sm:grid-cols-2 lg:grid-cols-4">
          {indicateurs.map((ind, i) => (
            <Apparition key={ind.libelle} delai={i * 100}>
              <p className="font-display text-[length:var(--text-4xl)] leading-none text-accent">
                <Compteur valeur={parseInt(ind.valeur, 10)} suffixe=" %" />
              </p>
              <p className="mt-4 font-sans text-sm text-texte">{ind.libelle}</p>
              {ind.precision && (
                <p className="mt-1 font-sans text-xs text-texte-sourd">
                  {ind.precision}
                </p>
              )}
            </Apparition>
          ))}
        </div>
        <FiletTrace />

        <div className="mt-12">
          <Bouton href="/l-ecole/resultats" variante="fantome">
            Le détail des enquêtes
          </Bouton>
        </div>
      </Section>

      {/* ═══ NOIR ═══ L'appel ══════════════════════════════════════════════ */}
      <section className="registre-salle relative overflow-hidden border-y border-filet">
        <PlanLent intensite={0.12} className="absolute inset-0 -z-20 scale-110">
          <Poursuite className="size-full">
            <Photo
              id={spectacles[1].photos[0]}
              alt=""
              decoratif
              largeur={2000}
              hauteur={1100}
              sizes="100vw"
              className="poursuite-froid"
            />
            <Photo
              id={spectacles[1].photos[0]}
              alt=""
              decoratif
              largeur={2000}
              hauteur={1100}
              sizes="100vw"
              className="poursuite-chaud"
            />
          </Poursuite>
        </PlanLent>
        <div className="pointer-events-none absolute inset-0 -z-10 bg-gradient-to-r from-[var(--color-salle)] via-[var(--color-salle)]/80 to-[var(--color-salle)]/35" />

        <div className="enveloppe py-[var(--spacing-section)]">
          <div className="max-w-2xl">
            <p className="surtitre">Année {site.anneeScolaire}</p>
            <TitreLeve
              className="mt-5 text-[length:var(--text-3xl)]"
              lignes={[
                "L’audition, c’est une scène",
                "de cinq minutes, une chanson",
                "et un entretien.",
              ]}
            />
            <p className="prose-etl mt-7">
              Pas de dossier interminable, pas de concours anonyme. On veut
              savoir comment vous jouez et pourquoi vous voulez faire ce métier.
              Le reste, on vous l’apprend.
            </p>
            <div className="mt-10 flex flex-wrap gap-4">
              <Bouton href="/candidater">Voir les conditions d’admission</Bouton>
              <Bouton
                href="/candidater/portes-ouvertes"
                variante="fantome"
                fleche={false}
              >
                Venir aux portes ouvertes
              </Bouton>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
