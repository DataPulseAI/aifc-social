# Seeding the photo library

Forty images, one afternoon, and the cards stop being gradients. Everything here is free
and legal. Nothing here requires a subscription, though `08-what-makes-it-interesting.md`
section 4 still argues an editorial stock subscription is the single best spend available.

---

## 1. How to get images into the pipeline

1. Download the images to your machine.
2. Name each file plainly: `sam-altman.jpg`, `open-plan-office.jpg`, `city-of-london.jpg`.
3. Fill in one CSV row per image. Columns: `file,subject,tags,licence,attribution,source_url`.
4. Drop the images and the CSV into a chat. They land in the uploads directory.
5. One session runs `node ingest.mjs manifest.csv`, which validates every licence,
   files the image, records provenance and rebuilds `photos/index.json`.

After that the daily task matches stories to photos automatically. A named person in the
story beats a scene tag by a wide margin in the matcher, because a face beats a scene.

**The ingest tool refuses anything with an unknown licence, or a licence that requires
attribution with no attribution string given.** That is deliberate. An unprovenanced
image in the library is a liability that surfaces months later.

Example CSV rows:

```csv
file,subject,tags,licence,attribution,source_url
sam-altman.jpg,Sam Altman,openai;ceo;ai,cc-by-4.0,"TechCrunch, CC BY 4.0, via Wikimedia Commons",https://commons.wikimedia.org/wiki/File:...
open-plan-office.jpg,,office;work;team;desk,unsplash,,https://unsplash.com/photos/...
city-of-london.jpg,,london;city;uk;finance,unsplash,,https://unsplash.com/photos/...
```

---

## 2. People, from Wikimedia Commons

Commons has freely licensed portraits of most public figures in this story space. Search
`commons.wikimedia.org` for the name, or go straight to `commons.wikimedia.org/wiki/Category:<Name>`
with underscores, which is the usual category convention.

**Check two things on every file before downloading.** The licence box on the file page,
which is usually CC BY or CC BY-SA and names the photographer, and that the photo is
actually of the right person. Copy the attribution string the file page gives you.

Priority order, because these are the names that recur:

**AI industry**
Sam Altman, Dario Amodei, Demis Hassabis, Sundar Pichai, Satya Nadella, Jensen Huang,
Mark Zuckerberg, Elon Musk, Yann LeCun, Mustafa Suleyman

**Policy and regulation, UK relevant**
The Secretary of State for Science, Innovation and Technology, the Information
Commissioner, the Chancellor, and the head of the AI Safety Institute. Check who holds
each post before searching, these change.

**Business and commentary**
Marc Benioff, Aravind Srinivas, Clem Delangue, Ethan Mollick, Andrew Ng

That is around twenty files and it covers the large majority of AI-industry stories.

---

## 3. Scenes, from Unsplash or Pexels

Free for commercial use, no attribution required, though record the source URL anyway so
provenance is provable. Prefer photographs with people in them and with room at the
bottom third for the headline. Avoid anything that looks like a stock photo of a
handshake.

**Work, ten images.** Open plan office. Small team round a table. One person at a laptop,
shot from behind. A whiteboard session. A warehouse. A shop floor or till. A construction
site. A clinic or reception desk. A commute, train or tube. An office at night, empty.

**Places, six images.** City of London skyline. Canary Wharf. A UK high street. A data
centre interior. A generic tech campus exterior. A factory floor.

**Texture, four images.** Server racks. Cables. A screen close up with text out of focus.
A phone in a hand.

Twenty scenes plus twenty faces is the forty. Add roughly ten a month after that,
prompted by the stories the matcher could not fill.

---

## 4. Tagging, which is what makes the matcher work

Tags are how a story finds a photo, so tag for the story, not for the picture.

- A photo of an open plan office is not tagged `desk;chairs;window`. It is tagged
  `office;work;team;hybrid;rto;headcount`, because those are the stories it will serve.
- A photo of a construction site is tagged `construction;trades;sme;site;adoption`.
- A portrait is tagged with the person's company and role as well as their name:
  `openai;ceo;ai;llm`.

Six to ten tags per image. Over-tagging is better than under-tagging, since the matcher
scores on overlap and a named subject always outranks tags anyway.

---

## 5. Where the credit line goes

The card carries no credit. The post body does, in the Business Insider style, as the
last line before any hashtags:

```
(Credit: TechCrunch, CC BY 4.0, via Wikimedia Commons)
```

`lib/photos.mjs` generates this automatically from the manifest, and returns nothing when
the licence does not require attribution. Unsplash and Pexels images therefore carry no
credit line, correctly.

---

## 6. What the library does not solve

Two gaps will remain and both are worth knowing about now.

**People who are not public figures.** The French CEO in your examples, or an Anthropic
staffer, will not be on Commons. Business Insider credits "(Credit: Pamela Meyer)" and
"(Credit: Adélaïde Chantilly)" on two of the cards you sent, which means they asked and
the subject supplied the photograph. The `subject-supplied` licence key exists in the
manifest for exactly this. It also points at an interview series, which would produce the
story and the image together and would be the only genuinely original content on the page.

**Breaking stories about people nobody has photographed.** A researcher resigns and there
is no free portrait of them. Fall back to a scene photo that carries the theme, or to the
procedural backdrop, or pick a different story. The backdrop exists for this and should
be rare, not routine.
