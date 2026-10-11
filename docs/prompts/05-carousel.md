# 05. The carousel: one finished result, one slide at a time

Written 11 October 2026. Card schema: `carousel`. Ships as a PDF document post through Buffer's
`document` asset (`docs/14` section 6). Where this file and `docs/14` disagree on slide count,
the save cue or the outro, this file wins, because it rests on newer evidence and on `docs/29`.
`docs/01` (voice) and the shared brief's card law win over this file.

---

## 1. Aim, reader moment, metric

**Aim.** A nervous beginner swipes from nothing to one finished thing: an email sent, a quote
written, a rule understood. Not "learn about AI". One result they can point at before Friday.

**Reader moment.** The owner of a 20-person firm, on a phone, between jobs. Heard of ChatGPT,
tried it once, felt slightly daft. Has two minutes and will give them to something that looks
easy and specific. The cover is the only slide the feed shows them, so the cover decides.

**Metric, in order.**

1. **Completion.** Did they reach the last slide. The proxy we can see is the end slide's CTA
   click and reactions per impression; LinkedIn's own page analytics may show document page
   views, which we have not checked for the company page. Buffer does not expose either.
2. **Saves.** The honest signal for "I'll use this". AuthoredUp found documents are 12.92% of
   all saved posts while being 4.88% of posts, about 2.6 times their share (see section 2).
3. **Dwell.** Time spent swiping. Not exposed to us at all; it is the mechanism, not a number
   we can report.

**Why this style exists.** Every other format we run gives the reader one thing. A carousel is
the only one that can carry a beginner through an order: step three only makes sense after step
two. That is also why it earns dwell: the reader stays because the next slide is the next step.

**One warning before the evidence.** The format's reach advantage is measured mostly on large
personal profiles. AuthoredUp's own follower split says profiles under 5,000 followers do better
with images than documents on both reach and engagement. Our page had 8 followers on 21
September (`docs/23`). So the carousel is our save-and-dwell format, not our reach format. Two a
week at most, as `docs/14` already says, and only when the topic really is a sequence.

---

## 2. What works

### Our own references

- **`docs/14` sections 1 and 2.** One idea per slide, under 30 words of body, big type, caption
  under 150 characters, the cover "is most of the performance", a number in the cover title.
  Kept. Its six-slide shape put an eyebrow and a "Swipe. Save it for Monday" cue on the cover;
  both are now out (card law rule 2 and `docs/29` rule 5).
- **`docs/29` rule 4.** A carousel carries no photograph, name or wordmark on the cover or the
  content slides. It ends on one slide: the mark once (wordmark on the page, Viren's photograph,
  name and tagline on the profile), a value line ("One of these a week. Something you can use
  before Friday."), and a single CTA. Rule 5: one save or share line per post, on the end slide,
  in LinkedIn's words only ("Save for your next quote", "Save for Friday", "Save for your next
  meeting", "Share with a friend").
- **`docs/02` section D.** The penultimate slide is the summary, "so the whole deck is
  screenshot-able in one frame". Kept: it is the slide people save.
- **`carousels.mjs`.** Three built decks: 20 prompts, week four, one-page policy. What they get
  right: the prompts are given in full ("Summarise this thread and tell me what I am being asked
  to decide"), grouped by the moment in the week. What we now refuse in them: every slide has an
  eyebrow ("Monday, 9am", "Number one"), three type sizes plus the eyebrow, five items per slide
  (five ideas, not one), and the cover carries a sub, an eyebrow and a swipe cue competing with
  the title. They were written for an audience that already uses the tools; the cover "20
  prompts to try at work this week" assumes the reader knows what a prompt is.
- **`viren/formats.md` section 6 and "the cover rules".** "A number in the title sets the
  contract." "Slide two has to pay immediately, because that is where the reader decides."
  "Long is allowed if every page stands alone; long is fatal if the value is back-loaded." Kept
  whole.
- **`references/claims.md`.** Our verified register: documents 1.39x reach and 1.30x engagement
  (AuthoredUp); 8 to 10 slides best (van der Blom 2025 via Mercer-Mackay); "6 to 8 with
  substance" (AuthoredUp). Those rows were verified on 23 September; this task re-opened the
  AuthoredUp page (below) but not Mercer-Mackay, so the van der Blom figure is quoted from our
  register, not re-checked.
- **Contact sheets, viewed with Read for this task.**
  - `references/winners/hassid-contact.jpg`: eight top non-video posts, all single images, none
    a document. The teaching devices carry over anyway: "My mom asked me, what the hell is
    Claude" uses a beginner's own questions as the structure; "4 Things to Set up in Claude in
    2026" has the subline "No files, no folders, nothing to maintain. Do these in order", which
    is a whole cover formula for a nervous reader in eleven words.
  - `references/winners/hills-contact.jpg`: dark, dense, many small labels. Saveable for
    developers, unreadable at half size for our reader. Refused as a look.
  - `references/winners/donnelly-contact.jpg`: the "Average Millionaire Is 61" image is one
    statement a line, huge serif, the key phrase highlighted: the clearest single-idea slide in
    the set. The framework sheets beside it are the opposite of one idea a slide.
  - `references/supplied/nicolas-cole-22-writing-rules-carousel.png`: a real document post in
    the feed (see creators below). It also shows what LinkedIn does to the PDF title: it
    displays as "22 Writing Rules That Made Me ... · 24 pages", cut after about 28 characters.
    One observation, but it sets our PDF title rule.

### Outside evidence, 2025 to 2026, opened during this task

| Finding | Source | Sample |
|---|---|---|
| Documents: 1.39x reach, 1.30x engagement against the average post; 1.72x and 1.63x for the top 5% of profiles | [AuthoredUp, best performing content on LinkedIn, updated 2 September 2026](https://authoredup.com/blog/best-performing-content-on-linkedin) | 3M+ posts, personal profiles, March 2025 to February 2026 |
| Under 5,000 followers, images beat documents on reach and engagement | same | follower-bracket table, October 2025 to March 2026 |
| Documents are 12.92% of saved posts against 4.88% of posts | same | saved-post analysis, March 2025 to February 2026 |
| Document captions of 0 to 100 characters: 1.28x reach. "Let the slides speak, keep the caption tight" | same | same 3M+ set; the page gives no engagement figure for this range |
| Median likes by slide count: 2 to 5 slides 22, 6 to 8 slides 26, 9 to 12 slides 49, 13 to 20 slides 58, 21+ slides 60. Under 5k followers: 13, 16, 19 (2 to 8, 9 to 12, 13+). Median deck is 8 slides | [MagicPost, how many slides should a LinkedIn carousel have, updated 5 June 2026](https://magicpost.in/blog/how-many-slides-in-a-linkedin-carousel) | 67,765 PDF document posts over 12 months, medians, likes and comments only, no reach. The author warns that effort is confounded with length |
| Native documents average 6.90% engagement against 5.00% for images; suggests 8 to 12 slides | [Socialinsider, LinkedIn carousel, 31 August 2026](https://www.socialinsider.io/blog/linkedin-carousel/) | sample size and method not published |
| Carousels "585% better than text posts"; examples page suggests six to nine slides | [Buffer, LinkedIn carousel examples, 25 May 2026](https://buffer.com/resources/linkedin-carousel-examples/) | attributed to Buffer's State of Social Engagement report, 52M+ posts, 200,000+ accounts; we opened the article, not the report |

**What the evidence settles.**

- **Slide count: 8, sometimes 9, never padded.** Longer decks get more likes in MagicPost's
  data, but the gain for small accounts is three likes (13 to 16) and the author says effort
  explains part of it. Our schema caps at 9. Eight is the median deck and leaves room for cover,
  six working slides and the end. `docs/14`'s "five to seven" is retired.
- **Caption: under 100 characters where possible, never over 150.** `docs/01` says under 150;
  AuthoredUp's document-specific finding says the shortest band reaches furthest.
- **Cover: the outcome, plainly, with a number.** No study we opened measures cover designs.
  Socialinsider and MagicPost both give the same advice (lead with a clear outcome; slide one is
  the only thing the feed shows) without data. Treat it as consensus, not proof.
- **Text per slide: nobody publishes a measured limit.** Our 30-word body cap comes from
  `docs/14` and the 34px floor in the card law; at 40px on a 912px measure, 30 words is about
  five lines. That is a design rule, not a finding.

### Creators whose carousels teach non-experts well

Honest about what we saw: only Cole's was viewed as a carousel in this task. The others are
from our own captures in `references/`.

1. **Nicolas Cole, "22 Writing Rules That Made Me A Millionaire Writer", 24 pages**
   (`references/supplied/nicolas-cole-22-writing-rules-carousel.png`, 113 reactions, 47
   comments as captured). Cover: his photograph on the top half, then the number and promise in
   yellow on black, three lines. Slide two pays at once: "1. You can't steer a stationary
   ship", then three short lines ending "Just get started." Every page is one rule that stands
   alone. **Take:** the number as the contract, the rule as the headline, slide two pays.
   **Refuse:** the face on the cover (`docs/29` rule 4), the body type, which is far below 34px
   at full size, 24 pages, and the money-brag frame.
2. **Alex Hormozi, five-page carousel** (`references/scoring.md`, 1,313 reactions). A cover with
   a swipe button, then one statement per slide with nothing under it. **Take:** one idea at full
   size; white space used for the sentence, not around it. **Refuse:** advice that only works
   because of who says it.
3. **Ruben Hassid** (`references/winners/hassid-contact.jpg`, `references/creators/ruben-hassid.md`).
   Not a carousel creator in our capture, but the best beginner teacher in it: "My mom asked me
   what the hell is Claude" (1,608 reactions) uses her six questions as the teaching device, and
   "Do these in order" turns a list into a sequence. **Take:** the beginner's own question as the
   cover, the order stated. **Refuse:** the density of his sheets.
4. **Heather Murray, "AI for Non-Techies"** (`references/creators/heather-murray.md`). The
   closest competitor and the closest audience: 3 document posts in the 37 we read. We did not
   open her slides, so we take only what we read in her posts: permission to not know, said by
   someone who could say otherwise. **Take:** the tone of the cover body. **Refuse:** nothing
   specific, because we have not seen the slides.
5. **Gray, "10 unsexy habits" photo carousel** (`references/scoring.md`, 460 reactions, 253
   comments). Nine full-bleed photographs, a bracketed number and one lowercase line each.
   **Take:** one line a slide is enough when the line is concrete. **Refuse:** the photograph
   for the page's teaching carousels; it belongs to the profile track.

### What we take, what we refuse

| Take | Refuse |
|---|---|
| A cover that states the finished result and the time it takes | Teaser covers ("The policy nobody reads") |
| Slide two does the first step, not an introduction | "Why this matters" slides |
| The exact words to type, in full, on the slide | Advice about prompting ("be specific") |
| One idea per slide, title plus at most 30 words | Five-item lists on a slide; eyebrows; three type sizes |
| A summary slide before the end, the screenshot slide | A summary that introduces anything new |
| One end slide: mark, value line, one CTA, one save line | Wordmark, handle or URL on every slide |
| A caption under 100 characters, 150 at most | A caption that retells the slides |
| PDF title of 28 characters or fewer, front-loaded | A filename or the full cover line as the title |

---

## 3. THE PRODUCTION PROMPT

Copy everything inside the fence. Fill the three inputs at the top.

```text
You are writing one LinkedIn carousel (a PDF document post, 1080x1350 slides) for the AI for
Companies company page. AI for Companies trains staff at UK small and medium businesses to use
the AI tools they already have.

INPUTS
- TOPIC: [one task a beginner will finish, or one set of rules they will apply]
- SECTOR (optional): [e.g. dental practice, estate agent, builders' merchant, charity; or "any"]
- DESTINATION: [one page on aiforcompanies.co.uk that already exists and that you have opened]
- SOURCE (only if the carousel states a fact, a count or a rule from a publisher): [URL you have
  opened in this run, its publisher, and the date shown on it]

THE READER
An owner or manager of a UK business with 5 to 250 staff. Not technical, slightly intimidated,
has maybe tried ChatGPT once. Reading on a phone. They must never feel stupid, lectured or sold
to. They want: what do I type, into what, and what do I get back, today. Write at reading age
12. Contractions are fine. Name tools plainly: "ChatGPT, Copilot or Gemini, whichever you have".
Never use: agentic, LLM, tenant, roadmap, GA, Purview, use case, workflow automation, leverage,
transformation, prompt engineering, model, deploy, or any word the reader would need to look up.
If you must use "prompt", the first time say "the words you type".

STEP 1. CHECK THE TOPIC SUITS SWIPING
A carousel is right only if the topic is one of:
- a SEQUENCE: steps that end in one finished thing (an email sent, a quote written), where
  step 3 needs step 2; or
- a SET: 5 to 7 parallel items the reader applies one at a time to the same situation (checks
  before you send, risks on a list), each usable alone.
Send it elsewhere if:
- it is one prompt: use the prompt card;
- it is one number: use the stat card;
- it is 3 to 6 items with no order and fits on one image: use the cheatsheet card;
- it needs more than 7 working slides: cut the scope until it doesn't;
- the reader cannot finish it at a desk this week: it is not a carousel topic.
Write one line: "Sequence" or "Set", and the finished result in under 12 words. If you cannot,
stop and pick another topic.

STEP 2. THE SHAPE: 8 slides, 9 only if the sequence needs it, never 6 or 7 by padding down
nor 9 by padding up
- Slide 1, kind "cover".
- Slide 2, kind "step": the first step or first item. It pays immediately. No introduction,
  no "why this matters", no definitions slide.
- Slides 3 to 6 (or 7), kind "step": one step or item each.
- The last "step" slide is the summary: the whole thing in one slide, every step as a few
  words, in order. Title: "The whole thing on one slide" or a plain variant. It adds nothing
  new.
- Last slide, kind "end".

STEP 3. THE COVER
Formula: [the finished result] + [a number: minutes, steps or items] + [who it's for, if a
sector]. Title up to 10 words. Body is one line, up to 22 words, saying what they will have at
the end, or naming the source if the carousel is built on one. No eyebrow, no swipe cue, no
"save this", no question, no "you're doing it wrong". It must be understandable by someone who
has never used AI. Examples of the formula:
1. "Your first 15 minutes with ChatGPT at work" / "By the end, you'll have one real email
   written and sent."
2. "Site notes to a written quote in about 10 minutes" / "For builders and trades. Your
   prices stay yours."
3. "Reply to a complaint calmly, in 4 steps" / "Paste the complaint in. Get a reply you'd be
   happy for anyone to read."
4. "Turn a 30-email thread into 3 lines" / "What's been decided, what you're being asked, and by
   when."
5. "Your staff handbook, rewritten so people read it, in 5 steps" / "One section at a time. You
   check every word before it goes out."
6. "Last month's numbers, as a paragraph your team understands" / "Paste the spreadsheet. Get
   five plain sentences you can read out on Monday."
7. "8 data risks with AI that acts for you" / "The ICO's list, in plain English, with one
   thing to do about each."
8. "6 checks before you send anything AI helped write" / "Takes two minutes. Catches the
   mistakes people notice."

STEP 4. EACH STEP SLIDE
- One idea. If you write "and also", it is two slides or one gets cut.
- Title: up to 10 words, an instruction or a plain statement ("Type this, word for word",
  "Put the prices in yourself"). Never a teaser or a pun.
- Body: up to 30 words. It says exactly what to do, what to type, or what to check.
- When the body is the words to type, put them in double quotes, in full, with [square
  brackets] for the parts the reader fills in. That slide may run to 45 words and carries
  nothing else. The words must work in ChatGPT, Copilot and Gemini as written.
- Give the words, not advice about words. "Be specific" fails. "Say yes to the meeting and
  suggest Tuesday morning" passes.
- At least one slide in every carousel tells the reader to check the output themselves, and
  any carousel where they paste anything in has a slide on leaving out private details
  (names, bank details, health information).
- No statistics unless they come from SOURCE. If one does, the slide's body ends with a line
  starting "Source: " (publisher and date) and the renderer sets it in the footer size.
- Never invent a client, a result, a time saved or a quote. Time on the cover is an estimate
  of the task, written "about" unless it is the reader's choice ("your first 15 minutes").
- Examples are framed as examples: "say you run a dental practice", never "one of our clients".

STEP 5. THE END SLIDE (docs/29 rule 4)
- Title: the value line, exactly: "One of these a week. Something you can use before Friday."
- Body, line 1: the single CTA, one sentence naming what is at DESTINATION and the bare
  address, e.g. "25 more prompts like this, free: aiforcompanies.co.uk/prompts".
- Body, last line: one save or share line, exactly one of: "Save for your next quote",
  "Save for Friday", "Save for your next meeting", "Share with a friend".
- If the carousel touches UK GDPR, employment or contracts, a line before the save line:
  "This is not legal advice."
- Nothing else. The wordmark appears here and only here; the renderer adds it. No logo, handle,
  URL or "follow us" on any other slide.

STEP 6. THE CAPTION
Under 150 characters including spaces; aim under 100. It says who it's for and what they'll
have, and may point at the one slide people will want ("The words are on slide 4"). It does not
retell the slides. No hashtags, no question, no "save this", no link. If the carousel touches
UK GDPR, employment or contracts, the caption ends "This is not legal advice." (that line
counts towards the 150).

STEP 7. THE PDF TITLE
The title Buffer sends with the document asset, shown by LinkedIn under the document. Up to
28 characters so it is not cut. Front-load the result: "First 15 minutes with ChatGPT",
"Site notes to quote". Never a filename, never a date, never our name.

STEP 8. OUTPUT
Return exactly:
1. Type: Sequence or Set, and the finished result.
2. The card JSON:
{"template":"carousel","slides":[
  {"kind":"cover","title":"","body":""},
  {"kind":"step","title":"","body":""},
  ...
  {"kind":"end","title":"One of these a week. Something you can use before Friday.","body":""}
]}
Use \n inside "body" only to separate lines on the end slide and a "Source: " line.
3. Caption, with its character count.
4. PDF title, with its character count.
5. Sources opened, with URL and date, or "none".

STEP 9. SELF-CHECK. Fix and re-check before returning; report any line you could not fix.
[ ] Slide count is 8 or 9; cover first, end last, summary second to last.
[ ] Slide 2 is a step, not an introduction.
[ ] Every title is 10 words or fewer (the fixed end-slide value line excepted); every body 30 words or fewer (45 on a words-to-type
    slide; 22 on the cover).
[ ] Every slide has one idea. Read each aloud: is there an "and also"?
[ ] Someone who has never opened ChatGPT could follow every slide without asking anything.
[ ] Every words-to-type block is in quotes, complete, and works in all three assistants.
[ ] There is a check-it-yourself slide; there is a leave-out-private-details slide if anything
    is pasted.
[ ] No banned word from docs/01 section 4 or from the reader list above. No "Most people".
[ ] No em dashes, no double hyphens, no exclamation marks, no emoji, no hashtags, no italics,
    no "I". UK spelling. Dates as 20 July 2026.
[ ] No invented client, result, time saved, quote or statistic. Every figure has its source
    on the slide and you opened that source in this run.
[ ] The end slide has the value line, one CTA, one save line, and nothing else.
[ ] Caption under 150 characters, no question, no link, no bait.
[ ] PDF title 28 characters or fewer.
[ ] Legal line present if UK GDPR, employment or contracts are touched.
[ ] Read the cover alone: would an owner who has never used AI know exactly what they get?
```

---

## 4. Two worked examples

Word counts were checked by script; every body is within its limit. The time estimates are
estimates of the task, not results from anyone.

### Example A. "Your first 15 minutes with ChatGPT at work"

Type: Sequence. Finished result: one real email written with an assistant and sent.

```json
{"template":"carousel","slides":[
  {"kind":"cover","title":"Your first 15 minutes with ChatGPT at work","body":"By the end, you'll have one real email written and sent. Copilot and Gemini work the same way."},
  {"kind":"step","title":"Open the one you already have","body":"ChatGPT, Copilot or Gemini. If your work already gives you one, use your work login. There's nothing to install."},
  {"kind":"step","title":"Pick one email you'd write anyway","body":"A reply you've been putting off is ideal. Real work beats practice, because you'll know straight away whether the answer is any good."},
  {"kind":"step","title":"Type this, word for word","body":"\"Write a short, friendly reply to this email. Say yes to the meeting, suggest Tuesday or Thursday morning, and keep it under 100 words. Here's the email: [paste it]\""},
  {"kind":"step","title":"Then tell it what to change","body":"Treat the first answer as a draft. Type \"shorter\", \"less formal\" or \"sound more like me\" and it rewrites. Two or three goes is normal."},
  {"kind":"step","title":"Leave out anything private","body":"No bank details, health information or customer names. Write \"the client\" instead. If you wouldn't email it to the wrong person, don't paste it."},
  {"kind":"step","title":"Read every line before you send","body":"It can sound sure and still be wrong. Check each date, name and number yourself. You're sending it, so it's yours."},
  {"kind":"step","title":"The whole thing on one slide","body":"Open the one you have. Pick a real email. Paste the words. Ask for changes. Leave out private details. Check, then send."},
  {"kind":"end","title":"One of these a week. Something you can use before Friday.","body":"25 more prompts like this, free: aiforcompanies.co.uk/prompts\nSave for Friday"}
]}
```

Caption (92 characters):

> Never used ChatGPT at work? Fifteen minutes, one real email, done. The words are on slide 4.

PDF title (26 characters): "First 15 mins with ChatGPT".

Why it works: the cover promises a finished, visible result in a fixed time; slide 2 is already
doing; the only words to type are on one slide in full; the two habits that keep a beginner
safe (private details, checking) are slides of their own, not footnotes. No statistic, so no
source. The data slide is a habit, not a statement of law, so no legal line is needed; if an
editor adds anything about what the law requires, add "This is not legal advice." to the end
slide and the caption.

### Example B. Sector: builders and trades, "From site notes to a written quote"

Type: Sequence. Finished result: a quote letter ready to send, with the owner's own prices.

```json
{"template":"carousel","slides":[
  {"kind":"cover","title":"Site notes to a written quote in about 10 minutes","body":"For builders and trades. You'll finish with a clear quote letter, and your prices stay yours."},
  {"kind":"step","title":"Talk your notes into your phone","body":"Use the microphone on your phone's keyboard. Say what you saw, the work needed, materials and how long. Messy is fine."},
  {"kind":"step","title":"Paste the notes in","body":"Open ChatGPT, Copilot or Gemini, whichever you have. Paste the notes. Leave out the customer's name and address for now."},
  {"kind":"step","title":"Type this, word for word","body":"\"Turn these notes into a quote letter for a homeowner. Plain English. List the work in order, what's included, what isn't, and how long it takes. Write [PRICE] wherever a price goes. Notes: [paste]\""},
  {"kind":"step","title":"Put the prices in yourself","body":"It doesn't know your rates or what materials cost you this week. Fill every [PRICE] from your own figures. Never let it guess a number."},
  {"kind":"step","title":"Ask what's missing","body":"Type: \"What would a homeowner ask that this quote doesn't answer?\" Add the answers now, before they ring you."},
  {"kind":"step","title":"Add their details, check, send","body":"Put the customer's name and address back in. Read every line as if you were them. It's your quote, so it's your call."},
  {"kind":"step","title":"The whole job on one slide","body":"Talk notes into your phone. Paste them in. Use the words on slide 4. Add your own prices. Ask what's missing. Check, then send."},
  {"kind":"end","title":"One of these a week. Something you can use before Friday.","body":"More for property and construction teams: aiforcompanies.co.uk/industries/property-construction\nSave for your next quote"}
]}
```

Caption (95 characters):

> Builders and trades: site notes to a written quote in about 10 minutes. Your prices stay yours.

PDF title (19 characters): "Site notes to quote".

Why it works: the reader recognises their own evening (notes on site, paperwork at night) on
the cover. The two fears a trades owner has about AI, that it makes up prices and that the
customer will notice, each get a slide that answers them by keeping the owner in control. A
quote is a contract offer, but the carousel says nothing about what a quote must contain in
law, so no legal line; if a version adds terms, deposits or cancellation rights, add "This is
not legal advice." to the end slide and caption.

---

## 5. Before and after: 2026-09-25-ico-eight-risks

### The source, re-opened on 11 October 2026

[ICO, ICO tech futures: agentic AI](https://ico.org.uk/about-the-ico/research-reports-impact-and-evaluation/research-and-reports/technology-and-innovation/tech-horizons-and-ico-tech-futures/ico-tech-futures-agentic-ai/),
page read 11 October 2026. What the page says, checked:

- Under "Novel agentic AI data protection risks" it lists eight bullets. We counted them:
  (1) controller and processor responsibilities through the agentic AI supply chain;
  (2) rapid automation of increasingly complex tasks, so more automated decision-making;
  (3) purposes set too broadly, to allow open-ended tasks and general-purpose agents;
  (4) processing personal information beyond what is necessary;
  (5) potential unintended use or inference of special category data;
  (6) complexity hurting transparency and people's ability to exercise their information rights;
  (7) new threats to cyber security; (8) concentration of personal information to support
  personal assistant agents.
- The sentence the post quoted is there: organisations "remain responsible for data protection
  compliance of the agentic AI they develop, deploy or integrate".
- The introduction chapter says: "The reports are not guidance or formal regulatory
  expectations". The original post never said this, and an owner should know it.
- **Date: not verified.** The page shows no published or updated date. Its metadata says
  8 October 2026 (the introduction page says 17 August 2026), which look like edit dates. The
  bank post says "published 8 January 2026"; the introduction cites events from November 2025,
  which fits, but we could not confirm the day. So the rebuilt carousel cites the page and the
  date we read it, and states no publication date.

### Before

The card (`cards/2026-09-25-ico-eight-risks.png`): a dim stock photograph of a laptop, phone,
watch and headphones on a desk by a window, the wordmark at the top, and "The ICO has named eight
ways an AI agent can put you on the wrong side of data law" over the bottom. It names none of the
eight. The photograph carries no information. The body names four risks in the report's own
words ("purposes written so broadly", "special category data") and ends on a sector page link.
An owner who doesn't know what "an AI agent" or "special category data" is gets a worry and
nothing to do. It fails card law rules 1 and 2 and the reading-age rule.

### After

Type: Set. Finished result: an owner knows the eight risks in plain words and has one thing to do
about each. Risks 7 and 8 share a slide, because to an owner they are one idea (the more one tool
can reach, the more there is to lose); slide 8 says so plainly so nothing is hidden. The actions
are our suggestions, not the ICO's, and the slides are written so that reads clearly.

```json
{"template":"carousel","slides":[
  {"kind":"cover","title":"8 data risks with AI that acts for you","body":"The ICO's list, in plain English, with one thing to do about each. From a research report, not official guidance."},
  {"kind":"step","title":"1. Nobody's sure who's responsible","body":"The ICO is clear: you stay responsible for AI you use, even if someone else built it. Ask your supplier, in writing, what happens to your data.\nSource: ICO, tech futures: agentic AI, read 11 October 2026"},
  {"kind":"step","title":"2. More decisions, nobody checking","body":"AI that does tasks on its own makes more choices without a person. Keep a named person checking anything that affects a customer or a member of staff."},
  {"kind":"step","title":"3. The job is too vague","body":"\"Help with admin\" lets it touch everything. Give it one clear job, like \"draft replies to booking enquiries\", and nothing more."},
  {"kind":"step","title":"4. It sees more than it needs","body":"If the job needs dates, don't hand over the whole customer file. Connect the one folder it needs, not your whole drive."},
  {"kind":"step","title":"5. It works out private things","body":"From ordinary emails it can pick up someone's health, religion or similar. Don't use it to sort, rank or judge people."},
  {"kind":"step","title":"6. You can't explain what it did","body":"If a customer asks what happened to their data, you need an answer. Keep a one-page note: which tool, which job, which data."},
  {"kind":"step","title":"7 and 8. Everything in one place","body":"The ICO lists new security threats, and one assistant holding everything about a person. The more it reaches, the more you can lose. Switch off unused connections."},
  {"kind":"end","title":"One of these a week. Something you can use before Friday.","body":"Turn this into a one-page AI policy: aiforcompanies.co.uk/insights/ai-usage-policy-uk-template\nThis is not legal advice.\nShare with a friend"}
]}
```

Caption (118 characters):

> The ICO lists 8 data risks with AI that does tasks for you. Here they are, in plain English. This is not legal advice.

PDF title (25 characters): "The ICO's 8 AI data risks".

What changed: the eight are named instead of teased; every risk has a thing to do on the same
slide; "agentic", "special category data", "controller", "processor" and "transparency" are gone;
the report's own status (not guidance) is on the cover so the owner is informed, not frightened;
the date we could not verify is not stated; the stock photograph is gone; the sector pitch is
replaced by one CTA on the end slide; the legal line is on the end slide and in the caption.

Every body is within 30 words; slide 2's Source line is extra and set in the footer size.

---

## 6. Fail list: eight ways a carousel dies, and the fix

1. **The teaser cover.** "The policy nobody reads", "Six jobs to hand your assistant". The
   reader cannot tell what they get, so they don't swipe. **Fix:** cover names the finished
   result and a number: "Reply to a complaint calmly, in 4 steps".
2. **Slide two is a preamble.** "Why AI matters for small businesses", a definitions slide, a
   statistic to create worry. The reader decides on slide two and leaves. **Fix:** slide two is
   step one. If the deck still makes sense with slide two deleted, delete it.
3. **Advice instead of the words.** "Be specific about what you want." A beginner does not know
   what specific looks like. **Fix:** put the full words to type in quotes, with [brackets] for
   their bits, on one slide with nothing else.
4. **Two ideas a slide, so small type.** Five tips per slide, an eyebrow, a sub, three type
   sizes; body falls under 34px and nobody reads it at half size. **Fix:** one idea, title plus
   30 words. If it doesn't fit, it is two slides or one gets cut.
5. **A list dressed as a sequence, padded to a count.** Nine slides where four would do, or
   steps in no real order. Completion drops and the reader feels the padding. **Fix:** if there
   is no order and it fits on one image, make it a cheatsheet card. A carousel is for an order.
6. **Selling on every slide.** Wordmark, handle and URL on each slide, a pitch on the last.
   **Fix:** `docs/29` rule 4: content slides carry nothing but content; the end slide carries the
   mark, the value line, one CTA and one save line.
7. **A long caption that retells the deck.** It delays the tap and, per AuthoredUp, the shortest
   document captions reach furthest. **Fix:** under 100 characters where possible, 150 at most:
   who it's for, what they'll have, which slide has the words.
8. **Jargon, fear or invented proof.** "Agentic", "your tenant", "special category data", "saves
   five hours a week", "one of our clients". The nervous reader feels stupid or lied to. **Fix:**
   reading age 12, tools named plainly, no result or client we don't have, every figure sourced
   on the slide from a page opened in this run, and "This is not legal advice." wherever UK GDPR,
   employment or contracts come up.

Two smaller failures the self-check also catches: a PDF title that is a filename or gets cut
(keep it to 28 characters), and a deck with no slide telling the reader to check the output and
leave private details out.
