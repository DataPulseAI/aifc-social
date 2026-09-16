# 20. Growth, amplification, tagging and hashtags

Researched 16 September 2026. Every figure below was opened on the day. Where two sources
disagree, both are recorded rather than averaged.

---

## 1. The uncomfortable finding

**Company page reach is not what it was, and the gap to a personal profile is enormous.**

- Organic reach for company pages fell between **60% and 66% from 2024 to early 2026**,
  and company pages make up **1 to 2%** of a typical feed.
  ([Ordinal, Jan 2026](https://www.tryordinal.com/blog/the-declining-reach-of-linkedin-company-pages))
- A second measurement puts company pages at **5.37%** of posts actually seen in live
  feeds. ([DSMN8](https://dsmn8.com/blog/linkedin-company-page-vs-employee-advocacy/))
- Personal profiles reportedly generate **561% more reach** than company pages on
  identical content. (Ordinal, same piece. Treat this one as directional: it is a vendor
  figure with no published method.)
- In one firm's data, the **CEO matched the company page's engagement with 98% fewer
  followers**, 5,000 against 300,000. (DSMN8, 11,107 posts from one civil engineering firm.)

This does not mean abandon the page. The page is the archive, the thing a prospect checks,
and the surface the website links to. It means **the page alone will not build an
audience**, and the fix is cheap.

## 2. The cheapest lever available: amplify from the personal profile

Within the first hour of each post going live, Viren reshares or comments from his personal
profile. That is amplification, not a change of voice: the content still comes from the
page, which keeps the Business Insider positioning intact.

Two things make this worth doing properly rather than mechanically.

- **An edited reshare beats a bare one by a wide margin.** DSMN8's analysis of **517,374
  posts in H1 2026** found original employee posts earned **9.2x more engagement** than
  unedited shares of curated content, rising to **12x by June 2026**. And **editing a
  single word or two of a share led to 3x more engagement** versus sharing it untouched.
  So: add a line of your own. One sentence is enough.
- **The first hour decides the post.** Initial distribution reaches only **2 to 5% of
  followers** in the first hour, and what happens in that window sets everything after.
  (Ordinal.) A comment answered inside fifteen minutes is worth more than one answered
  the next day.

Practically, for a one-person company: pick the one post a day that matters most and give
it a first-hour reply from the personal profile. Not all three.

## 3. Tagging other pages

**Tagging people and pages outperformed hashtags** in the only peer-reviewed study we
found, Usera and Durham, *Business and Professional Communication Quarterly* (2025),
analysing **991 LinkedIn posts**.

The rules that keep it from being spam:

1. **Only tag what the post actually references.** If the post rests on an NCSC blog, tag
   the NCSC. If it does not, do not.
2. **Two tags maximum.** More reads as reach-seeking and it is.
3. **Tag the source, not the prospect.** Tagging a company you want to sell to, in a post
   they did not ask to be in, is the single fastest way to be muted.
4. **Credit in the text as well.** The tag is the mechanism, the sentence is the manners.

### How tagging actually works through Buffer

Buffer's LinkedIn metadata takes an `annotations` array, and each entry needs the page's
entity URN and numeric id, not just its name:

```json
{ "id": "1521226", "entity": "urn:li:organization:1521226",
  "link": "https://www.linkedin.com/company/bufferapp/",
  "vanityName": "bufferapp", "localizedName": "Buffer",
  "start": 42, "length": 6 }
```

`start` and `length` are character offsets into the post text, so they must be computed
against the exact final string.

**A wrong URN produces a broken post, so we never guess one.** Verified pages live in
`bank/mentions.csv` with their URN and vanity name. A page that is not in that file gets
plain-text credit and a link instead, which costs almost nothing. Adding one is a manual
job: open the page on LinkedIn, take the numeric id, verify it, add the row.

## 4. Hashtags

**Two to three, at the end, and only ones that describe the post.**

LinkedIn removed hashtag following in 2024, so hashtags no longer carry reach on their
own. They are a discovery and keyword signal now. The Usera and Durham study found the
sweet spot at **two to three**, with benefits dropping off quickly beyond that.

Our earlier note said zero to three with a preference for none. Revised: **two, at the
end**, capitalised for screen readers, `#AIforBusiness` rather than `#aiforbusiness`.
Six or more measurably hurts and always has.

## 4a. The first comment

Available from 16 September 2026, when the Buffer plan moved to Essentials. It saves
through the API as `metadata.linkedin.firstComment`, tested and confirmed.

**What goes in it.** The extension of the post, not the post's plumbing. The two or three
things to check this week. The caveat that would have made the body baggy. A question that
gives a reader somewhere obvious to reply. A first comment from the page also means the
post is never sitting at zero comments, and threaded replies carry up to 2.4x.

**What never goes in it: a link.** First-comment links are separately deboosted, and that
is the one thing every source agrees on. The link goes in the body, where `docs/16` puts it.
Moving it to the comment to dodge a penalty is the exact behaviour the March 2026
authenticity update targets.

**And the source stays in the body.** It is tempting to push the citation into the comment
to keep the post clean. Do not. Visible sourcing is most of why this page is worth
following, and a source nobody scrolls to is a source nobody sees. Put the one-line
citation in the body and use the comment for the methodology note, the second figure, or
the thing the reader should now go and do.

## 5. Links, and a correction worth recording

`docs/02` carries a measured **18.8% penalty** on link posts, from van der Blom's 2026
sample. Against that, LinkedIn's own Senior Director has said the platform **"does not
intentionally limit"** reach for posts containing links. (Reported by Ordinal.)

Both can be true: a stated absence of intent is not a measured outcome, and link posts can
underperform because people scroll past them rather than because anything throttles them.

What we do is unchanged, because it was never built on the penalty alone: put the link in
the post rather than the first comment, keep it on image and carousel posts where the
measured cost is smallest, and make the post worth reading whether or not anyone clicks.
First-comment links are separately deboosted, which is the one thing everyone agrees on.

## 6. Timing

Tuesday to Thursday, 8 to 10am local, is the window both sources name. Our slots are 07:45,
12:15 and 17:15 UK on weekdays, which puts the strongest post of the day just inside it.

Do not read anything into a single week. A page at zero followers produces noise, not
signal, for at least a month.

## 7. What not to do

The March 2026 authenticity update reduces distribution for engagement bait, automation,
comment pods and low-value link-pushing. Specifically off the table, permanently:

- "Comment X and I'll DM you the guide."
- Reciprocal comment groups.
- Tagging people who have nothing to do with the post.
- Reposting our own content with a new first line to farm a second run at the algorithm.
- Buying followers, which poisons every subsequent reach number.

## Sources

- [LinkedIn Company Page Reach in January 2026, Ordinal](https://www.tryordinal.com/blog/the-declining-reach-of-linkedin-company-pages)
- [Company Page vs Employee Advocacy, DSMN8](https://dsmn8.com/blog/linkedin-company-page-vs-employee-advocacy/)
- [Do LinkedIn hashtags still work in 2026, ContentIn, reporting Usera and Durham 2025](https://contentin.io/blog/do-hashtags-work-on-linkedin/)
