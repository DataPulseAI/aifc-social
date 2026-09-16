# The content playbook: pillars, archetypes, cadence, engagement mechanics

Companion to `01-voice.md`. This is what the daily task selects from.

---

## 1. The page proposition

The page is a **newsroom for UK managers who have to make AI work at their company**.
Business Insider's shape, our subject. Daily, visual, useful, and never selling in the
first line.

That framing matters because it determines what belongs. A newsroom publishes what
changed and what it means. It does not publish "5 lessons from my founder journey".
If a post would not run in a trade publication for UK operations managers, it does not
run here.

**The one-line promise, which should be the page tagline:**
> What changed in AI this week, and what your team should actually do about it.

---

## 2. Content pillars and their mix

Four pillars. The proportions are deliberate and the daily task holds to them across a
rolling 7 day window, not within a single day.

| Pillar | Share | What it is | Primary job |
|---|---|---|---|
| **What changed** | 35% | Releases, features, research, policy, UK data, in plain terms with a "so what" | Reach and daily reason to follow |
| **How to run it** | 30% | Checklists, ninety day plans, one page policies, prompt structures, rollout SOPs | Saves and shares, and the funnel |
| **The evidence** | 20% | A single sourced statistic, read honestly, usually against the grain | Screenshots and reposts |
| **The straight talk** | 15% | Myth-busting, permission, telling people not to buy things | Comments and identity |

Anything that fits none of these is not our post. Notably excluded: founder story,
company milestones, hiring, event photos, generic motivation, model benchmark charts.

---

## 3. The nine archetypes

Each maps to a card template in `lib/templates.mjs` and a copy shape. The daily task
picks by pillar, then by what has not run recently.

### A. The release read `news` card
**Pillar:** What changed. **Frequency:** 5 to 6 a week.
A shipped feature, in one sentence, then the only thing that matters: does this change
what your team does on Monday. Usually no, and saying no is the differentiator.

- Hook: the named thing plus the number. "Microsoft shipped 11 Copilot changes this
  fortnight. Three matter to you."
- Body: what shipped, who it affects, what to do, what to ignore. 700 to 900 characters.
- Close: the resource line if there is a matching article, otherwise stop.
- Card: news template, headline over backdrop, source and date in the credit line.

### B. The statistic, read honestly `stat` card
**Pillar:** The evidence. **Frequency:** 3 to 4 a week.
One number, sourced and dated, with the reading that the press release did not give.
Our best single format because the card is screenshot-ready and the reading is ours.

- The move: find the second number that complicates the headline number. ONS says 35%
  of UK firms use AI. The interesting number is 1.6, the average count of AI
  technologies per adopting firm. Adoption is widening and not deepening.
- Hook: the number and the complication in one line.
- Close: a substantive question, or nothing.

### C. The checklist `list` card
**Pillar:** How to run it. **Frequency:** 3 a week.
Six to eight items someone can act on without us. The workhorse for saves.

- Rule: every item must be a decision or an action, never a concept. "Name an owner
  for the prompt library" not "Ownership matters".
- The card carries the full list so it is screenshot-complete. The copy adds the why
  for two or three items, never all of them.

### D. The sequence carousel `slide` deck, 6 to 9 pages
**Pillar:** How to run it. **Frequency:** 2 a week, ideally Tuesday and Thursday.
The highest reach format on a company page at 7.00% engagement versus 5.30% for a
single image. Reserved for anything with an order to it: a ninety day plan, a rollout,
a decision tree.

- Cover slide: the problem, in the reader's words, on green.
- Body slides: one idea each, under 30 words, on stone.
- Penultimate slide: the summary, so the whole deck is screenshot-able in one frame.
- Final slide: where the long version lives. Never a hard sell.
- Caption: under 150 characters. Long captions on carousels measurably suppress the tap.

### E. The one page artefact `list` or carousel
**Pillar:** How to run it. **Frequency:** 1 a week.
The actual thing, given away whole: the AI usage policy in nine lines, the week four
measurement sheet, the six questions for a vendor. This is the format that earns the
follow, because the reader gets the deliverable and realises we have twenty more.
Direct line to the `/resources` lead magnets.

### F. The myth-bust `quote` or `news` card
**Pillar:** The straight talk. **Frequency:** 2 a week.
State the received wisdom, then dismantle it with a number or a mechanism. Only ever
a position we can defend in the comments.

Standing list of myths we can attack honestly: that you need the newest model, that
AI replaces the junior, that prompt engineering is a skill worth training separately,
that you need a custom tool, that your staff are resisting (they are usually just
unclear), that a policy has to be long.

### G. The permission post `quote` card
**Pillar:** The straight talk. **Frequency:** 1 a week.
The reader is exhausted by being told they are behind. We tell them they are not, and
give them the smallest next step. Highest comment rate of anything we publish, because
it is the only post in their feed that lowers their heart rate.

### H. The comparison `list` card or carousel
**Pillar:** What changed. **Frequency:** 1 a week.
Copilot against ChatGPT against Gemini against Claude, on one axis at a time: cost per
seat, where the data sits, what it sees, what it cannot do. Never a winner declared
overall, because the honest answer is that it depends on what they already own.
Feeds `/insights/choosing-an-ai-assistant-for-your-team`.

### I. The policy and risk note `news` or `stat` card
**Pillar:** What changed. **Frequency:** 1 a week.
ICO guidance, NCSC advisories, DSIT publications. This is the most under-served content
in the category and the most trusted, because it answers the question every cautious UK
manager actually has. Always carries the not-legal-advice line.

---

## 4. The daily pattern

Three posts a day, on the company page, at fixed times. Consistency beats timing
optimisation: the major studies contradict each other on the best hour, and one
100,000 post analysis found no detectable best hour at all once content quality was
controlled for.

| Slot | Band (UK) | Job | Usual archetype |
|---|---|---|---|
| **Morning** | 07:40 to 08:20 | The newsroom slot. What changed | A, I |
| **Midday** | 12:10 to 13:10 | The useful slot. Something to take away | C, D, E, H |
| **Late** | 15:45 to 17:05 | The thinking slot. Something to argue with | B, F, G |

**Bands, not fixed times, and this matters.** Until 16 September 2026 these were exactly
07:45, 12:15 and 17:15 every weekday. A page that posts at the same second every day for
months is declaring that a machine is doing it, and the March 2026 authenticity update
reduces distribution for automation. Buffer's own default slots for this channel are 20:06,
22:37, 13:18 and 15:46 rather than round numbers, which is almost certainly the same
reasoning.

So each post gets its own minute inside its band, chosen fresh:

- Never the same minute twice in one week, across all three bands.
- Avoid :00, :15, :30 and :45. Those read as scheduled because they are.
- Vary the day's shape as well as the minute. Three posts do not have to sit at the same
  offset within their bands.
- Seconds are not settable through Buffer, so the minute is the whole of the variation.

The bands themselves come from where the two largest samples overlap. Buffer's 4.8M posts
put the best hour at 4pm Tuesday and Wednesday, 5pm Thursday, 3pm Friday. Sprout's 2 billion
engagements put it at 11am to 5pm midweek. They disagree by up to eight hours on Monday, and
a separate 100,000-post analysis found no detectable best hour at all once quality was
controlled for. Treat the band as real and the exact minute as noise worth using for cover.

**Weekends: nothing, decided 16 September 2026.** The original plan here was one Saturday
post, the week's best carousel re-cut. It was dropped when the schedule moved to batch and
drain, and the evidence supports dropping it. Buffer's analysis of **4.8 million posts**
says weekend engagement "drops off significantly compared to weekdays". Sprout Social's
**2 billion engagements across 307,000 profiles** goes further and finds **no optimal
posting time at all** on either Saturday or Sunday.

The mechanism matters more than the averages. Initial distribution reaches only 2 to 5% of
followers in the first hour, and that window sets the post's ceiling (`docs/20`). A post
spent into a thin Saturday morning is not merely slower, it is permanently capped. That is
a bad trade for the week's best carousel, which is exactly what the old Saturday slot
called for.

**Spacing rule:** never less than three hours between posts on the same channel. Posts
distribute over 48 to 72 hours, so a new post competes with the previous one for the
same audience.

---

## 5. Mechanics that earn each response

Different actions need different design. Build for the one you want.

**Saves** come from completeness. A card that contains the whole checklist gets saved.
A card that teases the checklist gets ignored. Saves are worth roughly five times a
like in reach terms, so completeness is not generosity, it is strategy.

**Screenshots** come from a single frame that survives without us. That means: the
claim and the source on the same card, the type large enough to read at phone width,
and the wordmark present but small. The stat card is engineered entirely for this.

**Shares and reposts** come from posts that make the sharer look informed to their own
network. The test: would a head of operations look good sending this to their MD?
That points at the evidence pillar and the one page artefacts, not at the clever takes.

**Comments** come from a question only a practitioner can answer, or a claim a
practitioner will want to correct. Being slightly, defensibly wrong in public earns
more comments than being comprehensively right, but it costs trust, so we do it by
having a real position rather than by baiting.

**Follows** come from the third good post someone sees, not the first. That is an
argument for consistency and for a recognisable card system, which is the whole reason
the visual template exists.

**Clicks** come from naming the destination plainly and putting the link in the body of
an image or carousel post, where it costs only 5 to 15% of reach. Never in the first
comment for a visual post, because that costs about the same and buries it.

---

## 6. The funnel, stage by stage

The page is the top. Nothing on the page sells. The ladder:

1. **Card in feed.** Brand recognition, one useful thing, no ask.
2. **Body link to `/insights`.** Six articles already live, each with sourced primary
   research and copyable prompt blocks. These are the proof that we know the subject.
3. **Article to `/resources/<slug>`.** Three lead magnets: the AI usage policy template,
   the ninety day Copilot plan, the prompt structure. Step one of the form is first name
   and work email, and that is what triggers the email with the PDF attached.
4. **Delivery email to `cal.com/convu/aiforcompanies`.** Twenty minutes, booked.
5. **Cal webhook to HubSpot.** The contact lands with the magnet name, team size and
   assistant already attached.

Every post should be able to name which rung it is pushing toward, and most should push
toward rung 2, not rung 4. Posts that jump straight to "book a call" convert worse and
train the audience to scroll past us.

**Destination rotation.** Across a week, roughly: 8 posts link to an insights article,
3 link to a resource page, 1 links to the prompt library, and the remaining 9 link to
nothing at all. A page where every post carries a link reads as a funnel and gets
treated like one.

---

## 7. What we will not do

Written down so the autonomous task cannot drift into it.

- No engagement bait, no comment-for-DM keyword harvesting, no "repost this".
- No lifted images from news sites or anyone else's work. See `03-sources.md`.
- No fabricated client results, quotes, testimonials or case studies.
- No numbers without a source and a date.
- No posting about a launch we have not read the primary source for.
- No commenting on AI safety discourse, model benchmark wars, or anything a UK
  operations manager cannot act on. That is a different audience and it dilutes us.
- No more than one post a week that mentions our own services explicitly.
