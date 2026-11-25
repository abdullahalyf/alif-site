---
title: "What I learned building my first POS"
date: "2026-11-18"
summary: "Notes from building Alez POS for Yaucha Food & Beverage: why the counter comes first, why the shop keeps selling offline, and why I built a virtual printer."
tags: [alez-pos, field-notes, offline-first]
draft: false
category: tech
cover: "/images/slots/service-operations.jpg"
coverAlt: "A crop of the Alez POS counter screen"
---

Alez POS is the first system I built for a real business: Yaucha Food & Beverage. It runs in 3 branches today, and I am preparing it to grow to 9. Each branch has an in-shop POS at the counter, and the owner manages everything from an online portal. Building it taught me a few things I would not have learned from a tutorial.

## The counter decides the design

A POS screen looks simple until someone has to use it with a customer waiting. The cashier needs the next action to be obvious, a mistake to be easy to correct, and the total to be right every time. I stopped asking "what can the system do?" and started asking "what does the person at the counter do next?" Everything else, including reports and settings, came after that.

## A shop cannot stop selling

Internet in a shop is not always steady. If the screen freezes when the connection drops, the shop loses sales, so the POS is built to keep working at the counter and sync with the online portal when it can. That choice shaped the whole design: where data lives, how branches stay consistent and what the owner sees on the portal. I wrote more about the idea in [Offline-first for shops](/writing/offline-first-shops).

## Build a virtual printer

Testing receipts on a real printer is slow, and it is hard to do for every branch. So I built a virtual printer: it receives the same print output, but shows it on screen so I can check the receipt before anything is printed. It sounds like a small tool, but it made testing much easier, because I could check the output of every change without leaving my desk.

## Two parts, one system

There are two parts to the work: the in-shop POS and the online management portal. I try to keep them consistent and not let them drift apart, because the owner trusts the portal for what happened at the counter.

## Still learning

Going from 3 branches to 9 will test the system again. I would rather keep it simple, check it with real use and fix what the shops show me than add features nobody asked for. You can see the system on the [Work page](/work).
