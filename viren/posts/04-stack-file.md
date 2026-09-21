# 04. The lead form that would have failed on every real submission

Profile post. Card: `viren/out/04-stack-file.png` (spec `04-stack-file.json`, template `file`).
Replaces 03, which failed the audit below.

## The audit: 03 against what the research said works

| What the strong posts did | 03 | 04 |
|---|---|---|
| Open on a specific moment, a news peg or a number that sounds wrong (Lara, Hills, Donnelly; Viren's own Convo #01, 58) | Opened on an aphorism. Aphorism openers were nowhere in the top posts and read as generated | Opens on a thing that happened to us, with the failure named |
| Hands on: "I did this, here is what happened" beats "here is how to think" (Cheung 717 vs 150; Miller 861) | A process template. Advice, not a thing done | A stack that is live, decisions that were made, two bugs that bit |
| The artefact is real and in use, not written for the post (Hills 1,034) | brief.md did not exist until the post | stack.md is the site as it runs today; every line is checkable in the repo |
| A detail the reader could not have written (Banks: "enterprises wouldn't touch Grok") | None. Every heading is standard product advice | The Amplify env-var trap, the JSON secrets blob, the unset form id |
| Self-deprecating where there is a failure (Heather 257: "I know some people hate posts starting with...") | None | The form would have failed and nobody knew |
| In the named niche: applying frameworks, building | About process, not about a framework | Next.js, Amplify, Resend, HubSpot, cal.com, with the reasons |
| No former employer, no assistant-writes-posts | Passed | Passed |
| Free, complete, saveable without the post | Passed | Passed |

03 passed the brand rules and failed the research. 04 is built from the research first.

## Post

Our lead form would have failed on every real submission. Nobody knew, because nobody had submitted one.

The cause was a single environment variable that was set nowhere. The fix took ten minutes. The useful part was what it made me do afterwards: write down every choice in the stack behind aiforcompanies.co.uk and the reason for it. That file is the image.

Two of those choices took longer than the rest of the site. Email: Resend, because it is free to 3,000 a month and one file names the vendor. Not SES, which wanted a sandbox exit, raw MIME and bounce plumbing for the same money. Not the CRM's own follow-up, which sends one email per form from a paid seat. And the form: two steps, first name and work email before anything else, so the download never depends on the consent box.

The trap I will fall into again is the first one under "two things that bit". Amplify environment variables reach the build and not the server. Anything read per request has to be written into .env.production at build time, and the secrets arrive as one JSON blob rather than as variables. That paragraph exists in the file so that next time it costs ten minutes and not an afternoon.

If you run a small site on Amplify with a form on it, this is the hour I would have wanted someone to hand me.

## Notes for Viren

- Everything in the file is true of the site as of 13 September 2026 (`lead-magnet-delivery`
  note): the two-step form, Resend on `send.aiforcompanies.co.uk`, the `HUBSPOT_LEAD_FORM_GUID`
  that was set nowhere and the `HUBSPOT_LEAD_FORM_ID` fallback, the `.env.production` line in
  `amplify.yml`, secrets under `process.env.secrets`. Two things to check before it runs:
  "nobody had submitted one" (true as far as we know; the live submit was the one untested path)
  and whether the site was live with the bug or it was caught before deploy. If it was caught
  before deploy, the first line becomes "Our lead form would have failed on every real
  submission. We found out the day before it went live."
- Put `docs/stack.md` in the site repo with these lines so the path on the card is real.
- No link. If a comment asks, the site is in the About.
- Best comment reply: the third thing that bit, which the file does not have room for
  (root SPF and Namecheap forwarding while the MX is Google).

## Why it should travel

The share is the first line: every founder who has shipped a form has had this, and forwards
it to the person who owns theirs. The save is the file: a working small-business stack with
the reasons, which is the grouped-library mechanism at a scale one person can actually copy.
The authority is that it is live. Nobody has to be told where you used to work.
