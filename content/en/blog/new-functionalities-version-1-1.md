---
name: 'new-functionalities-version-1-1'
title: New functionalities in version 1.1
year: 6th November 2019
date: '2019-11-06'
id: 'version-1-1'
badge:
  label: 'News'
description: |
  Server scripts, notification center, page breaks in print formats, bookings portal,... discover the new features in version 1.1
author: Charles-Henri Decultot
image:
  src: '/blog/version-1-1/_main.jpg'
---

The first minor update to _dokos_ adds already a few long awaited features.

## Server scripts

Asked for long by the ERPNext community, the development of this feature had been postponed until now because a bad integration into the software could lead to strong security issues.  

They are now available in ERPNext version 12 and in _dokos_ version 1.1 and it opens a all lot new field of possibilities from the user interface.  

### The benefit of server scripts

The heart of _dokos_ is data, every document type being an object with its own rules and logic.
Some document types are linked with each other (E.g. quotations can become sales orders, then sales invoices), but all use cases are not provided in the standard version of the software. It is indeed impossible and unthinkable to create all possible and concevable workflows in an ERP.  
But _dokos_ has a very flexible structure allowing to create custom document types and to add rules and logic to theses documents through scripts.  
We can make an analogy with Excel worksheets: you can create new workbooks, add new worksheets and rules thanks to formulas or create VBA macros if formulas are not enough.  

Server scripts, written in Python, add new automation capabilities because, unlike "custom scripts" written in Javascript and executed in the browser, they are executed on the server hosting _dokos_. They give access to a part of the API only accessible to custom applications until now.   

What if you though about adding additional validations before submitting a document, creating a project automatically when creating a sales order or communicating with your web site thanks to a custom API ?


## Improvement to online bookings

Thanks to the financing effort of several [Shared Places (Link in french)](https://movilab.org/wiki/Cofinancer_des_communs), _dokos_ has now a very flexible online booking system linked directly with the invoicing functionalities of the ERP.  
In this new version, this system has been enhanced by the following elements:

- Possibility to autorize simultaneous bookings for an item
  E.g. I want to allow booking 30 coworking offices without having to create 30 different items.

- The automatic deletion of booking drafts is now configurable and can be totally disabled if needed
  E.g. All drafts can be deleted every 5 minutes intead of 15 minutes before that. It frees up slots booked by users who decided to finally not place an order (abandoned carts).

- A new section "Bookings" can be activated on the customer portal. It allows connected users to see their past and future bookings and to cancel them if the system managers give them the corresponding rights.


## A new notification center

The notification center has been completely refactored to be more pleasant to use and display your notifications, daily events and open documents in the same place.

You can now also configure the notifications you wish to receive or not from the notification center.

## Page breaks in print formats

It is not possible to add a page break below a section in print formats.

It was a long awaited feature, especially to print terms and conditions on a separate page.
  
---  
  
Our [roadmap](https://gitlab.com/dokos/dokos/-/boards/966503) is available, so don't hesitate to comment, suggest and propose concrete solutions to help us put this software on the right tracks.

