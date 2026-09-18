# Audit — ecoledetheatredelyon.com

Relevé effectué le **18/09/2026** sur le site en production.
Périmètre : architecture, contenu, médias, technique, performance, accessibilité, SEO, tunnel de conversion, conformité.

---

## 1. Fiche d'identité

| | |
|---|---|
| **Entité** | École de Théâtre de Lyon® — SARL au capital de 8 000 € |
| **SIRET** | 448 230 367 00014 — NAF 8552Z (enseignement culturel) |
| **N° déclaration d'activité** | 84 69 25684 69 |
| **Gérant** | Jean-Marc Andrieu — **Administratrice** : Édith Hennaut — **Com.** : Léonie Marquet |
| **Adresse admin.** | 1 place Chardonnet, 69001 Lyon |
| **Locaux de cours** | 53 rue des Tables Claudiennes, 69001 Lyon (pentes de la Croix-Rousse) |
| **Tél / mail** | 04 81 65 15 56 — contact@ecoledetheatredelyon.com |
| **Certification** | **Qualiopi** (actions de formation) |
| **Théâtre partenaire** | Le Nombril du Monde (1 place Chardonnet — même adresse que l'administration) |
| **Réseaux** | YouTube, Facebook, Instagram, LinkedIn |
| **Stack actuelle** | **Wix** (moteur Thunderbolt) + Sentry + Microsoft Clarity, CDN Cloudflare/Fastly |
| **Copyright pied de page** | « © 2018 » — non mis à jour depuis 8 ans |

### Offre commerciale (prix relevés sur le site)

| Produit | Prix | Cible |
|---|---|---|
| Cursus comédien 1re année | 4 300 € /an | 18 ans+ (17 avec accord parental), niveau Bac |
| Cursus 2e année | 4 500 € /an | |
| Cursus 3e année | 4 700 € /an | |
| Frais d'audition | 50 € (non remboursables) | |
| Frais d'inscription | 100 € | après admission |
| Atelier ados (mercredi 18h30-20h) | 440 € /an | 13-17 ans |
| Stages (escrime, marionnettes, commedia) | 300 € (15 à 30 h) | comédiens externes, tous niveaux |
| Stages cinéma « Plein Cadre Formation » | non affiché | finançables AFDAS / France Travail |

**Panier moyen ≈ 13 500 € sur 3 ans.** C'est un achat à forte implication, avec un cycle de décision long (découverte → JPO → audition → inscription). Le site actuel ne traite ce parcours nulle part comme un tunnel.

---

## 2. Architecture & navigation

### Arborescence réelle (26 URLs au sitemap)

```
/                          Accueil
/formation                 LA FORMATION ────┐
/intervenants              Les intervenants │ menu déroulant
/stages                    Les stages       │ "LA FORMATION"
/stages-cinéma             Les stages cinéma┘
/admission                 ADMISSION
/evenements-a-venir        À venir        ──┐ menu déroulant
/jpo                       Portes ouvertes  │ "AGENDA"
/spectacles-passes         Spectacles passés┘
/images                    IMAGES
/videos                    VIDÉOS
/anciens-eleves            ALUMNI
/atelier-ados              ATELIER ADOS
/contact                   CONTACT
/mentions-legales          (pied de page)
/enquetes-satisfaction     (pied de page)

+ 12 fiches intervenants absentes du menu :
  /thierry-buenafuente /louise-buenafuente /maxime-cella /elisabeth-herbepin
  /ivan-herisson /laurie-iversen /sebastien-jacquemin /maude-lallier
  /karin-martin-prevel /florence-leguy /clement-peretjatko
```

### Problèmes d'architecture

1. **Le menu mélange trois logiques** : l'offre (Formation, Stages, Atelier ados), la preuve (Images, Vidéos, Alumni) et l'actualité (Agenda). L'utilisateur ne sait pas où chercher.
2. **`ATELIER ADOS` est au même niveau que `LA FORMATION`** alors que ce sont deux publics radicalement différents (ado de 13-17 ans / adulte post-bac ou en reconversion). Aucun tri par persona.
3. **`IMAGES` et `VIDÉOS` sont deux entrées séparées**, et `/images` contient déjà l'intégralité de `/videos` — duplication pure.
4. **`ADMISSION` est en 3e position du menu** mais c'est la seule page qui convertit. Elle devrait être une action permanente, pas un onglet parmi d'autres.
5. **`/stages-cinéma` contient une URL accentuée** → encodée `/stages-cin%C3%A9ma` dans tous les partages, mails et statistiques. À proscrire.
6. **`/enquetes-satisfaction` est enterré en pied de page** alors qu'il contient les chiffres les plus vendeurs du site (100 % de satisfaction, 100 % d'insertion à 6 mois).
7. **Aucune page par spectacle, par discipline ou par intervenant dans le maillage** — 12 fiches intervenants existent mais ne sont liées depuis nulle part.
8. **Pas de fil d'Ariane, pas de recherche, pas de page 404 personnalisée** (le 404 renvoie bien un code 404, au moins).

---

## 3. Contenu — page par page

### `/` Accueil

Contient **1 879 caractères de texte visible**. Structure : titre + devise (« passion et exigence ») → 5 puces d'arguments → 5 puces de bénéfices → CTA → un paragraphe de présentation du cursus → CTA « Je candidate » → carrousel « Les Promos 2025/2026 » → vidéo de spectacle → pied de page.

- **Le contenu est un empilement de listes à puces**, pas un récit. Aucune hiérarchie de lecture : tout est au même niveau typographique.
- Les puces mélangent des arguments d'**institution** (« Formation certifiée Qualiopi ») et des arguments **émotionnels** (« encadrement bienveillant ») sans les distinguer.
- Les flèches `>` en début de ligne sont des caractères tapés à la main, pas des puces stylées.
- **« Les Promos 2025/2026 »** alors qu'on est en septembre 2026 : il faudrait 2026/2027.
- Mention « **Actualisé le 06.08.26** » en haut de page, en gris clair 12 px : signal d'artisanat, pas de professionnalisme. Ce type d'horodatage apparaît sur 6 pages.
- Aucun chiffre marquant en page d'accueil (ni le 100 % d'insertion, ni les 20 élèves max, ni les 1 500 h).
- Aucun visage, aucun témoignage, aucun nom d'ancien élève au-dessus de la ligne de flottaison.

### `/formation` — la page la plus riche du site (7 100 caractères)

C'est le vrai cœur éditorial, et il est sous-exploité. On y trouve :

- Cursus 3 ans, septembre → juin
- **14 à 18 h de cours/semaine, ≈ 1 500 h au total, 95 % de pratique, 20 élèves max par promotion**
- Méthodes : Stanislavski, Grotowski, travail au partenaire, création de la mise en scène par le plateau
- 6 disciplines détaillées (Jeu/interprétation, Jeu face caméra, Voix & corps, Dire le vers, Chant, Danse), chacune avec la triade **Le principe / La méthode / L'objectif**
- Modules : biomécanique, clown, escrime et combat de scène, marionnettes + cours théoriques (administration, communication)
- Répertoire travaillé : Aristophane → Kane, Novarina, Koltès, Levin…
- Stage obligatoire en milieu professionnel chaque année
- Suivi individuel, bilan semestriel
- Une politique handicap complète avec référente nommée (Edith Hennaut)

**Le problème n'est pas le contenu, c'est sa mise en scène.** Tout est aplati sur une page très longue ; la triade Principe/Méthode/Objectif — qui est une excellente structure — est rendue en trois blocs de texte gris indifférenciés. La progression 1re → 2e → 3e année n'est jamais montrée comme une progression.

Le lien plaquette pointe encore vers la **« plaquette de présentation 2025-2026 »** alors que la page vend l'année 2026-2027.

### `/admission` — la page qui doit convertir

Bon contenu de fond : prérequis clairs, **processus en 5 étapes numérotées**, déroulé de l'audition (scène de 5 min du répertoire + une chanson + un entretien), conditions financières transparentes.

Mais :

- Les 5 étapes sont **des chiffres 01-05 posés à plat**, sans ligne de temps, sans progression visuelle.
- L'étape 02 demande d'envoyer **par mail ou courrier postal** : formulaire signé + CV + lettre de motivation + copie de pièce d'identité + **un chèque de 50 €**. Zéro dématérialisation, zéro paiement en ligne.
- Le CTA « Demander ici mon dossier de candidature » ouvre une **lightbox Wix sans URL** (voir §7).
- Contradiction avec `/evenements-a-venir` : ici « Candidatures ouvertes, auditions à réception des demandes » ; là-bas des dates fixes « 9, 10, 11 et 14, 15, 16 septembre 2026 » — déjà passées.

### `/intervenants`

12 intervenants + 2 administratives. Chaque fiche : nom, statut, école de formation, matières enseignées. Photos noir & blanc en cercle, cohérentes, plutôt réussies — **c'est la page la mieux traitée visuellement du site**.

Mais : biographies réduites à 3 lignes, aucune référence de spectacle, aucun lien vers les 12 pages individuelles qui existent pourtant. Un enseignant formé au TNS, une vice-championne de France d'escrime, un diplômé de l'ESNAM, un danseur du Broadway Dance Center — c'est de l'autorité pure, laissée sous forme de vignette.

### `/stages` — contenu périmé bloquant

Trois stages détaillés (Escrime & combat de scène 30 h, Marionnettes 20 h, Commedia dell'Arte 15 h) avec intervenants, contenus, tarif 300 €, lieu. Mais **les trois affichent « Dates : (dates 26-27 publiées prochainement) » et un champ « Horaires : » vide**. Une page produit sans date ni horaire ne vend rien.

Incohérence supplémentaire : le texte cite « Dirigé par Christophe Herrada » alors que les légendes photo disent « Stage Commedia dell'arte | Boris Olivier ».

### `/stages-cinéma`

Page d'un **partenaire externe, « Plein Cadre Formation »**, rédigée dans un tout autre ton (écriture inclusive systématique, vocabulaire marketing) que le reste du site. Rupture de voix éditoriale nette. Prochaine session annoncée : 16-20 novembre 2026, « L'acteur·ice dirigé·e par 5 directeur·ices de casting ». Aucun tarif affiché.

### `/evenements-a-venir` — la page la plus problématique

9 700 caractères. Titre « EN CE MOMENT & PROCHAINEMENT » suivi de… **auditions déjà passées** (16 sept. 2026), puis d'un bloc « ÉVÉNEMENTS PASSÉS » séparé par une ligne de tirets tapée au clavier. On y trouve des annonces de spectacles de juin 2026 (Nombril's Cabaret, Aux premières lueurs de l'aube), et plus bas un encart **« CANDIDATURES — C'EST EN CE MOMENT ! Année 2024-2025 »**, soit deux années scolaires de retard, toujours présenté comme actuel.

Pourtant les textes de présentation des spectacles sont **excellents** — de vrais textes de programme, écrits par les metteurs en scène et les élèves (« Je ne veux pas seulement raconter une histoire : je veux provoquer un débat » — Tinéa Pasquier, 3e année). C'est la meilleure matière éditoriale du site, noyée dans une page fourre-tout.

### `/jpo`

**Journée portes ouvertes « Samedi 13 mars 2026 »** — passée depuis 6 mois, toujours en ligne comme un événement à venir, avec son formulaire d'inscription actif.

Le formulaire est bien construit (créneau horaire, situation scolaire, tranche d'âge, pratique du théâtre, accompagnants, **source d'acquisition** : internet / salon étudiant / bouche-à-oreille / réseaux / établissement / spectacle d'élèves). Ces données d'acquisition sont précieuses et ne sont manifestement exploitées nulle part ailleurs.

### `/spectacles-passes`

Une liste d'années (2011 → 2026) et un seul spectacle réellement décrit. **2,59 Mo de HTML pour 256 caractères de texte.** 15 ans d'archives théâtrales réduits à une liste morte.

### `/images` et `/videos`

`/images` : galeries par spectacle (Medéa 2026, Cabaret 2026, Œdipe Roi 2024, Songe(s) 2023, Gênes 2023, Nasty Sparkles 2022, Andromaque 2022, Huit jours à la campagne 2022, Amour moires et cruauté 2020, Round dance 2019, Exposition(s) 2018, Cabaret 2017, Molière 2016, Carabet 2014) + « 10 ANS de l'ETL ». **4,08 Mo de HTML.** `/videos` est intégralement dupliqué à l'intérieur de `/images`.

Coquilles relevées : « Medéa » (`/images`) vs « MEDEA » (`/evenements-a-venir`) ; « Carabet 2014 » pour Cabaret ; « Teminale » dans le formulaire JPO.

### `/anciens-eleves` — le meilleur argument de vente du site

7 témoignages d'anciens, nommés, datés par promotion, avec parcours réel et citation :

- **Clara Last (2023)** — admise à l'ENSATT *et* à l'École Nationale de Théâtre du Canada, qu'elle a intégrée
- **Laurianne Di Ruzza (2020)** — cofondatrice de compagnie, aujourd'hui **directrice artistique du Nombril du Monde**, et intervenante de l'atelier ados de l'école
- **Gabrielle Chabot (2018)** — TV : Clem, Love in Progress, INSU
- **Marie Foldyna (2019)** — intermittente, joue Pascal Rambert
- **Perle Dimanche (2022)**, **Léa Freymann (2025)**, **Coraline Berthet (2018)**

Ces parcours sont la preuve que l'école fonctionne. Ils sont dans un onglet « ALUMNI » que personne n'ouvre avant d'avoir déjà décidé. Aucun de ces noms n'apparaît en page d'accueil.

### `/enquetes-satisfaction`

**100 % de satisfaction sur le contenu global, 96 % sur la qualité de l'enseignement, 100 % d'insertion professionnelle à 6 mois, 75 % encore dans le milieu à 1 an** (promotion 2022-2025). Plus une citation : *« J'ai plus appris ici en 10 mois qu'en deux ans dans une école dite renommée. »*

Ce sont des indicateurs Qualiopi obligatoires, mais ce sont surtout **les meilleurs arguments commerciaux disponibles**, et ils sont dans un lien de pied de page en petites capitales.

### `/atelier-ados`

Cours d'essai 30 septembre 2026, mercredis 18h30-20h, octobre → juin, 440 €, intervenante Laurianne Di Ruzza (ancienne élève — lien jamais fait sur la page). Restitution en juin « date communiquée ultérieurement ». Page correcte mais orpheline : elle ne parle pas aux parents, qui sont pourtant les acheteurs.

### `/contact`

Coordonnées + formulaire + accès (métro A/C, bus S6/S12, Vélo'v station 1022, 3 parkings). **Incohérence interne sur la ligne de métro** : le pied de page de tout le site dit « Métro B : Croix-Pâquet », la page contact dit « Ligne C, arrêt Croix-Paquet ». Croix-Paquet est bien sur la ligne C : c'est le pied de page, répété sur les 16 pages, qui est faux.

### `/mentions-legales`

Voir §9 — non conformes RGPD.

---

## 4. Images & médias

- **Toutes les images passent par le CDN Wix** (`static.wixstatic.com`), servies en AVIF avec redimensionnement dynamique. Techniquement, c'est le point le plus propre du site.
- **Les textes alternatifs sont des noms de fichiers** : `École_de_Théâtre_de_Lyon-Jeu_interprétation.png`, `École_de_Théâtre_de_Lyon-Dire_le_vers.png`. Inutilisables pour un lecteur d'écran, inutiles pour le SEO image.
- **7 images sur 15 en page d'accueil n'ont aucun alt.**
- Les icônes de réseaux sociaux ont des alt en trois langues mélangées : « Gris Icône YouTube », « Grey Facebook Icon », « Gris LinkedIn Icône », et Instagram sans alt du tout.
- **Le fond de page d'accueil est un dégradé violet → orange** appliqué par-dessus une photo de spectacle floutée. Le texte blanc passe dessus sans voile de protection : la lisibilité dépend de la zone de l'image.
- Les vignettes de disciplines (`/formation`) sont des **PNG recadrés à la volée** (`crop/x_0,y_48,w_595,h_746`), pas des visuels conçus.
- Le logo — **un lion/griffon orange dans un carré**, référence au lion de Lyon — est un vrai actif graphique. Il est utilisé petit, en pied de page, et jamais comme signature visuelle.
- **Le badge Qualiopi est présent sur chaque page mais en 150 px de large, illisible.** C'est pourtant l'élément qui débloque le financement (CPF, France Travail, AFDAS) et la crédibilité institutionnelle.
- Photos de spectacles : beaucoup de matière disponible (15 spectacles archivés), de qualité inégale mais avec de vrais moments. Aucune direction photo, aucun traitement homogène, aucun crédit photo systématique (un seul « Crédit photo : Charlotte Magne© », sur `/stages`).

---

## 5. Technique & performance

Mesures faites sur la page d'accueil, navigateur desktop, cache chaud :

| Indicateur | Valeur mesurée | Commentaire |
|---|---|---|
| **Requêtes réseau** | **151** | pour une page de 1 879 caractères de texte |
| **Poids total décompressé** | **7,14 Mo** | |
| **dont JavaScript** | **6,75 Mo** | soit **95 % du poids de la page** |
| dont images | 260 Ko | le seul poste raisonnable |
| HTML du document | 196 Ko compressé / **1,22 Mo brut** | |
| Nœuds DOM | 733 | |
| Domaines tiers contactés | **9** | parastorage, wixstatic, siteassets, frog.wix, panorama.wixapps, sentry-cdn, clarity.ms ×2 |
| HTML de `/images` | **4,08 Mo** | |
| HTML de `/spectacles-passes` | **2,59 Mo** | |

**Le ratio est de ~3 600 octets de JavaScript par caractère de texte affiché.** C'est la signature d'un site Wix : le moteur Thunderbolt charge son runtime complet, plus un bundle par composant (`SlideShowContainer`, `ProGallery`, `FormViewer`, `MediaPlayer`, `ProfileCard`…), plus **Sentry** (monitoring d'erreurs Wix) et **Microsoft Clarity** (enregistrement de sessions).

Conséquences concrètes :

- Sur mobile 4G, la page met plusieurs secondes à devenir interactive. Le public cible (17-25 ans) est majoritairement mobile.
- Les Core Web Vitals sont structurellement mauvais et **non corrigeables** sans quitter Wix : on ne peut pas retirer le runtime.
- Microsoft Clarity enregistre les sessions utilisateurs — à déclarer dans la politique de confidentialité, ce qui n'est pas fait.

Points techniques corrects, à conserver dans la refonte : HTTPS + HSTS, `x-content-type-options: nosniff`, `content-language: fr-FR`, `lang="fr"`, images AVIF, 404 renvoyant bien un code 404, robots.txt et sitemap.xml valides.

---

## 6. Accessibilité (RGAA / WCAG 2.1 AA)

| Constat | Mesure | Gravité |
|---|---|---|
| **4 balises `<h1>` sur la page d'accueil** | h1 « École de Théâtre de Lyon », mais aussi h1 « MENTIONS LÉGALES », h1 « ENQUÊTE DE SATISFACTION », h1 « CONTACT » — les titres du **pied de page** sont des h1 | bloquant |
| **Hiérarchie de titres cassée** | séquence h1 → h2 → **h4** → h1 → h1 → h1 | bloquant |
| **Contraste des CTA principaux** | blanc sur orange `#ED8600` = **2,62:1** (minimum AA : 4,5:1) — concerne « Je candidate », « Je découvre la formation », « En savoir plus sur le programme » | bloquant |
| Contraste texte secondaire | gris `#858585` sur blanc = **3,69:1** | majeur |
| CTA « Demander ici mon dossier » | texte très clair sur fond beige, contraste insuffisant, et **rien n'indique visuellement que c'est un bouton** | majeur |
| **Images sans alternative** | 7/15 en page d'accueil ; les autres ont des noms de fichiers en guise d'alt | majeur |
| **Liens sans intitulé accessible** | 4 en page d'accueil | majeur |
| **10 familles de polices sur une seule page** | Times New Roman, Arial, Helvetica, Avenir Light, Avenir Heavy, Futura LT Light, HelveticaNeue 45 Light, Sacramento + 2 polices custom | majeur |
| Champs de formulaire | étiquetés par `aria-label` et placeholders uniquement, pas de `<label>` visible persistant | majeur |
| Carrousels (« Les Promos », galeries stages) | défilement automatique, pas de commande pause accessible | moyen |

Pour un établissement de formation **certifié Qualiopi**, dont le site affiche une politique handicap explicite avec référente nommée, l'écart entre le discours (« permettre à tous nos stagiaires d'accéder à toutes nos formations ») et l'accessibilité réelle du site est un vrai risque — de réputation comme d'audit.

---

## 7. Tunnel de conversion — le point le plus critique

Le site a **un seul objectif commercial** : faire candidater. Voici ce qui se passe réellement.

### Le CTA principal n'est pas une page

« Demander ici mon dossier de candidature » (présent 2 fois sur `/admission`, 1 fois sur l'accueil) est un `<button>` **sans attribut `href`**, qui ouvre une lightbox Wix en JavaScript.

Conséquences :

- **Aucune URL** → impossible à partager, à mettre dans un mail, dans une bio Instagram, dans une campagne Google Ads, sur un flyer via QR code.
- **Invisible pour Google** → zéro trafic organique sur la seule page qui convertit.
- **Aucun suivi de conversion propre** (pas de page de confirmation, pas d'événement d'URL).
- Ne fonctionne pas sans JavaScript.

### Le formulaire de candidature lui-même

5 champs obligatoires : `NOM / Prénom *`, `Âge *`, `Adresse E-mail *`, `Téléphone *`, **`Adresse domicile *`** + un champ Message libre.

- **Bug technique confirmé : le champ « Adresse domicile » est déclaré `type="tel"`.** Sur mobile, il ouvre un clavier numérique. On demande une adresse postale avec un pavé de chiffres.
- **Demander l'adresse postale complète pour simplement recevoir un document** est un frein majeur. Un prénom et un e-mail suffisent à cette étape.
- L'instruction dit : *« merci de remplir le champ ci-dessous en précisant "Admission École" »* — on demande au candidat de **taper une formule magique dans un champ libre** pour que sa demande soit correctement traitée.
- **Aucune case de consentement RGPD, aucun lien vers une politique de confidentialité**, alors qu'on collecte nom, âge, téléphone et adresse postale — y compris potentiellement de **mineurs de 17 ans**.
- Aucune indication de délai de réponse.

### Le parcours complet, tel qu'il est aujourd'hui

```
Découverte  →  formulaire lightbox (5 champs obligatoires, sans URL)
            →  attente d'un mail humain avec le dossier
            →  impression du dossier
            →  CV + lettre de motivation + copie pièce d'identité
            →  chèque papier de 50 €
            →  envoi postal ou mail
            →  attente de convocation
            →  audition
```

**Au moins 4 ruptures de canal (web → mail → papier → poste) et 2 attentes humaines non bornées.** Chaque rupture est un point de fuite. Pour un produit à 4 300 € l'année, il n'existe aujourd'hui aucune mesure de ce qui se perd à chaque étape.

### Le second formulaire (contact)

8 champs, dont **6 obligatoires : Nom, Prénom, Âge, Email, Téléphone, Adresse**. Pour poser une question. Demander l'âge et l'adresse postale avant de répondre à « quand sont les prochaines auditions ? » est disproportionné — et au sens du RGPD, non minimisé.

---

## 8. SEO

### Ce qui fonctionne

- Balises title et meta description renseignées sur toutes les pages
- Open Graph complet, `lang="fr"`, `content-language: fr-FR`
- Données structurées présentes : `LocalBusiness` + `WebSite`
- Sitemap et robots.txt propres, HTTPS, 404 correct

### Ce qui ne fonctionne pas

| Problème | Détail |
|---|---|
| **Descriptions périmées** | `/evenements-a-venir` : *« Les événements à venir de l'année **2023/2024** »* — `/enquetes-satisfaction` : *« …promotions **2022/23** »* alors que la page affiche 2025-2026 |
| **Descriptions dupliquées** | `/stages` et `/stages-cinéma` ont **exactement le même title et la même description** — deux pages en concurrence sur les mêmes mots-clés |
| **Description cassée** | `/jpo` : *« Vous pourrez : - Visiter les lieux. »* — un fragment de liste collé dans la meta |
| **Marque mal écrite** | toutes les balises title se terminent par `\| ÉcoledeThéâtredeLyon` (sans espaces) |
| **Schéma insuffisant** | seul `LocalBusiness` est déclaré. Il manque `EducationalOrganization`, `Course` (cursus, stages, atelier ados), `Event` (JPO, auditions, spectacles), `FAQPage`, `Review` — ce sont précisément les schémas qui déclenchent des résultats enrichis pour une école |
| **URL accentuée** | `/stages-cinéma` → `/stages-cin%C3%A9ma` |
| **Surface de contenu minuscule** | ~45 000 caractères sur tout le site. Pas de blog, pas de page par discipline, pas de page par spectacle, pas de FAQ, aucune page ciblant les requêtes de financement (CPF, AFDAS, France Travail) |
| **Poids des pages** | `/images` à 4 Mo de HTML dégrade le budget de crawl |
| **Pages orphelines** | 12 fiches intervenants indexées mais non maillées depuis le menu |

**Le mot-clé « cours de théâtre Lyon » et ses variantes sont travaillés uniquement par la page d'accueil.** Toute la longue traîne (« école de théâtre Lyon prix », « formation comédien Lyon Qualiopi », « audition école théâtre Lyon 2027 », « stage escrime scène Lyon », « cours théâtre ado Lyon Croix-Rousse ») est inexploitée.

---

## 9. Conformité & RGPD

Les mentions légales citent **« la loi Informatique et Libertés du 6 janvier 1978 modifiée en 2004 »**. Le RGPD, applicable depuis mai 2018, n'est jamais mentionné. Il manque :

- l'identité et les coordonnées de l'**hébergeur** (obligation LCEN, art. 6-III)
- la **base légale** de chaque traitement
- la **durée de conservation** des données
- les droits complets (portabilité, limitation, opposition, **réclamation auprès de la CNIL**)
- le traitement particulier des **données de mineurs** (l'école accepte des candidats de 17 ans et anime un atelier 13-17 ans)
- la déclaration de **Microsoft Clarity**, qui enregistre les sessions de navigation
- une politique de confidentialité **distincte** des mentions légales
- une case de **consentement explicite** sur les trois formulaires du site

La partie « Utilisation des cookies » renvoie encore vers des pages d'aide **Internet Explorer**, navigateur abandonné depuis 2022, et le lien est tronqué (`…delete-manage-cooki…`).

Point d'attention réglementaire spécifique : un organisme **Qualiopi** doit publier ses indicateurs de résultats. Ils existent (`/enquetes-satisfaction`) mais sont difficiles d'accès et partiellement datés. La refonte doit les traiter comme une page de premier niveau.

---

## 10. Identité visuelle actuelle

**Palette relevée :** orange `#ED8600` (couleur du logo), violet/magenta en dégradé, beige-pêche `#F3BE79`, gris `#858585`, blanc, noir des photos d'intervenants.

**Ce qui marche :**

- Le logo lion/griffon orange — fort, mémorisable, ancré à Lyon
- Les portraits d'intervenants en noir et blanc, cadrage cercle, cohérents
- L'orange comme couleur d'accent : c'est distinctif dans un secteur où tout le monde fait du noir et rouge

**Ce qui ne marche pas :**

- **10 polices sur une page.** Sacramento (une script manuscrite) côtoie Futura, Avenir, Times New Roman et Arial.
- **Le dégradé violet → orange** sur photo floutée : c'est l'élément le plus daté du site. Il évoque un gabarit générique, pas une école de théâtre.
- **Aucun rythme vertical** : les sections sont des bandes de couleur empilées, sans respiration ni ancrage sur une grille.
- **Le texte est presque toujours centré**, y compris les paragraphes longs — la pire configuration pour la lisibilité.
- **Aucun système** : chaque page a ses propres tailles, ses propres marges, ses propres couleurs de fond. Il n'y a pas de composants, il y a des blocs dessinés à la main dans un éditeur.
- **Le théâtre n'est nulle part dans la forme.** Rien du noir de la salle, de la lumière découpée, du grain, de l'affiche, du rideau, du plateau. Le fond est le sujet, alors que le sujet devrait être les corps sur scène.

---

## 11. Synthèse — les 10 points à corriger, par priorité

| # | Problème | Impact | Effort |
|---|---|---|---|
| 1 | **Le CTA de candidature n'a pas d'URL** (lightbox JS) : invisible pour Google, non partageable, non traçable | Conversion | Faible |
| 2 | **Contenu périmé partout** : JPO de mars 2026, auditions passées, « Candidatures 2024-2025 », promos 2025/2026, stages sans dates, plaquette 2025-2026 | Crédibilité | Faible (CMS) |
| 3 | **Tunnel de candidature 100 % manuel** : 4 ruptures de canal, chèque papier, aucune mesure | Conversion | Moyen |
| 4 | **7,14 Mo / 151 requêtes / 95 % de JS** — non corrigeable sur Wix | SEO + mobile | Refonte |
| 5 | **Preuves sociales enterrées** : 100 % d'insertion, 7 parcours d'alumni, Qualiopi — invisibles en page d'accueil | Conversion | Faible |
| 6 | **Contrastes sous le seuil AA sur les boutons principaux** (2,62:1) + 4 `<h1>` + alt manquants | Accessibilité / Qualiopi | Faible |
| 7 | **RGPD non conforme** : pas de consentement, pas de politique de confidentialité, textes pré-2018, collecte de données de mineurs | Juridique | Faible |
| 8 | **Architecture qui ne sépare pas les publics** (futur comédien pro / parent d'ado / comédien en formation continue) | Conversion | Moyen |
| 9 | **Surface SEO minuscule** : pas de page par discipline, par spectacle, par financement ; métadonnées dupliquées et périmées | Acquisition | Moyen |
| 10 | **Aucun système de design** : 10 polices, textes centrés, dégradé daté, zéro cohérence inter-pages | Image de marque | Refonte |

### Le constat qui résume tout

L'École de Théâtre de Lyon dispose de **tout ce qu'il faut pour un site remarquable** : une pédagogie détaillée et structurée, 12 intervenants au pedigree solide, 15 ans d'archives de spectacles, des textes de programme écrits par les metteurs en scène, 7 parcours d'anciens élèves documentés, 100 % d'insertion professionnelle, une certification Qualiopi et un logo fort.

**Rien de tout cela n'est mis en scène.** Le site est un classeur : le contenu y est rangé, pas raconté. Pour une école qui enseigne la mise en scène, c'est le paradoxe à résoudre.
