import { useEffect } from 'react'
import { ArrowRight, Flame, Sparkles } from 'lucide-react'

export function AgeTransition({ content, onComplete }) {
  useEffect(() => {
    const timer = window.setTimeout(onComplete, 3000)
    return () => window.clearTimeout(timer)
  }, [onComplete])

  return (
    <section className="age-transition" aria-labelledby="age-transition-title">
      <div className="burning-glow" aria-hidden="true" />
      <div className="ember-field" aria-hidden="true">
        {Array.from({ length: 18 }, (_, index) => <span key={index} style={{ '--ember-index': index }} />)}
      </div>
      <p className="eyebrow eyebrow-light">A new chapter is opening</p>
      <h1 id="age-transition-title">Leave the old<br /><em>year behind.</em></h1>
      <div className="age-change" aria-live="polite">
        <div className="age-card age-card-old"><span>{content.oldAge}</span><small>the old age</small></div>
        <div className="age-arrow"><Flame size={18} /><ArrowRight size={23} /></div>
        <div className="age-card age-card-new"><Sparkles className="age-spark" size={17} /><span>{content.newAge}</span><small>your new age</small></div>
      </div>
      <p className="age-caption">Burning brighter, becoming more you.</p>
      <button type="button" className="text-button light age-skip" onClick={onComplete}>
        <span>Enter your new chapter</span><ArrowRight size={17} />
      </button>
    </section>
  )
}
