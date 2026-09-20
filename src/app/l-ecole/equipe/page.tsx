import type { Metadata } from "next";
import Link from "next/link";
import { Photo } from "@/components/Photo";
import { Poursuite } from "@/components/Poursuite";
import { EnTete, Section } from "@/components/Mise";
import { administration, equipe } from "@/content/equipe";
import type { Intervenant } from "@/content/types";

export const metadata: Metadata = {
  title: "L’équipe pédagogique",
  description:
    "Douze artistes professionnels en activité : TNS, ENSATT, ERACM, Conservatoire Royal de Bruxelles, ESNAM, Broadway Dance Center. L’équipe de l’École de Théâtre de Lyon.",
  alternates: { canonical: "/l-ecole/equipe" },
};

function Carte({ i }: { i: Intervenant }) {
  return (
    <li>
      <Link
        href={`/l-ecole/equipe/${i.slug}`}
        className="group block bg-fond transition-colors"
      >
        {i.portrait && (
          /* La poursuite, sur un visage. Le portrait est à froid ; on l'éclaire
             en passant dessus. C'est le dispositif signature du site, et c'est
             ici qu'il est le plus juste : on met la lumière sur quelqu'un. */
          <Poursuite className="poursuite--papier aspect-[7/8] w-full bg-fond-doux">
            <Photo
              id={i.portrait}
              alt=""
              decoratif
              largeur={700}
              hauteur={800}
              sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw"
              className="poursuite-froid"
            />
            <Photo
              id={i.portrait}
              alt=""
              decoratif
              largeur={700}
              hauteur={800}
              sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw"
              className="poursuite-chaud"
            />
          </Poursuite>
        )}
        <div className="pt-5">
          <h3 className="font-display text-[length:var(--text-lg)] group-hover:text-accent">
            {i.prenom} {i.nom}
          </h3>
          <p className="mt-1 font-sans text-xs text-texte-sourd">{i.fonction}</p>
          <p className="mt-3 font-sans text-sm text-texte-doux">
            {i.matieres.join(" · ")}
          </p>
        </div>
      </Link>
    </li>
  );
}

export default function Equipe() {
  const cursus = equipe.filter((i) => i.categorie === "cursus");
  const modules = equipe.filter((i) => i.categorie === "module");

  return (
    <>
      <EnTete
        surtitre="Équipe pédagogique"
        titre="Ceux qui enseignent jouent encore"
        chapo="Des artistes professionnels, hautement diplômés, qui montent sur scène par ailleurs. C’est la condition pour transmettre un métier tel qu’il s’exerce aujourd’hui, pas tel qu’il s’exerçait il y a vingt ans."
      />

      <Section surtitre="Le cursus">
        <ul className="grid grid-cols-2 gap-x-6 gap-y-12 lg:grid-cols-4">
          {cursus.map((i) => (
            <Carte key={i.slug} i={i} />
          ))}
        </ul>
      </Section>

      <Section
        registre="creme"
        surtitre="Les modules"
        chapo="Escrime et combat de scène, marionnette et théâtre d’objet : deux spécialités enseignées par des référents de leur discipline."
      >
        <ul className="grid grid-cols-2 gap-x-6 gap-y-12 lg:grid-cols-4">
          {modules.map((i) => (
            <Carte key={i.slug} i={i} />
          ))}
        </ul>
      </Section>

      <Section surtitre="Administration">
        <ul className="grid gap-px bg-[var(--color-filet)] sm:grid-cols-2 lg:grid-cols-4">
          {administration.map((a) => (
            <li key={a.nom} className="bg-fond p-7">
              <p className="font-display text-[length:var(--text-lg)]">{a.nom}</p>
              <p className="mt-1 font-sans text-xs text-texte-sourd">
                {a.fonction}
              </p>
              {"precision" in a && a.precision && (
                <p className="mt-3 font-sans text-xs uppercase tracking-[0.12em] text-accent">
                  {a.precision}
                </p>
              )}
            </li>
          ))}
        </ul>
      </Section>
    </>
  );
}
