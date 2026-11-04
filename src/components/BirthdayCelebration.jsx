import { useEffect, useRef, useState } from 'react'
import { ArrowUpRight, Mic, MicOff, RotateCcw } from 'lucide-react'
import { DecorativeParticles } from './DecorativeParticles'

const litAtStart = [true, true, true]

export function BirthdayCelebration({ content, onContinue }) {
  const [candles, setCandles] = useState(litAtStart)
  const [activeWishIndex, setActiveWishIndex] = useState(null)
  const [listening, setListening] = useState(false)
  const [micMessage, setMicMessage] = useState('Tap the candles if you prefer.')
  const streamRef = useRef(null)
  const analyserRef = useRef(null)
  const animationRef = useRef(null)
  const lastBlowRef = useRef(0)
  const audioContextRef = useRef(null)

  const extinguishCandle = (requestedIndex = null) => {
    setCandles((current) => {
      const next = [...current]
      const candleIndex = requestedIndex === null ? next.findIndex(Boolean) : requestedIndex
      if (candleIndex >= 0 && next[candleIndex]) {
        next[candleIndex] = false
        setActiveWishIndex(candleIndex)
      }
      return next
    })
  }

  const stopListening = () => {
    if (animationRef.current) cancelAnimationFrame(animationRef.current)
    streamRef.current?.getTracks().forEach((track) => track.stop())
    audioContextRef.current?.close?.()
    animationRef.current = null
    streamRef.current = null
    analyserRef.current = null
    audioContextRef.current = null
    setListening(false)
  }

  const monitorMicrophone = () => {
    const analyser = analyserRef.current
    if (!analyser) return
    const samples = new Uint8Array(analyser.fftSize)
    analyser.getByteTimeDomainData(samples)
    const volume = samples.reduce((sum, sample) => sum + Math.abs(sample - 128), 0) / samples.length
    const now = Date.now()
    if (volume > 9 && now - lastBlowRef.current > 850) {
      lastBlowRef.current = now
      extinguishCandle()
      setMicMessage('One candle down. Keep going.')
    }
    animationRef.current = requestAnimationFrame(monitorMicrophone)
  }

  const startListening = async () => {
    if (!navigator.mediaDevices?.getUserMedia) {
      setMicMessage('Microphone access is unavailable. Tap each candle instead.')
      return
    }
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true })
      const AudioContextClass = window.AudioContext || window.webkitAudioContext
      if (!AudioContextClass) throw new Error('AudioContext unavailable')
      const audioContext = new AudioContextClass()
      const analyser = audioContext.createAnalyser()
      analyser.fftSize = 512
      audioContext.createMediaStreamSource(stream).connect(analyser)
      streamRef.current = stream
      audioContextRef.current = audioContext
      analyserRef.current = analyser
      setListening(true)
      setMicMessage('Blow toward your microphone.')
      monitorMicrophone()
    } catch {
      setMicMessage('Microphone access was not granted. Tap each candle instead.')
    }
  }

  const resetCandles = () => {
    stopListening()
    setCandles(litAtStart)
    setActiveWishIndex(null)
    setMicMessage('Tap the candles if you prefer.')
  }

  const allBlownOut = candles.every((candle) => !candle)

  useEffect(() => {
    if (allBlownOut) stopListening()
  }, [allBlownOut])

  useEffect(() => () => {
    if (animationRef.current) cancelAnimationFrame(animationRef.current)
    streamRef.current?.getTracks().forEach((track) => track.stop())
    audioContextRef.current?.close?.()
  }, [])

  return (
    <section className="scene scene-celebration scene-cake" aria-labelledby="celebration-title">
      <div className="celebration-glow" aria-hidden="true" />
      <DecorativeParticles count={18} tone="warm" />
      <div className="cake-copy">
        <p className="eyebrow eyebrow-light">Make a wish</p>
        <h1 id="celebration-title">Happy<br /><em>Birthday</em></h1>
        <p className="cake-name">{content.nickname}</p>
      </div>
      <div className="cake-stage" aria-label="Birthday cake with three candles">
        <div className="candle-row">
          {candles.map((lit, index) => (
            <button type="button" className={`candle-button${lit ? '' : ' is-out'}`} key={index} onClick={() => extinguishCandle(index)} aria-label={lit ? `Blow out candle ${index + 1}` : `Candle ${index + 1} is blown out`}>
              <span className="flame" aria-hidden="true" />
              <span className="candle-wick" aria-hidden="true" />
              <span className="candle-body" aria-hidden="true"><i /></span>
            </button>
          ))}
        </div>
        <div className="cake-top" aria-hidden="true"><span>♥</span></div>
        <div className="cake-layer cake-layer-top" aria-hidden="true" />
        <div className="cake-layer cake-layer-bottom" aria-hidden="true" />
        <div className="cake-plate" aria-hidden="true" />
      </div>
      <div className="blow-controls">
        {!allBlownOut && (
          <>
            {activeWishIndex !== null && (
              <p className="candle-wish" aria-live="polite">{content.candleWishes?.[activeWishIndex]}</p>
            )}
            <button type="button" className="text-button light mic-button" onClick={listening ? stopListening : startListening}>
              {listening ? <MicOff size={16} /> : <Mic size={16} />}
              <span>{listening ? 'Stop listening' : 'Blow out the candles'}</span>
            </button>
            <span className="blow-hint">{micMessage}</span>
          </>
        )}
        {allBlownOut && (
          <div className="wish-reveal">
            <p>{content.candleRevealText}</p>
            <div className="wish-actions">
              <button type="button" className="circle-cta cake-cta" onClick={onContinue} aria-label="Open your surprise"><span>Open<br />your<br />surprise</span><ArrowUpRight size={19} strokeWidth={1.4} /></button>
              <button type="button" className="reset-candles" onClick={resetCandles}><RotateCcw size={14} /> light again</button>
            </div>
          </div>
        )}
      </div>
      <span className="celebration-index">02 / 06</span>
    </section>
  )
}
