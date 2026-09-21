# 22. The mix, rewritten

Written 21 September 2026, after reading every post scheduled from 22 September to
7 October against `docs/06` and `docs/08`. Where this disagrees with `docs/14`, `docs/18`
or `docs/19`, this wins. Where it disagrees with `docs/01` (voice) or `docs/10` (the
sourcing gate), those win.

---

## 1. What went wrong

`docs/06` set the page up as a publication that happens to be owned by a training company:
55% wide stories about people, companies, money and conflict, 30% useful, 15% ours. `docs/08`
added the gate: would a manager read this out to the person next to them.

The queue on 21 September did not look like that. Of 33 scheduled posts, twelve were
release-reads or roundups of Microsoft, OpenAI and Google changelogs, ten were grids and
guides, and the rest were statistics in context and promos. Two had a named human in them.
None had a face on the card. Items like "Apps Script storage and execution follow the region
you set" and "Six conditions before AI touches your files" (a desktop suite's engineering
requirements) were going out to a page whose reader runs a 40-person accountancy.

It drifted for three reasons that compound, and none of them is taste:

1. **The sourcing gate favours documents that can always be opened.** Release notes always
   can. A person saying something surprising is harder to source and easier to skip.
2. **The photo library had no faces for the stories that needed them**, so person-led
   stories could not get a legal card and were not written.
3. **"Actionable beats factual" was applied so hard that every post became a procedure or a
   changelog.** Actionability decides whether a post is useful once read. It has almost
   nothing to do with whether it is read. `docs/08` said this in September and the batch
   forgot it by the second week.

The page had also never taken a position. Every post summarised someone else's document
and added "our read is" at the end. `docs/01` promised two things competitors cannot do:
tell people not to buy things, and refuse the hype cycle. Neither had ever been a headline.

## 2. The mix, per ten posts

| Band | Per 10 | What it is | Gate |
|---|---|---|---|
| **Wide** | 3 | A named person or institution does or says something a manager would repeat. Money, conflict, reversal, a number that sounds wrong. UK-weighted where a UK story exists. | Read-aloud test, then the person test. Fails either, does not run. |
| **Position** | 2 | Our own claim, stated in the first line as something a reader could disagree with. No link to us. | A sceptical reader could argue back. If nobody could, it is a platitude, not a position. |
| **Do this Monday** | 2 | Grids and guides. A thing to do at a desk this week. | Every item is a thing the reader can point at or do. |
| **Vendor** | 2 | One roundup a week absorbs every Microsoft, OpenAI and Google change. One standalone release post only when the change alters what a team does on Monday. | Monday test: "ChatGPT is in Word" passes. "Apps Script data regions" does not. |
| **Ours** | 1 | A promo, an article, a resource. | The rotation in `docs/16`. |

Two posts a day on weekdays, morning and afternoon, until the library carries enough faces
that a third slot can be filled with a wide post that clears the gate. Three near-identical
release-reads a day into a few hundred readers teaches them to scroll past the wordmark.
Volume is worth nothing if the unit is weak, and `docs/08` already said so.

### Where the archetypes go

`stat-in-context` and `contrast` are wide when the number sounds wrong and there is a named
publisher behind it (the ONS 1.6, the 29% fall in entry-level accountant hiring). They are
filler when the number is unsurprising. `quote` is wide only when the person is named,
the quote is concrete, and the reader has something to do at the end of the post. The Huang
quote failed on the last test and it is the cleanest failure we have.

## 3. The position post

New band. The shape:

1. **First line is the claim, as a sentence someone could disagree with.** "Stop showing your
   team AI demos." "Before you buy another AI licence, count who opened the last one." Not
   "Here are three thoughts on AI adoption."
2. **Two to four paragraphs of argument.** Specific, from the room, about the reader's own
   week. Where a number appears it carries a source and a date, as always. Where there is no
   number, do not invent one and do not reach for a vendor survey to prop the argument up.
3. **What we would do instead**, in one paragraph, concrete enough to try this week.
4. **Stop.** No link. No question. A position that ends by asking what the reader thinks is a
   position we did not hold.

Two a week. They are the credential-building band: the page that says "you do not need
another tool" is obviously run by people who know the tools, which is the only credential a
buyer checks before booking a trainer. They also produce disagreement, and disagreement is
what produces comments. A position post never mentions training, the offer or us. If it
could only exist to generate leads, it does not run (`docs/06`).

The freshness guard treats `source_publisher=AIFC` as no external source. That is correct
for a position post and the guard's cap on it does not apply to this band. It still applies
to promos and own-material grids: three own-material posts in ten is the ceiling for those.

## 4. The vendor cap

`lib/freshness.mjs` caps Microsoft at one post a week. The same cap now applies to OpenAI
and Google, and to any vendor of an assistant. The weekly roundup absorbs the rest. A
standalone release post passes only when a manager could say, on the day it publishes,
"from Monday, do this differently." A new sidebar in Word passes. A setting in an admin
console, a data-residency option, a webhook, a plan-tier change, does not, and goes in the
roundup as one line with its link.

The test for the roundup itself: would the reader's IT person or office manager find one
item they need to act on. If every item is for a Workspace administrator at a 2,000-seat
firm, it is the wrong reader and the roundup does not run.

## 5. The image rule, made hard

A photograph on a card asserts that the picture shows the subject of the headline: the
person, the place or the thing. A news story about a company gets that company's people,
or a picture of the thing itself, or no photograph. It does not get an empty office with
plants. The Gemini break-in card of 22 September sat on exactly that and the image did
nothing.

So:

- **A wide story about a named person** runs with that person's portrait from
  `photos/people/` under the portrait rule in `docs/17`, or does not run as a photo card.
- **A wide story about a company or a product** runs with a picture of the thing (a
  datacentre for infrastructure, a screen for software, the company's own press image where
  the licence allows), or as a text-only post.
- **A position post is about the reader's own workplace**, so an ordinary UK office, shop
  floor or meeting room is the subject, and the house card is correct.
- **Grids, roundups and guides** are typographic and do not need a photograph.

Text-only is an acceptable format for this page. A strong claim with no picture outperforms a
strong claim on a picture that says nothing, and it stops the audience learning that our
photographs carry no information. Until the library has faces for the UK people who appear
in wide stories (ministers, regulators, the ICO, FSB, ONS, named CEOs of UK firms), the
batch should expect to run one or two text-only wide posts a week.

## 6. What the batch scores, in order

This replaces the scoring paragraph in `docs/08` section 2 only in that it adds the position
band. Everything else there stands.

1. Would a manager read it out to the person next to them?
2. Is there a person in it, and can we picture them legally?
3. Is there a number that sounds wrong, or a quote that is concrete?
4. Is there tension: a reversal, a disagreement, a company saying one thing and doing another?
5. Is it about the reader's week, or about a Workspace administrator's console?
6. Only now: is it useful, and what does the reader do on Monday?

A story that passes 1 and 5 and fails 2 runs text-only. A story that fails 1 does not run
in the wide band whatever it scores on 6.

## 7. Applied on 21 September 2026

The week of 22 to 25 September was re-cut to two posts a day: four wide, two position, two
vendor. Ten posts were removed from Buffer: the standalone release posts for ChatGPT thinking
mode, Gmail AI Overviews, work-plus-personal accounts and the Purview Edge control, whose
substance folded into the 23 September tools roundup; the stale SharePoint post, which
duplicated that roundup; the Alibaba.com "surface level" quote, which was commissioned
research with no person a UK reader knows; the LibreOffice six-conditions grid and the
Workspace admin roundup, for the wrong reader; the 14-day-old Gemini connectors release;
and the construction 13% contrast, which returned to the bank as a good number waiting for a
slot rather than a bad post.

Three posts were written in the new bands: two position posts and one wide post about a
researcher's finding that free ChatGPT accounts are tracked across advertiser websites,
single-sourced and said so in the copy.

The bookkeeping the 21 September batch left half finished (fourteen bank rows scheduled but
marked `ready`, five ledger times out of step with Buffer, fourteen ledger rows missing) was
completed in the same pass. See `claude/aifc-queue-state.md` in the project for the state.

## 8. What to watch on 28 September

- Position posts against news cards on impressions and on comments. The bet is that they
  take fewer impressions and produce the first real comment threads.
- Whether text-only wide posts reach as far as photo cards. If they do, the image rule is
  cheap. If they do not, the library needs faces before anything else.
- Whether two a day loses reach against three. Compare unique readers for the week, not
  impressions per post.
- Whether the tools roundup, now carrying six items, still gets read.
