"use client";

import { useRouter } from "next/navigation";
import { useState, type FormEvent, type ReactNode } from "react";
import { BoutonSubmit } from "./Bouton";

/**
 * Enveloppe commune aux formulaires du site.
 *
 * Elle poste en JSON vers /api/<sujet> puis redirige vers une VRAIE page de
 * confirmation. C’est ce qui rend la conversion mesurable : l’ancien site
 * ouvrait une boîte modale sans URL, donc invisible pour Google comme pour
 * n’importe quel outil de mesure.
 */
export function Formulaire({
  sujet,
  redirection,
  intitule,
  children,
}: {
  sujet: string;
  redirection: string;
  intitule: string;
  children: ReactNode;
}) {
  const router = useRouter();
  const [enCours, setEnCours] = useState(false);
  const [erreur, setErreur] = useState<string | null>(null);

  async function envoyer(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setErreur(null);
    setEnCours(true);

    const donnees = Object.fromEntries(new FormData(e.currentTarget));

    try {
      const reponse = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ sujet, ...donnees }),
      });

      if (!reponse.ok) throw new Error(String(reponse.status));
      router.push(redirection);
    } catch {
      setErreur(
        "L’envoi n’a pas abouti. Réessayez, ou écrivez-nous directement à contact@ecoledetheatredelyon.com.",
      );
      setEnCours(false);
    }
  }

  return (
    <form onSubmit={envoyer} noValidate={false} className="relative space-y-7">
      <fieldset disabled={enCours} className="space-y-7 border-0 p-0">
        <legend className="sr-only">{intitule}</legend>
        {children}
      </fieldset>

      {erreur && (
        <p
          role="alert"
          className="border border-[var(--color-rideau)] bg-[color-mix(in_oklab,var(--color-rideau)_18%,transparent)] px-4 py-3 font-sans text-sm text-texte"
        >
          {erreur}
        </p>
      )}

      <BoutonSubmit enCours={enCours}>Envoyer</BoutonSubmit>
    </form>
  );
}
