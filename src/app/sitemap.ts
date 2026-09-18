import type { MetadataRoute } from "next";
import { disciplines } from "@/content/disciplines";
import { equipe } from "@/content/equipe";
import { spectacles } from "@/content/spectacles";
import { stages } from "@/content/stages";
import { site } from "@/lib/site";

export default function sitemap(): MetadataRoute.Sitemap {
  const maintenant = new Date();

  const fixes: [string, number][] = [
    ["", 1],
    ["/la-formation", 0.9],
    ["/candidater", 0.9],
    ["/candidater/dossier", 0.8],
    ["/candidater/portes-ouvertes", 0.7],
    ["/candidater/financement", 0.7],
    ["/l-ecole", 0.7],
    ["/l-ecole/equipe", 0.7],
    ["/l-ecole/resultats", 0.7],
    ["/l-ecole/accessibilite", 0.5],
    ["/spectacles", 0.7],
    ["/stages", 0.7],
    ["/alumni", 0.7],
    ["/agenda", 0.6],
    ["/atelier-ados", 0.7],
    ["/contact", 0.6],
    ["/mentions-legales", 0.2],
    ["/confidentialite", 0.2],
  ];

  const dynamiques: [string, number][] = [
    ...disciplines.map((d) => [`/la-formation/${d.slug}`, 0.7] as [string, number]),
    ...equipe.map((i) => [`/l-ecole/equipe/${i.slug}`, 0.5] as [string, number]),
    ...spectacles.map((s) => [`/spectacles/${s.slug}`, 0.6] as [string, number]),
    ...stages.map((s) => [`/stages/${s.slug}`, 0.6] as [string, number]),
  ];

  return [...fixes, ...dynamiques].map(([chemin, priority]) => ({
    url: `${site.url}${chemin}`,
    lastModified: maintenant,
    changeFrequency: "monthly" as const,
    priority,
  }));
}
