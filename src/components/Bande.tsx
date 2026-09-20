"use client";

import Link from "next/link";
import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import { photo } from "@/lib/site";
import type { Spectacle } from "@/content/types";

/**
 * La bande.
 *
 * Une section épinglée où le défilement vertical fait avancer les spectacles
 * à l'horizontale, comme on longe un mur d'affiches. Le numéro de l'affiche
 * et son année restent en surimpression pendant tout le parcours.
 *
 * Repli : si le système demande moins d'animations, ou sur petit écran, la
 * bande redevient un simple défilement horizontal à la main (scroll-snap).
 * Personne ne se retrouve coincé dans une section épinglée qui ne répond pas.
 */
export function Bande({ spectacles }: { spectacles: Spectacle[] }) {
  const section = useRef<HTMLDivElement>(null);
  const piste = useRef<HTMLDivElement>(null);
  const [epingle, setEpingle] = useState(false);
  const [actif, setActif] = useState(0);

  useEffect(() => {
    const sobre = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const large = window.matchMedia("(min-width: 64rem)").matches;
    if (sobre || !large) return;

    setEpingle(true);

    let boucle = 0;
    const calculer = () => {
      const s = section.current;
      const p = piste.current;
      if (s && p) {
        const course = s.offsetHeight - window.innerHeight;
        const haut = s.getBoundingClientRect().top;
        const avance = course > 0 ? Math.min(1, Math.max(0, -haut / course)) : 0;
        const distance = Math.max(0, p.scrollWidth - window.innerWidth + 64);
        p.style.transform = `translate3d(${-avance * distance}px, 0, 0)`;
        setActif(Math.min(spectacles.length - 1, Math.round(avance * (spectacles.length - 1))));
      }
      boucle = requestAnimationFrame(calculer);
    };
    boucle = requestAnimationFrame(calculer);

    return () => {
      cancelAnimationFrame(boucle);
      setEpingle(false);
    };
  }, [spectacles.length]);

  const cartes = spectacles.map((s, i) => (
    <Link
      key={s.slug}
      href={`/spectacles/${s.slug}`}
      className="bande-carte group"
    >
      <div className="bande-image">
        <Image
          src={photo(s.photos[0], { w: 900, h: 1200 })}
          alt=""
          aria-hidden
          width={900}
          height={1200}
          sizes="(max-width: 1024px) 78vw, 30vw"
          className="size-full object-cover"
        />
        <span className="bande-voile" aria-hidden />
      </div>

      <span className="bande-numero tnum" aria-hidden>
        {String(i + 1).padStart(2, "0")}
      </span>

      <span className="bande-texte">
        <span className="surtitre surtitre-sourd">
          {s.saison}
          {s.niveau ? ` · ${s.niveau}` : ""}
        </span>
        <span className="mt-3 block font-display text-[length:var(--text-xl)] leading-tight">
          {s.titre}
        </span>
        {s.miseEnScene && (
          <span className="mt-2 block font-sans text-xs text-ivoire-sourd">
            Mise en scène : {s.miseEnScene}
          </span>
        )}
      </span>
    </Link>
  ));

  if (!epingle) {
    return (
      <div className="bande-libre" role="region" aria-label="Les spectacles">
        {cartes}
      </div>
    );
  }

  return (
    <div
      ref={section}
      className="relative"
      style={{ height: `${spectacles.length * 34 + 60}vh` }}
    >
      <div className="sticky top-0 flex h-svh flex-col justify-center overflow-hidden">
        <div className="enveloppe mb-10 flex items-end justify-between gap-8">
          <p className="surtitre">Le mur d’affiches</p>
          <p className="font-display text-[length:var(--text-2xl)] leading-none text-scene tnum">
            {String(actif + 1).padStart(2, "0")}
            <span className="text-ivoire-sourd">
              /{String(spectacles.length).padStart(2, "0")}
            </span>
          </p>
        </div>

        <div ref={piste} className="bande-piste">
          {cartes}
        </div>

        <p className="enveloppe mt-10 font-sans text-xs uppercase tracking-[0.18em] text-ivoire-sourd">
          Continuez à défiler <span aria-hidden>→</span>
        </p>
      </div>
    </div>
  );
}
