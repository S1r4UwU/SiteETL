import type { Metadata } from "next";
import Link from "next/link";
import { EnTete } from "@/components/Mise";
import { Article, AValider, Document } from "@/components/Texte";
import { site } from "@/lib/site";

export const metadata: Metadata = {
  title: "Mentions légales",
  description: "Mentions légales du site de l’École de Théâtre de Lyon.",
  alternates: { canonical: "/mentions-legales" },
  robots: { index: true, follow: true },
};

export default function MentionsLegales() {
  return (
    <>
      <EnTete
        surtitre="Informations légales"
        titre="Mentions légales"
        chapo="Informations prévues par l’article 6-III de la loi n° 2004-575 du 21 juin 2004 pour la confiance dans l’économie numérique."
      />

      <Document>
        <Article titre="Éditeur du site">
          <p>
            <strong>{site.nom}®</strong> — {site.legal.forme}
            <br />
            Siège et administration : {site.adresseAdmin.rue},{" "}
            {site.adresseAdmin.cp} {site.adresseAdmin.ville}
            <br />
            Lieu des cours : {site.adresseCours.rue}, {site.adresseCours.cp}{" "}
            {site.adresseCours.ville}
          </p>
          <p>
            SIRET : <span className="tnum">{site.legal.siret}</span>
            <br />
            Code NAF : {site.legal.naf} — enseignement culturel
            <br />
            Numéro de déclaration d’activité :{" "}
            <span className="tnum">{site.legal.declarationActivite}</span>
            <br />
            Certification Qualiopi au titre des actions de formation.
          </p>
          <p>
            Gérant et directeur de la publication : {site.legal.gerant}
            <br />
            Administratrice : {site.legal.administratrice}
            <br />
            Téléphone : {site.telephoneAffiche} — Courriel :{" "}
            <a href={`mailto:${site.email}`} className="lien">
              {site.email}
            </a>
          </p>
        </Article>

        <Article titre="Hébergement">
          <AValider>
            Raison sociale, adresse et téléphone de l’hébergeur du site. Cette
            mention est obligatoire (LCEN, art. 6-III) et manquait sur le site
            précédent. À renseigner une fois l’hébergement arrêté.
          </AValider>
        </Article>

        <Article titre="Propriété intellectuelle">
          <p>
            L’ensemble des contenus présents sur ce site — textes,
            photographies, vidéos, éléments graphiques — est protégé par le droit
            d’auteur. Toute reproduction ou représentation, totale ou partielle,
            sur quelque support que ce soit, est interdite sans l’accord écrit
            préalable du directeur de la publication.
          </p>
          <p>
            Vous pouvez toutefois télécharger ou imprimer des pages du site à des
            fins strictement personnelles, à condition de ne supprimer aucune
            mention relative au droit d’auteur ou aux droits de propriété
            intellectuelle.
          </p>
          <p>
            Le nom « École de Théâtre de Lyon » et le logo correspondant sont des
            marques déposées. Ils ne peuvent être reproduits, supprimés,
            réutilisés ni modifiés d’aucune manière.
          </p>
          <p>
            Les photographies de spectacles sont l’œuvre des photographes
            crédités sur chaque page. Les élèves et intervenants apparaissant sur
            les images ont donné leur autorisation de droit à l’image.
          </p>
        </Article>

        <Article titre="Données personnelles">
          <p>
            Le traitement des données collectées sur ce site est décrit en détail
            dans notre{" "}
            <Link href="/confidentialite" className="lien">
              politique de confidentialité
            </Link>
            , conformément au Règlement (UE) 2016/679 (RGPD) et à la loi
            Informatique et Libertés modifiée.
          </p>
        </Article>

        <Article titre="Accessibilité">
          <p>
            Ce site est conçu pour viser le niveau AA des recommandations WCAG
            2.1. Si vous rencontrez une difficulté d’accès à une information,
            signalez-le à{" "}
            <a href={`mailto:${site.email}`} className="lien">
              {site.email}
            </a>{" "}
            : nous chercherons à vous transmettre l’information par un autre
            moyen, et à corriger le problème.{" "}
            <Link href="/l-ecole/accessibilite" className="lien">
              Notre politique d’accessibilité
            </Link>
            .
          </p>
        </Article>

        <Article titre="Litiges">
          <p>
            Les présentes mentions sont régies par le droit français. En cas de
            litige, et à défaut de résolution amiable, les tribunaux français
            sont seuls compétents.
          </p>
        </Article>
      </Document>
    </>
  );
}
