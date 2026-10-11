# 06. The weekly roundup

Written 11 October 2026. The production prompt for the vendor band in `docs/22` (two posts in
ten, one of them this roundup). Card schema: `roundup`. Where this disagrees with `docs/22`
section 4, `docs/22` wins on the cap and this wins on how the post is written. `docs/01` and
`docs/10` win over both.

---

## 1. Aim, reader moment, metric, why

**Aim.** The owner of a 20-person firm learns one thing they can use this week in the AI tool
they already pay for, or already have free, and closes the post feeling up to date without
having read a single release note.

**Reader moment.** Friday morning (the "week, read" slot in `docs/23` section 4). Coffee, phone,
thirty seconds. The question in their head is not "what launched in AI". It is "did anything
change in the thing we've got, and is there one thing worth trying before Monday".

**Metric.** Reposts per 1,000 impressions, against the page median from `node score.mjs`
(`docs/24` weights reposts and reach over reactions). Secondary: clicks, and any comment that
asks "where do I find that", which is the sign the do line landed. A roundup that gets
reactions and no reposts is being read as news, which is the failure this prompt exists to stop.

**Why this format at all.** Bare news is the weakest thing anyone posts. Rowan Cheung runs the
largest AI newsletter there is and his announcement posts sit around his 150-reaction median;
the ones that travel are where he used the thing (`references/creators/rowan-cheung.md`).
The outside evidence says the same of company pages: industry news is 2% of company page posts
and lands no better than a product post (LigoSocial, below). So the roundup earns its two slots
only by converting each change into a do line the reader can act on from the card alone. The
owner's verdict on the current output is the brief: "each post should be immediately
understandable", and "no immediate value gained from the picture".

**What the rejected version got wrong.** `bank/posts/2026-10-07-copilot-dates-roundup.md`
listed Power BI references in Copilot Notebooks, deep citations, Copilot Cowork for Government
Clouds and Purview unified classification, all as future roadmap dates. Three of four are for
an IT or compliance team; none had a thing to do; the card (`cards/2026-10-07-copilot-dates-roundup.png`)
used an eyebrow ("ON THE ROADMAP"), three text sizes inside each item, and left the bottom
fifth of the canvas empty. It passed `docs/22`'s own roundup test ("would the reader's IT person
find one item") and that test was the problem: the reader is now the owner, not their IT person.

---

## 2. What works

### Our own references

- **`docs/22` section 4, the vendor cap and the Monday test.** One roundup a week absorbs every
  Microsoft, OpenAI and Google change. A standalone release post runs only when "a manager could
  say, on the day it publishes, from Monday, do this differently". "ChatGPT is in Word" passes;
  "Apps Script data regions" does not. We keep the Monday test and tighten the reader: the test
  is now the owner or office manager, not the IT person.
- **`docs/22` section 8.** The 23 September tools roundup carried six items and the open question
  was whether it was still read. We answer it: three items, four at most, two if that is all
  that passes.
- **`docs/03-sources.md` (lines 14 to 16 and 25) and `docs/07-feeds-and-detection.md` section 2.**
  The four vendor feeds: ChatGPT release notes (no RSS, read the page), Microsoft 365 Roadmap RSS,
  Microsoft 365 Copilot release notes (fortnightly batches, "suits a weekly slot"), Google
  Workspace Updates via Feedburner. `docs/03` describes Workspace Updates as carrying
  "admin-relevant detail"; that is exactly the detail we now strip.
- **`docs/23` sections 1 and 2.** "Nobody comments on a changelog." What gets forwarded is "a
  procedure or a list a colleague can use". Alex Banks' news works when it carries "one sentence
  of interpretation the reader could not have written" (`references/creators/alex-banks.md`).
- **`references/creators/matt-village.md`.** Village's best post of the month was "I've seen
  people think Microsoft Copilot is just AI for Office. You are massively underestimating" (425
  reactions). The topic, that owners do not know what they already have, is exactly ours. His
  form (the "Most people" opener, one-line stack, question close) is banned in `docs/01`.
- **`docs/29` and the shared card law.** Title and value, nothing else. The `roundup` template in
  `lib/cards2.mjs` sets the tool name in the accent with its logo, the change in ink, and prefixes
  the do line with "Do:" itself.
- **Our own numbers.** None yet for any roundup: `bank/metrics.csv` has no row for the 23 September,
  28 September or 2 October roundups. Treat the format as untested on our page.

### Outside evidence, opened on 11 October 2026

- [LigoSocial, What to post on a LinkedIn company page, 25 September 2026](https://ligosocial.com/research/what-to-post-on-linkedin-company-page).
  5,530 posts from 200 company pages, January 2025 to September 2026. Industry news was 2% of
  posts and +2% engagement against the same page's product posts, not significant. Posts
  featuring a named person ran +37% (high confidence, 178 pages), more for pages under 2,500
  followers. Documents ran -25% against images and link previews -40%. Captions of 900 to 1,300
  characters did best (+12% against 600 to 900). Read for us: the news itself buys nothing on a
  page, the image format is right, and the caption can run a little longer than `docs/01`'s
  800 to 900 when it is carrying three dated sources.
- [UT Arlington, You're using LinkedIn wrong, 21 May 2026](https://www.uta.edu/news/news-releases/2026/05/21/youre-using-linked-in-wrong).
  Daniel Usera, "nearly 1,000 posts". Business content is the most common; posts about other
  people draw the most engagement. The release does not publish the method or the collection
  dates, so treat it as direction only.
- From `references/claims.md` (verified by us on 23 September 2026, not reopened today): hooks of
  0 to 40 characters ran 2.61% median engagement against 2.08% at 200 or more, and question
  openers were the weakest (AuthoredUp, 309,614 posts, December 2025 to May 2026).

### Who explains tool updates to non-technical readers well, and what they actually do

- **The Neuron** (`theneuron.ai`, already a Tier 1 feed in `docs/07`). The issue of 9 October 2026,
  "Claude Dashboards + Motion launched", has one main feature that states, per tool, what changed
  and who gets it ("in beta on paid plans", "Team and Enterprise", "all plans, including Free"),
  then a "Why this matters" paragraph in plain words ("A dashboard is useful when it helps you
  decide something"), then a separate "AI Skill of the Day" with a copy-paste prompt, then
  "Around the Horn" (6 numbered one-liners) and "Treats to Try" (7 numbered tools). Its own pitch:
  "Written so you'll actually get it."
  [The Neuron, 9 October 2026](https://www.theneuron.ai/newsletter/claude-dashboards-motion-launched/).
- **Superhuman AI** (`superhuman.ai`, Zain Kahn). Pitched as a 3-minute daily read. The sample
  issue on its homepage has one lead story, a one-sentence teaser of the day, one short
  step-list tutorial, and one "prompt of the day" ready to copy. Headlines name the tool and the
  plain change: "Claude sets up shop in Google Docs, Sheets, & Slides" (7 October 2026).
  It claims "2 million+" readers in one place and "1 million+" in another; we do not repeat either.
  [Superhuman AI homepage, read 11 October 2026](https://www.superhuman.ai/).
- **The Rundown AI** (`therundown.ai`, Rowan Cheung). Promises "a quick 5-minute read". Its
  homepage news block gives each story a headline and one line on why it matters, and a separate
  Guides section built from readers' own use cases ("How to Use..." titles). We could not open a
  single issue page today, so we do not describe its internal labels.
  [The Rundown, read 11 October 2026](https://www.therundown.ai/).
- **Rowan Cheung on LinkedIn** (`references/creators/rowan-cheung.md`). The posts that beat his
  median are hands-on: "I got early access, here are 9 use cases", "the agent built me a complete
  early retirement plan". The bare announcement does not travel even with his audience behind it.
- **Mindstream on LinkedIn** (Matt Village and Adam Biddlecombe, `references/creators/`). Every
  post is an image cheat sheet plus a link, and reposts run 30 to 50 because the image is
  saveable. The topics are our reader's. The copy is the machine-written fingerprint.

### What we take

1. **Who gets it, per item** (The Neuron). Every item says which plan, in the reader's words:
   "on every plan, including free", "if you pay for Microsoft 365 Business Standard".
2. **One thing to do, per item** (Superhuman's tutorial, Cheung's hands-on). The do line is the
   card. A change with no do line is not an item.
3. **One line of meaning** (The Rundown, Banks). Only where the reader could not have written it
   themselves, and in the caption, not on the card.
4. **"You already have this"** (Village's best topic). Many owners pay for Microsoft 365 or Google
   Workspace and have never opened the assistant inside it. One item a month may be a re-confirmed
   "you already have it" item, sourced to the vendor's current page.
5. **One per tool where possible.** A dental practice on Google Workspace scrolls past a
   Copilot-only card. Three items across ChatGPT, Copilot and Gemini means every reader finds theirs.

### What we refuse

- Hype words: "game changer", "huge", "insane", "just dropped", "BREAKING", "everything changes".
- Model names and benchmark talk as the headline. "GPT-6 Sol" means nothing to an estate agent.
  If a model change matters, the item states what the reader can now do, not the model.
- Emoji headlines and newsletter personas ("Welcome, humans"). Sponsor-style tool lists.
- Roadmap dates presented as news. Things that have not shipped are not this week's change.
- The admin console. Anything a reader cannot see on their own screen without IT.
- Vendor vocabulary copied through: GA, tenant, extensibility, connectors, agentic, MCP, Purview,
  "Rapid Release domains".
- Comment-for-the-link, "save this", "follow for more", and the question close.

---

## 3. The production prompt

Copy the block below into the run. It is self-contained.

```text
You are writing this week's AI roundup for the AI for Companies LinkedIn company page.

READER
The owner or office manager of a UK business with 5 to 250 staff: a dental practice, an estate
agent, an accountancy, a builders' merchant, a recruitment agency, a cafe, a charity, a trade
firm. They have tried ChatGPT once or twice. They may pay for Microsoft 365 or Google Workspace.
They are not technical and slightly intimidated. They read this on a phone on Friday morning.
They want: what changed in the tool I have, and one thing to try. They must never feel stupid,
lectured or sold to. Write at reading age 12. Contractions are fine.

HOUSE RULES (non-negotiable)
UK English. No em dashes, no double hyphens, no exclamation marks, no emoji, no hashtags, no
italics. Dates as 16 October 2026. "We" is the company, "you" is the reader, never "I".
No invented clients, results or quotes. Illustrative examples are labelled as examples
("say you run a dental practice"). Never use: agentic, LLM, tenant, roadmap, GA, Purview,
use case, workflow automation, leverage, transformation, game changer, unlock, seamless,
supercharge, landscape, delve, robust, harness, elevate, crucial, vital, pivotal. No engagement
bait, no question close.

STEP 1. READ THE FEEDS (open every page yourself in this run)
1. ChatGPT release notes: https://help.openai.com/en/articles/6825453-chatgpt-release-notes
   (no RSS; the page is long, read past the first 100,000 characters if the tool truncates)
2. Microsoft 365 Copilot release notes: https://learn.microsoft.com/en-us/copilot/microsoft-365/release-notes
3. Microsoft 365 Roadmap RSS: https://www.microsoft.com/releasecommunications/api/v2/m365/rss
   (use only items with status Launched or Rolling out)
4. Google Workspace Updates: https://feeds.feedburner.com/GoogleAppsUpdates
   then open each candidate post on workspaceupdates.googleblog.com for editions and dates.
5. Microsoft Copilot Chat eligibility: https://learn.microsoft.com/en-us/copilot/manage
   (only when running the monthly "you already have this" item)
Window: items dated in the last 7 days. If fewer than 2 pass the filter, widen to 30 days.
Never older than 30 days. The date that counts is the date on the vendor's note, not the date
you read it.

STEP 2. LOG EVERY CANDIDATE
For each item record: vendor, date on the note, exact title, URL, the availability sentence
copied word for word (plans, region, platform), and status (shipped, rolling out, in
development). If the note states no plan, write "plan not stated".

STEP 3. FILTER. An item runs only if it passes all seven.
a. Plan. It is on a plan a small firm is likely to have:
   ChatGPT Free, Go, Plus or Business; Microsoft 365 Business Basic, Standard or Premium
   (Copilot Chat) or the paid Microsoft 365 Copilot add-on (say so); Google Workspace Business
   Starter, Standard or Plus, or the free Gemini app. Reject anything only for Pro, Enterprise,
   Education, government clouds (GCC, GCC High, DoD) or a single non-UK country.
b. Screen. The reader sees it on their own screen without asking IT. Reject admin centres,
   connectors, APIs, Codex and developer tools, compliance and security consoles, analytics
   dashboards, licence management.
c. The 20-person test. Would the office manager at a 20-person accountancy notice this or use
   it in a normal week? If you have to explain why it matters to them, it fails.
d. The Monday test (docs/22): could they say "from Monday, do this differently"?
e. Shipped. Live or rolling out now. "In development" and future dates fail.
f. Fresh. Not in bank/ledger.csv in the last 30 days. Run node lib/freshness.mjs first.
g. Not a model name. A new model passes only as the plain thing the reader can now do on their
   plan, never as the model's name or a benchmark.
Write the rejects in the run log with the letter they failed. Do not pad.

STEP 4. CHOOSE
Three items. Two if only two pass. Four only if a fourth passes everything and the card still
fits. Prefer one each for ChatGPT, Copilot and Gemini so every reader finds theirs. If fewer
than two pass, the roundup does not run this week: say so in the run log and give the slot to
the do-this-Monday band. Once a month one item may be "you already have this" (for example
Copilot Chat being included with Microsoft 365 business plans), sourced to the vendor's current
page, opened this run.

STEP 5. TRANSLATE EACH ITEM
tool: exactly one of ChatGPT, Copilot, Gemini (or Word, Excel, Outlook, Teams, Gmail,
  Google Docs, Google Sheets when the change lives in that app). These match the logo files.
change: up to 18 words. What is different on the reader's screen, in their words. Name the plan
  if it is not everyone ("on every plan, including free"; "with Business Starter and up").
  If the vendor states no plan for a Copilot-in-Word or Excel feature, begin
  "If Copilot shows in your Word".
do: up to 14 words. Starts with a verb. Names where to click or what to type, or the first
  real task to try it on. Never starts with "Do:" (the template adds it). Must be traceable to
  the vendor's own note: never invent a menu path the note does not give; if unsure, name the
  place ("the ChatGPT add-in in Word") not the clicks.
Read each pair aloud. If it sounds like a caption about the change rather than something you'd
say to a colleague, rewrite it.

STEP 6. TITLE (card and hook)
Up to 12 words on the card, hook under 40 characters where possible. Mark one phrase *like this*
for the accent. Formulas:
- "This week's AI changes, *one for each tool*"
- "Three changes to the AI *you already pay for*"
- "You may already have Copilot. *Two more changes this week*"
- "What changed in ChatGPT, Copilot and Gemini *this week*"
Never a question. Never "news", "update", "roundup", "BREAKING" or a model name.

STEP 7. CAPTION
800 to 1,100 characters including spaces.
Line 1: the hook (the card title in plain text, under 140 characters).
Then one short paragraph per item, in card order: tool name, the change in one or two sentences,
the do line expanded with one concrete example task ("open a letter you've been putting off"),
and the citation in brackets: (OpenAI, ChatGPT release notes, 17 September 2026).
Optional one closing sentence that says which item to try first and why. Then stop.
No URLs in the body by default (one external link cuts median reach; claims.md). If an item
cannot be found by its name, one link at the end, never more.
If any item involves recording people, personal data, staff monitoring or contracts, end the
caption with: This is not legal advice.

STEP 8. CARD JSON
{"template":"roundup",
 "title":"<title with one *accent*>",
 "items":[{"tool":"","change":"","do":""}],
 "source":"<Publisher, date; Publisher, date; ...>"}
Source footer: vendor and note date per item, in card order, e.g.
"Microsoft, 1 October 2026; OpenAI, 17 September 2026; Google, 30 September 2026".
In the bank row, put every item URL in the notes field and the first source in source_url.

STEP 9. SELF-CHECK (fail any, fix before rendering)
1. Could the reader act on every item from the card alone, without the caption?
2. Does every item name a plan the reader is likely to have, or say "if you see it"?
3. Is every item shipped or rolling out, and dated within 30 days on the vendor's page?
4. Did you open every vendor page in this run, and does each caption item carry its date?
5. Any banned word, vendor jargon, model name, em dash, exclamation mark, emoji, hashtag?
6. Is there at least one item for a Google shop and one for a Microsoft shop, or a reason not?
7. Title under 12 words, one accent, no question; change lines 18 words or fewer; do lines 14
   or fewer and starting with a verb.
8. Caption 800 to 1,100 characters, no engagement bait, no question close, legal line if needed.
9. Run the card and caption through the 20-person test once more, as the owner of a cafe.
```

---

## 4. Worked example: Friday 16 October 2026

Built from items opened on 11 October 2026. Window: 16 September to 16 October 2026.

**What we read and rejected** (so the filter is visible):

- ChatGPT, GPT-6 and Intelligent UI, 7 October 2026. Fails g: a model launch. The usable part
  (answers can include charts and calculators) is not yet a thing an owner would go looking for.
- ChatGPT, audio uploads, 6 October 2026, "available with paid ChatGPT subscriptions and
  workspaces". Passes everything. Held for next week to keep one item per tool; it is the
  strongest reserve (upload a voice memo, get the actions).
- ChatGPT, Finances and credit scores, 21 September and 2 October 2026. Fails a: US only.
- ChatGPT, dots, Meetings plugin, Space, Pro 500, 29 September 2026. Fail a: Pro, Business beta,
  macOS only, or Enterprise.
- ChatGPT, Privacy Center, 21 September 2026. Fails f: ran on 2 October.
- Microsoft, Copilot connectors, licence requests page, Viva Insights dashboards, 23 September
  and 6 October 2026. Fail b: admin.
- Microsoft, Scheduling with Copilot, roadmap 573220. Fails a and e: tagged GCC, GCC High and DoD
  only, status "In development".
- Google, Markdown files in Docs, stock charts in Sheets, Carrier Link for Google Voice,
  secondary calendar lifecycle, 5 to 8 October 2026. Fail c: nothing an owner would use this week.
- Google, Workspace Studio logic steps, 9 October 2026. Fails c: automation building.

**Kept:**

1. Microsoft Copilot Chat is "available at no extra cost for eligible users who sign in with a
   Microsoft Entra work or school account and have a qualifying Microsoft 365 subscription",
   including "Microsoft 365 Business Premium, Business Standard, or Business Basic".
   [Microsoft Learn, Manage Microsoft Copilot Chat, last updated 1 October 2026](https://learn.microsoft.com/en-us/copilot/manage).
   Without the paid add-on, work data is "Limited (uploaded files)"; the full version reads
   "meetings, emails, chats, files, and more", and Copilot in Outlook is listed as "Included".
   [Microsoft Support, Copilot Chat with and without a licence](https://support.microsoft.com/en-us/topic/get-started-with-microsoft-copilot-61033adf-484d-45f5-a8c3-b89876963bd8).
   Microsoft Support names copilot.cloud.microsoft as the place to sign in.
   [Microsoft Support, Microsoft 365 Copilot Chat](https://support.microsoft.com/copilot-microsoft365-chat).
   This is the monthly "you already have this" item: verified on a Microsoft page, yes, Copilot
   Chat is included with Microsoft 365 Business Basic, Standard and Premium at no extra cost.
2. ChatGPT for Word, 17 September 2026: "ChatGPT for Word is available on all ChatGPT plans,
   including Free." Install the ChatGPT add-in from Microsoft Marketplace, then open ChatGPT in
   Word and sign in. [OpenAI, ChatGPT release notes](https://help.openai.com/en/articles/6825453-chatgpt-release-notes).
3. Gemini skills, 30 September 2026: saved, reusable instructions you can add to any prompt in
   Gemini, and stack together. Workspace: Business Starter, Standard and Plus; Rapid Release
   from 5 October, Scheduled Release from 19 October to mid-November 2026; the Gemini app for all
   from 13 October. Gems stop being creatable no sooner than 1 March 2027 for business customers
   and move to draft skills.
   [Google Workspace Updates, 30 September 2026](http://workspaceupdates.googleblog.com/2026/09/skills-gemini-app-workspace.html).

**Caption** (1,039 characters):

```text
Three changes to the AI you already pay for, one for each tool.

Copilot. If your firm has Microsoft 365 Business Basic, Standard or Premium, Copilot Chat is already included at no extra cost. Sign in at copilot.cloud.microsoft with your work email and paste in a letter or price list to work on. Reading your whole inbox and files needs the paid Copilot add-on. (Microsoft Learn, Copilot Chat eligibility, updated 1 October 2026)

ChatGPT. It now works inside Word as a sidebar, on every plan including the free one. Install the ChatGPT add-in, open a letter you've been putting off, and ask it to make it shorter and clearer. (OpenAI, ChatGPT release notes, 17 September 2026)

Gemini. Skills let you save an instruction you'd otherwise type every week, such as how you like customer replies written, and reuse it in one go. They're reaching Google Workspace Business plans between now and mid-November. (Google Workspace Updates, 30 September 2026)

If you only try one, try the first. It costs nothing and you probably have it already.
```

**Card JSON:**

```json
{"template":"roundup",
 "title":"Three changes to the AI *you already pay for*",
 "items":[
  {"tool":"Copilot","change":"Copilot Chat comes free with Microsoft 365 Business Basic, Standard and Premium.","do":"Sign in at copilot.cloud.microsoft with your work email."},
  {"tool":"ChatGPT","change":"ChatGPT now works inside Word, on every plan including free.","do":"Install the ChatGPT add-in and ask it to tidy one letter."},
  {"tool":"Gemini","change":"Skills save an instruction you type every week, so you reuse it in one go.","do":"Save how you like customer replies written as your first skill."}],
 "source":"Microsoft, 1 October 2026; OpenAI, 17 September 2026; Google, 30 September 2026"}
```

"Comes free with" on the card is Microsoft's "at no extra cost" in fewer characters; the caption
keeps Microsoft's wording. If the reviewer prefers the exact phrase, use "is included at no
extra cost with".

---

## 5. Before and after: 2026-10-07-copilot-dates-roundup

**Before** (`bank/posts/2026-10-07-copilot-dates-roundup.md`, card as described in section 1):
"Four Copilot changes with dates on them, so you can plan rather than react", four roadmap items,
read 21 September 2026.

**What goes, and why:**

- Power BI reports as references in Copilot Notebooks. Fails a and c: needs the paid Copilot
  add-on and Power BI reports, and a 20-person firm has neither the reports nor the notebooks.
  It was also a future date, which fails e.
- Copilot Cowork for Government Clouds. Fails a: government cloud customers only. No UK small
  business is on one.
- Purview unified classification management. Fails b and the jargon list: a compliance console
  for an administrator, and "classifiers" means nothing to the reader.
- Deep citations in Copilot. The one item with a real reader benefit (seeing where an answer came
  from), but it was a November date, so it fails e, and we could not reopen roadmap item 523223
  on 11 October 2026. It comes back as an item in the week it ships, if it passes then.

**What replaces them** (Copilot-only, kept to Microsoft because the original was; in a normal week
the prompt asks for one item per tool):

1. Copilot Chat included with Microsoft 365 Business Basic, Standard and Premium
   ([Microsoft Learn, updated 1 October 2026](https://learn.microsoft.com/en-us/copilot/manage)).
2. Word: "Use Copilot to see a summary of the latest comments and changes made to your Word files
   using the Copilot chat pane." Roadmap 489825, Launched, general availability September 2026,
   last updated 7 October 2026 ([Microsoft 365 Roadmap RSS](https://www.microsoft.com/releasecommunications/api/v2/m365/rss)).
   No licence is stated, so the change line says "if Copilot shows in your Word".
3. Excel: "See Copilot usage in show changes pane", Copilot attribution cards mark AI-generated
   edits ([Microsoft 365 Copilot release notes, 23 September 2026](https://learn.microsoft.com/en-us/copilot/microsoft-365/release-notes)).
   No licence stated; same treatment.

**After, caption** (811 characters):

```text
Three Copilot changes you can use this week.

You may already have it. Copilot Chat is included at no extra cost with Microsoft 365 Business Basic, Standard and Premium. Sign in at copilot.cloud.microsoft with your work email. (Microsoft Learn, updated 1 October 2026)

If Copilot shows in your Word, it can now sum up the latest comments and edits on a document. Open a shared document and ask what's changed since Monday. (Microsoft 365 Roadmap, launched September 2026)

If Copilot shows in your Excel, anything it changes is now marked in Show Changes, so you can see exactly which cells it touched. Check there before you send a sheet on to anyone else. (Microsoft 365 Copilot release notes, 23 September 2026)

The third one matters most. You can let it help with a spreadsheet and still know what it did.
```

**After, card JSON:**

```json
{"template":"roundup",
 "title":"Three Copilot changes *you can use this week*",
 "items":[
  {"tool":"Copilot","change":"Copilot Chat is included at no extra cost with Microsoft 365 business plans.","do":"Sign in at copilot.cloud.microsoft with your work email."},
  {"tool":"Word","change":"If Copilot shows in your Word, it sums up the latest comments and edits.","do":"Open a shared document and ask what's changed since Monday."},
  {"tool":"Excel","change":"If Copilot shows in your Excel, its edits are marked in Show Changes.","do":"Check Show Changes before you send a sheet on."}],
 "source":"Microsoft Learn, 1 October 2026; Microsoft 365 Roadmap, September 2026; Microsoft, 23 September 2026"}
```

What changed on the card: no eyebrow, no per-item date label, no second heading per item; one
title and three tool, change, do triples that fill the height; every item ends in something to do.

---

## 6. Fail list

1. **Written for the IT department.** Purview, government clouds, connectors, admin centres.
   Fix: filter b and c. If you would need to explain to the owner why it matters, cut it.
2. **Roadmap dates as news.** "Generally available November 2026" is not a change this week, and
   it ages badly. Fix: filter e. Shipped or rolling out now only; future items wait until they land.
3. **Wrong plan for the reader.** Our 2 October roundup sent readers to "whoever administers your
   workspace" about the ChatGPT Privacy Center, which OpenAI lists for Free, Go, Plus and Pro, with
   Business not mentioned. Fix: copy the availability sentence into the log and write the plan
   from it, or say "plan not stated" and hedge with "if you see it".
4. **A teaser instead of a thing to do.** "Citations link to the part, not the document" tells the
   reader nothing to do. Fix: no do line, no item. The do line starts with a verb and names the place.
5. **Vendor vocabulary passed through.** GA, tenant, extensibility, Rapid Release, agentic,
   "declarative agents". Fix: the banned list in the prompt, and translate to what appears on screen.
6. **Model and benchmark headlines.** "GPT-6 Sol arrives" excites nobody at a builders' merchant.
   Fix: filter g. State what the reader can now do on their plan, or drop it.
7. **One vendor only.** A Copilot-only card loses every Google Workspace practice that reads it.
   Fix: one item per tool where the week allows; if not, say "for Microsoft 365 users" in the title.
8. **Padding and repeats.** Six items, two of which already ran, or US-only features to make the
   number. Fix: three items, two if that is what passes, none if fewer pass; run
   `node lib/freshness.mjs` and check `bank/ledger.csv` before choosing.

---

## Not verified on 11 October 2026

- The internal labels of a Rundown issue (issue pages would not open); we describe only its homepage.
- Roadmap item 523223 (deep citations) could not be found in the RSS or on the roadmap page.
- Whether the Word comment summary and Excel Show Changes features need the paid Copilot add-on:
  Microsoft states no licence on either, and Microsoft Support says Copilot in apps "Depends on
  your label" for Copilot Chat users. Hence the "if Copilot shows" wording.
- The AuthoredUp hook figures are from `references/claims.md` (verified 23 September 2026), not
  reopened in this task.
- No roundup on our page has metrics yet, so nothing here rests on our own numbers.
