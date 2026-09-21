import { readFileSync, existsSync } from 'node:fs';
import { backdrop } from './backdrop.mjs';
import { match, credit, load } from './photos.mjs';
import { renderCard } from './render.mjs';

const uri = (p, mime = 'image/jpeg') =>
  `data:${mime};base64,` + readFileSync(p).toString('base64');

/**
 * Build a news card for a story, using a licensed photo when one matches
 * and a procedural backdrop only as a last resort.
 *
 * story = { headline, subjects, tags, size, tone }
 * opts.exclude lists photo files already spoken for, so a batch rendered in one
 * pass does not return the same frame three times: lastUsed is only stamped at
 * record time, which is after the whole batch has been built.
 * Returns { path, photo, creditLine, usedFallback }
 */
export async function newsCard(story, outPath, { tmpDir = 'out', exclude = [] } = {}) {
  const lib = load();
  const photo = match(story, { exclude });
  let image, usedFallback = false;

  if (photo && existsSync(`photos/${photo.file}`)) {
    const p = `photos/${photo.file}`;
    const mime = p.endsWith('.png') ? 'image/png' : 'image/jpeg';
    image = uri(p, mime);
  } else {
    const bd = `${tmpDir}/bd-${Date.now()}.jpg`;
    await backdrop(story.headline, bd, 1080, 1350, story.tone);
    image = uri(bd);
    usedFallback = true;
  }

  await renderCard({
    template: 'story',
    image,
    headline: story.headline,
    size: story.size,
    eyebrow: story.eyebrow,          // publisher and date, e.g. 'Axios, 19 September 2026'
    kicker: story.kicker || 'The story',
    focus: photo?.focus || '50% 30%',
  }, outPath);

  return {
    path: outPath,
    photo: photo?.file || null,
    creditLine: credit(photo, lib.licences),
    usedFallback,
  };
}
