# 02. Try this: one task, the prompt, what comes back

Written 11 October 2026. The production standard for AIFC's core teaching unit: one everyday job at a small or medium UK business, the exact words to type, and what comes back. Where this disagrees with `docs/29` on card fields, the shared brief's schemas win, because the renderer in `lib/cards2.mjs` is built to them. Everything else in `docs/29` (one headline, the caption test, Illustrative marking, the two-page document) still stands.


## 1. Aim

**The reader moment.** It's 4.40pm on a Tuesday. The owner of a 14-person plumbing firm has an invoice 30 days overdue, or the practice manager at a dental surgery has just read a one-star review. They are scrolling LinkedIn on their phone for two minutes between jobs. They see a card that names their exact problem in its first line, read a prompt short enough to take in at a glance, swipe once, and see the finished thing. They copy the words into whichever assistant they have, paste in their own detail, and have something usable before they've finished their tea. They feel capable, not lectured.

**The test of a post.** Could a nervous first-time user get a result from this in under five minutes, with no other help, using only what's on the two cards?

**What we measure, in order.**

1. **Saves.** The honest signal that someone intends to use it. A prompt is the most saveable thing we post. Read saves weekly from LinkedIn's own post analytics if Buffer does not return them; do not infer them from Buffer's engagement rate, which blends clicks in (`docs/21`, section 2).
2. **"This worked" comments.** Count comments that report trying it or ask a follow-up about their own version ("does it work for a supplier who's also a friend?"). One of those beats twenty reactions. Record the count per post in the weekly pass.
3. **Clicks to aiforcompanies.co.uk/prompts.** The library is the retention asset; the post is the sample.
4. **Reposts.** Secondary. A prompt that gets forwarded to an office manager is doing its job.

**Why this is the core unit.** It is the one format where our whole position (the tools are fine, the training is the gap) is demonstrated rather than claimed. Every Try This post is a tiny training session that costs the reader nothing, and it's the only thing we post that proves we can teach. Our one data point agrees, on n=1: the profile's 25-prompts post of 23 September ran 4.3% on 674 impressions, the highest rate in that profile's history (`docs/21`, section 2). Treat it as a reason to run the format, not as a finding.


## 2. What works

### 2.1 From our own references

**Ruben Hassid is the model, and his top images are the usable thing, not a teaser.** `references/creators/ruben-hassid.md` and `references/winners/hassid-contact.jpg`: 38 posts, median 671 reactions, 100 to 300 reposts on the top ones, zero question closes. His "Stop writing prompts from scratch" image (`references/winners/img/hassid-stop-writing-prompts-from-scratch-like-i-1654rx-148rp.jpg`, 1,654 reactions, 148 reposts) is a three-column table: name, when to use it, the exact command. The reader can act on it without reading the caption. His "guys i'm begging" image is a Notes-app screenshot of a checklist. Plain, dense, every line usable. What he does not do is design: black on white, one family of type, the information is the design.

**What we take from Hassid:** one task per post, written for one person doing it this week; the image carries the usable thing whole; procedure over explanation; no question close; a free library the posts keep pointing back to. **What we refuse:** "I", the bracketed "(free)" tic, and US-founder register.

**Alex Banks shows the plainest card can win.** `references/winners/banks-contact.jpg`: "Everything in tech is a wrapper" (936 reactions) is white text on black in a tweet frame, six lines, no decoration. His news cards with photographs do no better. For us it confirms the card law: title and value, high contrast, nothing competing.

**Our own pairs already proved the shape.** `docs/29` rule 6 ("every prompt card ships with a result card") and the six pairs in `viren/cards/` (`2026-09-30-two-quotes-page.png` and `-result.png` are the cleanest). The two-quotes result card works because it counts what matters in its lede ("Four cells say not stated. Those are your four questions to the supplier before you sign.") and the only highlight is the gap. Its weakness for the new audience is the task: comparing liability caps across two software proposals is a finance director's job. A café owner never sees one. The format stays; the tasks get smaller and more everyday.

**The Mindstream "50 Claude use cases" sheet is the anti-pattern** (`references/supplied/mindstream-50-claude-use-cases.png`). Fifty boxes, each naming a capability ("Email and message drafting: get multiple strategic drafts for a tricky email") and none giving the words. It is the rejected six-jobs grid at ten times the size. It tells you AI can do things; it never tells you what to type. That is the exact gap a Try This post fills.

**Chris Donnelly is the mechanic we refuse.** `docs/23` section 2: his 3,090-comment posts are comment-to-get-the-resource. Refused in `docs/01` section 6, and now refused on evidence too (2.2 below).

**Allie K. Miller shows short wins.** `references/creators/allie-miller-and-sairam.md`: 2M followers, median about 675 characters, top posts are her own day shown as a procedure. Her short captions are the proof that the card can do the work and the caption can stay out of the way.

**Anisha Jain and Charlie Hills** (`references/creators/hills-and-jain.md`) share prompts with a "copy this" close and a library behind them. Jain's top post (457) is a procedure with a London-specific detail. The specific local detail is worth taking. The bracketed "(actually)" house style is not.

### 2.2 Outside evidence, 2025 to 2026

- **Comment-for-the-prompt now costs reach.** [Magicpost, LinkedIn comment bait study, 30 September 2026](https://magicpost.in/studies/linkedin-comment-bait): 684,000 posts from 16,000 creators, June 2025 to September 2026, company pages excluded, each post compared with the same creator's own average. Posts asking readers to comment a keyword for a resource went from +14% to −62% people reached against the creator's average, before and after 27 July 2026. Median comments on those posts fell from 59.5 to 9.5. Of 79 creators who used the format on both sides of the change, 60 saw those posts drop. The study does not measure comment quality.
- **LinkedIn says it downranks bait and rewards substance.** [LinkedIn Community, "LinkedIn feed update: the focus is on authenticity and relevance", 1 April 2026](https://scommunity.linkedin.com/learn-explore-apply-68/linkedin-feed-update-the-focus-is-on-authenticity-relevance-8734), a community manager's summary of a post by Tim Jurka, VP Engineering: "Comment 'YES' if you agree" tactics are "actively downranked"; the feed "prioritizes posts that spark substantive professional debates". No sample; it's the platform's own statement.
- **Documents are where saves happen.** [AuthoredUp, best performing content on LinkedIn, updated 2 September 2026](https://authoredup.com/blog/best-performing-content-on-linkedin): over 3 million personal-profile posts, March 2025 to February 2026. Documents ran 1.39x reach and 1.30x engagement against each profile's own median, and made up 12.92% of all saved posts while being 4.88% of posts. Personal profiles only, so it is a direction for a company page, not a promise. This is why the pair ships as a two-page PDF (`docs/29`, "How each card ships"), not two images that LinkedIn crops into a side-by-side collage.

### 2.3 Accounts that share prompts, and what they actually do

1. **Ruben Hassid** (How to AI). One tool, one task, a numbered or tabled image that works without the caption, and a free guide behind it. No questions, no asks beyond the link. Reposts are the engine.
2. **Charlie Hills.** The grouped library with a big number ("40 additions, grouped by what they do"). Ask and link on most posts. Good for the monthly library post; too much for the daily unit.
3. **Adam Biddlecombe and Mindstream.** "Most people use 5% of ChatGPT" hook, pain stack, the fix as a list, cheat-sheet image, newsletter link. Topic choice is good; the form is the most recognisable AI-written shape on the platform and every element of it is banned in `docs/01`.
4. **Chris Donnelly.** Infographic plus "comment X and we'll send it". Huge comment counts on a 1.2M account. Refused.
5. **Allie K. Miller.** Short post, her own day as a procedure. Show your own use, never ask.

### 2.4 What we take, what we refuse

**Take:** the usable thing on the image, whole. One task per post. The finished output shown, not described. A library to point at, ungated. Short captions. Plain black-and-white legibility (Banks, Hassid). The specific local detail (Jain).

**Refuse:** "comment PROMPT and we'll DM you" (bait, and on the evidence above it now costs most of the reach it used to buy). Capability lists without the words to type (Mindstream). "Most people are doing X wrong" openers (Biddlecombe). Prompt-engineering vocabulary ("act as", "role", "chain of thought"). Results so polished nobody believes them. Tasks from a 2,000-person firm's week.


## 3. The production prompt

Use verbatim. Fill the inputs at the top.

```text
You are writing one "Try this" post for the AI for Companies LinkedIn page. AI for Companies (AIFC) is a UK company that trains staff at small and medium UK businesses to use the AI tools they already have. The reader owns or manages a business of roughly 5 to 250 staff: dental practice, estate agent, accountant, builders' merchant, recruitment agency, café, solicitor, charity, trades. They have heard of ChatGPT, may have tried it once, may pay for Microsoft 365 or Google Workspace. They are not technical and are slightly intimidated. They must never feel stupid, lectured or sold to.

The aim: they try this today and get a usable result in under five minutes, using only what is on the two cards.

INPUTS
- sector: [one sector from the list above, or another SME sector]
- task: [one everyday job, or leave blank and choose]
- recent_tasks: [the last 6 tasks and sectors used, from bank/ledger.csv, so you do not repeat]
- in_library: [yes/no: is this task one of the 25 at aiforcompanies.co.uk/prompts]

STEP 1. CHOOSE THE TASK
Pick one job the owner or a member of staff actually does most weeks, that produces a piece of writing or a small table, and that they dread a little. Good: late payment chaser, reply to a bad review, next week's staff rota, comparing two quotes, actions from a meeting, a job advert, a complaint reply, an awkward email to a supplier, a price-rise letter to customers, a handover note for a holiday cover. Bad: anything with a board, a strategy, a dashboard, a policy framework, code, or a word the reader would need to look up. Do not repeat a task or sector from recent_tasks. Ask: would the owner of a 12-person firm recognise this job from last week? If not, choose again.

STEP 2. WRITE THE PROMPT (the words the reader types)
Under 60 words. Count them. Four parts, in this order, in plain sentences:
1. Situation: who they are and what has happened, in one sentence. "I run a dental practice. Here's a one-star Google review."
2. What you want: the output, its shape and its parts. "Write three short emails..." / "Make a table with..."
3. What to do when unsure: one instruction that stops it making things up. "If you can't tell from the notes, write CHECK." / "Leave out anything you can't confirm."
4. Length and tone: a number and two plain words. "Under 80 words. Warm, not grovelling."
Rules: the prompt is in the reader's own voice, so "I" and "my" are allowed inside it and nowhere else. Put the bits they must change in square brackets: [30] days, [£amount]. No "act as", no role-play, no markdown, no jargon, no tool-specific features. It must work in free ChatGPT, Copilot and Gemini with text pasted in. If it needs a file, say "or paste the text".

STEP 3. THE ATTACH LINE
One short sentence: exactly what to paste or attach, and what to leave out. Where the input is about real people (customers, patients, staff, candidates), the attach line says what to leave out ("Paste the review only. Leave their name out."). If nothing is attached, say "Nothing. Just fill in the brackets."

STEP 4. WRITE THE RESULT (what comes back)
Show the output the reader will get, as a small table: up to 6 rows, 2 or 3 columns, short cells (about 22 words at most). Choose columns that make the output scannable: "When / Subject line / The line that matters" for chasers; "The reply, line by line / Why it's there" for a review; "Day / Who / Hours" for a rota. Make it believable: ordinary wording, one slightly awkward but correct line, UK details (£, 01632 960 phone numbers, UK dates). Include one CHECK cell where a person must decide or verify. Never invent a statistic, a client, a result or a quote from a real person. The result is invented, so the note starts "Illustrative example."

STEP 5. TITLES
Prompt card title, formula "moment, then result", up to 12 words, two short sentences: the moment they recognise, then what they get. "An invoice is 30 days late. Three chasers, each one firmer." Never a teaser ("The email nobody wants to write"), never a label ("Late payments"), never a question.
Result card title: "What comes back:" plus a count of what is on the card. "What comes back: three emails, one line left for you."

STEP 6. THE CAPTION (450 to 800 characters)
1. Line 1: the same moment and result as the card title, under 80 characters. It must make sense to someone who never opens the image.
2. One or two sentences on how this job usually goes, in the reader's week. Specific, a little wry, never "most people".
3. "The prompt's on the first page. What comes back is on the second."
4. The one line in the prompt doing the work, and why, in two or three sentences.
5. Optional: one follow-up line to type, in quotation marks.
6. Data line, whenever the attach involves people or money: "Use your work account, and don't paste anything you wouldn't put in an email."
7. "Works in ChatGPT, Copilot or Gemini, whichever you have."
8. Close, one of: "25 more for everyday jobs, free, no form: aiforcompanies.co.uk/prompts" (default, roughly three posts in four), or stop after line 7.
9. If the task touches UK GDPR, employment (rotas, adverts, staff) or contracts (payment terms, quotes, chasers), the last line is: This is not legal advice.

STEP 7. THE CARDS (exact JSON)
{"template":"prompt","title":"","prompt":"","attach":"","tools":["ChatGPT","Copilot","Gemini"]}
{"template":"result","title":"","header":["",""],"rows":[["",""]],"note":""}
note: "Illustrative example." then one plain line on why it matters, under 20 words.
Ship as a two-page PDF document (prompt card first). If the result does not fit in 6 short rows, the task is too big: choose a smaller one.

HOUSE RULES
UK English. Contractions welcome. Reading age about 12. No em dashes, no double hyphens, no exclamation marks, no emoji, no hashtags, no italics. "We" is AI for Companies, "you" is the reader; never "I" outside the prompt text. No invented clients, results, testimonials or case studies. Any statistic carries a source and date that you opened in this run; a Try This post rarely needs one, so leave it out. No engagement bait: no "comment PROMPT", "save this", "follow for more", "agree?", "which will you try?". Banned words: delve, leverage, utilise, robust, seamless, unlock, harness, elevate, supercharge, game changer, landscape, crucial, vital, pivotal, agentic, LLM, use case, workflow, transformation, "In today's", "Here's the thing", "Most people".

SELF-CHECK (answer each before returning; fix and recheck any "no")
1. Could someone act on the prompt card alone, without the caption? 
2. Is the prompt under 60 words, with situation, want, when-unsure and length/tone?
3. Would the owner of a 12-person firm recognise the task from last week?
4. Does the result look like what a free assistant would really return, with one CHECK, marked Illustrative?
5. Does the title name a moment and a result, under 12 words, with no teaser?
6. Is caption line 1 under 80 characters and clear on its own?
7. Is the data line there if people or money are involved, and the legal line if GDPR, employment or contracts are?
8. Zero em dashes, double hyphens, exclamation marks, hashtags, banned words, or "I" outside the prompt?
9. Is it different in task and sector from recent_tasks?

Return: caption, prompt card JSON, result card JSON, the self-check answers, and the word count of the prompt.
```


## 4. Worked examples

### Example A: dental practice, a bad review

**Caption** (about 720 characters)

> One-star review this morning. A calm reply to post by lunch.
>
> The usual choices are replying in a temper at 11pm or not replying at all. The next patient checking you out reads both.
>
> The prompt's on the first page. What comes back is on the second.
>
> The line doing the work is "don't mention any treatment or confirm they're a patient." A reply that says "our records show you missed two appointments" can feel like winning the argument and still be a confidentiality problem.
>
> Use your work account, and paste the review, never anything from the patient's notes.
>
> Works in ChatGPT, Copilot or Gemini, whichever you have. 25 more for everyday jobs, free, no form: aiforcompanies.co.uk/prompts
>
> This is not legal advice.

**Prompt card** (prompt: 49 words)

```json
{"template":"prompt","title":"One-star review this morning. A calm reply to post by lunch.","prompt":"I run a dental practice. Here's a one-star Google review. Write a reply: thank them, say sorry for how they felt, ask them to call our practice manager. Don't mention any treatment or confirm they're a patient. Leave out anything you can't check. Under 80 words. Warm, not grovelling.","attach":"Paste the review text only. Leave their name out.","tools":["ChatGPT","Copilot","Gemini"]}
```

**Result card**

```json
{"template":"result","title":"What comes back: four lines, none of them confirms a patient.","header":["The reply, line by line","Why it's there"],"rows":[["Thank you for taking the time to tell us this.","Opens calm, not defensive"],["We're sorry your visit left you feeling this way.","Sorry for the feeling, not an admission"],["We'd like to put it right. Please call Sarah, our practice manager, on 01632 960 123.","Takes it offline and names a person"],["Every review is read here, and this one has gone to the whole team.","Tells the next reader you act on them"]],"note":"Illustrative example. No treatment, no dates, no 'our records show': that's what keeps it safe."}
```

### Example B: plumbing and heating firm, a late invoice

**Caption** (about 780 characters)

> An invoice is 30 days late. Three chasers, each one firmer.
>
> Chasing money is the email everyone puts off, because the first one sounds rude and the third one sounds like a threat. So it sits.
>
> The prompt's on the first page. What comes back is on the second.
>
> The line doing the work is "leave a gap marked CHECK for anything about interest or legal action." Whether you can add statutory interest depends on who the customer is: GOV.UK's late payment page covers businesses paying businesses (Late commercial payments, updated 5 October 2026), not a homeowner. That decision is yours, not the assistant's.
>
> Use your work account, and don't paste anything you wouldn't put in an email.
>
> Works in ChatGPT, Copilot or Gemini, whichever you have.
>
> This is not legal advice.

Source opened for this example: [GOV.UK, Late commercial payments: charging interest and debt recovery, updated 5 October 2026](https://www.gov.uk/late-commercial-payments-interest-debt-recovery). This one closes without the library link, deliberately (one in four).

**Prompt card** (prompt: 58 words)

```json
{"template":"prompt","title":"An invoice is 30 days late. Three chasers, each one firmer.","prompt":"I run a plumbing firm. A customer is [30] days late paying invoice [number] for [£amount]. Write three short emails: a friendly nudge today, a firmer one in 7 days, a final one in 14 days saying what happens next. Leave a gap marked CHECK for anything about interest or legal action. Polite, plain, under 90 words each.","attach":"Nothing. Fill in the brackets and leave the customer's name out.","tools":["ChatGPT","Copilot","Gemini"]}
```

**Result card**

```json
{"template":"result","title":"What comes back: three emails, and one line left for you.","header":["When","Subject line","The line that matters"],"rows":[["Today","Invoice 2291: a quick reminder","Just checking this didn't get lost. Could you let us know when it'll be paid?"],["Day 7","Invoice 2291: now 37 days overdue","Please pay by this Friday, or ring us if there's a problem with the work."],["Day 14","Invoice 2291: final reminder","CHECK: say what happens next, such as interest or passing it on. Your call."]],"note":"Illustrative example. The CHECK is deliberate: the next step is a decision for you, not the AI."}
```


## 5. Before and after: `2026-09-25-stop-pasting-grid`

### Before

Card (`cards/2026-09-25-stop-pasting-grid.png`): "EIGHT THINGS TO STOP PASTING INTO AI AT WORK", eight boxed cells in a 2x4 grid, each an all-caps label ("CODE WITH KEYS IN IT", "SCREENSHOTS OF DASHBOARDS") and a clever line ("The NDA does not mention AI. That is the problem, not the defence."), footer "AI AT WORK". Caption (`bank/posts/2026-09-25-stop-pasting-grid.md`) opens "Eight things to stop pasting into AI at work", cites the NCSC, and gives two notes on using the list.

What's wrong with it for this reader: it's a list of don'ts with nothing to do. Two of the eight (code with keys, dashboard screenshots) belong to an IT team, not a 12-person accountancy. The lines are written to be admired, not used. The owner can't hand it to staff on Monday because it isn't written for staff. And the post's best idea, that a ban list without an alternative fails, sits in paragraph four of the caption where nobody reaches it.

### After

The same idea, turned into a job: make the one-page sheet you pin up, in five minutes.

**Caption** (about 760 characters)

> Before your team pastes anything into ChatGPT, give them one page that says what never goes in.
>
> The NCSC's point on 7 September was that staff use unapproved AI because the approved way is slower, and that bans don't make it go away. A sheet that says "never this, do this instead" works better than a policy nobody opens.
>
> The prompt's on the first page. What comes back is on the second.
>
> The line doing the work is "for each one, say what to do instead." A list of don'ts with no alternative is just a slower route to the same paste.
>
> Print it, and put the name of the tool you've approved at the top.
>
> Works in ChatGPT, Copilot or Gemini, whichever you have. 25 more for everyday jobs, free, no form: aiforcompanies.co.uk/prompts
>
> This is not legal advice.

Source opened for this rewrite: [NCSC, The hidden risks of shadow AI, 7 September 2026](https://www.ncsc.gov.uk/blogs/the-hidden-risks-of-shadow-ai). It says the NCSC is "not recommending that individuals stop using AI" and that shadow AI "is unlikely to disappear completely".

**Prompt card** (prompt: 50 words)

```json
{"template":"prompt","title":"Before anyone pastes into AI. One page of what never goes in.","prompt":"I run a [12]-person [accountancy]. We use [Copilot, signed in with work accounts]. Write a one-page note for staff: six things never to paste into AI, and for each one, what to do instead. Plain English, no jargon. If it depends on our client contracts, write CHECK. Under 200 words.","attach":"Nothing. Fill in the brackets with your team size, trade and tool.","tools":["ChatGPT","Copilot","Gemini"]}
```

**Result card**

```json
{"template":"result","title":"What comes back: six nevers, each with a do-this-instead.","header":["Never paste","Do this instead"],"rows":[["A client's name next to their figures","Swap names for Client A, Client B"],["Staff pay, sickness or appraisals","Leave it out. Ask the office manager"],["Card or bank details","Never. Write 'card on file' instead"],["A whole client contract","Paste only the clause you need, names removed"],["Passwords or logins","Never, in any tool"],["Anything under an NDA","CHECK with whoever signed it first"]],"note":"Illustrative example. Every never has an instead, so nobody's stuck."}
```

What changed: the card is now the thing the owner prints, not a list to nod at. Eight items became six that apply to a small firm. Each "don't" carries a "do". The NCSC point moved from paragraph four to paragraph two. Five type sizes and a boxed grid became one title and one table.


## 6. Fail list: eight ways this goes boring or corporate

1. **The teaser title.** "The email nobody wants to write" makes the reader work to find out what the post is. Fix: moment, then result, both named. "An invoice is 30 days late. Three chasers, each one firmer."
2. **The finance director's task.** Board papers, tender matrices, strategy decks, liability caps. A café owner scrolls straight past. Fix: the test in Step 1, would a 12-person firm recognise this job from last week. Rotas, reviews, chasers, adverts, supplier emails.
3. **The prompt that needs a course.** "Act as an expert copywriter. Use chain of thought. Output in markdown." It signals that AI is technical, which is the exact fear we're meant to remove. Fix: four plain sentences, situation, want, when unsure, length and tone, under 60 words, in the reader's own voice.
4. **The too-perfect result.** A flawless 300-word letter with a statistic in it. Nobody believes it, and the reader who gets something rougher feels they did it wrong. Fix: short cells, one CHECK cell, ordinary wording, marked "Illustrative example".
5. **The result card that explains instead of shows.** "The AI will produce a structured reply covering empathy, resolution and next steps." That's a description of a result, not a result. Fix: show the actual lines that come back, in a table, and let the count in the title say what to notice.
6. **The lecture caption.** Three paragraphs on why prompting matters before the task appears. Fix: line 1 is the moment and the result; the reason a line in the prompt works gets two or three sentences, once.
7. **The gate.** "Comment PROMPT and we'll send you all 25." Bait, downranked, and on the Magicpost data it now cuts the post's reach rather than boosting it. Fix: everything on the card, and the library linked ungated at aiforcompanies.co.uk/prompts.
8. **The same post every Tuesday.** Same sector, same "write an email" shape, same table, until the format reads as a template. Fix: rotate sector and output type through `recent_tasks` (emails one week, a rota table the next, a reply line by line the week after), and never run the same task twice in six weeks.


## What we could not verify

- Saves by format for company pages specifically. The AuthoredUp save figures are personal profiles only.
- Whether Buffer's API returns saves for the page. Check in the next weekly pass; if not, read them in LinkedIn page analytics.
- Nicolas Boucher (AI for finance, over a million LinkedIn followers per [Rydoo, CFO Corner, 11 March 2026](https://www.rydoo.com/cfo-corner/corporate-finance-influencers)) is a likely prompt-sharing comparator, but LinkedIn refused the fetch and no opened source described his post format, so he is not used as evidence here.
