"use client";

import { useEffect, useRef, type ReactNode } from "react";

/**
 * Le plan lent.
 *
 * Le fond avance moins vite que le texte quand on descend. Deux plans, pas
 * davantage : au-delà on ne lit plus une page, on subit un manège.
 *
 * Le décalage est borné, et la boucle ne tourne que tant que le bloc est dans
 * le champ — un observateur la coupe dès qu'il en sort.
 */
export function PlanLent({
  children,
  intensite = 0.18,
  className = "",
}: {
  children: ReactNode;
  /** Part de la hauteur défilée reprise par le fond. 0,18 = discret. */
  intensite?: number;
  className?: string;
}) {
  const cadre = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const noeud = cadre.current;
    if (!noeud) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    let boucle = 0;
    let actif = false;

    const bouger = () => {
      const r = noeud.getBoundingClientRect();
      // Position du bloc dans la fenêtre, de -1 (sorti par le haut) à 1.
      const p = (r.top + r.height / 2 - window.innerHeight / 2) / window.innerHeight;
      const d = Math.max(-1, Math.min(1, p)) * r.height * intensite;
      noeud.style.transform = `translate3d(0, ${d.toFixed(2)}px, 0)`;
      boucle = requestAnimationFrame(bouger);
    };

    const obs = new IntersectionObserver(([e]) => {
      if (e.isIntersecting && !actif) {
        actif = true;
        boucle = requestAnimationFrame(bouger);
      } else if (!e.isIntersecting && actif) {
        actif = false;
        cancelAnimationFrame(boucle);
      }
    });
    obs.observe(noeud);

    return () => {
      obs.disconnect();
      cancelAnimationFrame(boucle);
    };
  }, [intensite]);

  return (
    <div ref={cadre} className={`plan-lent ${className}`}>
      {children}
    </div>
  );
}
