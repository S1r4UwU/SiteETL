import Link from "next/link";
import { Bouton } from "@/components/Bouton";
import { Photo } from "@/components/Photo";
import { Reveal } from "@/components/Reveal";
import { Chiffre, Citation, Section } from "@/components/Mise";
import { disciplines } from "@/content/disciplines";
import { alumni, chiffresFormation, indicateurs } from "@/content/alumni";
import { spectacles } from "@/content/spectacles";
import { agenda, libelleType, periode } from "@/lib/agenda";
import { site } from "@/lib/site";

export const revalidate = 3600;

export default function Accueil() {
  const { prochain } = agenda();
  const enAvant = alumni[0];
  const dernierSpectacle = spectacles[0];

  return (
    <>
      {/* ------------------------------------------------------------------
          Plein écran. Une photo de plateau, un titre, une phrase — pas cinq
          listes à puces. L’action principale est visible au premier écran.
         ------------------------------------------------------------------ */}
      <section className="relative flex min-h-[92svh] items-end overflow-hidden">
        <div className="absolute inset-0 -z-10">
          <Photo
            id={dernierSpectacle.photos[0]}
            alt=""
            decoratif
            largeur={2000}
            hauteur={1200}
            priority
            sizes="100vw"
            className="size-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-salle via-salle/75 to-salle/35" />
        </div>

        <div className="enveloppe w-full pb-16 pt-32 md:pb-24">
          <p className="surtitre animate-[lumiere_0.7s_var(--ease-scene)_both]">
            {site.baseline} — Lyon 1er
          </p>

          <h1 className="mt-6 max-w-[16ch] text-[length:var(--text-5xl)] animate-[lumiere_0.9s_var(--ease-scene)_120ms_both]">
            On n’apprend pas
            <br />
            à jouer. <span className="text-scene">On joue.</span>
          </h1>

          <p className="prose-etl mt-8 max-w-xl text-[length:var(--text-lg)] animate-[lumiere_0.9s_var(--ease-scene)_240ms_both]">
            Trois années de formation professionnalisante au métier de
            comédien·ne. <strong>1 500 heures</strong>, dont{" "}
            <strong>95 % de pratique</strong>, dans une promotion de vingt
            élèves au maximum.
          </p>

          <div className="mt-10 flex flex-wrap items-center gap-4 animate-[lumiere_0.9s_var(--ease-scene)_360ms_both]">
            <Bouton href="/candidater">Candidater</Bouton>
            <Bouton href="/la-formation" variante="fantome" fleche={false}>
              Découvrir le cursus
            </Bouton>
          </div>

          {prochain && (
            <p className="mt-12 font-sans text-sm text-ivoire-doux animate-[lumiere_0.9s_var(--ease-scene)_480ms_both]">
              <span className="text-scene">
                {libelleType[prochain.type]} —{" "}
              </span>
              {prochain.titre}, {periode(prochain)}.{" "}
              <Link href="/agenda" className="lien">
                Tout l’agenda
              </Link>
            </p>
          )}
        </div>
      </section>

      {/* ------------------------------------------------------------------
          Trois chiffres, très grands, rien d’autre. C’est l’argument le plus
          fort de l’école, et il était introuvable sur l’ancien site.
         ------------------------------------------------------------------ */}
      <Section className="!py-20 md:!py-28">
        <Reveal>
          <div className="grid gap-12 border-y border-ivoire/10 py-14 sm:grid-cols-3 sm:gap-8">
            {chiffresFormation.map((c) => (
              <Chiffre
                key={c.libelle}
                valeur={c.valeur}
                unite={c.unite}
                libelle={c.libelle}
              />
            ))}
          </div>
        </Reveal>
      </Section>

      {/* ------------------------------------------------------------------
          Les six disciplines, en grille asymétrique. Chaque bloc mène à sa
          propre page : six pages positionnables au lieu d’une page fleuve.
         ------------------------------------------------------------------ */}
      <Section
        id="disciplines"
        surtitre="Ce qu’on y travaille"
        titre="Six disciplines, trois ans, une seule méthode : le plateau"
        chapo="Stanislavski, Grotowski, le travail avec le partenaire, la création de la mise en scène par le plateau. Les élèves apprennent en jouant, pas en écoutant."
      >
        <div className="grid gap-px bg-ivoire/10 sm:grid-cols-2 lg:grid-cols-3">
          {disciplines.map((d, i) => (
            <Reveal key={d.slug} delai={i * 60}>
              <Link
                href={`/la-formation/${d.slug}`}
                className="group relative flex h-full min-h-[22rem] flex-col justify-end overflow-hidden bg-salle p-7 transition-colors"
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
                      className="absolute inset-0 -z-10 size-full object-cover opacity-55 grayscale transition-all duration-500 ease-[var(--ease-scene)] group-hover:scale-[1.04] group-hover:opacity-85 group-hover:grayscale-0"
                    />
                    <div className="absolute inset-0 -z-10 bg-gradient-to-t from-salle via-salle/70 to-salle/10" />
                  </>
                )}
                <p className="surtitre surtitre-sourd">{d.annees}</p>
                <h3 className="mt-3 text-[length:var(--text-xl)]">{d.titre}</h3>
                <p className="mt-3 font-sans text-sm text-ivoire-doux">
                  {d.accroche}
                </p>
                <span
                  aria-hidden
                  className="mt-5 font-sans text-xs uppercase tracking-[0.14em] text-scene opacity-0 transition-opacity duration-200 group-hover:opacity-100"
                >
                  Voir la discipline →
                </span>
              </Link>
            </Reveal>
          ))}
        </div>

        <div className="mt-12">
          <Bouton href="/la-formation" variante="fantome">
            Le cursus complet
          </Bouton>
        </div>
      </Section>

      {/* ------------------------------------------------------------------
          Un parcours d’ancien élève, en pleine largeur. La preuve avant
          l’argument.
         ------------------------------------------------------------------ */}
      <Section fond="plateau" surtitre="Après l’école">
        <Reveal>
          <div className="grid gap-12 lg:grid-cols-12 lg:gap-16">
            <div className="lg:col-span-7">
              <h2 className="text-[length:var(--text-3xl)]">
                {enAvant.nom}, promotion&nbsp;
                <span className="tnum">{enAvant.promotion}</span>
              </h2>
              <p className="surtitre mt-4">{enAvant.metier}</p>

              <ul className="mt-9 space-y-4">
                {enAvant.parcours.map((etape) => (
                  <li
                    key={etape}
                    className="flex gap-4 font-sans text-sm text-ivoire-doux"
                  >
                    <span aria-hidden className="mt-2.5 block h-px w-6 shrink-0 bg-scene" />
                    {etape}
                  </li>
                ))}
              </ul>

              <div className="mt-10">
                <Bouton href="/alumni" variante="fantome">
                  Tous les parcours
                </Bouton>
              </div>
            </div>

            <div className="lg:col-span-5 lg:pt-4">
              <Citation
                texte={enAvant.citation}
                auteur={enAvant.nom}
                precision={`Promotion ${enAvant.promotion}`}
              />
            </div>
          </div>
        </Reveal>
      </Section>

      {/* ------------------------------------------------------------------
          Les indicateurs Qualiopi. Obligatoires — et surtout, vendeurs.
         ------------------------------------------------------------------ */}
      <Section
        surtitre="Nos résultats"
        titre="Ce que deviennent nos élèves"
        chapo="Indicateurs publiés au titre de la certification Qualiopi. Ils portent sur la promotion 2022-2025 et sur l’enquête de satisfaction 2025-2026."
      >
        <Reveal>
          <div className="grid gap-12 border-t border-ivoire/10 pt-14 sm:grid-cols-2 lg:grid-cols-4">
            {indicateurs.map((i) => (
              <Chiffre
                key={i.libelle}
                valeur={i.valeur}
                libelle={i.libelle}
                precision={i.precision}
              />
            ))}
          </div>
        </Reveal>

        <div className="mt-12">
          <Bouton href="/l-ecole/resultats" variante="fantome">
            Le détail des enquêtes
          </Bouton>
        </div>
      </Section>

      {/* ------------------------------------------------------------------
          Appel final. Une seule action, et ce qu’elle implique vraiment.
         ------------------------------------------------------------------ */}
      <section className="relative overflow-hidden border-y border-ivoire/10">
        <div className="absolute inset-0 -z-10">
          <Photo
            id={spectacles[1].photos[0]}
            alt=""
            decoratif
            largeur={2000}
            hauteur={1000}
            sizes="100vw"
            className="size-full object-cover opacity-25 grayscale"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-salle via-salle/90 to-salle/60" />
        </div>

        <div className="enveloppe py-[var(--spacing-section)]">
          <div className="max-w-2xl">
            <p className="surtitre">Année {site.anneeScolaire}</p>
            <h2 className="mt-5 text-[length:var(--text-3xl)]">
              L’audition, c’est une scène de cinq minutes, une chanson et un
              entretien.
            </h2>
            <p className="prose-etl mt-7">
              Pas de dossier interminable, pas de concours anonyme. On veut
              savoir comment vous jouez et pourquoi vous voulez faire ce métier.
              Le reste, on vous l’apprend.
            </p>
            <div className="mt-10 flex flex-wrap gap-4">
              <Bouton href="/candidater">Voir les conditions d’admission</Bouton>
              <Bouton href="/candidater/portes-ouvertes" variante="fantome" fleche={false}>
                Venir aux portes ouvertes
              </Bouton>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
