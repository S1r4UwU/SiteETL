"use client";

import { Galerie } from "./Galerie";
import type { Media } from "@/content/medias";

/**
 * « On la voit ici. »
 *
 * Quand les crédits d'une photographie nomment une ancienne élève, on peut la
 * montrer en scène, à vingt ans, dans le spectacle dont elle parle juste
 * au-dessus. C'est la connexion la plus émouvante que permet la matière
 * récoltée — et elle n'existait sur aucune version du site.
 *
 * Le composant ne s'affiche que s'il a trouvé quelque chose : pas d'encart
 * vide, pas de « aucune photo disponible ».
 */
export function GalerieAlumni({
  nom,
  medias,
}: {
  nom: string;
  medias: Media[];
}) {
  if (medias.length === 0) return null;

  const prenom = nom.split(" ")[0];

  return (
    <div className="filet mt-10 pt-8">
      <p className="surtitre">
        {prenom} en scène, à l’école
        <span className="ml-3 text-texte-sourd tnum">
          {String(medias.length).padStart(2, "0")}
        </span>
      </p>
      <div className="mt-5">
        <Galerie medias={medias} legende={`${nom} en scène`} colonnes="quatre" />
      </div>
    </div>
  );
}
