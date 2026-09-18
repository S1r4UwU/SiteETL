"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { navigation, site } from "@/lib/site";

function Logo() {
  return (
    <Link
      href="/"
      className="flex items-center gap-3"
      aria-label={`${site.nom} — accueil`}
    >
      {/* Le lion de Lyon, repris du logo de l’école. Inline : zéro requête. */}
      <span
        aria-hidden
        className="grid size-10 shrink-0 place-items-center bg-scene text-salle"
      >
        <svg viewBox="0 0 24 24" className="size-7" fill="currentColor">
          <path d="M12 2.6c-1.1 1.5-2.6 2-4.2 2.2-.7.1-1 .5-.8 1.2.2.6.1 1-.4 1.5-1 .9-1.4 2-1.2 3.3.1.7.4 1.3.9 1.8.4.4.5.8.3 1.3-.5 1.4-.2 2.7.8 3.8.9 1 2 1.6 3.3 1.9l.6.1v1.7c0 .4.2.6.6.6h.2c.4 0 .6-.2.6-.6v-1.6h.7v1.6c0 .4.2.6.6.6h.2c.4 0 .6-.2.6-.6v-1.8c1.7-.4 3-1.3 3.8-2.8.6-1.1.6-2.2.2-3.3-.2-.5-.1-.9.3-1.3 1.1-1.2 1.2-3 .1-4.2-.4-.4-.5-.8-.4-1.4.2-.8-.1-1.2-.9-1.3-1.6-.2-3-.7-4.1-2.1a1 1 0 0 0-.8-.4c-.3 0-.6.1-.8.4Zm-2.4 7.2c.6 0 1 .5 1 1.1s-.4 1.1-1 1.1-1-.5-1-1.1.4-1.1 1-1.1Zm4.8 0c.6 0 1 .5 1 1.1s-.4 1.1-1 1.1-1-.5-1-1.1.4-1.1 1-1.1ZM12 13.4c.9 0 1.6.4 1.6.9 0 .6-.7 1-1.6 1s-1.6-.4-1.6-1c0-.5.7-.9 1.6-.9Z" />
        </svg>
      </span>
      <span className="leading-none">
        <span className="block font-display text-lg tracking-tight">
          École de Théâtre
        </span>
        <span className="block font-sans text-[0.65rem] uppercase tracking-[0.22em] text-ivoire-sourd">
          de Lyon
        </span>
      </span>
    </Link>
  );
}

export function Header() {
  const chemin = usePathname();
  const [ouvert, setOuvert] = useState(false);
  const [defile, setDefile] = useState(false);

  useEffect(() => setOuvert(false), [chemin]);

  useEffect(() => {
    const onScroll = () => setDefile(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = ouvert ? "hidden" : "";
    const onEchap = (e: KeyboardEvent) => e.key === "Escape" && setOuvert(false);
    window.addEventListener("keydown", onEchap);
    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", onEchap);
    };
  }, [ouvert]);

  const actif = (href: string) =>
    href === "/" ? chemin === "/" : chemin.startsWith(href);

  return (
    <>
      {/* Obligation RGAA : un lien d’évitement, visible au focus. */}
      <a
        href="#contenu"
        className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[70] focus:bg-scene focus:px-4 focus:py-3 focus:font-sans focus:text-sm focus:text-salle"
      >
        Aller au contenu
      </a>

      <header
        className={`fixed inset-x-0 top-0 z-50 transition-colors duration-300 ease-[var(--ease-scene)] ${
          defile || ouvert
            ? "bg-salle/95 backdrop-blur-[2px] border-b border-ivoire/10"
            : "bg-transparent"
        }`}
      >
        <div className="enveloppe flex h-20 items-center justify-between gap-6">
          <Logo />

          <nav aria-label="Navigation principale" className="hidden lg:block">
            <ul className="flex items-center gap-7">
              {navigation.map((item) => (
                <li key={item.href} className="group relative">
                  <Link
                    href={item.href}
                    aria-current={actif(item.href) ? "page" : undefined}
                    className={`font-sans text-[0.8rem] uppercase tracking-[0.14em] transition-colors ${
                      actif(item.href)
                        ? "text-scene"
                        : "text-ivoire-doux hover:text-ivoire"
                    }`}
                  >
                    {item.libelle}
                  </Link>

                  {"enfants" in item && item.enfants && (
                    <div className="invisible absolute left-1/2 top-full z-10 -translate-x-1/2 pt-5 opacity-0 transition-opacity duration-200 group-focus-within:visible group-focus-within:opacity-100 group-hover:visible group-hover:opacity-100">
                      <ul className="min-w-60 border border-ivoire/10 bg-plateau p-2">
                        {item.enfants.map((enfant) => (
                          <li key={enfant.href + enfant.libelle}>
                            <Link
                              href={enfant.href}
                              className="block px-4 py-2.5 font-sans text-sm text-ivoire-doux transition-colors hover:bg-coulisse hover:text-ivoire"
                            >
                              {enfant.libelle}
                            </Link>
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}
                </li>
              ))}
            </ul>
          </nav>

          <div className="flex items-center gap-3">
            {/* Candidater n’est pas un onglet de menu : c’est une action
                permanente, présente sur chaque écran. */}
            <Link
              href="/candidater"
              className="hidden bg-scene px-5 py-3 font-sans text-[0.75rem] uppercase tracking-[0.14em] text-salle transition-colors hover:bg-scene-chaud sm:block"
            >
              Candidater
            </Link>

            <button
              type="button"
              onClick={() => setOuvert((o) => !o)}
              aria-expanded={ouvert}
              aria-controls="menu-mobile"
              className="grid size-11 place-items-center text-ivoire lg:hidden"
            >
              <span className="sr-only">
                {ouvert ? "Fermer le menu" : "Ouvrir le menu"}
              </span>
              <span aria-hidden className="relative block h-3.5 w-6">
                <span
                  className={`absolute left-0 block h-px w-full bg-current transition-transform duration-300 ease-[var(--ease-scene)] ${
                    ouvert ? "top-1.5 rotate-45" : "top-0"
                  }`}
                />
                <span
                  className={`absolute left-0 block h-px w-full bg-current transition-transform duration-300 ease-[var(--ease-scene)] ${
                    ouvert ? "top-1.5 -rotate-45" : "top-3"
                  }`}
                />
              </span>
            </button>
          </div>
        </div>
      </header>

      {/* Tiroir mobile */}
      <div
        id="menu-mobile"
        hidden={!ouvert}
        className="fixed inset-0 z-40 overflow-y-auto bg-salle pt-20 lg:hidden"
      >
        <nav aria-label="Navigation principale (mobile)" className="enveloppe py-8">
          <ul className="divide-y divide-ivoire/10">
            {navigation.map((item) => (
              <li key={item.href} className="py-5">
                <Link
                  href={item.href}
                  className="block font-display text-2xl text-ivoire"
                >
                  {item.libelle}
                </Link>
                {"enfants" in item && item.enfants && (
                  <ul className="mt-3 space-y-2 pl-1">
                    {item.enfants.map((enfant) => (
                      <li key={enfant.href + enfant.libelle}>
                        <Link
                          href={enfant.href}
                          className="font-sans text-sm text-ivoire-doux"
                        >
                          {enfant.libelle}
                        </Link>
                      </li>
                    ))}
                  </ul>
                )}
              </li>
            ))}
          </ul>

          <Link
            href="/candidater"
            className="mt-8 flex items-center justify-between bg-scene px-6 py-5 font-sans text-sm uppercase tracking-[0.14em] text-salle"
          >
            Candidater <span aria-hidden>→</span>
          </Link>

          <p className="mt-8 font-sans text-sm text-ivoire-sourd">
            <a href={`tel:${site.telephone.replace(/\s/g, "")}`} className="lien">
              {site.telephoneAffiche}
            </a>
            <br />
            <a href={`mailto:${site.email}`} className="lien">
              {site.email}
            </a>
          </p>
        </nav>
      </div>
    </>
  );
}
