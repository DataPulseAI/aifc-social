# The reference library

Everything we learn from, in one place, with the reason it is here. Consolidated 23 September
2026 from `viren/references/` and `bank/creators/`. Nothing is copied; the mechanism is taken and
the content is ours. `SYSTEM.md` at the repo root says which mechanics we run and when; this file
says where each one came from and what the evidence is.

| Folder or file | What is in it |
|---|---|
| `creators/` | one note per creator or source, 19 files: post archetypes, hooks, visual pattern, funnel mechanic, what transfers |
| `scoring.md` | every supplied reference image marked out of five on virality, shareability, applicability, cleanliness, saveability, with what was taken and what was left |
| `claims.md` | the platform figures we are allowed to quote, each with verdict, edition, source and date. Nothing else gets cited |
| `winners/` | every post that beat its own author's median, ranked by the multiple; plus `2026-09-23-engagement-pass.md`, `<creator>-contact.jpg` and `img/` (56 top-engagement images from seven creators, captured through the browser at 480px, with per-creator JSON of reactions, comments, reposts, length and hook) |
| `top-content/` | a hundred posts LinkedIn curated across ten industries, fourteen images annotated, `posts.json` |
| `lara/` | twenty of Lara Acosta's post images with counts and image type |
| `supplied/` | the images Viren sent in |
| `authoredup/` | the 310,000-post hook study and eleven worked viral examples |

## The pattern library: mechanic, evidence, our version

Each row is one thing that reliably travels. The renderer column is what builds it in our brand;
the status column is honest about what exists.

| Mechanic | What it is | Evidence | Our renderer | Status |
|---|---|---|---|---|
| Grouped library with a number | one subject covered to exhaustion, colour-grouped, on one saveable image | Hills 4.3x and 3.0x, Hassid 3.5x and 3.2x, Mindstream 50 use cases (5/5 saveability); reposts 100 to 300 | `viren/grid.mjs`, page `grid` template | built, `25-prompts` shipped |
| Numbered list with the exact words | five items, each a bold lead-in, one line, and the sentence to say or type | strongest single image in the library, 482 reactions, 178 comments, 44 reposts (Vanourek); `tc-62` highest combined score from a 39k account | `viren/list.mjs` ("Do this" chip), page `plainlist` | built, `find-your-four` |
| Comparison sheet | one pair held side by side six times, common version left, working version right | 75 reposts against 83 comments (Knight), the highest repost ratio in the set | `viren/versus.mjs` | built, `asked-vs-answered` |
| Prompt card | one real prompt, full length, readable on a phone, what to attach beneath | Hassid `tc-13` (5/5 virality and saveability); the cheapest post to make well | `viren/render.mjs` `prompt` | built, eight in the queue |
| Voice card | near-black, face, tick, two or three lines, a belief he will defend | Lara's tweet cards (4 of her top 20); Hormozi 3,828 on four lines, but that is his audience, not the format | `viren/render.mjs` `tweet` | built |
| Document post, 8 to 10 slides | cover promises one thing, slide two pays, one idea a slide | documents 1.39x reach and 1.30x engagement (AuthoredUp, 3M posts); 8 to 10 slides best (van der Blom 2025); Cole's 24-page deck works because every page stands alone | `viren/carousel.mjs` (`cover`, `prompts`, `note`, `close`) | built |
| Photo carousel and the hybrid | full-bleed photographs, bracketed number, one lowercase line; or a photo cover with designed slides after it | Gray's ten habits, 460 reactions and 253 comments; comments per reaction is the tell for a person | `viren/carousel.mjs` (`photo`, `photocover`) | built, blocked on real photographs; nothing ships on a placeholder |
| A real room or person | a photograph of somewhere Viren was, and a line someone said | Viren's own best multiple (6.8x, Convo #01); 12 of Lara's top 20; images with people up to 50% better (van der Blom 2025) | none needed; the photograph is the card | runs whenever `bank/moments.md` has a line |
| The original count | "we checked N things a firm pays for, M do X", a number nobody else has | Grandillon 4.2x from a 69-median account; Banks 3.1x; Section's whole business on one owned figure | page `count` template | built, never yet run with our own count |
| The correction | a belief the buyer holds, corrected with a source | Heather's Copilot-picks-a-model post, her only news post in her top ten; Donnelly's "people think X is just Y" | page `correction` template | built, running |
| Permission | "you are not behind, pick one tool" said by someone who could say otherwise | Hassid 2.5x and 1.9x, Donnelly 5.8x and 4.9x, Heather 1.5x admitting a gap | voice card or text | runs as a person post, one a fortnight, only when true |
| Annotated teardown | a real artefact shown whole with labelled callouts, or before and after side by side | `tc-81` and `tc-8`, 5/5 shareability; the "old versus new" Viren asked for | not built | backlog, after Resource 05 |
| Nested layers diagram | six concentric panels, outside in, the reader's Monday action at the centre | 762 reactions and 77 reposts on a single image with no face | not built | backlog, only with the reader's action at the centre and the link out of the image |
| One highlighted sentence | one line, black on off-white, the half that matters in yellow | Welsh `tc-5`, the cleanest image in the hundred | `tweet` without the face, or a `render.mjs` variant | not built; ten minutes when wanted |

## What we refuse, and why

The "Most people" opener, the one-sentence-per-line stack, the triple, "It's not X, it's Y",
comment-to-get-the-resource, the question close, the four stacked asks, building in public,
stock photographs of empty offices, and any statistic about how badly people are doing. Each is
either banned in `docs/01`, punished by the platform, or works only for an account with 300,000
followers absorbing the cost. The reasons per creator are in `creators/`.

## Adding to the library

A new creator gets one file in `creators/` in the fixed structure (archetypes, hooks, visual
pattern, funnel mechanic, transfer, sources). A new image goes in `supplied/` and gets five marks
in `scoring.md` with a taken-and-left line. A new figure goes in `claims.md` with edition,
source and date, or it is not quoted anywhere. Images on LinkedIn's media host cannot be fetched
from the cloud or this Mac's shell; save them by hand from the browser into `supplied/` under a
descriptive name. The Evolving AI company page (linkedin.com/company/evolving-ai) was flagged by
Viren on 22 September as a source of strong article posts and has not yet been read.
