// Cuts each case-study cover's screenshot out of its baked-in canvas.
//
// The covers are 1600x1000 exports: screenshots with a soft drop shadow on a
// flat #F7EFE1 canvas, at a different size and position in every file. That
// canvas is the retired sand-tint surface, and no single CSS crop could frame
// four differently placed screenshots consistently.
//
// Canvas and shadow pixels are the canvas color scaled by some darkening
// factor k, so the same ratio holds on every channel. Those become black at
// alpha (1 - k), which keeps the shadow as a real, transparent shadow. Any
// pixel that breaks the ratio is screenshot content and stays opaque. The
// result is trimmed to its visible extent, so <CaseThumbnail> can frame
// every cover identically.
//
// Run with `npm run thumbnails` after adding or replacing a cover. Uses the
// sharp build that ships with Next.

import sharp from "sharp";
import { readdir, mkdir } from "node:fs/promises";
import path from "node:path";

const SRC = "public/assets";
const OUT = "public/assets/thumbs";
const MAX_WIDTH = 1400;
// How far channel ratios may drift and still count as "canvas, darkened".
const RATIO_TOLERANCE = 0.025;

await mkdir(OUT, { recursive: true });

const covers = (await readdir(SRC)).filter((f) => /^cover-.+\.png$/.test(f));

for (const file of covers) {
  const { data, info } = await sharp(path.join(SRC, file))
    .removeAlpha()
    .raw()
    .toBuffer({ resolveWithObject: true });

  const [bgR, bgG, bgB] = [data[0], data[1], data[2]];
  const rgba = Buffer.alloc(info.width * info.height * 4);

  for (let i = 0, j = 0; i < data.length; i += 3, j += 4) {
    const r = data[i];
    const g = data[i + 1];
    const b = data[i + 2];
    const kr = r / bgR;
    const kg = g / bgG;
    const kb = b / bgB;
    const k = (kr + kg + kb) / 3;
    const spread = Math.max(kr, kg, kb) - Math.min(kr, kg, kb);

    if (spread < RATIO_TOLERANCE && k <= 1.01) {
      const alpha = Math.max(0, 1 - k);
      rgba[j + 3] = alpha < 0.02 ? 0 : Math.round(alpha * 255);
    } else {
      rgba[j] = r;
      rgba[j + 1] = g;
      rgba[j + 2] = b;
      rgba[j + 3] = 255;
    }
  }

  const out = path.join(OUT, file.replace(/^cover-/, ""));
  const result = await sharp(rgba, { raw: { width: info.width, height: info.height, channels: 4 } })
    .trim({ threshold: 1 })
    .resize({ width: MAX_WIDTH, withoutEnlargement: true })
    .png({ compressionLevel: 9 })
    .toFile(out);

  console.log(`${file} -> ${out} (${result.width}x${result.height})`);
}
