import type { Metadata } from "next";
import { Bouton } from "@/components/Bouton";
import { Photo } from "@/components/Photo";
import { EnTete, Citation, Section } from "@/components/Mise";
import { spectacles } from "@/content/spectacles";
import { temoignagesEleves } from "@/content/alumni";
import { cours, dixAns } from "@/content/coulisses";
import { site } from "@/lib/site";

export const metadata: Metadata = {
  title: "L’école",
  description:
    "Une école de vingt élèves par promotion, au cœur des pentes de la Croix-Rousse. Projet pédagogique, équipe, locaux, certification Qualiopi.",
  alternates: { canonical: "/l-ecole" },
};

export default function LEcole() {
  return (
    <>
      <EnTete
        surtitre={site.devise}
        titre="Une école où l’on se connaît par son prénom"
        chapo="Vingt élèves au maximum par promotion, sur trois ans. Assez peu pour que chaque intervenant sache où vous en êtes, assez pour faire une troupe."
        photo={spectacles[0].photos[2]}
      />

      <Section>
        <div className="grid gap-16 lg:grid-cols-12 lg:gap-20">
          <div className="lg:col-span-7">
            <p className="surtitre">Le projet pédagogique</p>
            <div className="prose-etl mt-6 text-[length:var(--text-lg)]">
              <p>
                Le projet pédagogique de l’école vise à transmettre les bases
                techniques, théoriques et artistiques indispensables à la
                pratique professionnelle du théâtre d’aujourd’hui, tel qu’il
                s’exprime dans sa richesse et sa diversité.
              </p>
              <p>
                Cela passe par un principe simple :{" "}
                <strong>plusieurs intervenants, plusieurs approches</strong>.
                Aucun élève ne sort d’ici avec une seule manière de faire. La
                méthode Stanislavski et celle de Grotowski, le travail avec le
                partenaire, la mise en œuvre de l’énergie créatrice du groupe, la
                création participative de la mise en scène par le plateau — ce
                sont des outils différents, et il faut les avoir tous essayés
                pour savoir lesquels sont les siens.
              </p>
              <p>
                L’objectif final n’est pas de former des élèves dociles, mais des
                artistes autonomes : capables de comprendre un texte, de
                construire un rôle, de monter un projet et, s’il le faut, de
                créer leur propre compagnie.
              </p>
            </div>

            <div className="mt-12 flex flex-wrap gap-4">
              <Bouton href="/la-formation">Le cursus en trois ans</Bouton>
              <Bouton href="/l-ecole/equipe" variante="fantome" fleche={false}>
                L’équipe pédagogique
              </Bouton>
            </div>
          </div>

          <aside className="lg:col-span-5">
            <Photo
              id={spectacles[2].photos[1]}
              alt="Répétition sur le plateau de l’École de Théâtre de Lyon"
              largeur={900}
              hauteur={1200}
              sizes="(max-width: 1024px) 100vw, 40vw"
              className="w-full object-cover"
            />
          </aside>
        </div>
      </Section>

      {/* Le lieu — argument réel : les pentes de la Croix-Rousse, un théâtre
          partenaire à la même adresse que l’administration. */}
      <Section
        registre="creme"
        surtitre="Le lieu"
        titre="Sur les pentes, à deux pas d’un théâtre"
      >
        <div className="grid gap-12 md:grid-cols-3">
          <div>
            <h3 className="font-display text-[length:var(--text-lg)]">
              Les salles de cours
            </h3>
            <p className="mt-4 font-sans text-sm text-texte-doux">
              {site.adresseCours.rue}, dans le 1er arrondissement, sur les pentes
              de la Croix-Rousse. Métro Croix-Paquet à deux minutes, bus S6 à
              l’arrêt Tables Claudiennes.
            </p>
          </div>
          <div>
            <h3 className="font-display text-[length:var(--text-lg)]">
              Le théâtre
            </h3>
            <p className="mt-4 font-sans text-sm text-texte-doux">
              Les spectacles d’élèves se jouent au Théâtre Le Nombril du Monde,
              place Chardonnet. Jouer dans un vrai lieu, devant un vrai public,
              fait partie de la formation.
            </p>
          </div>
          <div>
            <h3 className="font-display text-[length:var(--text-lg)]">
              L’administration
            </h3>
            <p className="mt-4 font-sans text-sm text-texte-doux">
              {site.adresseAdmin.rue}, {site.adresseAdmin.cp}{" "}
              {site.adresseAdmin.ville}. Ouverte du lundi au vendredi, de 9h à
              17h30 — on y répond au téléphone.
            </p>
          </div>
        </div>
      </Section>

      {/* Les coulisses. Trente-neuf photographies qui dormaient dans une
          galerie sans titre de l’ancien site : le module clown, le studio de
          voix, la préparation aux castings, la fête des dix ans. Les légendes
          sont celles de l’école, mot pour mot — elles nomment les promotions
          et les années, et c’est ce qui les rend vraies. */}
      <Section registre="salle" surtitre="Les coulisses">
        <div className="grid gap-10 lg:grid-cols-12 lg:gap-16">
          <div className="lg:col-span-4">
            <h2 className="text-[length:var(--text-3xl)]">
              Ce qui se passe entre les spectacles
            </h2>
            <p className="prose-etl mt-6">
              Le cours de danse du mardi, l’enregistrement de voix en studio, la
              préparation aux castings, le module clown, et la fête des dix ans
              de l’école en mai 2022. C’est là que se passe l’essentiel des
              1 500 heures.
            </p>
          </div>

          <div className="lg:col-span-8">
            <ul className="grid grid-cols-2 gap-3 sm:grid-cols-3">
              {cours.slice(0, 9).map((c) => (
                <li key={c.id}>
                  <Photo
                    id={c.id}
                    alt={c.alt ?? c.titre ?? "Cours à l’École de Théâtre de Lyon"}
                    largeur={600}
                    hauteur={450}
                    sizes="(max-width: 640px) 50vw, 25vw"
                    className="aspect-[4/3] w-full object-cover"
                  />
                  {c.titre && (
                    <p className="credit mt-2 line-clamp-2">{c.titre}</p>
                  )}
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="filet mt-16 pt-12">
          <p className="surtitre">Mai 2022 — les dix ans de l’école</p>
          <ul className="mt-8 grid grid-cols-3 gap-3 sm:grid-cols-6">
            {dixAns.slice(0, 12).map((c) => (
              <li key={c.id}>
                <Photo
                  id={c.id}
                  alt={c.alt ?? "Fête des dix ans de l’École de Théâtre de Lyon, mai 2022"}
                  largeur={400}
                  hauteur={400}
                  sizes="(max-width: 640px) 33vw, 16vw"
                  className="aspect-square w-full object-cover"
                />
              </li>
            ))}
          </ul>
        </div>
      </Section>

      {/* Ce que les élèves en disent — tirés des enquêtes Qualiopi. */}
      <Section surtitre="Ce qu’en disent les élèves">
        <div className="grid gap-12 lg:grid-cols-3">
          {temoignagesEleves.map((t) => (
            <Citation key={t.auteur} texte={t.texte} auteur={t.auteur} />
          ))}
        </div>
        <p className="mt-12 font-sans text-xs text-texte-sourd">
          Extraits des enquêtes de satisfaction 2025-2026.{" "}
          <a href="/l-ecole/resultats" className="lien">
            Voir tous les indicateurs
          </a>
        </p>
      </Section>
    </>
  );
}
