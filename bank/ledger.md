# This is not the ledger

The ledger is **`bank/ledger.csv`** in this folder.

It is not written by hand. Build an `entries.json` array, one object per post scheduled,
with keys date, time, headline, source_publisher, source_date, archetype, hook_type,
photo_file, destination, post_id, then run:

```bash
node record.mjs entries.json
```

That appends properly quoted rows to `bank/ledger.csv` and stamps `lastUsed` in
`photos/index.json`, which is what stops `lib/photos.mjs` returning the same photograph
for the same tags every day. Push both changed files along with the cards.

Check what is at risk of repeating before drafting:

```bash
node lib/freshness.mjs bank/ledger.csv
```

If the prompt you were handed tells you to append to `bank/ledger.md`, it is out of date.
See `docs/13-freshness-and-originality.md` section 2, and `README.md` section 6.
