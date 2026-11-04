import { useCallback, useEffect, useState } from 'react'
import { birthdayContent } from './data/birthdayContent'
import { BirthdayCelebration } from './components/BirthdayCelebration'
import { BirthdayLanding } from './components/BirthdayLanding'
import { Countdown } from './components/Countdown'
import { LetterScene } from './components/LetterScene'
import { MusicControl } from './components/MusicControl'
import { PhotoGallery } from './components/PhotoGallery'
import { SceneTransition } from './components/SceneTransition'
import { Scrapbook } from './components/Scrapbook'

const scenes = [
  { key: 'countdown', render: (next) => <Countdown content={birthdayContent} onComplete={next} /> },
  { key: 'celebration', render: (next) => <BirthdayCelebration content={birthdayContent} onContinue={next} /> },
  { key: 'landing', render: (next) => <BirthdayLanding content={birthdayContent} onContinue={next} /> },
  { key: 'gallery', render: (next) => <PhotoGallery content={birthdayContent} onContinue={next} /> },
  { key: 'scrapbook', render: (next) => <Scrapbook content={birthdayContent} onContinue={next} /> },
  { key: 'letter', render: (restart) => <LetterScene content={birthdayContent} onRestart={restart} /> },
]

function App() {
  const [sceneIndex, setSceneIndex] = useState(0)
  const nextScene = useCallback(() => setSceneIndex((current) => Math.min(scenes.length - 1, current + 1)), [])
  const restart = useCallback(() => setSceneIndex(0), [])

  useEffect(() => {
    const onKeyDown = (event) => {
      if (event.key === 'ArrowDown' || event.key === 'PageDown') nextScene()
      if (event.key === 'ArrowUp' || event.key === 'PageUp') setSceneIndex((current) => Math.max(0, current - 1))
    }
    window.addEventListener('keydown', onKeyDown)
    return () => window.removeEventListener('keydown', onKeyDown)
  }, [nextScene])

  const scene = scenes[sceneIndex]
  return (
    <div className={`app-frame app-scene-${scene.key}`}>
      <SceneTransition sceneKey={scene.key}>{scene.render(sceneIndex === scenes.length - 1 ? restart : nextScene)}</SceneTransition>
      {sceneIndex < scenes.length - 1 && <MusicControl src={birthdayContent.audioPath} />}
    </div>
  )
}

export default App
