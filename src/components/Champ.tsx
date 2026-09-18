import type { ReactNode } from "react";

/**
 * Champ de formulaire.
 *
 * Un <label> visible et persistant, toujours — pas un placeholder qui
 * disparaît dès qu’on tape, ni un simple aria-label comme sur l’ancien site.
 * Le type HTML est explicite : « Adresse domicile » y était déclarée
 * `type="tel"`, ce qui ouvrait un clavier numérique sur mobile.
 */
export function Champ({
  nom,
  libelle,
  type = "text",
  requis = false,
  aide,
  autoComplete,
  inputMode,
  multiligne = false,
  lignes = 5,
}: {
  nom: string;
  libelle: string;
  type?: "text" | "email" | "tel" | "date";
  requis?: boolean;
  aide?: string;
  autoComplete?: string;
  inputMode?: "text" | "email" | "tel" | "numeric";
  multiligne?: boolean;
  lignes?: number;
}) {
  const idAide = aide ? `${nom}-aide` : undefined;
  const classes =
    "mt-2 w-full border border-ivoire/25 bg-salle px-4 py-3.5 font-sans text-base text-ivoire " +
    "placeholder:text-ivoire-sourd transition-colors focus:border-scene focus:outline-none " +
    "focus:ring-2 focus:ring-scene/40";

  return (
    <p className="block">
      <label htmlFor={nom} className="font-sans text-sm text-ivoire">
        {libelle}
        {requis ? (
          <span className="ml-1 text-scene" aria-hidden>
            *
          </span>
        ) : (
          <span className="ml-2 text-xs text-ivoire-sourd">(facultatif)</span>
        )}
      </label>

      {multiligne ? (
        <textarea
          id={nom}
          name={nom}
          rows={lignes}
          required={requis}
          aria-describedby={idAide}
          className={`${classes} resize-y`}
        />
      ) : (
        <input
          id={nom}
          name={nom}
          type={type}
          required={requis}
          autoComplete={autoComplete}
          inputMode={inputMode}
          aria-describedby={idAide}
          className={classes}
        />
      )}

      {aide && (
        <span id={idAide} className="mt-2 block font-sans text-xs text-ivoire-sourd">
          {aide}
        </span>
      )}
    </p>
  );
}

export function Consentement({ children }: { children: ReactNode }) {
  return (
    <p className="flex gap-3">
      <input
        id="consentement"
        name="consentement"
        type="checkbox"
        required
        className="mt-1 size-4 shrink-0 accent-[var(--color-scene)]"
      />
      <label
        htmlFor="consentement"
        className="font-sans text-xs leading-relaxed text-ivoire-doux"
      >
        {children}
      </label>
    </p>
  );
}

/** Piège à robots : invisible pour l’utilisateur, rempli par les spammeurs. */
export function Leurre() {
  return (
    <p className="absolute left-[-9999px]" aria-hidden>
      <label htmlFor="site-web">Ne pas remplir ce champ</label>
      <input id="site-web" name="site-web" type="text" tabIndex={-1} autoComplete="off" />
    </p>
  );
}
