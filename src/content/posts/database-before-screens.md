---
title: "Why I design the database before the screens"
date: "2026-11-16"
summary: "How modelling records, constraints and permissions early makes business software easier to build and harder to misunderstand."
tags: [system-design, databases, architecture]
draft: false
category: tech
cover: "/images/stock/writing-architecture.jpg"
coverAlt: "Hand-drawn flowchart on a whiteboard showing screens connected by arrows"
coverCredit: "Photo: divinetechygirl / Pexels"
---

A screen can make an uncertain process look finished. Put a few fields on a form, add a save button, and the team can imagine using it tomorrow. The difficult questions often arrive later: who owns this record, can it change after approval, and what should happen when two people save different versions? I prefer to ask those questions while the system is still cheap to change.

![Rows of server racks in a data centre corridor](/images/stock/writing-servers.jpg "Photo: Brett Sayles / Pexels")

## A model is a conversation about the business

Designing the database first does not mean disappearing for a month to produce a perfect diagram. It means sketching the important records while talking to the people who create and use them. The diagram is useful because it exposes disagreements. One person may call every delivery an order; another may mean a purchase commitment that can arrive in several deliveries.

That difference affects receiving, payments and reporting. If the application collapses the two concepts into one table, every partial delivery becomes an awkward exception. A little modelling can reveal that the business needs a purchase order, several receipts and a separate record of what was actually accepted.

## Put the important rules somewhere durable

A form can stop a user from leaving a field empty, but a business rule should not depend on one screen behaving correctly. Imports, background jobs and future integrations also write data. The database can defend rules that must survive every entry point, while the interface explains them in language a person can understand.

```sql
CREATE TABLE stock_movements (
  id uuid PRIMARY KEY,
  operation_id uuid NOT NULL UNIQUE,
  branch_id uuid NOT NULL REFERENCES branches(id),
  product_id uuid NOT NULL REFERENCES products(id),
  quantity_delta numeric NOT NULL CHECK (quantity_delta <> 0),
  reason text NOT NULL,
  recorded_at timestamptz NOT NULL DEFAULT now()
);
```

This small example makes an operation identity unique and keeps the reason for an adjustment. It does not pretend that every stock policy can be expressed by a column constraint. Rules involving approvals or available quantities may need a transaction, a lock or an explicit workflow around the movement.

## Separate identity, state and history

A record needs a stable identity even when its label changes. An order needs a current state, but that state is not a replacement for its history. If a supervisor reverses an approval, keep enough information to explain who acted, when they acted and why the reversal was allowed.

These distinctions help a team avoid expensive shortcuts:

- A display name is not a durable foreign key.
- A current balance is not a complete movement history.
- A deleted row is not always an acceptable cancellation record.
- A timestamp alone is not a reliable version or ordering guarantee.

Use the simplest representation that preserves the business facts you will need later. An append-only ledger is valuable for stock and money, but it is not a reason to turn every editable preference into an event-sourcing project.

## Design permissions alongside relationships

Roles belong in the first modelling conversation. Ask which branch a person may inspect, who may approve an adjustment and whether a background worker has broader access than a normal user. A query that returns too much data is still a permissions problem even if the screen hides several columns afterwards.

Where supported, combine application checks with database-level restrictions. Tests should exercise denied paths as well as successful ones. Keep privileged maintenance operations explicit so routine screens do not quietly inherit an administrator connection just because it was convenient during development.

## Let the screens challenge the model

Database-first is an order of questions, not a refusal to prototype interfaces. Build a thin screen early and see whether the model supports a real task. If a receptionist must switch between five unrelated pages to finish one booking, the workflow or its read model may need to change even when every table is technically correct.

The result should be a small set of understandable concepts with clear transitions and useful queries. Once those foundations are sound, screens become easier to rearrange, integrations become easier to reason about, and mistakes are easier to investigate. That is the practical benefit: fewer hidden rules and a system whose records still make sense after the first version of the interface has been replaced.
