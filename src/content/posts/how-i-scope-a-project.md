---
title: "How I scope a project before writing code"
date: "2026-11-19"
summary: "Turn a broad request into a first release with an observable outcome, clear boundaries and a testable handover."
tags: [project-planning, discovery, system-design]
draft: false
category: tech
cover: "/images/stock/writing-wireframe.jpg"
coverAlt: "A hand-drawn wireframe sketch on paper beside a smartphone"
coverCredit: "Photo: picjumbo.com / Pexels"
---


A request for an inventory dashboard tells me what someone wants to see. It leaves open the question of what the team needs to do after seeing it. The answer might be placing a supplier order before a weekly deadline or finding a missing transfer before two branches order the same stock. Those are different jobs. They deserve different first releases, even if both eventually have a dashboard.

## Trace one real transaction

I ask the team to walk through something that actually happened. For example, in a multi-branch project it might be a transfer requested by one branch on Thursday and still missing from its records on Saturday. I ask to see where the request began, who approved it, what left the warehouse, what arrived, and what each person could see. I also ask what they did when the usual approver was unavailable. The gap between the process on paper and this specific transaction usually contains the work the software must handle.

That walkthrough gives me a roster of people, a sequence of events, and a few records that need owners. I make a note of which steps depend on spreadsheets, phones or unreliable internet. Then I play the sequence back to the team. If two people disagree on when stock should move, I put that disagreement on the agenda before promising a completion date.

## Define the smallest useful release

I choose a unit of work the team can finish from beginning to end. In the multi-branch example, a useful first release might cover a request, dispatch, receipt and discrepancy review. Imported opening balances can be enough for a pilot. Supplier purchasing can wait until the team trusts what a transferred quantity means.

The scope note has four parts:

- The people and locations in the pilot, including who approves corrections.
- The workflow the release supports, with a specific starting point and end state.
- The exceptions the release must handle and what staff should do about them.
- The dependencies we need from the business, including sample records and someone who can confirm decisions.

I also name what is deferred in the scope note. If batches and expiry dates are still under discussion, the owners know that before a catalogue import starts. When a new request comes in, we can discuss what it displaces or whether it belongs in a later release.

## Write the acceptance example first

I use plain language that an operator and a developer can read together. A candidate acceptance example looks like this:

```text
Given 12 units were dispatched from the warehouse
When the branch receives 10 units and reports 2 missing
Then 10 units are available at the branch
And the remaining 2 stay visible for review
And the same receipt cannot be applied twice
```

This example reveals two decisions. Available stock changes when a receipt is recorded, and an unresolved difference remains tracked. If the team wants different rules, we can adjust a short example together. A second example should cover the expected correction after the missing units are found or written off.

## Put uncertainty on the calendar

An estimate is easier to discuss when it says which work is known and which work is waiting on evidence. A readable export from the current system is a known dependency. Whether an old branch phone can print receipts reliably is something I would test with the device in hand. I would schedule that test before promising the whole rollout. The [project estimator](/estimate) shows how choices such as offline support and migration can change the planning range.

Finally, I ask who will sign off a pilot and what material they will need to run it on the next shift. The first release has an owner, a recovery procedure and a short list of open decisions. That is the point at which a start date begins to mean something.
