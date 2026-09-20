"use client";

import Link from "next/link";
import Image from "next/image";
import { useRef, useState } from "react";
import { photo } from "@/lib/site";

/**
 * La distribution.
 *
 * La forme la plus reconnaissable du théâtre imprimé : un nom à gauche, sa
 * fonction à droite, des points de conduite entre les deux. C'est ce qu'on lit
 * au dos d'un programme de salle, et c'est dense — parce qu'une distribution
 * est dense.
 *
 * Elle remplace ici une grille de six cartes. Une grille de cartes, c'est le
 * réflexe que prend une machine quand on lui demande de présenter six choses
 * (voir docs/anti-ia.md). Une distribution, c'est ce que prend quelqu'un qui
 * connaît le métier.
 *
 * Au survol, la vignette correspondante se pose dans la marge — sur grand écran
 * seulement. Sans souris, la liste se lit très bien seule : l'image n'apporte
 * rien d'indispensable, elle récompense.
 */

export type LigneDistribution = {
  slug: string;
  titre: string;
  mention: string;
  second?: string;
  photo?: string;
  href: string;
};

export function Distribution({ lignes }: { lignes: LigneDistribution[] }) {
  const [actif, setActif] = useState<string | null>(null);
  const cadre = useRef<HTMLDivElement>(null);

  const courant = lignes.find((l) => l.slug === actif);

  return (
    <div className="distribution" ref={cadre}>
      <ol className="distribution-liste">
        {lignes.map((l, i) => (
          <li key={l.slug}>
            <Link
              href={l.href}
              className="distribution-ligne"
              onMouseEnter={() => setActif(l.slug)}
              onFocus={() => setActif(l.slug)}
              onMouseLeave={() => setActif(null)}
              onBlur={() => setActif(null)}
            >
              <span className="distribution-numero tnum" aria-hidden>
                {String(i + 1).padStart(2, "0")}
              </span>
              <span className="distribution-titre">{l.titre}</span>
              <span className="distribution-conduite" aria-hidden />
              <span className="distribution-mention">
                {l.mention}
                {l.second && (
                  <span className="distribution-second">{l.second}</span>
                )}
              </span>
            </Link>
          </li>
        ))}
      </ol>

      {/* La vignette de marge. Un seul nœud, dont on change la source : pas
          six images empilées qui attendent leur tour. */}
      <div className="distribution-vignette" data-visible={courant ? "1" : undefined}>
        {courant?.photo && (
          <Image
            key={courant.photo}
            src={photo(courant.photo, { w: 600, h: 780 })}
            alt=""
            aria-hidden
            width={600}
            height={780}
            sizes="320px"
          />
        )}
      </div>
    </div>
  );
}
