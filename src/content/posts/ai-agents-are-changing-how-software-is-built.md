---
title: "AI agents are changing how software is built"
date: "2026-11-25"
summary: "How I use coding agents as a developer who reads code more than he writes it, and where I still do the thinking myself."
tags: [ai, agents, workflow]
draft: false
category: tech
cover: "/images/stock/writing-code-glasses.jpg"
coverAlt: "Glasses resting in front of monitors full of code"
coverCredit: "Photo: Kevin Ku / Pexels"
---

*A draft from my own experience. Your workflow may be different.*

A few years ago, building software meant typing every line yourself. Today I describe a task to an AI coding agent, such as Codex or Claude, and it writes the code, runs the tests and shows me what changed. I read the result. That has changed what my job is.

## What moved to the agent

Typing, boilerplate, wiring pages to data and fixing a lot of small errors now happen faster. A task that used to take a day of typing can become an afternoon of reviewing. For a student working alone on client projects, that is a real difference.

## What stayed with me

The agent does not decide what the system should be. I decide the data model, the roles and permissions, what happens when the network fails and which features are not worth building. I write those decisions down in plain language so the agent has something precise to follow. A vague request gives vague code.

## Reading is the skill

I understand code well enough to read it, and that matters more now than ever. An agent can write something that looks right and runs, but is wrong in a way that only shows up later: a missing check, a duplicated record, a rule that is not enforced. Tests help, but a person has to know what to test.

## Where I'm careful

- I never accept a large change I have not read.
- I keep tasks small, so a mistake is easy to find.
- I do not paste secrets or customer data into a tool.
- I check the result on the real thing, not only in tests.

## My take

I think agents will make good developers more productive and will not remove the need for them. The work moves towards design, review and judgement. If you are learning to code now, I would learn the fundamentals, because they are what let you tell good output from bad.
