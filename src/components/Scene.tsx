"use client";

import { useEffect, useRef } from "react";

/**
 * La machinerie : le rail de lumière en haut de page, qui avance avec la
 * lecture et prend l'accent du registre traversé.
 *
 * ── POURQUOI PAS DE DÉFILEMENT INERTIEL ─────────────────────────────────────
 * Une première version embarquait Lenis. L'inertie était agréable, mais elle
 * se payait cher : Lenis pilote la position dans sa propre boucle et écrase
 * tout ce qu'on pose de l'extérieur. En pratique, cela cassait
 *
 *   · les ancres internes (#disciplines),
 *   · le lien d'évitement « Aller au contenu » — critère RGAA,
 *   · le retour en haut de page au changement de route,
 *   · et toute remise en position programmatique.
 *
 * Un filet natif (arrêter Lenis, poser la position, le relancer) n'a pas suffi :
 * sa boucle reprenait la main à l'image suivante. Pour une école qui publie une
 * politique d'accessibilité, un lien d'évitement inopérant n'est pas un détail.
 *
 * Le défilement est donc natif. `scroll-behavior: smooth` assure les ancres en
 * douceur, et le reste de la mise en scène — rideau, poursuite, entracte, mur
 * d'affiches, plans lents — ne dépend d'aucune librairie de défilement.
 * ────────────────────────────────────────────────────────────────────────────
 */
export function Scene() {
  const rail = useRef<HTMLDivElement>(null);

  useEffect(() => {
    let planifie = 0;

    const mesurer = () => {
      planifie = 0;
      const h = document.documentElement.scrollHeight - window.innerHeight;
      const p = h > 0 ? Math.min(1, Math.max(0, window.scrollY / h)) : 0;
      if (rail.current) rail.current.style.transform = `scaleX(${p})`;
    };

    const programmer = () => {
      if (!planifie) planifie = requestAnimationFrame(mesurer);
    };

    window.addEventListener("scroll", programmer, { passive: true });
    window.addEventListener("resize", programmer);
    mesurer();

    return () => {
      cancelAnimationFrame(planifie);
      window.removeEventListener("scroll", programmer);
      window.removeEventListener("resize", programmer);
    };
  }, []);

  return (
    <div className="rail" aria-hidden>
      <div ref={rail} className="rail-jauge" />
    </div>
  );
}
