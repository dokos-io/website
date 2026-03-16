---
date: 2026-03-09T00:00:00.000Z
id: Arrivée de la V5
badge:
  label: Nouvelle version
author: Céline
image: /blog/2025/MiniatureyoutubeteaseV5.png
title: "La V5 arrive… De nouvelles fondations posées."
description: "Sortie prévue le 16 mars 2026"
---

Ces dernières semaines, on a passé beaucoup de soirées à travailler. Dokos grandit vite, très vite, et cette effervescence est une chance que l'on savoure autant qu'elle nous bouscule. Alors oui, on jongle : la V5, la facturation électronique, les projets clients, la certification LNE. Mais dans tout ça, il y a une chose qu'on ne négocie pas : prendre le temps de bien faire.

## Ce qui se passe dans les coulisses

Frappe/ERPNext a fait un travail remarquable sur la V16. On est à la fois éditeur du fork Dokos et intégrateurs ERPNext, on connaît la solution dans ses moindres recoins. Quand leur équipe sort quelque chose, on s'y plonge, avec autant de curiosité que d'admiration. Leur V16, c'est du beau travail : une nouvelle gestion de l'espace disponible sur l'écran et une navigation repensée.

Parmi leurs choix, il y en a un qui nous a donné du fil à retordre : le retour au bureau central. Sur le papier, l'idée est cohérente. Dans le quotidien d'un utilisateur, elle génère des clics en plus. On a passé des soirées à chercher comment rester fidèles à leur base tout en proposant quelque chose de vraiment fluide pour vous.

## Ce qui vous attend

Mais assez parlé de nous. Voici tout ce que cela donne concrètement pour vous.

### Une interface qui respire mieux

Au-dessus des listes, de **nouveaux filtres** font leur apparition, enregistrables globalement ou page par page, avec des options "comme" ou "égal" pour des recherches plus souples. Dans certains documents, un **tiroir latéral** s'ouvre sur le côté pour saisir des informations sans perdre le fil : un vrai plus pour les réconciliations bancaires. Toutes vos applications sont regroupées dans un **bureau central** avec une barre latérale claire, la recherche et votre profil à portée de main.

Deux petites choses qui changent beaucoup au quotidien : les **documents liés** sont désormais accessibles en un clic depuis celui que vous consultez, et un **mini-guide** accompagne la saisie d'une facture, utile quand on débute, discret quand on n'en a plus besoin.

## Bookings : moins de concepts, plus de clarté

On a simplifié en profondeur. La notion d'articles disparaît de la réservation ; elle reste uniquement pour la facturation. Désormais, tout est une ressource, réservable ou non.

## La facturation électronique avance, concrètement

Le module **eTransactions** est en train de prendre le relais du module OCR. Ce n'est pas un simple changement de nom : c'est une refonte pensée pour accompagner la réforme de facturation électronique dans sa globalité.

Et les premières briques sont là. **Dokos peut déjà lire des factures électroniques aux formats CII et UBL**, les deux formats structurés au cœur du standard européen. Concrètement, vos factures fournisseurs émises dans ces formats peuvent être importées et traitées directement dans Dokos.

La prochaine étape se précise. La génération automatique de factures électroniques à chaque validation arrive en premier. Ensuite, nous démarrerons le travail de connexion aux Plateformes Agréées en nous appuyant sur la norme **AFNOR XP Z12-013**. Une seule intégration pour se connecter à toutes les PA qui respectent ce standard : c'est exactement la philosophie que nous partageons, des outils ouverts qui ne vous enferment pas.

## En parallèle, d'autres chantiers avancent

La **gestion des acomptes** a été entièrement revue et la notion d'articles disparaît avec elle, ainsi que les effets de bord que certains d'entre vous avaient remarqués.

Côté **RGPD**, vous pouvez désormais taguer vos données personnelles directement dans Dokos et créer des règles de rétention adaptées à votre structure. Des outils concrets, pas juste une case à cocher.

Quant à la **certification LNE**, nous passons l'audit en avril. Selon les résultats, une application dédiée sera disponible pour les structures concernées. On vous tient informés dès qu'on en sait plus.

## Et concrètement, quand est-ce que ça arrive chez vous ?

La V5 sera disponible à partir du **16 mars**. Le déploiement se fera en deux temps : d'abord les sites **sans applications personnalisées**, puis ceux **avec des personnalisations**, pour prendre le temps de vérifier la compatibilité de chaque adaptation avant la bascule. On préfère solide à rapide.

## Envie de jeter un œil ?

Deux environnements de démonstration ([entreprises](https://demo-develop.dokos.cloud/) - [tiers-lieux](https://tierslieux-develop.dokos.cloud/)) sont déjà disponibles pour explorer la V5 à votre rythme. Et si vous croisez un comportement inattendu, dites-le nous sur notre [GitLab](https://gitlab.com/dokos/dokos).

## Ce que cette version représente pour nous

La V5, c'est une fondation. Posée avec soin, construite pour durer. Mais elle ne fait que commencer : elle va grandir, s'enrichir, évoluer au fil de vos usages et de vos retours tout au long de sa vie.

C'est ça, un logiciel vivant. C'est ça, un projet open-source porté avec le cœur.

Merci d'être là. On est impatients de vous la mettre entre les mains. 🌱

*L'équipe Dokos 💙*

```
