---
name: 'dokos-new-open-source-erp'
title: Dokos, the new open-source ERP
year: 24th October 2019
date: '2019-10-24'
id: 'dokos-launch'
description: |
  We are pleased to announce the official launch of Dokos, an open-source business platform for french and european SMEs.
author: Charles-Henri Decultot
---

After several months of work, the first official version of Dokos is finally available and ready for production.

## The project

Dokos is, first of all, a project born to appropriate ourselves a tool and adapt it for the french and european market.  
It is with high regard for the work done by the team at [Frappe Technologies](https://frappe.io) that we have chosen to use [ERPNext](https://erpnext.com)'s code as a basis for this new 100% open-source ERP.  

This dissociation allows us to pursue our own development cycle and to include the fonctionalities requested by our users in the core of the software instead of custom applications, which are hard to maintain and to adapt in parallel to the main software.  

We have also included the novelties of ERPNext version 12, with some modifications and additions of answers to the regulatory requirements that limit the usage of ERPNext in France and other european countries.

## The functionalities of the first version

In the first version of Dokos, we are proud to announce a few novelties and additions to the version 12 of ERPNext:
- A new Desk, composed of a big customizable dashboard.
- Removal of domains considered as non essential (Hospitality, Healthcard, Education,... ).  
  <span class="text-gray-600">This choice is mainly due to the necessity to limit the functional perimeter of the software to focus on the improvement of a smaller amount of modules. We consider introducing them back in the future as separate applications.</span>
- Full refactor of the subscriptions fonctionality and integration with Stripe and GoCardless.  
  <span class="text-gray-600">You can now automate the whole billing cycle of your recurring customers.</span>
- Possibility to generate XML files to initiate SEPA direct debit with your bank.
- Regulated documents (invoices, payments,...) have now a defnitive name with naming series only after submission to guarantee a continuous suite of names while being able to delete draft documents.
- Possibility to offer rooms or resources booking on the web site.
- New translation system to guarantee contextual translations for each document.

Read the full list of changes for v1.0.0 on the [documentation](https://doc.dokos.io/fr/dokos/versions/v1_0_0.html) site.


## The creation of a common resource

This project is published under the GNU-GPLv3 licence, which means that anyone, potentially all french and european companies, can download it and install it freely on their servers.  

You can develop your own applications based on the Dokos framework or contribute to the project by proposing a `Pull Request` on [Gitlab](https://gitlab.com/dokos/dokos)

We are also providing a [community forum](https://community.dokos.io) for all Dokos users.
As in any open-source project, we hope that many of you will give some knowledge back to other users in order to create a community of users helping the software to move forward.

## Objective: the project's sustainability

The financing of the project is currently covered via two main channels:
- Dokos cloud for companies who wish to delegate the management of their hosting.
- Our development, support, maintenance, configuration, customization or training services.

As in many open-source projects, its sustainability relies heavily on the main editor, currently Dokos SAS, but the maintenance and evolution of the software are meant to be shared rapidly if different actors participate to its development.

Dokos value proposition is simple: don't pay licence fees to use the software, but invest all or part of your IT budget to finance the improvement of functionalities that give you a competitive edge.


## What's next ?

Things are just getting started. We have a huge deal of work ahead of us to improve the software, make it more user friendly, more comprehensive, smarter and establish it as a trusted alternative to software already installed on this market.

Our [roadmap](https://gitlab.com/dokos/dokos/-/boards/966503) is available, so don't hesitate to comment, suggest and propose concrete solutions to help us put this software on the right tracks.