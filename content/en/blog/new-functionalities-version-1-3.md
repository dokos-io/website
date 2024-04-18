---
name: 'new-functionalities-version-1-3'
title: New functionalities in version 1.3
year: 1st March 2020
date: '2020-03-01'
id: 'version-1-3'
description: |
  Reconcile your bank statements with your transactions, allow your leads/customers to book an appointment online and add new customized fields in your point of sale amongst the novelties of this version 1.3
author: Charles-Henri Decultot
---

## Bank Reconciliation

Strongly awaited by those who do their accounting in _Dokos_, version 1.3 contains a new bank reconciliation dashboard that makes it easier to check your bank statements.

The bank reconciliation is a key step for any bookkeeper.
This tool allows an early detection of potential erros in your payment entries and a better control of the consistency between the accounting balance and the bank statement balance for your different bank accounts. 

The new tool proposed in _Dokos_ starts from transactions imported via an xlsx/ofx file or via the Plaid synchronisation to reconcile them with your payment entries or journal entries.
It is also possible to select a purchase invoice, a sales invoice or an expense claim and _Dokos_ will automatically create the corresponding payment.

The bank reconciliation statement report has also been enhanced to display the calculated balance of your bank account based on the general ledger in order to be able to compare it with your bank statement balance.

If your payments have been made via Stripe, you can reconcile them in one click thanks to a dedicated functionality of automatic reconciliation. We plan to extend this functionality to payments via GoCardless soon.
Also, an automatic reconciliation functionality allows you to reconcile all bank transactions containing its corresponding invoice number.


## Subscriptions

The management of subscription plans has been reviewed and simplified.
You can now create subscription plans templates, select them and modify them directly in your subscriptions.
Each subscription plan can now have a start and end date.
You can create different lines each month to invoice different non recurring items.

>Example: You invoice 50 units in january, then 60 in february and 70 in march.
>Before, you needed to change the subscription plan to invoice each month.
>Now you can use the same model, create 3 lines with dates corresponding to each invoicing period and simply put 3 different units.

## Point of sale

It is now possible to add new customized fields on the point of sale.
Imagine you need to link your invoices to a specific sales campaign: you just need to select the field "Campaign" in the point of sale settings and you can fill it for each customer's purchase.

## Online appointment booking

If you need to plan meetings with prospects or customers, you can now send them a link to your _Dokos_ website and they can pick the best slot for their schedule.
It is of course possible to synchronize the events created in your calendar with your Google Calendar.

## Additional novelties

This update also contains an upgrade of our icons to FontAwesome 5, new APIs for the Stripe connector, the addition of the Pandas library in __Dodock__, reconciliation by ESR references for Switzerland, the display of the address in the shopping cart without having to activate a payment gateway, better batch reports, employee advance return, ...

<br>  

---  
  
Our [roadmap](https://gitlab.com/dokos/dokos/-/boards/966503) is available, so don't hesitate to comment, suggest and propose concrete solutions to help us put this software on the right tracks.

