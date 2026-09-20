"use client";

import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";

/**
 * L'entracte.
 *
 * À chaque changement de page, un noir de salle balaie l'écran et se retire,
 * découvrant la nouvelle page déjà en place. C'est le noir entre deux scènes,
 * pas une transition de diaporama.
 *
 * Le parti pris technique : on ne retarde JAMAIS la navigation. Le lien part
 * immédiatement, la page se rend, et le voile se retire par-dessus. Un effet
 * de transition qui ajoute de l'attente est un effet qui dessert.
 *
 * Le premier chargement ne le joue pas : c'est le rideau qui s'en charge.
 */
export function Entracte() {
  const chemin = usePathname();
  const premier = useRef(true);
  const [cle, setCle] = useState<string | null>(null);

  useEffect(() => {
    if (premier.current) {
      premier.current = false;
      return;
    }
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    setCle(`${chemin}-${Date.now()}`);
    const fin = window.setTimeout(() => setCle(null), 900);
    return () => window.clearTimeout(fin);
  }, [chemin]);

  if (!cle) return null;
  return <div key={cle} className="entracte" aria-hidden />;
}
