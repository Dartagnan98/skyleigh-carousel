---
name: carousel
description: "Instagram carousels for Skyleigh McCallum (Kamloops + Okanagan Shuswap realtor) and her Elevation Real Estate brand, from locked templates: clay (her clay figure, personal brand), elevation (same figure in Elevation navy/copper), twitter / twitter-photo (Hormozi-style tweet cards, always her name). Only the content varies, the design never does. Use when the user says 'carousel', 'make me a carousel', 'IG carousel', 'clay carousel', 'elevation carousel', 'twitter carousel', 'twitter-photo', 'tweet style', or '/carousel'."
metadata:
  version: 2.0.0
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

`/carousel [style] [topic]`. Both are optional. The process below runs every time, in this order: **topic, then writing, then carousel style, then render.** Never skip a phase, never reorder them. The design is locked, so the copy is the whole game and phase 2 is where the deck is won or lost.

## Phase 1: Topic

Lock three things before writing a word. Infer them from the request when you can; if the topic itself is missing, ask exactly one short question and stop.

1. **Reader.** One person. Seller/buyer decks: the homeowner about to list in Kamloops or the Okanagan Shuswap, or the buyer who is scared of overpaying. Elevation decks: the agent who wants more deals with less chaos.
2. **The one thing they get wrong**, in their words. Not a category ("pricing"), a mistake ("they trust the app's number").
3. **Awareness.** Does the reader know the problem, know solutions exist, or know her already? Home sellers are usually problem-aware and have heard "free home evaluation" a hundred times, so the copy must reveal HOW she does it differently. Agents are solution-aware and jaded, so lead with the mechanism and the outcome, never the promise alone.

Write the three down in one line in your reply ("Reader: … / Mistake: … / They know: …"). If you cannot name the mistake, the deck has no angle yet. Find one before continuing.

Grounding: every fact comes from her material. Sellers: her CMA process (fresh photos, updates since last sale, comps walked honestly, absorption rate for market type, seasonal buyers, sandwich pricing). Agents: the Elevation PDFs (automated CMA steps, lead segment cadences, open house must-dos, 30-day action plan). Never invent a number, a stat, a testimonial or a deadline. If a claim needs one you do not have, write the line so it does not need it.

## Phase 2: Writing

Run this whether or not a copywriting skill is installed. If `copywriting` (Copy OS) or `hormozi-brain` is available, use it for the same steps; the bar below still applies.

**2a. Hook.** Write at least 8 cover headline candidates across different shapes:
- the reader's own deadline ("Your home gets one first week on the market.")
- cost of the mistake ("Price it wrong and you find out in the first week.")
- contrast ("Sellers spend weeks on paint colours and five minutes on the list price.")
- mechanism reveal ("Price it tonight, not Thursday.")
- specific count with a gap ("Six kinds of leads. One cadence fits one of them.")
- the tangible list ("One open house. 30 doors, one draw, zero lost leads.")

Score every candidate 0 to 10 on each of Bly's 4 U's and total out of 40: **Useful** (a clear benefit), **Urgent** (a reason it matters now: the reader's own timing counts, fake deadlines do not), **Unique** (could a competitor post it word for word?), **Ultra-specific** (numbers, names, tangible details). Keep only candidates at **30 or above**. If nothing clears 30, the angle is wrong: go back to Phase 1 and pick a different mistake. Do not polish a loser.

Rules for the winner: one idea, under 9 words, no label headlines ("5 pricing tips"), no clever wordplay the reader has to decode, no hype words (game-changer, unlock, elevate, secret, hack). The cover sub-line finishes the thought and promises the list ("The 5 checks I run before we pick a number.") so the swipe has a reason.

**2b. Slides.** One idea per slide. Headline = the move in 3 to 5 words. Sub = why it matters, first person, her voice. Card = the concrete specifics (rooms, days, numbers, names). Every slide needs at least one specific. If a slide needs a second read, split it or cut it.

**2c. CTA.** The last slide is a comment CTA built from all five parts: **command** (Comment), **the word** (one capitalised word: PRICE, CMA, SEGMENTS, 30 DAYS), **benefit** (what she sends or does: "I will run these 5 checks on your home", "I will send the full breakdown"), **ease** (free, no listing required, two minutes to read), **why now** (this fall, before you list, before your next listing appointment). Only promise things that exist: her CMA, the Elevation PDFs. Never "DM me for more info", never "link in bio", never two CTAs.

**2d. Voice.** First person, short sentences, plain words. Kind about homes ("nearing end of life", never "dated" or "ugly"), direct about numbers. No em dashes, no exclamation marks, no AI cliches, no rule-of-three filler.

**2e. Gate, before you touch a template.** Answer each in one word in your head; any "no" means rewrite:
- Would a stranger stop scrolling on the cover?
- Does the cover promise the list?
- Does every slide earn the next swipe with one specific?
- Does the CTA have all five parts and a real payoff?
- Is every fact from her material?
- Card lines 38 chars or fewer, cover headline 3 lines or fewer, sub 2 lines?

State the winning hook's 4 U's score in your reply, one line.

## Phase 3: Carousel style

Now pick the container. Use the style word if the user gave one; otherwise pick by fit and say which you picked.

| Word | Template | Use it when |
|---|---|---|
| `clay` (aliases `skyleigh`, `sky`) | `template-clay.html` | Seller or buyer education, step-by-step. Her clay figure, forest green `#044B35` cover + outro, off-white body, copper `#CE823E`, Open Sauce Sans Black headline, soft white card, her name mark + photo footer, `@skyleighmccallum`. |
| `elevation` (alias `elev`) | `template-elevation.html` | Agent education under the Elevation Real Estate brand. Same figure and card, navy `#1B2A4A` cover + outro and headline ink, copper accent. No footer, no top brand text: pill kicker, counter, domain watermark only. |
| `twitter` | `template-tweet.html` | A punchy opinion or a short list, every slide plain white. Big header (her photo, bold name, blue check, grey handle), one statement in Inter. |
| `twitter-photo` | `template-tweet.html` | The same, every slide on one of her photos (`assets/photos/skyleigh-1/2/3.jpg`, rotate), white card bottom-left, circle arrow on the cover only. Best scroll-stopper for a hook-led list. |
| `tweet` (alias `x`) | `template-tweet.html` | Mixed: you decide `photo:` per slide. |

Tweet decks are ALWAYS Skyleigh McCallum, never the Elevation brand. The blue check is part of the design.

Map the copy into the template's `slidesData` shape (formats under "Writing content" below). Clay and elevation carry kicker, headline, sub and card per slide; tweet carries one text block per slide, so merge headline and sub into one statement there.

## Phase 4: Render and check

1. Copy the template to a working file (never edit the templates):
   ```bash
   cp ~/.claude/skills/carousel/template-clay.html /tmp/carousel-<slug>.html
   ```
2. Rewrite only the `slidesData` array inside the EDIT ZONE.
3. Render:
   ```bash
   cd ~/.claude/skills/carousel && node render.mjs /tmp/carousel-<slug>.html /tmp/carousel-<slug>-out
   ```
   Output: `slide-01.jpg … slide-NN.jpg`. `node render.mjs clay|elevation|twitter-photo /tmp/out` renders the sample deck baked into each template. `carousel-assets/` inside any deck always resolves to this skill's `assets/`, so copied decks render from anywhere.
4. Look at every slide before showing it: no card into the footer, no headline past 3 lines, no text behind the figure. Fix specific slides, re-render.
5. Open the slides for the user (`open /tmp/carousel-<slug>-out/*.jpg`) and report in three lines: Reader / Mistake / They know, the winning hook with its score, and the CTA word.

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
