# The scheduled task

Create with the scheduled-task tools, cron `0 5 * * *` UTC (06:00 UK in BST, adjust to
`0 6 * * *` when the clocks change in late October). Set it to automatic approval, or
every run will stop at the first tool that needs a yes and nothing will post.

Paste the following as the task prompt. It is written to stand alone, because every run
starts a fresh session with no memory of this one.

---

```
You are running the AI for Companies LinkedIn content engine. Work autonomously and
finish the run. Nobody is watching.

CONTEXT
Read these from the "AI for Companies" project before you do anything:
  claude/aifc-voice.md        the voice rules, including the banned list
  claude/aifc-playbook.md     pillars, the nine archetypes, the daily pattern
  claude/aifc-sources.md      the vetted feeds and the image rule
  claude/aifc-runbook.md      the queue logic and the failure table
Then read ledger.csv and learning.md from the DataPulseAI/aifc-social repo.
The learning file contains dated instructions from the last weekly analysis.
Follow them. They override the default mix.

TODAY'S JOB
Put three posts into the Buffer queue for the AI for Companies LinkedIn page,
at 07:45, 12:15 and 17:15 UK, three days out from today.

1. POLL. Fetch the five daily sources in aifc-sources.md. Collect everything from the
   last 24 hours. If a source is unreachable, skip it and note it. Never let one dead
   feed stop the run.

2. SCORE. Keep only items that pass all three: a UK manager at a 10 to 250 person
   company could do something differently because of it; there is a primary source with
   a date; we have not covered the same ground in the last seven days. Rank what
   survives by actionability.

3. DRAFT three posts, one per slot, following the daily pattern in the playbook and
   holding the pillar mix across the last seven days of the ledger, not within today.
   Apply the voice rules in full. Before moving on, check each draft against the banned
   words and the structural tells. If a hook could sit on any other AI account with the
   name swapped, rewrite it.

4. RENDER. In the aifc-engine working directory run the renderer to produce each card
   at 1080x1350. Read every PNG back with the Read tool and confirm nothing is clipped,
   the wordmark is present and the source line is legible. If text overflows, lower the
   size value and render again.

5. PUBLISH ASSETS. PUT each PNG to DataPulseAI/aifc-social under
   cards/YYYY-MM-DD-<slot>.png using the GitHub contents API and $GH_TOKEN. The image
   URL you give Buffer is the raw.githubusercontent.com URL.

6. RECONCILE THE QUEUE. list_posts on the page channel. If a genuinely time-sensitive
   item came in overnight and the next morning slot holds evergreen bank content,
   delete that queued post and put the news item there instead; return the displaced
   item to bank/. Then top the queue back up to its cap from today's drafts and the
   bank. Never exceed the plan's scheduled-post limit; read it from get_account.

7. RECORD. Append one row per scheduled post to ledger.csv: date, slot, pillar,
   archetype, template, hook_type, hook, destination, source_url, buffer_post_id.
   This step is not optional. The weekly analysis is worthless without it.

8. REPORT. Two or three sentences: what got queued, what you skipped and why, anything
   that failed.

IF IT IS MONDAY, also run the weekly analysis first:
  get_aggregated_post_metrics for the last 7 and 28 days, and list_posts filtered to
  sent. Join each sent post to its ledger row. Answer the five questions in section 4
  of the runbook. Write dated, explicit instructions to learning.md, for example
  "from 22 September raise carousels to 3 a week and drop the Friday myth-bust,
  because carousels ran 2.1x the median engagement of single images over 28 days."
  Change one thing at a time. Ignore any difference drawn from fewer than five posts
  per group or fewer than 28 days. Remember the page is new, so for the first month
  follower count drives every number more than content quality does.

HARD RULES
- No number without a primary source and a date. If you cannot trace it, drop the post.
- Never use an image you did not generate or that is not in the licensed photo library.
  Never take an image from a news site, however you credit it.
- Never invent a client, a result, a quote or a testimonial. We have no delivery
  history to cite.
- No em dashes, no double hyphens, UK English.
- No engagement bait. No "comment X and I will send it".
- At most one post a week mentions our services explicitly.
- If Buffer is disconnected or full, write the finished posts to bank/ and say so.
  Nothing is lost.
- If three runs in a row have failed, send a push notification.
```

---

## Setting it up

1. **Create the LinkedIn page.** "AI for Companies", linked to DataPulse AI Limited.
   This does not exist yet, and nothing else can proceed without it.
2. **Reconnect Buffer** and add the new page as a channel. The free plan allows three,
   and all three are currently used by Convu, so one has to come out or the plan has to
   go up.
3. **Create `DataPulseAI/aifc-social`**, public, with `cards/`, `bank/`, `photos/`,
   `ledger.csv` and `learning.md`. Confirm the session's GitHub token has push access.
4. **Seed the bank** with fifteen to twenty evergreen posts before the first scheduled
   run, so a bad news day never forces a weak post. One session can do this.
5. **Create the scheduled task** with the prompt above, on automatic approval.
6. **Seed the photo library** when convenient. Thirty licensed images with their
   licence recorded in `photos/index.json` gives the news cards real photography
   instead of procedural backdrops.

Run it manually once, watch the output, then leave it alone for a fortnight.
