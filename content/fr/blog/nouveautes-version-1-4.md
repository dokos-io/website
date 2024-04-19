---
name: 'nouveautes-version-1-4'
title: Nouveautés de la version 1.4
year: 26 avril 2020
date: '2020-04-26'
id: 'version-1-4'
badge:
  label: 'Actualités'
description: |
  Amortissement linéaire sur 360 jours, démo traduite en français, vue en carte et conservation des données lors d'un renommage au menu de la v1.4
author: Charles-Henri Decultot
image:
  src: '/blog/version-1-4/_main.jpg'
---

Nous sommes heureux de vous proposer une mise à jour mineure de Dokos pour patienter pendant que nous travaillons à une mise à jour majeure pour les mois qui viennent.
Quatre principales nouveautés viennent enrichir le logiciel.


## Nouvelle méthode d'amortissement

_Dokos_ est désormais capable de calculer un amortissement linéaire au prorata sur 360 jours.  
C'était une fonctionnalité manquante en France où c'est la méthode d'amortissement la plus utilisée.

## La démo peut être générée en français et en anglais

Il est désormais possible de choisir la langue de génération d'une démo de _Dokos_.  
A ce stade nous avons traduit la démo originale d'ERPNext en français et nous comptons ajouter des données plus locales au cours des mois qui viennent.  
Cette étape technique permet également d'ajouter des données de démo dans d'autres langues à l'avenir.  

## Vue en carte

Un nouveau type de vue "Carte" permet d'afficher vos adresses sur une carte du monde et d'appliquer tous les filtres que vous souhaitez comme avec n'importe quelle autre vue.  
Ce nouveau type de vue nécessite l'activation de l'API Google Maps pour récupérer les données de géolocalisation de chaque adresse.

![Vue en carte](/images/blog/version-1-4/map_view.png)

## Conservation des données de renommage de document

Désormais lorsqu'un document est renommé, cette information est conservée dans un type de document spécifique - Documents renommé - qui est facilement requêtable à des fins d'audit.

<br>  

L'image Digital Ocean correspondant à cette nouvelle version sera bientôt disponible et la mise à jour de notre cloud aura lieu dans les jours à venir.  

---  
  
Notre [feuille de route](https://gitlab.com/dokos/dokos/-/boards/966503) est accessible à tous, donc n'hésitez pas à commenter, suggérer et proposer des solutions concrètes pour nous aider à faire évoluer ce logiciel dans le bon sens.

