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

// source file -> semantic name. English captures of app version 2.0.0 (iPhone, 1206px wide).
const SCREENS = {
  'en-welcome-en.png': 'welcome-en',
  'en-sign-up.png': 'sign-up',
  'en-home.png': 'home',
  'en-smart-match.png': 'smart-match',
  'en-discover.png': 'discover',
  'en-profile.png': 'profile',
  'en-settings-privacy.png': 'settings-privacy',
  'en-edit-profile.png': 'edit-profile',
  'en-edit-profile-intent.png': 'edit-profile-intent',
  'en-analytics-viewers.png': 'analytics-viewers',
  'en-search.png': 'search',
  'en-launch-startup.png': 'launch-startup',
  'en-host-event.png': 'host-event',
};
// Status bar height per capture width.
const STATUS_BAR = { 706: 102, 920: 130, 1206: 165 };
// Screens are written at this width (enough for every size they are shown at).
const OUTPUT_WIDTH = 920;
// Bump when the output changes so image caches (browser, Vercel) pick up the new files.
const VERSION = 'v3';

/**
 * Rough centre of the dev button per screen (source px). Only blue pixels near it
 * count, so other blue UI — the keyboard's search key, a text cursor — is left alone.
 */
const DEV_BUTTON_AT = {
  'welcome-en': [1071, 262],
  'sign-up': [1071, 262],
  home: [1071, 450],
  'smart-match': [1071, 450],
  discover: [1071, 252],
  profile: [1071, 805],
  'settings-privacy': [1071, 252],
  'edit-profile': [1071, 437],
  'edit-profile-intent': [1071, 437],
  'analytics-viewers': [1071, 252],
  search: [1071, 771],
  'launch-startup': [1071, 311],
  'host-event': [1071, 252],
};

/**
 * How to rebuild what the dev button covers, per screen (default: row):
 *  - row:    plain background — interpolate along the row.
 *  - twin:   it sits on a tile — copy the same spot from the identical tile `dx` px to the left.
 *  - mirror: it sits on the end of the search pill — mirror the pill's left end (x' = axis - x).
 * Copied text/icon pixels (bright) are skipped so no stray letters are duplicated.
 * `hard` is the masked radius in disc radii: large enough to take the button's soft
 * shadow on open background, smaller where chips or buttons sit close to it.
 */
const DEV_BUTTON_FILL = {
  'welcome-en': { mode: 'row', hard: 1.8 },
  'sign-up': { mode: 'row', hard: 1.8 },
  home: { mode: 'row', hard: 1.6 },
  'smart-match': { mode: 'row', hard: 1.45 },
  discover: { mode: 'row', hard: 1.6 },
  profile: { mode: 'row', hard: 1.5 },
  'settings-privacy': { mode: 'row', hard: 1.35 },
  'analytics-viewers': { mode: 'row', hard: 1.35 },
  search: { mode: 'row', hard: 1.8 },
  'launch-startup': { mode: 'row', hard: 1.45 },
};

/**
 * Paints out the Expo dev-menu button (bright blue disc with a dark ring and glow).
 * Finds the disc by colour, masks it plus its ring, then refills the masked pixels.
 */
function removeDevButton(data, width, height, channels, fill = { mode: 'row' }, near) {
  let x0 = width, y0 = height, x1 = 0, y1 = 0;
  const win = 170;
  for (let y = 0; y < height; y++)
    for (let x = 0; x < width; x++) {
      if (near && (Math.abs(x - near[0]) > win || Math.abs(y - near[1]) > win)) continue;
      const i = (y * width + x) * channels;
      const r = data[i], b = data[i + 2];
      if (b > 180 && r < 90 && b - r > 120) {
        x0 = Math.min(x0, x); y0 = Math.min(y0, y); x1 = Math.max(x1, x); y1 = Math.max(y1, y);
      }
    }
  if (x1 <= x0) return;
  const cx = (x0 + x1) / 2, cy = (y0 + y1) / 2, R = (x1 - x0) / 2;
  const hard = R * (fill.hard ?? 1.3); // disc, dark ring and (where there is room) its shadow
  const soft = Math.max(hard, R * 1.75); // outer glow: only bluish pixels
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

  // The button casts a soft drop shadow (slightly below its centre) that reaches past the
  // mask. It darkens whatever lies under it, so lift it ring by ring: compare the dark
  // background in each ring with the background just outside the shadow and scale back up.
  if (fill.mode === 'row') {
    const scx = cx, scy = cy + R * 0.12, outer = R * 1.9;
    const lumAt = (k) => 0.2126 * data[k * channels] + 0.7152 * data[k * channels + 1] + 0.0722 * data[k * channels + 2];
    const median = (a) => (a.length ? a.sort((p, q) => p - q)[a.length >> 1] : 0);
    const rings = new Map();
    const ref = [];
    const reach = R * 2.3;
    for (let y = Math.max(0, Math.floor(scy - reach)); y < Math.min(height, scy + reach); y++)
      for (let x = Math.max(0, Math.floor(scx - reach)); x < Math.min(width, scx + reach); x++) {
        const k = y * width + x;
        const d = Math.hypot(x - scx, y - scy);
        const l = lumAt(k);
        if (mask[k] || l > 24) continue; // only plain dark background tells us the shadow
        if (d > R * 1.95 && d <= reach) ref.push(l);
        else if (d <= outer) {
          const bin = Math.floor(d / 3);
          if (!rings.has(bin)) rings.set(bin, []);
          rings.get(bin).push(l);
        }
      }
    const base = median(ref);
    const gain = new Map([...rings].map(([bin, ls]) => [bin, Math.min(1.6, Math.max(1, base / Math.max(1, median(ls))))]));
    for (let y = Math.max(0, Math.floor(scy - outer)); y < Math.min(height, scy + outer); y++)
      for (let x = Math.max(0, Math.floor(scx - outer)); x < Math.min(width, scx + outer); x++) {
        const k = y * width + x;
        const g = gain.get(Math.floor(Math.hypot(x - scx, y - scy) / 3));
        if (mask[k] || !g || g === 1) continue;
        for (let c = 0; c < 3; c++) data[k * channels + c] = Math.min(255, Math.round(data[k * channels + c] * g));
      }
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
  removeDevButton(data, info.width, info.height, info.channels, DEV_BUTTON_FILL[name], DEV_BUTTON_AT[name]);
  const top = STATUS_BAR[info.width] ?? 0;
  const out = path.join(screensDir, `${name}-${VERSION}.webp`);
  const written = await sharp(data, { raw: info })
    .extract({ left: 0, top, width: info.width, height: info.height - top })
    .resize({ width: Math.min(OUTPUT_WIDTH, info.width) })
    .webp({ quality: 90 })
    .toFile(out);
  console.log(`${name}-${VERSION}.webp  ${written.width}x${written.height}`);
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
