# 17. Photo quality rules

Written 16 September 2026, after the first end to end render put a hooded figure at a
laptop on an NCSC story about ordinary employees, and a 3D clipart handshake on an ONS
statistic. Both would have gone out on autopilot. This is the gate that stops that.

## What the library may not contain

Nothing below belongs in `photos/index.json`, whatever its licence.

1. **Security cliches.** Hooded figures, padlocks of any kind, glowing green code rain,
   anonymous hands in gloves. The stories are about employees and policy, not criminals.
   A person at a laptop in an ordinary office is the correct picture for a security story.
2. **3D clipart and CGI renders.** Faceless grey figures, tiny house models held in palms,
   robot arms rendered in a white void. These read as a 2009 PowerPoint.
3. **Literal object metaphors.** Clock faces for a story about time, stacks of coins for a
   story about money, jigsaw pieces for anything. The photo should show the place the story
   happens, not illustrate its noun.
4. **Distress imagery.** Head in hands, sticky notes over a face, a silhouette alone in a
   dark doorway. It reads as mental health content and it is the wrong register for a
   company page about training.
5. **Third party branding in frame.** Courier liveries, phone manufacturer product shots,
   named shopfronts that are not the subject of the story, and signage that pulls the eye
   away ("TOILETS £3" was in the library). A named UK independent shop is fine when the
   story is about UK independent shops.
6. **Sterile handshake stock.** One contextual handshake at a table is the maximum the
   library holds. Neon handshake icons and white background handshakes are out.
7. **Non-UK cues on a UK story.** US tax forms on a story about UK paperwork, US Embassy
   photos for a British workplace. The audience notices.

## Portraits

A portrait asserts the story is about that person. `lib/photos.mjs` only allows one when the
person is a named subject of the story or their surname is in the headline. Tag overlap is
never enough. Do not relax this.

## Review cadence

Every photo added to the library gets looked at, as a contact sheet, before it is indexed.
Batch ingestion without a visual pass is how the fourteen entries removed on 16 September
got in. `montage.mjs` builds the sheet.

## Record, 16 September 2026

308 entries in, 264 out. Removed: 8 Openverse scene photos (clipart handshake, blurry
stock, branded phone), 6 of 7 security and privacy frames (hooded figure, four padlocks,
generic cabling), 7 clock close ups, 6 distress frames, 4 window silhouettes, 2 US tax
forms, 2 CGI robot arms, 3 handshake stock, 2 branded frames, 2 phone product shots, and
the "#TEAMWORK" flipchart graphic.

## Record, 16 September 2026, second pass

264 entries in, 263 out. Removed `work/paperwork-u2.jpg`, which the matcher returned for
an admin and finance story on 21 September. The frame carries a Casio calculator, a
ThinkPad lid logo and a bank form with account number and IBAN fields, so it breaks rule 5
on third party branding and rule 3 on literal object metaphors. It was caught by the visual
check, which is the only thing that would have caught it.

## Record, 16 September 2026, third pass

263 entries in, 255 out, during the first weekly batch. Eight removed:

| File | Why |
|---|---|
| `work/meeting-room-u3.jpg` | Third-party name legible on the laptop screen. Rule 5 |
| `work/meeting-room-u4.jpg` | Large third-party wordmark on the glass partition, plus an Apple lid logo. Rule 5 |
| `work/laptop-desk-u3.jpg` | A Shopify storefront and its marketing copy legible on the screen. Rule 5 |
| `work/laptop-desk-u4.jpg` | A stock mockup template with the words "Mockup" and "MacBook Pro" printed on the screen. Rule 5, and it is not a real scene |
| `work/team-win-u2.jpg` | A Cadbury Celebrations box held centre frame, logo fully legible. Rule 5 |
| `work/sme-owner-u1.jpg` | Boots shopfront signage legible. A national chain that is not the subject of the story. Rule 5 |
| `work/paperwork-u3.jpg` | A suited hand signing a generic form on a leather desk pad. Rule 3, the same fault as `paperwork-u2` |
| `work/training-room-u3.jpg` | A child at a blackboard in a rural school, tagged `classroom, learning, training`. Rule 7, and wrong in any context for this page |

**What this pass taught, which is new.** Screens are the blind spot. Five of the eight
carry branding on a laptop or a partition rather than on a shopfront, and a screen is
exactly where the eye goes in a frame that is otherwise about work. When reviewing, look
at every screen in shot before looking at anything else.

**The second lesson is about tags.** `work/training-room-u3.jpg` was not a bad photograph
badly licensed. It was a photograph tagged for the wrong audience, and the tags were what
put it in front of a UK hiring story. A mis-tagged entry is as dangerous as an unusable
one, because it passes every check except the visual one.
