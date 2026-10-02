/**
 * Copies the original FNDRS app screenshots + brand files into /public.
 *
 * Screens are cropped (status bar removed), the floating blue dev-menu button
 * that appears in every capture is painted out, and they are re-encoded.
 * Nothing else in the UI is changed.
 * Usage: node scripts/prepare-assets.mjs <source-folder>
 */
import fs from 'node:fs';
import path from 'node:path';
import sharp from 'sharp';

const src = process.argv[2];
if (!src) throw new Error('Pass the folder that contains the original images.');

const root = path.resolve(import.meta.dirname, '..');
const screensDir = path.join(root, 'public', 'screens');
const brandDir = path.join(root, 'public', 'brand');
fs.mkdirSync(screensDir, { recursive: true });
fs.mkdirSync(brandDir, { recursive: true });

// source file -> semantic name. Status bar height differs per capture size.
const SCREENS = {
  '3.jpg': 'welcome-de',
  '4.jpg': 'welcome-en',
  '1.jpg': 'welcome-intros-de',
  '2.webp': 'smart-match',
  '5.webp': 'sign-up',
  '6.webp': 'sign-in',
  '11.jpg': 'discover-top',
  '10.webp': 'discover-grid',
  '9.webp': 'discover-feed',
};
const STATUS_BAR = { 706: 102, 920: 130 };
// Bump when the output changes so image caches (browser, Vercel) pick up the new files.
const VERSION = 'v2';

/**
 * How to rebuild what the dev button covers, per screen:
 *  - row:    plain background — interpolate along the row.
 *  - twin:   it sits on a tile — copy the same spot from the identical tile `dx` px to the left.
 *  - mirror: it sits on the end of the search pill — mirror the pill's left end (x' = axis - x).
 * Copied text/icon pixels (bright) are skipped so no stray letters are duplicated.
 */
const DEV_BUTTON_FILL = {
  'discover-top': { mode: 'mirror', axis: 706 },
  'discover-grid': { mode: 'twin', dx: -435 },
  'discover-feed': { mode: 'twin', dx: -435 },
};

/**
 * Paints out the Expo dev-menu button (bright blue disc with a dark ring and glow).
 * Finds the disc by colour, masks it plus its ring, then refills the masked pixels.
 */
function removeDevButton(data, width, height, channels, fill = { mode: 'row' }) {
  let x0 = width, y0 = height, x1 = 0, y1 = 0;
  for (let y = 0; y < height; y++)
    for (let x = 0; x < width; x++) {
      const i = (y * width + x) * channels;
      const r = data[i], b = data[i + 2];
      if (b > 180 && r < 90 && b - r > 120) {
        x0 = Math.min(x0, x); y0 = Math.min(y0, y); x1 = Math.max(x1, x); y1 = Math.max(y1, y);
      }
    }
  if (x1 <= x0) return;
  const cx = (x0 + x1) / 2, cy = (y0 + y1) / 2, R = (x1 - x0) / 2;
  const hard = R * 1.3; // disc + dark ring
  const soft = R * 1.75; // outer glow: only bluish pixels
  const mask = new Uint8Array(width * height);
  for (let y = Math.max(0, Math.floor(cy - soft)); y < Math.min(height, cy + soft); y++)
    for (let x = Math.max(0, Math.floor(cx - soft)); x < Math.min(width, cx + soft); x++) {
      const i = (y * width + x) * channels;
      const d = Math.hypot(x - cx, y - cy);
      const bluish = data[i + 2] - data[i] > 6 && data[i + 2] >= data[i + 1];
      if (d <= hard || (d <= soft && bluish)) mask[y * width + x] = 1;
    }
  // Grow the mask by 2px so no blue fringe survives.
  for (let pass = 0; pass < 2; pass++) {
    const grown = mask.slice();
    for (let y = 1; y < height - 1; y++)
      for (let x = 1; x < width - 1; x++) {
        const k = y * width + x;
        if (!mask[k] && (mask[k - 1] || mask[k + 1] || mask[k - width] || mask[k + width])) grown[k] = 1;
      }
    mask.set(grown);
  }
  const clean = Buffer.from(data);
  const at = (x, y) => (y * width + x) * channels;
  const lum = (i) => 0.2126 * clean[i] + 0.7152 * clean[i + 1] + 0.0722 * clean[i + 2];

  // On tiles, a glyph cut in half by the mask would leave a sliver behind:
  // take the whole glyph (bright pixels connected to the mask) out as well.
  if (fill.mode === 'twin') {
    const queue = [];
    for (let k = 0; k < width * height; k++) if (mask[k]) queue.push(k);
    const limit = cx - hard - 30;
    while (queue.length) {
      const k = queue.pop();
      for (const n of [k - 1, k + 1, k - width, k + width]) {
        if (n < 0 || n >= width * height || mask[n] || n % width < limit) continue;
        if (lum(n * channels) > 45) {
          mask[n] = 1;
          queue.push(n);
        }
      }
    }
  }

  // Text/icon zones (bright pixels, grown by 4px to include anti-aliased edges).
  // Copying from these would duplicate letters, so they are never used as a source.
  let ink = new Uint8Array(width * height);
  for (let k = 0; k < width * height; k++) ink[k] = lum(k * channels) > 55 ? 1 : 0;
  for (let pass = 0; pass < 4; pass++) {
    const grown = ink.slice();
    for (let y = 1; y < height - 1; y++)
      for (let x = 1; x < width - 1; x++) {
        const k = y * width + x;
        if (!ink[k] && (ink[k - 1] || ink[k + 1] || ink[k - width] || ink[k + width])) grown[k] = 1;
      }
    ink = grown;
  }
  /** Nearest pixel in row y, walking from sx in `step`, that is neither text nor masked. */
  const plain = (sx, y, step) => {
    while (sx > 0 && sx < width - 1 && (ink[y * width + sx] || mask[y * width + sx])) sx += step;
    return at(Math.min(width - 1, Math.max(0, sx)), y);
  };
  /** Left edge of the search pill in row y (first pixel clearly brighter than the page). */
  const pillEdge = (y) => {
    const bg = lum(at(4, y));
    for (let x = 6; x < 140; x++) if (lum(at(x, y)) > bg + 8) return x;
    return -1;
  };

  for (let y = 0; y < height; y++)
    for (let x = 0; x < width; x++) {
      if (!mask[y * width + x]) continue;
      const out = at(x, y);
      let i = -1;

      if (fill.mode === 'twin') {
        const sx = x + fill.dx;
        i = ink[y * width + sx] ? plain(sx, y, -1) : at(sx, y);
      } else if (fill.mode === 'mirror') {
        // Mirror the outer edge of the pill's left end; fill its inside with the pill colour.
        const sx = fill.axis - x;
        const e = pillEdge(y);
        if (e < 0 || sx < e + 7) i = at(Math.max(0, sx), y);
        else i = plain(e + 8, y, 1);
      }

      if (i >= 0) {
        for (let c = 0; c < 3; c++) data[out + c] = clean[i + c];
        continue;
      }

      // row: interpolate between the nearest clean pixels on the left and right.
      let l = x, r = x;
      while (l > 0 && mask[y * width + l]) l--;
      while (r < width - 1 && mask[y * width + r]) r++;
      const t = (x - l) / Math.max(1, r - l);
      for (let c = 0; c < 3; c++) data[out + c] = Math.round(clean[at(l, y) + c] * (1 - t) + clean[at(r, y) + c] * t);
    }
}

for (const [file, name] of Object.entries(SCREENS)) {
  const { data, info } = await sharp(path.join(src, file)).removeAlpha().raw().toBuffer({ resolveWithObject: true });
  removeDevButton(data, info.width, info.height, info.channels, DEV_BUTTON_FILL[name]);
  const top = STATUS_BAR[info.width] ?? 0;
  const out = path.join(screensDir, `${name}-${VERSION}.webp`);
  await sharp(data, { raw: info })
    .extract({ left: 0, top, width: info.width, height: info.height - top })
    .webp({ quality: 90 })
    .toFile(out);
  console.log(`${name}-${VERSION}.webp  ${info.width}x${info.height - top}`);
}

/** White-on-black artwork -> white artwork with luminance as alpha. */
async function whiteOnTransparent(file, out) {
  const { data, info } = await sharp(path.join(src, file)).greyscale().raw().toBuffer({ resolveWithObject: true });
  const rgba = Buffer.alloc(info.width * info.height * 4);
  for (let i = 0; i < info.width * info.height; i++) {
    const a = data[i * info.channels];
    rgba[i * 4] = 255;
    rgba[i * 4 + 1] = 255;
    rgba[i * 4 + 2] = 255;
    rgba[i * 4 + 3] = a < 12 ? 0 : a;
  }
  await sharp(rgba, { raw: { width: info.width, height: info.height, channels: 4 } })
    .trim()
    .png()
    .toFile(out);
}

await whiteOnTransparent('12.png', path.join(brandDir, 'mark.png'));

// Favicons straight from the original S mark.
const appDir = path.join(root, 'app');
await sharp(path.join(src, '12.png')).resize(512, 512).png().toFile(path.join(appDir, 'icon.png'));
await sharp(path.join(src, '12.png')).resize(180, 180).png().toFile(path.join(appDir, 'apple-icon.png'));

// Default OpenGraph card from the original wordmark artwork.
const word = await sharp(path.join(src, '14.webp')).resize(1200).toBuffer();
await sharp({ create: { width: 1200, height: 630, channels: 3, background: '#000000' } })
  .composite([{ input: word, top: 115, left: 0 }])
  .png()
  .toFile(path.join(root, 'public', 'og.png'));

console.log('brand assets written');
