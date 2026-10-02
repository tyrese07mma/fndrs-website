/**
 * Copies the original FNDRS app screenshots + brand files into /public.
 *
 * Screens are only cropped (status bar removed) and re-encoded, never edited.
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

for (const [file, name] of Object.entries(SCREENS)) {
  const img = sharp(path.join(src, file));
  const { width, height } = await img.metadata();
  const top = STATUS_BAR[width] ?? 0;
  const out = path.join(screensDir, `${name}.webp`);
  await img.extract({ left: 0, top, width, height: height - top }).webp({ quality: 90 }).toFile(out);
  console.log(`${name}.webp  ${width}x${height - top}`);
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
