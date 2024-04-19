---
name: 'new-functionalities-version-1-2'
title: New functionalities in version 1.2
year: 19th December 2019
date: '2019-12-19'
id: 'version-1-2'
badge:
  label: 'News'
description: |
  Import your bank statements in OFX format, discover the new calendar and synchronize your events and item bookings with Google Agenda.
author: Charles-Henri Decultot
image:
  src: '/blog/version-1-2/_main.jpg'
---

With a few days left before the holiday season, here a new improvements, we hope, you'll find very useful.

## Import bank statements in OFX format

It was already possible to import the detail of your banking operations in __Dokos__ using two channems: the import of a CSV/XLSX file or a synchronization of your bank account via [Plaid](https://plaid.com/).  

The CSV/XLSX import necessitate to configure a model and to often modify the file proposed by the bank to make it match this model, thus it is a useful method but not ideal.  
As for the Plaid connection, it is not always an option for many companies.  

We have therefore decided to integrate a standard import format, the OFX ([Open Financial Exchange](https://en.wikipedia.org/wiki/Open_Financial_Exchange)), because it is proposed by most banks in their bank transactions export formats.  

You only need to fetch the file containing your banking operations in OFX format on your bank's site and import it in __Dokos__.
With this format, you can even download a file containing operations already imported in __Dokos__. Each operation being identified with a unique identification number, duplicate entries are avoided.  

This new functionality is the first step toward the full refactor of the bank reconciliation tools planned for the next version of __Dokos__.

## New calendar

We have made an important change with the upgrade of the current calendar, based on version 3, to [FullCalendar](https://fullcalendar.io/) version 4.  

Besides a pure technical change, the interface has evolved slightly to be a little less loaded and it allows us to align the calendars displayed on the e-commerce site (for item bookings), on the main desk dashboard and the one used for the document types views (events, sales orders, holiday lists,... ).  

It has also given us the possibility to enhance the recurring events handling system.  
You can now create more complex recurrences like "Every month the 19" or "Every month the 3rd thursday".  

It is possible to integrate the component of this recurrence system in your custom applications.  

## Synchronization with Google Agenda

The new recurring events handling system has also given us the possibility to enhance the current integration with Google Calendar.  
It is now available for events, item bookings and can be extended to document types in your custom applications.  

### Item bookings

Unlike synchronization of events, the synchronization of item bookings with Google Agenda has a few specificities because the system needs to know which item must be linked to the synchronised booking.  

We have therefore decided to allow every item you wish to synchronize to be linked with a different calendar.

For example, if you propose a 20m2 and a 30m2 conference rooms, each room will be linked to a different item.  
In Google Calendar, you only have to add a new event in the right calendar in order for this booking to be linked with the right item in __Dokos__.


An additionnal feature for item bookings: on the e-commerce website, if an item is no longer available for booking a given day, the other items available on that day will be automatically offered to users.  

## Participants in events

It was until now possible to add participants to an event in a table in which you could select different document types, like a lead of a company. This functionality was not straightforward to use and didn't offer a consistency allowing to use this data to trigger actions.  

We have therefore decided to drastically simplify this feature by limiting the participants to "Contacts" available in __Dokos__. It fits with the behavior of the most used event handling softwares.  

Thanks to this change, we will be able, in the future, to trigger notifications to the selected contacts.  

For those who want to keep a feature similar to the old one, it is always possible to add custom fields in the "Event" document type.  

## Improvements to subscriptions and payment requests user experience

In order to facilitates the daily management of subscriptions and payment requests, especially for sales orders/invoices linked to a subscription, we have added the following elements:

- When saving a subscription, the net total and grand total are simulated and displayed in the document. It gives the opportunity to check that the calculated price upon creating an invoice corresponds to the the price you really want to invoice.  

- During the creation of a payment request, if it is linked to a subscription, the corresponding payment gateways are automatically fetched. The payment key is also created when saving a draft to be able to display the rendered text of the message that will emailed.  

## Duplication of a project with its tasks

You can now duplicate an existing project with its tasks. 
It allows you to create "template" projects and to duplicate them to create new projects when they are always based on the same elements.  

## Automatic creation of a contact when receiving an email

The automatic creation of a contact when receiving an email has been deactivated by default. To use this functionnality you can new activate an option in system settings [Email section].  

## Additional features

It is now possible to "group" data in your dashboard charts. It allows you to generate graphs in which you group your data by customer or supplier. (E.g. Net total by customer).

In the notification center, we have decided to leave the "Open Documents" panel open by default. As with the old notification center, you now have access to documents needing your attention in priority.  

<br>  

🎄 **We wish you a Merry Christmas and a Happy New Year** 🎄
<br>  

---  
  
Our [roadmap](https://gitlab.com/dokos/dokos/-/boards/966503) is available, so don't hesitate to comment, suggest and propose concrete solutions to help us put this software on the right tracks.
