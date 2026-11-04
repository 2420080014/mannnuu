import { useEffect, useMemo, useState } from 'react'

const emptyTime = { total: 0, days: 0, hours: 0, minutes: 0, seconds: 0 }

const fromMilliseconds = (total) => {
  const safeTotal = Math.max(0, total)
  const days = Math.floor(safeTotal / 86400000)
  const hours = Math.floor((safeTotal % 86400000) / 3600000)
  const minutes = Math.floor((safeTotal % 3600000) / 60000)
  const seconds = Math.floor((safeTotal % 60000) / 1000)
  return { total: safeTotal, days, hours, minutes, seconds }
}

export function useCountdown(targetDate, previewMode = false, previewSeconds = 7) {
  const targetTime = useMemo(() => new Date(targetDate).getTime(), [targetDate])
  const [previewRemaining, setPreviewRemaining] = useState(previewMode ? previewSeconds * 1000 : null)
  const [now, setNow] = useState(() => Date.now())

  useEffect(() => {
    if (previewMode) {
      setPreviewRemaining(previewSeconds * 1000)
      const timer = window.setInterval(() => {
        setPreviewRemaining((value) => Math.max(0, (value ?? 0) - 1000))
      }, 1000)
      return () => window.clearInterval(timer)
    }

    const timer = window.setInterval(() => setNow(Date.now()), 1000)
    return () => window.clearInterval(timer)
  }, [previewMode, previewSeconds])

  const time = previewMode ? fromMilliseconds(previewRemaining ?? 0) : fromMilliseconds(targetTime - now)
  return { ...time, complete: time.total <= 0 }
}

export { emptyTime }
