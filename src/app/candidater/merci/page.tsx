import type { Metadata } from "next";
import { Bouton } from "@/components/Bouton";
import { EnTete, Section } from "@/components/Mise";
import { site } from "@/lib/site";

/* Page de confirmation réelle, avec son URL. C’est elle qui rend la conversion
   mesurable — et elle est volontairement exclue de l’indexation. */
export const metadata: Metadata = {
  title: "Demande envoyée",
  description: "Votre demande a bien été transmise à l’École de Théâtre de Lyon.",
  robots: { index: false, follow: false },
};

export default function Merci() {
  return (
    <>
      <EnTete
        surtitre="Demande envoyée"
        titre="C’est noté. À très vite."
        chapo="Votre demande est arrivée. Nous vous envoyons le dossier de candidature par e-mail sous 48 heures ouvrées — pensez à vérifier vos indésirables si vous ne voyez rien passer."
      />

      <Section>
        <div className="max-w-2xl">
          <p className="prose-etl">
            En attendant, vous pouvez commencer à chercher la scène que vous
            présenterez à l’audition : cinq minutes maximum, issue du répertoire
            théâtral, monologue ou dialogue. Et une chanson — la vôtre, celle que
            vous chantez le mieux, pas celle que vous croyez qu’on attend.
          </p>

          <div className="mt-10 flex flex-wrap gap-4">
            <Bouton href="/spectacles" variante="fantome">
              Voir les spectacles des élèves
            </Bouton>
            <Bouton href="/l-ecole/equipe" variante="fantome" fleche={false}>
              Découvrir l’équipe pédagogique
            </Bouton>
          </div>

          <p className="mt-12 font-sans text-sm text-texte-sourd">
            Une urgence, une question&nbsp;?{" "}
            <a href={`tel:${site.telephone.replace(/\s/g, "")}`} className="lien">
              {site.telephoneAffiche}
            </a>{" "}
            ·{" "}
            <a href={`mailto:${site.email}`} className="lien">
              {site.email}
            </a>
          </p>
        </div>
      </Section>
    </>
  );
}
