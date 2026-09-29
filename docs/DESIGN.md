# Design

## Core question

Research Trail is designed to answer:

> **How did this investigation get from its starting question to its eventual claims?**

The tool treats an investigation as a developing set of epistemic objects and relationships rather than as a finished manuscript or a checklist completed retrospectively.

## Problem

During iterative research, important transitions are easily lost:

- reading a source prompts a new question;
- an observation becomes an interpretation;
- an interpretation becomes a hypothesis;
- a hypothesis produces a prediction;
- analysis produces a finding;
- a finding is formulated as a claim;
- an earlier assumption is contradicted or superseded;
- a human and an AI contribute different parts of a line of reasoning.

Finished outputs commonly preserve the endpoint while obscuring these transitions.

## Design principles

### 1. Record development, not a fictional fixed beginning

Exploratory work can change direction. Research Trail preserves those changes rather than requiring all later questions to be represented as if they existed at project inception.

### 2. Separate provenance from epistemic status

`Origin: AI` says where an entry came from. It does not say whether the entry is correct.

`Status: supported` describes the current epistemic treatment of the entry. It does not say who generated it.

These are separate axes.

### 3. Preserve superseded and rejected objects

An investigation becomes more auditable when changes are visible. Earlier objects should be linked to later corrections, refinements, contradictions, or replacements rather than silently erased.

### 4. Relationships carry scientific meaning

A source that *prompted* an idea is not necessarily evidence that *supports* the resulting claim. The relationship type must therefore be explicit.

### 5. Auditability is not validity

The application can identify whether a trail contains visible questions, sources, links, hypotheses, findings, or claim derivations. It cannot certify that the research is scientifically valid.

## Current use cases

### Start a new investigation

The researcher records the initial problem/question and adds entries as the investigation develops.

### Capture a change in thinking

The researcher records an event—source, AI exchange, observation, analysis, reviewer comment, or other input—and identifies what new epistemic object it produced.

### Develop/test a hypothesis

The researcher can connect a hypothesis to its antecedents, predictions, evidence, analysis, and resulting findings.

### Audit a claim

The researcher can work backward from a claim and make its supporting or contradicting trail explicit.

## Relationship to Search Check

Search Check validates evidence retrieval. Research Trail records the investigation's epistemic development. Search validation is therefore upstream evidence provenance, not a duplicate feature inside Research Trail.

## Future design questions

The alpha deliberately leaves several questions open for testing:

- whether entries should support explicit state-transition events in addition to linked successor entries;
- how best to visualize branching and converging reasoning;
- how field-specific methodological expectations should be layered over a general investigation trail;
- how AI contribution provenance should interoperate with a broader provenance protocol;
- how external evidence packages and archived analyses should be referenced without copying them into the trail.
