# The editorial model: reach first, training second

This supersedes the pillar mix in `02-playbook.md`. Written after reviewing the
Business Insider feed cards in detail. Everything else in the playbook still stands.

---

## 1. The change, and why it is right

The first draft of this system treated the page as a training company that publishes.
That is backwards. The page should be **a publication that happens to be owned by a
training company**, which is exactly the Business Insider shape you pointed at.

The reason is arithmetic. A page that only posts about AI training reaches people
already thinking about AI training, which is a small and mostly already-served pool.
A page that posts genuinely interesting things about AI, work and the companies people
are curious about reaches everyone, and a slice of them turn out to run teams that need
training. You cannot convert an audience you never reached.

The commercial logic is also better. Nobody follows a page to be sold to. They follow
it because it reliably tells them something worth knowing. The training business is
then carried entirely by association: the page that explained the AI safety row calmly
and accurately is obviously run by people who understand AI, and that is the only
credential that matters when someone eventually needs a trainer.

**The rule of thumb: if a post could only exist to generate leads, it does not run.**

---

## 2. The new mix

| Band | Share | What it is | Example |
|---|---|---|---|
| **Wide** | 55% | AI, tech and work stories any professional finds interesting. Named people, real companies, money, power, conflict | The AI slowdown row. Oracle's CFO on "doing more with less". Musk in a trailer. A DeepMind researcher resigning |
| **Useful** | 30% | Free nuggets. Something the reader can use or repeat today. No gate, no ask | Six questions before you buy seats. The one page AI policy. What actually changed in Copilot |
| **Ours** | 15% | Our reading, our data, our resources | The ONS 1.6 number. The insights articles. The ninety day plan |

Across 21 posts a week that is roughly 12 wide, 6 useful, 3 ours. Only the three "ours"
posts carry a link to us, and even then usually to an article rather than a booking page.

**The wide band is not filler.** It is the reason anyone is there. Treat it as the main
event and give it the best photography and the sharpest writing.

### What qualifies as "wide"

- The AI industry as a human story: who is arguing with whom, who quit, who is worried,
  who stands to gain. This is currently the richest seam in the category.
- Big company decisions that any manager recognises: layoffs, return to office,
  management layers, what a CEO said internally.
- How work itself is changing: the job market, what employers now expect, what skills
  people are stacking.
- Named individuals with a point of view, especially founders and operators. The CEO
  who says no to 80% of her email outperformed almost everything else in your examples,
  because it is a real person saying something concrete and slightly transgressive.
- Money and scale numbers that make people stop: a valuation, a salary, a spend.

### What is still out of bounds

Party politics, anything where the story is a named private individual's misfortune,
crypto price talk, culture war bait, and AI doom as spectacle rather than as a business
question. The page can cover the safety debate, and it covers it the way a trade
publication would: what was said, by whom, what it means for the reader.

---

## 3. The house format

One format does most of the work, and consistency is a feature. A reader should be able
to identify our card in the feed before reading a word of it.

### The card

```
        ┌──────────────────────────────┐
        │        AIforCompanies        │   wordmark, centred, 54px from top
        │                              │
        │                              │
        │          PHOTOGRAPH          │   fills the frame, person-led where possible
        │                              │
        │                              │
        │ ░░░░░░░░░░░░░░░░░░░░░░░░░░░░ │   gradient begins around 60%
        │ ▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓ │
        │ One sentence, two or three   │   Instrument Sans 700, white, 78 to 88px
        │ lines, bottom left           │   tight tracking, 72px side margin
        └──────────────────────────────┘
```

1080 x 1350. Nothing else on the card. No kicker, no credit line, no logo lockup, no
call to action. The restraint is what makes it look like a publication rather than an
advert. The credit goes in the post text, not on the image.

### The headline sentence

This is the whole card, so it gets the most attention of anything we write.

- **One sentence. Two or three lines. Never four.**
- It states the thing, it does not tease it. "The world's richest man says he's living
  in a trailer" gives away the entire story and is irresistible anyway.
- Concrete nouns and a named subject. "A Google DeepMind researcher just quit over what
  AI might do to us" beats "Another AI safety resignation".
- Present tense where possible.
- No colons, no "here's why", no numbered-list framing on the wide band.
- It must make sense with zero context, because most people will see only this.

### The post body

Follow the Business Insider structure, because it works and it is honest about its
sources.

1. **The hook line.** Usually a reframing of the headline, or the single most surprising
   fact. Sometimes an analogy that takes three short paragraphs to land, as in the pharma
   comparison. Analogy openers are the highest-ceiling version of this format and should
   run perhaps twice a week.
2. **Two to four short paragraphs** telling the story. Named people, direct quotes where
   we have them, specific numbers. Attribute clearly: "according to a recording reviewed
   by Business Insider" is a model sentence, because it credits and it qualifies.
3. **One paragraph of our read**, on the useful and ours bands. On the wide band this is
   often a single sentence, and sometimes nothing. Restraint here is what stops the page
   feeling like it has an agenda.
4. **The source line.** "Read more on Business Insider: [link]". Plain, generous and
   linked. We are sending them readers, which is the correct trade for using their
   reporting, and it is what makes the format sustainable rather than parasitic.
5. **Credit line** where a photo needs one: `(Credit: ...)`.
6. **Hashtags.** Business Insider uses exactly three. Our own research says hashtags are
   at best neutral and that six or more measurably hurts reach. Use three, lower case,
   broad, and treat it as something the weekly analysis should test rather than assume.

Length: 700 to 1,100 characters. The hook must land inside the first 140.

---

## 4. Photography, and how we get it legally

This is the part of your plan that has to change, and it is worth being plain about why.

**We cannot take images from news sites.** The photograph on a Business Insider card is
licensed from Getty, or shot by their staff, and it is the single most expensive thing
on the page. Reusing it is copyright infringement whether or not we credit them.
Crediting is not a licence. LinkedIn's takedown process is automated and fast, and the
exposure sits with DataPulse AI Limited. The facts in their story are free to use. The
picture is not.

**What we use instead.** The card format works with any strong image, so this is a
sourcing problem, not a design problem.

| Source | Best for | Terms |
|---|---|---|
| **Wikimedia Commons** | Named public figures. Musk, Altman, Amodei, Nadella, Pichai, Hassabis, ministers, regulators all have usable portraits | CC BY or CC BY-SA. Attribution required, record it |
| **Company press and newsrooms** | Executive headshots, product shots, data centres. Microsoft, Google, OpenAI and most large firms publish these for editorial use | Check each press page's terms, usually editorial use permitted |
| **Unsplash and Pexels** | Generic workplace, city, laptop, meeting, commute. The "millennials are stacking jobs" kind of story | Free for commercial use, no attribution required |
| **Openverse** | Aggregates CC-licensed material across sources | Per-item, record the licence |
| **Our own photography** | Sessions, the Wembley venue, our team | Ours |

**The library, because live fetching does not work.** This container's network policy
blocks Wikimedia, Unsplash, Openverse and every other image host. So images cannot be
fetched at run time. They are seeded once into a library and matched at render time:

```
photos/
  index.json          manifest: file, tags, licence, attribution, source_url, added
  people/             altman.jpg, amodei.jpg, musk.jpg, nadella.jpg, ...
  work/               open-plan.jpg, meeting-room.jpg, laptop-desk.jpg, ...
  places/             london-city.jpg, datacentre.jpg, office-tower.jpg, ...
  abstract/           fallback textures
```

The daily task matches a story to a photo by tag, and falls back to a procedural
backdrop when nothing fits. Every entry in `index.json` carries its licence and
attribution string, so the credit line can be generated automatically and we can always
prove provenance.

**Seed list, roughly forty images, one afternoon's work.** This covers most of what a
year of stories needs:

- **People, from Wikimedia Commons:** Altman, Amodei, Musk, Nadella, Pichai, Hassabis,
  Huang, Zuckerberg, plus the UK Secretary of State for Science and the Information
  Commissioner.
- **Work, from Unsplash or Pexels:** open plan office, small team meeting, one person at
  a laptop, a whiteboard session, a warehouse, a shop floor, a construction site, a
  clinic reception, a busy commute, an empty office at night.
- **Places:** the City of London, Canary Wharf, a data centre, a generic tech campus,
  a UK high street, a factory.
- **Texture:** server racks, cables, a screen close up, a phone in a hand.

Grow it by ten or so a month. When a story arrives that nothing fits, the fallback
backdrop covers it and the gap goes on a list.

---

## 5. The type decision, and why we diverge from the site

The website uses Newsreader, a serif, for headings. **The social cards do not.**
They are set entirely in Instrument Sans, heavy weights, tight tracking.

This is deliberate and worth stating so nobody "corrects" it later.

A serif on a website reads as considered and established, which is exactly right for a
page someone has chosen to visit and is about to spend money on. The same serif in a
feed reads as old. It carries a whiff of institution and heritage, and it sits badly
next to the crisp geometric sans that every publication now uses for feed cards.

We are also not trying to look established. We are a new venture, and pretending
otherwise is both unconvincing and unnecessary. Corporate but digestible is the target,
and that is a modern grotesque in bold, not a book face.

The brand still holds together, because the things that actually carry recognition are
unchanged: the wordmark, the forest green, the stone ground, the restraint, and the
consistent card geometry. Type weight varies by medium, which is normal practice.

If the site is ever restyled, revisit this. Until then, sans on social, serif on the
site, and the wordmark bridging both.

---

## 6. The news beat

`03-sources.md` covers the practical and UK statistical sources. The wide band needs a
general AI and tech news beat on top. Poll these daily for the morning and late slots.

| Source | Why |
|---|---|
| **Business Insider Tech** | The model for this whole format, and a genuinely good source of the human-interest business story. Summarise and link |
| **The Verge** | Fast, well written, strong on the consumer and platform side |
| **TechCrunch** | Funding, launches, startup movement |
| **Reuters Technology** | The wire. Use it to verify anything that matters before posting |
| **The Register** | Sceptical, enterprise IT focused, good for the contrarian read |
| **Sifted** | UK and European startups, which most competitors ignore entirely. A real differentiator for a UK page |
| **Financial Times tech** | Paywalled, but headlines and the first paragraph are usually enough to know a story exists and then find it elsewhere |
| **Hacker News over 300 points** | Already vetted, and the comment threads surface the angle before anyone else has it |

**Verification rule, and it matters more on the wide band than anywhere else.** A story
that is interesting is also a story that is being exaggerated somewhere. Before posting,
confirm the claim in the original source, not in the aggregator. If the only source is a
single post on X, say so in the copy. Getting a viral story wrong on a new page is much
more costly than missing it.
