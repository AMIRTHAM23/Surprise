import { useState, useRef, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Heart } from 'lucide-react'

export default function WelcomeScreen({ onNext }) {
  const [showMessage, setShowMessage] = useState(false)
  const [hearts, setHearts] = useState([])

  const handleClick = () => {
    const burst = Array.from({ length: 15 }, (_, i) => ({
      id: Date.now() + i,
      left: 50 + (Math.random() - 0.5) * 50,
      top: 50 + (Math.random() - 0.5) * 30,
    }))
    setHearts(burst)
    setTimeout(onNext, 1200)
  }

  const handleHeartClick = () => {
    const messages = [
      'You have no idea what\'s coming...',
      'I\'m blushing. Are you?',
      'Still reading? I like you a little more now. ❤️',
      'Okay, stop being cute and continue.',
    ]
    const msg = messages[Math.floor(Math.random() * messages.length)]
    setShowMessage(true)
    setTimeout(() => setShowMessage(false), 3000)
  }

  return (
    <div className="relative min-h-screen flex items-center justify-center px-6">
      <div className="absolute inset-0 bg-gradient-to-br from-rose-50 via-soft-pink to-lavender-50 star-field" />

      <motion.div
        className="relative z-10 text-center max-w-lg mx-auto"
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1, ease: 'easeOut' }}
      >
        <motion.div
          className="mb-8 cursor-pointer inline-block"
          onClick={handleHeartClick}
          whileHover={{ scale: 1.2 }}
          whileTap={{ scale: 0.9 }}
        >
          <Heart className="w-16 h-16 text-rose-400 mx-auto heart-bounce" fill="currentColor" />
        </motion.div>

        <motion.h1
          className="font-romantic text-5xl md:text-6xl text-rose-500 mb-4"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3, duration: 0.8 }}
        >
          Hey You...
        </motion.h1>

        <motion.p
          className="font-serif text-2xl md:text-3xl text-rose-600/80 mb-8 italic"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.8, duration: 0.8 }}
        >
          I made something for you.
        </motion.p>

        <motion.p
          className="text-gray-500 text-lg mb-10 font-light"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.2, duration: 0.8 }}
        >
          Ready?
        </motion.p>

        <motion.button
          onClick={handleClick}
          className="btn-primary"
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 1.6, duration: 0.6, type: 'spring' }}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          Come inside ❤️
        </motion.button>

        <AnimatePresence>
          {showMessage && (
            <motion.p
              className="mt-6 text-rose-400 font-romantic text-xl"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
            >
              {msg}
            </motion.p>
          )}
        </AnimatePresence>

        <AnimatePresence>
          {hearts.map((h) => (
            <motion.div
              key={h.id}
              className="fixed text-rose-400 pointer-events-none"
              style={{ left: `${h.left}%`, top: `${h.top}%` }}
              initial={{ scale: 0, opacity: 1 }}
              animate={{ scale: [0, 1.5, 1], opacity: [1, 1, 0], y: [0, -50, -100] }}
              exit={{ opacity: 0 }}
              transition={{ duration: 1.5, ease: 'easeOut' }}
            >
              <Heart size={24} fill="currentColor" />
            </motion.div>
          ))}
        </AnimatePresence>
      </motion.div>
    </div>
  )
}
