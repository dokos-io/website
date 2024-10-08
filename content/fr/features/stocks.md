---
title: Stocks
icon: i-vaadin-stock
description: Simplifiez la gestion de votre Stock avec un logiciel de distribution de pointe
application: Dokos
navigation:
  title: Stocks
  icon: i-vaadin-stock
  description: Simplifiez la gestion de votre Stock avec un logiciel de distribution de pointe
hero:
  title: Les <span class="text-primary">fonctionnalités Stock</span> détaillées
  description: Facilitez votre gestion de stock et de distribution. Que vous soyez un fabricant, un distributeur, ou un détaillant, Dokos optimise chaque aspect de votre chaîne d'approvisionnement, depuis l'entrée de marchandises jusqu'à la livraison au client final.
  links:
    - label: Commencez maintenant
      to: https://cloud.dokos.io
      size: sm
      color: black
      variant: solid
      icon: i-heroicons-rocket-launch
    - label: Documentation
      to: https://doc.dokos.io
      size: sm
      color: gray
      icon: i-heroicons-arrow-right-20-solid
      trailing: true
  headline:
    label: L'écosystème Dokos
    variant: subtle
    to: /fr
---

::card-group{.grid.sm:grid-cols-3.gap-4}
  :::card
  ---
  class: items-start
  icon: material-symbols:barcode-reader-outline-rounded
  title: Articles
  ---
  - **Création et gestion des articles** : L'utilisateur peut créer et gérer des articles (produits, matières premières, produits semi-finis, etc.) avec leurs caractéristiques (description, unité de mesure, codes-barres, etc.).
  - **Variantes d’articles** : Possibilité de gérer des variantes d’un même article (différentes tailles, couleurs, modèles, etc.).
  - **Codes-barres** : Gestion des articles avec des codes-barres pour simplifier les opérations de stock.
  - **Gestion des lots et des numéros de série** : Suivi des articles par lots ou par numéros de série pour assurer une traçabilité précise.
  :::

  :::card{.items-start icon="hugeicons:dropbox" title="Réceptions de stock"}
  - **Entrée de stock** : Enregistrement des réceptions de matériaux dans l’entrepôt.
  - **Sortie de stock** : Suivi des mouvements de stock sortants (par exemple, expédition des produits finis vers les clients).
  - **Transfert de stock** : Transfert des articles d'un entrepôt à un autre.
  - **Réconciliation des stocks** : Ajustement manuel du stock en cas de différences entre les quantités théoriques et physiques.
  :::

  :::card
  ---
  class: items-start
  icon: material-symbols:warehouse-outline-rounded
  title: Entrepôts
  ---
  - **Gestion multi-entrepôts** : Permet la création et la gestion de plusieurs entrepôts (par site géographique, section de l’usine, etc.).
  - **Stock par entrepôt** : Consultation du stock disponible par entrepôt et gestion des niveaux de réapprovisionnement.
  - **Emplacements internes** : Gestion des emplacements au sein des entrepôts pour un suivi plus fin des articles.
  :::

  :::card
  ---
  class: items-start
  icon: material-symbols:forklift-rounded
  title: Réapprovisionnement et planification
  ---
  - **Niveaux de réapprovisionnement** : Définition de seuils minimum et maximum pour les articles, afin de déclencher automatiquement les commandes de réapprovisionnement.
  - **Calcul des besoins en approvisionnement**  : Planification des demandes de matériaux en fonction des besoins de production ou de vente.
  - **Ordre de transfert** : Planification des transferts de stock entre les entrepôts.
  :::

  :::card
  ---
  class: items-start
  icon: hugeicons:money-bag-02
  title: Gestion des stocks avec PEPS, LIFO, etc.
  ---
  - **Méthode de valorisation du stock** : Permet de valoriser le stock selon différentes méthodes comme le PEPS (Premier Entrant Premier Sortie), LIFO (Last In, First Out) ou au coût moyen pondéré. Ces méthodes aident à calculer la valeur du stock au moment des transactions.
  :::

  :::card
  ---
  class: items-start
  icon: carbon:delivery-parcel
  title: Transactions et mouvements automatiques
  ---
  - **Réception des matériaux** : Enregistrement automatique des réceptions d'articles après une commande d'achat.
  - **Livraison** : Suivi automatique des sorties de stock pour la livraison aux clients.
  - **Retour de stock** : Enregistrement des retours de stock dans les cas où des articles sont retournés (par exemple, pour défaut ou erreur de livraison).
  :::

  :::card
  ---
  class: items-start
  icon: material-symbols:event-available-rounded
  title: Gestion des stocks à date précise
  ---
  - **Historique des mouvements de stock** : Historique complet des mouvements de stock, permettant de consulter l’état des stocks à une date précise.
  - **Calcul des inventaires à date donnée** : Génération de rapports d’inventaire basés sur une période définie.
  :::

  :::card
  ---
  class: items-start
  icon: material-symbols:bar-chart-4-bars-rounded
  title: Valorisation et rapports de stock
  ---
  - **Rapports d’évaluation du stock** : Génération de rapports sur la valeur du stock en fonction des coûts d’achat, des coûts moyens ou des autres méthodes d’évaluation.
  - **Rapport des articles en dessous du seuil** : Identification des articles dont les niveaux de stock sont en dessous du seuil minimum.
  - **Analyse des mouvements de stock** : Rapport sur les entrées et sorties de stock par article ou entrepôt.
  - **Stock en transit** : Suivi des articles en transit entre différents entrepôts.
  :::

  :::card
  ---
  class: items-start
  icon: material-symbols:data-exploration-outline-sharp
  title: Rapprochement et audit d’inventaire
  ---
  - **Comptage cyclique** : Mise en place de processus réguliers de comptage d’inventaire pour vérifier la concordance entre le stock physique et les données enregistrées.
  - **Inventaires physiques** : Possibilité d’effectuer des inventaires manuels pour auditer les quantités en stock et ajuster les écarts.
  :::

  :::card
  ---
  class: items-start
  icon: material-symbols:event-busy-outline-rounded
  title: Gestion des dates d’expiration
  ---
  - **Suivi des dates de péremption** : Gestion des dates d’expiration pour les articles périssables afin de s'assurer qu’ils soient utilisés ou vendus avant la date limite.
  - **Alertes sur les articles expirés** : Notifications automatiques lorsque des articles sont proches de leur date de péremption.
  :::

  :::card
  ---
  class: items-start
  icon: material-symbols:integration-instructions-outline-rounded
  title: Intégration avec d'autres modules
  ---
  - **Intégration avec les ventes** : Lorsque des commandes de vente sont enregistrées, les niveaux de stock sont automatiquement mis à jour.
  - **Intégration avec les achats** : Les réceptions de matériaux après une commande d’achat sont automatiquement ajoutées au stock.
  - **Intégration avec la fabrication** : Lors de la création d’un ordre de fabrication, les matières premières sont automatiquement déduites du stock et les produits finis sont ajoutés.
  :::

  :::card
  ---
  class: items-start
  icon: material-symbols:calculate-outline-rounded
  title: Gestion des coûts et marges
  ---
  - **Coût des articles** : Possibilité de suivre le coût des articles en fonction des achats et des coûts additionnels (frais de transport, douanes, etc.).
  - **Suivi des marges** : Calcul des marges brutes et nettes en fonction des coûts de stock et des prix de vente.
  :::

  :::card
  ---
  class: items-start
  icon: material-symbols:candlestick-chart-outline-rounded
  title: Gestion des unités de mesure
  ---
  - **Conversion d’unités de mesure** : Possibilité de gérer différents types d’unités de mesure pour les mêmes articles (par exemple, achat en kilogrammes et vente en tonnes).
  :::
::
