"use client";

import { useEffect, useRef, type ReactNode } from "react";

/**
 * La poursuite.
 *
 * Deux fois la même photo, superposées : dessous, le plateau à froid — sombre,
 * désaturé. Dessus, la même image en pleine lumière, découpée par un masque
 * radial. On éclaire les comédiens en balayant la page.
 *
 * Au repos, la poursuite dérive lentement toute seule : le plateau n'est
 * jamais un rectangle noir, même si personne ne touche à rien. Dès que le
 * pointeur entre dans le cadre, il prend la main — et la rend en sortant.
 */
export function Poursuite({
  children,
  className = "",
}: {
  children: ReactNode;
  className?: string;
}) {
  const cadre = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const noeud = cadre.current;
    if (!noeud) return;

    const sobre = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const finPointeur = window.matchMedia("(pointer: fine)").matches;

    // État de repos : la dérive automatique, pilotée en CSS.
    noeud.dataset.derive = "1";
    if (sobre || !finPointeur) return;

    let viseX = 0;
    let viseY = 0;
    let x = 0;
    let y = 0;
    let rayon = 0;
    let viseRayon = 0;
    let boucle = 0;
    let amorce = false;

    const entre = (e: PointerEvent) => {
      const r = noeud.getBoundingClientRect();
      viseX = e.clientX - r.left;
      viseY = e.clientY - r.top;

      if (!amorce) {
        // Première entrée : on coupe la dérive et on allume pile sous le
        // curseur, sans le balayage disgracieux depuis le coin supérieur.
        amorce = true;
        x = viseX;
        y = viseY;
        delete noeud.dataset.derive;
        boucle = requestAnimationFrame(suivre);
      }
      viseRayon = 1;
    };

    const sort = () => {
      viseRayon = 0;
    };

    const suivre = () => {
      x += (viseX - x) * 0.14;
      y += (viseY - y) * 0.14;
      rayon += (viseRayon - rayon) * 0.08;
      noeud.style.setProperty("--px", `${x}px`);
      noeud.style.setProperty("--py", `${y}px`);
      noeud.style.setProperty("--pr", String(rayon));

      // Poursuite éteinte et curseur parti : on rend la main à la dérive.
      if (amorce && viseRayon === 0 && rayon < 0.02) {
        amorce = false;
        noeud.style.removeProperty("--px");
        noeud.style.removeProperty("--py");
        noeud.style.removeProperty("--pr");
        noeud.dataset.derive = "1";
        cancelAnimationFrame(boucle);
        return;
      }
      boucle = requestAnimationFrame(suivre);
    };

    noeud.addEventListener("pointermove", entre, { passive: true });
    noeud.addEventListener("pointerleave", sort);

    return () => {
      cancelAnimationFrame(boucle);
      noeud.removeEventListener("pointermove", entre);
      noeud.removeEventListener("pointerleave", sort);
    };
  }, []);

  return (
    <div ref={cadre} className={`poursuite-cadre ${className}`}>
      {children}
    </div>
  );
}
