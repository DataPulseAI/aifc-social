# Carousels, and the weekly mix

---

## 1. Why carousels earn their slot

On company pages, native document posts run about 7.00% engagement against 5.30% for a
single image, and they are the only format where reach keeps accruing for several days
rather than decaying after one. They are also under-used: on personal profiles they are
under 5% of all posts.

The catch is production cost, which is why most pages do not run them. Ours are rendered
from data, so a carousel costs about the same as a card.

**Two carousels a week, no more.** Tuesday and Thursday. They are the most work to read
as well as to make, and three a week trains people to skip them.

---

## 2. The format, which is tips not treatise

The instruction was tips rather than long formal carousels, and the research agrees. The
rules:

**Five to seven slides.** Not twelve. One analysis found carousels over five slides
underperform, and swipe-through collapses after about seven regardless.

**One idea per slide.** Under 30 words of body. If a slide needs two thoughts it is two
slides, or it is cut.

**Big type.** Headings 60px and up, body 38 to 42px on a 1080x1350 canvas. Roughly 57% of
LinkedIn consumption is on a phone, so design to be legible at about 400px wide, not at
desktop size.

**The caption stays short.** Under 150 characters. Long captions on carousels measurably
suppress reach, because the caption competes with the asset and delays the tap. This is
the opposite of the rule for text posts, and it is the most common mistake.

### The six-slide shape

| Slide | Job |
|---|---|
| **1. Cover** | The whole promise in one line, on green. A number in the title if there is one. The swipe cue at the foot: "Save it for Monday" |
| **2 to 5. Tips** | One theme each, three to five short items. Stone ground, green ticks. These are the slides people screenshot |
| **6. Outro** | The takeaway sentence, then one destination in a green pill. Never a hard sell |

`lib/templates.mjs` has `cover`, `tips` and `outro` for exactly this. `carousels.mjs`
shows three built.

### The cover slide is most of the performance

It is the only slide most people see. Same rules as a news headline: a number, a specific
promise, no teasing. "20 prompts to try at work this week" works because it says exactly
what is behind it and how much.

The save cue belongs on the cover, not the outro. Asking at the end is asking after the
decision has been made. "Swipe. Save it for Monday" does two jobs in five words: it tells
people the format has more in it, and it plants the save.

---

## 3. What is built

| Carousel | Slides | Destination | Why it works |
|---|---|---|---|
| **20 prompts to try at work this week** | 6 | `/prompts` | Grouped by when you would use them, not by function. Monday 9am, in meetings, writing, admin. The reader recognises the moment before they read the prompt |
| **How to tell if AI training actually worked** | 5 | `/insights` | Three numbers at week four, none a satisfaction score. Carries the ONS 1.6 figure |
| **Your AI policy is too long to be read** | 6 | `/resources/ai-policy` | Four questions, one page. Opens on the NCSC 71% shadow AI figure |

All three tie to a page that already exists on the site, which is the point. The carousel
is the sample, the page is the full thing.

---

## 4. The next twelve, so the bank has runway

Written as cover lines, because if the cover line does not work the carousel does not
get made.

1. **8 things to stop pasting into AI at work** (the data one, practical not preachy)
2. **The 5 minute test for whether a task is worth automating**
3. **12 prompts for people who hate writing** (narrow audience, travels further)
4. **What to do in the first hour with a new AI tool**
5. **6 questions to ask a vendor before you buy AI seats**
6. **Your prompt library has no owner. Here is what happens next.**
7. **10 things Copilot can do that nobody shows you** (anchor to a dated release batch)
8. **How to run an AI session for a team that did not ask for one**
9. **7 signs the rollout has stalled** (week three, the novelty cliff)
10. **The tasks small firms automate first, in order** (ONS and Enterprise Nation data)
11. **What to say when a client asks if you used AI** (the objection nobody prepares for)
12. **5 ways to find out what your team is already using** (shadow AI, without a witch hunt)

Number 11 is the strongest of these and worth doing early. Enterprise Nation found 38% of
small businesses name data protection or privacy as a barrier, and the client-facing
version of that worry has no good answer circulating anywhere.

---

## 5. The weekly mix

Twenty one slots, three a day, with the bands from `06-editorial-model.md`.

| | Mon | Tue | Wed | Thu | Fri | Sat | Sun |
|---|---|---|---|---|---|---|---|
| **07:45** | News card | News card | News card | News card | News card | rest | rest |
| **12:15** | Tips card | **Carousel** | List card | **Carousel** | Tips card | | |
| **17:15** | Stat card | Myth-bust | Stat card | Permission | Quote card | | |

That lands at roughly: 12 wide-band, 6 useful, 3 ours across the week. Two carousels,
five news cards, and the weekend off.

**The Saturday slot was removed on 16 September 2026.** See `docs/02` for the evidence and
`docs/21` for the sources. The re-cut principle it rested on still stands and still applies
on a weekday: when a carousel is worth running again, it goes out as a fresh asset with a
different cover line, never as a LinkedIn repost. Reshares run about 0.29x reach and are the
worst performing format on the platform. A re-cut is a new object.

**Balance rules the daily task holds to**, checked against the ledger by
`lib/freshness.mjs`:

- No more than two carousels in seven days
- No more than two consecutive days without a photograph-led card
- No source supplying more than two of the last ten posts
- No statistic reused inside 21 days
- Not more than one Microsoft post a week, since it publishes the most and is the easiest
  well to keep returning to

---

## 6. Publishing a carousel through Buffer

LinkedIn renders a native document post from a PDF, which is what earns the 7.00%. Buffer
takes this as a `document` asset with a `url`, a `title` and a `thumbnailUrl`.

So the pipeline is: render the slides to PNG, combine into a single PDF, push the PDF and
a thumbnail to the assets repo, and pass the raw URLs to `create_post`. The `title` is
what LinkedIn shows under the document, so it carries weight: use the cover line, not a
filename.

A multi-image post is the fallback if the PDF path gives trouble. It reaches slightly
less on a company page (6.45% against 7.00%) but it is one fewer moving part.
