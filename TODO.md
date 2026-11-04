# Implementation checklist

## Six-scene experience and editable configuration

- [x] Build the actual React/Vite website rather than only a design description.
- [x] Implement a six-scene flow: cinematic countdown, birthday celebration, editorial landing page, Polaroid gallery, interactive memory scrapbook, and personal birthday letter; the phone-style messaging scene is intentionally excluded.
- [x] Centralize the birthday girl’s name, nickname, creator name, birthday date/time, introductory message, letter, photo paths/captions, scrapbook content, final wish, music path, and countdown preview mode in one editable data file.
- [x] Use placeholders wherever personal details, photographs, messages, or audio are unavailable, and make replacement instructions clear.

## Countdown and celebration

- [x] Display a configurable countdown to a real target date/time, calculate remaining time correctly, support a preview mode, and transition when it reaches zero.
- [x] Use a cinematic dark full-screen countdown with prominent number, subtle photo/texture treatment, glow/fade, minimal controls, and smooth number transitions.
- [x] Build the celebration scene with “Happy Birthday”, nickname, elegant balloons/decorations/particles, a working “Open Your Surprise” action, smooth movement, and reduced-motion support.

## Editorial landing and photo gallery

- [x] Build an off-white asymmetric editorial page with large “Happy / Birthday / [nickname]” heading, muted golden accent, intro copy, negative space, and scroll cues.
- [x] Arrange placeholder photos as a curved film-strip/hanging composition with black-and-white/faded treatment, staggered entrance, and subtle hover movement.
- [x] Build the warm beige Polaroid wall with responsive cards, white frames, slight rotations, soft shadows, blush hearts, editable handwritten-style captions, and hover lift/rotate.
- [x] Clicking a card opens an accessible larger-image modal with previous/next controls, Escape/close behavior, and responsive mobile layout without overlapping text.

## Interactive scrapbook

- [x] Build a dark surrounding environment with a centered spiral-bound sketchbook cover, textured collage pages, soft depth, stickers, stars, hearts, washi tape, captions, newspaper scraps, and small photos.
- [x] Provide an editable eight-page sequence: dark cover, three collage spreads, and a final single page with a birthday wish.
- [x] Implement fixed bottom `< PREV · page / 8 · NEXT >` controls, readable page content, and a 0.5–0.8 second CSS/Framer Motion leftward page-turn animation with reduced-motion fallback.

## Personal letter, music, and interaction quality

- [x] Build an intimate readable letter scene with centered paper, comfortable line spacing, subtle texture/decorations, editable affectionate placeholder copy, and accessible full text.
- [x] Add optional local audio with visible play/pause state, playback only after visitor interaction, moderate volume, graceful missing-file handling, and persistence across scenes where possible.
- [x] Use performant transform/opacity animation, scene fades, sparse parallax/hearts, staggered reveals, modal transitions, button feedback, and scroll reveals without layout shifts or scroll traps.
- [x] Make every visible interactive element functional and keyboard accessible, with semantic HTML, heading hierarchy, labels, focus indicators, meaningful alt text, contrast, and Escape handling.
- [x] Respect `prefers-reduced-motion` and avoid excessive flashing or distracting animation.

## Responsive quality, documentation, and delivery

- [x] Support desktop, tablet, and mobile with deliberate stacked/reflowed compositions, readable headings/letter, touch-friendly controls, a comfortable gallery/scrapbook, no horizontal overflow, and accessible music control.
- [x] Handle missing images/audio without broken UI or unnecessary console errors.
- [x] Add setup/startup commands, photo replacement instructions, editing instructions, audio instructions, countdown preview guide, Vercel/Netlify deployment guide, and final testing checklist.
- [x] Run diagnostics, build checks, route-manifest HTTP verification, and responsive preview inspection; fix confirmed problems before checkpointing.

## Reference-style timer and age transition

- [x] Replace the original single-number countdown presentation with a red-curtain split-flap timer showing days above hours, minutes, and seconds, with responsive labels and a real configurable target date.
- [x] After the countdown completes or the preview button is pressed, show an old-age card burning away with embers and reveal the editable new-age card before entering the birthday celebration scene.

## Countdown backdrop and celebration memories

- [x] Remove the opening red-curtain treatment and use a configurable blurred local image layer from `countdownBackgroundImage`, with a dark fallback until the user adds the image file.
- [x] Remove celebration balloons and replace them with a slow looping Polaroid photo scroller sourced from the editable `photos` array, with reduced-motion behavior and responsive sizing.

## Letter media

- [x] Add an editable local birthday video slot inside the opened letter with native controls, no autoplay, and a graceful missing-file message.
- [x] Add a separate interaction-gated letter song with its own play/pause control, while hiding the global background track on the letter scene to prevent overlap.

## Cake candle celebration

- [x] Replace the Happy Birthday balloon/photo page with a cake scene containing exactly three lit candles.
- [x] Support microphone-based blow detection with a tap fallback, extinguish candles one by one, and reveal editable `candleRevealText` only after all three candles are out.

## Per-candle birthday wishes

- [x] Add three editable wishes in `birthdayContent.candleWishes`, show the matching wish immediately after each candle is extinguished, support both microphone and tap interactions, and keep the final reveal after all three candles are out.
