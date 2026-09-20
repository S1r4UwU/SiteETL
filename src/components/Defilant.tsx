"use client";

/**
 * Le bandeau d'affiche.
 *
 * Les auteurs du répertoire défilent en continu, en gros corps, comme le
 * fronton lumineux d'un théâtre. Le contenu est dupliqué pour que la boucle
 * n'ait pas de couture, et la copie est masquée aux lecteurs d'écran.
 *
 * Le défilement s'arrête au survol : un nom qu'on veut lire doit pouvoir
 * s'arrêter de bouger.
 */
export function Defilant({
  mots,
  vitesse = 52,
  sens = 1,
}: {
  mots: readonly string[];
  /** Secondes pour une boucle complète. Plus c'est grand, plus c'est lent. */
  vitesse?: number;
  /** 1 vers la gauche, -1 vers la droite. */
  sens?: 1 | -1;
}) {
  const suite = (cle: string, cache: boolean) => (
    <span className="defilant-suite" key={cle} aria-hidden={cache || undefined}>
      {mots.map((m) => (
        <span key={m} className="defilant-mot">
          {m}
          <span className="defilant-puce" aria-hidden>
            ·
          </span>
        </span>
      ))}
    </span>
  );

  return (
    <div className="defilant" role="marquee">
      <div
        className="defilant-piste"
        style={{
          animationDuration: `${vitesse}s`,
          animationDirection: sens === 1 ? "normal" : "reverse",
        }}
      >
        {suite("a", false)}
        {suite("b", true)}
      </div>
    </div>
  );
}
