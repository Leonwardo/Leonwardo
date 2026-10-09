import { useEffect, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

interface LoaderProps {
  onComplete: () => void
}

export default function Loader({ onComplete }: LoaderProps) {
  const [progress, setProgress] = useState(0)
  const [done, setDone] = useState(false)

  useEffect(() => {
    const duration = 2200
    const start = performance.now()

    const tick = (now: number) => {
      const elapsed = now - start
      const p = Math.min(elapsed / duration, 1)
      // ease out cubic
      const eased = 1 - Math.pow(1 - p, 3)
      setProgress(Math.floor(eased * 100))

      if (p < 1) {
        requestAnimationFrame(tick)
      } else {
        setTimeout(() => {
          setDone(true)
          setTimeout(onComplete, 600)
        }, 300)
      }
    }

    requestAnimationFrame(tick)
  }, [onComplete])

  return (
    <AnimatePresence>
      {!done && (
        <motion.div
          className="fixed inset-0 z-[100] flex flex-col items-center justify-center bg-[#0A0A0B]"
          exit={{ opacity: 0, transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] } }}
        >
          {/* Background grid */}
          <div className="absolute inset-0 opacity-20"
            style={{
              backgroundImage: `linear-gradient(rgba(196,30,58,0.15) 1px, transparent 1px),
                                linear-gradient(90deg, rgba(196,30,58,0.15) 1px, transparent 1px)`,
              backgroundSize: '60px 60px',
            }}
          />

          <div className="relative z-10 flex flex-col items-center gap-8">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              className="text-center"
            >
              <p className="text-xs tracking-[0.35em] uppercase text-zinc-500 mb-3">Leonwardo</p>
              <h1 className="text-4xl md:text-5xl font-semibold tracking-tight text-white">
                Loading system
              </h1>
            </motion.div>

            <div className="w-64 md:w-80">
              <div className="h-[2px] w-full bg-zinc-800 overflow-hidden rounded-full">
                <motion.div
                  className="h-full bg-gradient-to-r from-accent to-gold"
                  style={{ width: `${progress}%` }}
                  transition={{ duration: 0.1 }}
                />
              </div>
              <div className="mt-3 flex justify-between text-xs text-zinc-500 font-mono">
                <span>INITIALIZING</span>
                <span>{progress}%</span>
              </div>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
