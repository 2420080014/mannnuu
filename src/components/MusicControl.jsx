import { useEffect, useRef, useState } from 'react'
import { Music, Volume2, VolumeX } from 'lucide-react'

export function MusicControl({ src, label = 'music', unavailableLabel = 'add a song', inline = false }) {
  const audioRef = useRef(null)
  const [playing, setPlaying] = useState(false)
  const [available, setAvailable] = useState(true)

  useEffect(() => {
    const audio = audioRef.current
    if (!audio) return undefined
    const onError = () => {
      setAvailable(false)
      setPlaying(false)
    }
    const startPlayback = () => {
      audio.play().then(() => {
        setPlaying(true)
        document.removeEventListener('pointerdown', startPlayback)
        document.removeEventListener('keydown', startPlayback)
      }).catch(() => {})
    }
    audio.addEventListener('error', onError)
    audio.play().then(() => setPlaying(true)).catch(() => {
      document.addEventListener('pointerdown', startPlayback)
      document.addEventListener('keydown', startPlayback)
    })
    return () => {
      audio.removeEventListener('error', onError)
      document.removeEventListener('pointerdown', startPlayback)
      document.removeEventListener('keydown', startPlayback)
    }
  }, [])

  const toggle = async () => {
    const audio = audioRef.current
    if (!audio || !available) return
    if (playing) {
      audio.pause()
      setPlaying(false)
      return
    }
    try {
      await audio.play()
      setPlaying(true)
    } catch {
      setAvailable(false)
      setPlaying(false)
    }
  }

  return (
    <div className={`music-control${inline ? ' music-control-inline' : ''}`}>
      <audio ref={audioRef} src={src} loop preload="metadata" aria-hidden="true" />
      <button
        type="button"
        className="icon-button"
        onClick={toggle}
        aria-label={available ? (playing ? `Pause ${label}` : `Play ${label}`) : `${label} unavailable`}
        title={available ? (playing ? `Pause ${label}` : `Play ${label}`) : `Add the local audio file to enable ${label}`}
        disabled={!available}
      >
        {available ? (playing ? <Volume2 size={17} strokeWidth={1.6} /> : <Music size={17} strokeWidth={1.6} />) : <VolumeX size={17} strokeWidth={1.6} />}
      </button>
      <span className="music-label">{available ? (playing ? 'playing' : label) : unavailableLabel}</span>
    </div>
  )
}
