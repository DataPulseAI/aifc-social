# 21. What works

The knowledge base. Everything we have learned about what performs, what falls flat, and
what to do differently, in one place, added to rather than rewritten.

Two rules keep it honest.

**Date and source every entry.** A claim with no date is a claim you cannot retire.
**Separate our own numbers from other people's.** Section 2 is what happened on our page.
Section 3 is what the wider evidence says. They are not the same kind of knowing, and
mixing them is how a vendor blog post ends up steering the editorial line.

---

## 1. Standing conclusions

The short list. Anything here has either survived a month of our own data or rests on a
study with a published method and sample.

- **Actionable beats factual.** A post that tells someone what to do on Tuesday morning
  outperforms one that tells them something true. Statistics earn attention; instructions
  earn saves. Aim for at least half of grids and guides to be things to try rather than
  things that are so. *Added 16 Sep 2026, from Viren, pending our own numbers.*
- **Post times vary inside a band, they are not fixed.** A page posting at the same second
  every weekday for months is an automation signal, and the March 2026 authenticity update
  reduces distribution for automation. Bands and the rule are in `docs/02`.
  *Added 16 Sep 2026, from Viren.*
- **No weekend posting.** Two large independent samples agree that weekends underperform,
  and the first-hour mechanic means a good post spent on a Saturday is capped rather than
  merely delayed. Revisit only if our own numbers ever suggest otherwise.
  *Added 16 Sep 2026, sourced.*
- **The first comment is an extension, never a link.** First-comment links are deboosted;
  a first comment carrying the next action, a caveat or a question is not, and it means the
  post never sits at zero comments. *Added 16 Sep 2026.*
- **The card is for the save, the body is for the substance.** Sources, caveats and
  workings go in the post body. The card carries the claim and nothing else.
  *Added 16 Sep 2026.*
- **One in three photo cards needs a second pass**, almost always for legible third-party
  branding. Budget the review time. *Added 16 Sep 2026, from the first batch.*
- **Company pages do not build an audience alone.** See `docs/20`. The personal reshare in
  the first hour is the lever. *Added 16 Sep 2026.*

## 2. Our own numbers

Filled by the weekly analytics pass. Until there are four weeks of them, treat everything
here as noise: a page from a standing start produces almost no signal.

| Week | Posts | Best performer | Worst | What we changed |
|---|---|---|---|---|
| To 16 Sep 2026 | 3 published, 8 scheduled | No data | No data | First weekly batch. 16 posts written, 18 banked ready, all 18 scheduled |
| To 21 Sep 2026 | 9 published, 8 with data | NCSC shadow AI, 12 engagements on 156 impressions | Huang on slowing AI down, 2.63% on 152 impressions | Second batch. 18 posts written, 14 scheduled, 4 left ready. Six of fifteen cards needed a second pass |

**Week to 16 September 2026: there are no numbers yet, and that is the finding.**
All three published posts return impressions 0, reach 0, reactions 0, comments 0 and
engagement rate 0. `metricsUpdatedAt` on every one is identical to `createdAt`, so Buffer
had not refreshed them at the time of the pass. The page published for the first time on
16 September and the third post went out minutes before the batch ran. There is nothing
here to break down by post type, hook shape or destination, and constructing one would be
inventing a signal.

What we can record instead, so next week has something to compare against:

- **Published so far:** three, all `news`, all photo cards, all `stat-in-context` or
  `contrast`, all with `destination=none`. The first three carry no variation on any of the
  three axes we want to measure. That is a flaw in the first day, not a finding.
- **The batch fixes it.** The 18 scheduled posts split 7 news, 4 grids, 2 roundups, 1
  carousel, 1 guide, 1 share, 2 promos, across five hook shapes and five destination
  classes. From next week the breakdown is possible because the variation exists.
- **First real read expected:** the week to 23 September.

For each week the pass should record: impressions and engagement by **post type**, by
**hook shape**, and by **destination**, plus the single best and worst post and a guess at
why. The guess matters. A number with no hypothesis attached teaches nothing next week.

**What the analytics pass can now see.** The Essentials plan removed the 30-day history
limit and added advanced analytics, so from 16 September the weekly pass has unlimited
engagement history rather than a rolling month. That matters most for the month-on-month
comparisons this file is built to hold: before the upgrade, anything older than 30 days was
simply gone.

**API budget.** 7,500 calls a month, 250 a day, 100 per fifteen minutes. A batch scheduling
fifteen posts uses roughly twenty. There is no reason to come near the ceiling, but a run
that loops over `list_posts` with `includeMetrics` can burn through the fifteen-minute
window faster than expected, so page deliberately.

**Week to 21 September 2026: the first week with numbers, and they are small.**

Eight posts carry metrics, read on 21 September against a Buffer refresh of 20 September
17:27. The ninth, the 21 September morning post, had not been refreshed. Totals across the
eight: 885 impressions, 460 reach, 14 reactions, 6 comments, 1 share, aggregate engagement
rate 6.21%. Against last week, which returned zeros on everything, the trend is simply that
the page now produces data. There is no like-for-like comparison to make yet.

One mechanical note before the breakdowns. Buffer's engagement rate is not reactions plus
comments over impressions. The 17 September Custom GPT post shows 8.14% with zero reactions
and zero comments, which implies about seven engagements of another kind on 86 impressions,
almost certainly clicks. So the rate is a broader measure than the raw counts and the two
should not be read as the same thing.

**By post type.**

| Type | Posts | Impressions | Reach | Reactions | Comments | Mean eng. rate |
|---|---|---|---|---|---|---|
| news | 6 | 752 | 387 | 12 | 4 | 5.84% |
| grid | 2 | 133 | 73 | 2 | 2 | 15.1% |

Grids took about half the impressions of a news card and roughly the same number of
engagements each, so the rate is far higher and the reach is far lower. That is the first
evidence on question 1 below, and it points at a split answer: grids earn action from the
people who see them and are shown to fewer people. Two posts is not a finding, and the 25%
on the 18 September barriers grid is sitting on 36 impressions, which is small enough that
one person moves it several points.

**By hook shape.**

| Hook | Posts | Impressions | Engagements | Mean eng. rate |
|---|---|---|---|---|
| number-first | 4 | 502 | 29 | 5.98% |
| named-thing | 2 | 195 | 13 | 6.82% |
| flat-claim | 1 | 36 | 9 | 25% |
| quote-first | 1 | 152 | 4 | 2.63% |

The quote hook is last on rate while sitting second on impressions, which is the least
comfortable line in this table because `docs/08` rule 2 offers a quote as the equal
alternative to a surprising number. One post, one week, and the post had other problems.
Worth watching rather than acting on.

**By destination.** Six posts carried no link, one an insights article, one a sector page.
Too thin to separate, and deliberately so: the first week's linked posts were the two at the
end of the run. The batch scheduled on 21 September carries eleven linked posts out of
fourteen, so the week to 28 September is the first that can answer question 3.

**Best: the NCSC shadow AI post, 16 September, 156 impressions and the most comments of any
post at three.** Our guess at why is the claim rather than the format. It is the only post
in the set where an institution says something the reader would not predict, namely the
national cyber authority arguing against blanket bans. It was also the page's first ever
post, which carries a distribution advantage that will not repeat, so the honest reading is
that both are doing work and we cannot separate them.

**Worst: the Jensen Huang quote post, 17 September, 2.63% on 152 impressions.** It was seen
about as often as the best post and acted on a third as much, which makes it the cleanest
failure in the set. Our guess is that it has no job. It is a US industry argument about the
pace of frontier models, and its own body says "none of which changes anything your team
does this month". That is honest and it is also an admission that there is nothing for the
reader to do. If the actionable-beats-factual conclusion in section 1 is right, this is
what the other end of it looks like.

### Questions we are trying to answer

Written down so we stop re-litigating them from vibes.

1. Do grids and carousels actually out-save news cards on our page, as the platform
   benchmarks suggest, or is that a benchmark from bigger pages?
2. Does the actionable register beat the factual one, and by how much?
3. Which destination converts: the insights article, the sector page, or `/prompts`?
4. Does the personal reshare move the number, and by enough to be worth the minute?
5. Is three a day too many? `docs/02` says 4 to 5 a week peaks. We are at 15.
6. Does a first comment from the page measurably lift replies, or does it just occupy the
   slot a real reader would have taken?

## 3. Outside evidence

Everything here is somebody else's measurement. Sample and date included or it does not go
in.

| Finding | Number | Source | Read on |
|---|---|---|---|
| Company page organic reach decline, 2024 to early 2026 | 60 to 66% | Ordinal, Jan 2026 | 16 Sep 2026 |
| Company pages as share of a typical feed | 1 to 2%, and 5.37% in a second count | Ordinal; DSMN8 | 16 Sep 2026 |
| Original employee post vs unedited reshare | 9.2x, rising to 12x by Jun 2026 | DSMN8, 517,374 posts H1 2026 | 16 Sep 2026 |
| Editing a reshare by a word or two | 3x engagement | DSMN8, same | 16 Sep 2026 |
| First hour reach | 2 to 5% of followers | Ordinal | 16 Sep 2026 |
| Hashtag sweet spot | 2 to 3, benefits drop after | Usera and Durham, 991 posts, BPCQ 2025 | 16 Sep 2026 |
| Tagging vs hashtags | Tagging wins outright | Usera and Durham, same | 16 Sep 2026 |
| Buffer plan moved to Essentials: unlimited scheduling, first comment, unlimited analytics history | 5,000 posts per channel, 250 tags | Buffer account limits, read from the API | 16 Sep 2026 |
| Best hour on LinkedIn, three large samples | 4 to 5pm midweek; 11am to 5pm midweek; 8 to 10am. They disagree by up to 8 hours | Buffer 4.8M posts; Sprout 2bn engagements; Ordinal | 16 Sep 2026 |
| Weekend engagement on LinkedIn | "Drops off significantly" vs weekdays | Buffer, 4.8M posts | 16 Sep 2026 |
| Optimal posting time on Saturday or Sunday | None found on either day | Sprout Social, 2bn engagements across 307,000 profiles | 16 Sep 2026 |
| Company page format engagement | Document 7.00%, multi-image 6.45%, video 6.00%, image 5.30%, text 4.50%, link 3.25% | `docs/02` | 15 Sep 2026 |
| Link penalty on text posts | 18.8% measured, but LinkedIn says no intentional limiting | van der Blom 2026; LinkedIn Senior Director via Ordinal | Disputed, see `docs/20` |

## 4. Things we tried that did not work

Empty so far. It will not stay empty, and this is the most useful section in the file when
it is full. A failure with a reason beats a success with none.

| What | When | What happened | What we think went wrong |
|---|---|---|---|
| Rendering a whole batch in one pass | 16 Sep 2026 | `work/laptop-desk-u2.jpg` came back for three different stories in the same run | The matcher penalises a photo by `lastUsed`, and `lastUsed` is only stamped by `record.mjs` after scheduling. Within a single batch every card sees an unchanged library. Fixed by adding an `exclude` option to `newsCard`, carrying a running list of files already spoken for |
| Fishing for a better photo by changing tags | 16 Sep 2026 | Four successive re-rolls on one card returned a Shopify storefront, a "MacBook Pro" mockup, a lone figure in a warehouse and a Cadbury box | Re-rolling treats a library problem as a matching problem. Those frames kept failing because they should not have been in the library. Removing the eight offending entries produced a usable match on the next attempt. Fix the index, do not re-roll |
| Backgrounding a long job with `nohup` in `device_bash` | 16 Sep 2026 | A `git fetch` appeared to run for twelve minutes and had in fact died immediately. `pgrep` was matching the polling shell's own command line, so every poll reported it still running | Each `device_bash` call is a fresh sandbox with `--unshare-pid`. Nothing backgrounded survives the call, and `pgrep` cannot see other calls. Run long jobs in the foreground inside one call. The same fetch finished in seconds that way |
| Assuming the three published posts would give a first read | 16 Sep 2026 | Every metric came back zero, never refreshed since creation | A page one day old, and Buffer metrics do not populate immediately. Do not schedule the first analytics pass for the week a page launches |
| The first day's three posts | 16 Sep 2026 | All three were the same type, the same archetype family and the same destination class | Nothing to compare. A launch day should spread across at least two post types and two destinations, or the first week of data can answer no question at all |
| A batch whose tail is all our own material | 21 Sep 2026 | `lib/freshness.mjs` flagged "AIFC" as the source of six of the last ten posts | Five news posts went into the first four days and every own-material evergreen post landed behind them, so the last week of the queue had almost no outside sourcing. Fixed by returning three AIFC posts to the bank and scheduling a Microsoft-sourced roundup in their place, which brought it to four of ten. The guard counts AIFC as a source, and AIFC in that column means the opposite: no source at all. Either the guard should treat it specially or the batch should write more externally sourced evergreen. The second is the better answer |
| Rendering cards before checking the card existed | 21 Sep 2026 | Two guide posts were banked with `card_url` values that returned 404, and `queue.mjs validate` passed them | `validate` checks that the column is populated, not that the file exists. Caught by the URL check after the push, which is why that step is in the run. Worth teaching `validate` to check the file is present on disk |
| Assuming a photo tagged `uk` is a UK photograph | 21 Sep 2026 | Three separate re-rolls on one card returned a Sri Lankan shop, a Chinese street kiosk and a Bath tourist landmark, all tagged for UK small business | The `shop`, `retail` and `sme` tag pool was seeded with international street photography. See `docs/17`, fourth pass. Six entries removed and three re-tagged |
| Writing a batch against a queue that is already full | 16 Sep 2026 | The `news` horizon in `docs/19` is three days. Every slot inside three days was already taken by the daily runs, so the earliest free slot was five days out | The batch and the drain were both filling the queue from the front. The batch should run before the drain tops up, or reserve the head of the queue for itself |

## 5. How this file gets updated

The weekly batch writes to it, every week, as part of the analytics pass. Two or three
lines is a good week. Rewriting the standing conclusions on one week's data is how a page
develops a personality disorder, so a conclusion only moves when a month disagrees with it.

Research findings from outside go in section 3 with their sample size. If a source does not
publish one, say so in the row rather than leaving it out: knowing a number is soft is
itself worth recording.
