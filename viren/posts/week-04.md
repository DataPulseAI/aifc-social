# Week 4: the first week on SYSTEM.md, 29 September to 3 October 2026

Three posts, Tuesday to Thursday, 07:30 to 08:30, every one in the Buffer approval queue. Built
from material already in the bank so nothing here waits on new writing. Each post is complete
for a reader who never clicks; the site holds the fuller version. No link except the resource
post's last line.

---

## Tuesday 30 September, 07:45. The reference.
**Archetype** 6.1 · **Stage** 2 · **Asset** `cards/find-your-four.png` (`viren/list.mjs`,
`lists/find-your-four.json`, already rendered) · **Mechanism** the action line per item
**Change from the held draft** the closing link line is removed (a reference post carries no
link) and "free, no email" is gone (`viren/brand.json` law 10). The card's footer keeps
`aiforcompanies.co.uk/prompts`, which is where a screenshot should point.

> Your four are already in your calendar.
>
> Everybody has about four things they actually use these tools for. Almost nobody can say what their four are, so they keep shopping for tools instead of getting better at the ones they have.
>
> Here is the twenty minutes that fixes it. Do it once, on last week.
>
> **Start from your own week, not a list of use cases.** Open last week's calendar and your sent items and nothing else. List every task over twenty minutes that produced a document or a decision. You will probably get fifteen or twenty rows.
>
> **Cross off anything with no file behind it.** If the input only ever existed in your head, it is not ready to hand over. Keep the rows where you could name the file you would attach. This usually halves the list.
>
> **Circle what you did more than once.** Frequency beats difficulty. A ten-minute job you do daily is worth more than an afternoon you spend twice a year, and it is the one you will build the habit on.
>
> **Write each survivor as a prompt, once.** Name who is reading it. Say what to do where the file runs out. Say what to attach. Three lines, not three paragraphs. Keep them in one note, titled by the job rather than by the tool, so the note survives you changing tools.
>
> **Review it in a month and delete what you never opened.** A list that gets shorter and sharper beats a list that grows. Only add a fifth when it beats something already on it.
>
> What you have at the end is one note, four prompts, in your own words. It is the first thing about your job that has ever been written down properly, and the next person in your role can pick it up on day one.
>
> Not more tools. A shorter list you keep sharpening.

Hook 39 characters, statement. Body about 1,750 characters. No question, no hashtag, no link.

## Wednesday 1 October, 07:45. The show-how.
**Archetype** 6.2 · **Stage** 2 · **Asset** `cards/2026-09-30-two-quotes.png`
(`viren/render.mjs`, `prompt`, `posts/2026-09-30-two-quotes.json`, already rendered; currently
scheduled for Tuesday 30 September at 21:40 and to be moved here) · **Mechanism** one task the
reader already does, the prompt in full, what to attach, what good looks like, what goes wrong

> Two supplier quotes never line up. Make them.
>
> You have two proposals on your desk. Different page counts, different headings, one has a table and one does not. You are about to pick the one that is easier to read.
>
> Give the assistant your company already pays for both documents, exactly as they were sent to you, not your summary of them, and type this:
>
> Compare these two proposals in a table: first-year cost, exclusions, payment terms, annual uplift, minimum term, notice period, exit costs, liability cap. Quote the clause for each. Where one is silent, write not stated.
>
> **What to attach.** Both proposals as PDFs or Word files. If one arrived in an email body, paste it into a document first. It cannot compare what it cannot read.
>
> **What good looks like.** Eight rows, two columns, a quoted clause in every cell or the words "not stated". The "not stated" cells are the point. That is where the follow-up email writes itself.
>
> **What goes wrong first time.** It will summarise instead of quoting, because that is what it was built to do. Say "quote the clause" again and it will. And check the annual uplift row yourself; percentages hidden in a schedule are the thing most often missed on the first pass.
>
> The whole thing takes four minutes and it works the same in Copilot, ChatGPT, Gemini or Claude. Nothing to install and nothing new to pay for.

Hook 43 characters, statement. Body about 1,300 characters. The prompt is quoted in full in the
text so the post works with the image closed. No link.

## Thursday 2 October, 07:45. The resource.
**Archetype** 6.4 · **Stage** 3 · **Asset** `cards/licence-audit-plainlist.png` (to render from
the page `plainlist` template, or text only) · **Mechanism** the method given whole in the post,
the sheet behind a work email · **Dependency** `/resources/licence-audit` live on the site
(`resources/04-licence-audit/lead-magnet-entry.js` pasted into `data/lead-magnets.js`, PDF and
xlsx into `public/downloads/`, `npm run build:check`, Viren pushes). The PDF and sheet are built.

The body is the profile post already written in `bank/posts/2026-10-02-licence-audit-resource.md`
("I keep asking owners the same question and nobody can answer it."), unchanged, with UTM added
to the last line by `queue.mjs`: `?utm_source=linkedin&utm_medium=profile&utm_campaign=<post_id>`.
This is the week's one company mention (SYSTEM.md rule 8).

**If the page is not live by Wednesday evening,** the slot takes the person post instead and the
resource moves to Thursday 9 October. Person post: a line from `bank/moments.md` (the file is
empty on 23 September; the trivia night or Convo room would be the first line). If there is no
line, the voice card `posts/2026-10-02-written-down.json` runs as a position, text as on the card,
with two sentences under it on what "written down" means in practice for a ten-person firm.

---

## What happens to the fourteen posts already in Buffer

Scheduled 21 September at Buffer's generated times, all automatic. Under SYSTEM.md they need
three changes: the days (Tuesday to Thursday only), the times (07:30 to 08:30), and the mode
(`notification`, so they sit in the approval queue). Eight of the fourteen are prompt cards,
which is one archetype at six times its cadence, so half of them are held for later weeks rather
than dropped.

| Old slot | Post | Decision |
|---|---|---|
| Thu 24 Sep 13:30 | comparison sheet, asked vs answered | keep Thursday, move to 07:45, set to notification. This is the week's reference |
| Fri 25 Sep 13:55 | voice card, never opened | hold; the track does not post on Fridays. Candidate for a Thursday person slot |
| Mon 28 Sep 20:53 | prompt card | hold |
| Tue 29 Sep 21:40 | voice card | hold |
| Wed 30 Sep 14:54 | prompt card, two quotes | becomes Wednesday 1 October 07:45 (above) |
| Thu 1 Oct 13:30 | voice card | hold; the slot is the resource |
| Fri 2 Oct 13:55 | text, written down | fallback for Thursday 2 October (above), otherwise hold |
| Mon 5 to Thu 8 Oct | four prompt cards | one becomes Wednesday 8 October's show-how; three held |
| Fri 9 Oct 13:55 | list card | becomes Tuesday 7 October's reference (07:45) |

Held posts stay in the bank with `status=held` and feed the Wednesday slot one a week from
13 October. Nothing is deleted.

The two `blocked` rows (the trivia-night photo post and the seven-habits photo carousel) stay
blocked until the photographs exist. Nothing ships on a placeholder.
