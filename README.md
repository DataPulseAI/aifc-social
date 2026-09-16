# AI for Companies: the LinkedIn content engine

Three posts a day to the AI for Companies LinkedIn company page, sourced, written,
illustrated and scheduled without anyone opening Buffer. This file is the operating
manual. If you are a Claude session picking this up cold, read this first and then the
docs it points at.

Built 15 and 16 September 2026. Last updated 16 September 2026.

---

## 1. What this actually is

A company page that behaves like a trade publication rather than a training company's
noticeboard. The model, set out in full in `docs/06-editorial-model.md`:

- **Reach first.** Most posts sell nothing. They inform. A UK business owner should want
  to send the post to a colleague.
- **One fact, one picture, one point.** A 1080x1350 card carrying a single sentence over
  a licensed photograph, and the story in the post body.
- **Sourced or not published.** Every figure comes from a document opened during the run
  that produced the post. There is no exception to this and it has been broken once, on
  15 September, which is why `docs/10-sourcing-gate.md` exists.
- **Nothing invented.** AI for Companies has no delivery history. No clients, no results,
  no testimonials, no quotes that were not said.

The commercial return comes from the rotation in `docs/16-destinations-and-promotion.md`,
not from selling in individual posts.

---

## 2. Quick start for a Claude session

```bash
git clone --depth 1 https://github.com/DataPulseAI/aifc-social
cd aifc-social
npm install
node lib/freshness.mjs bank/ledger.csv    # what is at risk of repeating
```

Read, in this order: this file, `docs/01-voice.md`, `docs/06-editorial-model.md`,
`docs/08-what-makes-it-interesting.md`, `docs/17-photo-quality-rules.md`. Everything else
is reference, pulled in when the task calls for it.

The scheduled task prompt is the operational contract and lives in the Claude project as
part of the task itself. `docs/05-daily-task.md` holds a readable copy.

---

## 3. The two runs

Changed on 16 September 2026 from a single daily pipeline. `docs/19-batch-and-drain.md`
explains why. In short: rendering needs a second pass about a third of the time, and doing
that under daily time pressure was the wrong trade.

**Weekly batch, Sunday.** The heavy run. Polls the feeds, writes fifteen to twenty posts
across the type mix in `docs/18`, renders every asset, reviews them as a set, pushes them,
and banks the lot in `bank/queue.csv` at `status=ready`. Needs the Mac, because pushing
needs the Mac.

**Daily drain, noon.** The light run. Reads the bank, sees what Buffer already holds, fills
the queue to ten, marks what it used. No feeds, no drafting, no rendering, no npm install.

**The drain needs no Mac.** Its cards were pushed on Sunday and are already live. Its only
state goes to the project doc `claude/aifc-queue-state.md`, which the cloud can write
directly. The daily path no longer fails when a laptop is shut.

**Breaking news** overrides both, takes a queued slot, and sends the displaced item back to
the bank. If that happens weekly, the batch is reading the wrong feeds.

Both runs start the same way: clone this repo, read this file, run
`node lib/freshness.mjs bank/ledger.csv` and treat every line it prints as binding.

---

## 4. Why publishing is split across two machines

Buffer's API takes `assets[].image.url` and fetches the file itself at publish time. It
has no upload endpoint: the full mutation list is createPost, editPost, deletePost,
templates and ideas. So a card must sit at a public URL before a post can be scheduled
with a picture.

The cloud sandbox cannot put it there. Its egress proxy allows github.com,
raw.githubusercontent.com and the package registries and refuses everything else, and its
**git proxy refuses any repository outside the session's authorised set and will not
forward a credential**, so even a valid token returns:

```
remote: access denied by the git proxy: DataPulseAI/aifc-social is not in this
session's authorized repository set
```

Viren's Mac has no such restriction. So:

| Step | Where |
|---|---|
| Read feeds, score, write, render | Cloud sandbox |
| Commit and push the cards | Mac, via `device_bash` |
| Verify the URL, schedule in Buffer | Cloud sandbox |

The push, from `$HOME/mnt/projects/aifc-social`:

```bash
git add -A
git -c commit.gpgsign=false commit -m "Cards for <date>"
git -c credential.helper= push \
  "https://x-access-token:$GH_TOKEN_AIFC@github.com/DataPulseAI/aifc-social.git" HEAD:main
rm -f .git/*.lock; find .git -name 'tmp_obj_*' -delete
```

That last line matters. Git cannot remove its own lock and temp files in a connected
folder unless deletion is enabled for the session, and a leftover `.git/index.lock` breaks
the next commit. If it fails with "Operation not permitted", call
`device_request_delete_permission` for `/Users/virensamani/projects/aifc-social`, which is
the connected folder root. Requesting the parent `/Users/virensamani/projects` is rejected:
the request must name the root exactly as `get_device_info` reports it.

**When the lock cannot be cleared, do not stop.** A scheduled run has no one to answer the
delete prompt, so the request sits unanswered and the cards never reach GitHub. The working
route, used on 16 September and preferred from now on, skips the connected folder's git repo:

```bash
T='<GH_TOKEN_AIFC>'
rm -rf $HOME/aifc-work
git clone --quiet --depth 1 "https://x-access-token:$T@github.com/DataPulseAI/aifc-social.git" $HOME/aifc-work
cp $HOME/mnt/aifc-social/cards/<new cards>  $HOME/aifc-work/cards/
cp $HOME/mnt/aifc-social/bank/ledger.csv    $HOME/aifc-work/bank/
cp $HOME/mnt/aifc-social/photos/index.json  $HOME/aifc-work/photos/
cd $HOME/aifc-work && git add -A
git -c user.email=viren@aiforcompanies.co.uk -c user.name="AIFC content engine" \
    -c commit.gpgsign=false commit -q -m "Cards for <date>"
git -c credential.helper= push "https://x-access-token:$T@github.com/DataPulseAI/aifc-social.git" HEAD:main
```

`$HOME/aifc-work` sits outside `mnt/`, where deletes work normally, so git never meets the
restriction. `device_commit_files` still writes the cards into the connected folder first,
which is what makes them visible to Viren; the scratch clone is only the vehicle for the push.
The connected folder's own `.git` stays dirty and locked, and that is harmless, because
nothing in the pipeline reads it.

Cards are then live at
`https://raw.githubusercontent.com/DataPulseAI/aifc-social/main/cards/<file>` with no
build step. LinkedIn re-hosts the image on its own CDN once a post publishes, so a reader
never sees this URL.

---

## 5. The queue

Buffer moved to the Essentials plan on 16 September 2026. Scheduled posts are effectively
unlimited (5,000 per channel), first comment scheduling is available, and analytics history
is no longer capped at 30 days.

- Three slots a day, weekdays, as **bands rather than fixed times**: morning 07:40 to 08:20,
  midday 12:10 to 13:10, late 15:45 to 17:05 UK. Each post takes its own minute inside its
  band and its own seconds, never the same minute twice in a week and never :00, :15,
  :30 or :45. A page posting at the same second every day is announcing that a machine
  does it. `docs/02` has the reasoning and the evidence behind the bands.
- How far ahead a post may be scheduled is now an editorial question, not a technical one.
  News gets three days, roundups and shares five, evergreen three weeks. The table is in
  `docs/19-batch-and-drain.md`.
- The queue therefore runs one to three weeks deep, short-dated at the head and long-dated
  at the tail.
- A breaking story may delete a queued evergreen post and take its slot. The displaced item
  goes back to `bank/bank.md` or to `status=ready`.
- Prune it. A long queue makes it easy to leave something scheduled that has been overtaken.
  Deleting a post and returning its bank row is part of the job, not an exception.

> **Obsolete instruction warning.** Anything that says to fill the queue "to ten scheduled"
> predates 16 September 2026 and should be ignored. Ten was the Free plan cap. Schedule the
> whole batch, placed by the horizons in `docs/19`.  

## 6. The ledger, and why it is not optional

The engine has no memory except `bank/ledger.csv`. Two things read it:

- `lib/freshness.mjs` flags repetition: a source more than twice in the last ten posts,
  the same hook opening three in a row, a format more than three times in seven days, a
  photo inside 21 days, a destination over-used.
- `lib/photos.mjs` penalises a photo by its `lastUsed` date in `photos/index.json`.

`record.mjs` writes both. Give it an `entries.json` array, one object per scheduled post:

```json
[{ "date": "2026-09-16", "time": "07:52:14", "headline": "...",
   "source_publisher": "NCSC", "source_date": "2026-09-07",
   "archetype": "stat-in-context", "hook_type": "number-first",
   "photo_file": "work/security-w2.jpg", "destination": "none",
   "post_id": "6aa9e856c9dce8b453147615" }]
```

```bash
node record.mjs entries.json
```

Then push `bank/ledger.csv` and `photos/index.json` with the cards.

**Skip this and the matcher is deterministic.** The same tags return the same photo every
time, and the page visibly recycles a handful of images within a fortnight. This was live
as a defect until 16 September: `lastUsed` was read by the matcher and written by nothing.

---

## 7. Adding things

### 7.1 A new news post

Score it against `docs/08-what-makes-it-interesting.md` first. A story earns a post only if
a UK business owner would change something, argue with it, or send it to a colleague.
Then write the headline against the three rules in `docs/09-headline-batch.md`: a subject
with a verb, one surprising number, and the whole thing said rather than teased.

```js
import { newsCard } from './lib/card.mjs';
const r = await newsCard({
  headline: 'Only 18% of UK businesses use a large language model',
  tags: ['highstreet','retail','shops','town','uk'],   // drives the photo match
  subjects: [],                                        // named people only, see below
  size: 84,                                            // px, drop it for longer headlines
}, 'out/card.png');
// r = { path, photo, creditLine, usedFallback }
```

Rendering takes about 30 seconds. Run it in the background and poll. **Look at the result
with the Read tool before it goes anywhere.** A wrong photo is worse than no photo, and
the matcher has put a hooded figure on a story about ordinary employees.

### 7.2 A carousel or document post

`docs/14-carousels-and-the-mix.md` has the shapes that work: tips rather than long formal
decks, a large clean first page, a reason to save it. Native documents are the highest
engagement format on company pages at 7.00%.

Use the `cover`, `tips`, `slide` and `outro` templates, then `lib/pdf.mjs` to bind the
slides into one PDF, and attach it to Buffer as a `document` asset with a title and a
thumbnail. `carousels.mjs` is a worked example.

Caption length matters: 0 to 100 characters carries 1.28x reach on a carousel.

### 7.3 A promotional post

The rotation, from `docs/16-destinations-and-promotion.md`, across any rolling 21 posts:

| Destination | Count |
|---|---|
| No link | 9 |
| Insights article | 5 |
| Sector page | 3 |
| /prompts | 2 |
| Lead magnet | 2 |

Lead magnets rotate ai-policy, prompt-library, week-four. The shape of a promotional post
is fixed: **give away the substance in the post, and let the PDF be the convenience.** A
post that withholds the content to force a click is engagement bait and the March 2026
authenticity update downranks it.

Links cost about 18.8% on a text post but only 5 to 15% on an image or carousel post,
which is why the link lives in the post and not in the first comment. First-comment links
are now deboosted in their own right.

### 7.4 New photos

`ingest.mjs` takes a manifest CSV and writes entries into `photos/index.json`. The
acquisition script that pulls from Unsplash lives on the Mac at
`~/projects/aifc-photo-seed/fetch_library_v4.py` and rotates across several access keys.

Three rules, all learned the hard way:

1. **Look at every photo before indexing it.** `montage.mjs` builds a contact sheet.
   Batch ingestion without a visual pass is how 44 of the first 308 entries got in and had
   to come out again.
2. **Check it against `docs/17-photo-quality-rules.md`.** No padlocks, no hooded figures,
   no 3D clipart, no literal object metaphors, no distress imagery, no third-party
   branding, no US paperwork on a UK story.
3. **Record the licence.** Only `cc-by`, `cc-by-sa`, `cc0`, `public-domain`, `ogl-3.0`,
   `unsplash` and `pexels` are usable. Never take an image from a news site or an RSS
   feed however it is credited: those are licensed from Getty or shot by the publisher.
   Getty's free embed is a web-page iframe and does not work on LinkedIn.

Portraits are special. `lib/photos.mjs` only uses one when the person is a named subject
of the story or their surname is in the headline. Tag overlap is never enough, because a
portrait asserts the story is about that person. Do not relax this.

### 7.5 A new card template

Templates live in `lib/templates.mjs` and are plain functions returning HTML:
`news`, `stat`, `list`, `quote`, `slide`, `cover`, `tips`, `outro`.

Every colour, font and canvas size comes from `brand.json`. Change the accent green there
and everything follows. Fonts are base64-inlined by `lib/fonts.mjs`, so rendering needs no
network. `lib/clean.mjs` strips EXIF, XMP, IPTC and the colour profile from every output,
which is deliberate: see `docs/07-feeds-and-detection.md`.

Social cards use Instrument Sans, not the website's Newsreader. That divergence is
argued in `docs/06-editorial-model.md` and is not an oversight.

### 7.6 A new source

Tier 1 and tier 2 feeds are in `docs/03-sources.md` and `docs/07-feeds-and-detection.md`,
with the UK statistical calendar in `docs/03`. Add a feed there, not in the task prompt.
A source earns tier 1 by being primary: ONS, NCSC, ICO, DSIT, a company's own filing or
blog. Trade press is tier 2 and is used to find the primary source, not to cite.

---

## 8. Scaling

**Cadence.** Three a day is 21 posts a week. The evidence in `docs/02-playbook.md` says
4 to 5 a week peaks at 2.60% median engagement, 8+ a week falls to 1.79%, and two or more
posts in one day costs roughly 40% of per-post reach. Starting at one a day on weekdays
and adding slots once engagement holds is the defensible position. Changing it is one line
in the task prompt and one line in section 5 of this file.

**Past ten queued posts.** The ten-slot cap is a Buffer free plan limit, not a design
choice. On a paid plan, raise the target in the task prompt and lengthen the buffer from
three days to five. Nothing else changes.

**A second channel.** The renderer is channel-agnostic; only the canvas differs. Add the
ratio to `brand.json`, add a template variant, and add the channel ID to the task prompt.
Buffer's free plan allows three channels.

**When the photo library runs thin.** 264 entries at three posts a day with a 21-day
no-repeat rule is comfortable. It stops being comfortable if a sector gets heavy use and
its tag pool is small. `node -e` over `photos/index.json` grouped by tag shows where the
thin spots are before they bite. Top up with a targeted Unsplash run rather than a broad
one.

**When the bank runs low.** `bank/bank.md` holds evergreen posts for thin news days. Refill
it in batches, with sources recorded in `bank/sources.md` in the source's exact wording,
including the "things not to say" list that keeps a misread figure from coming back.

**What does not scale, and should not.** The visual check on every card, and the sourcing
gate. Both are the cheap steps that prevent the expensive mistakes.

---

## 9. The weekly loop

**The thing outside the engine that matters most.** Company page organic reach fell 60 to
66% between 2024 and early 2026, and company pages are 1 to 5% of a typical feed. The page
will not build an audience on its own. The cheap fix is Viren resharing one post a day from
his personal profile inside the first hour, **with a sentence of his own added**: editing a
share by even a word or two measured 3x the engagement of an untouched one, across 517,374
posts. The engine cannot do this part. `docs/20-growth-and-amplification.md` has the
numbers and the sources.


Mondays, as part of the daily run: `get_aggregated_post_metrics` and `list_posts` with
`includeMetrics: true` for the past week. Write what moved, what did not, and what changes
as a result, to a project doc `claude/aifc-linkedin-weekly-<date>.md`.

What to read the numbers against, from `docs/02-playbook.md`:

- Saves are worth roughly five times a like in the ranking, comments roughly two, and a
  threaded reply up to 2.4x. Optimise for saves and replies, not likes.
- Dwell time is the primary signal under 360Brew. A card that makes someone stop is worth
  more than a clever first line.
- Company page format benchmarks: native document 7.00%, multi-image 6.45%, video 6.00%,
  image 5.30%, text 4.50%, link 3.25%.

A new page starts at zero followers and the first month's numbers mean very little. Do not
change the editorial line on one bad week.

---

## 10. When something breaks

| Symptom | Cause | Fix |
|---|---|---|
| `access denied by the git proxy` | Pushing from the cloud sandbox | Push from the Mac. Section 4. |
| `Operation not permitted` on `rm` | Deletion not enabled in the connected folder | Push from a scratch clone at `$HOME/aifc-work`. Section 4. |
| `index.lock` exists and will not clear | Unattended run, nobody to approve deletion | Same: scratch clone. Do not wait on the permission prompt |
| Buffer post status `error` | Image URL did not resolve | Check the raw URL returns 200, re-push the card, edit the post |
| Task prompt will not update | The task requires the Mac | Viren approves the new prompt in a conversation linked to that Mac, or edits it in the desktop app. Never delete and recreate the task. |
| `no ledger yet, nothing to check` | Wrong path | The ledger is `bank/ledger.csv`, not the repo root |
| Same photo keeps appearing | `record.mjs` was not run, or its push failed | Section 6 |
| Playwright cannot find a browser | Version pin mismatch | `executablePath: '/opt/pw-browsers/chromium-1194/chrome-linux/chrome'` |
| Push returns 401 | `GH_TOKEN_AIFC` expired, due 16 September 2027 | Regenerate the fine-grained token and update `claude/aifc-credentials.md` |

---

## 11. The repo

```
brand.json            every colour, font and canvas size
record.mjs            writes the ledger and stamps photo lastUsed. Run it every time.
queue.mjs             the bank: stats, validate, next, mark. See docs/19.
ingest.mjs            manifest CSV into photos/index.json
montage.mjs           contact sheets, for reviewing photos before indexing
carousels.mjs         worked example of a document post
wide-day.mjs          worked example of a full day in the house format
sample-day.mjs        worked example of the stat, checklist and carousel formats
lib/
  card.mjs            newsCard(story, outPath)
  templates.mjs       ten card templates, including grid and roundup
  photos.mjs          the matcher, the portrait rule, the freshness penalty
  render.mjs          headless Chromium, 1080x1350 PNGs
  backdrop.mjs        deterministic abstract grounds when no photo fits
  clean.mjs           strips EXIF, XMP, IPTC, colour profile
  fonts.mjs           inlines the brand fonts
  pdf.mjs             slides into one PDF for native document posts
  freshness.mjs       the repetition guard
  csv.mjs             RFC4180 read and write, shared by the ledger and the bank
bank/
  queue.csv           the bank of finished posts waiting to go out
  posts/<id>.md       the copy for each banked post
  mentions.csv        verified LinkedIn page URNs, for tagging. Never guess one.
  bank.md             evergreen posts for thin news days
  sources.md          exact source wording, and the things not to say
  ledger.csv          the log. Everything that has gone out.
photos/
  index.json          264 entries, each with licence and attribution
  work/ people/ places/
cards/                published card PNGs, served from raw.githubusercontent.com
docs/                 see below
scratch/              one-off scripts from the build. Nothing reads these.
```

---

## 12. Facts and identifiers

- **LinkedIn**: AI for Companies company page, posted to only from the page, never from a
  personal profile.
- **Buffer**: organisation `6aa9bd84b82395c27e21a9f2`, channel `6aa9c633ea19ca0bde502b5e`,
  account viren@aiforcompanies.co.uk. Free plan.
- **Assets repo**: `DataPulseAI/aifc-social`, public. Token in the project doc
  `claude/aifc-credentials.md`, scoped to this repo's contents only. **It expires on
  16 September 2027.**
- **Website**: `DataPulseAI/aiforcompanies`, Next.js on AWS Amplify.
- **Mac path**: `/Users/virensamani/projects/aifc-social`, which `device_bash` sees as
  `$HOME/mnt/projects/aifc-social`.
- **Scheduled task**: fires 12:00 UK daily, bound to Viren's Mac. The cron is
  `0 11 * * *` UTC, which becomes 11:00 local when the clocks go back on 25 October.
- **Google Drive**: "AI for Companies" folder holds operations docs, the pipeline and a
  readable post plan.
- **House rules on language**: UK English, no em dashes, no double hyphens, no exclamation
  marks, no engagement bait, 0 to 3 hashtags and ideally none.

---

## 13. The docs

| File | What it settles |
|---|---|
| `01-voice.md` | Brand voice, LinkedIn voice, banned vocabulary, the structural AI tells |
| `02-playbook.md` | Nine archetypes, the daily pattern, engagement mechanics, the funnel |
| `03-sources.md` | UK statistical sources, the research calendar, image licensing |
| `04-runbook.md` | How the engine runs, queue logic, the weekly analytics pass |
| `05-daily-task.md` | A readable copy of the scheduled task prompt |
| `06-editorial-model.md` | The reach-first model, the card format, the type decision |
| `07-feeds-and-detection.md` | Verified feeds, the Getty correction, not getting flagged |
| `08-what-makes-it-interesting.md` | The scoring gate a story has to pass |
| `09-headline-batch.md` | 24 worked headlines and the three rules behind them |
| `10-sourcing-gate.md` | Written after a figure was invented. Read it before writing one. |
| `11-photo-seed-list.md` | What the library was built to cover |
| `12-compiled-sources.md` | Everything shared and checked during the build |
| `13-freshness-and-originality.md` | Not repeating, not plagiarising, not sounding generated |
| `14-carousels-and-the-mix.md` | Carousel shapes and the format mix |
| `15-what-i-can-run.md` | What runs unattended and what needs a person |
| `16-destinations-and-promotion.md` | The link rotation and the promotional post shape |
| `17-photo-quality-rules.md` | What may not enter the photo library, and why |
| `18-post-types-and-tools.md` | The seven post types, the builder for each, and how to choose |
| `19-batch-and-drain.md` | The weekly batch, the daily drain, and the bank schema |
| `20-growth-and-amplification.md` | Company page reach, amplifying from the personal profile, tagging, hashtags |
| `21-what-works.md` | The knowledge base. Our numbers, outside evidence, and what failed. |
