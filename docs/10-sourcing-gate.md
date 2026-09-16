# The sourcing gate

Added after a fabrication got through. This is a hard gate, not guidance.

---

## 1. What happened

In the sample day I wrote:

> "Microsoft shipped 11 Copilot changes this fortnight. Three matter."
> ... Agent Mode in Excel and PowerPoint now edits the file you have open ...
> Copilot Notebooks let you group the files and chats for one project ...
> the roadmap shows tenant level controls arriving for which connectors staff can use

**The number 11 was invented.** I did not count the release notes. The three features
are real Microsoft capabilities, but I did not open the 25 August release notes to
confirm any of them shipped in that batch, and "this fortnight" was an assumption.

Nothing about that post was checkable, and it read as authoritative because the format
makes everything read as authoritative. That is precisely the danger of a news card: the
design lends credibility that the content has not earned.

The other two posts in that batch were drawn from Business Insider reporting supplied in
the conversation, with named people and direct quotes, and they hold up. One in three is
not an acceptable rate.

---

## 2. The rule

**Every factual claim in a post traces to a primary source the task actually opened
during the run.** Not recalled, not inferred, not assumed from how the world usually
works. Opened.

This applies to:

- **Numbers.** Counts, percentages, sums, dates, headcounts, valuations. If the task did
  not read the number in the source, the number does not appear.
- **Quotes.** Exact words, with the speaker named and the publication that carried it.
- **Attributions.** "X said", "Y reported", "according to Z". Each needs the document.
- **Timing.** "This week", "yesterday", "this fortnight" are factual claims. Check them.
- **Product behaviour.** What a feature does, where it appears, who can turn it on.
  Vendor documentation or release notes, not memory of a demo.

**The counting rule specifically.** Never state how many of something there were unless
the task counted them in the source. "Microsoft shipped several changes" is honest.
"Microsoft shipped 11 changes" is a claim, and an invented one is indistinguishable from
a real one to the reader.

---

## 3. What does not need a citation in the post

Viren's instruction: sources must exist, but not every line needs to be cited on the face
of the post. That is right, and it is how newsrooms work. The distinction:

**Must be verifiable, need not be cited inline:** general context the reader can check
("LinkedIn is where most UK professionals see business news"), our own opinion clearly
marked as opinion ("our read is"), and widely established background.

**Must be cited on the face of the post:** any number, any quote, any "according to",
anything a competitor could dispute, anything about a named company or person's
behaviour. One source line at the foot of the post covers most of these, in the Business
Insider style: "Read more on [publication]: [link]".

**The test:** if a reader replied "where did you get that", would there be an answer
within thirty seconds. If not, the line comes out.

---

## 4. Where it lives in the pipeline

The ledger gains three columns, and they are mandatory:

| Column | What goes in it |
|---|---|
| `source_url` | The primary document, opened during the run |
| `source_publisher` | Who published it |
| `source_date` | Publication date as stated on the document |

A row with an empty `source_url` is a failed run for that post, not a warning. The daily
task drops the post and fills the slot from the bank rather than shipping it.

**The self-check before scheduling.** The task re-reads each drafted post and lists every
factual claim in it. For each claim it names the source document and the line in it. Any
claim that cannot be paired with a document is deleted from the draft. If deleting the
unsourceable claims leaves the post without a point, the post does not run.

This adds a few minutes to a run that has a fifteen minute budget. It is the right place
to spend them.

---

## 5. What to do when the story is real but the detail is not confirmable

This is the common case and it has a good answer: **write the smaller true thing.**

- Instead of "Microsoft shipped 11 Copilot changes this fortnight", write about the one
  change the task actually read and confirmed, and say what it does.
- Instead of "most rollouts stall in week three", which we cannot evidence, write "the
  ONS found the average UK business using AI uses it for 1.6 things", which we can.
- Instead of implying we have seen this at clients, say nothing about clients.

A narrower post with a source beats a broader post without one, every time. The broader
post is also the one that gets corrected in the comments, on a page whose entire value
is being the account that gets it right.

---

## 6. The standing prohibition, restated

No invented clients, results, testimonials, quotes or case studies. AI for Companies has
no delivery history to point at, and manufacturing one would destroy the only asset the
page has. This has been in the voice document from the start and it is repeated here
because the sourcing gate and the fabrication prohibition are the same rule applied at
two scales.
