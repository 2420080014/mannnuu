import { motion } from 'framer-motion'
import { ArrowDown, ArrowRight } from 'lucide-react'

export function BirthdayLanding({ content, onContinue }) {
  const heroPhotos = content.photos.slice(0, 5)
  return (
    <section className="scene scene-landing" aria-labelledby="landing-title">
      <div className="landing-paper-grain" aria-hidden="true" />
      <div className="landing-header">
        <span className="seal-mark seal-dark">M<span>♥</span></span>
        <span className="eyebrow">A note for {content.nickname}</span>
        <span className="topline-note">03 / 06</span>
      </div>
      <div className="landing-layout">
        <div className="landing-copy">
          <p className="eyebrow">Made for one person</p>
          <h1 id="landing-title">Happy<br />Birthday<br /><span>{content.nickname}</span></h1>
          <p className="landing-intro">{content.intro}</p>
          <button type="button" className="line-button" onClick={onContinue}>
            <span>Keep exploring</span><ArrowRight size={17} strokeWidth={1.5} />
          </button>
        </div>
        <div className="film-arc" aria-label="A curved collection of placeholder memory photographs">
          {heroPhotos.map((photo, index) => (
            <motion.figure key={photo.tag} className={`film-photo film-photo-${index + 1}`} initial={{ opacity: 0, y: 36, rotate: index % 2 ? 4 : -4 }} whileInView={{ opacity: 1, y: 0, rotate: (index - 2) * 4 }} viewport={{ once: true }} transition={{ delay: index * 0.1, duration: 0.7 }}>
              <img src={photo.src} alt={photo.alt} />
              <figcaption>{photo.tag} / {photo.caption}</figcaption>
            </motion.figure>
          ))}
          <span className="film-arc-line" aria-hidden="true" />
        </div>
      </div>
      <div className="landing-scroll-cue"><ArrowDown size={16} /><span>there is more to discover</span></div>
    </section>
  )
}
