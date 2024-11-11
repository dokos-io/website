---
date: "2023-11-30"
author: Charles-Henri Decultot
title: Publication de la version 4.0 de Dokos
description: Découvrez les nouveautés de la version 4 de Dokos.
image:
  src: '/blog/version-4-0/_main.jpg'
badge:
  label: 'Actualités'
---

Nous sommes ravi de vous annoncer que la version 4 de Dokos a été publiée et est désormais officiellement disponible. 

Les nouveaux sites créés sur le cloud Dokos seront automatiquement en version 4 à partir de lundi et nous commencerons la migration des sites hébergés sur le cloud Dokos à partir de la semaine du 11 Décembre. Vous recevrez un email vous prévenant de la date à laquelle vos sites seront migrés dans les prochains jours.

Vous pouvez d'ores et déjà tester cette nouvelle version sur nos deux sites de démo:  
➡️ https://demo.dokos.cloud/  
➡️ https://tierslieux.dokos.io/  

<br>  

---
<br>

Cette nouvelle version est basée sur la version 15 de Frappe/ERPNext et reprend ses principales nouveautés. 

Cette nouvelle version est le résultat de plus d'un an de travail et de retours précieux de la part de notre communauté d'utilisateurs toujours plus nombreuse. Merci à tous pour votre aide.

Voici un aperçu de quelques nouveautés.

✨ **L'éditeur de formulaire graphique**

![Editeur de formulaire](/images/blog/version-4/form_builder.png)

✨ **L'éditeur de flux de travail (Workflows) graphique**

![Editeur de workflows](/images/blog/version-4/workflow_builder.png)

✨ **Intégration du design [Espresso de Frappe](https://frappeui.com/), tout en gardant des couleurs.**

✨ **Les écritures de clôture des comptes et des stocks sont générées automatiquement lors de la clôture comptable.**  
Jusqu'à présent le système recalculait les soldes lors des éditions de rapports. Cela permet d'améliorer la performance lors de la génération des rapports comptables et de stock.

✨ **Il est désormais possible d'activer la réservation du stock au passage d'une commande**

✨ **La gestion des numéros de lot et de série a été améliorée grâce à la création d'un document *Ensemble de série et lot* qui suit les lignes de commandes jusqu'à la livraison.**

✨ **Simplification de la gestion des abonnements: les modèles d'abonnement ont été supprimés et remplacés par des articles récurrents associés à une ou plusieurs périodes de récurrence**

✨ **Un outil d'import de FEC permet désormais d'importer des fichiers au format Fichier des Ecritures Comptables pour générer les journaux, clients, fournisseurs, factures et écritures de journal qu'ils contiennent.**

✨ **Le module eCommerce a été séparé de Dokos et dispose désormais de sa propre application [Webshop](https://gitlab.com/dokos/webshop)**  
Si vous utilisez le panier du site web, vous devez installer cette application sur votre site lors de la migration vers la v4. Dans le cas contraire, vous n'avez rien à faire, elle n'est pas nécessaire pour faire fonctionner Dokos.

✨ **Il est désormais possible de proposer plusieurs modes de paiement différents lors des paiements de commandes passées en ligne.**

✨ **La page de sélection de créneaux sur le site web a également été améliorée**
![Editeur de workflows](/images/blog/version-4/item_booking.png)

✨ **Une vue *Gestion de projet* permet de simplifier l'attribution de tâche et l'enregistrement de ses feuilles de temps**
![Editeur de workflows](/images/blog/version-4/project_management.png)

✨ **Il est désormais possible d'imprimer une page de couverture à la suite de son format d'impression (devis, factures, etc...).**  
Cela permet, par exemple, de joindre systématiquement des conditions générales de vente à ses documents de vente sans avoir besoin de les inclure en HTML dans le format d'impression.

✨ **L'application RH gère désormais les congés exceptionnels sur jours ouvrables (Mariage, Décès, etc..)**

✨ **Il est désormais possible de créer des notifications avec un éditeur visuel**
![Editeur de notification](/images/blog/version-4/notification_builder.png)


Le détail des changements des principales applications est disponible en cliquant sur les liens suivants:

➡️ [Framework Dodock](https://doc.dokos.io/dodock/versions/v4.x.x/v4_0_0)  
➡️ [Dokos](https://doc.dokos.io/dokos/versions/v4.x.x/v4_0_0)  
➡️ [HRMS](https://doc.dokos.io/dokos/hrms/versions/v4.x.x/v4_0_0)  


En dehors des améliorations apportées aux applications principales de l'éco-système Dokos, la plateforme est désormais compatible avec les applications suivantes du [Frappeverse](https://frappe.io/frappeverse):

➡️ [Frappe Insights](https://frappeinsights.com/)  
➡️ [Frappe Wiki](https://frappe.io/wiki)  
➡️ [Frappe Print Designer](https://github.com/frappe/print_designer)  
➡️ [Frappe Gameplan](https://github.com/frappe/gameplan)  
➡️ [Frappe LMS](https://frappelms.com/)  
➡️ [Frappe Helpdesk](https://frappedesk.com/)  

Nous proposerons des options pour pouvoir les installer sur vos sites Dokos Cloud au cours du premier trimestre 2024.

Nous espérons que toutes ces améliorations pourront vous aider au quotidien !
