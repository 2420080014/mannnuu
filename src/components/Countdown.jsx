import { useEffect, useRef, useState } from 'react'
import { ArrowDownRight, ArrowRight } from 'lucide-react'
import { useCountdown } from '../hooks/useCountdown'
import { DecorativeParticles } from './DecorativeParticles'
import { AgeTransition } from './AgeTransition'

const pad = (value) => String(value).padStart(2, '0')

function SplitFlapNumber({ value, large = false }) {
  return (
    <span className={`split-flap-number ${large ? 'split-flap-large' : ''}`} aria-hidden="true">
      {pad(value).split('').map((digit, index) => <span className="split-flap-digit" key={`${digit}-${index}`}>{digit}</span>)}
    </span>
  )
}

export function Countdown({ content, onComplete }) {
  const time = useCountdown(content.birthdayDate, content.countdownPreviewMode, content.countdownPreviewSeconds)
  const [burning, setBurning] = useState(false)
  const sentRef = useRef(false)

  const startTransition = () => {
    if (sentRef.current) return
    sentRef.current = true
    setBurning(true)
  }

  useEffect(() => {
    if (time.complete) startTransition()
  }, [time.complete])

  if (burning) return <AgeTransition content={content} onComplete={onComplete} />

  const calendarDate = content.birthdayDate.slice(0, 10)
  const dateLabel = new Intl.DateTimeFormat('en-US', { month: 'short', day: 'numeric', timeZone: 'UTC' }).format(new Date(`${calendarDate}T12:00:00Z`)).toUpperCase()

  return (
    <section className="scene scene-countdown" aria-labelledby="countdown-title">
      <div className="countdown-image-backdrop" aria-hidden="true" style={{ backgroundImage: content.countdownBackgroundImage ? `url("${content.countdownBackgroundImage}")` : undefined }} />
      <DecorativeParticles count={13} tone="warm" />
      <div className="countdown-topline">
        <span className="seal-mark">M<span>♥</span></span>
        <span className="eyebrow eyebrow-light timer-production">A little birthday film · live {dateLabel}</span>
        <span className="topline-note">01 / 06</span>
      </div>
      <div className="countdown-stage">
        <p className="eyebrow eyebrow-light">For {content.nickname}</p>
        <h1 id="countdown-title" className="timer-heading">Doors open<br /><em>at midnight.</em></h1>
        <div className="timer-display" aria-live="polite" aria-label={`${time.days} days, ${time.hours} hours, ${time.minutes} minutes, and ${time.seconds} seconds remaining`}>
          <div className="timer-unit timer-days">
            <SplitFlapNumber value={time.days} large />
            <span className="timer-label">days to celebrate</span>
          </div>
          <div className="timer-row">
            <div className="timer-unit"><SplitFlapNumber value={time.hours} /><span className="timer-label">hrs</span></div>
            <div className="timer-unit"><SplitFlapNumber value={time.minutes} /><span className="timer-label">min</span></div>
            <div className="timer-unit"><SplitFlapNumber value={time.seconds} /><span className="timer-label">sec</span></div>
          </div>
        </div>
      </div>
      <div className="countdown-footer">
        <button type="button" className="text-button light" onClick={startTransition}>
          <span>{content.countdownPreviewMode ? 'Preview the new age' : 'Open when ready'}</span>
          <ArrowRight size={17} strokeWidth={1.5} />
        </button>
        <span className="scroll-note"><ArrowDownRight size={16} /> take your time</span>
      </div>
    </section>
  )
}
