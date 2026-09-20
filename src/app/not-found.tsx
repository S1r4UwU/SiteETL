import { Bouton } from "@/components/Bouton";
import { EnTete, Section } from "@/components/Mise";

export default function Introuvable() {
  return (
    <>
      <EnTete
        surtitre="Erreur 404"
        titre="Le rideau est tombé sur cette page"
        chapo="L’adresse demandée n’existe pas, ou plus. Elle a peut-être changé lors de la refonte du site."
      />

      <Section>
        <div className="flex flex-wrap gap-4">
          <Bouton href="/">Retour à l’accueil</Bouton>
          <Bouton href="/la-formation" variante="fantome" fleche={false}>
            La formation
          </Bouton>
          <Bouton href="/candidater" variante="fantome" fleche={false}>
            Candidater
          </Bouton>
          <Bouton href="/contact" variante="sourd">
            Nous signaler le lien cassé
          </Bouton>
        </div>
      </Section>
    </>
  );
}
