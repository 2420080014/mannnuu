import { ArrowDown, ArrowRight } from 'lucide-react'

const photoRotations = [-8, 4, -2, 7, -5]

export function BirthdayLanding({ content, onContinue }) {
  const heroPhotos = content.photos.slice(0, 8)
  const filmPhotos = heroPhotos.length
    ? Array.from({ length: 20 }, (_, index) => heroPhotos[index % heroPhotos.length])
    : []
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
        <div className="film-arc" aria-label="A looping trail of memory photographs">
          {filmPhotos.map((photo, index) => (
            <figure key={`${photo.tag}-${index}`} className="film-photo" style={{ '--film-delay': `${-index * 1.8}s`, '--film-position': `${index * 5}%`, '--film-rotation': `${photoRotations[index % photoRotations.length]}deg` }}>
              <img src={photo.src} alt={photo.alt} />
            </figure>
          ))}
          <span className="film-arc-line" aria-hidden="true" />
        </div>
      </div>
      <div className="landing-scroll-cue"><ArrowDown size={16} /><span>there is more to discover</span></div>
    </section>
  )
}
