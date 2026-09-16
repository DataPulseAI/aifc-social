# The runbook: how the engine actually runs

How three posts a day get made, scheduled and improved without you in the loop.

---

## 1. The architecture, in one picture

```
  SOURCES  ──poll──►  CANDIDATES ──score──►  DRAFTS ──render──►  BANK
  (03-sources)                                                     │
                                                                   │ top up
  ANALYTICS ◄──weekly read── BUFFER QUEUE ◄────schedule────────────┘
      │                      (10 slots)
      └──► LEARNING FILE ──► adjusts scoring, mix and hooks next run
```

Three things are deliberately separated, and the separation is what makes the ten slot
limit a non-issue:

- **The bank** is unlimited. It holds finished, rendered, ready-to-post items.
- **The queue** is ten. It holds only the next three days.
- **The ledger** records what every post *was*, so analytics can say something useful.

---

## 2. Working inside ten scheduled posts

Buffer's free plan allows **10 scheduled posts**. At three a day that is 3.3 days of
runway, which sounds tight and is not, provided the queue is treated as a rolling
window rather than a calendar.

**The arithmetic.** The task runs at 06:00 UK, after the previous day's three have
fired. It finds roughly seven queued, and tops back up to ten. Each run therefore
schedules about three posts covering the far end of the window.

**Why that is safe.** One missed run leaves 2.3 days of cover. Two missed runs leave
1.3 days. The engine has to fail three days running before the page goes quiet, and any
single failure is invisible to the audience. That is a better failure profile than a
human posting manually.

**The clever part: the queue is editable.** The window is not first-in-first-out. Each
run the task re-evaluates:

1. Read the current queue with `list_posts`.
2. If a genuinely time-sensitive item has appeared overnight, a release or a piece of
   UK data, and the next morning slot currently holds evergreen bank content, **delete
   that queued post and replace it** with the news item. Bank content is never wasted,
   it goes back to the bank.
3. Top the tail back up to ten from the bank, respecting the pillar mix over a rolling
   seven days and the archetype spacing rules.

So the queue is always full, which is maximum resilience, and always fresh, because news
jumps it. Ten slots turn out to be exactly enough for a three day horizon, and a three
day horizon is all a news-reactive page should be committing to anyway.

**If the plan turns out to be 10 per channel rather than 10 in total**, the same logic
holds with more headroom, and the tail can extend to five days. Confirm on the first run
by reading the plan limits from `get_account`.

**The upgrade trigger.** If the page later runs more than one channel, or the bank
consistently exceeds thirty items, a paid Buffer plan removes the cap. Until then this
design does not need it.

---

## 3. The daily run, step by step

Runs 06:00 UK, every day. Target: under fifteen minutes.

**Step 1: Orient.** Read the ledger and the learning file. Note which archetypes and
pillars have run in the last seven days, and what the last analytics pass concluded.

**Step 2: Poll.** Hit the five daily sources from `03-sources.md`. Collect every item
from the last 24 hours. Discard anything that fails all three tests below.

**Step 3: Score.** Each candidate is scored on:
- **Actionability.** Can a UK manager do something differently because of this? This is
  weighted highest. A model benchmark scores zero. A Copilot admin setting scores high.
- **Audience fit.** 10 to 250 staff, UK, non-technical. Frontier research is out.
- **Evidence.** Is there a primary source with a date? No source, no post.
- **Freshness.** Under 48 hours for the morning slot.
- **Distance from what we already ran.** Do not post the third Copilot item this week.

**Step 4: Draft.** Three posts, one per slot, per the daily pattern in `02-playbook.md`.
Apply `01-voice.md` in full. Self-check against the banned list before proceeding.

**Step 5: Render.** Generate the card or carousel with `lib/render.mjs`. Verify by
reading the PNG back: text must not clip, the wordmark must be present, the source line
must be legible.

**Step 6: Publish assets.** Upload the PNGs to the public asset repo via the GitHub
contents API. The public URL is what Buffer receives. This is the only image hosting
route that works from this container, see section 6.

**Step 7: Schedule.** Reconcile the queue per section 2, then `create_post` for each new
item at its slot time.

**Step 8: Record.** Append to the ledger, one row per scheduled post: date, slot, pillar,
archetype, card template, hook type, hook text, destination URL, source, Buffer post id.
**This step is not optional.** Without it the weekly analytics pass has nothing to join
against and the whole learning loop is decorative.

---

## 4. The weekly learning pass

Runs Monday 06:30, after the daily run.

**Pull.** `get_aggregated_post_metrics` for the last 7 and 28 days. `list_posts` filtered
to sent, for per-post numbers.

**Join.** Match each sent post to its ledger row. Now every metric carries its pillar,
archetype, template, hook type and destination.

**Ask five questions, in this order:**

1. Which **archetype** had the best median engagement rate, and which the worst? Median,
   not mean, because one outlier will otherwise rewrite the strategy.
2. Which **hook type** earned the most saves and reposts? Number-led, named-thing,
   flat-claim, permission or refusal.
3. Which **slot** underperformed its own average? If the 17:15 slot is consistently
   weakest, move it rather than keep feeding it.
4. Which **destinations** actually got clicks, and did the posts carrying links do worse
   on reach than those without? This is the only way to price the link penalty on our
   own account rather than trusting someone else's study.
5. What did the **three best and three worst** posts have in common that the categories
   do not capture? This is the qualitative one and it is where the real findings come
   from.

**Act.** Write the conclusions to the learning file as explicit, dated instructions the
next daily run must follow. Not "carousels did well" but "raise carousels from 2 to 3 a
week, drop the Friday myth-bust, from 22 September, because carousels ran 2.1x the
median engagement of single images over 28 days."

**Guard against over-fitting.** Change one thing at a time. Do not act on a difference
drawn from fewer than five posts per group, or from fewer than 28 days. A brand new page
has noisy data for at least the first month, and the biggest driver of every number in
weeks one to four will be follower count, not content quality.

---

## 5. Month one is a different problem

An honest caveat that the engine cannot solve on its own.

A new company page starts at zero followers. LinkedIn shows company page posts to a
fraction of followers, and a fraction of zero is zero. For the first four to six weeks
the quality of the content is almost irrelevant to the numbers, and reading analytics
in that window will produce false conclusions.

What actually moves a new page off zero, in rough order of effect:

1. **Your personal profile.** You have 4,484 post impressions and 1,048 profile views in
   the last period. Linking the page in your profile's Experience section, and resharing
   the page's best post to your profile once or twice a week with a line of your own
   commentary, is worth more than anything else available. A reshare with real added
   commentary is a different object from a bare repost, which performs terribly.
2. **Invite connections to follow the page.** LinkedIn gives page admins a monthly credit
   allowance for this. Use it on the operations and ops-adjacent people in your network.
3. **The page link in the site footer and the delivery emails.** Free, permanent.
4. **Employees and collaborators** following and resharing.

Set the expectation accordingly: the engine's job in month one is to build a body of
work that makes the page worth following when someone finally arrives. Judge it on
output quality and consistency, and start judging it on numbers from week five.

---

## 6. Image hosting, and why it is GitHub

Buffer needs a publicly reachable HTTPS URL for every image. This container's network
policy blocks nearly every external host: S3, Unsplash, Openverse, Buffer's own API and
even aiforcompanies.co.uk are all unreachable from here. **`api.github.com` is reachable
and authenticated**, and `raw.githubusercontent.com` serves public files to the open
internet, which is all Buffer needs.

So: render locally, PUT the PNG to a public assets repo via the GitHub contents API,
hand Buffer the raw URL. No new infrastructure, no credentials to manage, no cost.

The repo should be public and separate from the site repo, so marketing assets never
enter the site's build. Suggested: `DataPulseAI/aifc-social`, with `cards/YYYY-MM-DD-slot.png`,
plus `bank/`, `ledger.csv` and `learning.md` living in the same repo so the engine's
whole state is version controlled and readable from any session.

One caveat: raw.githubusercontent.com is not a CDN with an availability guarantee. If a
post ever matters enough that a broken image is unacceptable, mirror it to the site's
`public/social/` directory. For daily social cards the tradeoff is fine.

---

## 7. Failure handling

The task is autonomous, so it must fail safely rather than loudly.

| Failure | Response |
|---|---|
| A source is unreachable | Skip it, note it, carry on. Never let one dead feed stop a run |
| No candidate clears the score threshold | Publish from the bank instead. A quiet news day is not a reason to post something weak |
| Render produces clipped text | Reduce the `size` value and re-render. Never ship a card without reading it back |
| Buffer is disconnected or at its cap | Write the finished posts to the bank and report it. Nothing is lost, the queue just stops growing |
| A number cannot be traced to a primary source | Drop the post. This rule has no exceptions |
| Three consecutive failed runs | Send a notification. This is the only condition that should interrupt you |
