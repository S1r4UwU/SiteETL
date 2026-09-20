import type { Metadata } from "next";
import Link from "next/link";
import { Champ, Consentement, Leurre } from "@/components/Champ";
import { Formulaire } from "@/components/Formulaire";
import { EnTete, Section } from "@/components/Mise";
import { site } from "@/lib/site";

export const metadata: Metadata = {
  title: "Contact",
  description:
    "Contacter l’École de Théâtre de Lyon : téléphone, e-mail, adresse, accès en métro, bus, vélo et voiture.",
  alternates: { canonical: "/contact" },
};

const acces = [
  {
    mode: "Métro",
    detail:
      "Ligne C, arrêt Croix-Paquet (2 minutes à pied) — ou ligne A, arrêt Hôtel de Ville–Louis Pradel.",
  },
  { mode: "Bus", detail: "Lignes S6 et S12, arrêt « Tables Claudiennes »." },
  { mode: "Vélo’v", detail: "Station n° 1022, place Tolozan." },
  {
    mode: "Voiture",
    detail:
      "Le stationnement est rare sur les pentes : préférez les parkings Terreaux (23 place des Terreaux), Opéra (21 place Tolozan) ou Gros Caillou (167 bis boulevard de la Croix-Rousse).",
  },
];

export default function Contact() {
  return (
    <>
      <EnTete
        surtitre="Nous joindre"
        titre="Écrivez-nous, appelez-nous, passez"
        chapo="L’administration est ouverte du lundi au vendredi, de 9h à 17h30 — et quelqu’un répond vraiment au téléphone."
      />

      <Section>
        <div className="grid gap-16 lg:grid-cols-12 lg:gap-20">
          <div className="lg:col-span-6">
            {/* Trois champs. L’ancien formulaire en demandait huit, dont six
                obligatoires — nom, prénom, âge, e-mail, téléphone et adresse
                postale — pour simplement poser une question. */}
            <Formulaire
              sujet="Contact"
              redirection="/candidater/merci"
              intitule="Formulaire de contact"
            >
              <Leurre />
              <Champ nom="prenom" libelle="Prénom et nom" requis autoComplete="name" />
              <Champ
                nom="email"
                libelle="Adresse e-mail"
                type="email"
                inputMode="email"
                autoComplete="email"
                requis
              />
              <Champ
                nom="telephone"
                libelle="Téléphone"
                type="tel"
                inputMode="tel"
                autoComplete="tel"
                aide="Si vous préférez qu’on vous rappelle."
              />
              <Champ
                nom="message"
                libelle="Votre message"
                multiligne
                lignes={7}
                requis
              />
              <Consentement>
                J’accepte que l’École de Théâtre de Lyon utilise ces informations
                pour me répondre.{" "}
                <Link href="/confidentialite" className="lien">
                  Politique de confidentialité
                </Link>
                .
              </Consentement>
            </Formulaire>
          </div>

          <aside className="lg:col-span-6">
            <div className="space-y-12">
              <div>
                <p className="surtitre">Directement</p>
                <p className="mt-5 font-display text-[length:var(--text-2xl)]">
                  <a
                    href={`tel:${site.telephone.replace(/\s/g, "")}`}
                    className="hover:text-accent"
                  >
                    {site.telephoneAffiche}
                  </a>
                </p>
                <p className="mt-2 font-sans text-sm">
                  <a href={`mailto:${site.email}`} className="lien">
                    {site.email}
                  </a>
                </p>
                <p className="mt-3 font-sans text-xs text-texte-sourd">
                  {site.horaires}
                </p>
              </div>

              <div className="filet pt-12">
                <p className="surtitre">Les adresses</p>
                <div className="mt-5 grid gap-6 sm:grid-cols-2">
                  <address className="font-sans text-sm not-italic text-texte-doux">
                    <span className="block text-texte">Les cours</span>
                    {site.adresseCours.rue}
                    <br />
                    {site.adresseCours.cp} {site.adresseCours.ville}
                  </address>
                  <address className="font-sans text-sm not-italic text-texte-doux">
                    <span className="block text-texte">
                      Administration & courrier
                    </span>
                    {site.adresseAdmin.rue}
                    <br />
                    {site.adresseAdmin.cp} {site.adresseAdmin.ville}
                  </address>
                </div>
              </div>

              <div className="filet pt-12">
                <p className="surtitre">Venir</p>
                <dl className="mt-5 space-y-5">
                  {acces.map((a) => (
                    <div key={a.mode}>
                      <dt className="font-sans text-xs uppercase tracking-[0.14em] text-accent">
                        {a.mode}
                      </dt>
                      <dd className="mt-1.5 font-sans text-sm text-texte-doux">
                        {a.detail}
                      </dd>
                    </div>
                  ))}
                </dl>
                <p className="mt-6 font-sans text-xs text-texte-sourd">
                  Pour venir à l’école, privilégiez les transports en commun, le
                  vélo ou le covoiturage.
                </p>
              </div>
            </div>
          </aside>
        </div>
      </Section>
    </>
  );
}
