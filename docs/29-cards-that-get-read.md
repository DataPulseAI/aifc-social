# 29. Cards that get read

Decided 24 September 2026 on the two-quotes pair, then applied to every card in the library.
This is the standard for any image we put in a post, either channel. Where it disagrees with
`docs/25`, this wins; `docs/25` still holds for tokens, type and the page templates in `bank/`.

## The eight rules

1. **Intent at the top, in logos.** A prompt card opens with the tools it works in (Copilot,
   ChatGPT, Gemini, Claude as named chips), a category on the right (Buying, Inbox, Meetings,
   Clients, Numbers, Board) and an Attach row of file chips (PDF, Word, Excel, Sheets, Notes,
   Transcript, Email thread). The reader knows in one glance whether this is for them, before
   reading a word of the headline. Named logos, not logos alone; that was tried and reverted.
   Headlines run at 68px (62px when four lines threaten), prompts at 44px with 1.4 line height,
   attach at 30px: about 80 per cent of LinkedIn reading is on a phone at roughly half size.

2. **One headline: when, then what you get.** "Two quotes on your desk. Every gap identified,
   clause by clause, in one table." First sentence is the moment. Second is the result, and it
   is the one thing on the card set in the accent green (`*text*` in the spec). No eyebrow, no
   second heading, no slogan. The result card's lede does the same with its count.

3. **Hierarchy: headline, prompt, attach.** 60 to 66px, then 36 to 42px, then 28px. The prompt
   and its Attach line are one block with a 26px gap, centred in the space between headline and
   footer. Nothing else floats.

4. **One mark per post.** The page prompt card carries the white AIforCompanies wordmark
   (`viren/assets/brand/wordmark-white-clean.svg`, 38px high, no brain icon). The profile card
   carries Viren's photograph, name and tagline. The result card, list body, table, carousel
   interior slides and the versus sheet carry nothing. A carousel carries no photograph, name or
   wordmark on the cover or the content slides: the post header already says who it is from, so
   every slide spends its space on the content. It ends on one slide, aligned to the margin:
   photograph, name with tick and tagline once, a value line ("One of these a week. Something
   you can use before Friday."), and a single CTA. We do not promote ourselves on every slide.

5. **The save or share line, in LinkedIn's words.** Bottom right, lucide icon, one of:
   "Save for your next quote", "Save for Friday", "Save for your next meeting", "Share with a
   friend". One per post: the prompt card carries it, the result card carries none, a carousel
   carries one on its end slide. Never "Keep", never "Bookmark this", never a URL.

6. **Every prompt card ships with a result card.** What comes back, as the reader will see it.
   Headline "What comes back." and one plain line that counts what is on the card ("Four cells
   say not stated. Those are your four questions to the supplier before you sign."). Then the
   output and nothing else: no flow strip, no why blocks, no second explanation. Invented
   content carries "Illustrative data" in the footer and nothing more.

7. **Tables read in one pass.** Fixed column widths so header and rows line up. One short phrase
   per cell, the clause or source reference set small and muted after it. A gap in the source is
   a pill ("not stated", "No owner", "CHECK"); it is the only highlight on the card. Nine rows at
   most. No rule under the last row where a footer rule follows.

8. **The caption test.** If a line sounds like a caption someone would write about the card
   rather than a thing they would say to a colleague, it goes. Failed: "writes itself",
   "silence is a gap", "asked to trust a table", "quietly does not add up". Passed: "Two have
   nobody's name on them." Read every line aloud before rendering.

## Templates that carry the rules

| Template | File | Carries |
|---|---|---|
| `prompt` | `viren/render.mjs` | tools row, files row, category, headline, prompt + attach block, mark, save line |
| `table` | `viren/render.mjs` | headline, lede, fixed-column table with pills and muted refs, note, share line |
| `answer` | `viren/render.mjs` | headline, lede, labelled blocks or a numbered list with refs, note, share line |
| `figure`, `tweet` | `viren/render.mjs` | unchanged; photograph mark only |
| list | `viren/list.mjs` | head, numbered items, footer with photograph and save line (`keep`) |
| versus | `viren/versus.mjs` | head, pairs, footer with photograph and share line (`keep`) |
| carousel | `viren/carousel.mjs` | cover (no byline); interior slides counter only; close; `end` slide with byline, value line, one CTA |

Spec keys: `tools[]`, `files[]`, `category`, `keep{icon,text}`, `page` (wordmark instead of
photograph), `lede`, `blocks[]`, `items[]`, `rows[]` with `!` prefix for a pill, `fontSize`,
`rowPad`, `textSize`, `blockPad`, `ledeGap`.

## How each card ships (rule 12)

A prompt-and-result pair goes out as a two-page PDF document post, built with
`node viren/pair.mjs <name> <prompt-card> <result-card>`, title set to the card headline and the
prompt card PNG as the thumbnail. Two images would be cropped into a side-by-side collage in the
feed; a document shows page one whole and the result one swipe away, and document posts carry the
reach advantage in `references/claims.md`. A lone card ships as one 4:5 image. A carousel ships as
a PDF. The scheduling manifest for a batch lives at `viren/schedule-<first-date>.json`: one entry
per post with account, channel, dueAt, text, assets and a note, built from the plan file and
checked for the banned list before anything reaches Buffer. Assets must return 200 from
`raw.githubusercontent.com` before a post is created, which means the cards are pushed first.

## The pairs in the library, 24 September 2026

| Post | Prompt card | Result card | Category | Save or share |
|---|---|---|---|---|
| Two quotes | `2026-09-30-two-quotes(-page)` | `-result` (table) | Buying | Save for your next quote |
| The thread | `2026-10-06-the-thread(-page)` | `-result` (answer, four blocks) | Inbox | Save for your next long thread |
| The actions | `2026-10-07-the-actions(-page)` | `-result` (table, owner pills) | Meetings | Save for your next meeting |
| The spreadsheet | `2026-10-08-the-spreadsheet` | `-result` (answer, two blocks and four items) | Numbers | Save for the next handover |
| The update | `2026-10-09-the-update(-page)` | `-result` (answer, four headings, CHECK pill) | Clients | Save for Friday |
| The board paper | `2026-10-12-the-board-paper` | `-result` (answer, eight questions with paragraph refs) | Board | Save for the next board pack |

Every result card carries "Illustrative data". Replace with a real, permissioned output when one
exists; the real one always beats the invented one.
