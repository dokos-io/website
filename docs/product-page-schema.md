# Schéma d'une page produit (`content/<locale>/modules/<slug>.yml`)

Rendue par `pages/modules/[slug].vue`. Un bloc absent n'est pas affiché. Les clés ci-dessous sont les seules lues ; les anciennes (`colored_section`, `main_features`, `carousel`, `bridge*`, `bottom_section`, `plus_button`) sont ignorées et doivent être retirées.

```yaml
# En-tête (métadonnées et cartes de l'index)
title: Banking                       # nom de l'application
description: Rapproche vos relevés bancaires avec vos écritures, sans import manuel.   # une phrase, ce que ça fait
icon: i-heroicons-building-library   # icône de repli quand il n'y a pas de logo
application: Banking                 # nom affiché en badge dans l'index
theme: finance-comptabilite          # un seul des sept slugs de utils/themes.ts
author: Dokos                        # texte libre, optionnel
logo:                                # fichier dans public/frappe/, optionnel
  light: /frappe/bank_logo.svg
  dark: /frappe/bank_logo.svg
navigation:
  title: Banking
  icon: i-heroicons-building-library
  description: Synchronisation et rapprochement bancaires.

# Faits (bandeau sous le hero, généré depuis ces champs)
publisher: dokos                     # dokos | frappe | community
licence: GPLv3                       # GPLv3, AGPLv3, MIT… selon le dépôt
version: v5                          # version de Dokos prise en charge
marketplace: bank                    # identifiant de l'app sur cloud.dokos.io (nom du module Python)
docs: https://doc.dokos.io/v5/...    # optionnel, seulement si une section existe
related: [comptabilite, paiements]   # slugs d'autres pages produit, 2 à 5

hero:
  title: Vos relevés bancaires, <span class="text-primary">rapprochés</span> avec votre comptabilité.
  description: Deux phrases au plus. Ce que l'utilisateur obtient.
  image: /modules/bank/hero.webp     # capture réelle, voir « Captures »
  # links: optionnel ; par défaut « Installer depuis la marketplace » + « Documentation »

for_whom:
  # title par défaut : « Pour qui »
  description: optionnel
  items:                             # 2 à 4 situations, pas des personas
    - title: Votre comptable pointe les relevés à la main
      description: Une phrase sur ce que l'application change pour cette personne.
      icon: i-heroicons-calculator

fit:
  # title par défaut : « Comment l'application s'intègre à votre site Dokos »
  description: Un paragraphe, en HTML léger autorisé (<strong>, <br>).
  image: /modules/bank/fit.webp      # capture qui montre le lien avec un document Dokos
  align: left                        # optionnel
  reads:                             # documents Dokos lus ou écrits, 3 à 6
    - Compte bancaire et Transaction bancaire
    - Écriture de paiement, Facture de vente, Facture d'achat
  adds:                              # ce que l'app ajoute : DocTypes, pages, rapports, espace de travail
    - Un espace de travail « Banque » avec le tableau de bord de rapprochement
    - Le DocType « Connexion bancaire »
  depends:                           # modules ou apps requis, en badges
    - Comptabilité

features:                            # 3 à 6, chacune avec une capture
  - title: Importez ou synchronisez vos relevés
    description: Deux ou trois phrases. Ce que l'utilisateur fait, ce qu'il voit.
    image: /modules/bank/feature-import.webp
    badge: Synchronisation           # optionnel
    align: left                      # optionnel, sinon alternance automatique

install:
  # title par défaut : « Comment l'obtenir »
  description: optionnel
  steps:                             # 2 à 4
    - title: Depuis la marketplace Dokos Cloud
      description: Dans votre tableau de bord Dokos Cloud, ouvrez la marketplace et installez l'application sur votre site. Comprise dans toutes les formules.
    - title: En auto-hébergement
      description: "<code>bench get-app https://gitlab.com/dokos/bank</code> puis <code>bench --site votre-site install-app bank</code>."
  prerequisites:                     # optionnel
    - Un compte chez un agrégateur bancaire pris en charge

faq:
  items:                             # 3 à 5 vraies questions
    - label: Quelles banques sont prises en charge ?
      content: Réponse en Markdown. Seulement des faits sourcés.

bottom_cta:
  title: Une question sur Banking ?
  description: Une phrase.
  links:
    - label: Nous écrire
      to: /fr/contact
      size: xl
      color: primary
    - label: Voir la marketplace
      to: https://cloud.dokos.io/marketplace
      target: _blank
      size: xl
      color: neutral
      variant: outline
```

## Captures

Les captures sont prises sur demo.dokos.cloud, fenêtre 1440×900, thème clair, locale française, données de démonstration, puis enregistrées en WebP dans `public/modules/<slug>/`. Nommage : `hero.webp`, `fit.webp`, `feature-<mot>.webp`. Une page référence au plus sept images.

Tant qu'une capture n'existe pas, le fichier YAML liste en commentaire, en tête, les captures à prendre et ce qu'elles doivent montrer :

```yaml
# Captures à prendre (demo.dokos.cloud) :
# - hero.webp : l'espace de travail Banque, tableau de bord de rapprochement
# - fit.webp : une transaction bancaire liée à une écriture de paiement
# - feature-import.webp : l'écran d'import de relevé
```

## Sources

Chaque fait vient de la documentation (doc.dokos.io), du README du dépôt, de la fiche marketplace ou d'une vérification sur le site de démonstration. Un commentaire YAML en tête du fichier cite les sources utilisées. Ce qui n'est pas sourcé n'est pas écrit.
