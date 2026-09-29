# Data Model

## Project

A Research Trail export contains one investigation object.

Required core fields:

| Field | Meaning |
|---|---|
| `schema` | Research Trail schema/version identifier |
| `id` | Investigation identifier |
| `title` | Human-readable investigation title |
| `starting_question` | Initial question/problem |
| `mode` | Broad investigation mode |
| `created_at` | ISO-8601 creation timestamp |
| `entries` | Ordered trail entries |

Optional project fields include `owner` and `exported_at`.

## Entry

Each entry is an epistemic object or research event.

| Field | Meaning |
|---|---|
| `id` | Entry identifier |
| `type` | Current entry category |
| `origin` | Provenance category |
| `title` | Concise statement |
| `content` | Context/detail |
| `status` | Current epistemic status |
| `parent_id` | Earlier entry to which this entry is explicitly related |
| `relation` | Semantic relationship to `parent_id` |
| `source_ref` | External identifier/reference, if any |
| `reason` | Reasoning, uncertainty, correction, or decision note |
| `created_at` | ISO-8601 timestamp |
| `previous_hash` | Hash of the previous entry |
| `hash` | SHA-256 hash of the serialized entry at creation |

## Entry types

Current alpha vocabulary:

`question`, `idea`, `source`, `evidence`, `observation`, `assumption`,
`interpretation`, `hypothesis`, `prediction`, `analysis`, `decision`,
`finding`, `claim`, `note`.

These labels describe the role an entry has in the investigation; they are not claims about truth.

## Origins

`human`, `ai`, `source`, `data`, `joint`, `tool`, `reviewer`, `other`.

Provenance and epistemic status must remain independent.

## Epistemic status

Current interface vocabulary:

- Captured — not yet evaluated
- Open question
- Speculative
- Being investigated
- Supported
- Partially supported
- Contradicted
- Unresolved
- Superseded
- Rejected
- Used in output

## Relationships

Current alpha vocabulary:

`prompted by`, `derived from`, `supports`, `contradicts`, `tests`,
`refines`, `supersedes`, `uses`, `responds to`, `becomes`.

The distinction between these relationships is intentional. In particular,
`prompted by` must not be interpreted as `supports`.

## Integrity chain

Each new entry records the previous entry's hash and its own SHA-256 hash.
This provides tamper-evidence for the exported sequence; it is **not** a
cryptographic identity, timestamp authority, signature, or immutable external
ledger. A future release may add signed manifests or external anchoring.

## Versioning

The alpha schema identifier is `research-trail/0.1`. Breaking changes should
use a new schema identifier and document migration behavior.
