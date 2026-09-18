import type { Metadata } from "next";
import Link from "next/link";
import { Champ, Consentement, Leurre } from "@/components/Champ";
import { Formulaire } from "@/components/Formulaire";
import { EnTete, Section } from "@/components/Mise";
import { site } from "@/lib/site";

export const metadata: Metadata = {
  title: "Demander le dossier de candidature",
  description:
    "Recevez le dossier de candidature de l’École de Théâtre de Lyon par e-mail, sous 48 heures ouvrées. Prénom et adresse e-mail suffisent.",
  alternates: { canonical: "/candidater/dossier" },
};

export default function Dossier() {
  return (
    <>
      <EnTete
        surtitre="Étape 1 sur 5"
        titre="Demander le dossier de candidature"
        chapo="Deux champs suffisent. Nous vous envoyons le dossier par e-mail sous 48 heures ouvrées — votre âge, votre adresse et vos pièces justificatives ne sont demandés qu’au moment du dépôt de candidature."
      />

      <Section className="!pt-0">
        <div className="grid gap-16 lg:grid-cols-12 lg:gap-20">
          <div className="lg:col-span-7">
            <Formulaire
              sujet="Demande de dossier de candidature"
              redirection="/candidater/merci"
              intitule="Demander le dossier de candidature"
            >
              <Leurre />

              <Champ
                nom="prenom"
                libelle="Prénom et nom"
                requis
                autoComplete="name"
              />

              <Champ
                nom="email"
                libelle="Adresse e-mail"
                type="email"
                inputMode="email"
                autoComplete="email"
                requis
                aide="C’est à cette adresse que nous enverrons le dossier."
              />

              <Champ
                nom="message"
                libelle="Une question, une précision sur votre parcours ?"
                multiligne
                lignes={5}
              />

              <Consentement>
                J’accepte que l’École de Théâtre de Lyon utilise ces informations
                pour traiter ma demande. Elles ne sont ni revendues ni
                transmises à des tiers.{" "}
                <Link href="/confidentialite" className="lien">
                  Politique de confidentialité
                </Link>
                .
              </Consentement>
            </Formulaire>
          </div>

          <aside className="lg:col-span-5">
            <div className="border border-ivoire/15 p-7">
              <p className="surtitre">Ce qui se passe ensuite</p>
              <ol className="mt-6 space-y-5">
                {[
                  "Vous recevez le dossier de candidature par e-mail, sous 48 h ouvrées.",
                  "Vous le renvoyez complété, avec un CV, une lettre de motivation, une copie de pièce d’identité et le règlement des frais d’audition.",
                  "Nous vous convoquons à une audition : une scène de cinq minutes, une chanson, un entretien.",
                ].map((t, i) => (
                  <li key={t} className="flex gap-4">
                    <span className="font-display text-sm text-scene tnum">
                      {String(i + 1).padStart(2, "0")}
                    </span>
                    <span className="font-sans text-sm text-ivoire-doux">{t}</span>
                  </li>
                ))}
              </ol>

              <p className="mt-8 border-t border-ivoire/10 pt-6 font-sans text-sm text-ivoire-doux">
                Vous préférez nous parler&nbsp;?
                <br />
                <a
                  href={`tel:${site.telephone.replace(/\s/g, "")}`}
                  className="lien"
                >
                  {site.telephoneAffiche}
                </a>
                , du lundi au vendredi de 9h à 17h30.
              </p>
            </div>

            <p className="mt-8 font-sans text-xs text-ivoire-sourd">
              Candidat·e mineur·e&nbsp;? L’inscription est possible dès 17 ans
              avec l’accord écrit des parents. Le formulaire de candidature devra
              être signé par le ou les représentants légaux.
            </p>
          </aside>
        </div>
      </Section>
    </>
  );
}
