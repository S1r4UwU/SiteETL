import type { Metadata } from "next";
import { EnTete } from "@/components/Mise";
import { Article, AValider, Document } from "@/components/Texte";
import { site } from "@/lib/site";

export const metadata: Metadata = {
  title: "Politique de confidentialité",
  description:
    "Comment l’École de Théâtre de Lyon traite vos données personnelles : finalités, bases légales, durées de conservation, vos droits.",
  alternates: { canonical: "/confidentialite" },
};

/* Page absente de l’ancien site, dont les mentions légales citaient encore la
   loi de 1978 « modifiée en 2004 » — soit un texte antérieur au RGPD. */
const traitements = [
  {
    finalite: "Répondre à une demande de dossier de candidature",
    donnees: "Prénom, nom, adresse e-mail, message libre",
    base: "Mesures précontractuelles prises à votre demande (art. 6.1.b du RGPD)",
    duree: "3 ans à compter du dernier contact",
  },
  {
    finalite: "Inscription à une journée portes ouvertes",
    donnees:
      "Prénom, nom, adresse e-mail, créneau choisi, nombre d’accompagnants, source d’acquisition (facultative)",
    base: "Votre consentement (art. 6.1.a)",
    duree: "12 mois après l’événement",
  },
  {
    finalite: "Inscription à un stage ou à l’atelier ados",
    donnees:
      "Prénom, nom, adresse e-mail, téléphone, éléments de parcours, âge de l’enfant le cas échéant",
    base: "Mesures précontractuelles, puis exécution du contrat de formation",
    duree: "Durée de la relation, puis archivage légal applicable à la formation professionnelle",
  },
  {
    finalite: "Répondre à un message envoyé via le formulaire de contact",
    donnees: "Prénom, nom, adresse e-mail, téléphone facultatif, message",
    base: "Votre consentement",
    duree: "3 ans à compter du dernier contact",
  },
];

export default function Confidentialite() {
  return (
    <>
      <EnTete
        surtitre="RGPD"
        titre="Politique de confidentialité"
        chapo="Ce que nous collectons, pourquoi, pendant combien de temps, et ce que vous pouvez exiger de nous à tout moment."
      />

      <Document>
        <Article titre="Qui est responsable de vos données">
          <p>
            Le responsable de traitement est <strong>{site.nom}®</strong>,{" "}
            {site.legal.forme}, dont le siège est situé {site.adresseAdmin.rue},{" "}
            {site.adresseAdmin.cp} {site.adresseAdmin.ville}. SIRET{" "}
            <span className="tnum">{site.legal.siret}</span>.
          </p>
          <p>
            Pour toute question relative à vos données :{" "}
            <a href={`mailto:${site.email}`} className="lien">
              {site.email}
            </a>{" "}
            ou {site.telephoneAffiche}.
          </p>
        </Article>

        <Article titre="Les traitements que nous mettons en œuvre">
          <div className="space-y-px bg-[var(--color-filet)]">
            {traitements.map((t) => (
              <div key={t.finalite} className="bg-fond py-6">
                <p className="font-sans text-sm text-texte">{t.finalite}</p>
                <dl className="mt-3 space-y-1.5 font-sans text-xs text-texte-doux">
                  <div>
                    <dt className="inline text-texte-sourd">Données : </dt>
                    <dd className="inline">{t.donnees}</dd>
                  </div>
                  <div>
                    <dt className="inline text-texte-sourd">Base légale : </dt>
                    <dd className="inline">{t.base}</dd>
                  </div>
                  <div>
                    <dt className="inline text-texte-sourd">Conservation : </dt>
                    <dd className="inline">{t.duree}</dd>
                  </div>
                </dl>
              </div>
            ))}
          </div>
          <p>
            Nous appliquons le principe de minimisation : chaque formulaire ne
            demande que ce qui est nécessaire à l’étape en cours. Votre âge,
            votre adresse postale et vos pièces justificatives ne vous sont
            demandés qu’au moment du dépôt effectif d’une candidature, pas pour
            recevoir une information.
          </p>
        </Article>

        <Article titre="Les personnes mineures">
          <p>
            L’école accueille des candidat·es dès 17 ans avec l’accord des
            représentants légaux, et anime un atelier ouvert aux 13-17 ans. Les
            données concernant une personne mineure sont collectées auprès du
            représentant légal, qui exerce les droits décrits ci-dessous pour le
            compte de l’enfant.
          </p>
        </Article>

        <Article titre="Destinataires">
          <p>
            Vos données sont traitées par l’équipe administrative de l’école.
            Elles ne sont ni vendues, ni louées, ni transmises à des tiers à des
            fins commerciales.
          </p>
          <p>
            Elles transitent par nos prestataires techniques (hébergement du
            site, service d’envoi des e-mails), qui agissent en qualité de
            sous-traitants, dans l’Union européenne, et uniquement sur nos
            instructions.
          </p>
          <AValider>
            Liste nominative des sous-traitants (hébergeur, service d’e-mail,
            outil de mesure d’audience) à figer une fois l’infrastructure
            arrêtée.
          </AValider>
        </Article>

        <Article titre="Cookies et mesure d’audience">
          <p>
            Ce site ne dépose <strong>aucun cookie publicitaire</strong>, aucun
            traceur tiers, et n’enregistre pas les sessions de navigation. Il
            n’affiche donc pas de bandeau de consentement : il n’y a rien à
            consentir.
          </p>
          <p>
            Si une mesure d’audience est mise en place, elle le sera avec une
            solution sans cookie et sans donnée personnelle, conforme aux
            recommandations de la CNIL pour l’exemption de consentement. Cette
            page sera alors mise à jour.
          </p>
        </Article>

        <Article titre="Vos droits">
          <p>
            Conformément au RGPD et à la loi Informatique et Libertés modifiée,
            vous disposez d’un droit d’accès, de rectification, d’effacement, de
            limitation du traitement, d’opposition et de portabilité de vos
            données. Lorsque le traitement repose sur votre consentement, vous
            pouvez le retirer à tout moment, sans que cela remette en cause la
            licéité du traitement effectué avant ce retrait.
          </p>
          <p>
            Pour exercer ces droits, écrivez à{" "}
            <a href={`mailto:${site.email}`} className="lien">
              {site.email}
            </a>
            . Nous vous répondons dans un délai d’un mois.
          </p>
          <p>
            Si vous estimez, après nous avoir contactés, que vos droits ne sont
            pas respectés, vous pouvez adresser une réclamation à la{" "}
            <a
              href="https://www.cnil.fr/fr/plaintes"
              target="_blank"
              rel="noreferrer noopener"
              className="lien"
            >
              CNIL
            </a>
            .
          </p>
        </Article>

        <Article titre="Sécurité">
          <p>
            Le site est servi exclusivement en HTTPS. Les formulaires sont
            protégés contre les envois automatisés et limités en fréquence.
            L’accès aux demandes reçues est restreint à l’équipe administrative
            de l’école.
          </p>
        </Article>
      </Document>
    </>
  );
}
