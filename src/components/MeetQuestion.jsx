import { useState, useRef, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Heart } from 'lucide-react'

export default function MeetQuestion({ onNext }) {
  const [showQuestion, setShowQuestion] = useState(false)
  const [answer, setAnswer] = useState(null)
  const [noPosition, setNoPosition] = useState({ x: 0, y: 0 })
  const containerRef = useRef(null)
  const noButtonRef = useRef(null)

  const handleMouseMove = (e) => {
    if (!noButtonRef.current || !containerRef.current) return
    const containerRect = containerRef.current.getBoundingClientRect()
    const noRect = noButtonRef.current.getBoundingClientRect()
    const noCenterX = noRect.left + noRect.width / 2
    const noCenterY = noRect.top + noRect.height / 2
    const distance = Math.sqrt(Math.pow(e.clientX - noCenterX, 2) + Math.pow(e.clientY - noCenterY, 2))
    if (distance < 120) {
      const maxX = containerRect.width - noRect.width - 20
      const maxY = containerRect.height - noRect.height - 20
      const newX = Math.max(20, Math.min(maxX, noPosition.x + (Math.random() - 0.5) * 200))
      const newY = Math.max(20, Math.min(maxY, noPosition.y + (Math.random() - 0.5) * 200))
      setNoPosition({ x: newX, y: newY })
    }
  }

  const handleAnswer = (choice) => {
    setAnswer(choice)
    if (choice === 'yes') {
      setTimeout(onNext, 2500)
    } else {
      setTimeout(onNext, 4000)
    }
  }

  return (
    <div className="relative min-h-screen flex items-center justify-center px-6">
      <div className="absolute inset-0 bg-gradient-to-br from-rose-900/90 via-rose-800/90 to-rose-900/90" />

      <motion.div
        className="relative z-10 text-center max-w-lg mx-auto"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1 }}
        ref={containerRef}
        onMouseMove={handleMouseMove}
      >
        <AnimatePresence mode="wait">
          {!showQuestion ? (
            <motion.div
              key="build-up"
              className="space-y-6"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
            >
              {['Okay...', 'Enough promises.', 'Now I have one real question.'].map((text, i) => (
                <motion.p
                  key={i}
                  className="font-serif text-2xl md:text-3xl text-rose-100 italic"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 1.2, duration: 0.8 }}
                >
                  {text}
                </motion.p>
              ))}

              <motion.div
                className="pt-8"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 4 }}
              >
                <motion.button
                  onClick={() => setShowQuestion(true)}
                  className="text-rose-200 hover:text-white text-lg underline underline-offset-4 decoration-rose-400 transition-colors"
                  whileHover={{ scale: 1.05 }}
                >
                  I&apos;m ready →
                </motion.button>
              </motion.div>
            </motion.div>
          ) : (
            <motion.div
              key="question"
              className="space-y-8"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8 }}
            >
              <motion.h2
                className="font-romantic text-5xl md:text-7xl text-white mb-4"
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
              >
                Can we meet? <Heart className="inline w-12 h-12 md:w-16 md:h-16 text-rose-300" fill="currentColor" />
              </motion.h2>

              <motion.p
                className="text-rose-100 text-lg md:text-xl italic"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.6 }}
              >
                I don&apos;t need a perfect place.<br />
                I just want a little time with you.
              </motion.p>

              <AnimatePresence mode="wait">
                {!answer ? (
                  <motion.div
                    key="buttons"
                    className="flex flex-col sm:flex-row gap-4 justify-center pt-8 relative"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.9 }}
                  >
                    <motion.button
                      onClick={() => handleAnswer('yes')}
                      className="px-10 py-4 rounded-full bg-rose-400 text-white font-medium text-xl shadow-lg shadow-rose-900/50 hover:bg-rose-300 transition-all"
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                    >
                      Yes ❤️
                    </motion.button>

                    <motion.button
                      ref={noButtonRef}
                      onClick={() => handleAnswer('no')}
                      className="px-10 py-4 rounded-full bg-white/10 backdrop-blur-sm text-rose-100 font-medium text-xl border border-white/20 hover:bg-white/20 transition-all"
                      style={{
                        position: noPosition.x !== 0 || noPosition.y !== 0 ? 'relative' : 'static',
                        left: noPosition.x !== 0 || noPosition.y !== 0 ? `${noPosition.x}px` : 'auto',
                        top: noPosition.y !== 0 || noPosition.y !== 0 ? `${noPosition.y}px` : 'auto',
                      }}
                      animate={
                        noPosition.x !== 0 || noPosition.y !== 0
                          ? { x: noPosition.x, y: noPosition.y }
                          : { x: 0, y: 0 }
                      }
                      transition={{ type: 'spring', stiffness: 300, damping: 20 }}
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                    >
                      No 🙈
                    </motion.button>
                  </motion.div>
                ) : answer === 'yes' ? (
                  <motion.div
                    key="yes"
                    className="space-y-4 pt-8"
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.6 }}
                  >
                    <motion.div
                      className="flex justify-center gap-2"
                      animate={{ y: [0, -20, 0] }}
                      transition={{ duration: 1, repeat: Infinity }}
                    >
                      {[...Array(5)].map((_, i) => (
                        <motion.div
                          key={i}
                          animate={{ scale: [1, 1.3, 1] }}
                          transition={{ duration: 0.8, delay: i * 0.1, repeat: Infinity }}
                        >
                          <Heart className="w-8 h-8 text-rose-300" fill="currentColor" />
                        </motion.div>
                      ))}
                    </motion.div>
                    <motion.p
                      className="font-romantic text-4xl text-white"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ delay: 0.5 }}
                    >
                      Then it&apos;s a date. ❤️
                    </motion.p>
                  </motion.div>
                ) : (
                  <motion.div
                    key="no"
                    className="space-y-6 pt-8"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 0.6 }}
                  >
                    <motion.p
                      className="font-romantic text-3xl text-rose-200"
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                    >
                      Okay...
                    </motion.p>
                    <motion.p
                      className="text-rose-100 text-lg"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ delay: 0.3 }}
                    >
                      I&apos;ll respect that. ❤️
                    </motion.p>
                    <motion.p
                      className="text-rose-200/70 italic text-lg"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ delay: 0.6 }}
                    >
                      But whenever you&apos;re ready,<br />
                      the invitation stays open.
                    </motion.p>
                    <motion.button
                      onClick={onNext}
                      className="mt-8 px-8 py-3 rounded-full bg-rose-400/20 backdrop-blur-sm text-rose-100 border border-rose-300/30 hover:bg-rose-400/30 transition-all"
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                    >
                      Continue →
                    </motion.button>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>
    </div>
  )
}
