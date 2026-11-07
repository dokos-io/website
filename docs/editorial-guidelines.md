# Ligne éditoriale de dokos.io

Ce document fixe la voix du site. Il s'applique à toute page de `content/fr`, aux libellés des menus et aux pages d'événement. Le script `yarn lint:copy` vérifie mécaniquement une partie de ces règles ; le reste se relit.

## Positionnement

> Éditeur open source, experts Frappe et ERPNext, nous bâtissons et garantissons vos applications métier.

Le site parle d'abord de **Dokos, le projet, et de l'écosystème d'applications** autour. Dokos est le cerveau de l'entreprise : la base que partagent ses équipes et leurs assistants IA. « Le cerveau de votre entreprise » est le titre de la page d'accueil, le libellé de la pile et le titre de la page IA ; ailleurs, on montre ce que fait ce cerveau plutôt que de répéter la formule. Le mot « harnais » n'est plus utilisé.

### Ce que Dokos fait pour le lecteur

- **Dokos aide au quotidien.** On décrit ce que Dokos fait pour chaque équipe, avec des verbes d'action : il prépare les achats, réserve le stock, calcule un coût, passe une écriture. On n'écrit pas que Dokos « retient » ou « se souvient » : le lecteur veut un logiciel qui lui simplifie la journée, pas une mémoire.
- **L'IA accompagne, elle ne mène pas.** Dokos n'est pas un produit « IA d'abord ». Dokos AI fait partie du logiciel : il répond, prépare, et la personne valide. Sur un schéma, l'IA se place à côté des équipes, jamais au-dessus ni à leur place. Elle n'est jamais le titre d'une page produit, sauf la page IA & agents.
- **Le bloc des assistants MCP reste.** La rangée Claude, ChatGPT, Gemini, Le Chat, Grok, Copilot et Perplexity parle aux lecteurs : elle montre qu'ils peuvent garder l'assistant qu'ils utilisent déjà. Elle s'accompagne toujours de la phrase « Les connecteurs MCP dépendent de l'offre de chaque assistant. »

La démonstration Dokompany (demo.dokos.cloud) suit les mêmes règles : « Dokompany fabrique la Dokoboard. Dokos s'occupe du reste. »

## Lecteur

Une PME ou une ETI, lue par une personne qui dirige, gère ou administre. Elle veut savoir ce que fait l'outil, pour qui, comment il s'intègre, et comment l'obtenir.

## Principes

1. **Montrer plutôt qu'affirmer.** Chaque affirmation renvoie à un fait vérifiable : une version, une date, un tarif des conditions générales, un dépôt public, une capture d'écran réelle.
2. **Concret.** Nommer le module, le document, le délai, le prix. « Vous pouvez exporter votre base à tout moment » vaut mieux que « réversibilité totale ».
3. **Vouvoiement simple et chaleureux.** Phrases courtes. Un ingénieur qui explique à un client.
4. **Le cas du lecteur d'abord.** Une page s'ouvre sur la situation du lecteur, pas sur nous.
5. **Une idée et un appel à l'action par page.**
6. **Pages produit.** Chaque phrase décrit une action que l'utilisateur fait ou un document qui circule. Pas d'adjectif publicitaire.

## Interdit

| Catégorie | Exemples | Pourquoi |
|---|---|---|
| Mots | « souverain » (sauf page Hébergement et données, défini une fois), « puissant », « innovant », « visionnaire », « LA plateforme », « 100 % », « éthique » comme adjectif | Promesses sans contenu |
| Formules | « En clair », « Dit franchement », « C'est le principe », « Tout simplement », « Autant l'écrire » | Candeur mise en scène |
| Tournures | « X, pas Y », « pas seulement », triplets de mots, aphorisme en fin de paragraphe, question rhétorique en titre | Ton publicitaire ou généré |
| Voix | « service achats », « grille d'exigences », « opposable », « grands comptes », « secteur public », « appel d'offres » | Voix d'appel d'offres, hors cible PME |
| Typographie | tiret cadratin (—) | Remplacé par une virgule, un point ou deux points |
| Noms | clients commerciaux (Orange compris) dans `content/` | Les noms communautaires (tiers-lieux, contributeurs, partenaires) sont autorisés. Les pages d'événement dans `pages/` font exception quand le client l'a accepté. |
| Faits | SecNumCloud promis, hébergement « uniquement en France », sous-traitants « tous dans l'UE » | Faux ou non tenus (GoCardless Ltd est au Royaume-Uni ; production et sauvegardes sont en France et en Allemagne) |

Les mots « garanti », « réversible » et leurs dérivés restent possibles, trois fois par page au plus. Le verbe « garantissons » de la phrase de positionnement ne compte pas.

## Exemples

| Mauvais | Bon |
|---|---|
| Éditeur, pas intégrateur. | Nous maintenons Dodock et Dokos, et nous corrigeons le socle nous-mêmes. |
| Vous pouvez partir. C'est le principe. | Vous pouvez exporter votre base et vos fichiers à tout moment, depuis votre interface d'administration. |
| Une comptabilité puissante et innovante. | Chaque facture validée crée son écriture comptable. Le rapprochement bancaire propose les correspondances. |
| Qu'exploitez-vous aujourd'hui ? | Dites-nous comment travaille votre entreprise. |

## Sources des faits

- Tarifs et délais : `content/fr/hostingconditions.md` (grille du 1er septembre 2024, annexe 1).
- Versions et nouveautés : les billets du journal, doc.dokos.io/nouveautes.
- Certifications : `content/fr/certifications.md`.
- Applications : doc.dokos.io, le README du dépôt de l'application, la fiche de la marketplace Dokos Cloud.
