# Brief de refonte — École de Théâtre de Lyon

Document de travail, établi à partir de [l'audit du site actuel](./audit-site-actuel.md) (18/09/2026).

---

## 1. Le parti pris

Une école de théâtre qui se présente avec un site de classeur administratif se disqualifie elle-même. Le nouveau site doit faire **ce que l'école enseigne : mettre en scène**.

Trois principes directeurs :

1. **La preuve avant l'argument.** L'école a 100 % d'insertion à 6 mois, une élève admise à l'ENSATT et à l'École Nationale de Théâtre du Canada, une ancienne devenue directrice artistique d'un théâtre lyonnais. Ça se met en page d'accueil, pas dans un onglet.
2. **Le corps avant le texte.** 95 % de la formation est de la pratique. Le site doit être piloté par la photographie de plateau, pas par des listes à puces.
3. **Un seul chemin qui compte.** Tout converge vers « candidater ». Chaque page doit savoir où elle envoie.

### Objectifs mesurables

| Objectif | Indicateur | Cible |
|---|---|---|
| Faire candidater | demandes de dossier / mois | mesurable dès J+1 (aujourd'hui : non mesuré) |
| Ne plus perdre les mobiles | LCP mobile | < 2,0 s (aujourd'hui : plusieurs secondes) |
| Exister sur Google | pages positionnées | 15+ pages utiles (aujourd'hui : 1 réelle) |
| Ne plus être périmé | délai de mise à jour d'une date par l'école | < 2 min, sans développeur |
| Passer un audit Qualiopi | conformité RGAA AA | 100 % des critères bloquants |

---

## 2. Architecture cible

L'arborescence actuelle range par *type de contenu*. La nouvelle range par **intention de l'utilisateur**.

```
/                                   Accueil
/la-formation                       Le cursus 3 ans (page pilier)
  /la-formation/jeu-et-interpretation
  /la-formation/jeu-face-camera
  /la-formation/voix-et-corps
  /la-formation/dire-le-vers
  /la-formation/chant
  /la-formation/danse
  /la-formation/modules             escrime, clown, marionnettes, biomécanique
/candidater                         ← LE tunnel, URL propre et indexable
  /candidater/dossier               formulaire (page réelle, pas lightbox)
  /candidater/merci                 page de confirmation = mesure de conversion
  /candidater/portes-ouvertes       JPO, inscription
  /candidater/financement           CPF, AFDAS, France Travail, Qualiopi
/l-ecole                            histoire, projet pédagogique, locaux, Qualiopi
  /l-ecole/equipe                   12 intervenants
  /l-ecole/equipe/[nom]             une page par intervenant (elles existent déjà !)
  /l-ecole/resultats                satisfaction + insertion (sorti du pied de page)
  /l-ecole/accessibilite            politique handicap + référente
/spectacles                         archive vivante 2011→
  /spectacles/[annee]/[piece]       une page par spectacle : texte, photos, distribution
/stages                             formation continue, comédiens externes
  /stages/[slug]                    une page par stage
/atelier-ados                       espace dédié, langage parent
/alumni                             parcours des anciens
  /alumni/[nom]
/agenda                             auditions, JPO, représentations (auto-archivage)
/contact
/mentions-legales  /confidentialite  /cgv
```

### Décisions structurantes

- **`/candidater` devient une vraie page** avec URL, title, description, schéma `Course`. C'est le correctif n°1 de l'audit.
- **Une page par discipline** : le contenu existe déjà (triade Principe/Méthode/Objectif, 6 fois). Il suffit de le sortir de la page fleuve. +6 pages positionnables.
- **Une page par spectacle** : 15 ans d'archives, des textes de programme déjà écrits, des photos déjà là. C'est la plus grosse réserve de contenu du projet, à coût de rédaction quasi nul.
- **`/agenda` s'archive tout seul.** Un événement passé bascule automatiquement dans « passés ». C'est ce qui empêche une JPO de mars 2026 d'être encore annoncée en septembre.
- **Fusion de `/images` et `/videos`** dans les pages spectacles. On supprime deux pages fourre-tout à 4 Mo.
- **Redirections 301 obligatoires** depuis toutes les anciennes URL, `/stages-cin%C3%A9ma` compris.

---

## 3. Direction artistique

### 3.1 Ce qu'il faut éviter — le « look IA »

C'est la contrainte principale du projet. Un site généré ressemble aujourd'hui à ça, et il faut s'en tenir à distance :

| Signal « IA » | Pourquoi ça sonne faux | Ce qu'on fait à la place |
|---|---|---|
| Dégradé violet/bleu, mesh gradient, aurora | C'est le fond par défaut de tous les templates depuis 2022 — et c'est déjà le problème du site actuel | Noir profond, ivoire, une lumière orange. Pas de dégradé décoratif. |
| Cartes en verre dépoli (glassmorphism), bordures 1px translucides, `backdrop-blur` | Aucun rapport avec le sujet, pur effet | Surfaces pleines, séparateurs francs, ombres portées absentes ou nettes |
| Grille de 3 cartes identiques, centrée, icône + titre + 2 lignes | La forme la plus reconnaissable du contenu généré | Grille éditoriale asymétrique, blocs de tailles inégales, alignement à gauche |
| Icônes génériques (Lucide/Heroicons) pour illustrer des concepts | Une icône « théâtre masque » ne dit rien | Photographie, chiffres, typographie. Zéro icône décorative. |
| Emoji dans les titres | | jamais |
| Inter / Poppins / Montserrat partout | Polices par défaut, zéro caractère | Un couple typographique choisi (§3.3) |
| Photos de banque d'images « équipe diverse qui rit » | | Uniquement les photos de l'école, de ses élèves, de ses spectacles |
| Copie marketing (« Libérez votre potentiel », « Une expérience unique ») | Personne ne parle comme ça | La voix qui existe déjà dans les textes de spectacles et les témoignages |
| Animations `fade-in-up` sur chaque bloc au scroll | Signature visuelle du template | Mouvement rare, motivé, une ou deux fois par page |
| Sections `py-24` toutes identiques | Le rythme plat trahit le générateur | Rythme vertical variable : une page se lit comme une partition |

**La règle de test** : si un bloc du nouveau site pourrait être collé tel quel sur le site d'un cabinet de conseil ou d'une startup SaaS, il est à refaire.

### 3.2 La direction proposée : *l'affiche et le plateau*

Le référentiel visuel n'est pas « site de formation », c'est **l'affiche de théâtre et le programme de salle**. Deux objets que le public cible connaît, qui ont une histoire graphique riche, et que personne n'utilise dans ce secteur en ligne.

Concrètement :

- **Le noir de la salle comme base.** Fond `#0B0B0C`, texte ivoire `#F4F1EA`. Les photos de plateau y sont chez elles ; sur fond blanc elles sont toujours mal.
- **L'orange du logo comme lumière**, pas comme aplat. `#ED8600` sur noir donne un contraste de 7,5:1 — largement conforme AA, alors que l'inverse actuel (blanc sur orange, 2,62:1) ne l'est pas. Le problème d'accessibilité et la direction artistique se résolvent d'un seul geste.
- **Une découpe de lumière** comme motif récurrent : un rectangle de clarté sur fond sombre, qui révèle une image, un chiffre, un nom. C'est la poursuite sur le plateau, et c'est un dispositif que le CSS fait très bien (`mask`, `clip-path`).
- **Le grain.** Une texture fine et constante sur les fonds — c'est ce qui, plus que tout, casse la platitude du « rendu template ».
- **La typographie comme affiche.** Titres très grands, cadrés, parfois coupés par le bord. Noms des spectacles en capitales serrées. C'est le langage du théâtre, pas du web générique.
- **Les crédits, toujours.** Photographe, metteur en scène, promotion, année, distribution. C'est un usage du spectacle vivant, et ça donne immédiatement l'air d'un vrai lieu.

### 3.3 Typographie

Deux familles, pas dix.

- **Titrage — `Fraunces`** (Google Fonts, variable, axes `SOFT` et `WONK`). Un serif contemporain avec du caractère, qui évoque l'affiche sans faire pastiche. Alternative si trop marqué : `Instrument Serif`.
- **Texte — `Switzer`** ou `General Sans` (Fontshare, gratuit). Grotesque neutre, excellent en petit corps, sans l'odeur d'Inter.
- **Interdits** : Sacramento et toute script manuscrite, Times New Roman, Arial, Montserrat, Poppins.

Échelle typographique fixe, ratio 1,25, définie en tokens. Longueur de ligne 60-75 caractères. **Texte aligné à gauche** — la centrage systématique actuel disparaît.

### 3.4 Palette (tokens)

```
--noir-salle      #0B0B0C   fond principal
--noir-plateau    #16161A   surfaces, cartes
--ivoire          #F4F1EA   texte sur fond sombre
--ivoire-attenue  #B8B4AC   texte secondaire  (9,5:1 sur noir-salle → AAA)
--orange-scene    #ED8600   accent, liens, CTA  (7,5:1 sur noir-salle → AAA)
--orange-chaud    #FFA733   survol
--rouge-rideau    #8C2318   accent rare, alertes éditoriales
--blanc-affiche   #FFFFFF   pages "documents" (mentions, CGV, financement)
```

Chaque paire texte/fond du système est validée ≥ 4,5:1 avant intégration. C'est un critère de recette, pas une intention.

### 3.5 Mouvement

- Une seule idée d'animation sur le site : **la lumière qui se fait**. Les éléments n'entrent pas par le bas, ils s'éclairent (opacité + léger `clip-path`).
- Durées 200-400 ms, `cubic-bezier(0.2, 0, 0, 1)`.
- `prefers-reduced-motion` respecté strictement.
- Aucune animation au scroll sur les pages de contenu long (formation, admission). On n'anime pas ce qui doit être lu.

---

## 4. Les pages qui font la différence

### Accueil

Séquence proposée :

1. **Plein écran, photo ou vidéo courte de plateau**, titre en grand, une phrase — pas cinq puces. Le CTA « Candidater pour 2027-2028 » est présent dès le premier écran, avec la date limite réelle.
2. **Trois chiffres, en très grand** : `1 500 h de pratique` · `20 élèves max` · `100 % d'insertion à 6 mois`. Rien d'autre. C'est l'argument le plus fort de l'école et il est aujourd'hui introuvable.
3. **Les six disciplines**, en grille asymétrique photographique, chacune vers sa page.
4. **Un parcours d'ancien élève**, en pleine largeur, avec photo et citation. Roulement entre les 7 disponibles.
5. **Le prochain rendez-vous** (audition, JPO, spectacle), tiré de l'agenda, qui disparaît de lui-même une fois passé.
6. **Qualiopi et financements**, traités comme un bloc de confiance lisible, pas comme un badge de 150 px.

### `/candidater`

- Les 5 étapes en **ligne de temps verticale**, avec pour chacune : ce que fait le candidat, ce que fait l'école, et le délai.
- Le formulaire de demande de dossier réduit à **prénom + e-mail + une question ouverte facultative**. L'âge et l'adresse se demandent plus tard, dans le dossier lui-même.
- Case de consentement explicite + lien vers la politique de confidentialité.
- **Page `/candidater/merci`** : c'est elle qui rend la conversion mesurable.
- Objectif à moyen terme : dossier en ligne + paiement des 50 € par carte, ce qui supprime le chèque, l'impression et la poste. À cadrer avec l'école (voir §7).

### `/spectacles/[annee]/[piece]`

Le gisement de contenu. Pour chaque spectacle : affiche, texte de présentation (déjà écrit), metteur en scène, promotion, distribution nommée, galerie, vidéo, dates, lieu. Schéma `Event` + `TheaterEvent`.

15 ans d'archives → 15 à 30 pages riches, uniques, avec des noms propres. Pour le SEO local et pour la crédibilité, rien n'est plus efficace.

### `/l-ecole/equipe/[nom]`

Les 12 pages existent déjà côté Wix mais ne sont liées de nulle part. Ici : portrait, parcours complet, écoles, spectacles marquants, matières enseignées, et les spectacles de l'école qu'iels ont mis en scène. Maillage croisé automatique avec les pages spectacles.

---

## 5. Stack technique recommandée

| Couche | Choix | Pourquoi |
|---|---|---|
| Framework | **Next.js 15 (App Router) + TypeScript** | rendu statique/ISR, excellent SEO, images optimisées nativement |
| Styles | **Tailwind CSS v4** avec tokens dans `@theme` | système de design réellement contraint, pas de dérive |
| Contenu | **Sanity** (ou Payload si tout doit rester auto-hébergé) | l'école met à jour ses dates elle-même — c'est le correctif du problème n°2 de l'audit |
| Médias | Sanity CDN ou Cloudinary, AVIF/WebP, `next/image` | |
| Formulaires | route API Next + **Resend** pour les mails + stockage Sanity/Supabase | traçable, RGPD-maîtrisé, anti-spam par honeypot + rate limit |
| Analytics | **Plausible** ou Matomo | sans cookie → bandeau de consentement allégé, conforme, et on arrête d'enregistrer les sessions sans le dire |
| Hébergement | **Vercel** | |
| Qualité | ESLint, Prettier, `@axe-core/playwright` en CI, Lighthouse CI | l'accessibilité est vérifiée automatiquement, pas à la main |

**Budget de performance, à tenir en CI :**

| | Actuel | Cible |
|---|---|---|
| JS transféré (accueil) | 6,75 Mo | **< 120 Ko** |
| Requêtes | 151 | **< 30** |
| LCP mobile | plusieurs secondes | **< 2,0 s** |
| Score Lighthouse a11y | non conforme | **100** |

Ces cibles sont atteignables sans effort héroïque : le site est éditorial, il n'a besoin de presque aucun JavaScript côté client.

---

## 6. Modèle de contenu (CMS)

Types à créer dans le CMS, pour que l'école soit autonome :

- `spectacle` — titre, année, promotion, metteur·se en scène, texte, distribution[], affiche, galerie[], vidéo, dates[], lieu, crédits photo
- `intervenant` — nom, fonction, formation[], matières[], bio, portrait, spectacles liés[]
- `discipline` — titre, années concernées, principe, méthode, objectif, visuel, intervenants liés[]
- `stage` — titre, intervenant, durée, **dates**, **horaires**, tarif, lieu, niveau, description, ouvert à
- `evenement` — type (audition / JPO / spectacle), titre, date début, date fin, lieu, description, CTA, **archivage auto après la date**
- `alumni` — nom, promotion, métier, parcours, citation, portrait
- `indicateur` — libellé, valeur, année, source (pour les chiffres Qualiopi)
- `page` — pages éditoriales libres (mentions, financement, accessibilité)

Règle produite par l'audit : **toute date affichée sur le site vient du CMS.** Aucune date en dur dans le code. C'est la seule façon d'éviter qu'une JPO de mars soit encore annoncée en septembre.

---

## 7. À obtenir de l'école avant de coder

Liste à envoyer telle quelle :

**Indispensable**
- [ ] Logo vectoriel (SVG/AI) + attestation Qualiopi en PDF
- [ ] Charte graphique si elle existe, sinon accord sur la direction du §3
- [ ] Photos de spectacles en **haute définition** (les versions du site actuel sont compressées) + **noms des photographes** pour les crédits
- [ ] Portraits des 12 intervenants en HD
- [ ] Dates 2026-2027 : auditions, JPO, stages (escrime / marionnettes / commedia), restitution atelier ados
- [ ] Plaquette 2026-2027 (celle en ligne est 2025-2026)
- [ ] Tarifs à jour et confirmés
- [ ] Accès au domaine (DNS) et aux comptes analytics

**Important**
- [ ] Textes de programme des spectacles non encore publiés
- [ ] Distributions (noms des élèves) par spectacle — avec leur accord de publication
- [ ] Autorisations de droit à l'image, notamment pour les mineurs de l'atelier ados
- [ ] Coordonnées de l'hébergeur actuel (pour les mentions légales)
- [ ] Contact du partenaire Plein Cadre Formation (pour cadrer la page stages cinéma)

**Décisions à trancher avec eux**
- [ ] Accepte-t-on le **paiement en ligne des 50 € d'audition** ? (supprime le chèque et la poste)
- [ ] Le dossier de candidature peut-il devenir un **formulaire en ligne avec dépôt de fichiers** ?
- [ ] Qui, à l'école, tiendra le CMS à jour ? (Léonie Marquet, assistante communication, semble la personne)
- [ ] Le partenariat Plein Cadre Formation reste-t-il sur le site, et sous quelle forme ?

---

## 8. Déroulé

| Phase | Contenu | Livrable |
|---|---|---|
| **0 — Cadrage** | validation de l'arborescence §2 et de la direction §3, collecte §7 | ce document validé |
| **1 — Design system** | tokens, typographie, grille, composants, 3 maquettes clés (accueil, formation, spectacle) | maquettes + système |
| **2 — Socle** | Next.js + Tailwind + CMS, schémas de contenu, déploiement continu | site vide mais gréé |
| **3 — Pages piliers** | accueil, formation + 6 disciplines, candidater + tunnel, l'école | parcours de conversion complet |
| **4 — Contenu profond** | spectacles, intervenants, alumni, stages, agenda, atelier ados | reprise des 15 ans d'archives |
| **5 — Conformité** | RGPD (mentions, confidentialité, consentement), RGAA AA, schémas structurés | audit a11y vert en CI |
| **6 — Bascule** | redirections 301 depuis les 26 anciennes URL, sitemap, Search Console, recette mobile | mise en ligne |

**Priorité si le temps manque** : phases 3 et 5 avant la phase 4. Un site avec 10 pages excellentes et un tunnel qui fonctionne bat un site avec 40 pages et un formulaire cassé.

---

## 9. Ce qu'on garde du site actuel

À ne pas jeter avec le reste :

- **Le logo** — lion orange, ancrage lyonnais, mémorisable
- **L'orange `#ED8600`** — distinctif, à réutiliser mais inversé (sur noir, pas en aplat sous du blanc)
- **Les portraits noir & blanc** des intervenants — bonne intuition, à reprendre avec un cadrage homogène
- **La triade Principe / Méthode / Objectif** — excellente structure pédagogique, à mettre en valeur au lieu de l'aplatir
- **Les textes de spectacles** — la meilleure écriture du site, signée par les metteurs en scène et les élèves
- **Les témoignages d'alumni** — précis, nommés, datés, crédibles
- **Le champ « Comment avez-vous connu l'ETL ? »** du formulaire JPO — à généraliser à tous les formulaires, c'est une donnée d'acquisition gratuite
- **La devise « passion et exigence »** — courte, vraie, utilisable comme fil rouge éditorial
