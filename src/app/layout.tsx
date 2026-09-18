import type { Metadata, Viewport } from "next";
import { Fraunces, Archivo } from "next/font/google";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { site } from "@/lib/site";
import "./globals.css";

/* Deux familles, self-hostées par next/font — contre les dix polices chargées
   par l’ancien site. Fraunces pour l’affiche, Archivo pour la lecture.
   (Le brief proposait Switzer en texte ; Archivo est l’équivalent disponible
   sur Google Fonts, donc self-hostable sans fichier binaire au dépôt.) */
const fraunces = Fraunces({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-fraunces",
  axes: ["SOFT", "WONK", "opsz"],
});

const archivo = Archivo({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-archivo",
});

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: {
    default:
      "École de Théâtre de Lyon — Formation professionnelle de comédien·ne",
    template: "%s — École de Théâtre de Lyon",
  },
  description:
    "Formation professionnalisante de comédien·ne sur trois ans, à Lyon. 1 500 heures, 95 % de pratique, 20 élèves par promotion, 100 % d’insertion à 6 mois. Certifiée Qualiopi.",
  applicationName: site.nom,
  authors: [{ name: site.nom }],
  openGraph: {
    type: "website",
    locale: "fr_FR",
    siteName: site.nom,
    url: site.url,
  },
  robots: { index: true, follow: true },
  alternates: { canonical: "/" },
};

export const viewport: Viewport = {
  themeColor: "#0b0b0c",
  colorScheme: "dark",
};

/* Données structurées. L’ancien site ne déclarait qu’un LocalBusiness ; ce sont
   EducationalOrganization et Course qui déclenchent les résultats enrichis
   pour un établissement de formation. */
const donneesStructurees = {
  "@context": "https://schema.org",
  "@type": ["EducationalOrganization", "LocalBusiness"],
  name: site.nom,
  alternateName: "ETL",
  url: site.url,
  telephone: site.telephone,
  email: site.email,
  slogan: site.devise,
  address: {
    "@type": "PostalAddress",
    streetAddress: site.adresseCours.rue,
    postalCode: site.adresseCours.cp,
    addressLocality: site.adresseCours.ville,
    addressCountry: "FR",
  },
  areaServed: "Lyon",
  sameAs: Object.values(site.reseaux),
  hasCredential: {
    "@type": "EducationalOccupationalCredential",
    name: "Qualiopi — actions de formation",
  },
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="fr" className={`${fraunces.variable} ${archivo.variable}`}>
      <body>
        <div className="grain" aria-hidden />
        <Header />
        <main id="contenu">{children}</main>
        <Footer />
        <script
          type="application/ld+json"
          // eslint-disable-next-line react/no-danger
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(donneesStructurees),
          }}
        />
      </body>
    </html>
  );
}
