# Research Trail 🧭

**Trace how an investigation develops from question to claim.**

Research Trail is an open research tool from **How Intelligence Works** for recording the development of an investigation as questions, ideas, assumptions, sources, hypotheses, predictions, analyses, findings, decisions, and claims emerge and change.

The project is designed around a simple problem: a finished research output often preserves the final claims but loses the path by which those claims developed. Research Trail makes that path inspectable without treating exploratory and iterative research as if every question and proposition had been fixed at the beginning.

## What it does

Research Trail records three things separately:

1. **Entry type** — what the object currently is: question, idea, source, evidence, observation, assumption, interpretation, hypothesis, prediction, analysis, decision, finding, claim, or note.
2. **Provenance** — where it came from: human researcher, AI, source material, data/analysis, joint human–AI interaction, software/tool, reviewer/external person, or other.
3. **Epistemic status** — the current grounds for treating it as open, speculative, under investigation, supported, contradicted, unresolved, superseded, rejected, or used in an output.

Entries can be related using links such as `prompted by`, `derived from`, `supports`, `contradicts`, `tests`, `refines`, `supersedes`, `uses`, `responds to`, and `becomes`.

## Guided use cases

The current alpha begins from four real research situations:

- **Start a new investigation**
- **Capture something that changed my thinking**
- **Develop or test a hypothesis**
- **Audit a claim**

The interface grows with the investigation rather than presenting the researcher with a large compliance form.

## Research Trail and Search Check

The two tools address different parts of research traceability.

**Search Check** examines how evidence enters an investigation: search intention → query → retrieval → relevance → benchmark recovery → evidence corpus.

**Research Trail** records what happens as the investigation develops: question → idea → source/evidence → assumption/interpretation → hypothesis/prediction → analysis → finding → claim.

A Search Check evidence package can therefore become a referenced evidence object inside a Research Trail investigation without duplicating the search-validation function.

## Run

This alpha is a static browser application. Open `index.html` locally, or deploy the repository as a static site.

No server-side account or permanent project storage is required. Export the investigation before closing or refreshing the browser session.

## Exports

- portable Research Trail JSON;
- flat CSV entry table;
- human-readable HTML audit report.

The JSON is the canonical portable representation in this alpha.

## Specification

- [`docs/DESIGN.md`](docs/DESIGN.md) — purpose, boundaries, and interaction model
- [`docs/DATA_MODEL.md`](docs/DATA_MODEL.md) — entities, provenance, epistemic status, relationships, and integrity fields
- [`docs/METHODOLOGY.md`](docs/METHODOLOGY.md) — methodological principles and limits
- [`schemas/research-trail.schema.json`](schemas/research-trail.schema.json) — machine-readable export schema
- [`examples/example_investigation.json`](examples/example_investigation.json) — small synthetic example

## Status

**v0.1.0a1 — experimental alpha.**

This release is intended for real-world testing of the interaction model and data structure. It does **not** certify scientific validity, replace field-specific research standards, or determine whether a proposition is true.

## License

MIT. See [`LICENSE`](LICENSE).
