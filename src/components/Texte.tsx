import type { ReactNode } from "react";

/** Colonne de lecture pour les pages documentaires (mentions, confidentialité). */
export function Document({ children }: { children: ReactNode }) {
  return (
    <div className="enveloppe pb-[var(--spacing-section)]">
      <div className="max-w-[42rem] space-y-12">{children}</div>
    </div>
  );
}

export function Article({
  titre,
  children,
}: {
  titre: string;
  children: ReactNode;
}) {
  return (
    <section>
      <h2 className="text-[length:var(--text-xl)]">{titre}</h2>
      <div className="prose-etl mt-5 !max-w-none">{children}</div>
    </section>
  );
}

/** Mention visible d’un point qui doit être validé par l’école ou son conseil. */
export function AValider({ children }: { children: ReactNode }) {
  return (
    <p className="border-l-2 border-accent bg-fond-doux px-5 py-4 font-sans text-sm text-texte-doux">
      <span className="mb-1 block text-xs uppercase tracking-[0.14em] text-accent">
        À compléter par l’école
      </span>
      {children}
    </p>
  );
}
