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
}: {
  id: string;
  alt: string;
  decoratif?: boolean;
  largeur?: number;
  hauteur?: number;
  sizes?: string;
  priority?: boolean;
  className?: string;
  credit?: string;
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

  /* Usage du spectacle vivant : on crédite toujours le photographe. */
  if (!credit) return img;
  return (
    <figure className="relative">
      {img}
      <figcaption className="mt-2 font-sans text-xs text-texte-sourd">
        Photo&nbsp;: {credit}
      </figcaption>
    </figure>
  );
}
