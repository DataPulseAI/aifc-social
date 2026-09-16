# The compiled source list

Everything shared across the build, consolidated into one place. Feed status as tested
15 September 2026. Where a feed could not be reached from the sandbox, that is an
environment limit and not evidence the feed is dead; those are marked and should be
verified from a normal network before discarding.

---

## Tier 1, poll daily

The wide band lives here. Named people, real companies, money, conflict.

| Feed | Status | Note |
|---|---|---|
| `techcrunch.com/category/artificial-intelligence/feed/` | PASS | ~5/day. Highest volume of named-company, named-money stories |
| `sifted.eu/sector/artificial-intelligence/feed` | PASS | UK and European startups. Titles only, fetch the article. The differentiator for a UK page |
| `fastcompany.com/section/artificial-intelligence/rss` | PASS | ~3/day. Frames AI as workplace change, which is our angle |
| `theneuron.ai/feed/` | PASS | ~5/day. Already written for a non-technical business reader |
| `technologyreview.com/topic/artificial-intelligence/feed` | PASS | ~1/day, full text. Best signal-to-noise of the mainstream titles |
| `news.crunchbase.com/feed/` | PASS | ~2/day, full text. Funding and deals with named founders |

**WIRED, all four you supplied.** Worth polling daily, and Ideas in particular is a
strong source of the argumentative piece that travels on LinkedIn.

- `wired.com/feed/tag/ai/latest/rss`
- `wired.com/feed/category/business/latest/rss`
- `wired.com/feed/category/ideas/latest/rss`
- `wired.com/feed/tag/wired-guide/latest/rss`

Not reachable from the sandbox for testing, so confirm once from your own machine.

**The Guardian**, `theguardian.com/technology/artificialintelligenceai/rss`. Add once
verified. For a UK business audience this is arguably the strongest wide-appeal feed
available.

## Tier 2, poll weekly

`openai.com/news/rss.xml` · `blog.google/technology/ai/rss/` · `transformernews.ai/feed` ·
`oneusefulthing.org/feed` (Ethan Mollick, ~twice a month, feed holds two items) ·
`aibusiness.com/rss.xml` · `news.microsoft.com/source/topics/ai/feed/` ·
`ncsc.gov.uk/api/1/services/v1/all-rss-feed.xml` ·
`learn.microsoft.com/en-us/copilot/microsoft-365/release-notes` ·
`microsoft.com/releasecommunications/api/v2/m365/rss` ·
`feeds.feedburner.com/GoogleAppsUpdates` ·
`gov.uk/government/organisations/department-for-science-innovation-and-technology.atom` ·
`techuk.org/what-we-deliver/insights.html` · `anthropic.com/news` (no RSS)

## Tier 3, monitor but rarely post from

`arstechnica.com/ai/feed/` · `theverge.com/rss/ai-artificial-intelligence/index.xml` ·
`theconversation.com/topics/artificial-intelligence-ai-90/articles.atom` ·
`hn.algolia.com/api/v1/search_by_date?query=AI&tags=story&numericFilters=points>300` ·
`simonwillison.net/atom/everything/` (written for engineers) ·
`huggingface.co/blog/feed.xml` and `marktechpost.com/feed/` (technical research volume)

## Calendared, fire on a date

| Source | Lands | Verified figures on file |
|---|---|---|
| **ONS, AI in UK businesses** | TBA, watch the release calendar | Yes, 20 July 2026 |
| **Enterprise Nation Tech Hub** | ~June, annual | Yes, 9 June 2026 |
| **McKinsey State of AI** | late August | Yes, 25 August 2026 |
| **Microsoft Work Trend Index** | first week of May | Yes, 5 May 2026 |
| **Stanford HAI AI Index** | April | Yes, April 2026 |
| **ICO** | ~monthly on AI | Index is JS-rendered, discover via search then fetch the article |

All verified wording is in `bank/sources.md`.

## Broken, stale or blocked. Do not retry.

`venturebeat.com/category/ai/feed` broken, last item 27 August, use `venturebeat.com/feed/` ·
`news.crunchbase.com/sections/ai/feed/` stale five weeks, use the site-wide feed ·
`anthropic.com/rss.xml` 404 · `import.ai/rss` 404, email only · The Batch, no RSS ever ·
`ncsc.gov.uk/news/rss` 404, use the API path above ·
`gov.uk/search/all.atom` robots-blocked, use per-organisation `.atom` ·
`ico.org.uk/rss/` 404 · `bcg.com/publications/artificial-intelligence` 404 ·
`techuk.org/news-and-events.html` 404 · `www2.deloitte.com/us/.../state-of-generative-ai...` 404 ·
`sloanreview.mit.edu/topic/ai-machine-learning/feed/` robots-blocked ·
`tldr.tech/ai` no archive · `pwc.co.uk` no dated research index ·
`arxiv.org/rss/cs.AI` works but is 45,000 papers a year and wrong for this audience

**Two traps to hard-code around.** The Deloitte UK State of AI page still serves Q4 2024
content presented as current. And the SME Digital Adoption Taskforce update carries no
adoption statistics despite looking like it should.
