# viren/

Viren's personal profile. Five posts a week, weekdays, 07:30.

Recalibrated 21 September 2026. Everything drafted before that date was deleted; it argued for
the service, which makes it an advert. The law is in `brand.json` and it holds over everything
here: the post gives the thing away and never argues for what we sell.

## Where things are

| Path | What it is |
|---|---|
| `brand.json` | the law and the palette. Read this first |
| `plan.md` | how the week runs, who supplies what, the bar before anything ships |
| `formats.md` | every format, the evidence behind it, what it is for and what makes it fail |
| `queue.csv` | what is scheduled, when, with its asset and its status |
| `posts/week-NN.md` | the posts themselves, written in full, with the reasoning and the score |
| `posts/*.json` | card specs. `node viren/render.mjs <id>` writes `out/<id>.png` |
| `grids/*.json` | grid specs. `node viren/grid.mjs <id>` writes `out/<id>.png` |
| `lists/*.json` | numbered list cards. `node viren/list.mjs <id>` writes `out/<id>.png` |
| `versus/*.json` | comparison sheets. `node viren/versus.mjs <id>` writes `out/<id>.png` |
| `carousels/*.json` | decks. `node viren/carousel.mjs <id>` writes `out/<id>.pdf` plus review PNGs |
| `cards/` | the finished assets, tracked so Buffer can fetch them by raw URL |
| `assets/photos/` | real photographs, named as the carousel JSON asks. Nothing stock, ever |
| `bank/` | Viren's own material: moments, numbers, stories, voice notes. Currently empty |
| `references/` | everything we learn from, each entry scored, with what we took and what we left |

## The renderers

Four, all 1080x1350, all in the same greens.

`render.mjs` two card templates: `prompt` (one real prompt, deep green) and `tweet` (near-black,
his face, the tick, a position). `grid.mjs` one topic covered to exhaustion. `list.mjs` five numbered steps, each ending in the
exact thing to do. `versus.mjs` one
pair held side by side six times. `carousel.mjs` decks, with `cover` / `prompts` / `note` /
`close` for designed slides and `photocover` / `photo` for photographs.

Footers and bylines are optional everywhere. Leave them off single-idea cards; put them on
anything a stranger might screenshot out of context.

## The bar

Scored on the five in `references/README.md`: virality, shareability, applicability,
cleanliness, saveability. Then: does it sell anything (it must not), is every word plain, is the
hook under forty characters and complete above the fold, is there a question close (there must
not be), and does every numbered item give the words rather than the advice.

## Scheduling

Everything runs through Buffer's own queue on the Viren Samani channel. Nothing is pinned to a
fixed time any more: each post is `addToQueue`, so it takes the next free slot in the channel's
posting schedule, and changing that schedule re-flows every queued post at once. That makes the
posting schedule in Buffer the single place timing is decided.

`queue.csv` records what is in the queue, the slot Buffer assigned it, and the Buffer post id.
It is a log, not the schedule. Rows marked blocked or held are not in Buffer at all.

The AI for Companies page is a separate channel and is currently locked, so Buffer refuses
every edit and delete on its twenty-four queued posts.
