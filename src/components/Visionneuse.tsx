"use client";

import Image from "next/image";
import { useCallback, useEffect, useRef, useState } from "react";
import { photo } from "@/lib/site";
import type { Media } from "@/content/medias";

/**
 * La visionneuse.
 *
 * Cent quatre-vingt-onze photographies sur ce site, et jusqu'ici aucun moyen
 * d'en regarder une en grand. C'était le manque le plus concret.
 *
 * ── POURQUOI UN <dialog> NATIF ──────────────────────────────────────────────
 * Ouvert avec `showModal()`, il fournit gratuitement le calque supérieur, le
 * fond, l'arrière-plan inerte, la touche Échap et le retour du focus à
 * l'élément qui a ouvert. On ne réimplémente rien de tout ça.
 *
 * Et surtout : on NE PIÈGE PAS le focus à la main. C'est un réflexe hérité des
 * modales bricolées, et il dessert — dans un dialogue natif, pouvoir tabuler
 * jusqu'à la barre d'adresse est un comportement normal et souhaitable.
 * ────────────────────────────────────────────────────────────────────────────
 *
 * Navigation : flèches gauche/droite, Échap, clic sur le fond, glissement au
 * doigt. La légende reprend la forme d'un crédit de programme : qui est en
 * scène, qui a photographié.
 */
export function Visionneuse({
  medias,
  index,
  onFermer,
  onChanger,
  legende,
}: {
  medias: Media[];
  /** Index ouvert, ou null quand la visionneuse est fermée. */
  index: number | null;
  onFermer: () => void;
  onChanger: (i: number) => void;
  /** Titre de la série, affiché en surtitre. */
  legende?: string;
}) {
  const boite = useRef<HTMLDialogElement>(null);
  const [glisse, setGlisse] = useState<number | null>(null);

  const ouvert = index !== null;
  const media = ouvert ? medias[index] : undefined;

  const aller = useCallback(
    (pas: number) => {
      if (index === null) return;
      onChanger((index + pas + medias.length) % medias.length);
    },
    [index, medias.length, onChanger],
  );

  // Ouverture / fermeture pilotées par l'état React.
  useEffect(() => {
    const d = boite.current;
    if (!d) return;
    if (ouvert && !d.open) d.showModal();
    if (!ouvert && d.open) d.close();
  }, [ouvert]);

  // On écoute l'événement natif plutôt que l'attribut React : « close » ne
  // remonte pas dans l'arbre, et on veut être certain de récupérer TOUTES les
  // fermetures — bouton, Échap, geste du navigateur.
  useEffect(() => {
    const d = boite.current;
    if (!d) return;
    const surFermeture = () => onFermer();
    d.addEventListener("close", surFermeture);
    return () => d.removeEventListener("close", surFermeture);
  }, [onFermer]);

  // Le défilement de la page ne doit pas continuer derrière le dialogue.
  useEffect(() => {
    if (!ouvert) return;
    const avant = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = avant;
    };
  }, [ouvert]);

  useEffect(() => {
    if (!ouvert) return;
    const auClavier = (e: KeyboardEvent) => {
      if (e.key === "ArrowRight") {
        e.preventDefault();
        aller(1);
      }
      if (e.key === "ArrowLeft") {
        e.preventDefault();
        aller(-1);
      }
      // Échap est déjà géré par le dialogue natif. On le double quand même :
      // c'est trois lignes, c'est sans effet si le natif a déjà fermé (l'effet
      // d'ouverture est gardé), et ça supprime une dépendance que je n'ai pas
      // pu vérifier dans cet environnement. Une visionneuse dont on ne peut
      // pas sortir, ce n'est pas négociable.
      if (e.key === "Escape") onFermer();
    };
    window.addEventListener("keydown", auClavier);
    return () => window.removeEventListener("keydown", auClavier);
  }, [ouvert, aller, onFermer]);

  if (medias.length === 0) return null;

  // Les deux voisines sont préchargées : on ne veut pas voir charger l'image
  // suivante quand on presse la flèche.
  const voisines = ouvert
    ? [(index! + 1) % medias.length, (index! - 1 + medias.length) % medias.length]
    : [];

  return (
    <dialog
      ref={boite}
      className="visionneuse registre-salle"
      aria-label={legende ? `Photographies — ${legende}` : "Photographies"}
      onClick={(e) => {
        // Clic sur le fond. On ne peut pas se contenter de comparer la cible :
        // le cadre occupe tout le dialogue, donc il l'intercepte. On regarde
        // donc si le clic est tombé HORS de la boîte du dialogue.
        const d = boite.current;
        if (!d) return;
        const r = d.getBoundingClientRect();
        const dedans =
          e.clientX >= r.left &&
          e.clientX <= r.right &&
          e.clientY >= r.top &&
          e.clientY <= r.bottom;
        if (!dedans) onFermer();
      }}
      onTouchStart={(e) => setGlisse(e.touches[0].clientX)}
      onTouchEnd={(e) => {
        if (glisse === null) return;
        const d = e.changedTouches[0].clientX - glisse;
        if (Math.abs(d) > 50) aller(d < 0 ? 1 : -1);
        setGlisse(null);
      }}
    >
      {media && (
        <div className="visionneuse-cadre">
          <div className="visionneuse-barre">
            <p className="surtitre">
              {legende}
              <span className="ml-3 text-texte-sourd tnum">
                {String(index! + 1).padStart(2, "0")} /{" "}
                {String(medias.length).padStart(2, "0")}
              </span>
            </p>
            <button
              type="button"
              onClick={onFermer}
              className="visionneuse-bouton"
            >
              Fermer <span aria-hidden>✕</span>
            </button>
          </div>

          <figure className="visionneuse-figure">
            <Image
              key={media.id}
              src={photo(media.id, { w: 1600, h: 1200 })}
              alt={media.alt ?? media.titre ?? ""}
              width={1600}
              height={1200}
              sizes="92vw"
              priority
              className="visionneuse-image"
            />

            <figcaption className="visionneuse-legende">
              {media.titre && (
                <span className="block font-display text-[length:var(--text-lg)]">
                  {media.titre}
                </span>
              )}
              {media.enScene && (
                <span className="credit mt-1 block">
                  <span className="text-texte-doux">En scène</span> :{" "}
                  {media.enScene}
                </span>
              )}
              {media.credit && (
                <span className="credit block">
                  <span className="text-texte-doux">Photo</span> : {media.credit}
                </span>
              )}
              {media.note && <span className="credit block">{media.note}</span>}
            </figcaption>
          </figure>

          {medias.length > 1 && (
            <div className="visionneuse-nav">
              <button
                type="button"
                onClick={() => aller(-1)}
                className="visionneuse-bouton"
              >
                <span aria-hidden>←</span> Précédente
              </button>
              <button
                type="button"
                onClick={() => aller(1)}
                className="visionneuse-bouton"
              >
                Suivante <span aria-hidden>→</span>
              </button>
            </div>
          )}

          {/* Préchargement discret des deux voisines. */}
          <div hidden>
            {voisines.map((v) => (
              <Image
                key={medias[v].id}
                src={photo(medias[v].id, { w: 1600, h: 1200 })}
                alt=""
                width={16}
                height={12}
              />
            ))}
          </div>
        </div>
      )}
    </dialog>
  );
}
