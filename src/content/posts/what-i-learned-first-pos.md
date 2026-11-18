---
title: "What I learned building my first POS"
date: "2026-11-18"
summary: "A sample reflection on checkout speed, receipt recovery, recipe-based stock and safe rollouts for busy counters."
tags: [retail, field-notes, offline-first]
draft: false
---
<!-- // DEMO: first-person sample for Alif to fact-check and rewrite; sample shift details are fictional. -->

*DEMO article for review. The first-person account and example shift are fictional.*

In this example I am building a point-of-sale system for a tea shop with more than one branch. The first checkout looks simple at a desk: choose a drink, select a size, enter the payment and print a receipt. At a busy counter the cashier also answers questions, hands over items and resolves mistakes. Seeing that sequence changes which parts of the software deserve the first week of attention.

## Watch how people recover

A cashier who selects the wrong size needs a way to correct the item without reentering the entire order. After payment, the same correction may need a refund or a separate adjustment. I learned to make that boundary visible. Before payment the cart is editable. After payment, history becomes part of the financial record and a correction has its own reason.

The printer surfaces another boundary. A payment can be recorded correctly even when the printer jams. If the till returns to the opening screen without a receipt number, the operator might wonder whether to charge the customer again. I would show that the sale is saved, explain what happened to printing, and offer a reprint from the receipt the system already has. The difference matters when another customer is waiting.

## Treat stock as a result of the sale

Counting cups is easy when each menu item consumes one cup. A large drink with different toppings can consume several ingredients in different amounts. I would maintain a versioned recipe and record the resulting stock movements with the sale. Later changes to the recipe would then apply to new orders, and a supervisor could still explain a deduction from last week.

A shift can expose the details that a stock spreadsheet leaves implicit:

- Which sizes or modifiers change the ingredients used.
- Who records prep, waste or staff drinks.
- How a branch transfers stock before a delivery arrives.
- When a discrepancy needs someone to check it.

The software can support these actions once the team agrees who owns them. I would review one day's movement records with a supervisor and ask what cannot be explained. That discussion tells us which events or reasons are missing.

## Show what has reached the office

A branch should keep a local receipt if it goes offline. The back office will see the sale after synchronisation, so its totals can lag behind the register. I would show a last-sync time and an unsent count to make the difference visible. A clear state helps the owner decide whether to use a report immediately or ask the branch to reconnect first.

Here is how I would describe a small shift drill:

```text
Disconnect the register and record two paid sales.
Restart the app and reprint the second receipt.
Reconnect, then interrupt the first sync response.
Confirm both receipts appear once in the branch report.
```

The back-office report and the receipts are both part of the drill. Checking only the screen after reconnection could miss a duplicate that appears in the owner's totals.

## Roll out in ordinary working hours

I would update one register at a time and choose a shift where someone can watch the counter and answer questions. The important preparation is knowing which release is running, what was changed, and how to recover if a device cannot finish opening the new version. A backup and a reversible deployment are easier to verify before the shift than to improvise halfway through it.

At the end of the pilot, I would ask staff which actions still make them pause, which reports they trust, and what they do when a receipt gets stuck. Those answers guide the next release more directly than adding another dashboard. The [POS case study](/work/multi-branch-pos) describes the broader system and its operational goals.
