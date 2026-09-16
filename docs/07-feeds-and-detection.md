# The verified feed list, and not getting flagged

Two late additions. Feeds were fetch-tested on 15 September 2026.

---

## 1. Tier 1: poll daily

These six carry the wide band. Chosen for reliability, signal, and the human business
story rather than technical research.

| Feed | Why it earns a daily poll |
|---|---|
| `techcrunch.com/category/artificial-intelligence/feed/` | Highest reliable volume of named-company, named-money stories. Roughly 5 a day |
| `sifted.eu/sector/artificial-intelligence/feed` | UK and European startups. The only verified-live source here covering your audience's own market rather than Silicon Valley. Titles only, so fetch the article |
| `fastcompany.com/section/artificial-intelligence/rss` | Frames AI as workplace and management change, which is precisely our angle. About 3 a day |
| `theneuron.ai/feed/` | Already written for a non-technical business reader, so items need almost no translation |
| `technologyreview.com/topic/artificial-intelligence/feed` | Full text in the feed and the best signal-to-noise of the mainstream titles. One substantive story a day |
| `news.crunchbase.com/feed/` | Full text, funding and deals with named founders and numbers |

**WIRED, added on your suggestion and worth polling daily once verified:**
`wired.com/feed/tag/ai/latest/rss`, `wired.com/feed/category/business/latest/rss`,
`wired.com/feed/category/ideas/latest/rss`. WIRED Ideas in particular is a strong source
of the argumentative, wide-appeal piece that travels well on LinkedIn.

**Also add once verified:** `theguardian.com/technology/artificialintelligenceai/rss`.
For a UK business audience this is arguably the strongest wide-appeal feed of all.

## 2. Tier 2: poll weekly

`openai.com/news/rss.xml` · `blog.google/technology/ai/rss/` ·
`transformernews.ai/feed` · `oneusefulthing.org/feed` (Ethan Mollick, roughly twice a
month, the feed holds only two items) · `aibusiness.com/rss.xml` ·
`news.microsoft.com/source/topics/ai/feed/`

## 3. Corrections to the list you sent

- **`venturebeat.com/category/ai/feed` is broken.** Last item 27 August. Use
  `venturebeat.com/feed/` and filter for AI, though it duplicates TechCrunch heavily.
- **`news.crunchbase.com/sections/ai/feed/` is stale**, five weeks behind. Use
  `news.crunchbase.com/feed/`.
- **Anthropic has no RSS.** Scrape `anthropic.com/news` or subscribe by email.
- **Import AI's RSS is dead**, 404. Email only.
- **Deliberately excluded:** MarkTechPost and Hugging Face are high-volume technical
  research with little human story. Simon Willison is excellent but written for
  engineers. arXiv cs.AI is 45,000 papers a year and wrong for this audience entirely.

**Not verified from this environment:** The Verge, Ars Technica, WIRED, The Guardian,
The Conversation and Business Insider are all behind bot protection here. That is an
environment limit, not evidence they are dead. They are well known live feeds. Verify
them from a normal network before discarding any.

---

## 4. Getty Images: the correction

You mentioned Getty as royalty free with attribution. It is not, and this one matters
because it is the difference between a normal cost and a legal claim.

**Getty is a commercial licensing business.** Nothing on gettyimages.co.uk is free to
download and post because you credited it. Business Insider can use Getty photographs
because they hold an editorial licence that costs real money. Their credit line reads
"(Credit: Getty Images)" because the licence requires attribution, not because
attribution is what bought it.

Getty does run a **free embed tool**, and this is almost certainly where the confusion
comes from. It gives you an iframe you can put on a web page, with Getty's own player,
tracking and branding attached. It is not a downloadable file and it cannot be used as a
LinkedIn image. Getty has also historically pursued unlicensed use aggressively, and
their demand letters arrive with a number on them.

So the position stands: **licensed or generated only.** The five safe routes are set out
in `06-editorial-model.md` section 4. Wikimedia Commons covers the named public figures,
which is the main thing you wanted Getty for, and it is genuinely free with attribution.

If you want real press photography badly enough, a Getty or Shutterstock editorial
subscription is a legitimate business expense and you could simply buy one. That is a
budget decision rather than a blocker, and it would make the wide band noticeably
stronger. It is not required to launch.

---

## 5. Not being flagged as AI

There are two halves to this and only one of them is technical.

### The technical half, already handled

Rendered cards now pass through `lib/clean.mjs`, which re-encodes every PNG and strips
EXIF, XMP, IPTC and the embedded colour profile. Verified output carries only `IHDR`,
`pHYs`, `IDAT` and `IEND`, so there is no generator string, no software tag and no
timestamp in the file we publish.

Worth knowing: LinkedIn recompresses uploads anyway, so this matters less for the posted
image than for the copies we host ourselves on GitHub, which are public and permanent.
Clean files cost nothing, so we ship clean files.

Note also that none of our images are AI-generated in the first place. They are
typography and procedural gradients rendered by a browser, plus licensed photography.
There is no C2PA content credential to strip because no generative model touched them.

### The half that actually decides it

**LinkedIn has never confirmed that it detects and downranks AI-written text.** That
claim circulates constantly and has no primary source. What LinkedIn did announce, in
March 2026, is an authenticity update that reduces distribution for engagement bait,
automation, comment pods and low-value link-pushing. Those are behaviours, and they are
detectable, and we avoid all of them by design.

Standalone AI detectors are close to worthless. OpenAI shut down its own classifier
because it did not work. GPTZero and its competitors return coin-flip results on short
text and are trivially defeated by asking for a specific style. Writing to beat a
detector is optimising against a broken instrument.

**What genuinely gets a post ignored is being generic**, and that is a content problem
with a content fix. The whole of `01-voice.md` is that fix: the banned vocabulary, the
structural tells (the one-line-per-sentence stack, arrow bullets everywhere, the triple,
the symmetrical contrast pair), and the positive test, which is the one that matters:

> If the first two lines could sit on any other AI account with only the brand name
> swapped, rewrite them.

Two things make our posts hard to mistake for generated filler, and neither is a trick.
First, **specificity we can only get by doing the work**: a named source, a date, a
number nobody else has pulled out, a reading of the second statistic rather than the
headline one. Second, **a position**. Generated content hedges because hedging is safe.
Saying plainly that most UK firms are not behind on adoption and are behind on depth, and
being willing to defend it in the comments, is not a style a template produces.

Get those right and the question of detection stops being interesting.
