import { readFileSync, existsSync } from 'node:fs';

const LIB = new URL('../photos/index.json', import.meta.url);

export function load() {
  if (!existsSync(LIB)) return { photos: [], licences: {} };
  return JSON.parse(readFileSync(LIB, 'utf8'));
}

/** Normalise words for matching. */
const norm = s => String(s).toLowerCase().replace(/[^a-z0-9 ]/g, ' ').split(/\s+/).filter(Boolean);

/**
 * Pick the best photo for a story.
 *   story = { headline, subjects: ['sam altman'], tags: ['office','meeting'] }
 * Returns { file, credit, licence, score } or null.
 * A named subject match always beats a tag match, because a face beats a scene.
 */
export function match(story, { exclude = [] } = {}) {
  const { photos } = load();
  const words = new Set([...norm(story.headline || ''), ...(story.tags || []).flatMap(norm)]);
  const subjects = (story.subjects || []).map(s => s.toLowerCase().trim());

  let best = null;
  for (const p of photos) {
    if (!p.licence || exclude.includes(p.file)) continue;
    let score = 0;

    if (p.subject) {
      // A portrait asserts the story is about that person. Only ever use one when
      // they are a named subject, or their surname appears in the headline.
      // Tag overlap alone is NOT enough: it produces cards that imply someone said
      // something they did not.
      const named = subjects.includes(p.subject.toLowerCase());
      const surname = norm(p.subject).slice(-1)[0];
      const inHeadline = surname && words.has(surname);
      if (!named && !inHeadline) continue;
      score += named ? 100 : 60;
    } else {
      // scenes match on tags
      for (const t of (p.tags || [])) if (words.has(t.toLowerCase())) score += 6;
    }

    // freshness penalty so the same photo is not used twice a week
    if (p.lastUsed) {
      const days = (Date.now() - Date.parse(p.lastUsed)) / 86400000;
      if (days < 14) score -= (14 - days) * 2;
    }
    if (score > 0 && (!best || score > best.score)) best = { ...p, score };
  }
  return best;
}

/** Build the credit line the post body should carry. */
export function credit(photo, licences) {
  if (!photo) return null;
  const rule = (licences || load().licences)[photo.licence];
  if (!rule || !rule.needsAttribution) return null;
  return `(Credit: ${photo.attribution})`;
}
