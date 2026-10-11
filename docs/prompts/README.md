# The post prompts

Written 11 October 2026, after the owner rejected the week of 12 October as too corporate,
too hard to understand at a glance, and carrying cards that gave the reader nothing on their
own. **For the company page, this folder now wins over `docs/14`, `docs/18`, `docs/22` and
`docs/29` on what to write and how cards look.** `docs/01` (voice) and `docs/10` (the
sourcing gate) still win over everything.

Each style file was researched separately: our own creator study (`docs/23`,
`references/`), plus outside evidence opened on 11 October 2026 and cited in the file. Each one
contains the aim, the evidence, **a production prompt to run verbatim**, worked examples, a
before/after of a rejected post, and a fail list.

## Who we are writing for now

Owners and managers of UK firms of roughly 5 to 250 staff who are not technical and are a
little intimidated: dental practices, estate agents, accountants, trades, cafes, recruiters,
charities. Not large corporates. Every post must be understood in one second by someone who has
used ChatGPT once, and must never make them feel behind or stupid.

## The card law

1. The card alone gives the reader something usable, even if they never read the caption.
2. Title and value. Nothing else: no eyebrows, slogans, decorative photos or illustrations.
3. One typeface, two content sizes, sized to fill the canvas. No empty bands.
4. Body never below 34px at 1080 wide.

`lib/cards2.mjs` enforces 3 and 4 automatically and throws if content cannot fit.
`00-card-system.md` has the templates, field limits and samples.

## The styles

| File | Style | What it is for | Card |
|---|---|---|---|
| `01-cheatsheet.md` | Cheat sheet | A thing to save and forward: the exact words to type for 3 to 6 jobs | cheatsheet |
| `02-prompt-and-result.md` | Try this | One everyday job, the prompt, and what comes back | prompt + result, as a 2-page PDF |
| `03-stat-news.md` | Stat | One sourced number about firms like theirs, and what to do about it | stat |
| `04-opinion.md` | Opinion | A take an owner nods at or argues with, ending on a step to try | statement |
| `05-carousel.md` | Carousel | A beginner goes from nothing to one finished result | carousel PDF |
| `06-roundup.md` | Roundup | What changed in the tools they already pay for, and what to do | roundup |
| `07-relatable.md` | Relatable | A recognisable moment where the joke is the lesson | beforeafter, statement, cheatsheet |
| `08-promo.md` | Ours | Our free resources, giving away the substance in the post | cheatsheet, prompt or carousel |

## The mix, per ten posts

Replaces the band mix in `docs/22` section 2 for the page. Usable beats news for this reader.

| Style | Per 10 |
|---|---|
| Try this (prompt and result) | 2 |
| Relatable | 2 |
| Cheat sheet | 1 |
| Stat | 1 |
| Opinion | 1 |
| Carousel | 1 |
| Roundup | 1 |
| Ours | 1 |

Never two of the same style back to back. The morning slot takes the post most likely to be
saved or sent.

## How a batch run uses this folder

1. Decide the ten slots by the mix above.
2. For each slot, open the style file and run its production prompt as written, with the inputs
   it asks for. Do not paraphrase the prompt.
3. Render with `renderCard2(spec, outPath)` from `lib/cards2.mjs`. Prompt and result pairs and
   carousels are rendered as pages and bound with `slidesToPdf` from `lib/pdf.mjs`; page one's
   PNG is the Buffer `document.thumbnailUrl`, which Buffer requires.
4. Review every card with the Read tool at full size, not only on a contact sheet. Thumbnails
   hide empty bands and hierarchy problems.
5. Run each style file's self-check, then bank and schedule as `docs/19` and `docs/28` describe.

## Decisions taken on 11 October 2026

- **"I" is allowed inside prompt text only**, because a prompt is written in the reader's own
  voice ("I run a dental practice"). Never in captions or card titles.
- **Generated illustrations are not used**, because they carry no information. One gated
  exception is proposed in `07-relatable.md` section 3a (a step-by-step strip, every word set by
  our renderer); it needs a renderer template and the owner's approval of a test of three.
- **First comments are still written into the bank and not sent**: the page is on Buffer's free
  plan, which refuses them.
- **Roundup cards use the vendor's own wording** for anything about price or plan ("included at
  no extra cost", not "free").

## Errors the research found in earlier work

- `2026-10-01-week-four-promo` named three numbers that do not match the article it links to.
  Held; replaced by `2026-10-16-week-four-numbers`.
- `2026-10-05-prompts-reuse-promo` claims "the three that get opened most", which nothing backs.
  Held.
- The 2 October roundup told readers to ask their workspace administrator about the ChatGPT
  Privacy Center. OpenAI lists that feature for Free, Go, Plus and Pro, not Business.
- `docs/01` section 6 says LinkedIn's March 2026 update names the comment-to-get-the-guide
  pattern. LinkedIn's 12 March 2026 post names "comment to agree" and click-driven posts, not
  that pattern. The practice stays banned; the citation was wrong.
