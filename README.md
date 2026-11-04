# Midnight Birthday Gift

A six-scene romantic birthday keepsake built with React, Vite, Framer Motion, Lucide React, and modular CSS. The scrapbook chapter is an eight-page spiral sketchbook with a dark cover, collage spreads, page-flip motion, layered paper, tape, stickers, and fixed `< PREV · page / 8 · NEXT >` controls. The phone-style messaging scene was intentionally removed from the project scope.

## Run locally

```bash
npm install
npm run dev
```

Then open the Vite address shown in the terminal. A production build can be checked with `npm run build`, and `npm run preview` serves the generated `dist` folder.

## Personalize the gift

Open `src/data/birthdayContent.js`. The `birthdayContent` object is the only file you need for normal customization. Replace `herName`, `nickname`, `creatorName`, `birthdayDate`, `countdownBackgroundImage`, `oldAge`, `newAge`, the intro, final wish, letter, photo captions, and scrapbook copy. The date should be an ISO timestamp with an explicit timezone when possible. When the countdown completes, the old-age card burns away and the new-age card enters before the birthday celebration begins.

For the opening scene, add a blurred source image at `public/images/countdown-background.jpg`, or change `countdownBackgroundImage` to another local image path. The birthday celebration uses the same editable `photos` array as a slow looping Polaroid scroller instead of balloons.

The site starts in preview mode so the countdown completes in a few seconds. Set `countdownPreviewMode` to `false` to use the real birthday date. Adjust `countdownPreviewSeconds` when you want a longer or shorter demo. The “Preview the new age” control always lets you skip the waiting state. The age-burn animation reads `oldAge` and `newAge` from the same data object.

## Replace the placeholder photos

Place your own files in `public/images`, then replace the corresponding `src` values in `birthdayContent.js` with paths such as `/images/photo-01.jpg`. Keep the supplied `alt` text meaningful, and update it to describe the real image. No personal photos are bundled in this starter.

## Add music

The current background song is **Amsham Pinneyum**, stored at `public/audio/amsham-pinneyum.m4a`. To replace it, add another music file to `public/audio/` and change `audioPath` in `birthdayContent.js` to its local path. Browsers block autoplay, so the music begins only after the visitor presses the visible music control. If the file is missing, the rest of the experience continues and the control explains that a song can be added.

The celebration scene now shows a cake with three candles. Press **Blow out the candles** to grant microphone access and blow toward the microphone; each detected blow extinguishes one candle and reveals that candle's wish. If microphone access is unavailable, tap the lit candles directly. Edit the three messages in the `candleWishes` array: the first wish is shown for candle one, the second for candle two, and the third for candle three. After all three are out, the editable `candleRevealText` appears.

## Add the letter video and separate song

The uploaded birthday video is now available at `public/video/birthday-letter.mp4` and appears inside the opened letter with native controls. Replace that file or change `letterVideoPath` if needed. The letter-only song remains at `public/audio/letter-music.mp3`; it has its own play/pause control and is interaction-gated, while the global background-music control is hidden on the letter scene so the two tracks do not overlap.

## Deploy to Vercel or Netlify

For either provider, use the following settings:

- Build command: `npm run build`
- Output directory: `dist`
- Install command: `npm install`

This is a static frontend and does not require server, database, authentication, or messaging credentials. Commit the project, import it into Vercel or Netlify, and deploy. If you use a custom domain, ensure the provider serves the app over HTTPS so all browser media policies behave consistently.

## Final testing checklist

- Run `npm run build` and confirm there are no compile errors.
- Test the countdown in preview mode, then switch to a real date and test the zero transition.
- Open the celebration, landing, gallery, scrapbook, and letter controls with a mouse, keyboard, and touch-sized viewport.
- In the gallery, open a Polaroid, use previous/next, press Escape, and click outside the modal.
- In the scrapbook, move backward and forward through every spread and open the letter from the final page.
- Add and remove the audio file to verify both music states.
- Replace one placeholder image and verify its alt text.
- Test at desktop, tablet, and mobile widths with no horizontal overflow.
- Test with `prefers-reduced-motion: reduce` enabled.
