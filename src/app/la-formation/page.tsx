import type { Metadata } from "next";
import Link from "next/link";
import { Bouton } from "@/components/Bouton";
import { Photo } from "@/components/Photo";
import { EnTete, Fiche, Section } from "@/components/Mise";
import { Compteur } from "@/components/Apparition";
import { disciplines, modules, repertoire } from "@/content/disciplines";
import { nomComplet } from "@/content/equipe";
import { chiffresFormation } from "@/content/alumni";
import { spectacles } from "@/content/spectacles";

export const metadata: Metadata = {
  title: "Le cursus en trois ans",
  description:
    "Formation de comédien·ne sur trois ans à Lyon : 1 500 heures, 95 % de pratique, 20 élèves par promotion, stage professionnel obligatoire chaque année. Certifiée Qualiopi.",
  alternates: { canonical: "/la-formation" },
};

/* L’ancien site présentait la progression 1re → 2e → 3e année nulle part.
   C’est pourtant ce que cherche à comprendre quelqu’un qui hésite à s’engager
   pour trois ans et 13 500 €. */
const annees = [
  {
    numero: "01",
    titre: "Première année — les fondations",
    texte:
      "Le corps et la voix avant tout le reste. On désapprend les réflexes, on trouve son ancrage, sa respiration, son médium. Le vers entre dès cette année, et le chant et la danse commencent.",
    disciplines: ["Voix & corps", "Jeu d’acteur", "Dire le vers", "Chant", "Danse"],
  },
  {
    numero: "02",
    titre: "Deuxième année — le répertoire",
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
    titre: "Troisième année — la sortie",
    texte:
      "La caméra entre dans le cursus : castings, jeu face caméra, conditions réelles. Les cours d’administration et de communication préparent la vie d’après : monter une compagnie, comprendre l’intermittence, s’adresser à un lieu. La promotion crée son spectacle de sortie.",
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
  return (
    <>
      <EnTete
        surtitre="Formation professionnalisante — certifiée Qualiopi"
        titre="Trois ans pour devenir comédien·ne"
        chapo="De septembre à juin, 14 à 18 heures de cours par semaine, dans une promotion de vingt élèves au maximum. Un cursus complet : jeu, caméra, voix, corps, vers, chant, danse, escrime, clown, marionnette — et les cours qui préparent la vie professionnelle."
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

      {/* Les chiffres, en haut, avant tout argumentaire. */}
      <Section className="!pt-0">
        <div className="grid gap-12 border-y border-ivoire/10 py-14 sm:grid-cols-3">
          {chiffresFormation.map((c) => (
            <div key={c.libelle}>
              <p className="font-display text-[length:var(--text-3xl)] leading-none text-scene">
                <Compteur valeur={c.nombre} />
                <span className="ml-2 text-[length:var(--text-lg)] text-ivoire">
                  {c.unite}
                </span>
              </p>
              <p className="mt-3 font-sans text-sm text-ivoire-doux">
                {c.libelle}
              </p>
            </div>
          ))}
        </div>
      </Section>

      {/* La progression sur trois ans. */}
      <Section
        surtitre="La progression"
        titre="Ce qui change d’une année à l’autre"
      >
        <ol className="space-y-px bg-ivoire/10">
          {annees.map((a) => (
            <li
              key={a.numero}
              className="grid gap-6 bg-salle py-10 md:grid-cols-12 md:gap-10"
            >
              <p className="font-display text-[length:var(--text-3xl)] leading-none text-scene md:col-span-2 tnum">
                {a.numero}
              </p>
              <div className="md:col-span-6">
                <h3 className="text-[length:var(--text-xl)]">{a.titre}</h3>
                <p className="prose-etl mt-4">{a.texte}</p>
              </div>
              <ul className="flex flex-wrap content-start gap-2 md:col-span-4">
                {a.disciplines.map((d) => (
                  <li
                    key={d}
                    className="border border-ivoire/20 px-3 py-1.5 font-sans text-xs text-ivoire-doux"
                  >
                    {d}
                  </li>
                ))}
              </ul>
            </li>
          ))}
        </ol>
      </Section>

      {/* Les six disciplines. */}
      <Section
        id="disciplines"
        fond="plateau"
        surtitre="Les enseignements"
        titre="Six disciplines, chacune avec sa méthode"
        chapo="Plusieurs intervenants, plusieurs approches — tous artistes professionnels en activité."
      >
        <div className="grid gap-px bg-ivoire/10 sm:grid-cols-2 lg:grid-cols-3">
          {disciplines.map((d) => (
            <Link
              key={d.slug}
              href={`/la-formation/${d.slug}`}
              className="group flex min-h-72 flex-col bg-plateau p-7 transition-colors hover:bg-coulisse"
            >
              <p className="surtitre surtitre-sourd">{d.annees}</p>
              <h3 className="mt-3 text-[length:var(--text-lg)] group-hover:text-scene">
                {d.titre}
              </h3>
              <p className="mt-4 flex-1 font-sans text-sm text-ivoire-doux">
                {d.accroche}
              </p>
              <p className="mt-5 font-sans text-xs text-ivoire-sourd">
                {d.intervenants.map(nomComplet).join(" · ")}
              </p>
            </Link>
          ))}
        </div>
      </Section>

      {/* Modules. */}
      <Section
        surtitre="En complément"
        titre="Les modules"
        chapo="Des disciplines qui ouvrent le champ des rôles possibles — et qui, sur un CV de comédien, font souvent la différence."
      >
        <div className="grid gap-px bg-ivoire/10 md:grid-cols-2">
          {modules.map((m) => (
            <div key={m.titre} className="bg-salle p-7">
              <h3 className="text-[length:var(--text-lg)]">{m.titre}</h3>
              {m.intervenant && (
                <p className="mt-2 font-sans text-xs uppercase tracking-[0.14em] text-scene">
                  {nomComplet(m.intervenant)}
                </p>
              )}
              <p className="mt-4 font-sans text-sm text-ivoire-doux">
                {m.description}
              </p>
            </div>
          ))}
        </div>
      </Section>

      {/* Répertoire — la liste d’auteurs, traitée comme une affiche. */}
      <Section fond="plateau" surtitre="Le répertoire" titre="Ce qu’on joue">
        <p className="prose-etl mb-10">
          Les pièces, scènes et textes abordés sont représentatifs du répertoire.
          Ils vont de la tragédie grecque au contemporain, en passant par la
          comédie et le classique.
        </p>
        <ul className="flex flex-wrap gap-x-6 gap-y-3">
          {repertoire.map((auteur) => (
            <li
              key={auteur}
              className="font-display text-[length:var(--text-xl)] text-ivoire-doux transition-colors hover:text-scene"
            >
              {auteur}
            </li>
          ))}
        </ul>
      </Section>

      {/* Méthodes, évaluation, et ce qu’on sait faire en sortant. */}
      <Section surtitre="Le cadre" titre="Méthodes, évaluation, débouchés">
        <div className="grid gap-12 lg:grid-cols-3">
          <div>
            <h3 className="surtitre">Les méthodes mobilisées</h3>
            <ul className="mt-6 space-y-2.5 font-sans text-sm text-ivoire-doux">
              {[
                "Mises en situation",
                "Jeux de rôles",
                "Exercices physiques",
                "Présentation de supports",
                "Cours et apports théoriques",
                "Exposés magistraux",
              ].map((m) => (
                <li key={m}>{m}</li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="surtitre">Les modalités d’évaluation</h3>
            <ul className="mt-6 space-y-2.5 font-sans text-sm text-ivoire-doux">
              {[
                "Contrôle continu",
                "Mises en situation",
                "Restitutions",
                "Exposés",
                "Rendus écrits",
                "Entretiens personnels",
              ].map((m) => (
                <li key={m}>{m}</li>
              ))}
            </ul>
            <p className="mt-6 font-sans text-xs text-ivoire-sourd">
              Suivi individuel régulier et bilan semestriel.
            </p>
          </div>

          <div>
            <h3 className="surtitre">En sortant, l’étudiant·e sait</h3>
            <ul className="mt-6 space-y-2.5">
              {competences.map((c) => (
                <li
                  key={c}
                  className="flex gap-3 font-sans text-sm text-ivoire-doux"
                >
                  <span aria-hidden className="mt-2.5 h-px w-4 shrink-0 bg-scene" />
                  {c}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </Section>

      {/* Fiche pratique + plaquette. */}
      <Section fond="plateau" surtitre="En pratique">
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
                {
                  terme: "Lieu",
                  valeur: "53 rue des Tables Claudiennes, Lyon 1er",
                },
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
            <Photo
              id={spectacles[2].photos[0]}
              alt="Élèves de l’École de Théâtre de Lyon en répétition sur le plateau"
              largeur={900}
              hauteur={1100}
              sizes="(max-width: 1024px) 100vw, 40vw"
              className="w-full object-cover"
            />
          </div>
        </div>
      </Section>
    </>
  );
}
