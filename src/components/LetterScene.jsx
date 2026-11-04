import { useState } from 'react'
import { motion } from 'framer-motion'
import { Gift, Heart, RotateCcw } from 'lucide-react'
import { MusicControl } from './MusicControl'

export function LetterScene({ content, onRestart }) {
  const [opened, setOpened] = useState(false)
  const [videoRevealed, setVideoRevealed] = useState(false)
  const [videoAvailable, setVideoAvailable] = useState(Boolean(content.letterVideoPath))

  return (
    <section className="scene scene-letter" aria-labelledby="letter-title">
      <div className="letter-light" aria-hidden="true" />
      <div className="letter-topline"><span className="seal-mark seal-dark">M<span>♥</span></span><span className="eyebrow">The last little thing</span><span className="topline-note">06 / 06</span></div>
      {!opened ? (
        <motion.div className="letter-envelope" initial={{ opacity: 0, y: 22 }} animate={{ opacity: 1, y: 0 }}>
          <span className="envelope-flap" aria-hidden="true" />
          <Heart className="envelope-heart" fill="currentColor" strokeWidth={1} size={31} aria-hidden="true" />
          <p className="eyebrow">For {content.nickname}</p>
          <h1 id="letter-title">One more<br /><em>little note.</em></h1>
          <button type="button" className="line-button line-button-dark" onClick={() => setOpened(true)}><span>Open the letter</span><Heart size={16} strokeWidth={1.4} /></button>
        </motion.div>
      ) : (
        <motion.article className="letter-paper" initial={{ opacity: 0, y: 26, rotate: -1.5 }} animate={{ opacity: 1, y: 0, rotate: 0 }} transition={{ duration: 0.75 }}>
          <div className="paper-corner" aria-hidden="true">♥</div>
          <p className="eyebrow">Dear {content.nickname}</p>
          <h1 id="letter-title">Happy Birthday<span>.</span></h1>
          <div className="letter-body">{content.letter.split('\n').map((paragraph, index) => paragraph ? <p key={`${paragraph}-${index}`}>{paragraph}</p> : <span className="letter-break" key={`break-${index}`} />)}</div>
          <div className="letter-wish"><span>your birthday wish</span><p>{content.finalWish}</p></div>
          <div className="letter-media" aria-label="A private birthday video and song">
            <div className="letter-media-heading"><span className="eyebrow">A little something to watch</span><span className="letter-media-rule" /></div>
            <div id="letter-video-reveal">
              {!videoRevealed ? (
                <button type="button" className="letter-surprise-box" onClick={() => setVideoRevealed(true)} aria-expanded="false" aria-controls="letter-video-reveal">
                  <span className="surprise-box-art" aria-hidden="true"><span className="surprise-box-bow" /></span>
                  <span className="surprise-box-copy"><span className="eyebrow">A gift for you</span><strong>Open your surprise</strong><span>There is one more thing inside.</span></span>
                  <Gift className="surprise-box-icon" size={21} strokeWidth={1.5} aria-hidden="true" />
                </button>
              ) : (
                <motion.div className="letter-video-reveal" initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }}>
                  {videoAvailable ? (
                    <video className="letter-video" controls playsInline preload="metadata" poster={content.letterVideoPoster || undefined} onError={() => setVideoAvailable(false)}>
                      <source src={content.letterVideoPath} />
                      Your browser does not support the birthday video.
                    </video>
                  ) : (
                    <div className="letter-video-placeholder">Add your video at <code>public/video/birthday-letter.mp4</code>.</div>
                  )}
                  <div className="letter-audio-row">
                    <p>Press play when you are ready.</p>
                    <MusicControl src={content.letterAudioPath} label="letter song" unavailableLabel="add letter song" inline />
                  </div>
                </motion.div>
              )}
            </div>
          </div>
        </motion.article>
      )}
      <div className="letter-footer"><p>{opened ? 'Keep this little corner for a rainy day.' : 'Made slowly, with a very full heart.'}</p><button type="button" className="restart-button" onClick={onRestart}><RotateCcw size={15} /> start again</button></div>
    </section>
  )
}
