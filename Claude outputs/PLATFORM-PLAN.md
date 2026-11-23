# Client platform: the plan from here

Draft for Viren's review, 15 November 2026. Nothing in this file has been started.

Once agreed it lives at `aifc-products/client-platform/docs/claude/PLATFORM-PLAN.md`, with the film track copied to `aifc-products/video-generation/PLAN.md`. It sits beside `SPEC.md` (the contract) and `PLAN.md` (the commercial order of work) and replaces neither. Where this file and the spec differ, section 2 lists the difference and the spec is updated first.

## 1. Read this first: three things to settle before any build

**1. This build is ahead of the plan's own gate.** `PLAN.md` says "sell first, build second" and holds the platform until 8 paid orders have been taken by hand. Building the whole platform now would break that rule for no gain. What is justified now is the staff side only: one place where every order, its full brief, its payment and its status sit together. That solves a problem that exists today (the brief is split across HubSpot, two emails and Stripe). Client sign-in, the portal and the CMS stay behind their gates. This plan is ordered that way.

**2. The estimate given earlier was too low.** "About a day" assumed the template's single-owner allow-list. Doing it on the real access model (companies, members, roles, staff), which is the one thing that cannot be changed cheaply once client data exists, is two rounds: Foundation, then the Orders desk. Phases A and B below.

**3. The spec no longer matches what is sold.** Section 2. Building from it as written would build the wrong order model.

## 2. Where the spec is out of date (fix before round 1)

| Topic | Spec says | Decided on 15 November 2026 |
| --- | --- | --- |
| Offer | Three bundles: £500, £1,000, £1,500 | From £500 for 30 seconds; length and extras chosen on the order page |
| Deposit | 50%, refundable until script approval | 25%, refundable until storyboard approval |
| What the client approves first | A script | A storyboard (features, order, timings) |
| Where the order is placed | In the portal, after sign-in | On the public site, with no account |
| Where the deposit is paid | Stripe from the portal | Stripe Checkout from the site (built, sandbox tested) |
| Timings told to clients | One to two weeks | Two to three weeks; storyboard in three to five working days |
| Second format | Interactive Demo | Interactive Journeys |
| VAT | Open | None for now |
| Balance | Due on draft approval | Open: 25 / 50 / 25 proposed, not confirmed |

The structural change is the fourth row. An order now exists before any account does, so an order must belong to a company and a contact email first, and be claimed by a signed-in person later. The spec's "held sign-up" rule still applies at the moment of claiming.

## 3. What is being built, in one picture

```
Public site (Next.js)            Client platform (Vite, Supabase)            Film kit (agent sessions)
  order page  ── signed intake ──▶  orders, briefs, events      ── export brief ──▶  orders/<ref>/
  Stripe Checkout                   payments  ◀── Stripe webhook                      storyboard, film
  second brief form ─ intake ────▶  files, messages, notes       ◀── staff upload ──  drafts, finals
                                    Admin (staff)   Portal (clients, later)
                                         │
                                         └── events only ──▶ Shyam (CRM, unchanged)
```

- **Own database.** One Supabase project per environment, `client-platform-dev` and `client-platform-prod`, London. Never shared with Shyam. Shyam keeps receiving the same events it does today.
- **Core plus modules.** Shared tables serve every service; each service is a module that adds its own detail tables, screens, allowed moves and tests. Adding a module is one migration and one folder.
- **One order reference** on everything, in the form `CF-4K7Q2`: site, Stripe, receipt, emails, console, and the film kit's folder for that order.

## 4. The core (shared by every module)

| Area | Tables | Notes |
| --- | --- | --- |
| Tenancy | `companies`, `members`, `company_products`, `member_roles` | As the spec. Owner is company level. |
| Staff | `staff` | Roles `admin`, `manager`; `can_release`; second factor. Named authorship on every staff action; clients only ever see "AIforCompanies team". |
| Work | `orders`, `order_transitions`, `order_events` | One function is the only way to move an order. Status, stage and money stay separate. |
| Contact before account | `order_contacts` (new) | Name, email, company and website as given on the site. Becomes a member when the order is claimed. |
| Briefs | `order_briefs` (new) | Every submission for an order, in full, append-only: the order form, the second form, anything staff paste in. Solves the collation problem. |
| Conversation | `messages`, `internal_notes`, `comments` | `internal_notes` has no client policy at all. |
| Files | `files` plus a private bucket | Folder per order; signed links only; uploads checked by content. |
| Money | `payments`, `stripe_events` | Written only by the Stripe webhook. Each event processed once. |
| Sending | `outbox`, `notifications` | Each row is claimed before it is sent, so a retry can never send twice. |
| Record | `activity_log`, `costs` | Append-only, by trigger. |

### Patterns taken from earlier builds (structure only)

From the request module in an earlier client build, the following are reused as patterns. No rows, names, email addresses, wording or seed data come across; the files are rewritten for this schema, and a check in the round's review confirms nothing from that client appears in the diff.

- Nobody writes a table directly: every change goes through a checked function that also writes the history with the server's time.
- One permission function per module, so opening access later is a one-line change.
- History, comments and files are append-only.
- An outbox with a trigger for instant sending and a daily retry.
- A private bucket with a folder per record and short-lived signed links.
- One SQL behaviour test per module, in a block that always rolls back.

From the shared template (already in the repo, not rebuilt): the demo and live mode switch, the single data interface, the sign-in gate, Edge Function guards (origin check, body cap, rate limit, signed state), shared validation, and the kit.

From the site (already built today): server-side pricing, the origin guard and rate limit, the Stripe wrapper and its tests.

## 5. Phases

Each phase ends at a gate. The next does not start until the gate is met and Viren says go.

| Phase | Name | Who uses it | Gate to pass |
| --- | --- | --- | --- |
| A | Foundation | Nobody yet | SQL tests prove the access model, below |
| B | Orders desk | Staff | A sandbox order from the site appears whole in the console, paid state included |
| C | Production desk | Staff | One real order run from brief to delivery with every step recorded |
| D | Client portal | Clients | A pilot client approves a storyboard and a draft with no help |
| E | Payments in the platform | Clients, staff | A balance paid and a refund issued without the Stripe dashboard |
| F | Requests module (CMS day 1) | Clients, staff | A client raises a website change and sees it through to done |
| G | CMS proper | Clients | A client edits and publishes text on a live site with no redeploy |
| H | More modules, automated builds | | Separate specs |

### Phase A: Foundation (round 1)

- Rewrite the template's first migration, which has never been applied anywhere: enums, every core table in section 4, row-level security on all of them, deny by default.
- A build check that fails when a table has no policy.
- Staff sign-in with a second factor, separate from client sign-in. Client sign-in screens are not built in this phase; the rules that will govern clients are, and are tested.
- Activity log by trigger. Security headers. Secrets in Parameter Store.
- Demo mode seeded with fictional companies only.

Passes when SQL tests prove: no cross-company read; a viewer cannot approve or pay; a paused service hides but the owner still reaches Team; only staff allowed to release can pass a gate; no client query returns a staff identity; an unclaimed order is readable by staff only; nothing is callable without signing in except the intake.

### Phase B: Orders desk (round 2)

- **Intake.** One Edge Function the site posts to, signed with a shared secret, rate-limited, idempotent on the order reference. It records the order, the contact and the brief. The site keeps sending to HubSpot and Shyam as now.
- **Order reference** generated on the site at the moment of ordering and carried into HubSpot, Stripe, the receipt, the thank-you page, both emails and the second form.
- **Stripe webhook** in the platform: marks the deposit paid even if the buyer closes the tab. This also removes the reliance on the thank-you page for the alert email.
- **Screens:** an orders list (newest first, status, paid or not, waiting on whom) and an order page (the full brief collated, timeline, status moves, internal notes, files given as links).
- **Site changes:** send to the intake; fix the 480 character cut in the paid-order email by reading the brief from the platform.

Passes when an order placed on the local site against the Stripe sandbox appears in the console within a minute with its full brief, shows as paid after payment, and a second-form submission lands on the same order.

### Phase C: Production desk (round 3)

- Storyboard versions with changes marked; the three team gates (storyboard check, draft check, release check) as moves only staff with `can_release` may make.
- Staff upload drafts and finals to the order; files private, signed links.
- Messages recorded on the client's behalf when they email; optional team note at each gate.
- Board by stage with age and a flag past target; inbox of what is waiting on the team.
- Cost and minutes per order, entered by staff.
- **Export brief:** one button that writes the collated brief as a file for the film kit's order folder.

### Phase D: Client portal (rounds 4 and 5)

- Sign-in by emailed link with a six digit code. Claiming an order by the email it was placed with; the held sign-up rule when the domain already has a company.
- Your projects; the order page as the client sees it (labels from a separate mapping, no production internals).
- Storyboard review and approval; draft player with timed comments; messages; downloads once released.
- Team page for owners: invite, roles. Account page.
- View as client, read-only, for staff.
- Notification emails that carry no order content.

### Phase E: Payments in the platform (round 6)

- Staged payments once the stages are confirmed; balance by Stripe Checkout from the order page; refunds from Admin; receipts.
- Checkout creation moves from the site to the platform, and the price list moves with it, so there is one price source.

### Phase F and G: CMS

Section 6.

### Phase H

Decks and projections, project review, invoices, and builds started by the platform in a sandboxed worker. Each gets its own spec when it is next.

## 6. CMS: requirements and plan

"CMS" is the client-facing website editor, a service in the platform. "Admin" is the staff area. The two are never called the same thing.

### What Viren has asked for

- One console, hosted by AIforCompanies, where clients sign in to edit content on their custom-built sites.
- The design stays locked. Clients edit content only: text, images, lists such as team members.
- Changes go live with no redeploy. Deployment stays with us.
- Day 1 is deliberately manual: clients send change requests and we make the edits in code. The editor comes on day 2. A live preview pane is deferred.

### The decision this plan recommends

Earlier thinking leaned to a separate Supabase project per client for the CMS. The recommendation here is different, and it needs Viren's yes:

- **Website content lives in the platform database**, scoped by company and site like everything else. One login is the whole point of the platform; a database per client for content means a sign-in system per client.
- **A client's private business data** (a CRM, a dashboard, a portal with their customers' records) stays in that client's own project, as `SECRETS.md` requires. The platform links to it; it never holds it.

### Phase F: Requests module (CMS day 1)

This is the manual day 1, given a proper home. It is also "project review" for any client build, so it is built once and used for both.

- A client raises a request against one of their sites or projects: what to change, where, with screenshots.
- Status, priority, conversation, history, and a short checklist the client ticks when the change is live.
- Staff make the change in code as today. The request records it.
- Built on the request pattern from section 4, scoped by company and resource.

### Phase G: CMS proper (day 2)

| Requirement | Detail |
| --- | --- |
| Sites | A company may have several; access and roles are per site (`company_products.resource`) |
| Content model | Defined by us per site, in versioned config: content types, fields, limits, required or not. Clients cannot change the model |
| Field types | Plain text, limited rich text (bold, link, list; stored as structured data, never as HTML), image with required alt text, link, date, number, on or off, and repeating lists (team, FAQs, events) |
| Editing | Forms generated from the model, validated in the browser and again on the server |
| Draft and publish | Save a draft, see what changed, publish. Every publish is a version; any version can be restored |
| Approval | Optional per site: publish waits for a member with the right role, or for our team. On by default at first |
| Media | Checked by content, renamed, resized; private until published; published media served from a public, cached path |
| No redeploy | The site reads published content from a read-only content address and refreshes on a signed publish signal |
| Never breaks the site | Each site ships with the last known good content baked in, used whenever the platform cannot be reached |
| Content address | Read-only, published content only, per-site key, cached, rate-limited. No personal data ever |
| Site kit | A small typed helper for our Next.js sites: `getContent(site, type)` and the refresh endpoint |
| Record | Who changed what and when, per field; visible to the client's owner and to staff |
| Later | Scheduled publish, live preview pane, more than one language, per-page search fields |

Order of building: content model and tables with access tests; the content address and site kit against one of our own sites; editing forms; draft, publish and restore; media; approval. The first client site is chosen only after it works on a site of ours.

Open for the CMS: which site goes first; whether any site needs more than one language at launch.

## 7. Film track (also saved in `video-generation/`)

Runs alongside phases A to C, outside the platform. The films are the least proven part of the service, so they are proven by hand before anything is automated.

| Step | What | State |
| --- | --- | --- |
| V0 | Make `video-generation` a repo (`DataPulseAI/aifc-video-generation`) | Not done |
| V1 | Teaser: 35 seconds, voiceover, loop, personal links | Done; lives on the site |
| V2 | Pilot films made in agent sessions; time, tokens and cost recorded per film | Not started |
| V3 | Extract the film kit from the pilots: engine, scenes, transitions, audio, render scripts, learnings | After V2, not before |
| V4 | Order folders: `orders/<ref>/` holding the exported brief and that client's material only; no secrets; nothing from one order readable by another | With phase C |
| V5 | Outputs uploaded to the order by staff: storyboard, draft, finals | With phase C |
| V6 | Builds started by the platform in a sandboxed worker | Phase H, own spec |

Rules that carry over: client material never enters the kit; nothing reaches a client without a team gate; a real music track replaces the generated bed before the first paid film.

## 8. Security, in every phase

Carried from the spec and the products guide, and tested in the round they are built:

- Row-level security on every table; a table without a policy fails the build.
- Every access rule has a SQL test proving company A cannot read company B.
- No direct table writes from the browser; checked functions only.
- The service key exists only in Edge Functions. Staff use a second factor.
- The intake and the Stripe webhook are the only calls accepted without a signed-in user: both signed, both rate-limited, both idempotent.
- Prices come from the server, never the browser.
- Files private, signed links, checked by content, renamed on arrival.
- Demo data is fictional. No client's data is used to test another client's build.
- Secrets under `/aifc/client-platform/<env>/` in Parameter Store; nothing in chat, the repo or the browser.

## 9. How it is built

Follows `_shared/claude/PROCESS.md`, one round per phase:

| Stage | Who | Notes |
| --- | --- | --- |
| Plan and contract | Main session | Data shapes, interfaces, file ownership, migration timestamps per agent. Shown to Viren before building |
| Schema, access rules and SQL tests | One Opus builder | The part that is expensive to get wrong |
| Screens, Edge Functions, site changes | Two Sonnet builders, separate files | Each runs only its own tests |
| Integrate | One Sonnet agent | Unit tests, SQL tests, demo build |
| Review, once | Security (Opus), correctness and UI (Sonnet) | At most five findings each, high or medium only |
| Verify, fix, re-check | Haiku verifiers, one Sonnet fixer, one re-check | Then stop. No looping until clean |
| Close | Main session | Handoff, state and rounds files rewritten; commit commands given to Viren |

Using Opus for the schema builder and the security review is a departure from the process file, which keeps Opus for the main session. It is proposed here because Viren asked for it and those two are where a mistake costs most.

Estimates, to be firmed up in each round's contract:

| Round | Phase | Tokens |
| --- | --- | --- |
| 0 | Bring the spec, brief and rounds file into line with section 2 | Under 200k |
| 1 | A, Foundation | 1.5M to 2.5M |
| 2 | B, Orders desk | 1M to 2M |
| 3 | C, Production desk | 1.5M to 2.5M |

Nothing is committed or pushed by an agent. Nothing is deployed without Viren.

## 10. Needed from Viren before round 1

Decisions:

1. Build phases A and B now, ahead of the paid-orders gate in `PLAN.md`, and hold the rest behind their gates. Recommended: yes.
2. CMS content in the platform database, client business data in the client's own project. Recommended: yes.
3. Files in Supabase Storage for now, moving finals and large recordings to S3 when a file passes its limits. The spec says S3 from the start. Recommended: Storage first.
4. Payment stages: 25 / 50 / 25, or the balance in one payment.
5. Opus for the schema builder and the security review. Recommended: yes.

Actions only Viren can take:

- Create two Supabase projects named exactly `client-platform-dev` and `client-platform-prod`, in London, and connect the dev one to this workspace.
- Commit the uncommitted spec edits in the platform repo, and today's work in the site repo, so the builders start from a clean base.

Not yet checked, and to be checked in round 0: how the SQL tests run without a hosted project (the template has `supabase/tests/run.sh`), since the builders work on a copy in the cloud and need a database to run them against.
