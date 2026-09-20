"use client";

import { useEffect, useRef, useState, type ElementType, type ReactNode } from "react";
import { surveiller } from "@/lib/envue";

/* ------------------------------------------------------------------------
   Les entrées en scène.

   Un seul principe tenu partout : rien ne surgit, tout s'éclaire ou se lève
   de derrière un cache. Jamais de « fade-in-up » générique.

   RÈGLE DE SÛRETÉ — du contenu ne doit JAMAIS pouvoir rester invisible.
   Deux verrous :
     · l'état caché n'existe que sous `html[data-js]`, posé par un script en
       ligne dans le <head> — sans JavaScript, le texte est là, point ;
     · la détection d'entrée dans le champ (lib/envue.ts) double
       l'IntersectionObserver d'un contrôle au défilement partagé, parce qu'un
       observateur peut rester muet (onglet en arrière-plan, fenêtre sans
       focus, navigateur qui bride) et qu'un observateur muet, ici, ce serait
       du contenu perdu.
   ------------------------------------------------------------------------ */

function useEnVue<T extends HTMLElement>(marge = 0.1) {
  const ref = useRef<T>(null);
  const [vu, setVu] = useState(false);

  useEffect(() => {
    const noeud = ref.current;
    if (!noeud) return;

    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      setVu(true);
      return;
    }

    return surveiller(noeud, () => setVu(true), marge);
  }, [marge]);

  return { ref, vu };
}

/**
 * Titre qui se lève ligne par ligne derrière un cache, comme un texte qui
 * monte des dessous. Passez les lignes déjà coupées : la coupe est un choix
 * typographique, pas un hasard de largeur.
 */
export function TitreLeve({
  lignes,
  balise: Balise = "h2",
  className = "",
  delai = 0,
}: {
  /**
   * Les lignes, déjà coupées : la coupe d'un titre est un choix
   * typographique, pas un hasard de largeur de colonne.
   * Un segment entre astérisques passe en orange de scène.
   */
  lignes: string[];
  balise?: ElementType;
  className?: string;
  delai?: number;
}) {
  const { ref, vu } = useEnVue<HTMLHeadingElement>(0.15);

  return (
    <Balise ref={ref} className={className}>
      {lignes.map((ligne, i) => (
        <span key={ligne} className="leve-cache">
          <span
            className="leve-ligne"
            data-vu={vu ? "1" : undefined}
            style={{ transitionDelay: `${delai + i * 90}ms` }}
          >
            {ligne.split("*").map((bout, j) =>
              j % 2 ? (
                <span key={bout} className="text-accent">
                  {bout}
                </span>
              ) : (
                bout
              ),
            )}
          </span>
        </span>
      ))}
    </Balise>
  );
}

/** Bloc qui s'éclaire : opacité, et un cache qui se lève par le bas. */
export function Apparition({
  children,
  delai = 0,
  className = "",
}: {
  children: ReactNode;
  delai?: number;
  className?: string;
}) {
  const { ref, vu } = useEnVue<HTMLDivElement>();

  return (
    <div
      ref={ref}
      className={`apparition ${className}`}
      data-vu={vu ? "1" : undefined}
      style={{ transitionDelay: `${delai}ms` }}
    >
      {children}
    </div>
  );
}

/** Filet qui se trace de gauche à droite quand il entre dans le champ. */
export function FiletTrace({ className = "" }: { className?: string }) {
  const { ref, vu } = useEnVue<HTMLDivElement>(0.4);
  return (
    <div ref={ref} className={`h-px w-full bg-[var(--color-filet)] ${className}`}>
      <div className="filet-trace h-px bg-accent" data-vu={vu ? "1" : undefined} />
    </div>
  );
}

/**
 * Chiffre qui se compose à l'arrivée dans le champ. Le défilement s'arrête sur
 * la valeur exacte : pas d'approximation, ce sont des indicateurs Qualiopi.
 *
 * La valeur finale est rendue côté serveur, donc lisible sans JavaScript et
 * par les lecteurs d'écran ; seule l'animation est ajoutée après coup.
 */
export function Compteur({
  valeur,
  suffixe = "",
  duree = 1500,
}: {
  valeur: number;
  suffixe?: string;
  duree?: number;
}) {
  const { ref, vu } = useEnVue<HTMLSpanElement>(0.3);
  const [n, setN] = useState<number | null>(null);

  useEffect(() => {
    if (!vu) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      setN(valeur);
      return;
    }

    let brut = 0;
    const depart = performance.now();
    const pas = (t: number) => {
      const p = Math.min(1, (t - depart) / duree);
      // Décélération franche : le chiffre se pose, il ne freine pas mollement.
      const e = 1 - Math.pow(1 - p, 4);
      setN(Math.round(valeur * e));
      if (p < 1) brut = requestAnimationFrame(pas);
    };
    brut = requestAnimationFrame(pas);
    return () => cancelAnimationFrame(brut);
  }, [vu, valeur, duree]);

  return (
    <span ref={ref} className="tnum">
      {(n ?? valeur).toLocaleString("fr-FR")}
      {suffixe}
    </span>
  );
}
