import Link from "next/link";
import { Bouton } from "@/components/Bouton";
import { Photo } from "@/components/Photo";
import { Poursuite } from "@/components/Poursuite";
import { PlanLent } from "@/components/PlanLent";
import { Bande } from "@/components/Bande";
import { Defilant } from "@/components/Defilant";
import { Apparition, Compteur, TitreLeve } from "@/components/Apparition";
import { Citation, Section } from "@/components/Mise";
import { Marque } from "@/components/Marque";
import { Distribution } from "@/components/Distribution";
import { nomComplet } from "@/content/equipe";
import { disciplines, feuilleFormation, repertoire } from "@/content/disciplines";
import { alumni, indicateurs } from "@/content/alumni";
import { photographes, promotions } from "@/content/promotions";
import { spectacles } from "@/content/spectacles";
import { agenda, libelleType, periode } from "@/lib/agenda";
import { site } from "@/lib/site";

export const revalidate = 3600;

/* Le trajet d’une soirée : on entre par le noir, on lit son programme sur du
   papier, la lumière retombe sur les affiches, on relit, et le noir revient
   pour l’appel. Chaque bascule de registre est un effet en soi. */

export default function Accueil() {
  const { prochain } = agenda();
  const enAvant = alumni[0];
  const affiche = spectacles[0];

  return (
    <>
      {/* ═══ NOIR ═══ Le plateau ════════════════════════════════════════════
          Une photo prise deux fois : à froid dessous, en pleine lumière
          dessus, découpée par une poursuite que le visiteur déplace. On
          n’explique pas ce qu’est une école de théâtre — on met quelqu’un
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

      {/* La feuille de service. C’était une rangée de trois grands chiffres
          centrés — le réflexe exact d’une machine à qui l’on donne trois
          données. C’est maintenant un document de travail : six lignes, des
          colonnes, des notes en marge. Plus dense, plus vrai, et on peut y
          ajouter une ligne sans casser la composition. */}
      <Section className="!pb-16 !pt-20 md:!pt-24">
        <div className="grid gap-12 lg:grid-cols-12 lg:gap-16">
          <div className="lg:col-span-4">
            <p className="marge-numero">Feuille de service</p>
            <p className="surtitre">Le cursus en chiffres</p>
            <p className="prose-etl mt-5">
              Rien d’extraordinaire là-dedans : ce sont les volumes réels, ceux
              qui figurent sur la plaquette. Nous les mettons ici parce que
              c’est la première chose qu’on veut savoir avant de s’engager trois
              ans.
            </p>
          </div>

          <div className="lg:col-span-8">
            <Apparition>
              <dl className="feuille">
                {feuilleFormation.map((l) => (
                  <div key={l.libelle} className="feuille-ligne">
                    <dt className="feuille-valeur">
                      {l.valeur}
                      <span className="ml-1.5 text-[length:var(--text-sm)] text-texte-sourd">
                        {l.unite}
                      </span>
                    </dt>
                    <dd className="feuille-libelle">{l.libelle}</dd>
                    <dd className="feuille-note">{l.note}</dd>
                  </div>
                ))}
              </dl>
            </Apparition>
          </div>
        </div>
      </Section>

      {/* La distribution. C’était une grille de six cartes — le réflexe d’une
          machine à qui l’on demande de présenter six choses. C’est maintenant
          la forme la plus reconnaissable du théâtre imprimé : nom à gauche,
          mention à droite, points de conduite entre les deux. La vignette sort
          de la gouttière au survol : c’est le débord de la page. */}
      <Section id="disciplines" registre="creme">
        <div className="grid gap-10 lg:grid-cols-12">
          <div className="lg:col-span-7">
            <p className="surtitre">Ce qu’on y travaille</p>
            <TitreLeve
              className="mt-5 text-[length:var(--text-3xl)]"
              lignes={["Six disciplines, trois ans,", "une seule méthode :"]}
            />
            {/* Le mot entouré au crayon — une seule marque dans cet écran. */}
            <span className="porte-marque mt-1 inline-block font-display text-[length:var(--text-3xl)] leading-none">
              le plateau
              <Marque
                forme="cercle"
                bascule={-1.5}
                delai={420}
                className="marque-sur -left-[7%] -top-[26%] w-[118%]"
              />
            </span>
            <p className="prose-etl mt-7">
              Stanislavski, Grotowski, le travail avec le partenaire, la
              création de la mise en scène par le plateau. Quatre-vingt-quinze
              pour cent du temps, les élèves sont debout.
            </p>
          </div>
        </div>

        <div className="mt-14">
          <Distribution
            lignes={disciplines.map((d) => ({
              slug: d.slug,
              titre: d.titre,
              mention: d.annees,
              second: d.intervenants.map(nomComplet).join(" · "),
              photo: d.photo,
              href: `/la-formation/${d.slug}`,
            }))}
          />
        </div>

        <div className="mt-12">
          <Bouton href="/la-formation" variante="fantome">
            Le cursus complet
          </Bouton>
        </div>
      </Section>

      {/* ═══ NOIR ═══ Le mur d’affiches ════════════════════════════════════
          Le défilement vertical fait avancer quinze ans de spectacles à
          l’horizontale. C’est le moment où le site cesse d’être une page.
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

      {/* Les promotions. Chaque promotion porte le nom d’un artiste choisi par
          les élèves — Ariane Mnouchkine, Jean-Pierre Bacri, Kae Tempest. Ce
          détail n’apparaissait NULLE PART sur l’ancien site : il était enfoui
          dans les légendes des photos de galerie, d’où il a été récolté. C’est
          exactement le genre de chose qui ne s’invente pas, et qui fait qu’un
          site appartient à quelqu’un. */}
      <Section>
        <div className="grid gap-10 lg:grid-cols-12 lg:gap-16">
          <div className="lg:col-span-5">
            <p className="marge-numero">Les promotions</p>
            <p className="surtitre">Une maison où l’on porte un nom</p>
            <TitreLeve
              className="mt-5 text-[length:var(--text-3xl)]"
              lignes={["Chaque promotion", "choisit *son* artiste"]}
            />
            <p className="prose-etl mt-7">
              À l’entrée, la promotion se choisit un nom. Ce n’est pas une
              formalité : c’est la première décision collective de trois années
              de troupe, et elle engage. On ne sort pas indemne d’avoir passé
              trois ans à s’appeler Beckett.
            </p>
            <p className="mt-6 font-sans text-xs text-texte-sourd">
              Relevé dans les légendes des photographies de l’école. Les années
              exactes et les promotions antérieures à 2021 restent à compléter.
            </p>
          </div>

          <div className="lg:col-span-7">
            <Apparition>
              <ol className="promos">
                {promotions.map((pr) => (
                  <li key={pr.nom} className="promo">
                    <span className="promo-nom">{pr.nom}</span>
                    <span className="promo-qui">{pr.qui}</span>
                    <span className="promo-periode">{pr.periode}</span>
                  </li>
                ))}
              </ol>
            </Apparition>

            <p className="credit mt-8">
              Les photographies de l’école sont l’œuvre de{" "}
              {photographes.slice(0, -1).join(", ")} et{" "}
              {photographes[photographes.length - 1]}.
            </p>
          </div>
        </div>
      </Section>

      {/* ═══ PAPIER ═══ Après l’école ══════════════════════════════════════ */}
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

      {/* Les résultats. C’était quatre grands pourcentages en ligne — la même
          rangée, une troisième fois. Un seul chiffre domine maintenant, entouré
          au crayon, et les trois autres passent en feuille. Une hiérarchie, pas
          un alignement. */}
      <Section registre="creme">
        <div className="grid gap-12 lg:grid-cols-12 lg:gap-16">
          <div className="lg:col-span-5">
            <p className="surtitre">Nos résultats</p>
            <p className="porte-marque mt-8 inline-block font-display text-[length:var(--text-5xl)] leading-none text-accent">
              <Compteur valeur={100} suffixe=" %" />
              <Marque
                forme="cercle"
                bascule={2}
                delai={600}
                className="marque-sur -left-[12%] -top-[24%] w-[126%]"
              />
            </p>
            <p className="mt-7 max-w-sm font-display text-[length:var(--text-xl)] leading-tight">
              des élèves de la promotion 2022-2025 se sont professionnalisés
              dans les six mois.
            </p>
            <p className="mt-4 max-w-sm font-sans text-sm text-texte-sourd">
              Sur une promotion de vingt, ce sont vingt parcours suivis un par
              un — pas une statistique de masse. Sept d’entre eux racontent le
              leur sur ce site, nommément.
            </p>
            <div className="mt-9">
              <Bouton href="/l-ecole/resultats" variante="fantome">
                Le détail des enquêtes
              </Bouton>
            </div>
          </div>

          <div className="lg:col-span-6 lg:col-start-7 lg:pt-4">
            <Apparition>
              <dl className="feuille">
                {indicateurs.slice(1).map((ind) => (
                  <div key={ind.libelle} className="feuille-ligne">
                    <dt className="feuille-valeur">{ind.valeur}</dt>
                    <dd className="feuille-libelle">{ind.libelle}</dd>
                    <dd className="feuille-note">{ind.precision}</dd>
                  </div>
                ))}
                <div className="feuille-ligne">
                  <dt className="feuille-valeur">2</dt>
                  <dd className="feuille-libelle">
                    Anciennes admises à l’ENSATT et à l’École Nationale de
                    Théâtre du Canada
                  </dd>
                  <dd className="feuille-note">promotions 2023 et 2025</dd>
                </div>
              </dl>
              <p className="mt-6 font-sans text-xs text-texte-sourd">
                Indicateurs publiés au titre de la certification Qualiopi.
                Enquête de satisfaction 2025-2026, enquête d’insertion sur la
                promotion 2022-2025.
              </p>
            </Apparition>
          </div>
        </div>
      </Section>

      {/* ═══ NOIR ═══ L’appel ══════════════════════════════════════════════ */}
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
            {/* La flèche de marge : le geste du metteur en scène qui désigne
                la ligne qui compte. Une seule par écran. */}
            <div className="relative mt-10 flex flex-wrap items-center gap-4">
              <Marque
                forme="fleche"
                bascule={8}
                delai={500}
                className="pointer-events-none absolute -left-24 -top-8 hidden w-20 xl:block"
              />
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
