# 27. The funnel, and the stage every post pushes toward

Written 21 September 2026. The full note, with the systems decision and the build list, is in
the project (`aifc-funnel-and-systems-2026-09-21.md`). This is the part the batch needs.

## Six stages

| Stage | Job | Where it lives | Measured by |
|---|---|---|---|
| 01 Reach | be seen by people who do not follow us | page, profile, Convu, referral partners, in person | impressions, reposts |
| 02 Value, free | prove we know the subject | `/insights`, `/prompts`, the Monday count, the correction | visits |
| 03 Capture | trade a working document for a work email | `/resources/<slug>` | downloads, opt-in rate |
| 04 Nurture | stay useful until the timing is right | the fortnightly note (Resend) | opens, replies, unsubscribes |
| 05 Convert | twenty minutes, then a scope or an honest no | cal.com, the enquiry form | calls booked and held |
| 06 Deliver and refer | the day, the guarantee, the next introduction | the session, the referral sheet | days, referrals |

Stage six feeds stage one. Nothing on the page or the profile sells; the furthest a post
pushes is stage three, and most push to stage two.

## Rules for the batch

1. **Every bank row names its stage** in a `stage` field (1, 2 or 3). The weekly guard warns
   if more than three posts in ten push to stage 3, or if any post pushes to 4 or 5.
2. **Gate the document, never the knowledge.** A resource post carries the substance in the
   post or on the card, and links to the page where the file sits behind the form. The
   creators' "comment X for access" is banned (`docs/01`) and is not how we gate.
3. **Every link carries UTM.** `?utm_source=linkedin&utm_medium=page|profile|convu&utm_campaign=<post_id>`,
   added by `queue.mjs` when it builds the post text, so a download can be traced to a post
   in the Monday pass.
4. **The fortnightly note is drafted from the bank.** One useful thing (a correction or a
   procedure that ran that fortnight), one resource, one line about the day. Same voice
   rules as the page, "we" not "I", Viren approves before it is sent.
5. **Convu is a separate funnel.** Its own Buffer channel (`bank/channels.json`), its own
   posts, no shared resource, list or link. On Viren's profile, one Convu post a week at most
   (`docs/26`).
