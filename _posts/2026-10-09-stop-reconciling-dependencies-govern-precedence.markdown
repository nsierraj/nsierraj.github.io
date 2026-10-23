---
layout: post
title:  "Stop Reconciling Dependencies. Govern the Precedence of Tools"
date:   2026-10-09 00:00:00 -0000
categories: general
tags: [servicenow]
---
I published a new article on LinkedIn. Read it here:
[Stop Reconciling Dependencies. Govern the Precedence of Tools](https://www.linkedin.com/pulse/stop-reconciling-dependencies-govern-precedence-tools-amado-sierra-0dlre).

## The short version

Most IT shops already have dependency data from several places: Discovery
populating the CMDB, the observability platform's service map, and the cloud
provider's own view. Each refreshes on its own schedule, so they give close but
different answers to the same question. The usual fix is a project to reconcile
everything into the CMDB, and it rarely finishes.

The problem isn't visibility anymore. It's that the sources conflict. The change
manager trusts CMDB relationships, the on-call engineer trusts the service map,
and the FinOps analyst trusts cloud tags, and they only compare notes after an
outage. Automation makes this worse, because it doesn't notice the
contradiction. It picks one source and runs.

## Why reconciling everything fails

Each tool models dependencies to answer a different question. Discovery knows
what is installed and configured, but lags behind. Observability knows what is
communicating right now, but misses anything quiet during the sampling window.
The cloud provider is precise about its own resources and blind to the rest.
Merging them strips out what made each one trustworthy, and the result is an
average, not the truth.

## Write the precedence rule

Instead, write a short rule that says which source wins for each type of
decision:

- **Change impact:** Discovery relationships by default, overridden by
  observability when it shows a live dependency the CMDB lacks.
- **Incident blast radius:** Observability first. The CMDB contributes ownership
  and support group.
- **Cost and ownership:** Cloud tags and billing, tied to the business
  application record so every cost has an owner.
- **Automation inputs:** For each automated action, name the data source, set a
  staleness threshold, and define what happens when sources disagree, such as
  pausing to ask a human. "Whatever the integration last pulled" is not an
  answer.

Keep the rule in the operational runbook, give it an owner in the configuration
practice, and review it whenever a tool is added or retired.

## What it changes

- Discovery scope shrinks to what change management needs, and the CMDB stops
  pretending to be real-time.
- Tool overlap stops being a procurement debate, because each tool is the
  authority for the decisions it handles best.
- Automation gets a safety rail: when discovery and observability disagree, the
  change goes to a human instead of being auto-approved.
- Audit conversations get shorter. "Here is which tool we trust for which
  decision, and why" is a defensible answer.

## A quick test

Pick one business-critical application and ask the change manager, the on-call
lead, and the cloud cost owner separately what depends on it and where they got
the answer. If the answers differ, you have a hidden conflict, and the question
that matters is which one your automation uses.

The tools were never going to agree. Decide who wins, write it down, and have
automation read the rule instead of the noise.
