---
title: "Role-based access control for small businesses"
date: "2026-11-19"
summary: "Build a permission matrix that reflects who can perform each action, at which branches and under what conditions."
tags: [access-control, databases, system-design]
draft: false
category: tech
cover: "/images/stock/writing-access.jpg"
coverAlt: "Locked access panel with cables in a server room"
coverCredit: "Photo: Brett Sayles / Pexels"
---


In a two-branch shop, the person who manages refunds on Monday might cover the register on Tuesday. A finance contractor may need to read reports for both branches without viewing staff records. A useful permission model should be small enough for the owner to explain, while still distinguishing those situations. I start with the actions people need to complete during a shift.

![Hand-drawn flowchart on a whiteboard showing screens connected by arrows](/images/stock/writing-architecture.jpg "Photo: divinetechygirl / Pexels")

## Start with decisions people recognise

I write down a handful of requests in the language the team uses. Can a cashier open a sale? Which refunds need approval? Can an accountant export a report after a shift closes? I ask who should act, what record is affected, and what would go wrong if the permission were too broad. The answer sometimes produces two actions. Requesting a refund and approving a refund may need different roles even when they appear on the same screen.

For a small rollout I expect to see these distinctions:

- Cashiers record sales and request corrections for their assigned location.
- Branch managers approve eligible corrections in branches they manage.
- Finance staff read and export the reporting data they need.
- Owners assign locations and roles, and can review changes to those assignments.

The labels are easy to change before implementation. More important is the boundary each role represents. A shared catch-all manager role can become difficult to remove later because every exception ends up going through it.

## Separate the role from the branch

A role describes an action, and a branch assignment says where the person can use it. Giving two managers the same role should not automatically give each access to the other's store. I model both dimensions so a manager can temporarily cover another location without changing the definition of a manager for everyone.

A decision diagram can stay small:

```text
Member is active
  -> assigned role allows the action
  -> location is inside the member's assigned scope
  -> the record is in a state that permits the action
  -> apply the change and record who made it
```

For example, a manager at Branch A may approve a pending refund at Branch A. The same request for Branch B should fail if the manager has no assignment there. An approved refund should also reject a second approval. That last condition comes from the workflow and still applies to an owner.

## Enforce the rule where the data changes

The interface can hide an action a person cannot use. The API also needs to apply the same decision when it receives a request. For systems using Postgres, a row policy can help enforce branch visibility. Workflow transitions can check membership, the current state and the requested action in the same transaction that changes the record. Writing the audit entry in that transaction keeps the history aligned with the change.

I prefer to test decisions from a matrix with named examples. A manager can approve a Branch A request, a cashier cannot approve it, and a manager with no assignment to Branch A cannot see it. For reporting, I test that exports apply the same branch rules as the screen. I add a case where a membership has expired while its user still has an old session open.

## Give the owner a way to revisit access

An assignment screen should answer who can use a given role, where, and since when. Temporary cover needs an expiry date or a follow-up owner. Access reviews are easier when role names still match what staff do and when unusual decisions leave a reason in the audit history.

The [access-control lab](/lab/access-control) presents a small example policy where you can compare a role and branch against a requested action. Use the examples to start a discussion with the people who would assign and review access in the actual business. They can usually name an exception the initial matrix missed.
