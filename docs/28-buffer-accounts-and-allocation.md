# Buffer: two accounts, and the weekly allocation

Written 22 September 2026, after the page was moved between Buffer accounts and its whole
queue was lost with it.

## 1. Two accounts, two MCP servers

The page and the profile are not in the same Buffer account. Read `bank/channels.json`
before scheduling anything, and check `buffer_account` on the channel you are about to
write to.

| Channel | Buffer account | MCP server | Channel id |
|---|---|---|---|
| AI for Companies (LinkedIn page) | viren@mydatapulse.co.uk | `Buffer-2` | `6ab23cf2ea19ca0bdeb2dce5` |
| Convu (LinkedIn page) | viren@mydatapulse.co.uk | `Buffer-2` | `6a57acfa80cc80cdcabc4689` |
| Viren Samani (LinkedIn profile) | viren@aiforcompanies.co.uk | `Buffer` | `6ab1a1fcea19ca0bdeab9165` |

Organisation ids: `68c9f323c0a1bc077ff50957` for Buffer-2, `6aa9bd84b82395c27e21a9f2` for Buffer.

**Moving a channel between Buffer accounts deletes every scheduled post on it.** That is how
twenty-five page posts disappeared on 22 September. Nothing warns you and nothing exports
first. If a channel is going to move, schedule nothing that week and reschedule from the bank
afterwards, which is possible only because `bank/posts/` holds the body and `cards/` holds the
image. This is the reason the bank exists.

## 2. The allocation is ten, per channel

Buffer-2 is on the free plan. The cap is **ten scheduled posts per channel**, not per
organisation: verified 22 September with thirteen scheduled across the organisation and eight
of them on the page. Convu's queue does not eat the page's allowance.

Ten and two a day is exactly one working week, so the allocation is the week:

- The Sunday batch writes and schedules **ten posts, Monday to Friday, two a day**. It never
  schedules an eleventh, and it never reaches into the following week.
- The batch checks the live count first and fills only the gap. After a week where a post was
  deleted or a day was skipped, the gap is not ten.
- The daily drain does not top up any more. On the free plan there is nothing to top up into
  until posts have published, and a drain that schedules ahead of the batch breaks the mix in
  `docs/22`. It watches, and it reports a page that has published nothing.

## 3. No first comment

`createPost` on the free plan returns `LinkedIn first comment requires a paid plan`. The
`first_comment` column in `bank/queue.csv` is still written and still worth writing, because
it is the caveat or the question the post needs, but nothing carries it to Buffer.

Two consequences, and the first matters more.

Nothing that the post actually needs may live in the first comment. Anything load-bearing goes
in the body. The first comment was always the place for the caveat that would have made the
body long, and on this plan that caveat either goes in the body or it is not said.

The text is kept so it can be pasted under the post by hand, and so it returns on its own if
the plan changes. A link never goes in it either way: `docs/02` covers why.
