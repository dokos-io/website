---
name: 'nouveautes-version-1-2'
title: Nouveautés de la version 1.2
year: 19 décembre 2019
date: '2019-12-19'
id: 'version-1-2'
description: |
  Importez vos relevés bancaires au format OFX, découvrez le nouveau calendrier et synchronisez vos événements et réservations d'articles avec Google Agenda.
author: Charles-Henri Decultot
---

A quelques jours des fêtes de fin d'années, voici quelques améliorations qui, nous l'espérons, vous serons fort utiles.


## Import des relevés bancaires au format OFX

Il était déjà possible d'importer le détail de vos relevés bancaires dans __Dokos__ via deux canaux: l'import d'un fichier CSV/XLSX ou la synchronisation de votre compte bancaire via [Plaid](https://plaid.com/).  

L'import CSV/XLSX nécessite de configurer un modèle et de souvent devoir modifier le fichier proposé par la banque pour qu'il corresponde à ce modèle, c'est une méthod pratique, mais ça n'est idéal.  
La connexion à Plaid n'est, quand à elle, pas toujours une option pour beaucoup d'entreprises.  

Nous avons donc opté pour intégrer un format d'import standard, l'OFX ([Open Financial Exchange](https://en.wikipedia.org/wiki/Open_Financial_Exchange)) qui est proposé par la plupart des banques dans leurs formats d'export de transactions bancaires.  

Il vous suffit donc de récupérer le fichier contenant vos opérations bancaires au format OFX sur le site de votre banque et de l'importer dans __Dokos__.  
Avec ce format, vous pouvez même télécharger un fichier contenant des opérations déjà présentes dans __Dokos__. Chaque opération étant identifiée avec un numéro unique, les doublons ne seront pas pris en compte.  

Cette nouvelle fonctionnalité est la première étape de la refonte complète des outils de rapprochement bancaire prévue pour la prochaine version de __Dokos__.


## Nouveau calendrier

Nous avons fait un changement important avec la mise à jour du calendrier actuel, basé sur la version 3, vers la version 4 de [FullCalendar](https://fullcalendar.io/).  
Mise à part un changement purement technique, l'interface a légèrement évolué pour être un peu moins chargée et cela nous permet surtout d'harmoniser les calendriers présents sur le site e-commerce (pour les réservations d'articles), celui présent sur le tableau de bord principal du bureau et celui dans les vues pour les différents types de document concernés (événements, bons de commande, liste de vacances,...).

Cela nous a également permis d'améliorer le système de gestion des événements récurrents.  
Vous pouvez désormais créer des récurrences plus complexes du type "Tous les mois le 19" ou "Tous les mois le 3ème jeudi".  

Il est possible d'intégrer le composant de ce système de récurrence dans vos applications personnalisées.


## Synchronisation avec Google Agenda

Le nouveau système de gestion des événements récurrents nous a également permis d'améliorer l'intégration existante avec Google Agenda.  
Celle-ci est désormais possible pour les événements, les réservations d'articles et peut être étendue aux documents de vos applications personnalisées.  

### Réservations d'articles

Autant la synchronisation des événements est simple, autant la synchronisation des réservations d'articles avec Google Agenda a quelques spécificités puisqu'il faut connaître l'article avec lequel synchroniser chaque réservations.

Nous avons donc décidé de permettre la liaison d'un calendrier différent par article avec lequel vous souhaitez synchroniser les réservations.

Par exemple, si vous mettez à disposition une salle de 20m2 et une salle de 30m2, chaque salle sera liée avec un article différent.  
Dans Google Agenda il vous suffit d'ajouter un nouvel événement dans le bon calendrier pour qu'il soit automatiquement lié au bon article dans __Dokos__.  


Autre nouveauté pour les réservations d'articles: sur le site e-commerce, si un article n'est plus disponible à la réservation un jour donné, les autres articles disponibles ce jour là sont automatiquement proposés aux utilisateurs.  

## Participants dans les événements

Il était jusqu'ici possible d'ajouter les participants à un événement dans un tableau permettant de sélectionner différents types de documents, comme un prospect ou une société. Cette fonctionnalité n'était pas simple à utiliser et n'offrait surtout pas une cohérence permettant d'utiliser ces données pour déclencher des actions.  

Nous avons donc pris le parti de simplifier drastiquement cette fonctionnalité en limitant les participants aux "Contacts" présents dans __Dokos__. Cela rejoint le fonctionnement des logiciels de gestion d'événements les plus couramment utilisés.  

Grâce à ce changement nous pourrons, à l'avenir, permettre l'envoi de notifications aux contacts sélectionnés.   

Pour ceux qui souhaitent garder un fonctionnement similaire à l'ancien, il est toujours possible d'ajouter des champs personnalisés dans la fiche "Evénement".


## Amélioration de l'expérience utilisateur dans les abonnements et les demandes de paiement

Afin de faciliter la gestion quotidienne des abonnements et des demandes de paiement, notamment pour les commandes/factures liées à un abonnement, nous avons ajouté les éléments suivants:  

- A l'enregistrement d'un abonnement, le total HT et total TTC sont simulés et affichés dans le document. Cela permet de vérifier que le prix calculé lors de la création de la facture correspond bien à celui qu'on souhaite facturer.  

- Lors de la création d'une demande de paiement, si celle-ci est liée à un abonnement, les passerelles de paiement correspondantes sont automatiquement récupérées. La clé de paiement est également créée à l'enregistrement du brouillon pour pouvoir afficher le texte final du message qui va être envoyé par email.  


## Duplication d'un projet avec ses tâches

Vous pouvez désormais dupliquer un projet existant avec ses tâches.  
Cela vous permet de créer des projets "modèle" et de les dupliquer pour créer de nouveaux projets lorsque ceux-ci partent systématiquement de la même base. 

## Création automatique d'un contact à la réception d'un email

La création automatique de contacts à la réception d'un email à été désactivée par défaut. Pour utiliser cette fonctionnalité, vous pouvez désormais activer une option dans les paramètres système [section Email].


## Autres nouveautés

Il est désormais possible de "grouper" les données dans vos graphiques de tableau de bord. Cela vous permet par exemple de générer des graphiques dans lesquels vous groupez vos données par client ou par fournisseur. (Ex. Total HT par client).

Dans le centre de notification, nous avons fait le choix de laisser le panneau "Documents Ouverts" ouvert par défaut. Comme avec l'ancien centre de notification, vous avez donc désormais accès aux documents nécessitant votre attention en priorité.  
  
<br>  

🎄 **Nous vous souhaitons d'excellentes fêtes de fin d'année !!!** 🎄
<br>  

---  
  
Notre [feuille de route](https://gitlab.com/dokos/dokos/-/boards/966503) est accessible à tous, donc n'hésitez pas à commenter, suggérer et proposer des solutions concrètes pour nous aider à faire évoluer ce logiciel dans le bon sens.

