"use client";

import Image from "next/image";
import { useState } from "react";
import { photo } from "@/lib/site";
import { Visionneuse } from "./Visionneuse";
import type { Media } from "@/content/medias";

/**
 * Une série de photographies, en grille éditoriale, qui s'ouvre en grand.
 *
 * La grille est volontairement irrégulière : une image sur cinq occupe deux
 * colonnes. Une planche contact parfaitement régulière est le réflexe d'un
 * gabarit ; une planche de photographe ne l'est pas.
 *
 * Chaque vignette est un <button> : c'est une action, pas un lien. Son
 * intitulé accessible décrit l'image et annonce qu'elle s'ouvrira en grand.
 */
export function Galerie({
  medias,
  legende,
  colonnes = "trois",
}: {
  medias: Media[];
  legende?: string;
  colonnes?: "trois" | "quatre" | "six";
}) {
  const [ouverte, setOuverte] = useState<number | null>(null);

  if (medias.length === 0) return null;

  const classes = {
    trois: "sm:grid-cols-2 lg:grid-cols-3",
    quatre: "grid-cols-2 sm:grid-cols-3 lg:grid-cols-4",
    six: "grid-cols-3 sm:grid-cols-4 lg:grid-cols-6",
  }[colonnes];

  return (
    <>
      <ul className={`grid gap-3 ${classes}`}>
        {medias.map((m, i) => (
          <li
            key={m.id}
            className={
              colonnes === "trois" && i % 5 === 0 ? "sm:col-span-2" : undefined
            }
          >
            <button
              type="button"
              onClick={() => setOuverte(i)}
              className="galerie-vignette group"
            >
              <Image
                src={photo(m.id, {
                  w: colonnes === "trois" && i % 5 === 0 ? 1200 : 700,
                  h: colonnes === "trois" && i % 5 === 0 ? 800 : 900,
                })}
                alt=""
                aria-hidden
                width={colonnes === "trois" && i % 5 === 0 ? 1200 : 700}
                height={colonnes === "trois" && i % 5 === 0 ? 800 : 900}
                sizes="(max-width: 640px) 50vw, 33vw"
              />
              <span className="sr-only">
                {m.alt ?? m.titre ?? "Photographie"} — ouvrir en grand
              </span>
              <span className="galerie-loupe" aria-hidden>
                Agrandir
              </span>
            </button>
          </li>
        ))}
      </ul>

      <Visionneuse
        medias={medias}
        index={ouverte}
        legende={legende}
        onFermer={() => setOuverte(null)}
        onChanger={setOuverte}
      />
    </>
  );
}
