"use client";

import { useEffect, useRef, useState, type ReactNode } from "react";

/**
 * « La lumière qui se fait » — la seule idée d’animation du site.
 *
 * Rien n’entre par le bas : l’élément s’éclaire (opacité + clip-path). Un seul
 * déclenchement, jamais rejoué. Respecte `prefers-reduced-motion`, et s’affiche
 * immédiatement si l’IntersectionObserver n’est pas disponible.
 *
 * À ne PAS utiliser sur les pages de lecture longue (formation, candidater) :
 * on n’anime pas ce qui doit être lu.
 */
export function Reveal({
  children,
  delai = 0,
  className = "",
}: {
  children: ReactNode;
  delai?: number;
  className?: string;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const noeud = ref.current;
    if (!noeud) return;

    const reduit = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduit || typeof IntersectionObserver === "undefined") {
      setVisible(true);
      return;
    }

    const observateur = new IntersectionObserver(
      ([entree]) => {
        if (entree.isIntersecting) {
          setVisible(true);
          observateur.disconnect();
        }
      },
      { rootMargin: "0px 0px -12% 0px", threshold: 0.05 },
    );

    observateur.observe(noeud);
    return () => observateur.disconnect();
  }, []);

  return (
    <div
      ref={ref}
      className={className}
      style={
        visible
          ? { animation: `lumiere 0.7s var(--ease-scene) ${delai}ms both` }
          : { opacity: 0 }
      }
    >
      {children}
    </div>
  );
}
