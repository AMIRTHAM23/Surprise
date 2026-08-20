import { useState, useRef } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Heart } from 'lucide-react'

export default function QuestionScreen({ onNext }) {
  const [showMessage, setShowMessage] = useState(false)

  const handleYes = () => {
    setShowMessage(true)
    setTimeout(onNext, 1500)
  }

  return (
    <div className="relative min-h-screen flex items-center justify-center px-6">
      <div className="absolute inset-0 bg-gradient-to-br from-rose-50 via-soft-pink to-cream" />

      <motion.div
        className="relative z-10 text-center max-w-lg mx-auto"
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
      >
        <motion.h2
          className="font-serif text-3xl md:text-4xl text-rose-600 mb-4"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
        >
          Can we choose each other,<br />even on the difficult days?
        </motion.h2>

        <motion.p
          className="text-gray-500 text-lg mb-10 italic font-light"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4 }}
        >
          Not a question with a right answer...<br />
          just one that matters to me.
        </motion.p>

        <AnimatePresence mode="wait">
          {!showMessage ? (
            <motion.div
              key="question"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ delay: 0.6 }}
            >
              <motion.button
                onClick={handleYes}
                className="btn-primary flex items-center justify-center gap-2"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <Heart size={20} fill="currentColor" />
                Come inside ❤️
              </motion.button>
            </motion.div>
          ) : (
            <motion.div
              key="message"
              className="space-y-6"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6 }}
            >
              <motion.div
                className="flex justify-center gap-2"
                initial={{ scale: 0 }}
                animate={{ scale: [0, 1.2, 1] }}
                transition={{ duration: 0.8, delay: 0.2 }}
              >
                {[...Array(5)].map((_, i) => (
                  <motion.div
                    key={i}
                    animate={{ y: [0, -12, 0] }}
                    transition={{ duration: 0.6, delay: i * 0.08, repeat: Infinity }}
                  >
                    <Heart className="w-7 h-7 text-rose-400" fill="currentColor" />
                  </motion.div>
                ))}
              </motion.div>

              <motion.p
                className="font-romantic text-3xl text-rose-500"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.6 }}
              >
                Then we&apos;re already off to a good start. ❤️
              </motion.p>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>
    </div>
  )
}
