import type { MetadataRoute } from "next";
import { site } from "@/lib/site";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: "*",
        allow: "/",
        // Page de confirmation : utile pour la mesure, inutile dans l’index.
        disallow: ["/candidater/merci", "/api/"],
      },
    ],
    sitemap: `${site.url}/sitemap.xml`,
  };
}
