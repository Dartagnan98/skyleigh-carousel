---
name: carousel
description: "Instagram carousels for Skyleigh McCallum (Kamloops + Okanagan Shuswap realtor) and her Elevation Real Estate brand, from locked templates: clay (her clay figure, personal brand), elevation (same figure in Elevation navy/copper), twitter / twitter-photo (Hormozi-style tweet cards, always her name). Only the content varies, the design never does. Use when the user says 'carousel', 'make me a carousel', 'IG carousel', 'clay carousel', 'elevation carousel', 'twitter carousel', 'twitter-photo', 'tweet style', or '/carousel'."
metadata:
  version: 1.2.0
---

# Carousel (Skyleigh McCallum)

Locked-design Instagram carousels. You pick the template, write the content, render. Never redesign, never ask about fonts or colours. Every template is 1080x1350 (4:5), exported at 2x.

## Install (once per machine)

```bash
git clone https://github.com/Dartagnan98/skyleigh-carousel.git ~/.claude/skills/carousel
cd ~/.claude/skills/carousel && npm install && npx playwright install chromium-headless-shell
```

That's the whole setup. The skill then answers to `/carousel`. Needs Node 18+.

## Invocation

`/carousel <style> <topic>`

| Word | Template | What it is |
|---|---|---|
| `clay` (aliases `skyleigh`, `sky`) | `template-clay.html` | Her clay figure, personal brand. Forest green `#044B35` cover + outro, off-white body slides, copper `#CE823E` accent, Open Sauce Sans Black headline, soft white card, "SKYLEIGH McCALLUM" mark + her photo footer, `@skyleighmccallum`. Audience: home sellers and buyers. |
| `elevation` (alias `elev`) | `template-elevation.html` | Same figure and card in Elevation Real Estate colours: navy `#1B2A4A` cover + outro and headline ink, copper accent. No footer, no top brand text (keep it intentional): pill kicker, counter, domain watermark only. Audience: realtors. |
| `twitter` | `template-tweet.html` | Hormozi-style tweet cards, every slide plain white: big header (her photo, bold name, blue check, grey handle), one statement in Inter. |
| `twitter-photo` | `template-tweet.html` | Same cards, every slide on one of her photos (`assets/photos/skyleigh-1/2/3.jpg`, rotate), white card bottom-left, circle arrow on the cover only. |
| `tweet` (alias `x`) | `template-tweet.html` | Mixed: you decide `photo:` per slide. |

Tweet decks are ALWAYS Skyleigh McCallum, never the Elevation brand. The blue check is part of the design.

If no style word is given, pick by fit: seller/buyer education → `clay`; realtor education → `elevation`; a punchy opinion or a list → `twitter-photo`. Say which you picked. If no topic is given, ask one short question.

## Copy (do this before touching a template)

The design is fixed, so the copy is the whole game. If the `copywriting` skill (Copy OS) or `hormozi-brain` is installed, run the slide copy through it first. If not, this playbook is the fallback and it is not optional:

1. **One reader, one problem.** Name who it's for and the one thing they get wrong. Seller decks: the person about to list. Elevation decks: the agent who wants more deals with less chaos.
2. **Hook = contrast or cost.** The cover states a gap the reader already feels, in their words, with a number where possible. "Sellers spend weeks on paint colours and five minutes on the list price." "Most agents spend two to four hours on a CMA, then can't defend the number." Never open with a label ("5 pricing tips").
3. **Promise the list.** Cover ends with "The N things I check before …:" so the swipe has a reason.
4. **One idea per slide, proof in the card.** Headline = the move in 3 to 5 words. Sub = why it matters, in her voice. Card = the concrete specifics (numbers, days, rooms, names). Specific beats clever every time.
5. **Sound like her, not a brand.** First person, plain words, short sentences, no jargon, no hype words (game-changer, unlock, elevate, secret). She is kind about homes and direct about numbers.
6. **Close with a comment CTA** that names the payoff and the word: "Want the real number on your home? Comment PRICE." One CTA, one word, capitalised.
7. **Cut it down.** Every line under the char limits, every slide readable in two seconds. If a slide needs a second read, split it or delete it.

Check before rendering: Would a stranger stop on the cover? Does every slide earn the next swipe? Is there one number or specific on every slide? Is the CTA a single word? No em dashes, no AI cliches, no exclamation marks.

## Workflow

1. Copy the template for the chosen style to a working file (never edit the templates):
   ```bash
   cp ~/.claude/skills/carousel/template-clay.html /tmp/carousel-<slug>.html
   ```
2. Rewrite only the `slidesData` array inside the EDIT ZONE.
3. Render:
   ```bash
   cd ~/.claude/skills/carousel && node render.mjs /tmp/carousel-<slug>.html /tmp/carousel-<slug>-out
   ```
   Output: `slide-01.jpg … slide-NN.jpg`. `node render.mjs clay|elevation|twitter-photo /tmp/out` renders the sample deck baked into each template. `carousel-assets/` inside any deck always resolves to this skill's `assets/`, so copied decks render from anywhere.
4. Open the slides for the user (`open /tmp/carousel-<slug>-out/*.jpg`), fix specific slides, re-render. Check that no card runs into the bottom and no cover headline exceeds 3 lines.

## Writing content

### clay / elevation (`slidesData`)

```js
{ cover:true,                 // first slide only
  outro:true,                 // last slide only
  kicker:'STEP 01',           // becomes a copper pill
  hl:'Fresh <span class="o">photos</span>',   // headline, auto-uppercased, <span class="o"> = copper punch words
  sub:'MLS photos are years old. <b>I shoot it as it is today.</b>',   // Recoleta serif, <b> = ink
  term:[                      // the soft card: title, bullets, check. Symbols in the data are ignored.
    ['c','','','Fresh photos'],                 // 'c' = card TITLE in Recoleta: a human phrase, NEVER a fake command
    ['a','','','Every room, as it stands now'], // 'a' = dot bullet (sentence-cased automatically)
    ['ok','','','What buyers will actually see'] ] }   // 'ok' = bold copper check line
```

Rules:
- 7 slides ideal (cover + 5 + outro), 5 to 9 allowed. Counter and figure pose are automatic (cover = point up; body rotates present / point-left / thumbs-up).
- Card lines 38 chars max, 3 to 5 lines. No `$`, `--flags`, arrows or `->` anywhere.
- Cover headline 3 lines max (about 8 words), sub 2 lines. The layout script tightens gaps on overflow, but a 4-line headline plus a 3-line sub still crowds the bottom: trim copy, do not shrink type.
- Outro = a comment CTA (`Comment <b>"PRICE"</b> …`).
- Skyleigh's voice for `clay`: Kamloops + Okanagan Shuswap, never harsh about homes ("nearing end of life" not "dated"), "take it with a grain of salt", seasonal buyers, absorption rate, sandwich pricing.
- `elevation` content: the automated CMA, lead segment cadences (hot 0-30 days daily, warm 30-90 weekly text + biweekly call, lukewarm 90-180 monthly, cool 180-365 quarterly, SOI every 60-90 days, every lead gets a monthly newsletter + one-paragraph check-in), the open house must-dos (book Monday for Saturday noon to 2, knock 10 doors each side + 10 across, promote, snacks + draw basket, go live, every attendee into the database).
- No em dashes. No AI cliches.

### twitter / twitter-photo / tweet (`slidesData`)

```js
{ photo:'skyleigh-2.jpg', text:'1) What sold below you, and what is sitting above you.' }   // photo card
{ text:'Want the real number on your home?\n\nComment PRICE.' }                            // plain white
```

- `\n\n` = paragraph break. Text auto-shrinks to fit (plain 88px down to 46px, card 42px down to 30px).
- Cover text: hook + "The N things …:" then one point per slide, last slide = CTA. Keep each slide under about 30 words.
- `twitter` = no `photo` keys at all. `twitter-photo` = a photo on every slide, rotating 1/2/3.

## Assets

`assets/skyleigh-point-trim.png` (cover), `skyleigh-present-trim.png`, `skyleigh-pointleft-trim.png`, `skyleigh-thumb-trim.png` (clay figure, all the same slim body), `skyleigh-avatar.png` (her real photo), `elevation-avatar.png` (logo arrow on navy), `open-sauce-sans-black.ttf`, `recoleta.otf`, `inter.woff2`, `photos/skyleigh-1..3.jpg` (Hiilite portraits, 4:5).

Regenerating a pose (Dartagnan only): Higgsfield `nano_banana_pro`, references = the head lock + the slim `present` pose, prompt "the SAME figure in every way, identical tall slim proportions, normal-sized head, NOT chibi". Cut with `uvx --python 3.12 --with onnxruntime --from 'rembg[cli]' rembg p -m isnet-general-use`, then fill the silhouette solid and keep rembg's alpha only in a 3px edge band. Head lock + 4k originals live on Dartagnan's Lexar under `Client Library/Skyleigh/Claude Output/clay-skyleigh-2026-09-10/`.

## Posting to Instagram

Only when the user asks to post. Posting is public and irreversible.

1. Open the exported slides for the user, then ask: *"This posts to @skyleighmccallum. Reply POST to submit, or tell me what to change."* Wait for an explicit **POST**. Never publish on a vague "looks good".
2. Composio, connected once with `composio link instagram`. Get the account id: `composio execute INSTAGRAM_GET_USER_INFO -d '{}'`.
3. Caption: short hook, the points, the outro CTA wording. Max 2,200 chars, max 30 hashtags.
4. Create the container (2 to 10 JPEGs, in order):
   ```bash
   composio execute INSTAGRAM_CREATE_CAROUSEL_CONTAINER -d '{"ig_user_id":"<id>","caption":"<caption>","child_image_files":["/tmp/out/slide-01.jpg","..."]}'
   ```
5. Publish only after the POST gate: `composio execute INSTAGRAM_POST_IG_USER_MEDIA_PUBLISH -d '{"ig_user_id":"<id>","creation_id":"<id>"}'` and report the permalink.

Pitfalls: JPEG only, 4:5 (the renderer already enforces 1080x1350); one bad file fails the whole container; publishing the same creation id twice returns 409, make a fresh container.
