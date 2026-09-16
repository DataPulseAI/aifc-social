# 18. Post types, and the tool that builds each one

Seven types. Each has a builder, a shape, and a reason it exists. The mix is what keeps
the page from reading like one machine doing one thing, which is exactly what it is.

A week of fifteen posts sits roughly at: seven news, two grids, two roundups, one
carousel, one guide, one share, two promos. Adjust from the Monday numbers, not from
taste.

---

## 1. news
**Template** `news`. **Asset** one 1080x1350 image. **Builder** `lib/card.mjs` `newsCard()`.

A photograph, the wordmark centred at the top, one sentence across the bottom. The story
goes in the post body. This is the house format and the majority of the feed.

```js
const r = await newsCard({
  headline: 'Only 18% of UK businesses use a large language model',
  tags: ['highstreet','retail','shops','town','uk'],
  subjects: [],          // named people only; see the portrait rule in docs/17
  size: 84,              // drop to 76 for a three-line headline
}, 'out/card.png');
```

Costs about 30 seconds a card. Check the photo against `docs/17` before accepting it.

## 2. grid
**Template** `grid`. **Asset** one image. **New, 16 September 2026.**

The numbered one-pager. A whole short list on a single saveable image: people screenshot
these and send them on, and saves are worth roughly five times a like in the ranking.

```js
await renderCard({
  template: 'grid',
  kicker: 'UK small business',
  lines: [{t:'What actually stops'},{t:'small firms',accent:true},{t:'using AI'}],
  size: 60,
  items: [{ title: 'Cost of software and setup', body: '53% named it...' }, ...],
  src: 'Enterprise Nation, 1,320 UK firms, 9 June 2026',
}, 'out/grid.png');
```

**Sizing is the whole game.** Two columns stay legible to about ten items with two-line
bodies. Past that the body type falls below what a phone can read in feed and the piece
should be a carousel instead. The template scales type down as the grid gets denser, with
floors: do not override `bodySize` below 21.

One accent line in the headline, never two. `src` in the footer whenever the list rests
on a figure, which it usually should.

## 3. roundup
**Template** `roundup`. **Asset** one image. **New, 16 September 2026.**

The link post that earns its link. Four or five items, each a publisher, a claim, and one
line on why it matters. The card carries the reasons, the post body carries the URLs.

```js
await renderCard({
  template: 'roundup',
  kicker: 'Worth reading',
  headline: 'Four things that landed this week',
  items: [{ source: 'DSIT', date: '8 Sep',
            title: 'The government published an AI risk toolkit, and it is a spreadsheet',
            why: 'Free, and it does the job most consultancies charge for.' }, ...],
}, 'out/roundup.png');
```

Four items fills the frame well, five fills it fully, three leaves it empty. Always name
the publisher and always link. Crediting other people's work is the cheapest goodwill
available and it is the format's whole premise.

## 4. carousel
**Templates** `cover`, `tips`, `slide`, `outro`. **Asset** one PDF. **Builder**
`carousels.mjs`, bound by `lib/pdf.mjs`.

Native documents are the highest engagement format on company pages at 7.00%. Shapes that
work are in `docs/14`: tips rather than long formal decks, a large clean first page, a
reason to save it.

Six to nine slides. Caption 0 to 100 characters, which carries 1.28x reach. Attach to
Buffer as a `document` asset with `title` and `thumbnailUrl`.

## 5. guide
**Templates** `grid` or a short `carousel`. **Asset** image or PDF.

A genuine how-to: the five prompts that work for a tender response, what to put in an AI
policy, how to run a fortnightly review. Ends pointing at the matching resource page.

The rule from `docs/16` applies hardest here. **Give away the substance in the post and
let the PDF be the convenience.** A guide that withholds the content to force a click is
engagement bait, and the March 2026 authenticity update downranks it.

## 6. share
**Template** `roundup` or none. **Asset** image or plain text.

Pointing at someone else's good work: a report, a tool, a talk, another page's post.
Credit by name, link, and tag the page properly where the URN is known. See
`docs/20-growth-and-amplification.md` section 3, and `bank/mentions.csv`.

Never tag a page we have not actually referenced. Never tag more than two in a post.

## 7. promo
**Template** any. **Asset** any.

The rotation in `docs/16` governs how often: across any rolling 21 posts, 9 carry no link,
5 point at an insights article, 3 at a sector page, 2 at `/prompts`, 2 at a lead magnet,
rotating ai-policy, prompt-library, week-four.

---

## Choosing between them

| If the material is | Use |
|---|---|
| One fact from one source, today | news |
| A list of five to ten short points | grid |
| Several things worth reading this week | roundup |
| A sequence that has to be read in order | carousel |
| Something the reader will do at their desk | guide |
| Someone else's work | share |
| Ours, and worth a click | promo |

If a grid needs more than ten items or more than two lines of body each, it is a carousel.
If a carousel has no order to it, it is a grid. If a roundup has only one item worth
reading, it is a news post.

## Adding a new type

1. Write the template in `lib/templates.mjs` and add it to the `TEMPLATES` export at the
   bottom of that file. Every colour and size comes from `brand.json`.
2. Render three real examples and look at all three. Not one.
3. Add a row to the table above and a section here.
4. Add it to the `type` column vocabulary in `bank/queue.csv`.
