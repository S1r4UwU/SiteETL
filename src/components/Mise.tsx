import type { ReactNode } from "react";
import { Photo } from "./Photo";

/**
 * Primitives de mise en page. Elles existent pour une raison précise :
 * l’ancien site n’avait pas de composants, mais des blocs redessinés à la main
 * page par page — d’où dix polices, des marges différentes partout et aucune
 * cohérence d’un écran à l’autre.
 */

/** En-tête de page. Le titre est toujours le seul <h1> du document. */
export function EnTete({
  surtitre,
  titre,
  chapo,
  photo,
  alt,
  enfants,
}: {
  surtitre?: string;
  titre: string;
  chapo?: string;
  photo?: string;
  alt?: string;
  enfants?: ReactNode;
}) {
  return (
    <header className="relative overflow-hidden pb-[var(--spacing-section)] pt-40 md:pt-48">
      {photo && (
        <div className="poursuite voile absolute inset-0 -z-10">
          <Photo
            id={photo}
            alt={alt ?? ""}
            decoratif={!alt}
            largeur={1920}
            hauteur={900}
            priority
            sizes="100vw"
            className="size-full object-cover opacity-45"
          />
        </div>
      )}

      <div className="enveloppe">
        {surtitre && <p className="surtitre">{surtitre}</p>}
        <h1 className="mt-5 max-w-4xl text-[length:var(--text-4xl)]">{titre}</h1>
        {chapo && (
          <p className="prose-etl mt-8 text-[length:var(--text-lg)]">{chapo}</p>
        )}
        {enfants && <div className="mt-10">{enfants}</div>}
      </div>
    </header>
  );
}

/** Section de page, avec son surtitre de programme de salle. */
export function Section({
  surtitre,
  titre,
  chapo,
  children,
  id,
  fond,
  className = "",
}: {
  surtitre?: string;
  titre?: string;
  chapo?: string;
  children: ReactNode;
  id?: string;
  fond?: "plateau";
  className?: string;
}) {
  return (
    <section
      id={id}
      className={`${fond === "plateau" ? "bg-plateau" : ""} py-[var(--spacing-section)] ${className}`}
    >
      <div className="enveloppe">
        {(surtitre || titre) && (
          <div className="max-w-3xl">
            {surtitre && <p className="surtitre">{surtitre}</p>}
            {titre && (
              <h2 className="mt-5 text-[length:var(--text-3xl)]">{titre}</h2>
            )}
            {chapo && <p className="prose-etl mt-6">{chapo}</p>}
          </div>
        )}
        <div className={surtitre || titre ? "mt-14" : ""}>{children}</div>
      </div>
    </section>
  );
}

/** Ligne de définition — « Durée : 30 heures ». Le langage du programme. */
export function Fiche({
  entrees,
}: {
  entrees: { terme: string; valeur: ReactNode }[];
}) {
  return (
    <dl className="divide-y divide-ivoire/10 border-y border-ivoire/10">
      {entrees.map((e) => (
        <div
          key={e.terme}
          className="grid gap-1 py-4 sm:grid-cols-[11rem_1fr] sm:gap-6"
        >
          <dt className="font-sans text-xs uppercase tracking-[0.14em] text-ivoire-sourd">
            {e.terme}
          </dt>
          <dd className="font-sans text-sm text-ivoire">{e.valeur}</dd>
        </div>
      ))}
    </dl>
  );
}

/** Le chiffre en très grand — l’argument que l’ancien site cachait. */
export function Chiffre({
  valeur,
  unite,
  libelle,
  precision,
}: {
  valeur: string;
  unite?: string;
  libelle: string;
  precision?: string;
}) {
  return (
    <div>
      <p className="font-display text-[length:var(--text-4xl)] leading-none text-scene tnum">
        {valeur}
        {unite && (
          <span className="ml-1 text-[length:var(--text-xl)] text-ivoire">
            {unite}
          </span>
        )}
      </p>
      <p className="mt-4 font-sans text-sm text-ivoire">{libelle}</p>
      {precision && (
        <p className="mt-1 font-sans text-xs text-ivoire-sourd">{precision}</p>
      )}
    </div>
  );
}

/** Citation d’élève ou d’ancien — toujours attribuée, jamais anonyme. */
export function Citation({
  texte,
  auteur,
  precision,
}: {
  texte: string;
  auteur: string;
  precision?: string;
}) {
  return (
    <figure>
      <blockquote className="font-display text-[length:var(--text-xl)] leading-[1.35] text-ivoire">
        <span aria-hidden className="text-scene">
          «&nbsp;
        </span>
        {texte}
        <span aria-hidden className="text-scene">
          &nbsp;»
        </span>
      </blockquote>
      <figcaption className="mt-5 font-sans text-sm text-ivoire-sourd">
        {auteur}
        {precision && <span className="block text-xs">{precision}</span>}
      </figcaption>
    </figure>
  );
}
