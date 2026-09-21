# 26. The profile track

Written 21 September 2026. Viren's own profile carries what the company page cannot: a person,
a lesson from a room, a claim in the first person, and the lead magnets given away by someone
the reader can picture. The full playbook, with the profile copy and ten posts, is in the
project (`viren-profile-playbook-2026-09-21.md`). This is the part the batch runs.

## The shapes, one per weekday

| Day | Shape | Pillar | Source of material | Card |
|---|---|---|---|---|
| Mon | room | retain (journey as lesson) | `bank/moments.md`, type `room` | none, text |
| Tue | desk | retain (authority) | `bank/moments.md`, type `desk`, or `bank/desk-stories.md` | none, text |
| Wed | correction | inform | the page's Wednesday correction, rewritten first person, shorter | `correction` template, optional |
| Thu | position | entertain | the page's Thursday position, rewritten first person | none, text |
| Fri | resource | retain and convert | the `docs/16` magnet rotation, substance given away, one link last line | `plainlist`, optional |
| Sat or Sun, optional | person | retain (relatable) | `bank/moments.md`, type `person`, once a fortnight at most | none, text |
| Sat, alternate weeks | convu | door two | the Convu batch, first person, one post a week at most on the profile | Convu's own assets |

**Convu stays on the profile, at one post a week at most,** in the Saturday slot, alternating with
the person post. AI for Companies has the weekdays. The About keeps both doors. Convu and AI for
Companies never share a mailing list, a resource or a post. Viren's direction, 21 September 2026.

**Building in public does not exist on this track.** No follower counts, impressions, "week
two", or progress reports. A business number appears only when it teaches the reader something
they can use, and that is rare. Viren's direction, 21 September 2026.

## Rules that are stricter here than on the page

1. **Nothing personal from nothing.** `room`, `desk` and `person` are drafted only from a line
   in `bank/moments.md`. If the file has no unused line of that type, the slot becomes a
   correction or a resource. A fabricated anecdote would undo the profile; there is no
   exception.
2. **First person is allowed; everything else in `docs/01` holds.** No em dashes, no
   exclamation marks, no engagement bait, no "Most people", every number sourced or Viren's
   own, no invented results.
3. **Shape: 8 to 14 lines, one sentence a line, blank line between, a fact or moment first,
   a list of three when the lesson splits, a one-line close.** A link on Friday, last line.
   No question closes.
4. **Nothing publishes without Viren.** Every profile post is created in Buffer with
   `schedulingType: notification`, so it sits in his approval queue and he edits one sentence
   before it goes. The reshare sentence for the page's best post of the day is queued the same
   way as a short text post for him to paste.
5. **Freshness across both channels.** `lib/freshness.mjs` runs on the ledger with
   `channel=profile` rows included: no shape twice running, no source twice in a fortnight, no
   belief corrected twice in a month.

## Bookkeeping

- Profile posts are bank rows like any other, with `channel=profile` in the ledger and the
  shape in `format` (`room`, `desk`, `correction`, `position`, `resource`, `person`).
- Until the profile channel exists in Buffer, the batch writes the week's five posts with
  `status=held`, `channel=profile`, so the first week is ready the day the channel appears.
- `bank/moments.md` lines are marked `used <post_id>` when a post draws on them.
- The scorecard (`score.mjs`) cuts by channel, so profile numbers are never averaged with the
  page's. The Monday note reports both, and the profile-to-page impressions ratio on the days
  both ran.

## Who does what

The batch: sourcing, drafting, cards where used, scheduling into the approval queue, the
reshare sentence, metrics, scorecard, guard. Viren: approve and edit (3 minutes a day), paste
the reshare (1 minute), reply to comments in the first hour (5 to 10 minutes), three moments a
week (5 minutes), read the Monday note (5 minutes). About 25 minutes on a weekday, most of it
talking to real people.

## To switch on

1. Viren's profile connected to Buffer as a second channel; its channel id goes in
   `lib/site` equivalent here, `bank/channels.json`.
2. Headline and About approved; the two [check] facts in the playbook confirmed.
3. Three moments in `bank/moments.md`.
4. Five desk stories in `bank/desk-stories.md`, from a call or a voice note.
