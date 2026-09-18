import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Le dossier du projet se trouve sous un autre lockfile ; on fige la racine.
  outputFileTracingRoot: __dirname,
  images: {
    formats: ["image/avif", "image/webp"],
    remotePatterns: [
      // PROVISOIRE — les visuels sont encore servis par le CDN de l'ancien site Wix.
      // À remplacer par les exports HD demandés à l'école (voir docs/brief-refonte.md §7).
      { protocol: "https", hostname: "static.wixstatic.com" },
    ],
  },
  async headers() {
    return [
      {
        source: "/:path*",
        headers: [
          { key: "X-Content-Type-Options", value: "nosniff" },
          { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
          { key: "X-Frame-Options", value: "SAMEORIGIN" },
          {
            key: "Permissions-Policy",
            value: "camera=(), microphone=(), geolocation=()",
          },
        ],
      },
    ];
  },
  async redirects() {
    // Redirections 301 depuis les 26 URL de l'ancien site Wix.
    const map: Record<string, string> = {
      "/formation": "/la-formation",
      "/intervenants": "/l-ecole/equipe",
      "/stages-cin%C3%A9ma": "/stages/cinema",
      "/stages-cinéma": "/stages/cinema",
      "/admission": "/candidater",
      "/evenements-a-venir": "/agenda",
      "/jpo": "/candidater/portes-ouvertes",
      "/spectacles-passes": "/spectacles",
      "/images": "/spectacles",
      "/videos": "/spectacles",
      "/anciens-eleves": "/alumni",
      "/enquetes-satisfaction": "/l-ecole/resultats",
      "/mentions-l%C3%A9gales": "/mentions-legales",
      "/thierry-buenafuente": "/l-ecole/equipe/thierry-buenafuente",
      "/louise-buenafuente": "/l-ecole/equipe/louise-buenafuente",
      "/maxime-cella": "/l-ecole/equipe/maxime-cella",
      "/elisabeth-herbepin": "/l-ecole/equipe/elisabeth-herbepin",
      "/ivan-herisson": "/l-ecole/equipe/ivan-herisson",
      "/laurie-iversen": "/l-ecole/equipe/laurie-iversen",
      "/sebastien-jacquemin": "/l-ecole/equipe/sebastien-jacquemin",
      "/maude-lallier": "/l-ecole/equipe/maude-lallier",
      "/karin-martin-prevel": "/l-ecole/equipe/karin-martin-prevel",
      "/florence-leguy": "/l-ecole/equipe/florence-leguy",
      "/clement-peretjatko": "/l-ecole/equipe/clement-peretjatko",
    };
    return Object.entries(map).map(([source, destination]) => ({
      source,
      destination,
      permanent: true,
    }));
  },
};

export default nextConfig;
