import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Heart } from 'lucide-react'

const promises = [
  { id: 1, text: 'I promise to listen, even when we don\'t agree.' },
  { id: 2, text: 'I promise to choose understanding over ego.' },
  { id: 3, text: 'I promise that one bad day won\'t become a bad relationship.' },
  { id: 4, text: 'I promise to communicate instead of disappearing.' },
  { id: 5, text: 'I promise to protect what we have.' },
]

export default function PromiseSection({ onNext }) {
  const [currentIndex, setCurrentIndex] = useState(0)
  const [showFinal, setShowFinal] = useState(false)
  const [showWarmMessage, setShowWarmMessage] = useState(false)
  const [hearts, setHearts] = useState([])

  const handleNext = () => {
    if (currentIndex < promises.length - 1) {
      setCurrentIndex(currentIndex + 1)
    } else {
      setShowFinal(true)
    }
  }

  const handleFinalPromise = () => {
    createHeartBurst()
    setTimeout(() => {
      setHearts([])
      setShowWarmMessage(true)
    }, 1500)
  }

  const handleWarmMessageContinue = () => {
    setTimeout(onNext, 1500)
  }

  const createHeartBurst = () => {
    const newHearts = Array.from({ length: 15 }, (_, i) => ({
      id: Date.now() + i,
      angle: (i / 15) * 360,
      distance: 80 + Math.random() * 120,
    }))
    setHearts(newHearts)
    setTimeout(() => setHearts([]), 2000)
  }

  return (
    <div className="relative min-h-screen flex items-center justify-center px-6">
      <div className="absolute inset-0 bg-gradient-to-br from-cream via-soft-pink to-rose-50" />

      <motion.div
        className="relative z-10 text-center max-w-lg mx-auto w-full"
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
      >
        <motion.h2
          className="font-romantic text-4xl md:text-5xl text-rose-500 mb-12"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
        >
          Our Little Promises
        </motion.h2>

        <AnimatePresence mode="wait">
          {!showFinal && currentIndex < promises.length && (
            <motion.div
              key={currentIndex}
              className="glass-card rounded-3xl p-8 md:p-12 mb-8"
              initial={{ opacity: 0, x: 100, rotateY: 15 }}
              animate={{ opacity: 1, x: 0, rotateY: 0 }}
              exit={{ opacity: 0, x: -100, rotateY: -15 }}
              transition={{ duration: 0.6, ease: 'easeInOut' }}
            >
              <div className="flex items-center justify-center gap-3 mb-6">
                <Heart className="w-5 h-5 text-rose-400" fill="currentColor" />
                <span className="text-rose-400 font-medium tracking-wider text-sm uppercase">
                  Promise {String(promises[currentIndex].id).padStart(2, '0')}
                </span>
              </div>

              <p className="font-serif text-2xl md:text-3xl text-gray-700 leading-relaxed italic mb-8">
                &ldquo;{promises[currentIndex].text}&rdquo;
              </p>

              <motion.button
                onClick={handleNext}
                className="btn-primary"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4 }}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                I promise you my love ❤️
              </motion.button>
            </motion.div>
          )}
        </AnimatePresence>

        <AnimatePresence>
          {showFinal && !showWarmMessage && (
            <motion.div
              className="space-y-8"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
            >
              <motion.p
                className="font-romantic text-3xl text-rose-500"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.2 }}
              >
                And most importantly...
              </motion.p>

              <motion.p
                className="font-serif text-xl md:text-2xl text-gray-600 italic leading-relaxed"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5 }}
              >
                I promise to keep choosing us —<br />
                not just today, but for all the ordinary days<br />
                that come after today.
              </motion.p>

              <div className="flex justify-center gap-2 my-8">
                {promises.map((_, i) => (
                  <motion.div
                    key={i}
                    className="w-3 h-3 rounded-full bg-rose-400"
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ delay: 0.8 + i * 0.1 }}
                  />
                ))}
              </div>

              <motion.button
                onClick={handleFinalPromise}
                className="btn-primary"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 1.2 }}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                I promise you my love ❤️
              </motion.button>

              {hearts.map((h) => (
                <motion.div
                  key={h.id}
                  className="fixed text-rose-400 pointer-events-none"
                  style={{
                    left: '50%',
                    top: '50%',
                    marginLeft: -12,
                    marginTop: -12,
                  }}
                  initial={{ scale: 0, opacity: 1 }}
                  animate={{
                    scale: [0, 1.5, 1],
                    opacity: [1, 1, 0],
                    x: Math.cos((h.angle * Math.PI) / 180) * h.distance,
                    y: Math.sin((h.angle * Math.PI) / 180) * h.distance,
                  }}
                  transition={{ duration: 1.5, ease: 'easeOut' }}
                >
                  <Heart size={24} fill="currentColor" />
                </motion.div>
              ))}
            </motion.div>
          )}

          {showWarmMessage && (
            <motion.div
              className="space-y-6"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
            >
              <motion.div
                className="flex justify-center gap-2"
                animate={{ y: [0, -10, 0] }}
                transition={{ duration: 1.5, repeat: Infinity }}
              >
                {[...Array(3)].map((_, i) => (
                  <motion.div
                    key={i}
                    animate={{ scale: [1, 1.2, 1] }}
                    transition={{ duration: 1, delay: i * 0.2, repeat: Infinity }}
                  >
                    <Heart className="w-8 h-8 text-rose-400" fill="currentColor" />
                  </motion.div>
                ))}
              </motion.div>

              <motion.p
                className="font-romantic text-3xl text-rose-500"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
              >
                Take your time...
              </motion.p>

              <motion.p
                className="text-gray-500 text-lg italic"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.6 }}
              >
                I&apos;ll still be here. ❤️
              </motion.p>

              <motion.p
                className="text-rose-400 font-romantic text-xl"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 1 }}
              >
                Whenever you&apos;re ready...
              </motion.p>

              <motion.button
                onClick={handleWarmMessageContinue}
                className="btn-primary mt-4"
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 1.5, type: 'spring' }}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                Please come inside ❤️
              </motion.button>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>
    </div>
  )
}
