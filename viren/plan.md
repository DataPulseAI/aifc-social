> **Superseded 23 September 2026 by `../SYSTEM.md`.** Kept for the reasoning; where this file and SYSTEM.md disagree, SYSTEM.md wins.

# Viren's profile: how it runs

Recalibrated 21 September 2026. Everything drafted before this date is deleted. It argued for
the training, which makes it an advert, and adverts do not compound.

## The law

The post gives something away and never argues for what we sell. No statistics about how badly
people are doing. No mention of training, sessions, days or the offer. The reader gets value in
the feed; the site gets them the detail; the profile converts. Nothing is sold in a carousel.

## The funnel, and what each piece is for

Stage one is the post. It earns attention and nothing else. Stage two is the site, which holds
the full version of whatever the post gave away, with no form on the free pages. Stage three is
the profile and the featured links, which is where someone who wants us goes. A post that tries
to do stage three's job fails at stage one.

## The formats

The full reference, with the evidence for each and what makes it fail, is in `formats.md`.
Short version:

**The grid** (`grid.mjs`). One topic, covered to exhaustion, on one saveable image. Twenty-five
cards, colour-grouped, each a title and one line. This is the format that gets kept. One a
fortnight at most, because each one has to be genuinely complete.

**The carousel** (`carousel.mjs`). Deep green bookends, stone body slides, one idea a slide, real
prompts quoted in full. For a method that has an order to it. One a week.

**The prompt card** (`render.mjs`, `prompt`). One real prompt, big enough to read off a phone
screen, with what to attach underneath. Weekly, and the cheapest post to make well.

**The comparison sheet** (`versus.mjs`). One pair, held side by side, six times. The common
version on the left in grey, the version that works on the right in ink. Reposted more than
anything else in the reference library, because forwarding it makes a point for the sender.
Once a fortnight, alternating with the grid.

**The photo carousel** (`carousel.mjs`, `photo` and `photocover`). Full-bleed photographs, a
bracketed number, one lowercase line over each. No graphic anywhere. This is the format that
reads as a person rather than a brand, and it is the only one that cannot be built without
Viren. Placeholders render a dashed panel naming the file they want; nothing ships on one.
The hybrid is usually the better trade: one photograph on the cover, designed slides after it.
That costs one picture instead of nine.

**The voice card** (`render.mjs`, `tweet`). Near-black, his face, the tick, two or three lines.
Carries a belief or a moment. This one is Viren, not the library.

Above all of them: a photograph of a real room or a real person, whenever one exists.

The name and the link go on a sheet only where they earn their place. A single-idea card is
stronger with nothing under it, and every renderer now leaves the footer off when it is empty.

## The week

One post a weekday, five a week. Never two in a day and never at the weekend.

The time is whichever slot the Buffer posting schedule holds first for that day: Monday 20:53,
Tuesday 21:40, Wednesday 14:54, Thursday 13:30, Friday 13:55. Posts are pinned to those times
rather than left to the queue, because the queue would use both slots on a day and both weekend
days, and there is no API to change the schedule itself.

Worth knowing: those five times are the ones Buffer generated at random when the channel was
created, not a recommendation. Buffer's own suggested times live in the schedule editor. Apply
them there and tell me, and I will move everything to match.

| Day | Format | Job |
|---|---|---|
| Monday | grid or carousel | the reference. The thing people save |
| Tuesday | prompt card | one prompt, given completely |
| Wednesday | photo or voice card | a real room, a real person, a real moment |
| Thursday | prompt card or craft note | the small thing that makes the tools work |
| Friday | voice card or story | a position, or something that happened |

Max one post a week may mention the company at all, and only as a fact about what Viren is
building, never as an offer. Heather Murray's profile is the model: the pitch is rare and the
value is constant.

## What Viren supplies

Photographs, a line someone said, a number that is true this week. Photographs go in
`assets/photos/` under the names the carousel JSON asks for; everything else goes in `bank/`.
An empty week means Wednesday and Friday take a value post instead. Nothing is ever invented.

## The bar, before anything is shown

Every numbered item gives the words, not the advice. If a card says what to do and not what to
type or say, it is not finished. Taken from the deadline sheet in `../references/scoring.md`, the
highest-performing single image on the board.

Scored on the five in `../references/scoring.md`: virality, shareability, applicability,
cleanliness, saveability. Plus: does it sell anything (it must not), is every word plain, is
the hook under forty characters and complete above the fold, is there a question close (there
must not be).
