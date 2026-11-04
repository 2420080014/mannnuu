# Midnight Birthday Gift — Implementation Plan

## Scope

Build a polished, responsive six-scene romantic birthday website in React + Vite using JavaScript/JSX and modular CSS. The phone-style messaging surprise is intentionally removed from scope. The experience flows through countdown, celebration, editorial landing, Polaroid gallery, interactive scrapbook, and personal letter. It uses editable placeholder content and local asset paths, with no backend, authentication, database, or external messaging service.

## Implementation approach

- Use a single-page scene state machine in `App.jsx`; each scene is a full-screen section with a shared transition layer and scene navigation affordance.
- Keep all personal content, dates, photo metadata, eight-page sketchbook content, age values, letter copy, and audio path in `src/data/birthdayContent.js` so personalization does not require component edits.
- Implement the countdown with a real target timestamp, a preview mode, a split-flap timer, and a deterministic old-age burn/new-age transition before celebration.
- Build reusable components for countdown, celebration, landing, gallery/modal, scrapbook page turns, letter, music control, scene navigation, and decorative particles.
- Use CSS custom properties, `clamp()`, grid/flex layouts, transforms, opacity, and perspective for visual fidelity and performance. Avoid unnecessary continuous animation.
- Use inline SVG/CSS shapes for balloons, hearts, tape, stars, film-strip lines, and texture so the site works without external image dependencies. Placeholder photos will be remote-free generated SVG data images with clear replacement paths in the data file; supplied real photos can be dropped into `public/images` later.
- Implement semantic headings, labeled buttons, keyboard controls, focus states, Escape handling, image fallbacks, optional local audio with interaction-gated playback, and `prefers-reduced-motion` support.
- Provide `public/manus-routes.json`, a README with setup/customization/audio/deployment guidance, and a static build configuration.

## Design direction

Three candidate directions considered:

1. **Editorial Midnight Scrapbook** — 0.07 probability: a quiet magazine-like composition where ink-black cinematic scenes give way to cream paper, torn edges, and hand-placed photos.
2. **Soft Neon Love Note** — 0.05 probability: stronger gradients, glowing type, and a modern music-video feel.
3. **Vintage Film Diary** — 0.08 probability: heavier grain, sepia tones, and archival contact-sheet layouts.

### Chosen style: Editorial Midnight Scrapbook

- **Design Movement:** Contemporary editorial design blended with analog scrapbook ephemera and restrained cinematic motion.
- **Core Principles:** Intimacy over spectacle; asymmetry with generous breathing room; tactile paper/ink contrast; every motion should feel like turning a page or opening a keepsake.
- **Color Philosophy:** Near-black and ink brown establish the private opening; warm ivory and parchment create the reveal; muted blush and one marigold accent provide affection without turning childish.
- **Layout Paradigm:** Full-bleed chapters alternate with offset editorial compositions. Photos orbit the text rather than filling a regular gallery grid; scrapbook spreads use deliberate imbalance and layered paper.
- **Signature Elements:** A small “M.” monogram mark, hairline film-strip arcs, and blush heart seals recurring as scene punctuation.
- **Interaction Philosophy:** Controls are invitations, not chrome. Buttons feel like labels or handwritten tabs; opening a scene, lifting a Polaroid, and turning a page all use gentle physical metaphors.
- **Animation:** 500–900ms opacity/transform transitions, staggered entrances, slow ambient drift only where it supports depth, and instant/short transitions under reduced motion.
- **Typography System:** Use `Arial, Helvetica, sans-serif` for bold editorial display text and `Georgia, Times New Roman, serif` for intimate notes/handwritten-feeling captions. Uppercase eyebrow labels use tracking and small size; display type uses tight line-height and oversized `clamp()` sizing.
- **Brand Essence:** A private digital keepsake for one person, made to be opened slowly; intimate, cinematic, handmade.
- **Brand Voice:** Headlines are simple and direct; microcopy is warm and specific. Example lines: “A little place for all the good things.” and “Take your time here.”
- **Wordmark & Logo:** A tiny circular monogram seal with an M-like double stroke and a heart dot, used as the scene marker rather than a conventional logo.
- **Signature Brand Color:** `#d5a742` muted marigold, reserved for the name, active scene marker, and one or two meaningful details.

## Project structure

```text
src/
  components/
    BirthdayCelebration.jsx
    BirthdayLanding.jsx
    AgeTransition.jsx
    Countdown.jsx
    DecorativeParticles.jsx
    LetterScene.jsx
    MusicControl.jsx
    PolaroidCard.jsx
    PhotoGallery.jsx
    SceneNav.jsx
    SceneTransition.jsx
    Scrapbook.jsx
  data/
    birthdayContent.js
  hooks/
    useCountdown.js
  styles/
    global.css
    animations.css
  App.jsx
  main.jsx
public/
  images/
  audio/
  manus-routes.json
README.md
index.html
package.json
vite.config.js
```

## Build workflow

1. Create the Vite package/configuration and route manifest.
2. Add the central data model, countdown hook, scene components, and shared primitives.
3. Implement the six-scene flow and all interactions, including gallery modal, split-flap timer, age transition, and eight-page sketchbook controls.
4. Add responsive/reduced-motion styling, fallbacks, music control, and documentation.
5. Run diagnostics, production build, route-manifest HTTP check, and preview/screenshot inspection at desktop and mobile sizes.
6. Resolve confirmed issues, commit to `main`, and leave the project ready for preview/deployment.
