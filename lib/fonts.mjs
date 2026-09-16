import { readFileSync } from 'node:fs';
const b64 = p => readFileSync(new URL(`../node_modules/${p}`, import.meta.url)).toString('base64');
const face = (fam, wght, style, file) =>
  `@font-face{font-family:'${fam}';font-style:${style};font-weight:${wght};font-display:block;` +
  `src:url(data:font/woff2;base64,${b64(file)}) format('woff2');}`;

export const FONT_CSS = [
  face('Newsreader', 400, 'normal', '@fontsource/newsreader/files/newsreader-latin-400-normal.woff2'),
  face('Newsreader', 500, 'normal', '@fontsource/newsreader/files/newsreader-latin-500-normal.woff2'),
  face('Newsreader', 600, 'normal', '@fontsource/newsreader/files/newsreader-latin-600-normal.woff2'),
  face('Instrument Sans', 400, 'normal', '@fontsource/instrument-sans/files/instrument-sans-latin-400-normal.woff2'),
  face('Instrument Sans', 500, 'normal', '@fontsource/instrument-sans/files/instrument-sans-latin-500-normal.woff2'),
  face('Instrument Sans', 600, 'normal', '@fontsource/instrument-sans/files/instrument-sans-latin-600-normal.woff2'),
  face('Instrument Sans', 700, 'normal', '@fontsource/instrument-sans/files/instrument-sans-latin-700-normal.woff2'),
].join('\n');
