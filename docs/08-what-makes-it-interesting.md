# What makes it interesting

Written after the first batch came back boring. This corrects the headline rules and the
story-selection scoring in `02-playbook.md` and `06-editorial-model.md`. Where they
disagree, this wins.

---

## 1. The diagnosis

Three things made the first batch flat, and they compound.

**The image was a fallback presented as a design.** Every card in your examples is a
photograph of a person. Musk with the wine glass. The French CEO in the orange blazer on
a New York street. Pamela Meyer mid-gesture. The photograph is the reason anyone stops
scrolling. A procedural gradient is what we use when nothing fits, and a whole day of
them is a whole day of nothing fitting.

**The headlines were institutional.** "Six questions to settle before you roll out an AI
assistant" is a competent blog title. "I'm a French CEO in NYC. I say no to 80% of
emails, take two-hour lunches, and don't compare myself to others" is a person talking,
and it took 629 reactions. One of those sounds like a company. The other sounds like
someone you would repeat at lunch.

**The story selection was dutiful.** The scoring weighted "can a manager act on this"
highest, which reliably surfaces release notes and checklists. Nobody has ever stopped
scrolling for release notes. Actionability is what makes a post useful once it is read.
It has almost nothing to do with whether it gets read.

---

## 2. The new scoring

Score every candidate story on these, in this order. The first question is the gate.

1. **Would a manager read this out to the person next to them?** If no, it does not run
   in the wide band whatever else it has going for it. This is the only question that
   predicts reach.
2. **Is there a person in it?** Named, ideally photographed, ideally saying something.
   Stories about companies travel. Stories about people doing surprising things travel
   further.
3. **Is there a number that sounds wrong?** $450,000. 49%. 80%. 1.6. A number that makes
   someone check they read it correctly is worth more than three paragraphs of context.
4. **Is there tension?** Someone quit, someone reversed a decision, two people disagree,
   a company said one thing and did another. Conflict is the engine of every example you
   sent.
5. **Can we get a legal image for it?** This is a hard gate, not a preference. A great
   story with no usable photograph is a worse post than a good story with one.
6. **Only now: is it useful?** Useful decides the "useful" band and the copy underneath.
   It does not decide what goes on the card.

**Formats to stop leading with.** The checklist card and the stat card are saves-and-
screenshots formats, not reach formats. They belong in the useful and ours bands, roughly
five posts a week between them, never in the morning slot. Business Insider does not post
checklists, and our first day had two.

---

## 3. The headline rules, rewritten

**The four rules**

1. **A subject does something.** Somebody or some company, then a verb. "Google just
   quietly let all its engineers use a rival's AI" works. "AI assistant adoption across
   engineering teams" is not a sentence about anyone.
2. **One surprising number, or a quote.** If neither is available, the story is probably
   not strong enough for the morning slot.
3. **Give away the whole thing.** No colons, no "here's why", no "what happened next".
   Your best example tells you Musk lives in a trailer and people still click.
4. **First person wherever the story allows it.** "I have a job teaching people how to
   use AI. I spend half my time telling people not to." The quote marks do more work than
   any framing we could write around it.

**The negative rule.** Nothing that sounds like a training company talking. If the
headline contains rollout, adoption, framework, guide to, best practices, unlock,
or "what your team should", it is a blog post wearing a news card.

**Worked corrections**

| Before | After |
|---|---|
| Six questions to settle before you roll out an AI assistant | "I have a job teaching people how to use AI. I spend half my time telling people not to." |
| Microsoft shipped 11 Copilot changes this fortnight. Three matter to you. | Google just quietly let all its engineers use a rival's AI |
| The average number of AI technologies in use at a UK business that has adopted any at all | 35% of UK firms use AI. The average one uses it for 1.6 things. |
| Anthropic is now selling Claude to small businesses | Anthropic posted a $450,000 sales job aimed at Meta. Then deleted it. |

See `headline-batch.md` for 24 more, graded, all from real stories in the last week.

---

## 4. The image problem, stated plainly

This is the binding constraint on the whole page and it will not be solved by design.

**What is closed off.** Images cannot be lifted from news sites, however credited.
Getty is a licensing business, not a free service, and its embed tool is a web-page
iframe that cannot be used on LinkedIn. Generated imagery via the connected Higgsfield
account returns "requires basic plan or higher", so that route is shut unless you
upgrade. This sandbox's network blocks Wikimedia, Unsplash and every other image host,
so nothing can be fetched at run time.

**What actually works, in order of how much it would improve the page**

1. **Buy an editorial stock subscription.** Getty or Shutterstock editorial is roughly
   thirty to fifty pounds a month and gives real press photographs of real people, which
   is exactly what every card in your examples is. For a page whose entire proposition is
   news, this is not a nice-to-have, it is the main input cost. It is cheaper than the
   Buffer upgrade and it would do more for engagement than anything else on this list.
2. **Seed a library from Wikimedia Commons, free.** Covers the named public figures:
   Musk, Altman, Amodei, Nadella, Pichai, Hassabis, ministers, regulators. CC licensed,
   attribution required and recorded per file. This covers most AI-industry stories and
   costs nothing but an afternoon.
3. **Unsplash and Pexels for the non-person stories.** Offices, commutes, laptops, shop
   floors. Free for commercial use, no attribution needed. Weaker than a face, better
   than a gradient.
4. **Ask the subject.** Worth noticing that Business Insider credits "(Credit: Pamela
   Meyer)" and "(Credit: Adélaïde Chantilly)" on two of the examples you sent. For
   people stories they often simply asked, and the subject supplied the photograph. That
   points at an interview series, which would generate the story and the licensed image
   in one move, and would be the only genuinely original content on the page.

**How to get images into the pipeline.** Drop them into a chat. They land in the uploads
directory, and one session can build the manifest, tag them and push the library to the
assets repo. After that the daily task matches stories to photos by tag with no further
involvement. Forty images is one afternoon and covers most of a year.

**Until there are photographs, the page should post less.** Two strong cards a day with
a real image will outperform three with gradients, and will not train the audience to
scroll past us. Volume is worth nothing if the unit is weak.
