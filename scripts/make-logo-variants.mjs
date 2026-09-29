// Derives transparent logo variants from public/assets/logo-mark.png.
//
// The source mark is navy ink on an opaque white canvas, with a white face.
// Each pixel is treated as navy ink at some coverage over white, so coverage
// becomes alpha and the white (canvas and face) becomes transparent. Two
// colorways come out: navy for the light nav, and the page tone for the navy
// pill. Both are trimmed to the ink's extent.
//
// Run with `npm run logos` if logo-mark.png changes. Uses the sharp build
// that ships with Next.

import sharp from "sharp";

const SRC = "public/assets/logo-mark.png";
const VARIANTS = {
  "public/assets/logo-mark-navy.png": [0x2b, 0x37, 0x48],
  "public/assets/logo-mark-light.png": [0xfa, 0xf8, 0xf4],
};

const { data, info } = await sharp(SRC).removeAlpha().raw().toBuffer({ resolveWithObject: true });

// The most common dark color is the solid fill, so it stands in for full
// coverage. (The single darkest pixel is an outlier and would leave the fill
// translucent.)
const counts = new Map();
for (let i = 0; i < data.length; i += 3) {
  if (data[i] + data[i + 1] + data[i + 2] > 300) continue;
  const key = `${data[i]},${data[i + 1]},${data[i + 2]}`;
  counts.set(key, (counts.get(key) ?? 0) + 1);
}
const ink = [...counts.entries()].sort((a, b) => b[1] - a[1])[0][0].split(",").map(Number);

const alpha = new Uint8ClampedArray(info.width * info.height);
for (let i = 0, p = 0; i < data.length; i += 3, p++) {
  let coverage = 0;
  for (let c = 0; c < 3; c++) coverage += (255 - data[i + c]) / (255 - ink[c]);
  alpha[p] = Math.round(Math.min(1, Math.max(0, coverage / 3)) * 255);
}

for (const [out, [r, g, b]] of Object.entries(VARIANTS)) {
  const rgba = Buffer.alloc(info.width * info.height * 4);
  for (let p = 0; p < alpha.length; p++) {
    rgba[p * 4] = r;
    rgba[p * 4 + 1] = g;
    rgba[p * 4 + 2] = b;
    rgba[p * 4 + 3] = alpha[p];
  }
  const result = await sharp(rgba, { raw: { width: info.width, height: info.height, channels: 4 } })
    .trim({ threshold: 1 })
    .png({ compressionLevel: 9 })
    .toFile(out);
  console.log(`${out} (${result.width}x${result.height}), ink rgb(${ink.join(",")})`);
}
