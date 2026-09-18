import type { Metadata } from "next";
import { Bouton } from "@/components/Bouton";
import { EnTete, Section } from "@/components/Mise";
import { site } from "@/lib/site";

export const metadata: Metadata = {
  title: "Accessibilité & situations de handicap",
  description:
    "L’École de Théâtre de Lyon s’inscrit dans une politique d’égalité des chances. Référente handicap, aménagements, accompagnement tout au long de la formation.",
  alternates: { canonical: "/l-ecole/accessibilite" },
};

const engagements = [
  "Prendre en compte vos besoins au regard de votre handicap ou de votre trouble de santé",
  "Étudier des solutions d’aménagement spécifiques — humaines, matérielles et techniques — pour vous accompagner durant toute votre formation",
  "Faire le lien entre les différents services de notre organisme de formation",
  "Vous accompagner dans vos démarches",
];

export default function Accessibilite() {
  return (
    <>
      <EnTete
        surtitre="Égalité des chances"
        titre="Situations de handicap"
        chapo="L’École de Théâtre de Lyon s’inscrit dans une politique d’égalité des chances, afin de permettre à tous nos stagiaires d’accéder à toutes nos formations."
      />

      <Section className="!pt-0">
        <div className="grid gap-16 lg:grid-cols-12 lg:gap-20">
          <div className="lg:col-span-7">
            <p className="prose-etl text-[length:var(--text-lg)] !text-ivoire">
              Les participant·es en situation de handicap temporaire ou permanent,
              ou ayant un trouble de santé invalidant, peuvent être accompagné·es
              durant toute leur formation.
            </p>

            <div className="mt-12">
              <p className="surtitre">Nos engagements</p>
              <ul className="mt-6 space-y-4">
                {engagements.map((e) => (
                  <li key={e} className="flex gap-4 font-sans text-sm text-ivoire-doux">
                    <span aria-hidden className="mt-2.5 h-px w-5 shrink-0 bg-scene" />
                    {e}
                  </li>
                ))}
              </ul>
            </div>

            <div className="filet mt-14 pt-12">
              <p className="surtitre">À l’admission</p>
              <p className="prose-etl mt-5">
                Nous portons une attention particulière à toute situation, et
                étudions tous les dossiers. Si votre situation nécessite des
                aménagements particuliers — pour l’audition elle-même, ou pour la
                formation —, dites-le nous dès votre demande de dossier : nous en
                parlerons avant, pas après.
              </p>
            </div>

            <div className="filet mt-14 pt-12">
              <p className="surtitre">Accessibilité du site</p>
              <p className="prose-etl mt-5">
                Ce site est conçu pour être utilisable au clavier et avec un
                lecteur d’écran : contrastes conformes au niveau AA des
                recommandations WCAG 2.1, structure de titres cohérente, lien
                d’évitement, animations désactivées si votre système le demande.
                Si vous rencontrez un obstacle, signalez-le nous : nous le
                corrigerons.
              </p>
            </div>
          </div>

          <aside className="lg:col-span-5">
            <div className="border border-scene/40 p-7">
              <p className="surtitre">Votre interlocutrice</p>
              <p className="mt-5 font-display text-[length:var(--text-xl)]">
                {site.legal.referenteHandicap}
              </p>
              <p className="mt-1 font-sans text-xs text-ivoire-sourd">
                Référente handicap — administratrice de l’école
              </p>
              <p className="mt-6 font-sans text-sm text-ivoire-doux">
                Elle se tient à votre disposition pour toute question concernant
                les dispositifs disponibles.
              </p>
              <p className="mt-6 font-sans text-sm">
                <a
                  href={`tel:${site.telephone.replace(/\s/g, "")}`}
                  className="lien block"
                >
                  {site.telephoneAffiche}
                </a>
                <a href={`mailto:${site.email}`} className="lien block">
                  {site.email}
                </a>
              </p>
              <div className="mt-8">
                <Bouton href="/contact" variante="fantome">
                  Nous écrire
                </Bouton>
              </div>
            </div>
          </aside>
        </div>
      </Section>
    </>
  );
}
