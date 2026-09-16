import sharp from 'sharp';
const files = process.argv.slice(3);
const out = process.argv[2];
const W = 520, H = 650;
const tiles = await Promise.all(files.map(f => sharp(f).resize(W, H).png().toBuffer()));
await sharp({ create: { width: W * tiles.length + 20 * (tiles.length + 1), height: H + 40,
  channels: 3, background: '#ffffff' } })
  .composite(tiles.map((b, i) => ({ input: b, left: 20 + i * (W + 20), top: 20 })))
  .png().toFile(out);
console.log('montage ->', out);
