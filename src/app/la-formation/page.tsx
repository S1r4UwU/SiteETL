import type { Metadata } from "next";
import Link from "next/link";
import { Bouton } from "@/components/Bouton";
import { Photo } from "@/components/Photo";
import { Poursuite } from "@/components/Poursuite";
import { Galerie } from "@/components/Galerie";
import { Distribution } from "@/components/Distribution";
import { Marque } from "@/components/Marque";
import { Apparition, TitreLeve } from "@/components/Apparition";
import { EnTete, Fiche, Section } from "@/components/Mise";
import {
  disciplines,
  feuilleFormation,
  modules,
  repertoire,
} from "@/content/disciplines";
import { nomComplet } from "@/content/equipe";
import { cours } from "@/content/coulisses";
import { parId } from "@/content/medias";
import { spectacles } from "@/content/spectacles";

export const metadata: Metadata = {
  title: "Le cursus en trois ans",
  description:
    "Formation de comédien·ne sur trois ans à Lyon : 1 500 heures, 95 % de pratique, 20 élèves par promotion, stage professionnel obligatoire chaque année. Certifiée Qualiopi.",
  alternates: { canonical: "/la-formation" },
};

/* Les trois années, avec les disciplines réellement au programme de chacune. */
const annees = [
  {
    numero: "01",
    titre: "Les fondations",
    texte:
      "Le corps et la voix avant tout le reste. On désapprend les réflexes, on trouve son ancrage, sa respiration, son médium. Le vers entre dès cette année, et le chant et la danse commencent.",
    disciplines: ["Voix & corps", "Jeu d’acteur", "Dire le vers", "Chant", "Danse"],
  },
  {
    numero: "02",
    titre: "Le répertoire",
    texte:
      "Le travail de scènes s’intensifie et le répertoire s’ouvre : tragédie grecque, classique, contemporain. Les modules arrivent — escrime, clown, marionnette, biomécanique. La promotion monte son premier vrai spectacle.",
    disciplines: [
      "Jeu d’acteur",
      "Dire le vers",
      "Chant",
      "Danse",
      "Modules",
      "Projet d’autonomie",
    ],
  },
  {
    numero: "03",
    titre: "La sortie",
    texte:
      "La caméra entre dans le cursus : castings, jeu face caméra, conditions réelles. Les cours d’administration et de communication préparent la vie d’après. La promotion crée son spectacle de sortie, joué devant du public.",
    disciplines: [
      "Jeu face caméra",
      "Jeu d’acteur",
      "Administration & communication",
      "Spectacle de sortie",
    ],
  },
];

const competences = [
  "Se présenter à des auditions au théâtre",
  "Se présenter à des castings dans l’audiovisuel et le cinéma",
  "Interpréter tous types de rôles au théâtre et au cinéma",
  "Interpréter des rôles avec danse, chant, combats et escrime",
  "Comprendre et interpréter des textes en lecture et en doublage",
  "Analyser et comprendre les textes et les mises en scène",
  "Mettre en scène une pièce",
  "Monter une compagnie",
];

export default function LaFormation() {
  const photosCours = cours.filter((c) => c.alt || c.titre);

  return (
    <>
      <EnTete
        surtitre="Formation professionnalisante — certifiée Qualiopi"
        titre="Trois ans pour devenir comédien·ne"
        chapo="De septembre à juin, dans une promotion de vingt élèves au maximum. Jeu, caméra, voix, corps, vers, chant, danse, escrime, clown, marionnette — et les cours qui préparent la vie professionnelle."
        photo={spectacles[1].photos[1]}
        enfants={
          <div className="flex flex-wrap gap-4">
            <Bouton href="/candidater">Candidater</Bouton>
            <Bouton href="#disciplines" variante="fantome" fleche={false}>
              Les six disciplines
            </Bouton>
          </div>
        }
      />

      {/* ═══ La feuille de service ═════════════════════════════════════════ */}
      <Section className="!pb-16">
        <div className="grid gap-12 lg:grid-cols-12 lg:gap-16">
          <div className="lg:col-span-4">
            <p className="marge-numero">Feuille de service</p>
            <p className="surtitre">Le cursus en chiffres</p>
            <p className="prose-etl mt-5">
              Les volumes réels, ceux de la plaquette. C’est la première chose
              qu’on veut savoir avant de s’engager trois ans.
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

      {/* ═══ La progression ════════════════════════════════════════════════ */}
      <Section registre="creme" surtitre="La progression">
        <TitreLeve
          className="max-w-3xl text-[length:var(--text-3xl)]"
          lignes={["Ce qui change", "d’une année à l’autre"]}
        />

        <ol className="mt-14 space-y-px bg-[var(--color-filet)]">
          {annees.map((a, i) => (
            <li key={a.numero} className="bg-fond-doux py-10">
              <div className="grid gap-6 md:grid-cols-12 md:gap-10">
                <div className="md:col-span-3">
                  <p className="porte-marque inline-block font-display text-[length:var(--text-4xl)] leading-none text-accent tnum">
                    {a.numero}
                    {/* Une seule marque, sur la dernière année : celle qui compte. */}
                    {i === 2 && (
                      <Marque
                        forme="cercle"
                        bascule={-3}
                        delai={300}
                        className="marque-sur -left-[24%] -top-[22%] w-[150%]"
                      />
                    )}
                  </p>
                  <h3 className="mt-5 text-[length:var(--text-xl)]">{a.titre}</h3>
                </div>
                <p className="prose-etl md:col-span-5">{a.texte}</p>
                <ul className="flex flex-wrap content-start gap-2 md:col-span-4">
                  {a.disciplines.map((d) => (
                    <li
                      key={d}
                      className="border border-filet px-3 py-1.5 font-sans text-xs text-texte-doux"
                    >
                      {d}
                    </li>
                  ))}
                </ul>
              </div>
            </li>
          ))}
        </ol>
      </Section>

      {/* ═══ Les disciplines, en distribution ══════════════════════════════ */}
      <Section id="disciplines" surtitre="Les enseignements">
        <TitreLeve
          className="max-w-3xl text-[length:var(--text-3xl)]"
          lignes={["Six disciplines,", "chacune avec sa méthode"]}
        />
        <p className="prose-etl mt-6">
          Plusieurs intervenants, plusieurs approches — tous artistes
          professionnels en activité. Aucun élève ne sort d’ici avec une seule
          manière de faire.
        </p>

        <div className="mt-14">
          <Distribution
            lignes={disciplines.map((d) => ({
              slug: d.slug,
              titre: d.titre,
              mention: d.annees,
              second: d.intervenants.map(nomComplet).join(" · "),
              photo: d.photos?.[0] ?? d.photo,
              href: `/la-formation/${d.slug}`,
            }))}
          />
        </div>
      </Section>

      {/* ═══ Le répertoire, en mur d'affiche ═══════════════════════════════
          Vingt-sept auteurs. En liste à puces c'est un inventaire ; composés
          à des corps différents, c'est une affiche — et c'est ce qu'est
          vraiment un répertoire : une déclaration d'intention.
         ═══════════════════════════════════════════════════════════════════ */}
      <Section registre="salle">
        <div className="grid gap-10 lg:grid-cols-12">
          <div className="lg:col-span-4">
            <p className="surtitre">Le répertoire</p>
            <h2 className="mt-5 text-[length:var(--text-2xl)]">Ce qu’on joue</h2>
            <p className="prose-etl mt-6">
              De la tragédie grecque au contemporain, en passant par la comédie
              et le classique. Ce ne sont pas des références : ce sont les
              textes que les élèves ont sur les bras.
            </p>
          </div>

          <div className="lg:col-span-8">
            <Apparition>
              <ul className="repertoire">
                {repertoire.map((auteur, i) => (
                  <li
                    key={auteur}
                    className="repertoire-nom"
                    data-taille={["a", "b", "c", "b", "a", "c", "b"][i % 7]}
                  >
                    {auteur}
                  </li>
                ))}
              </ul>
            </Apparition>
          </div>
        </div>
      </Section>

      {/* ═══ Les modules ═══════════════════════════════════════════════════ */}
      <Section surtitre="En complément" titre="Les modules">
        <p className="prose-etl">
          Des disciplines qui ouvrent le champ des rôles possibles — et qui, sur
          un CV de comédien, font souvent la différence.
        </p>

        <dl className="feuille mt-12">
          {modules.map((m) => (
            <div key={m.titre} className="feuille-ligne !grid-cols-1 md:!grid-cols-[minmax(0,14rem)_1fr_minmax(0,auto)]">
              <dt className="font-display text-[length:var(--text-lg)] leading-tight">
                {m.titre}
              </dt>
              <dd className="feuille-libelle !text-texte-doux">
                {m.description}
              </dd>
              <dd className="feuille-note">
                {m.intervenant ? nomComplet(m.intervenant) : "—"}
              </dd>
            </div>
          ))}
        </dl>
      </Section>

      {/* ═══ Les cours, en images ══════════════════════════════════════════ */}
      {photosCours.length > 0 && (
        <Section registre="creme" surtitre="Les cours">
          <div className="max-w-2xl">
            <h2 className="text-[length:var(--text-2xl)]">
              Quatre-vingt-quinze pour cent du temps, les élèves sont debout
            </h2>
            <p className="prose-etl mt-5">
              Chant, danse, clown, marionnette, escrime, enregistrement de voix
              en studio, préparation aux castings. Les légendes sont celles de
              l’école : elles nomment les promotions et les années.
            </p>
          </div>
          <div className="mt-12">
            <Galerie medias={photosCours} legende="Les cours" colonnes="quatre" />
          </div>
        </Section>
      )}

      {/* ═══ Le cadre ══════════════════════════════════════════════════════ */}
      <Section surtitre="Le cadre">
        <div className="grid gap-14 lg:grid-cols-12 lg:gap-16">
          <div className="lg:col-span-7">
            <h2 className="text-[length:var(--text-2xl)]">
              En sortant, l’étudiant·e sait
            </h2>
            <ul className="mt-8 space-y-3.5">
              {competences.map((c) => (
                <li key={c} className="flex gap-4 font-sans text-sm text-texte-doux">
                  <span aria-hidden className="mt-2.5 h-px w-5 shrink-0 bg-accent" />
                  {c}
                </li>
              ))}
            </ul>
          </div>

          <div className="lg:col-span-5">
            <p className="surtitre">Méthodes mobilisées</p>
            <p className="mt-4 font-sans text-sm text-texte-doux">
              Mises en situation, jeux de rôles, exercices physiques,
              présentation de supports, apports théoriques, exposés magistraux.
            </p>
            <p className="surtitre mt-10">Évaluation</p>
            <p className="mt-4 font-sans text-sm text-texte-doux">
              Contrôle continu, mises en situation, restitutions, exposés,
              rendus écrits, entretiens personnels. Suivi individuel régulier et
              bilan semestriel.
            </p>
          </div>
        </div>
      </Section>

      {/* ═══ En pratique ═══════════════════════════════════════════════════ */}
      <Section registre="salle" surtitre="En pratique">
        <div className="grid gap-12 lg:grid-cols-12 lg:gap-16">
          <div className="lg:col-span-7">
            <Fiche
              entrees={[
                { terme: "Durée", valeur: "3 ans, de septembre à juin" },
                { terme: "Volume", valeur: "14 à 18 h par semaine — environ 1 500 h au total" },
                { terme: "Effectif", valeur: "20 élèves au maximum par promotion" },
                { terme: "Pratique", valeur: "95 % du temps de formation" },
                {
                  terme: "Stage",
                  valeur:
                    "Stage obligatoire en milieu professionnel chaque année (théâtres, compagnies)",
                },
                { terme: "Lieu", valeur: "53 rue des Tables Claudiennes, Lyon 1er" },
                {
                  terme: "Tarifs",
                  valeur: (
                    <>
                      4 300 € en 1re année · 4 500 € en 2e · 4 700 € en 3e.{" "}
                      <Link href="/candidater/financement" className="lien">
                        Financements possibles
                      </Link>
                    </>
                  ),
                },
                {
                  terme: "Accessibilité",
                  valeur: (
                    <Link href="/l-ecole/accessibilite" className="lien">
                      Situations de handicap — notre dispositif d’accompagnement
                    </Link>
                  ),
                },
              ]}
            />

            <div className="mt-12 flex flex-wrap gap-4">
              <Bouton href="/candidater">Candidater</Bouton>
              <Bouton href="/contact" variante="fantome" fleche={false}>
                Poser une question
              </Bouton>
            </div>
          </div>

          <div className="lg:col-span-5">
            <Poursuite className="aspect-[4/5] w-full">
              <Photo
                id={spectacles[2].photos[0]}
                alt="Élèves de l’École de Théâtre de Lyon en répétition"
                largeur={900}
                hauteur={1100}
                sizes="(max-width: 1024px) 100vw, 40vw"
                className="poursuite-froid"
              />
              <Photo
                id={spectacles[2].photos[0]}
                alt=""
                decoratif
                largeur={900}
                hauteur={1100}
                sizes="(max-width: 1024px) 100vw, 40vw"
                className="poursuite-chaud"
              />
            </Poursuite>
            <p className="credit mt-3">
              {parId(spectacles[2].photos[0])?.credit
                ? `Photo : ${parId(spectacles[2].photos[0])?.credit}`
                : ""}
            </p>
          </div>
        </div>
      </Section>
    </>
  );
}
