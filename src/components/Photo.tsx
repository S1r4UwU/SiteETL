import Image from "next/image";
import { photo } from "@/lib/site";

/**
 * Toutes les images passent par next/image (AVIF/WebP, tailles servies selon
 * le viewport). Le texte alternatif est OBLIGATOIRE et typé : l’ancien site
 * avait 7 images sur 15 sans alt, et des noms de fichiers en guise de
 * description pour les autres.
 *
 * Passer `decoratif` pour une image purement esthétique : elle sort alors de
 * l’arbre d’accessibilité (alt="") au lieu d’être décrite inutilement.
 */
export function Photo({
  id,
  alt,
  decoratif = false,
  largeur = 1600,
  hauteur = 1067,
  sizes = "100vw",
  priority = false,
  className = "",
  credit,
  enScene,
}: {
  id: string;
  alt: string;
  decoratif?: boolean;
  largeur?: number;
  hauteur?: number;
  sizes?: string;
  priority?: boolean;
  className?: string;
  /** Le ou la photographe. */
  credit?: string;
  /** Les comédiennes et comédiens sur l'image. */
  enScene?: string;
}) {
  const img = (
    <Image
      src={photo(id, { w: largeur, h: hauteur })}
      alt={decoratif ? "" : alt}
      aria-hidden={decoratif || undefined}
      width={largeur}
      height={hauteur}
      sizes={sizes}
      priority={priority}
      className={className}
    />
  );

  /* Usage du spectacle vivant : on crédite toujours — et on ne confond pas le
     photographe avec les comédiens. L'ancien site entassait les deux dans le
     même champ ; les attribuer l'un à l'autre serait une faute. */
  if (!credit && !enScene) return img;
  return (
    <figure className="relative">
      {img}
      <figcaption className="mt-2 font-sans text-xs leading-relaxed text-texte-sourd">
        {enScene && (
          <span className="block">
            <span className="text-texte-doux">En scène</span> : {enScene}
          </span>
        )}
        {credit && (
          <span className="block">
            <span className="text-texte-doux">Photo</span> : {credit}
          </span>
        )}
      </figcaption>
    </figure>
  );
}
