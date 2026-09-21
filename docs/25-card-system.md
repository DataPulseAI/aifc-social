# 25. The card system

Rebuilt 21 September 2026. This replaces the type decision in `docs/06` section 5 (sans only,
bold, tight) and the house card (photograph under a gradient with a white sentence on it). Both
were designed to look like a publication in the feed. The read of 21 creator accounts in
`docs/23` found that none of the sixteen best-performing images used that shape, and the
AIforCompanies design system forbids two of its parts (type on a photograph, a gradient). So the
cards now come from the same system as the site.

## Where the rules come from

The design system artifact (`project/README.md`, `project/tokens.json`), synced from the site
repo on 18 September 2026. Its tokens are copied into `brand.json` under `tokens` and every
template names a token, never a hex. The legacy `colour` block in `brand.json` stays for the
carousel builder and points at the same values.

| Token | Used for |
|---|---|
| `ink` #f5f5f2 | The card ground. Every card starts here |
| `heading` #17211c | Display type, list items, roundup titles |
| `body` #3d4843 | Secondary lines under an item |
| `muted` #6b756f | Eyebrows, the source line, the kicker, the belief in a correction |
| `line` #daddd7 | Every hairline. Lists sit on hairlines, not in boxes |
| `grow` #1f5a3e | The mark, list numbers, the roundup publisher, the big count. Roughly one green thing per card |
| `growsolid` | The eyebrow dot |
| `growdeep` #143e2b | The carousel cover and outro ground, the one place white type belongs |
| `raised` #eff0ec | The ground behind a photograph while it loads |

**Type.** Newsreader at 500 for the statement, the count, the list numbers and the mark. Never
600, never bold: the browser synthesises it and it reads smeared. Instrument Sans at 400, 500 and
600 for eyebrows, items, the source line and the kicker. Nothing italic. Display type carries
`-0.015em` tracking and optical sizing. Headings balance, lists wrap pretty.

**The mark** is live type in the display face at one weight, AI and Companies in `grow`, "for" in
`heading`, in the footer of every card on a hairline, with the kicker (the format name or the
destination) at the right in the eyebrow style. It is never centred at the top any more, never
set in the sans, never bold.

**Air.** 80px top, 84px sides, 72px bottom. The footer is the only fixed element; content sits
at the top and the space below it is the design. A card that fills every pixel is a card that
will not be read in a feed at 550px wide.

**Photographs** sit in a 12px-radius frame on `raised`, 690px tall, with the sentence beneath.
Type never sits on the image. No scrim, no gradient. Under `docs/22` section 5 the image must
show the subject of the headline or the post runs on the `position` template instead.

## The templates, one per format

| Template | Format (`bank/formats.md`) | What it carries |
|---|---|---|
| `story` | the story | frame, eyebrow (publisher and date), one sentence |
| `plainlist` | the library, one task one hour | eyebrow, headline, up to twelve numbered items with an optional sub-line, on hairlines |
| `count` | the Monday count | eyebrow, one large number in `grow`, the claim, the source |
| `correction` | the correction | "What people think" in `muted`, a hairline, "What is true" in `heading`, the source |
| `position` | the position | the statement alone, 104px, and the mark |
| `roundup` | the week, read | four to six items, each publisher and date in `grow` small caps, title, why line |
| `grid` | do-this-Monday | two columns of numbered items on hairlines, `01` to `06` |
| `cover`, `tips`, `slide`, `outro` | carousels | `growdeep` cover and outro with white type, stone tips slides |

`news`, `stat`, `list` and `quote` still exist as names and map onto `story`, `count`,
`plainlist` and `position`, so `lib/card.mjs`, `carousels.mjs` and the scratch scripts run
unchanged. `lib/card.mjs`'s `newsCard()` now renders the framed story card.

Sizes scale down with item count inside floors (`plainlist` body 27px at twelve items,
`roundup` title 30px at six, `grid` title 29px at five rows). Past those counts the piece is a
carousel, as `docs/18` says.

## What the creators' images taught, and where it landed

- Hassid's 1,306-reaction card was a plain black list on white. `plainlist` is that, in the
  brand: the information is the design.
- Hills' grouped lists with a big number: the `library` format on `plainlist`, headline
  carrying the number, items grouped by sub-line.
- Donnelly's infographic maps travelled as saves, not reads. `grid` keeps the density without
  the boxes.
- Heather Murray's best news card was a screenshot with one box drawn on it. `story` takes a
  screenshot as its image when the subject is software.
- Every photo card that worked showed a person. Ours show a person only under the `docs/17`
  portrait rule; otherwise the thing, or no photograph.

## Rendering and review

`node scratch/cards-21sep.mjs` renders one of each template into `out/system/` with real copy
and builds `contact.png`. Look at the sheet before shipping any change to `lib/templates.mjs`,
and look at every card before it is scheduled, as `docs/17` already requires. Cards are
1080x1350, which is twice the width the feed draws them at; the design system's rule that a
raster is kept at twice its drawn size is already met.
