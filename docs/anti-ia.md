# Ne pas ressembler à un site fait par une IA

Notes de recherche et règles de travail. Ce document sert de garde-fou : il est
relu avant d'ajouter un bloc au site.

Sources consultées : [925 Studios — AI Slop Fonts and Gradients](https://www.925studios.co/blog/ai-slop-design-tells),
[Shuffle — Why do most AI-generated websites look the same](https://shuffle.dev/blog/2026/01/why-do-most-ai-generated-websites-look-the-same/),
[Slopless](https://slopless.design/), [DvA — The Beauty of Imperfection in Web Design](https://dva.dev/en/the-beauty-of-imperfection-in-web-design/),
[FiveUp — Asymmetrical Layouts and Overlapping Elements](https://fiveuptech.com/blog/asymmetrical-layouts-and-overlapping-elements-in-web-design/),
[HubSpot — Broken Grid Layouts](https://blog.hubspot.com/website/broken-grid-layouts).
Références regardées : ENSATT, Théâtre Nanterre-Amandiers, Comédie de Genève.

---

## 1. Le mécanisme

Un modèle ne dessine pas : il prédit. Et la prédiction la plus probable, c'est
**la moyenne de son corpus**. D'où le dégradé indigo (la couleur par défaut de
Tailwind depuis 2019, surreprésentée dans les données), Inter, les trois cartes
arrondies en ligne, le hero qui pourrait appartenir à dix mille autres produits.

Conséquence pratique : **tout ce qui est statistiquement normal est suspect.**
Un site qui ne ressemble pas à une IA est un site où quelqu'un a tranché
quelque chose que la moyenne n'aurait pas tranché.

Corollaire désagréable : **suivre la tendance 2026 ne protège de rien.**
« Editorial brutalism » — énorme typographie serif, photo pleine page, scroll
cinématique — est précisément ce que tout le monde fait cette année. C'est
devenu une moyenne, donc un tell.

## 2. Les signaux, et où nous en étions

| Signal repéré dans la littérature | Notre site avant cette passe |
|---|---|
| Dégradé indigo/violet | ✅ évité |
| Inter / Poppins / Montserrat | ✅ évité (Fraunces + Archivo) |
| Icônes filaires interchangeables | ✅ évité (aucune icône décorative) |
| Photos de banque | ✅ évité (uniquement les photos de l'école) |
| **Trois cartes en ligne** | ❌ **trois chiffres en ligne, puis six cartes, puis quatre indicateurs** |
| **Hero photo + gros titre + deux boutons** | ❌ **exactement ça** |
| **Rythme de sections uniforme** | ❌ **surtitre, h2, chapo, contenu — à l'identique, six fois** |
| **Tout aligné sur la grille** | ❌ **aucun débord, aucun chevauchement** |
| **Espacement parfaitement régulier** | ❌ **même `py` partout** |
| **Aucune trace de main humaine** | ❌ **aucune** |
| Copie type « slogan d'agence » | ⚠️ soignée, mais encore lisse |

Le constat : nous avions évité les tells **de surface** (couleurs, polices) et
gardé intacts les tells **de structure**, qui sont les plus parlants.

## 3. Ce que fait une main humaine

D'après les sources, et vérifié sur les références :

- **Elle casse la grille.** Débords, chevauchements, éléments à cheval sur deux
  colonnes, titre qui mord sur l'image.
- **Elle varie le rythme.** Une section serrée, une section aérée, une section
  pleine page. Pas de cadence unique.
- **Elle accepte l'imperfection.** Tracés à la main, textures brutes, légers
  désalignements. « Pas négligé : humain. »
- **Elle est dense là où le sujet est dense.** Un programme de salle est
  compact : distribution, crédits, durées, coproductions. L'air partout est un
  choix d'agence, pas un choix éditorial.
- **Elle est spécifique.** Une couleur qui vient de quelque chose de vrai, une
  formulation que seule cette école pourrait écrire.

Nanterre-Amandiers, par exemple, écrit « Saison 26-27 » **à la main**, en gros,
par-dessus un aplat orange. Aucune machine ne produit ça spontanément.

## 4. Nos formes natives

Le théâtre possède des objets graphiques que personne n'imite, parce qu'il faut
connaître le métier pour y penser. C'est là qu'est notre avantage :

- **La distribution** — nom à gauche, rôle à droite, points de conduite entre
  les deux. Dense, asymétrique, immédiatement reconnaissable.
- **La feuille de service** — horaires, lieux, durées, en colonnes serrées.
- **Le script annoté** — la marque au crayon du metteur en scène : un mot
  entouré, une flèche en marge, un soulignement qui déborde.
- **Le programme de salle** — crédits en petit corps, serrés, justifiés.

Ces formes remplacent avantageusement les cartes, les grilles à trois colonnes
et les blocs de statistiques.

## 5. Règles de travail

1. **Pas de rangée de trois.** Ni cartes, ni chiffres, ni colonnes égales. Si
   l'information vient par trois, elle se met en liste, en colonne serrée ou en
   tableau — pas en triptyque centré.
2. **Aucune section ne ressemble à la précédente.** Le rythme vertical, la
   largeur de colonne et la place du titre changent d'un bloc à l'autre.
3. **Au moins un débord par page.** Une image, un titre ou un numéro qui sort
   de la gouttière.
4. **La main se voit.** Marques à l'encre tracées à la main, réservées aux
   moments qui comptent. Jamais décoratives, toujours en train de désigner
   quelque chose.
5. **Densité assumée** sur ce qui relève du programme : distribution, crédits,
   dates, tarifs.
6. **Pas de copie qui pourrait servir ailleurs.** Si une phrase fonctionnerait
   pour une école de commerce, elle est à réécrire.
7. **Le test.** Un bloc qui pourrait être collé tel quel sur le site d'une
   startup est à refaire. Ajout : un bloc qui pourrait être collé sur le site
   d'un autre théâtre est à refaire aussi.
