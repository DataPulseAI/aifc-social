import sharp from 'sharp';
import { unlinkSync, renameSync } from 'node:fs';

/* Re-encode a rendered card so it carries no generator metadata.
   Chromium and most encoders stamp a Software tag and may attach colour
   profiles or XMP blocks. LinkedIn strips much of this on upload anyway,
   but publishing a clean file costs nothing and leaves no fingerprint
   in the copy we host ourselves. */
export async function clean(path) {
  const tmp = path + '.tmp';
  // sharp strips metadata by default; calling withMetadata() would ADD it back.
  await sharp(path, { failOn: 'none' })
    .png({ compressionLevel: 9, palette: false, force: true })
    .toFile(tmp);
  unlinkSync(path);
  renameSync(tmp, path);
  return path;
}
