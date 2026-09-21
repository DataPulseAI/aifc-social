# 24. The loop: how the engine learns

Written 21 September 2026. The engine already has a memory (`bank/ledger.csv`) and a weekly
analytics pass (`docs/21`, the Monday note). What it did not have is a place where numbers
turn into the next batch's instructions without a person re-deriving it each week. This is
that.

## 1. What is measured, and where it comes from

| Source | What it gives | How it gets in |
|---|---|---|
| **Buffer** (`get_post` with `includeMetrics`, `get_aggregated_post_metrics`) | Per post: impressions, reach, reactions, comments, reposts, clicks, engagement rate, and `metricsUpdatedAt`. Refreshes about daily, lags up to 24h | The weekly pass writes one row per published post to `bank/metrics.csv` |
| **LinkedIn page analytics** (admin view, exportable as a spreadsheet) | Follower count and change, follower demographics (job title, company size, industry, location), per-post impressions and clicks, visitor counts | Viren exports it from the page's Analytics tab and drops the file in the connected folder as `bank/imports/page-analytics-YYYY-MM-DD.xlsx`. The pass reads it |
| **Viren's creator analytics** (Premium, profile) | The same for his own posts, once the profile track runs | Same drop, `bank/imports/profile-analytics-YYYY-MM-DD.xlsx` |
| **The ledger** (`bank/ledger.csv`) | What each post WAS: date, time, format, band, archetype, hook, photo, destination, channel | Written by `record.mjs` at scheduling time |

The join key is `post_id`. Nothing is scored that is not in both the ledger and
`metrics.csv`.

### `bank/metrics.csv`

```
post_id,impressions,reach,reactions,comments,reposts,clicks,engagement_rate,metrics_updated_at,recorded
```

One row per post, replaced (not appended) when the pass runs, because metrics keep moving
for a week after publication. `recorded` is the date the pass ran.

### The ledger gains two columns

`format` (one of the seven in `docs/23` section 4, or blank for legacy rows) and `channel`
(`page` or `profile`). `record.mjs` writes both. Old rows stay valid with them empty.

## 2. What the score does

`node score.mjs` joins the two files and prints, for every post with at least 48 hours of
metrics:

- Median impressions, reach, reactions, comments, reposts and engagement rate for the page as
  a whole, then broken down by `format`, by band (derived from `archetype`), by `hook_type`,
  by `destination` class, by weekday, by hour band (morning, midday, afternoon) and by
  `channel`.
- Each cut is shown as a multiple of the page median, so "1.8x" means that format takes
  nearly twice the page's median impressions.
- **Two lists the batch reads directly:** `WRITE MORE` (any cut with at least three posts
  whose median impressions or reposts are above 1.5x) and `WRITE LESS` (at least three posts,
  below 0.6x on impressions and below 1.0x on reposts). Below three posts a cut is shown but
  not ranked, because one good Tuesday would move it.
- The three best and three worst posts by reposts per impression, because reposts are the
  only way a page with 8 followers reaches anyone new.

It writes the same thing to `bank/scorecard.md`, dated, which the Sunday batch reads before
it chooses what to write. The batch's rule is mechanical: the `docs/22` mix is the default;
one slot moves from a `WRITE LESS` format to a `WRITE MORE` format per week; never more than
one, so a single week's noise cannot swing the page.

## 3. The weekly cadence

| Day | Who | What |
|---|---|---|
| Monday | The weekly pass | Pull Buffer metrics for every post published in the last 21 days into `bank/metrics.csv`. Read any new export in `bank/imports/`. Run `node score.mjs`. Write the Monday note (`docs/21` format) with the scorecard pasted in and one paragraph of interpretation. Push |
| Sunday | The batch | Read `bank/scorecard.md`, `docs/22`, `docs/23`. Write the week to the mix, with the one-slot adjustment. Record every post with `format` and `channel`. Push |
| Daily | The drain | Unchanged. Watchdog |
| Monthly | Viren | Export page analytics (and profile analytics once running) into `bank/imports/`. Ten minutes |

## 4. What "self-improving" means here, and what it does not

It means the batch cannot write next week without reading what last week did, and the
adjustment is bounded and written down. It does not mean the engine chases the number. Three
guards stay above the loop:

1. **`docs/01` and `docs/10` never move.** A format that scores well by breaking the voice
   rules or the sourcing gate is not a format we run. The pass flags it; the batch does not
   copy it.
2. **Reposts and reach are weighted over reactions.** Reactions come from the eight
   followers and from people who already agree. Reposts and reach are how the page finds a
   buyer who has never heard of it.
3. **Follower demographics decide, not volume.** Once the page analytics export is in,
   the pass reports what share of new followers are owners, directors, operations and
   partners at 10 to 250 person firms. A post that brought 400 impressions from AI
   enthusiasts is worth less than one that brought 40 from accountancy partners. The
   scorecard says which, when the data exists.

## 5. The first month's questions

The loop is only as good as the questions it is set. For October:

- Does the position format take fewer impressions and more comments than news, as bet?
- Does text-only reach as far as a card? If yes, the image rule in `docs/22` is cheap.
- Which of the seven formats gets reposted? That is the format that grows the page.
- Does anything on the page convert to a `/book` click? `clicks` in Buffer and GA's
  `book_call` with a LinkedIn referrer answer this together.
- Once the profile track runs: what is the profile-to-page ratio on impressions for the
  same post? `docs/20` predicts 9x to 12x. If it is 3x, fine. If it is 1x, the profile is
  not being used right.
