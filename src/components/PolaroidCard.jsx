import { motion } from 'framer-motion'
import { Heart } from 'lucide-react'

export function PolaroidCard({ photo, index, onOpen }) {
  return (
    <motion.button
      type="button"
      className={`polaroid-card polaroid-${(index % 6) + 1}`}
      onClick={() => onOpen(index)}
      whileHover={{ y: -10, rotate: (index % 2 ? 2 : -2) }}
      whileTap={{ scale: 0.98 }}
      aria-label={`Open photo ${index + 1}: ${photo.caption}`}
    >
      <span className="card-heart" aria-hidden="true"><Heart size={16} fill="currentColor" strokeWidth={1} /></span>
      <span className="polaroid-image-wrap"><img src={photo.src} alt={photo.alt} /></span>
      <span className="polaroid-caption">{photo.caption}</span>
      <span className="polaroid-number">{photo.tag}</span>
    </motion.button>
  )
}
