import { AnimatePresence, motion } from 'framer-motion'

export function SceneTransition({ sceneKey, children }) {
  return (
    <AnimatePresence mode="wait">
      <motion.main
        key={sceneKey}
        className="scene-shell"
        initial={{ opacity: 0, y: 18 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -18 }}
        transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
      >
        {children}
      </motion.main>
    </AnimatePresence>
  )
}
