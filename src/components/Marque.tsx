"use client";

import { useEffect, useRef, useState } from "react";
import { surveiller } from "@/lib/envue";

/**
 * Les marques à l'encre.
 *
 * Un mot entouré, un trait qui déborde, une flèche dans la marge : les gestes
 * qu'un metteur en scène pose au crayon sur un script de travail.
 *
 * POURQUOI C'EST ICI LE GESTE LE PLUS IMPORTANT DU SITE — la recherche sur ce
 * qui trahit une page faite par une machine (voir docs/anti-ia.md) converge sur
 * un point : il n'y a jamais de trace de main. Tout y est régulier, centré,
 * aligné. Un tracé irrégulier, qui hésite et qui dépasse, est la chose qu'un
 * générateur ne produit pas spontanément. Nanterre-Amandiers écrit « Saison
 * 26-27 » à la main sur son affiche : c'est exactement ce ressort.
 *
 * Les tracés sont donc VOLONTAIREMENT imparfaits — le cercle n'est pas fermé et
 * repasse sur lui-même, le soulignement est en deux passes décalées. Rien ici
 * n'est un arc de cercle géométrique.
 *
 * Règle d'emploi : une marque désigne toujours quelque chose. Elle n'est jamais
 * décorative, et on n'en met pas deux dans le même écran.
 */

type Forme = "cercle" | "soulignement" | "fleche" | "crochet";

const formes: Record<
  Forme,
  { boite: string; traits: string[]; longueur: number }
> = {
  // Un entourage qui fait le tour et repasse — main levée, jamais refermé net.
  cercle: {
    boite: "0 0 200 100",
    traits: [
      "M 28,58 C 20,34 58,14 104,12 C 150,10 184,26 186,50 C 188,74 152,90 102,91 C 52,92 20,78 18,54 C 16,36 40,20 82,14",
    ],
    longueur: 560,
  },
  // Deux passes : la seconde plus courte et décalée, comme un trait repris.
  soulignement: {
    boite: "0 0 200 22",
    traits: [
      "M 3,11 C 38,5 82,14 128,7 C 158,3 180,10 197,6",
      "M 14,17 C 48,12 88,19 132,14 C 156,11 176,15 188,13",
    ],
    longueur: 210,
  },
  // Flèche de marge, un peu molle, la pointe tracée en deux temps.
  fleche: {
    boite: "0 0 120 60",
    traits: [
      "M 5,50 C 26,17 64,6 104,22",
      "M 91,7 C 97,13 102,18 105,23 C 99,26 93,29 87,34",
    ],
    longueur: 190,
  },
  // Crochet de marge, celui qui embrasse un paragraphe entier.
  crochet: {
    boite: "0 0 30 200",
    traits: ["M 24,4 C 10,7 17,44 6,99 C 17,153 10,191 24,196"],
    longueur: 230,
  },
};

export function Marque({
  forme,
  className = "",
  epaisseur = 2.2,
  /** Légère bascule, en degrés. Une valeur fixe, jamais tirée au hasard :
   *  le rendu serveur et le rendu client doivent coïncider. */
  bascule = 0,
  delai = 0,
}: {
  forme: Forme;
  className?: string;
  epaisseur?: number;
  bascule?: number;
  delai?: number;
}) {
  const ref = useRef<SVGSVGElement>(null);
  const [trace, setTrace] = useState(false);
  const f = formes[forme];

  useEffect(() => {
    const noeud = ref.current;
    if (!noeud) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      setTrace(true);
      return;
    }
    return surveiller(noeud, () => setTrace(true), 0.05);
  }, []);

  return (
    <svg
      ref={ref}
      viewBox={f.boite}
      className={`marque ${className}`}
      style={{ rotate: `${bascule}deg` }}
      fill="none"
      stroke="currentColor"
      strokeWidth={epaisseur}
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden
      focusable="false"
    >
      {f.traits.map((d, i) => (
        <path
          key={d}
          d={d}
          className="marque-trait"
          style={{
            // Le trait se DESSINE, il n'apparaît pas : on fait courir le
            // décalage du tiret de sa pleine longueur jusqu'à zéro.
            //
            // La valeur est pilotée ici, et non par une règle CSS : un style en
            // ligne l'emporte en pratique sur la feuille de style, et une passe
            // précédente s'est perdue à essayer de le contourner avec
            // « !important ». Le composant possède son état, point final.
            strokeDasharray: f.longueur,
            strokeDashoffset: trace ? 0 : f.longueur,
            transitionDelay: `${delai + i * 220}ms`,
          }}
        />
      ))}
    </svg>
  );
}
