# 19. Batch and drain

Replaced the daily full pipeline on 16 September 2026.

## Why it changed

The daily run polled every feed, wrote three posts, rendered three cards, pushed them and
scheduled them. It worked. It was also the whole machine turning over for three posts, and
it put every expensive step on the critical path of a run that had to finish before noon.

Two things made that a bad trade.

**Rendering needs a second pass about a third of the time.** The 16 September run rejected
four of eleven cards on sight and re-rendered them, all for legible third-party branding
in frame. Doing that under time pressure, daily, is worse than doing it once in a batch
where a whole set can be laid out and compared.

**The queue only holds ten.** Buffer's free plan caps scheduled posts at ten, so a daily
run spent most of its effort discovering there was nothing to do.

## The shape now

**Note, 16 September 2026.** The Buffer plan moved to Essentials, so the ten-scheduled-post
cap is gone: the limit is now 5,000 per channel, which is not a limit. The three-day buffer
that shaped this design was a workaround for that cap and no longer constrains anything.
What replaced it is an editorial rule rather than a technical one, in section "How far
ahead to schedule" below.

**Weekly batch, Sunday.** The heavy run. Polls the feeds, reads the week's calendar in
`docs/03`, writes fifteen to twenty posts across the type mix in `docs/18`, renders every
asset, reviews them as a set, pushes the assets, and banks the lot in `bank/queue.csv`
with `status=ready`. Needs the Mac, because pushing needs the Mac.

**Daily drain, noon.** The light run. Reads the bank, sees what Buffer already holds, and
moves enough items in to fill the queue to ten. No feeds, no drafting, no rendering, no
npm install. A minute or two.

**The drain needs no Mac.** Its cards were pushed by the batch and are already live at
`raw.githubusercontent.com`. The only state it writes goes to the project doc
`claude/aifc-queue-state.md`, which the cloud can write directly. That removes the Mac
from the daily path entirely, which is the second reason this is better: the daily run no
longer fails when a laptop is shut.

**Breaking news** overrides both. A story that genuinely cannot wait until Sunday gets
written, rendered and pushed the same way the old daily run did it, and takes a queued
evergreen slot. The displaced item goes back to the bank at `status=ready`. This should be
rare. If it happens weekly, the batch is not reading the right feeds.

## How far ahead to schedule

The cap is gone, so the question is now editorial: how long can a post sit in a queue and
still be true when it publishes.

| Type | Horizon | Why |
|---|---|---|
| `news` | 3 days | A news post written on Sunday and published on Friday is five days stale, and the story may have moved. Anything older than this gets rewritten or dropped, not published. |
| `roundup`, `share` | 5 days | Tied to the week, not the day. |
| `grid`, `guide`, `carousel`, `promo` | 3 weeks | Evergreen. These are what the queue should be long on. |

So the batch schedules everything it writes, placing news in the first three days and
evergreen behind it, and the queue naturally runs one to three weeks deep with a
short-dated head and a long-dated tail.

**The daily drain changes job.** It is now mostly a watchdog: check for errored posts,
check the head of the queue has not gone stale, and top up from the bank if a slot opened
because something was deleted or failed. It still runs daily because catching a broken
image URL within a day is worth more than the minute it costs.

**One rule that matters more now than it did.** A long queue makes it easy to leave
something scheduled that should not run. If a story is overtaken, delete the post and send
the bank row back to `ready` or `dropped`. A queue nobody prunes is worse than a short one.

> **If a task prompt tells you to top up "to ten scheduled", that instruction is obsolete.**
> Ten was the Free plan cap and it was removed on 16 September 2026. Schedule the whole
> batch instead, placed by the horizons above. This file and the README are the current
> contract; where a prompt disagrees with them, they win.

## The bank

`bank/queue.csv`, one row per finished post. Bodies live beside it in `bank/posts/<id>.md`
because post copy contains commas, quotes and newlines and has no business in a CSV cell.

| Column | |
|---|---|
| `id` | `YYYY-MM-DD-slug`, unique, never reused |
| `status` | `ready`, `queued`, `posted`, `held`, `dropped` |
| `type` | one of the seven in `docs/18` |
| `priority` | integer, higher goes first. Default 0. Use for time-sensitive items. |
| `headline` | the card headline |
| `body_file` | `bank/posts/<id>.md` |
| `card_file` / `card_url` | the asset, and its public URL |
| `asset_type` | `image`, `document`, `none` |
| `doc_title` | required when `asset_type=document` |
| `source_publisher` / `source_date` / `source_url` | the sourcing gate, recorded |
| `archetype` / `hook_type` | for the freshness guard |
| `photo_file` | for the 21-day photo rule |
| `destination` | the link, or `none` |
| `mentions` | comma-separated keys into `bank/mentions.csv` |
| `notes` | anything the drain should know |
| `created` / `post_id` | |

### The tool

```bash
node queue.mjs stats                      # what is in the bank
node queue.mjs validate                   # ready rows that are not actually ready
node queue.mjs next 7 --exclude a,b       # what to post, as JSON
node queue.mjs mark <id> queued <post_id>
```

`next` sorts by priority then age, and spaces the result so no two consecutive items share
a source, a photo, a destination or a hook shape. It never returns a row with no card URL.
`validate` fails a row that claims `ready` without a card, a body file or a source, which
is the check that stops a half-finished batch reaching the feed.

## The guard, recalibrated

Both tools were written against a ten-post rolling queue and misfired the first time a
full batch landed. Fixed on 16 September 2026.

- `lib/freshness.mjs` capped any archetype at 3 in 7 days and any destination at 6 in 21.
  With 18 posts scheduled at once those are tripped by arithmetic rather than by a real
  problem. Both are now proportional: an archetype may take a third of the window, floor
  of 3, and a destination is judged against the 9-in-21 target in `docs/16` scaled to how
  many posts are actually in the window.
- `queue.mjs stats` warned "top the bank up" below six ready. On the Essentials plan the
  batch schedules everything it writes, so an empty bank straight after a batch is correct.
  It now warns only when the bank and the queue are both thin, and says so explicitly when
  the bank is empty but the queue is full.

The rules themselves did not change, only the thresholds. A guard that cries wolf every
Monday is a guard nobody reads by October.

## Held and dropped

`held` is for a post that is finished but should not run yet: an embargo, a story that
needs a fact confirming, a promo waiting on a page to go live. `dropped` is for one that
has been overtaken. Neither is deleted. The bank is also the record of what was considered
and rejected, which is worth more than it looks when the same story comes round again.

## Topping up

The batch aims to leave fifteen to twenty `ready`. `queue.mjs stats` prints a warning
below six. Do not let it run to zero and then write twenty in a hurry: that is how a week
of posts ends up drawing on three sources and two photographs.
