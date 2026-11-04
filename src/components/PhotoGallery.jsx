import { useEffect, useRef, useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { ArrowLeft, ArrowRight, X } from 'lucide-react'
import { PolaroidCard } from './PolaroidCard'

export function PhotoGallery({ content, onContinue }) {
  const [selected, setSelected] = useState(null)
  const triggerRef = useRef(null)
  const dialogRef = useRef(null)
  const activePhoto = selected === null ? null : content.photos[selected]

  const openPhoto = (index) => {
    triggerRef.current = document.activeElement
    setSelected(index)
  }

  const closePhoto = () => {
    setSelected(null)
    window.setTimeout(() => triggerRef.current?.focus(), 0)
  }

  useEffect(() => {
    if (selected === null) return undefined
    dialogRef.current?.focus()
    const onKeyDown = (event) => {
      if (event.key === 'Escape') closePhoto()
      if (event.key === 'ArrowLeft') setSelected((current) => (current - 1 + content.photos.length) % content.photos.length)
      if (event.key === 'ArrowRight') setSelected((current) => (current + 1) % content.photos.length)
      if (event.key === 'Tab') {
        const focusable = [...(dialogRef.current?.querySelectorAll('button:not([disabled])') ?? [])]
        const first = focusable[0]
        const last = focusable[focusable.length - 1]
        if (!first || !last) return
        if (event.shiftKey && document.activeElement === first) {
          event.preventDefault()
          last.focus()
        } else if (!event.shiftKey && document.activeElement === last) {
          event.preventDefault()
          first.focus()
        }
      }
    }
    window.addEventListener('keydown', onKeyDown)
    const previousOverflow = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    return () => {
      window.removeEventListener('keydown', onKeyDown)
      document.body.style.overflow = previousOverflow
    }
  }, [selected, content.photos.length])

  return (
    <section className="scene scene-gallery" aria-labelledby="gallery-title">
      <div className="gallery-topline">
        <div><span className="eyebrow">The memory wall</span><h1 id="gallery-title">Little things<br /><em>worth keeping.</em></h1></div>
        <span className="topline-note">04 / 06</span>
      </div>
      <div className="polaroid-wall">
        {content.photos.map((photo, index) => <PolaroidCard key={photo.tag} photo={photo} index={index} onOpen={openPhoto} />)}
      </div>
      <div className="gallery-footer">
        <p>Every good story is made of tiny details.</p>
        <button type="button" className="line-button" onClick={onContinue}><span>Turn the page</span><ArrowRight size={17} strokeWidth={1.5} /></button>
      </div>
      <AnimatePresence>
        {activePhoto && (
          <motion.div className="photo-modal" role="dialog" aria-modal="true" aria-labelledby="photo-modal-title" aria-describedby="photo-modal-caption" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onMouseDown={(event) => { if (event.target === event.currentTarget) closePhoto() }}>
            <motion.div ref={dialogRef} className="photo-modal-card" tabIndex={-1} initial={{ y: 30, scale: 0.96 }} animate={{ y: 0, scale: 1 }} exit={{ y: 20, scale: 0.96 }}>
              <h2 id="photo-modal-title" className="sr-only">Photo: {activePhoto.caption}</h2>
              <button type="button" className="modal-close" onClick={closePhoto} aria-label="Close photo"><X size={19} /></button>
              <img src={activePhoto.src} alt={activePhoto.alt} />
              <div className="modal-caption" id="photo-modal-caption"><span>{activePhoto.caption}</span><span>{String(selected + 1).padStart(2, '0')} / {String(content.photos.length).padStart(2, '0')}</span></div>
              <div className="modal-controls">
                <button type="button" className="icon-button icon-button-dark" onClick={() => setSelected((selected - 1 + content.photos.length) % content.photos.length)} aria-label="Previous photo"><ArrowLeft size={18} /></button>
                <button type="button" className="icon-button icon-button-dark" onClick={() => setSelected((selected + 1) % content.photos.length)} aria-label="Next photo"><ArrowRight size={18} /></button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  )
}
