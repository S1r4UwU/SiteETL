import Link from "next/link";
import type { ComponentProps, ReactNode } from "react";

type Variante = "scene" | "fantome" | "sourd";

const bases =
  "group inline-flex items-center gap-3 font-sans text-sm font-medium uppercase tracking-[0.12em] " +
  "px-6 py-4 transition-colors duration-200 ease-[var(--ease-scene)]";

/* L’orange est un fond UNIQUEMENT sous du texte noir (11,3:1). Jamais sous du
   blanc : c’est l’erreur de l’ancien site, 2,62:1, sous le seuil AA. */
const variantes: Record<Variante, string> = {
  scene: "bg-scene text-salle hover:bg-scene-chaud",
  fantome:
    "border border-ivoire/30 text-ivoire hover:border-scene hover:text-scene-chaud",
  sourd: "text-ivoire-doux hover:text-scene-chaud px-0 py-2",
};

function Fleche() {
  return (
    <span
      aria-hidden
      className="inline-block transition-transform duration-200 ease-[var(--ease-scene)] group-hover:translate-x-1"
    >
      →
    </span>
  );
}

export function Bouton({
  href,
  variante = "scene",
  fleche = true,
  children,
  className = "",
  ...reste
}: {
  href: string;
  variante?: Variante;
  fleche?: boolean;
  children: ReactNode;
  className?: string;
} & Omit<ComponentProps<typeof Link>, "href" | "children" | "className">) {
  return (
    <Link
      href={href}
      className={`${bases} ${variantes[variante]} ${className}`}
      {...reste}
    >
      {children}
      {fleche && <Fleche />}
    </Link>
  );
}

export function BoutonSubmit({
  children,
  enCours,
}: {
  children: ReactNode;
  enCours?: boolean;
}) {
  return (
    <button
      type="submit"
      disabled={enCours}
      className={`${bases} ${variantes.scene} disabled:cursor-wait disabled:opacity-60`}
    >
      {enCours ? "Envoi en cours…" : children}
      {!enCours && <Fleche />}
    </button>
  );
}
