import { useEffect, useRef, useState } from 'react'

export function useAnimatedNumber(target: number, duration = 280) {
  const [value, setValue] = useState(target)
  const frame = useRef<number | null>(null)
  const fromRef = useRef(target)

  useEffect(() => {
    const reduce =
      typeof window !== 'undefined' &&
      window.matchMedia('(prefers-reduced-motion: reduce)').matches
    if (reduce) {
      setValue(target)
      fromRef.current = target
      return
    }

    const from = fromRef.current
    const start = performance.now()

    const tick = (now: number) => {
      const t = Math.min(1, (now - start) / duration)
      const eased = 1 - Math.pow(1 - t, 3)
      const next = from + (target - from) * eased
      setValue(next)
      if (t < 1) {
        frame.current = requestAnimationFrame(tick)
      } else {
        fromRef.current = target
      }
    }

    frame.current = requestAnimationFrame(tick)
    return () => {
      if (frame.current) cancelAnimationFrame(frame.current)
    }
  }, [target, duration])

  return value
}
