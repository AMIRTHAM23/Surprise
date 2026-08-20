import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Heart, BookOpen } from 'lucide-react'

const messages = [
  'Wait...',
  'There\'s something I didn\'t tell you.',
  'This wasn\'t really about asking you for a date.',
  'It was about asking...',
  'Can we keep choosing each other?',
  'For all the little moments that haven\'t happened yet?',
]

export default function FinalSurprise({ onReplay }) {
  const [stage, setStage] = useState(0)
  const [showButton, setShowButton] = useState(false)
  const [showEnding, setShowEnding] = useState(false)
  const [hearts, setHearts] = useState([])

  useEffect(() => {
    if (stage < messages.length) {
      const timer = setTimeout(() => setStage(stage + 1), 1000)
      return () => clearTimeout(timer)
    } else if (stage === messages.length) {
      setTimeout(() => setShowButton(true), 500)
    }
  }, [stage, messages.length])

  const handleYes = () => {
    setShowEnding(true)
    const newHearts = Array.from({ length: 40 }, (_, i) => ({
      id: Date.now() + i,
      angle: (i / 40) * 360,
      distance: 100 + Math.random() * 250,
      size: 14 + Math.random() * 28,
    }))
    setHearts(newHearts)
  }

  return (
    <div className="relative min-h-screen flex items-center justify-center px-6 overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-br from-rose-100 via-soft-pink to-cream" />

      <motion.div
        className="relative z-10 text-center max-w-lg mx-auto"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1 }}
      >
        <AnimatePresence mode="wait">
          {!showEnding ? (
            <motion.div
              key="messages"
              className="space-y-6"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
            >
              {messages.slice(0, stage).map((text, i) => (
                <motion.p
                  key={i}
                  className={`font-serif text-xl md:text-2xl text-gray-600 italic ${
                    i === stage - 1 ? 'text-rose-500' : 'text-gray-400'
                  }`}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8 }}
                >
                  {text}
                </motion.p>
              ))}

              <AnimatePresence>
                {showButton && (
                  <motion.div
                    className="pt-8 space-y-6"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8 }}
                  >
                    <motion.button
                      onClick={handleYes}
                      className="btn-primary text-xl px-12 py-5 relative overflow-hidden"
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                    >
                      <motion.div
                        className="absolute inset-0 bg-gradient-to-r from-rose-300 to-rose-400"
                        animate={{ x: ['-100%', '100%'] }}
                        transition={{ duration: 2, repeat: Infinity, ease: 'linear' }}
                      />
                      <span className="relative flex items-center gap-2">
                        <Heart size={24} fill="currentColor" />
                        Come inside ❤️
                      </span>
                    </motion.button>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          ) : (
            <motion.div
              key="finale"
              className="space-y-8"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8 }}
            >
              <motion.div
                className="flex justify-center gap-4 mb-6"
                animate={{ y: [0, -15, 0] }}
                transition={{ duration: 1.5, repeat: Infinity }}
              >
                {[...Array(5)].map((_, i) => (
                  <motion.div
                    key={i}
                    animate={{ 
                      scale: [1, 1.3, 1], 
                      rotate: [0, 10, -10, 0],
                    }}
                    transition={{ duration: 1.5, delay: i * 0.2, repeat: Infinity }}
                  >
                    <Heart 
                      className={`w-10 h-10 ${i % 2 === 0 ? 'text-rose-500' : 'text-white'}`} 
                      fill="currentColor" 
                    />
                  </motion.div>
                ))}
              </motion.div>

              <motion.h2
                className="font-romantic text-5xl md:text-7xl text-rose-500"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
              >
                I love you.
              </motion.h2>

              <motion.p
                className="text-rose-400 font-romantic text-2xl"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.6 }}
              >
                Then let&apos;s write the rest together. ❤️
              </motion.p>

              <motion.p
                className="text-gray-500 text-xl italic"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.9 }}
              >
                Chapter unlocked.
              </motion.p>

              <motion.p
                className="text-gray-400 text-lg"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 1.2 }}
              >
                Now let&apos;s make the real memories.
              </motion.p>

              <motion.button
                onClick={onReplay}
                className="mt-8 px-6 py-3 rounded-full bg-white/80 backdrop-blur-sm text-rose-600 font-medium border border-rose-100 hover:bg-white transition-all inline-flex items-center gap-2"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <BookOpen size={18} />
                Replay Our Story
              </motion.button>

              <p className="text-gray-400 text-sm mt-8">
                Made with ❤️ just for you
              </p>
            </motion.div>
          )}
        </AnimatePresence>

        {hearts.map((h) => (
          <motion.div
            key={h.id}
            className="fixed text-rose-400 pointer-events-none"
            style={{
              left: '50%',
              top: '50%',
              marginLeft: -h.size / 2,
              marginTop: -h.size / 2,
              fontSize: h.size,
            }}
            initial={{ scale: 0, opacity: 1 }}
            animate={{
              scale: [0, 1.5, 1],
              opacity: [1, 1, 0],
              x: Math.cos((h.angle * Math.PI) / 180) * h.distance,
              y: Math.sin((h.angle * Math.PI) / 180) * h.distance,
            }}
            transition={{ duration: 2, ease: 'easeOut' }}
          >
            <Heart fill="currentColor" stroke="none" />
          </motion.div>
        ))}
      </motion.div>
    </div>
  )
}
