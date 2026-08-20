import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Heart, Lock } from 'lucide-react'

export default function AngerPromise({ onNext }) {
  const [angerLevel, setAngerLevel] = useState(0)
  const [showDeal, setShowDeal] = useState(false)
  const [dealSealed, setDealSealed] = useState(false)

  const getSliderMessage = () => {
    if (angerLevel === 100) return 'Okay okay... we\'re deleting that option 😂'
    if (angerLevel >= 75) return 'That\'s a lot of drama!'
    if (angerLevel >= 50) return 'Let\'s keep it low, yeah?'
    if (angerLevel >= 25) return 'Almost there...'
    return 'We\'re off to a good start!'
  }

  const handleDeal = () => {
    setShowDeal(true)
    setTimeout(() => {
      setDealSealed(true)
      setTimeout(onNext, 2000)
    }, 2000)
  }

  return (
    <div className="relative min-h-screen flex items-center justify-center px-6">
      <div className="absolute inset-0 bg-gradient-to-br from-cream via-rose-50 to-lavender-50" />

      <motion.div
        className="relative z-10 text-center max-w-lg mx-auto w-full"
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
      >
        <motion.h2
          className="font-romantic text-4xl md:text-5xl text-rose-500 mb-8"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
        >
          One serious rule though...
        </motion.h2>

        <AnimatePresence mode="wait">
          {!showDeal ? (
            <motion.div
              key="slider"
              className="glass-card rounded-3xl p-8 md:p-12"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              transition={{ duration: 0.5 }}
            >
              <motion.p
                className="font-romantic text-3xl md:text-4xl text-rose-500 mb-8"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
              >
                No unnecessary anger. 😌
              </motion.p>

              <div className="mb-8">
                <div className="flex justify-between text-sm text-gray-400 mb-3">
                  <span>0% Anger</span>
                  <span className="text-rose-400 font-medium">{angerLevel}%</span>
                  <span>100% Drama</span>
                </div>
                <div className="relative h-3 bg-rose-100 rounded-full overflow-hidden">
                  <motion.div
                    className="absolute left-0 top-0 h-full bg-gradient-to-r from-rose-300 to-rose-500 rounded-full"
                    style={{ width: `${angerLevel}%` }}
                    transition={{ duration: 0.3 }}
                  />
                  <input
                    type="range"
                    min="0"
                    max="100"
                    value={angerLevel}
                    onChange={(e) => setAngerLevel(Number(e.target.value))}
                    className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                  />
                </div>
                <motion.p
                  className="mt-4 text-rose-400 font-romantic text-xl"
                  key={angerLevel}
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                >
                  {getSliderMessage()}
                </motion.p>
              </div>

              <motion.p
                className="font-serif text-lg text-gray-600 italic leading-relaxed mb-8"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.3 }}
              >
                Our rule:<br />
                When we&apos;re angry, we pause. We breathe. We talk.<br />
                We don&apos;t hurt each other with words.
              </motion.p>

              <motion.button
                onClick={handleDeal}
                className="btn-primary"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                Deal ❤️
              </motion.button>
            </motion.div>
          ) : (
            <motion.div
              key="deal"
              className="space-y-8"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6 }}
            >
              <motion.p
                className="font-romantic text-3xl text-rose-500"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.2 }}
              >
                Deal sealed.
              </motion.p>

              <motion.div
                className="flex justify-center"
                initial={{ scale: 0, rotate: -180 }}
                animate={{ scale: 1, rotate: 0 }}
                transition={{ duration: 0.8, type: 'spring' }}
              >
                {dealSealed ? (
                  <motion.div
                    animate={{ scale: [1, 1.2, 1] }}
                    transition={{ duration: 0.6, repeat: Infinity }}
                  >
                    <Heart className="w-20 h-20 text-rose-500" fill="currentColor" />
                  </motion.div>
                ) : (
                  <motion.div
                    animate={{ rotate: 360 }}
                    transition={{ duration: 2, repeat: Infinity, ease: 'linear' }}
                  >
                    <Lock className="w-20 h-20 text-rose-400" />
                  </motion.div>
                )}
              </motion.div>

              <motion.p
                className="text-gray-500 italic"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.8 }}
              >
                Our little secret. ❤️
              </motion.p>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>
    </div>
  )
}
