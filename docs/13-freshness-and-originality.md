# Freshness, originality, and not reading like a machine

Three failure modes that all look the same from outside: the page becomes boring.

---

## 1. Repetition, and the checks that catch it

A daily page repeats itself long before anyone notices, because each post looks fine in
isolation. The ledger is what makes this visible, and the daily task runs four checks
against it before drafting.

**Source rotation.** No source may supply more than two of the last ten posts. The ONS
release is our best statistic and it is exactly the one that will get overused. Four
posts in the bank already draw on it, which is fine spread across a month and obvious
within a week.

**Statistic rotation.** No specific figure repeats within 21 days. The 1.6 number, the
71% shadow AI figure and the 6% high performers are all strong, which is precisely why
they need spacing. Reusing a number is worse than reusing a topic, because the number is
the thing people remember.

**Structural rotation.** No more than two consecutive posts may share an opening move.
The bank has several posts that open with two contrasting figures, which works and
becomes a tic by the third time. The task tracks `hook_type` in the ledger for this.

**Subject rotation.** Not more than two posts in seven about the same company, and not
more than one a week about Microsoft specifically, which is the easiest well to keep
returning to because it publishes the most.

`node lib/freshness.mjs bank/bank.md` runs these against the ledger and prints what is
at risk. Run it as part of every daily run, not weekly.

## 2. The bank is not a queue

The bank exists so a thin news day never forces a weak post. It is not a rota.

Two rules keep it from going stale. **Nothing from the bank runs if a live story scores
higher**, which means on a good news week the bank is barely touched. And **anything in
the bank for more than eight weeks gets rewritten or dropped**, because a post written
against September's numbers reads oddly in November even when the numbers have not moved.

Top the bank up monthly, not when it empties. An empty bank on a quiet Monday is how
weak posts get published.

## 3. Originality, and where the line is

We summarise other people's reporting and link to them. That is standard practice and it
is how the format works. The line is specific and worth stating exactly.

**What we take:** the facts. Who did what, the numbers, the dates. Facts are not
copyrightable and reporting them with credit is normal journalism.

**What we never take:** the words, the structure, or the picture. Not a paraphrase that
follows the original sentence by sentence with synonyms swapped, which is the most common
form of accidental plagiarism and the easiest to spot. Not their headline. Not their
photograph, however credited.

**Quoting.** Direct quotes are fine and often better than paraphrase, in quotation marks,
with the speaker named and the publication that carried it. Keep them to a sentence or
two. If a post needs four paragraphs of someone else's words, it is their post, not ours.

**The rewrite test.** Close the source. Write the post from the facts in your notes. Then
reopen the source and check the facts. If the draft has ended up echoing the original's
sentence order, it was written from the page rather than from the facts, and it goes
back.

**Always link.** Every post built on someone else's reporting names them and links to
them. That is the trade that makes this sustainable rather than parasitic, and it costs
us nothing.

## 4. Not reading like a machine

The full list is in `01-voice.md`. Four things matter most, and all four appear in every
competitor post we studied, which is why they now read as generated.

**Vary paragraph length.** Eight consecutive single-sentence paragraphs is the single
most recognisable AI-post shape on LinkedIn. Some paragraphs are one sentence. Some are
four. That variation is the signal, and it is almost the whole tell.

**Stop using the triple.** "No context. No structure. No memory." Three fragments in a
row is a rhetorical tic. Once in a long post is fine. Twice is a pattern.

**Kill the symmetrical contrast.** "Amateurs do X. Professionals do Y." Useful once,
corrosive as a default.

**Never use the banned vocabulary.** delve, leverage, utilise, robust, seamless, unlock,
harness, elevate, supercharge, game changer, landscape, realm, tapestry, testament,
pivotal, crucial, vital. Any one of these tags the post on its own.

And the positive test, which catches more than the negative list: **if the first two
lines could sit on any other AI account with only the brand name swapped, rewrite them.**
The fix is nearly always to replace the general claim with the specific thing.

## 5. On detection specifically

LinkedIn has never confirmed that it detects and downranks AI-written text. That claim
circulates constantly with no primary source. What LinkedIn did announce, in March 2026,
is an authenticity update reducing distribution for engagement bait, automation, comment
pods and low-value link-pushing. Those are behaviours, they are detectable, and we avoid
all of them by design.

Standalone AI detectors are close to useless. OpenAI shut down its own classifier because
it did not work. Writing to beat a detector is optimising against a broken instrument.

What actually gets a post ignored is being generic, and that is a content problem with a
content fix. Two things make our posts hard to mistake for filler, and neither is a
trick. **Specificity that took work**: a named source, a date, the second statistic
rather than the headline one. And **a position**: generated content hedges because
hedging is safe, and saying plainly that most UK firms are not behind on adoption but are
behind on depth, then defending it in the comments, is not something a template produces.

Rendered cards are separately stripped of EXIF, XMP, IPTC and colour profiles by
`lib/clean.mjs`, so the published files carry no generator fingerprint. None of the
images are AI-generated in the first place.
