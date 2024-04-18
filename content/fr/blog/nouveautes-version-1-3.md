---
name: 'nouveautes-version-1-3'
title: Nouveautés de la version 1.3
year: 1 mars 2020
date: '2020-03-01'
id: 'version-1-3'
description: |
  Rapprochez vos relevés bancaires avec vos transactions, proposez à vos prospects/clients de prendre rendez-vous en ligne et ajoutez des champs personnalisés dans le point de vente parmi les nouveautés de cette version 1.3
author: Charles-Henri Decultot
---

Fonctionnalité très attendue par ceux qui font leur comptabilité dans _Dokos_, la version 1.3 dispose d'un tableau de bord de rapprochement bancaire permettant de pointer vos relevés bancaires facilement.


## Rapprochement bancaire

Le rapprochement bancaire est une étape essentielle de la tenue de la comptabilité.
C'est un outil permettant de détecter les éventuelles erreurs dans la saisie des paiements et de contrôler la cohérence entre le solde des comptes bancaires en comptabilité et sur le relevé bancaire.

Le nouvel outil proposé dans _Dokos_ permet de partir des transactions importées via un fichier xlsx/ofx ou via la synchronisation avec Plaid pour les rapprocher avec vos écritures de paiement ou écritures de journal.
Il est également possible de sélectionner une facture d'achat, une facture de vente ou une note de frais et _Dokos_ créera automatiquement le paiement correspondant.

Le relevé de rapprochement bancaire a également été amélioré pour afficher le solde calculé de vos comptes bancaires à partir du grand livre afin de pouvoir le comparer avec le solde de votre relevé bancaire.

Si vos paiements sont effectués via Stripe, vous pouvez les rapprocher en un clic grâce à une fonctionnalité dédiée de rapprochement automatique. Nous prévoyons d'étendre cette fonctionnalité aux paiement via GoCardless prochainement.
De même, une fonctionnalité de rapprochement automatique permet de rapprocher toutes les transactions bancaires contenant le numéro de la facture correspondante.


## Abonnements

La gestion des plans d'abonnement a été revue et simplifiée.
Vous pouvez désormais créer des modèles de plans d'abonnements qui peuvent être sélectionnés et modifiés directement dans l'abonnement.
Chaque plan d'abonnement peut désormais avoir une date de début et une date de fin.
Vous pouvez ainsi créer des lignes différentes chaque mois pour facturer des articles non récurrents.

>Exemple: Vous facturez 50 unités en janvier, puis 60 en février, puis 70 en mars
>Avant, il fallait modifier le plan d'abonnement à facturer chaque mois.
>Désormais vous pouvez utiliser le même modèle, créer 3 lignes avec des dates correspondant aux périodes à laquelle les factures seront crées et simplement mettre 3 unités différentes.


## Point de vente

Il est désormais possible d'ajouter des champs personnalisés sur le point de vente.
Imaginons que vous souhaitez lier vos factures à une campagne de vente précise, il vous suffit de sélectionner le champ "Campagne" dans les paramètres du point de vente et vous pourrez le remplir au passage de chaque client en caisse.

## Prise de rendez-vous

Si vous avez besoin de planifier des rendez-vous avec des prospects ou des clients, vous pouvez désormais leur envoyer un lien vers votre site _Dokos_ pour qu'il choisissent le créneau qui leur convient le mieux.
Il est évidemment possible de lier les événements créés dans votre calendrier avec Google Agenda.

## Autres nouveautés

Cette mise à jour comprend également la mise à niveau des icônes vers FontAwesome 5, de nouvelles API pour le connecteur Stripe, l'ajout de la librairie Pandas dans Dodock, des fonctionnalités de rapprochement par référence ESR pour la Suisse, l'affichage de l'adresse dans le panier d'achat sans avoir à activer une passerelle de paiement, de meilleurs rapports de lots, des remboursements d'avance par les employés, etc...

<br>  

---  
  
Notre [feuille de route](https://gitlab.com/dokos/dokos/-/boards/966503) est accessible à tous, donc n'hésitez pas à commenter, suggérer et proposer des solutions concrètes pour nous aider à faire évoluer ce logiciel dans le bon sens.

