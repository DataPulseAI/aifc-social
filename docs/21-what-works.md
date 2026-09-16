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
| | | | | |

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
| Company page format engagement | Document 7.00%, multi-image 6.45%, video 6.00%, image 5.30%, text 4.50%, link 3.25% | `docs/02` | 15 Sep 2026 |
| Link penalty on text posts | 18.8% measured, but LinkedIn says no intentional limiting | van der Blom 2026; LinkedIn Senior Director via Ordinal | Disputed, see `docs/20` |

## 4. Things we tried that did not work

Empty so far. It will not stay empty, and this is the most useful section in the file when
it is full. A failure with a reason beats a success with none.

| What | When | What happened | What we think went wrong |
|---|---|---|---|
| | | | |

## 5. How this file gets updated

The weekly batch writes to it, every week, as part of the analytics pass. Two or three
lines is a good week. Rewriting the standing conclusions on one week's data is how a page
develops a personality disorder, so a conclusion only moves when a month disagrees with it.

Research findings from outside go in section 3 with their sample size. If a source does not
publish one, say so in the row rather than leaving it out: knowing a number is soft is
itself worth recording.
