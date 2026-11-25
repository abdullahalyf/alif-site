---
title: "Designing offline-first software for shops with bad internet"
date: "2026-11-17"
summary: "A practical design for keeping a shop selling during an outage, without losing control of stock, receipts or reconciliation."
tags: [system-design, offline-first, retail]
draft: false
category: tech
cover: "/images/slots/pos-overview.jpg"
coverAlt: "The Alez POS selling screen"
---

A shop does not stop having customers because its connection disappears. Someone still needs a receipt, a cashier still needs to finish a shift, and the owner still needs to know what happened. That is the starting point for offline-first design: decide which business promises remain true when the server cannot be reached. A cached screen is useful, but it is not a complete answer.

![Rows of server racks in a data centre corridor](/images/stock/writing-servers.jpg "Photo: Brett Sayles / Pexels")

## Start with the counter, not the network library

Write down the actions a cashier must complete during an outage. Selling an item, printing a receipt and recording a payment may be essential. Changing staff permissions or editing the product catalogue may safely wait. This boundary prevents a small offline feature from becoming an accidental second version of the entire back office.

A useful first conversation asks what happens when stock information is stale. Some shops accept a small risk of overselling; others must reserve scarce items centrally. Software cannot invent a universal answer. The owner needs to choose a policy, and the interface needs to explain when its information is provisional.

## Make the local transaction durable

Keep the sale, its line items and its queued operation in one local database transaction. If the application closes after the receipt prints, the next launch should still find the completed sale and the work waiting to synchronise. An in-memory queue cannot provide that guarantee, and saving a sale before separately enqueueing it leaves a crash window.

```sql
BEGIN;
INSERT INTO sales (id, device_id, total_minor)
VALUES (:sale_id, :device_id, :total_minor);
INSERT INTO outbox (operation_id, kind, entity_id, state)
VALUES (:operation_id, 'sale.created', :sale_id, 'pending');
COMMIT;
```

The identifiers are created once and stored. Reopening the application must not create a fresh identity for the same business action. Money uses integer minor units, while the sale keeps the price and tax facts needed to explain the original receipt even if the catalogue changes tomorrow.

## Treat synchronisation as a state machine

An outbox entry is pending until a durable acknowledgement arrives. A timeout means the client does not know the outcome; it does not prove the server rejected the operation. The server therefore needs idempotent processing, and the client needs a bounded retry policy that distinguishes temporary transport failures from business validation failures.

For a first implementation, make these states visible in logs and support tools:

- Pending: the operation exists locally and has not been acknowledged.
- In flight: a request is running, with a recoverable timeout.
- Acknowledged: the server has durably accepted the operation.
- Needs review: the operation cannot proceed without a business decision.

Do not delete a pending sale just because a retry counter is exhausted. Move it into an explicit review path, retain its identity, and give staff a way to understand what needs attention without editing database rows by hand.

## Keep reconciliation separate from transport

A successful upload answers whether the server received an operation. Reconciliation answers whether the complete business record makes sense. Compare totals by branch, device and shift. Track missing acknowledgements, unusual gaps in receipt sequences and adjustments made after a shift closes. These checks catch mistakes that an HTTP success code cannot describe.

Store the event time and the server receipt time separately. A sale made at nine in the morning may reach the server after lunch. Sorting every report by upload time can make a healthy offline workflow look like missing revenue followed by a sudden unexplained spike.

## Test the uncomfortable moments

Use failure scenarios as part of the design, not only as a final test checklist. Close the application between database writes. Interrupt a request after the server commits but before the response arrives. Restart the device with several shifts waiting to sync. Change a product price while another counter is offline, then verify that old receipts remain explainable.

Finally, make the operating model modest enough for the business to maintain. A local database, an explicit outbox, a transactional server and a clear exception view can be a stronger starting point than a complicated distributed platform. The goal is a counter that keeps working and records that staff can trust when the connection returns.
