import { useRef } from 'react'
import { motion } from 'framer-motion'
import { Heart } from 'lucide-react'

export function PolaroidCard({ photo, index, onOpen }) {
  const suppressClickRef = useRef(false)
  const dragRef = useRef(null)
  const offsetRef = useRef({ x: 0, y: 0 })

  const startDrag = (event) => {
    if (event.button !== 0) return
    dragRef.current = {
      pointerId: event.pointerId,
      startX: event.clientX,
      startY: event.clientY,
      offsetX: offsetRef.current.x,
      offsetY: offsetRef.current.y,
      moved: false,
    }
    event.currentTarget.setPointerCapture(event.pointerId)
  }

  const moveDrag = (event) => {
    const drag = dragRef.current
    if (!drag || drag.pointerId !== event.pointerId) return
    const deltaX = event.clientX - drag.startX
    const deltaY = event.clientY - drag.startY
    if (!drag.moved && Math.hypot(deltaX, deltaY) > 4) {
      drag.moved = true
      suppressClickRef.current = true
      event.currentTarget.classList.add('is-dragging')
      event.currentTarget.style.zIndex = '20'
    }
    if (!drag.moved) return
    offsetRef.current = { x: drag.offsetX + deltaX, y: drag.offsetY + deltaY }
    event.currentTarget.style.translate = `${offsetRef.current.x}px ${offsetRef.current.y}px`
  }

  const endDrag = (event) => {
    const drag = dragRef.current
    if (!drag || drag.pointerId !== event.pointerId) return
    dragRef.current = null
    if (event.currentTarget.hasPointerCapture(event.pointerId)) event.currentTarget.releasePointerCapture(event.pointerId)
    if (drag.moved) {
      event.currentTarget.classList.remove('is-dragging')
      event.currentTarget.style.zIndex = '10'
      window.setTimeout(() => { suppressClickRef.current = false }, 0)
    }
  }

  return (
    <motion.button
      type="button"
      className={`polaroid-card polaroid-${(index % 6) + 1}`}
      onPointerDown={startDrag}
      onPointerMove={moveDrag}
      onPointerUp={endDrag}
      onPointerCancel={endDrag}
      onDragStart={(event) => event.preventDefault()}
      onClick={(event) => {
        if (suppressClickRef.current) {
          event.preventDefault()
          event.stopPropagation()
          suppressClickRef.current = false
          return
        }
        onOpen(index)
      }}
      whileHover={{ y: -10, rotate: (index % 2 ? 2 : -2) }}
      whileTap={{ scale: 0.98 }}
      whileFocus={{ zIndex: 10 }}
      aria-label={`Open photo ${index + 1}: ${photo.caption}`}
    >
      <span className="card-heart" aria-hidden="true"><Heart size={16} fill="currentColor" strokeWidth={1} /></span>
      <span className="polaroid-image-wrap"><img src={photo.src} alt={photo.alt} draggable={false} /></span>
      <span className="polaroid-caption">{photo.caption}</span>
      <span className="polaroid-number">{photo.tag}</span>
    </motion.button>
  )
}
