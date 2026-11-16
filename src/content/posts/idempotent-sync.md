---
title: "Idempotent sync: never lose a sale, never count it twice"
date: "2026-11-15"
summary: "Stable operation identities, transactional acknowledgements and careful retry handling for reliable offline sales synchronisation."
tags: [system-design, sync, reliability]
draft: false
---
<!-- // DEMO: illustrative technical article for Alif to review and replace; the examples describe a hypothetical sales system. -->

A cashier presses finish. The server records the sale, but the response disappears on the way back to the counter. The application waits, shows a timeout and offers a retry. This is a normal failure in a distributed system, not an unusual edge case. The important question is whether retrying creates another sale or finds the one that already exists.

## Give the action an identity before sending it

An idempotency key identifies one intended operation. Generate it when the local application creates the sale, store it with the sale and keep using it until the operation has a definitive outcome. Generating a new key for each HTTP request identifies attempts, which is useful for logs but does not prevent duplicate business records.

The operation identity should have a clearly defined scope. A server may combine a tenant identifier with the key, while devices can use collision-resistant identifiers without needing an online sequence generator. Keep the sale identity, operation identity and request correlation identifier distinct, even if a very small implementation initially uses the same value for two of them.

## Make acceptance one atomic transaction

A uniqueness constraint is necessary, but it is only part of the solution. Claiming a key and recording its business effects must commit together. Otherwise, a crash can leave a claimed operation without its sale, or a completed sale without a remembered acknowledgement. Store enough of the result to answer the same operation consistently on a retry.

```sql
BEGIN;
INSERT INTO accepted_operations (tenant_id, operation_id, payload_hash)
VALUES (:tenant_id, :operation_id, :payload_hash)
ON CONFLICT DO NOTHING;
-- If this transaction owns the new operation, validate and write the sale.
-- Otherwise, read the committed result and compare the payload hash.
-- Save the acknowledgement in the same transaction as the sale effects.
COMMIT;
```

The comments hide implementation details deliberately. A real handler must check which transaction inserted the key, handle concurrent attempts correctly and return a clear response when validation fails. It should not blindly continue writing a sale after an insert reports that the operation already exists.

## A repeated key must mean the same request

If a client reuses an operation key with a different total or different line items, silently returning an old receipt conceals a bug. Compare a canonical payload hash or an equivalent stable representation. Reject mismatched reuse with a specific, observable error, and retain the original accepted operation.

Canonicalisation needs care. Object key ordering, optional fields and numeric representations must not create accidental differences. Version the request format and define which fields are part of the business operation. Transport timestamps and retry counters normally belong in attempt metadata, not in the identity of the sale.

## Retrying is a policy, not an infinite loop

The client should distinguish uncertainty from rejection. A network timeout usually justifies a retry using the same identity. An invalid product reference or a permission denial needs a different response. A helpful operation queue records enough state to support both automatic recovery and a human review path.

A small retry policy should specify:

- Which transport and server failures are retryable.
- A bounded backoff schedule with jitter across devices.
- What survives an application or device restart.
- When an operation becomes visible in an exception queue.
- How acknowledgements are retained and reconciled later.

Do not erase the sale when the network retry budget expires. The local business record still matters, and the server may already have accepted it. A support workflow needs the operation identity to investigate that uncertainty safely.

## Extend the boundary beyond the sales row

Recording a sale once is not enough if a retry sends a second email, deducts stock twice or creates another accounting entry. Keep internal effects in the same database transaction when possible. For external effects, write a transactional outbox entry and make the downstream consumer idempotent as well. Reliability stops at the weakest unprotected side effect.

Test the exact failure windows: concurrent retries, response loss after commit, process restart before acknowledgement and delivery of the same outbox message twice. Then reconcile totals independently of the transport logs. The aim is not a claim of exactly-once networking. It is an explainable business outcome: the operation may arrive many times, while its intended effects are recorded once and can be proved afterwards.
