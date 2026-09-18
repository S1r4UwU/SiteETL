import Link from "next/link";
import { site } from "@/lib/site";

const plan = [
  {
    titre: "Se former",
    liens: [
      { libelle: "Le cursus en 3 ans", href: "/la-formation" },
      { libelle: "Stages pour comédiens", href: "/stages" },
      { libelle: "Atelier ados 13-17 ans", href: "/atelier-ados" },
      { libelle: "Financer sa formation", href: "/candidater/financement" },
    ],
  },
  {
    titre: "L’école",
    liens: [
      { libelle: "Le projet pédagogique", href: "/l-ecole" },
      { libelle: "L’équipe", href: "/l-ecole/equipe" },
      { libelle: "Nos résultats", href: "/l-ecole/resultats" },
      { libelle: "Accessibilité & handicap", href: "/l-ecole/accessibilite" },
    ],
  },
  {
    titre: "Découvrir",
    liens: [
      { libelle: "Les spectacles", href: "/spectacles" },
      { libelle: "Les alumni", href: "/alumni" },
      { libelle: "L’agenda", href: "/agenda" },
      { libelle: "Portes ouvertes", href: "/candidater/portes-ouvertes" },
    ],
  },
];

const reseaux = [
  { nom: "Instagram", href: site.reseaux.instagram },
  { nom: "Facebook", href: site.reseaux.facebook },
  { nom: "YouTube", href: site.reseaux.youtube },
  { nom: "LinkedIn", href: site.reseaux.linkedin },
];

export function Footer() {
  return (
    <footer className="filet mt-[var(--spacing-section)] bg-plateau">
      <div className="enveloppe py-16 md:py-20">
        <div className="grid gap-12 md:grid-cols-12">
          {/* Coordonnées */}
          <div className="md:col-span-4">
            <p className="surtitre">Nous trouver</p>

            <address className="mt-6 space-y-5 font-sans text-sm not-italic text-ivoire-doux">
              <div>
                <span className="block text-ivoire">Les cours</span>
                {site.adresseCours.rue}
                <br />
                {site.adresseCours.cp} {site.adresseCours.ville}
                <br />
                <span className="text-ivoire-sourd">
                  {site.adresseCours.quartier}
                </span>
              </div>

              <div>
                <span className="block text-ivoire">Administration</span>
                {site.adresseAdmin.rue}
                <br />
                {site.adresseAdmin.cp} {site.adresseAdmin.ville}
              </div>

              <div>
                <a
                  href={`tel:${site.telephone.replace(/\s/g, "")}`}
                  className="lien block"
                >
                  {site.telephoneAffiche}
                </a>
                <a href={`mailto:${site.email}`} className="lien block">
                  {site.email}
                </a>
              </div>

              <p className="text-ivoire-sourd">{site.horaires}</p>
            </address>
          </div>

          {/* Plan du site */}
          <div className="grid gap-10 sm:grid-cols-3 md:col-span-8">
            {plan.map((colonne) => (
              <nav key={colonne.titre} aria-label={colonne.titre}>
                <p className="surtitre surtitre-sourd">{colonne.titre}</p>
                <ul className="mt-5 space-y-3">
                  {colonne.liens.map((lien) => (
                    <li key={lien.href}>
                      <Link
                        href={lien.href}
                        className="font-sans text-sm text-ivoire-doux transition-colors hover:text-scene-chaud"
                      >
                        {lien.libelle}
                      </Link>
                    </li>
                  ))}
                </ul>
              </nav>
            ))}
          </div>
        </div>

        {/* Qualiopi — l’ancien site l’affichait en 150 px illisibles sur chaque
            page. C’est pourtant ce qui débloque les financements. */}
        <div className="filet mt-14 flex flex-col gap-6 pt-10 md:flex-row md:items-center md:justify-between">
          <div className="flex items-start gap-4">
            <span
              aria-hidden
              className="mt-0.5 grid size-11 shrink-0 place-items-center border border-scene text-scene"
            >
              <svg viewBox="0 0 24 24" className="size-5" fill="none" strokeWidth="2" stroke="currentColor">
                <path d="m4 12 5.5 5.5L20 7" strokeLinecap="square" />
              </svg>
            </span>
            <p className="max-w-md font-sans text-sm text-ivoire-doux">
              <span className="text-ivoire">Certification Qualiopi</span> —
              délivrée au titre de la catégorie « actions de formation ». Nos
              formations sont éligibles aux financements AFDAS, France Travail et
              aux dispositifs de la formation professionnelle.{" "}
              <Link href="/candidater/financement" className="lien">
                Financer sa formation
              </Link>
            </p>
          </div>

          <ul className="flex flex-wrap gap-5">
            {reseaux.map((r) => (
              <li key={r.nom}>
                <a
                  href={r.href}
                  target="_blank"
                  rel="noreferrer noopener"
                  className="font-sans text-xs uppercase tracking-[0.14em] text-ivoire-sourd transition-colors hover:text-scene-chaud"
                >
                  {r.nom}
                </a>
              </li>
            ))}
          </ul>
        </div>

        <div className="filet mt-10 flex flex-col gap-4 pt-8 font-sans text-xs text-ivoire-sourd md:flex-row md:items-center md:justify-between">
          <p>
            © {new Date().getFullYear()} {site.nom}® — {site.legal.forme} · SIRET{" "}
            <span className="tnum">{site.legal.siret}</span>
          </p>
          <ul className="flex flex-wrap gap-5">
            <li>
              <Link href="/mentions-legales" className="hover:text-ivoire">
                Mentions légales
              </Link>
            </li>
            <li>
              <Link href="/confidentialite" className="hover:text-ivoire">
                Confidentialité
              </Link>
            </li>
            <li>
              <Link href="/l-ecole/resultats" className="hover:text-ivoire">
                Indicateurs de résultats
              </Link>
            </li>
          </ul>
        </div>
      </div>
    </footer>
  );
}
