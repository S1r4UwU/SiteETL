"use client";

import Lenis from "lenis";
import { useEffect, useRef } from "react";

/**
 * La machinerie : ce qui tourne en coulisse sur toutes les pages.
 *
 *  — le défilement inertiel (Lenis) : c'est 90 % de la sensation « site soigné »,
 *    pour 4 ko ;
 *  — le rail de lumière en haut de page, qui avance avec la lecture ;
 *  — le halo de poursuite qui suit le curseur, en fondu d'écran.
 *
 * Tout est désactivé si le système demande moins d'animations, et le halo ne
 * s'affiche pas sur pointeur grossier (doigt) : il n'y aurait rien à suivre.
 */
export function Scene() {
  const rail = useRef<HTMLDivElement>(null);
  const halo = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const sobre = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    // --- Défilement inertiel -------------------------------------------
    let lenis: Lenis | null = null;
    if (!sobre) {
      lenis = new Lenis({
        duration: 1.05,
        easing: (t) => 1 - Math.pow(1 - t, 3),
        smoothWheel: true,
        // Sur tactile on garde le défilement natif : l'inertie du système est
        // meilleure que tout ce qu'on pourrait simuler.
        syncTouch: false,
      });
      document.documentElement.classList.add("lenis-actif");
    }

    // --- Rail de lumière -------------------------------------------------
    const avancement = () => {
      const h = document.documentElement.scrollHeight - window.innerHeight;
      const p = h > 0 ? Math.min(1, window.scrollY / h) : 0;
      if (rail.current) rail.current.style.transform = `scaleX(${p})`;
    };

    let boucle = 0;
    const tic = (temps: number) => {
      lenis?.raf(temps);
      boucle = requestAnimationFrame(tic);
    };
    boucle = requestAnimationFrame(tic);

    window.addEventListener("scroll", avancement, { passive: true });
    window.addEventListener("resize", avancement);
    avancement();

    // --- Halo de poursuite ------------------------------------------------
    const finPointeur = window.matchMedia("(pointer: fine)").matches;
    let x = window.innerWidth / 2;
    let y = window.innerHeight / 2;
    let cx = x;
    let cy = y;
    let halBoucle = 0;

    const bouge = (e: PointerEvent) => {
      x = e.clientX;
      y = e.clientY;
      if (halo.current) halo.current.style.opacity = "1";
    };
    const sort = () => {
      if (halo.current) halo.current.style.opacity = "0";
    };
    const suivre = () => {
      // Retard volontaire : le halo traîne derrière le curseur, comme une
      // poursuite manœuvrée à la main depuis la régie.
      cx += (x - cx) * 0.12;
      cy += (y - cy) * 0.12;
      if (halo.current) {
        halo.current.style.transform = `translate3d(${cx - 180}px, ${cy - 180}px, 0)`;
      }
      halBoucle = requestAnimationFrame(suivre);
    };

    if (finPointeur && !sobre) {
      window.addEventListener("pointermove", bouge, { passive: true });
      document.addEventListener("pointerleave", sort);
      halBoucle = requestAnimationFrame(suivre);
    }

    return () => {
      cancelAnimationFrame(boucle);
      cancelAnimationFrame(halBoucle);
      window.removeEventListener("scroll", avancement);
      window.removeEventListener("resize", avancement);
      window.removeEventListener("pointermove", bouge);
      document.removeEventListener("pointerleave", sort);
      lenis?.destroy();
      document.documentElement.classList.remove("lenis-actif");
    };
  }, []);

  return (
    <>
      <div className="rail" aria-hidden>
        <div ref={rail} className="rail-jauge" />
      </div>
      <div ref={halo} className="halo" aria-hidden />
    </>
  );
}
