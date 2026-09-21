# Resources

The gated documents (docs/27: gate the document, never the knowledge). One folder per resource,
numbered as on the site. Each holds the render script, the finished PDF, any editable companion
(.xlsx or .docx), and `lead-magnet-entry.js`, the block to paste into the site's
`data/lead-magnets.js`. The site repo carries the published copies in `public/downloads/`.

| Folder | Resource | Companion | Status |
|---|---|---|---|
| `04-licence-audit` | The one-hour licence audit: find out who actually uses the AI you pay for | `AI-licence-audit-sheet.xlsx` | Built 21 Sep 2026, not yet on the site |

Resources 01 to 03 (AI usage policy, prompt library, week four review) predate this folder and
live only in the site repo.

Rules: 4 to 12 pages, A4, house resource style (wordmark spaced, hairlines, one tinted panel per
page at most), every path or number sourced with a date, "not legal advice" where UK GDPR,
employment or contracts are touched, example rows marked illustrative. Render with
`node resources/<folder>/render-pdf.mjs` from the repo root.
