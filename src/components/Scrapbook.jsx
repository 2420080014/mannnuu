import { useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { ArrowLeft, ArrowRight, Camera, Heart, Sparkles, Star, Ticket } from 'lucide-react'

const visiblePageNumbers = [1, 2, 4, 6, 8]

function SketchPhoto({ content, photoIndex, className, caption }) {
  const photo = content.photos[photoIndex]
  return (
    <figure className={`sketch-photo-wrap ${className}`}>
      <img src={photo.src} alt={photo.alt} />
      {caption && <figcaption>{caption}</figcaption>}
    </figure>
  )
}

function Tape({ tone = 'red', className = '' }) {
  return <span className={`sketch-tape sketch-tape-${tone} ${className}`} aria-hidden="true" />
}

function CoverPage({ content, page }) {
  const cover = content.sketchbookPages[page]
  return (
    <motion.div className="sketchbook-cover" initial={{ opacity: 0, rotateY: -12, x: -30 }} animate={{ opacity: 1, rotateY: 0, x: 0 }} exit={{ opacity: 0, rotateY: 12, x: 30 }} transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}>
      <div className="spiral-backing" aria-hidden="true">{Array.from({ length: 9 }, (_, index) => <span key={index} />)}</div>
      <div className="cover-newspaper" aria-hidden="true">THE DAILY / GOOD THINGS / SPECIAL EDITION / LOVE NOTES / 2026</div>
      <div className="cover-title"><span className="eyebrow">{cover.label}</span><h1>{cover.title}</h1><p>{cover.subtitle}</p></div>
      <SketchPhoto content={content} photoIndex={cover.photoIndex} className="cover-photo" caption="the first frame" />
      <Camera className="cover-camera" size={62} strokeWidth={1.2} aria-hidden="true" />
      <div className="cover-sticker cover-sticker-cherry">♥ ♥</div>
      <div className="cover-sticker cover-sticker-star"><Star size={27} fill="currentColor" strokeWidth={1} /><Sparkles size={15} /></div>
      <div className="cover-sticker cover-ticket"><Ticket size={30} strokeWidth={1.2} /><span>ADMIT ONE<br />TO THE GOOD DAYS</span></div>
      <div className="cover-footnote">a handmade collection of little memories</div>
    </motion.div>
  )
}

function CollageSpread({ content, spread, page }) {
  return (
    <motion.div className="sketchbook-spread" initial={{ opacity: 0, rotateY: 18, x: 70 }} animate={{ opacity: 1, rotateY: 0, x: 0 }} exit={{ opacity: 0, rotateY: -18, x: -70 }} transition={{ duration: 0.68, ease: [0.22, 1, 0.36, 1] }}>
      <div className={`sketch-page sketch-page-left accent-${spread.left.accent}`}>
        <div className="paper-grid" aria-hidden="true" />
        <span className="sketch-page-number">0{page}</span>
        <Tape tone={spread.left.accent} className="tape-left" />
        <div className="sketch-note sketch-note-left">{spread.left.quote}</div>
        <SketchPhoto content={content} photoIndex={spread.left.photoIndex} className="sketch-photo-left" caption={spread.left.caption} />
        <div className="sticker-label sticker-label-left">KEEP<br />THIS</div>
        <Heart className="sketch-heart sketch-heart-left" size={31} fill="currentColor" strokeWidth={1} aria-hidden="true" />
        <Sparkles className="sketch-sparkle sketch-sparkle-left" size={28} aria-hidden="true" />
      </div>
      <div className={`sketch-page sketch-page-right accent-${spread.right.accent}`}>
        <div className="paper-grid" aria-hidden="true" />
        <Tape tone={spread.right.accent} className="tape-right" />
        <div className="sketch-note sketch-note-right">{spread.right.quote}</div>
        <SketchPhoto content={content} photoIndex={spread.right.photoIndex} className="sketch-photo-right" caption={spread.right.caption} />
        <div className="sticker-label sticker-label-right">MADE<br />WITH ♥</div>
        <Star className="sketch-star sketch-star-right" size={32} fill="currentColor" strokeWidth={1} aria-hidden="true" />
        <div className="newspaper-scrap">{spread.note}<br />A SMALL ARCHIVE OF BRIGHT MOMENTS</div>
      </div>
      <div className="sketch-spine" aria-hidden="true" />
    </motion.div>
  )
}

function FinalPage({ content, page }) {
  const finalPage = content.sketchbookPages[page]
  return (
    <motion.div className="sketchbook-final" initial={{ opacity: 0, rotateY: 18, x: 70 }} animate={{ opacity: 1, rotateY: 0, x: 0 }} exit={{ opacity: 0, rotateY: -18, x: -70 }} transition={{ duration: 0.68, ease: [0.22, 1, 0.36, 1] }}>
      <div className="final-newspaper" aria-hidden="true">FRÜHLING / THE DREAM EDITION / A VERY SMALL NEWSPAPER / SPRING FLOWERS / KEEP GOING / KEEP GLOWING</div>
      <span className="final-page-number">08</span>
      <SketchPhoto content={content} photoIndex={finalPage.photoIndex} className="final-photo" caption="one last little memory" />
      <div className="final-note"><p className="eyebrow">{finalPage.label}</p><h1>{finalPage.title.split('\n').map((line) => <span key={line}>{line}<br /></span>)}</h1><p>{finalPage.quote}</p></div>
      <div className="final-ticket"><Ticket size={25} /><span>ADMIT ONE<br />TO YOUR NEXT CHAPTER</span></div>
      <Heart className="final-heart" size={33} fill="currentColor" strokeWidth={1} aria-hidden="true" />
      <Sparkles className="final-sparkles" size={34} aria-hidden="true" />
      <div className="final-dream">dream<br /><strong>BIG</strong></div>
    </motion.div>
  )
}

export function Scrapbook({ content, onContinue }) {
  const [page, setPage] = useState(0)
  const pages = content.sketchbookPages
  const current = pages[page]
  const isLast = page === pages.length - 1
  const goBack = () => setPage((value) => Math.max(0, value - 1))
  const goForward = () => {
    if (isLast) onContinue()
    else setPage((value) => Math.min(pages.length - 1, value + 1))
  }

  return (
    <section className="scene scene-scrapbook sketchbook-scene" aria-labelledby="scrapbook-title">
      <div className="scrapbook-atmosphere" aria-hidden="true" />
      <div className="sketchbook-header"><span className="eyebrow eyebrow-light">A memory sketchbook</span><span className="topline-note">05 / 06</span></div>
      <div className="sketchbook-stage">
        <div className="blurred-memory memory-one" aria-hidden="true" />
        <div className="blurred-memory memory-two" aria-hidden="true" />
        <div className="book-shadow" aria-hidden="true" />
        <AnimatePresence mode="wait">
          {current.type === 'cover' && <CoverPage key={`cover-${page}`} content={content} page={page} />}
          {current.type === 'spread' && <CollageSpread key={`spread-${page}`} content={content} spread={current} page={visiblePageNumbers[page]} />}
          {current.type === 'final' && <FinalPage key={`final-${page}`} content={content} page={page} />}
        </AnimatePresence>
      </div>
      <div className="sketchbook-controls" aria-label="Sketchbook page controls">
        <button type="button" className="sketchbook-control" onClick={goBack} disabled={page === 0}><span>&lt;</span> PREV</button>
        <span className="sketchbook-page-indicator" id="scrapbook-title" aria-live="polite">{visiblePageNumbers[page]} / 8</span>
        <button type="button" className="sketchbook-control" onClick={goForward}>{isLast ? 'LETTER' : 'NEXT'} <span>&gt;</span></button>
      </div>
    </section>
  )
}
