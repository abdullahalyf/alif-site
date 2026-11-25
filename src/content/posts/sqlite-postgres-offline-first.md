---
title: "Choosing SQLite and Postgres for offline-first apps"
date: "2026-11-18"
summary: "Give the device and server clear ownership, then define how durable local operations become authoritative shared records."
tags: [offline-first, sqlite, postgresql, databases]
draft: false
category: tech
cover: "/images/stock/writing-servers.jpg"
coverAlt: "Rows of server racks in a data centre corridor"
coverCredit: "Photo: Brett Sayles / Pexels"
---


For a shop that must keep selling during an outage, I want a completed sale to outlive a closed window, a process restart and an unsuccessful sync. SQLite gives a desktop or mobile app a transactional store on the device. Postgres can hold the shared records across branches. Using both works when they have clear responsibilities and the application defines how it carries a change from one to the other.

![Network cables plugged into a server patch panel](/images/stock/writing-cables.jpg "Photo: Brett Sayles / Pexels")

## Give the device a narrow job

The local database keeps the catalogue snapshot and the records the current operator needs. A normal sale writes its items, payments and stock movements to local tables. The same transaction puts an operation in the outbox. If writing the outbox fails, the sale does not commit locally. If the app stops after commit, reopening it still shows the saved receipt and the pending operation.

Local storage also needs a lifecycle. I decide how devices receive their initial catalogue, how long acknowledged receipts stay available, and what happens when a register's storage fills. I test with the hardware the shop will use. A fast developer laptop can hide a backup job or a migration that pauses an inexpensive register during opening hours.

## Let the server decide what becomes shared

A small sync protocol can be easier to follow than attempting to mirror every table. The device sends named operations, such as recording a sale, and includes a stable ID with each one. Postgres records that ID and the operation's effects in one transaction. If the response disappears after commit, the device repeats the same request with the same ID. The server returns the saved result for that operation.

One outline for a locally saved operation is:

```text
operation_id: branch-02/register-03/local-sequence-481
kind: record_sale
created_locally_at: 2026-11-18T09:30:00+06:00
payload: receipt, payment, inventory movements
state: pending
```

The server checks which branch and register can submit the operation, validates its contents, and returns a receipt that the device can mark acknowledged. A device timestamp can help reconstruct a shift. For ordering changes across devices, I give the server its own commit position instead of assuming clocks agree.

## Decide what a conflict means to a person

Some operations can be appended independently. Others refer to a quantity or a catalogue version that may have changed while the device was offline. In the shop example, the team needs to decide whether a sale using an older price stands and who reviews an oversold product. It helps to keep the original local receipt visible even when Postgres declines part of the operation. A rejection then becomes a specific item to investigate with a record of what happened.

Before the pilot, I check these cases:

- A successful server write followed by a dropped acknowledgement.
- Two registers at one branch going offline at the same time.
- A migrated device restarting with unsent records.
- A retired device trying to sync after its access is removed.

I also check whether an operator can distinguish a receipt that is saved locally from one that has reached the office. The [offline sync lab](/lab/offline-sync) demonstrates that difference with a pending queue and a retry.

## Keep recovery part of the deployment

An offline design should provide a way to diagnose a queue without manually editing the database. The device can display pending and rejected operations by reference so support can find them on both sides. Backups need a restore test, especially when replacing hardware that might still hold an unsent shift. A pilot that includes deliberately disconnected shifts is a chance to practise that recovery before an actual outage makes the decisions urgent.
