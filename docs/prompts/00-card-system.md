# 00. The card system: title and value

Built 11 October 2026 after the owner rejected the six-jobs grid (`cards/2026-09-23-six-jobs-grid.png`):
"No immediate value gained from the picture. Every infographic should on its own be adding
tremendous value. Space isn't properly utilised, too many font sizes. Should be title and value."

Code: `lib/cards2.mjs`. Every copy prompt in `docs/prompts/` specifies its card as one of the JSON
shapes below, and `renderCard2(spec, outPath)` turns it into a 1080x1350 PNG (a carousel becomes
`<name>-01.png`, `<name>-02.png` and so on).

```js
import { renderCard2 } from './lib/cards2.mjs';
import { close } from './lib/render.mjs';
await renderCard2({ template: 'stat', number: '35%', meaning: '...', action: '...', source: '...' }, 'out/x.png');
await close();
```

## The rules

1. **The card is the value.** A reader who never opens the caption still leaves with the thing:
   the words to type, the check to run, the number and what to do about it. A teaser title
   ("The policy nobody reads") with a vague line under it fails.
2. **Title and value. Nothing else.** No eyebrow, kicker, slogan, category pill, save line,
   decorative photo or illustration. The only extras allowed are ones that carry information:
   tool logos next to a tool's name, a pill marking a gap in a result table.
3. **One typeface.** Instrument Sans, weights 400 and 700. Newsreader and JetBrains Mono are not
   used on cards. (The wordmark is a logo file, not type.)
4. **Two content sizes, one footer size.** Title (`--t`) and body (`--b`). Everything that is not
   the title is body size, including labels, table headers, notes and the prompt box. The footer
   is 24px. Hierarchy inside the body comes from weight (700) and the accent colour, never from a
   third size.
5. **Sizes are computed, not chosen.** The in-page fitter starts body at the template's maximum,
   sets title = body x ratio (clamped), shrinks the title first if it wraps past its line limit or
   runs too wide, then steps body down 1px at a time until the content fits between title and
   footer. Whatever space is left (under one body step) is spread evenly between items. No
   template positions anything by hand.
6. **Body never below 34px.** If the content does not fit at 34px, rendering throws:
   `cards2 cheatsheet: content does not fit at body 34px. Shorten items[0].value (over by 260px)`.
   The field named is the tallest one, which is the cheapest cut. Fix the copy; never shrink the
   floor.
7. **Fill the canvas.** 76px top, 72px sides, footer at the bottom. Items sit on 2px hairlines
   with even rhythm. No empty band anywhere: if a card has a band, the copy is too short for the
   template or the template is wrong.
8. **Colour.** Stone ground (`ink` #f5f5f2), near-black type (`heading` #17211c), one accent:
   brand green (`grow` #1f5a3e). Green is for labels, the one highlighted phrase in a title
   (`*like this*`, once per card), rules under table headers, the prompt box bar and the stat
   number. Carousel cover and end slides use the deep green ground (`growdeep`) with white type
   and `growlight` for the highlight. White (`surface`) is only for the prompt box and the "after"
   panel.
9. **Footer.** A 2px hairline, the AIforCompanies wordmark (30px high, brand green, or white on
   deep green) on the left, and on the right one of: the source, "Illustrative example", or the
   slide counter ("3 / 7"). Nothing else. No URL, no "Try this week", no save or share line.
10. **Plain words on the card.** Reading age about 12, contractions welcome, tools named plainly.
    House rules from the brief apply to every word on the image: UK English, no em dashes, no
    exclamation marks, no emoji, dates as 20 July 2026, every number sourced and dated.

### What is banned on a card

Eyebrows and kickers; more than one highlighted phrase; a third text size; italics; Newsreader;
boxes around every item (hairlines only); grids of teaser cells; decorative photos, icons or
illustrations; save, share, follow or comment lines; URLs; a statistic without its source in the
footer; invented results that are not marked "Illustrative example".

## Templates

Character counts include spaces. "Safe" limits were tested with long realistic prose and all
render at body 34px or above; the renderer will accept somewhat more, but write to these.
Titles on every list-style template: **70 characters (about 12 words) at most**.

### cheatsheet

The six-jobs grid, done properly: the situation, then the exact words.

```json
{"template":"cheatsheet","title":"","items":[{"label":"","value":""}],"source":""}
```

| Field | Safe limit |
|---|---|
| title | 70 |
| items | 3 to 6 |
| label | 30 (one line, 2 to 5 words) |
| value, 3 items | 220 |
| value, 4 items | 150 |
| value, 5 items | 105 |
| value, 6 items | 100 (about 16 words) |
| source | 90, optional |

Values that are words to type go in curly quotes. Fit ratio: title = 1.55 x body, body 34 to 60.

### stat

```json
{"template":"stat","number":"","meaning":"","action":"","source":""}
```

The number is the title size (up to 420px) in green. Meaning in regular weight; action in bold
behind a green bar. The source sits in the footer and is required.

| Field | Safe limit |
|---|---|
| number | 6 characters ("35%", "1 in 3", "£4.25m") |
| meaning | 160 |
| action | 140 |
| source | 90, publisher, title and date |

### prompt

```json
{"template":"prompt","title":"","prompt":"","attach":"","tools":["ChatGPT","Copilot","Gemini"]}
```

Renders as: title; "Type this into [logo] ChatGPT, [logo] Copilot or [logo] Gemini" in bold
green; the prompt in a white box with a green bar; "Then attach ..." under it. Logos come from
`viren/assets/logos/` and are skipped for any tool without a file.

| Field | Safe limit |
|---|---|
| title | 70, the moment then the result |
| prompt | 360 (60 words) |
| attach | 90, reads after "Then attach" |
| tools | 1 to 3 names |

### result

```json
{"template":"result","title":"","header":[""],"rows":[[""]],"note":"","illustrative":true}
```

A table at body size: header in green over a green rule, first column bold, hairlines between
rows. A cell starting with `!` is a gap and renders as a green pill ("!No one", "!Not set"); use
pills for gaps only. The note sits under a green rule in bold. The footer reads "Illustrative
example" unless `illustrative` is false, in which case it shows `source`.

| Field | Safe limit |
|---|---|
| title | 70 |
| columns | 2 or 3 |
| rows | 1 to 6 |
| first cell, 4 rows | 90 |
| first cell, 6 rows | 60 |
| other cells | 12 (a name, a day, a pill) |
| note | 110 |

### statement

```json
{"template":"statement","text":"","sub":""}
```

The sentence fills the card at title size (up to 132px), vertically centred; the optional sub
sits under a green rule at body size. One `*highlight*` allowed.

| Field | Safe limit |
|---|---|
| text | 140 |
| sub | 60, optional |

### roundup

```json
{"template":"roundup","title":"","items":[{"tool":"","change":"","do":""}],"source":""}
```

Each item: tool name in green with its logo, what changed, then "Do: ..." in bold.

| Field | Safe limit |
|---|---|
| title | 70 |
| items | 2 to 4 |
| change and do, 2 items | 180 each |
| change and do, 3 items | 100 each |
| change and do, 4 items | 55 each |
| source | 90, required: every change must be checked against its maker's page |

### beforeafter

```json
{"template":"beforeafter","title":"","before":{"label":"","text":""},"after":{"label":"","text":""}}
```

Before on a grey panel with a muted label; after on a white panel with a green border and green
label.

| Field | Safe limit |
|---|---|
| title | 70 |
| labels | 24 |
| before.text | 80 |
| after.text | 300 |

### carousel

```json
{"template":"carousel","slides":[{"kind":"cover|step|end","title":"","body":""}]}
```

6 to 9 slides. Cover and end on deep green, title filling the slide (up to 180 and 190px);
steps on stone. Every step slide in a deck uses the same title and body size: the largest that
fits the fullest step. In a step body, a paragraph (split on `\n`) that starts with a quote mark
becomes the white "type this" box, and that box stretches to the footer so shorter steps do not
leave a band. Footer right shows "n / total" on every slide.

| Field | Safe limit |
|---|---|
| cover title | 120 |
| cover body | 90 |
| step title | 60 |
| step body | 260 |
| end title | 80 |
| end body | 110, no call to action beyond what the post itself allows |

## The type scale the fitter lands on

Measured on the samples (title / body, px):

| Template | Title | Body |
|---|---|---|
| cheatsheet, 6 items | 56 | 34 |
| stat | 384 (number) | 59 |
| prompt | 74 | 49 |
| result, 5 rows | 70 | 44 |
| statement | 132 | 48 |
| roundup, 3 items | 65 | 42 |
| beforeafter | 84 | 56 |
| carousel cover, end | about 116 to 150 | 40 to 52 |
| carousel step | 80 | 58 |

Footer: 24px. Ranges by template: body 34 to 76, title 56 to 104 on list cards.

## Samples

All in `out/proto/`, rendered from realistic copy for a UK small business owner:

- `cheatsheet.png` six things to copy into ChatGPT, Copilot or Gemini
- `stat.png` ONS, Artificial intelligence in UK businesses: 2023 to 2026, 20 July 2026: around
  35% of businesses with 10 or more employees use at least one AI technology, up from around
  12% (source opened 11 October 2026; BICS wave 159, 38,637 responding businesses; the article
  gives no separate sample size for the 10-plus band)
- `prompt.png` a calm reply to a complaint
- `result.png` meeting notes into a job list, marked "Illustrative example"
- `statement.png` the tool you already have
- `roundup.png` where the AI you already have is hiding (footer marks it as a layout sample: check
  each line against the maker's page before publishing)
- `beforeafter.png` what most people type against what works
- `carousel-01.png` to `carousel-07.png` five jobs, one a day
- `contact.png` all fourteen side by side

## What changed from docs/29 and why

docs/29 was written for prompt-and-result pairs aimed at managers at larger firms. The owner's
verdict on 2026-09-23-six-jobs-grid moves the audience to small and medium businesses that are
not technical, and asks for "title and value" with fewer sizes and no wasted space.

- **Kept:** one headline that says the moment and the result, with the result phrase in green
  (rule 2); every prompt has a result to show (rule 6); tables read in one pass with pills only
  for gaps (rule 7); "Illustrative" on invented output; the caption test for every line (rule 8);
  no photograph or byline on carousel interiors.
- **Overruled: the tools row of chips, the category pill and the Attach file chips** (rule 1).
  They were a third and fourth size of type and an eyebrow by another name. The tools are now
  said in a plain sentence at body size, "Type this into ChatGPT, Copilot or Gemini", with the
  logos inline, and "Then attach ..." is a sentence too.
- **Overruled: the fixed hierarchy of 68, 44 and 30px** (rules 1 and 3). Three content sizes
  became two, and sizes are computed per card to fill the space, with 34px as the floor.
- **Overruled: the save or share line** (rule 5). It is chrome that competes with the value,
  and the brief bans anything that reads as engagement bait. The footer now carries only the
  wordmark and the source, "Illustrative example" or the slide counter.
- **Overruled: dark green prompt cards and the Newsreader display face** (docs/25 type rules).
  One typeface on a stone ground, with deep green kept for carousel covers and ends, so the feed
  card reads like the plain black-on-white lists that perform for Hassid and Hills.
- **Overruled: "the space below the content is the design"** (docs/25, Air). The owner said the
  opposite. Content now fills from title to footer.
- **Overruled: the end slide byline and CTA** (rule 4). The end slide is a title and one useful
  line, like every other card.
