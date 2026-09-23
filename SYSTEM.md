# The system

**One operating document for AIforCompanies on LinkedIn, both channels.** Written 23 September
2026 from the content audit of the same day, the creator library in `references/`, and the
verified platform figures in `references/claims.md`. It replaces `docs/22`, `docs/23`,
`docs/26`, `docs/27`, `viren/plan.md`, `viren/platform-2026.md` and the cadence in
`bank/formats.md` and `README.md` section 5. Where an older document disagrees with this one,
this one wins. `docs/01` (voice) and `docs/10` (the sourcing gate) sit above it and are not
repeated here.

Living file. Rewrite it in place; do not fork it.

---

## 1. Why this exists

Six weeks of work produced twenty-eight documents, three different weeks for the same profile
channel, ten live contradictions, a page posting twice a day to eight followers, and fourteen
profile posts scheduled at Buffer's random times without the approval step every document
required. Nothing connected a post to a customer. The research was done well; what was missing
was one system that everything answers to. This is it.

## 2. The idea in one paragraph

Every post gives the whole of one useful thing away, on its own, to a reader who never clicks.
The site holds the fuller version of the same thing free, and the working document (the sheet,
the plan, the template) behind a work email. A person who downloads gets a fortnightly note that
stays useful. A conversation that shows a real problem gets a twenty-minute call. The day is
delivered, the guarantee holds, and the referral feeds the next post. Nothing on LinkedIn sells.
The furthest a post pushes is the document; most posts push nowhere and are complete in the feed.
That is the funnel, and every piece is valuable on its own while being one piece of the set.

## 3. The stages, and what each one is measured by

| Stage | Job | Where it lives | Measured by |
|---|---|---|---|
| 1 Reach | be seen by UK managers and owners at firms of 10 to 250 | Viren's profile first, the page second, referral partners, rooms | reach beyond followers, reposts, saves |
| 2 Value, free | prove we know the subject by giving it away complete | the post itself, `/insights`, `/prompts` | site visits with UTM, comments from the buyer |
| 3 Capture | trade the working document for a work email | `/resources/<slug>` | downloads, HubSpot contacts by `source` |
| 4 Nurture | stay useful until the timing is right | the fortnightly note, Resend | opens, replies |
| 5 Convert | twenty minutes, then a scope or an honest no | `/book`, the enquiry form, DMs that became calls | calls held |
| 6 Deliver and refer | the day, the guarantee, the introduction | the session, the referral sheet | days, referrals |

Stage 6 feeds stage 1. Every bank row carries `stage` (1, 2 or 3). The guard warns if more than
one post in five pushes to stage 3 or any post pushes to 4 or 5.

## 4. The two channels, and what each is for

**Viren's profile is the front door.** His median post reaches 28 times the page's on
impressions and 40 times on reach (audit, 23 September 2026). Personal profile content runs at
about 4.7% median engagement against 1 to 2% for company pages (Sprout Social Q1 2026 Index via
Blueberry Media, June 2026). Everything that needs to reach a stranger goes here.

**The page is the shopfront.** It exists so a referred buyer who looks us up finds a credible,
current, useful record. It does not carry the growth. It republishes the profile's reference
pieces as native documents and images, carries the Friday roundup, and stops there.

**Convu is a separate door.** One profile post a week at most, Saturday, a room and the people
in it. Its own page, its own batch, never a shared list, resource or link.

## 5. Cadence and timing

| Channel | Posts a week | Days | Time (UK) | Approval |
|---|---|---|---|---|
| Profile | 3 | Tue, Wed, Thu | 07:30 to 08:30 | every post sits in Viren's Buffer approval queue (`schedulingType: notification`) |
| Profile, Convu | 0 or 1 | Sat | 09:00 | same |
| Page | 3 to 5, never two in a day | Mon to Fri | 08:00 to 08:30 | automatic |

Three a week on the profile is the platform's own optimum (van der Blom, June 2026: the sweet
spot moved from "5 to 6" to "2 to 4" a week; daily posting shows a 26% drop in reach per post,
Goodman, May 2026) and roughly three times Viren's historic cadence, which is a stretch he can
sustain, not a cliff. Never at the weekend on the AIforCompanies track. Never in the evening: a
post published at 21:40 has nobody at the desk to reply to in the first hour, and the first hour
is where replies decide distribution.

## 6. The post archetypes

Five, not fourteen. A reader should recognise the shape before the first line. Each has one job,
one stage, one renderer and one failure mode.

### 6.1 The reference (stage 2)
One subject covered completely on one saveable artefact. The 25-card grid (`viren/grid.mjs`),
the numbered list card with the exact words to say (`viren/list.mjs`), the comparison sheet
(`viren/versus.mjs`), or an 8 to 10 slide document (`viren/carousel.mjs`; documents run 1.39x
reach and 1.30x engagement against the average post, AuthoredUp, 3M posts, March 2025 to
February 2026; 8 to 10 slides perform best, van der Blom 2025).
Job: be the thing someone keeps and forwards to a colleague. Reposts are the only mechanism that
reaches people who do not follow us.
Evidence: grouped library with a number, 4.3x and 3.0x (Hills), 3.5x and 3.2x (Hassid); the
numbered action-line card is the strongest single image in the library (482 reactions, 178
comments, `references/scoring.md`).
Fails when: the topic is not exhaustible so the sheet pads, or an item gives advice instead of
the words. The body works with the image closed and repeats the essentials in text.
Site: `/prompts`, the sector pages, or an article holds the fuller version. No link in the post.

### 6.2 The show-how (stage 2)
One task the reader already does every week, done with the assistant they already pay for. What
to attach, what to type in full, what good looks like, what goes wrong first time. Renderer: the
prompt card (`viren/render.mjs`, `prompt`) or the annotated before-and-after teardown (not yet
built; the `top-content` reference `tc-8` and `tc-81`).
Job: the reader runs it on Monday. Hassid's "pick one tool, one weekly task, define good" is the
whole position in his words and did 1,306.
Fails when: the prompt is shortened to fit, or it needs a tool the reader does not have.

### 6.3 The person (stage 1)
A real room, a real moment, a position he will defend. A photograph of Viren or a room he was in
(images with people perform up to 50% better, van der Blom 2025 via Mercer-Mackay), the voice
card (`viren/render.mjs`, `tweet`) for a belief, or plain text. Convu rooms live here.
Job: the reason the buyer follows a person and not a page. Viren's own best multiple in the whole
library is a real room and a quoted line (Convo #01, 6.8x his median).
Fails when: it is invented, it is a platitude anyone in the industry could post, or it reports
progress ("week two", follower counts). Drafted only from a line in `bank/moments.md`. No line,
no post; the slot takes a reference instead.

### 6.4 The resource (stage 3, one a fortnight, in the Thursday slot)
The substance of a working document given in full in the post, and the document itself on
`/resources/<slug>` behind first name and work email. This is the lead-magnet post done the
value-first way: the reader who never clicks leaves with the method; the reader who clicks
leaves with the sheet. One link, last line of the body, with UTM. A body link costs reach (one
external link reduces median reach by 18.8%, van der Blom 2026 via Goodman) and a traceable
download is worth more than the reach it costs; a link in the comments cannot be measured and is
buried within the hour.
Never "comment X and I will send it". That harvests comments for LinkedIn and hands us nothing.
Evidence: Section's whole business runs on one owned figure and a benchmark-your-team bridge;
Welsh's rule that the post is the lesson and the link is the appendix.
Fails when: the post teases instead of giving, or the document is not worth an email.

### 6.5 The proof (rare, when real)
A room we ran, a call that happened, an honest no. Never before it is real, never invented, never
a testimonial without written permission. Until there is delivery history this archetype does not
run, and no placeholder stands in for it.

## 7. The week

| Day | Profile | Page |
|---|---|---|
| Mon | | The Monday count: an original count of the buyer's stack, ours (Grandillon, 4.2x from a 69-median account) |
| Tue | The reference | Republish Tuesday's reference as a native document or image, page voice |
| Wed | The show-how | Republish Wednesday's show-how |
| Thu | The person, or the resource in alternate weeks | The correction: one belief a UK buyer holds, corrected with a source |
| Fri | | The week, read: the roundup with one UK document last, publishers tagged from `bank/mentions.csv` |
| Sat | Convu, optional | |

Across a fortnight the profile runs two references, two show-hows, one person and one resource.
The page never originates a quote card, a bare news summary or a first comment that talks to
itself. If a story clears `docs/10` it takes the Thursday page slot as a correction.

## 8. The conversation engine

Twenty minutes a weekday, and it is where the leads come from, not the posts.

1. Reply to every comment on the day's post inside the first hour, with a sentence that adds
   something. Three or more real comments in the first hour is the single strongest reach signal
   the platform has (van der Blom via Blueberry Media, June 2026).
2. When a commenter describes their own situation, take it to a DM with one real question ("which
   assistant is your team on?"). If the answer names a problem the resource solves, send the
   `/resources` link. If it names a problem the day solves, send `/book`. Most DMs end at the
   question, and that is fine.
3. Comment with substance on five posts a day by the people who buy this: owners and heads of
   operations, HR or L&D at UK firms of 10 to 250, and the accountants and IT providers who see
   them first.
4. Ten outreach notes a week logged in HubSpot against the first-ten-customers plan. The first
   paid session is due 14 October 2026. Content does not replace this; it makes the reply rate
   higher.

## 9. The resources, in order

| # | Resource | Status | Why this order |
|---|---|---|---|
| 04 | The one-hour licence audit (sheet plus PDF) | built, held for the site entry | finished; the first resource post is already written in `bank/posts/2026-10-02-licence-audit-resource.md` |
| 05 | The team AI readiness check: ten questions, scored, with what each band should do first | next to build | Section's benchmark at SME scale, honestly framed as a self-check with no invented benchmark; it leads straight into the scoping call because the survey of attendees is already how we build a day |
| 06 | The thirty-day rollout plan for a team of 20 to 200 | after 05 | the follow-on once someone knows where they stand |
| 07 | Which assistant for which job: a one-page decision sheet for the tools a firm already pays for | after 06 | the tools question every owner asks first |
| 01 to 03 | AI usage policy, prompt library, week-four review | live | the existing three; the prompt library is `/prompts` and is the source for the reference grid |

One new resource a fortnight, no faster. Each is 4 to 12 pages, dated, every number sourced,
"not legal advice" on anything touching UK GDPR, employment or contracts, built from the
template in `resources/`.

## 10. Rules that settle the old arguments

These ten contradictions were live on 23 September 2026. Each is decided here.

1. Page cadence: at most one post a weekday. Not two, not three.
2. Profile times: 07:30 to 08:30, Tuesday to Thursday. Buffer's generated slots are not used.
3. Weekends: the AIforCompanies track never posts at the weekend. Convu may, Saturday only.
4. Profile shapes: the five in section 6. The `docs/26` shapes (room, desk, correction, position,
   resource, person) fold into them; the `viren/plan.md` week is retired.
5. Links: none in a reference, show-how or person post. One, last line of the body, with UTM, in
   a resource post. Never in the first comment.
6. Question closes: none. End on the hard sentence. A closing question moves median engagement by
   0.07 of a point (AuthoredUp, 310,000 posts).
7. Approval: every profile post is `schedulingType: notification`. No exceptions, including the
   fourteen already scheduled.
8. Company mentions on the profile: at most one post a week names AIforCompanies, as a fact about
   what Viren is building, never as an offer. The resource post counts as that one.
9. Fonts: profile cards use Instrument Sans as `viren/brand.json` says; page cards use
   Newsreader 500 for display as `docs/25` says. Two channels, two voices, one palette.
10. Hashtags: none, either channel.

And the standing rules: no em dashes, no exclamation marks, no emoji, no engagement bait, no
"Most people", no invented client, result, quote or headcount, every number with a source and a
date, first person allowed on the profile and nowhere else.

## 11. What is measured, weekly, in this order

1. Saves and reposts per post (reposts from Buffer, saves from the LinkedIn app by hand)
2. Comments from people who match the buyer
3. DMs started, and how many reached a question
4. Downloads on `/resources` by UTM and HubSpot `source`
5. Calls booked and held
6. Impressions, as a health check only

The test for the first four weeks: does one resource post produce five real conversations? If
not, change the resource before changing anything else. The Monday pass writes the numbers to
`bank/metrics.csv` and the scorecard, page and profile reported separately, and one slot may
move a week on the evidence, never more.

## 12. What Viren supplies, and when

Sunday evening or Thursday: one photograph of a real room or person, one line someone said, one
number that is true this week. Into `bank/moments.md`. Monday morning: read the three drafts in
the approval queue on his phone, change a line, approve or bin. Each weekday: the twenty minutes
in section 8. Monthly: export page and profile analytics into `_local/imports/`. About an hour a
week plus the daily twenty minutes, most of it talking to real people.

## 13. What runs without him

Sourcing, drafting to the five archetypes, cards from the renderers, scheduling into the approval
queue, UTM, the resource build from an approved outline, the fortnightly note draft, HubSpot and
Resend bookkeeping, metrics, the scorecard, the guard. The Sunday batch reads this file, then
`docs/01`, `docs/10`, `bank/scorecard.md` and `bank/moments.md`, and writes the week.

## 14. Where things live

| Thing | Path |
|---|---|
| This system | `SYSTEM.md` |
| Voice and sourcing, above this file | `docs/01-voice.md`, `docs/10-sourcing-gate.md` |
| Card system and the loop | `docs/25-card-system.md`, `docs/24-the-loop.md` |
| Everything we learned from, with the reason | `references/` (creators, images, scoring, verified claims) |
| The profile renderers and their inputs | `viren/` (`formats.md` is the evidence per renderer) |
| The page bank, ledger, metrics, moments | `bank/` |
| Resources | `resources/` |
| Which old docs are live, folded in or historical | `docs/README.md` |
| The project note that mirrors this file | `claude/aifc-system.md` in the Claude project |
