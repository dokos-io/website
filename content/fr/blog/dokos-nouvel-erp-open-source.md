---
name: 'dokos-nouvel-erp-open-source'
title: Dokos, le nouvel ERP open-source
year: 24 octobre 2019
date: '2019-10-24'
id: 'dokos-launch'
description: |
  Nous sommes heureux de vous annoncer le lancement de Dokos, une plateforme de gestion open-source pour les PME à destination des entreprises françaises et européennes.
author: Charles-Henri Decultot
---

Après de longs mois de travail, la première version officielle de Dokos est enfin disponible et utilisable en production.

## Le projet

Dokos, c'est avant tout un projet né d'une volonté de s'approprier un outil et de l'adapter au marché français et européen.  
C'est avec un grand respect pour le travail effectué par l'équipe de [Frappe Technologies](https://frappe.io) que nous avons choisi d'utiliser le code d'[ERPNext](https://erpnext.com) comme base pour ce nouvel ERP 100% open-source.  

Cette séparation nous permet de suivre notre propre cycle de développement et d'inclure les fonctionnalités demandées par nos utilisateurs dans le coeur du logiciel plutôt que dans des applications personnalisées difficiles à maintenir et faire évoluer en parallèle.  

Nous y avons ainsi intégré les nouveautés de la version 12 d'ERPNext en les modifiant ou en incluant des réponses aux contraintes réglementaires qui limitent l'utilisation d'ERPNext en France et dans un certain nombre de pays d'Europe.

## Les fonctionnalités de la première version

Pour la première version de Dokos, nous nous sommes fiers de vous proposer un certain nombre de nouveautés et d'additions par rapport à la version 12 d'ERPNext:
- Nouveau bureau composé d'un grand tableau de bord personnalisable.  
- Suppression des domaines non considérés comme essentiels (Hospitalité, Santé, Education,... ).  
  <span class="text-gray-600">Ce choix est principalement dû à la nécessité de limiter le périmètre fonctionnel du logiciel pour nous concentrer sur l'amélioration d'un plus petit nombre de modules. Nous envisageons de les proposer à nouveau dans le futur sous la forme d'applications séparées.</span>
- Refonte complète de la fonctionnalité d'abonnements et intégration avec Stripe et GoCardless.  
  <span class="text-gray-600">Vous pouvez désormais automatiser tout le cycle de facturation de vos clients récurrents.</span>
- Possibilité d'éditer des fichiers XML de prélèvement SEPA à transmettre à sa banque.
- Les documents réglementés (factures, paiements,...) ont désormais un nom définitif avec numéro de série après validation pour garantir des suites sans trou et pouvoir tout de même supprimer des brouillons.
- Possibilité de proposer des réservations de salles ou de ressources sur le site web.
- Nouveau système de traduction pour garantir des traductions adaptées au contexte de chaque document.

Retrouvez l'ensemble des changements de la v1.0.0 sur le site de [documentation](https://doc.dokos.io/fr/dokos/versions/v1_0_0.html).


## La création d'un commun

Ce projet est publié sous licence GNU-GPLv3, ce qui veut dire que chacun, potentiellement toutes les entreprises françaises et européennes, peut le télécharger et l'installer gratuitement sur ses serveurs.  

Vous pouvez développer vos propres applications basées sur le modèle d'application de Dokos ou contribuer au projet en soumettant des `Pull Request` sur [Gitlab](https://gitlab.com/dokos/dokos)

Nous mettons également un [forum communautaire](https://community.dokos.io) à disposition des utilisateurs de Dokos.  
Comme dans tout projet open-source, nous espérons qu'un certain nombre d'entre vous mettra un peu de ses connaissances à disposition des autres utilisateurs pour faire émerger une communauté d'utilisateurs aidant à faire évoluer le logiciel.

## Objectif: la pérennité du projet

Le financement du projet est aujourd'hui assuré via deux canaux principaux:
- Le cloud Dokos pour les entreprises qui souhaitent nous déléguer la gestion de leur hébergement.
- Nos services de développement, support, maintenance, configuration, personnalisation ou formation.

Comme pour beaucoup de projets open-source, sa pérennité dépend de l'éditeur principal, Dokos SAS pour le moment, mais la maintenance et l'évolution du logiciel ont vocation à être partagées rapidement si différents acteurs participent à son dévéloppement.

La proposition de valeur de Dokos est simple: ne payez pas de frais de licence pour utiliser le logiciel, mais investissez tout ou partie de votre budget informatique pour financer l'amélioration des fonctionnalités qui vous donnent un avantage compétitif.  

## Et maintenant ?

Les choses ne font que commencer. Nous avons énormément de travail devant nous pour améliorer le logiciel, le rendre plus agréable à utiliser, plus complet, plus intelligent et l'imposer comme une alternative crédible aux logiciels déjà installés sur ce marché.

Notre [feuille de route](https://gitlab.com/dokos/dokos/-/boards/966503) est accessible à tous, donc n'hésitez pas à commenter, suggérer et proposer des solutions concrètes pour nous aider à faire évoluer ce logiciel dans le bon sens.