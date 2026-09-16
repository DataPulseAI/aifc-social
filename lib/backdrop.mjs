import sharp from 'sharp';
import { createHash } from 'node:crypto';

/* Deterministic abstract backdrop, brand-consistent, used when no licensed
   photo is available for a news card. Seeded from the headline so the same
   story always renders the same image. */
const TONES = {
  forest: { hue: 152, satBg: 46, l1: 9,  l2: 28, accent: '#8FD3B0', l3: 46 },
  ink:    { hue: 196, satBg: 22, l1: 7,  l2: 19, accent: '#7FB7A4', l3: 34 },
  moss:   { hue: 138, satBg: 30, l1: 14, l2: 34, accent: '#C8E6D5', l3: 52 },
  slate:  { hue: 168, satBg: 14, l1: 11, l2: 24, accent: '#9FCBBA', l3: 40 },
};
export const TONE_KEYS = Object.keys(TONES);

export async function backdrop(seedText, outPath, w = 1080, h = 1350, tone) {
  const hex = createHash('sha256').update(seedText).digest();
  const r = i => hex[i % hex.length] / 255;

  const key = tone || TONE_KEYS[hex[0] % TONE_KEYS.length];
  const T = TONES[key] || TONES.forest;
  const hue = T.hue + Math.round((r(3) - 0.5) * 18);
  const a = `hsl(${hue} ${T.satBg}% ${T.l1 + Math.round(r(5) * 4)}%)`;
  const b = `hsl(${hue - 12} ${T.satBg - 10}% ${T.l2 + Math.round(r(7) * 10)}%)`;
  const c = `hsl(${hue + 16} ${T.satBg - 14}% ${T.l3 + Math.round(r(11) * 8)}%)`;

  const blobs = Array.from({ length: 5 }, (_, i) => {
    const cx = Math.round(r(i * 7 + 2) * w);
    const cy = Math.round(r(i * 7 + 4) * h);
    const rad = Math.round((0.18 + r(i * 7 + 6) * 0.3) * w);
    const op = (0.16 + r(i * 7 + 8) * 0.24).toFixed(2);
    return `<circle cx="${cx}" cy="${cy}" r="${rad}" fill="url(#g${i % 2})" opacity="${op}"/>`;
  }).join('');

  const svg = `<svg xmlns="http://www.w3.org/2000/svg" width="${w}" height="${h}">
    <defs>
      <linearGradient id="bg" x1="0" y1="0" x2="1" y2="1">
        <stop offset="0" stop-color="${a}"/><stop offset="1" stop-color="${b}"/>
      </linearGradient>
      <radialGradient id="g0"><stop offset="0" stop-color="${c}"/><stop offset="1" stop-color="${c}" stop-opacity="0"/></radialGradient>
      <radialGradient id="g1"><stop offset="0" stop-color="${T.accent}"/><stop offset="1" stop-color="${T.accent}" stop-opacity="0"/></radialGradient>
      <filter id="blur"><feGaussianBlur stdDeviation="90"/></filter>
    </defs>
    <rect width="${w}" height="${h}" fill="url(#bg)"/>
    <g filter="url(#blur)">${blobs}</g>
  </svg>`;

  // fine grain so large flat areas do not band
  const grain = Buffer.from(
    `<svg xmlns="http://www.w3.org/2000/svg" width="${w}" height="${h}"><filter id="n">
      <feTurbulence type="fractalNoise" baseFrequency="0.9" numOctaves="2"/>
      <feColorMatrix type="saturate" values="0"/></filter>
     <rect width="${w}" height="${h}" filter="url(#n)" opacity="0.045"/></svg>`);

  await sharp(Buffer.from(svg))
    .composite([{ input: grain, blend: 'overlay' }])
    .jpeg({ quality: 92 }).toFile(outPath);
  return outPath;
}
