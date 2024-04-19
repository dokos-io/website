---
name: 'nouveautes-version-1-1'
title: Nouveautés de la version 1.1
year: 06 novembre 2019
date: '2019-11-06'
id: 'version-1-1'
badge:
  label: 'Actualités'
description: |
  Scripts Python, centre de notifications, sauts de page dans les formats d'impressions, portail pour les prises de rendez-vous... découvrez les nouveautés de la version 1.1
author: Charles-Henri Decultot
image:
  src: '/blog/version-1-1/_main.jpg'
---

La première mise à jour mineure de _dokos_ apporte déjà quelques nouvelles fonctionnalités très attendues.

## Les scripts Python

Réclamés depuis longtemps par la communauté ERPNext, leur développement avait jusqu'ici été repoussé car une mauvaise intégration dans le logiciel pouvait avoir de fortes implications en terme de sécurité.

Ils sont désormais disponibles dans la version 12 d'ERPNext et dans la version 1.1 de _dokos_ et ouvrent tout un champ de possibilités supplémentaires depuis l'interface utilisateur.

### L'intérêt des scripts Python

Le coeur de _dokos_ est la donnée, chaque type de document étant un objet avec ses règles et logiques propres.  
Certains types de documents sont liés les uns avec les autres (Ex. les devis peuvent devenir des bons de commande, puis des factures), mais tous les cas d'usages ne sont pas prévus dans la version standard du logiciel. Il est en effet impossible et inenvisageable, de créer tous les flux possibles et imaginables dans un ERP.  
Par contre _dokos_ a une structure très flexible qui permet de créer des types de documents personnalisés et d'ajouter des règles et logiques à ces documents grâce à des scripts.  
On peut faire une analogie avec des tableaux Excel: vous pouvez créer de nouveaux classeurs y ajouter des pages et des règles grâce à des formules et créer des macros en VBA si les formules ne suffisent pas.  

Les scripts en Python viennent ajouter des possibilités supplémentaires d'automatisation car, à la différence des "scripts personnalisés" écrits en Javascript et exécutés dans le navigateur, ils sont exécutés sur le serveur hébergeant _dokos_. Ils donnent donc accès à une partie de l'API jusqu'à présent seulement accessible via des applications personnalisées.  

Et si vous pensiez à ajouter des validations supplémentaires avant la soumission d'un document, à créer automatiquement un projet lors de la création d'un bon de commande ou à communiquer avec votre site web grâce à une API sur mesure ?  

## Améliorations des réservations en ligne

Grâce à l'effort de financement de plusieurs [Tiers Lieux](https://movilab.org/wiki/Cofinancer_des_communs), _dokos_ possède un système de réservation en ligne très flexible et lié directement avec les fonctionnalités de facturation de l'ERP.  
Dans cette nouvelle version, ce système est enrichi par les éléments suivants:

- Possibilité d'autoriser des réservations simultanées d'articles
  Ex. Je souhaite permettre la réservation de 30 bureaux de coworking sans avoir à créer 30 articles différents.

- La suppression automatique des brouillons de réservation est désormais configurable et peut être entièrement désactivée si besoin
  Ex. Tous les brouillons peuvent être supprimés toutes les 5 minutes au lieu de 15 minutes auparavant. Cela permet de libérer les créneaux réservés par des utilisateurs qui n'ont finalement pas validé leur panier.

- Une nouvelle rubrique "Réservations" est activable sur le portail client. Elle permet aux utilisateurs connectés de voir leurs réservations passées et futures et éventuellement de les annuler si les responsables du système décident de leur donner ces droits.


## Un nouveau centre de notification

Le centre de notification a été entièrement repensé pour être plus agréable à utiliser et afficher vos notifications, événements du jour et documents ouvert au même endroit.  

Vous pouvez désormais également configurer les notifications que vous souhaitez recevoir ou non depuis le centre de notifications.

## Sauts de page dans les formats d'impression

Il est désormais possible d'ajouter un saut de page en dessous d'une section dans les formats d'impression.

C'était une fonctionnalité très attendue, notamment pour permettre l'impression des conditions générales de vente sur une page séparée.  
  
---  
  
Notre [feuille de route](https://gitlab.com/dokos/dokos/-/boards/966503) est accessible à tous, donc n'hésitez pas à commenter, suggérer et proposer des solutions concrètes pour nous aider à faire évoluer ce logiciel dans le bon sens.

