# What runs without you, and what does not

You asked whether I can run things myself, and to do so going forward where possible.
Here is the honest boundary, so neither of us wastes time testing it again.

---

## Runs autonomously, no involvement from you

- Polling every feed, reading articles, verifying figures against primary sources
- Drafting posts and carousel copy, applying the voice rules and the sourcing gate
- Rendering every card and carousel, assembling carousel PDFs
- Reading images back to check nothing is clipped
- Pushing assets to GitHub, which is the one external host reachable from the sandbox
- Reading and writing Buffer: the queue, scheduling, deleting, reconciling, analytics
- Reading and writing files in your `~/projects` folder and running shell commands there
- Reading and writing the project docs
- The whole weekly analytics pass and the freshness checks

That is the daily job end to end. Once the scheduled task exists it needs nothing from you.

## Cannot run, and this will not change by retrying

**Downloading files from the open internet.** Three routes tested, all closed:

1. The cloud sandbox blocks every host except GitHub at the network gateway.
2. `device_bash` runs in a Linux VM alongside your files, not on macOS, and sits behind
   the same allowlist. The Python script fails there with `Tunnel connection failed: 403`.
3. Your real Chrome is reachable, but the extension only answers `list_tabs` and
   `open_url`. Every call that reads or executes inside a page returns "Chrome is not
   running", so its content-script side is not active. Even if it were, pulling twenty
   images through a browser bridge into the conversation would be slow and wasteful.

**The standing rule:** anything that needs a file to cross from the open internet onto
disk has to start in your own Terminal. Everything after that is mine. When it comes up I
will write the script, put it in `~/projects`, and tell you the one command to run,
rather than asking you to do the work by hand.

**Also outside my reach:** creating LinkedIn pages or Buffer accounts, anything needing a
password or a card, and approving my own permission requests.

---

## So the photo library stops being a blocker

The library only gates one format. News cards want a face. Carousels, stat cards, list
cards and quote cards are pure typography and are already working.

So the page launches now, in two phases.

### Phase one, starting immediately

| | Mon | Tue | Wed | Thu | Fri |
|---|---|---|---|---|---|
| **Morning** | Stat card | Stat card | Quote card | Stat card | Quote card |
| **Midday** | Tips card | **Carousel** | List card | **Carousel** | Tips card |
| **Late** | List card | Quote card | Tips card | Stat card | List card |

Two posts a day rather than three, because without photographs the third slot would be
padding. Fifteen posts a fortnight, all typographic, all on brand, none of them a
gradient. The bank has sixteen posts and three carousels ready, which covers roughly the
first ten days on its own.

This is not a compromise version. The stat card is the most screenshot-ready thing we
make, and the carousels are the highest-reach format on a company page.

### Phase two, once the library lands

The morning slot becomes the news card, the wide band opens up, and the cadence goes to
three a day. That is the version with the Business Insider shape, and it needs the
photographs to work.

**One command, whenever you get to it:**

```
cd ~/projects/aifc-photo-seed
python3 fetch_library.py
```

Twenty portraits with licence and attribution written automatically, then about twenty
scenes from Unsplash by hand. Drag the folder into a chat and I take it from there.
