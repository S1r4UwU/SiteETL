"use client";

import { useEffect, useState } from "react";

/**
 * Le lever de rideau.
 *
 * Noir de salle → un trait de lumière s'allume, s'étire → le rideau s'ouvre en
 * deux et découvre la page. 1,6 s, une seule fois par session.
 *
 * C'est le seul endroit du site où l'on fait attendre le visiteur. C'est tenu :
 * on n'attend pas un chargement, on assiste à une ouverture — et la page est
 * déjà là dessous, rendue, prête.
 */
export function Rideau() {
  const [etat, setEtat] = useState<"absent" | "joue" | "fini">("absent");

  useEffect(() => {
    const sobre = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    let dejaVu = false;
    try {
      dejaVu = sessionStorage.getItem("etl-rideau") === "1";
    } catch {
      // Navigation privée, stockage bloqué : on joue le rideau, c'est tout.
    }

    if (sobre || dejaVu) return;

    setEtat("joue");
    document.body.style.overflow = "hidden";

    const fin = window.setTimeout(() => {
      setEtat("fini");
      document.body.style.overflow = "";
      try {
        sessionStorage.setItem("etl-rideau", "1");
      } catch {
        /* sans importance */
      }
    }, 1900);

    return () => {
      window.clearTimeout(fin);
      document.body.style.overflow = "";
    };
  }, []);

  if (etat === "absent" || etat === "fini") return null;

  return (
    <div className="rideau" aria-hidden>
      <div className="rideau-pan rideau-pan--gauche" />
      <div className="rideau-pan rideau-pan--droit" />
      <div className="rideau-trait" />
    </div>
  );
}
