import Link from "next/link";
import { Bouton } from "@/components/Bouton";
import { Photo } from "@/components/Photo";
import { Poursuite } from "@/components/Poursuite";
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
import { site } from "@/lib/site";

export const revalidate = 3600;

export default function Accueil() {
  const { prochain } = agenda();
  const enAvant = alumni[0];
  const affiche = spectacles[0];

  return (
    <>
      {/* ==================================================================
          LE PLATEAU
          Une photo de plateau prise deux fois : à froid dessous, en pleine
          lumière dessus, découpée par une poursuite que le visiteur déplace
          lui-même. On n'explique pas ce qu'est une école de théâtre : on met
          quelqu'un derrière le projecteur.
         ================================================================== */}
      <section className="relative flex min-h-[94svh] items-end overflow-hidden">
        <Poursuite className="absolute inset-0 -z-20">
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

        <div className="pointer-events-none absolute inset-0 -z-10 bg-gradient-to-t from-salle via-salle/40 to-transparent" />

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
            <p className="mt-12 font-sans text-sm text-ivoire-doux animate-[lumiere_0.9s_var(--ease-scene)_2.65s_both]">
              <span className="text-scene">{libelleType[prochain.type]} — </span>
              {prochain.titre}, {periode(prochain)}.{" "}
              <Link href="/agenda" className="lien">
                Tout l’agenda
              </Link>
            </p>
          )}
        </div>

        {/* Indice de poursuite : on dit une fois comment ça marche, discrètement. */}
        <p className="pointer-events-none absolute bottom-7 right-6 hidden max-w-[13rem] text-right font-sans text-[0.7rem] uppercase tracking-[0.16em] text-ivoire-sourd animate-[lumiere_1s_var(--ease-scene)_3s_both] lg:block">
          Déplacez la poursuite
        </p>
      </section>

      {/* ==================================================================
          LE FRONTON
          Les auteurs du répertoire défilent comme sur le fronton lumineux
          d'un théâtre. Survolez : ça s'arrête.
         ================================================================== */}
      <Defilant mots={repertoire} vitesse={68} />

      {/* ==================================================================
          LES CHIFFRES
          Ils se composent à l'arrivée dans le champ, et les filets se tracent.
         ================================================================== */}
      <Section className="!py-20 md:!py-28">
        <FiletTrace />
        <div className="grid gap-12 py-14 sm:grid-cols-3 sm:gap-8">
          {chiffresFormation.map((c, i) => (
            <Apparition key={c.libelle} delai={i * 110}>
              <p className="font-display text-[length:var(--text-4xl)] leading-none text-scene">
                <Compteur valeur={c.nombre} />
                <span className="ml-2 text-[length:var(--text-xl)] text-ivoire">
                  {c.unite}
                </span>
              </p>
              <p className="mt-4 font-sans text-sm text-ivoire">{c.libelle}</p>
            </Apparition>
          ))}
        </div>
        <FiletTrace />
      </Section>

      {/* ==================================================================
          LES DISCIPLINES
         ================================================================== */}
      <Section id="disciplines">
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

        <div className="mt-14 grid gap-px bg-ivoire/10 sm:grid-cols-2 lg:grid-cols-3">
          {disciplines.map((d, i) => (
            <Apparition key={d.slug} delai={i * 70}>
              <Link
                href={`/la-formation/${d.slug}`}
                className="group relative flex h-full min-h-[23rem] flex-col justify-end overflow-hidden bg-salle p-7"
              >
                {d.photo && (
                  <>
                    <Photo
                      id={d.photo}
                      alt=""
                      decoratif
                      largeur={800}
                      hauteur={1000}
                      sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                      className="absolute inset-0 -z-20 size-full scale-105 object-cover opacity-45 grayscale transition-all duration-[900ms] ease-[var(--ease-scene)] group-hover:scale-100 group-hover:opacity-95 group-hover:grayscale-0"
                    />
                    <div className="absolute inset-0 -z-10 bg-gradient-to-t from-salle via-salle/75 to-salle/20 transition-opacity duration-700 group-hover:opacity-80" />
                  </>
                )}

                <p className="surtitre surtitre-sourd transition-colors duration-300 group-hover:text-scene">
                  {d.annees}
                </p>
                <h3 className="mt-3 text-[length:var(--text-xl)]">{d.titre}</h3>
                <p className="mt-3 font-sans text-sm text-ivoire-doux">
                  {d.accroche}
                </p>

                {/* Un filet d'orange se trace sous la carte au survol. */}
                <span
                  aria-hidden
                  className="mt-6 block h-px w-0 bg-scene transition-[width] duration-500 ease-[var(--ease-scene)] group-hover:w-full"
                />
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

      {/* ==================================================================
          LE MUR D'AFFICHES
          Le défilement vertical fait avancer quinze ans de spectacles à
          l'horizontale. C'est le moment où le site cesse d'être une page.
         ================================================================== */}
      <section className="bg-plateau py-[var(--spacing-section)]">
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

      {/* ==================================================================
          APRÈS L'ÉCOLE
         ================================================================== */}
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
                  <li className="flex gap-4 font-sans text-sm text-ivoire-doux">
                    <span
                      aria-hidden
                      className="mt-2.5 block h-px w-6 shrink-0 bg-scene"
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

      {/* ==================================================================
          LES RÉSULTATS
         ================================================================== */}
      <Section fond="plateau" surtitre="Nos résultats" titre="Ce que deviennent nos élèves">
        <FiletTrace />
        <div className="grid gap-12 py-14 sm:grid-cols-2 lg:grid-cols-4">
          {indicateurs.map((ind, i) => (
            <Apparition key={ind.libelle} delai={i * 100}>
              <p className="font-display text-[length:var(--text-4xl)] leading-none text-scene">
                <Compteur valeur={parseInt(ind.valeur, 10)} suffixe=" %" />
              </p>
              <p className="mt-4 font-sans text-sm text-ivoire">{ind.libelle}</p>
              {ind.precision && (
                <p className="mt-1 font-sans text-xs text-ivoire-sourd">
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

      {/* ==================================================================
          L'APPEL
         ================================================================== */}
      <section className="relative overflow-hidden border-y border-ivoire/10">
        <Poursuite className="absolute inset-0 -z-20">
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
        <div className="pointer-events-none absolute inset-0 -z-10 bg-gradient-to-r from-salle via-salle/85 to-salle/45" />

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
