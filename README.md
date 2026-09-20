# Site — École de Théâtre de Lyon

Refonte du site de l'École de Théâtre de Lyon, en remplacement du site Wix
existant (ecoledetheatredelyon.com).

- [Audit du site actuel](docs/audit-site-actuel.md) — relevé du 18/09/2026
- [Brief de refonte](docs/brief-refonte.md) — architecture, direction artistique, roadmap

---

## Démarrer

```bash
npm install
npm run dev
```

Autres commandes : `npm run build`, `npm run start`, `npm run lint`,
`npm run typecheck`.

## Stack

| | |
|---|---|
| Framework | Next.js 15 (App Router) + TypeScript |
| Styles | Tailwind CSS v4, tokens déclarés dans `src/app/globals.css` (`@theme`) |
| Typographie | Fraunces (titrage) + Archivo (texte), self-hostées par `next/font` |
| Contenu | fichiers typés dans `src/content/`, calqués sur le futur schéma CMS |
| Formulaires | route `/api/contact`, envoi Resend, honeypot + limitation par IP |
| Déploiement | prévu pour Vercel — aucune dépendance à une plateforme particulière |

### Budget de performance

Mesuré au build : **102 kB de JS partagé**, 111–112 kB par page, toutes les
pages prérendues en statique.

Pour comparaison, l'ancien site chargeait **6,75 Mo de JavaScript et 151
requêtes** sur la seule page d'accueil.

---

## Organisation

```
src/
  app/                 une route = un dossier, tout en français
    api/contact/       réception des formulaires
    candidater/        le tunnel : /candidater → /dossier → /merci
    la-formation/      page pilier + une page par discipline
    l-ecole/           projet, équipe, résultats, accessibilité
    spectacles/        archive + une page par spectacle
    stages/            formation continue + une page par stage
    globals.css        LE système de design (couleurs, type, grain, mouvement)
  components/          primitives partagées (Mise, Bouton, Champ, Photo…)
  content/             les données — types dans content/types.ts
  lib/                 site.ts (config, navigation), agenda.ts (tri des dates)
docs/                  audit et brief de refonte
```

### Règles tenues dans le code

Elles répondent chacune à un point précis de l'audit.

- **Aucune date en dur dans un composant.** Toutes les dates vivent dans
  `src/content/agenda.ts`, et un événement passé bascule seul dans l'archive
  (`src/lib/agenda.ts`). L'ancien site annonçait encore, en septembre, une
  journée portes ouvertes du 13 mars.
- **Un seul `<h1>` par page**, porté par le composant `EnTete`. L'ancien site
  en avait quatre sur sa page d'accueil, dont trois dans le pied de page.
- **L'orange `#ED8600` n'est jamais un fond sous du texte blanc** — ce couple
  donnait 2,62:1, sous le seuil AA. Sur le fond noir de salle, le même orange
  donne 7,5:1.
- **Le texte alternatif est un paramètre obligatoire** du composant `Photo`, et
  une image décorative doit le déclarer explicitement (`decoratif`).
- **Les formulaires ont un `<label>` visible**, une case de consentement RGPD,
  et le type HTML correct — l'ancien champ « Adresse domicile » était déclaré
  `type="tel"`, donc saisi au pavé numérique sur mobile.
- **Chaque conversion a une URL réelle** et une page de confirmation
  (`/candidater/merci`). L'ancien appel à l'action principal était une boîte
  modale sans adresse : ni partageable, ni indexable, ni mesurable.
- **Deux familles de polices**, contre dix sur l'ancien site.

---

## Variables d'environnement

Aucune n'est nécessaire pour développer. Pour l'envoi réel des formulaires :

```bash
RESEND_API_KEY=...                                  # sans cette clé, la route journalise sans envoyer
EMAIL_DESTINATAIRE=contact@ecoledetheatredelyon.com
EMAIL_EXPEDITEUR=site@ecoledetheatredelyon.com      # domaine à vérifier chez Resend
```

---

## À faire avant la mise en ligne

### Bloquant

- [ ] **Remplacer les images.** Elles sont pour l'instant servies par le CDN de
      l'ancien site Wix (`static.wixstatic.com`, autorisé dans
      `next.config.ts`). Il faut les exports HD de l'école, déposés dans
      `public/`, puis retirer ce domaine de la configuration.
      `src/content/medias.ts` porte les identifiants, les dimensions d'origine
      et les métadonnées de chaque visuel : la correspondance se refera dessus.
- [ ] **Faire valider la publication nominative** des comédiennes et comédiens
      en scène (`enScene` dans `medias.ts`, `distribution` dans
      `spectacles.ts`). Ces noms viennent des crédits publics de l'ancien site
      et créditer la distribution est l'usage au théâtre — mais ça se demande.
- [ ] **Compléter les promotions** (`src/content/promotions.ts`) : années
      exactes, et les noms antérieurs à 2021.
- [ ] **Renseigner l'hébergeur** dans les mentions légales (mention obligatoire,
      LCEN art. 6-III) — le bloc « À compléter par l'école » est en place.
- [ ] **Compléter les dates 2026-2027** dans `src/content/agenda.ts` et
      `src/content/stages.ts` : auditions, portes ouvertes, stages escrime /
      marionnettes / commedia, restitution de l'atelier ados.
- [x] **Créditer les photographes.** Fait : récoltés dans les métadonnées des
      galeries de l'ancien site (Charlotte Magne, Maxime Charpy, Ali Aouzoulène,
      Anna Ollivier, Oscar Buenafuente) et séparés des comédiens en scène.
- [ ] Vérifier le domaine d'envoi chez Resend et poser `RESEND_API_KEY`.

### Important

- [ ] Vérifier les redirections 301 après bascule du domaine — les 26 anciennes
      URL sont déjà mappées dans `next.config.ts`.
- [ ] Faire relire les mentions légales et la politique de confidentialité.
- [ ] Ajouter les distributions (noms des élèves) par spectacle, avec leur
      accord de publication.
- [ ] Brancher le CMS (Sanity ou Payload) sur le modèle de `src/content/types.ts`,
      pour que l'école soit autonome sur ses dates.
- [ ] Ajouter une mesure d'audience sans cookie (Plausible ou Matomo) — la
      politique de confidentialité l'anticipe déjà.

### Décisions à prendre avec l'école

- [ ] Paiement en ligne des 50 € de frais d'audition (supprime le chèque et l'envoi postal)
- [ ] Dossier de candidature en ligne avec dépôt de fichiers
- [ ] Qui tient le CMS à jour
- [ ] Sort de la page « stages cinéma » du partenaire Plein Cadre Formation

---

## Contenu

Tout le contenu éditorial provient du site existant, réécrit et restructuré.
Les textes de spectacles sont ceux des metteurs en scène et des élèves, les
témoignages d'alumni et les indicateurs Qualiopi sont repris tels quels.

Les rares textes ajoutés (page financement, accroches de disciplines,
introduction de l'atelier ados) sont signalés dans le brief et **doivent être
validés par l'école avant mise en ligne**.
