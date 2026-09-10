// Render any skyleigh-carousel template to Instagram-ready 1080x1350 JPEGs.
//
//   node render.mjs <template|deck.html> [out-dir]   (deck.html = a copy of a template with new slidesData)
//
//   templates:  blue   orange   terminal   skyleigh   (terminal = clay-Joe, aliases: joe, clay; skyleigh = clay-Skyleigh, alias: sky)
//   clean:      hide the avatar (blue/orange only; terminal always has Joe)
//   out-dir:    default /tmp/carousel-export
//
//   node render.mjs blue            blue, with you
//   node render.mjs blue clean      blue, no avatar
//   node render.mjs orange          orange, with you
//   node render.mjs terminal        clay-Joe terminal deck
//   node render.mjs list            show templates
//
// Output: <out-dir>/slide-01.jpg ... slide-NN.jpg

import { mkdirSync, readFileSync, existsSync } from 'node:fs';
import { pathToFileURL, fileURLToPath } from 'node:url';
import { resolve, dirname, join, extname } from 'node:path';
import http from 'node:http';

const HERE = dirname(fileURLToPath(import.meta.url));
const NAMES = {
  clay: 'template-clay.html', skyleigh: 'template-clay.html', sky: 'template-clay.html',
  elevation: 'template-elevation.html', elev: 'template-elevation.html',
  twitter: 'template-tweet.html', 'twitter-photo': 'template-tweet.html', tweet: 'template-tweet.html', x: 'template-tweet.html',
};
// these are the 432x540 "track + goTo" decks (clay-Joe) — http-served, scaled x2.5, always have Joe
const CAROUSEL = new Set(['clay', 'skyleigh', 'sky', 'elevation', 'elev']);

const args = process.argv.slice(2);
const positional = args.filter(a => !a.startsWith('--'));
const name = positional[0];
const outDir = positional[1] || '/tmp/carousel-export';

if (!name || name === 'list') {
  console.log('Skyleigh carousels. Usage: node render.mjs <clay|elevation|twitter|twitter-photo|deck.html> [out-dir]');
  console.log('  clay            clay-Skyleigh soft-card deck, her personal brand (green cover/outro)');
  console.log('  elevation       same figure in Elevation Real Estate navy/copper');
  console.log('  twitter         tweet cards, all plain white   (twitter-photo = all on her photos; tweet = mixed)');
  console.log('  deck.html       any copy of a template with new slidesData');
  process.exit(name === 'list' ? 0 : 1);
}

const file = NAMES[name];
if (!file && !/^https?:\/\//.test(name)) {
  if (!existsSync(resolve(name))) { console.error(`unknown template "${name}". Run: node render.mjs list`); process.exit(1); }
}
// deck path: a named template lives in the skill folder; anything else is a user deck file (a copy of a template with new slidesData)
const deckPath = file ? join(HERE, file) : resolve(name);
// carousel-type = the 432x540 track+goTo decks; detect by name OR by content so copied decks render the same way
const isCarousel = CAROUSEL.has(name) || (existsSync(deckPath) && readFileSync(deckPath, 'utf8').includes('id="track"'));

// ---- resolve playwright ----
const candidates = [
  'playwright',
  pathToFileURL(`${HERE}/node_modules/playwright/index.js`).href,
  pathToFileURL(`${process.cwd()}/node_modules/playwright/index.js`).href,
  pathToFileURL(`${process.env.HOME}/claudeclaw/node_modules/playwright/index.js`).href,
];
let chromium;
for (const c of candidates) {
  try { const m = await import(c); chromium = m.chromium || (m.default && m.default.chromium); if (chromium) break; } catch {}
}
if (!chromium) { console.error('playwright not found. From the skill folder run: npm install && npx playwright install chromium-headless-shell'); process.exit(1); }

mkdirSync(outDir, { recursive: true });
const MIME = { '.html':'text/html', '.png':'image/png', '.jpg':'image/jpeg', '.jpeg':'image/jpeg', '.woff2':'font/woff2', '.otf':'font/otf', '.css':'text/css', '.js':'text/javascript' };

let server, files = [];

if (isCarousel) {
  // ---- clay-Joe: serve the skill folder over http (template.html loads carousel-assets/* over http),
  //      alias carousel-assets/ -> assets/, capture each slide via goTo + a fixed 432x540 clip at 2.5x ----
  server = http.createServer((req, res) => {
    let p = decodeURIComponent(req.url.split('?')[0]);
    // carousel-assets/* always resolves to the skill's assets folder, wherever the deck file lives
    const target = p === '/deck.html' ? deckPath
      : p.includes('/carousel-assets/') ? join(HERE, 'assets', p.split('/carousel-assets/')[1])
      : join(dirname(deckPath), p);
    try { res.setHeader('content-type', MIME[extname(target)] || 'application/octet-stream'); res.end(readFileSync(target)); }
    catch { res.statusCode = 404; res.end(); }
  });
  const port = await new Promise(r => server.listen(0, () => r(server.address().port)));
  const url = `http://localhost:${port}/deck.html`;

  const browser = await chromium.launch();
  // deviceScaleFactor 5: 432x540 design -> 2160x2700 (2x IG spec) = crisp
  const page = await browser.newPage({ viewport: { width: 600, height: 700 }, deviceScaleFactor: 5 });
  await page.goto(url, { waitUntil: 'networkidle' });
  await page.evaluate(() => document.fonts && document.fonts.ready);
  await page.waitForTimeout(1500);
  await page.evaluate(() => { const t = document.querySelector('.track'); if (t) t.style.transition = 'none'; document.querySelectorAll('.arrow,.dots').forEach(e => e.style.display = 'none'); });
  const count = await page.evaluate(() => document.querySelectorAll('.slide').length);
  for (let i = 0; i < count; i++) {
    await page.evaluate((n) => typeof goTo === 'function' && goTo(n), i);
    await page.waitForTimeout(250);
    const box = await page.locator('.slide').nth(i).boundingBox();
    const f = `${outDir}/slide-${String(i + 1).padStart(2, '0')}.jpg`;
    await page.screenshot({ path: f, type: 'jpeg', quality: 100, clip: { x: Math.round(box.x), y: Math.round(box.y), width: 432, height: 540 } });
    files.push(f);
  }
  await browser.close();
  server.close();
  console.log(JSON.stringify({ template: name, count, outDir, files }, null, 2));
} else {
  // ---- native 1080x1350 .slide decks (tweet): http-served like the others, element screenshots ----
  server = http.createServer((req, res) => {
    let p = decodeURIComponent(req.url.split('?')[0]);
    const target = p === '/deck.html' ? deckPath
      : p.includes('/carousel-assets/') ? join(HERE, 'assets', p.split('/carousel-assets/')[1])
      : join(dirname(deckPath), p);
    try { res.setHeader('content-type', MIME[extname(target)] || 'application/octet-stream'); res.end(readFileSync(target)); }
    catch { res.statusCode = 404; res.end(); }
  });
  const port = await new Promise(r => server.listen(0, () => r(server.address().port)));
  const browser = await chromium.launch();
  // deviceScaleFactor 2: 1080x1350 -> 2160x2700 (2x IG spec) = crisp
  const page = await browser.newPage({ viewport: { width: 1080, height: 1350 }, deviceScaleFactor: 2 });
  await page.goto(`http://localhost:${port}/deck.html`, { waitUntil: 'networkidle' });
  await page.evaluate(() => document.fonts && document.fonts.ready);
  await page.waitForTimeout(1200);
  const count = await page.evaluate(() => document.querySelectorAll('.slide').length);
  for (let i = 0; i < count; i++) {
    const f = `${outDir}/slide-${String(i + 1).padStart(2, '0')}.jpg`;
    await page.locator('.slide').nth(i).screenshot({ path: f, type: 'jpeg', quality: 100 });
    files.push(f);
  }
  await browser.close();
  server.close();
  console.log(JSON.stringify({ template: name, count, outDir, files }, null, 2));
}
