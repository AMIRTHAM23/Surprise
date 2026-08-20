import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Heart, Check } from 'lucide-react'

const activityIcons = {
  coffee: '☕',
  dinner: '🍽️',
  movie: '🎬',
  walk: '🌅',
  icecream: '🍦',
  surprise: '🎁',
}

export default function DateConfirmation({ dateData, onEdit, onConfirm }) {
  const [isConfirmed, setIsConfirmed] = useState(false)
  const [showCard, setShowCard] = useState(false)

  useEffect(() => {
    const timer = setTimeout(() => setShowCard(true), 500)
    return () => clearTimeout(timer)
  }, [])

  const activity = dateData?.activity || 'coffee'
  const dateInfo = dateData?.date || { full: 'TBD' }
  const timeInfo = dateData?.time || { label: 'TBD', time: '' }
  const notes = dateData?.notes || ''

  const handleConfirm = () => {
    setIsConfirmed(true)
    setTimeout(() => {
      onConfirm({
        ...dateData,
        confirmed: true,
      })
    }, 1500)
  }

  const activityLabel = activity.charAt(0).toUpperCase() + activity.slice(1)

  return (
    <div className="relative min-h-screen flex items-center justify-center px-6">
      <div className="absolute inset-0 bg-gradient-to-br from-rose-50 via-soft-pink to-cream" />

      <motion.div
        className="relative z-10 text-center max-w-md mx-auto w-full"
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
      >
        <AnimatePresence mode="wait">
          {!showCard ? (
            <motion.div
              key="loading"
              className="space-y-4"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
            >
              <motion.div
                className="flex justify-center gap-1"
                animate={{ y: [0, -10, 0] }}
                transition={{ duration: 0.8, repeat: Infinity }}
              >
                {[...Array(3)].map((_, i) => (
                  <Heart key={i} className="w-6 h-6 text-rose-400" fill="currentColor" />
                ))}
              </motion.div>
              <p className="text-rose-400 font-romantic text-2xl">Creating your date card...</p>
            </motion.div>
          ) : (
            <motion.div
              key="card"
              className="space-y-8"
              initial={{ opacity: 0, scale: 0.8, rotateX: 15 }}
              animate={{ opacity: 1, scale: 1, rotateX: 0 }}
              transition={{ duration: 0.8, type: 'spring' }}
            >
              <motion.div
                className="glass-card-dark rounded-3xl p-8 md:p-10 relative overflow-hidden"
                whileHover={{ y: -5 }}
              >
                <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-rose-300 via-rose-400 to-rose-300" />

                <p className="text-xs text-rose-400 tracking-[0.3em] uppercase mb-4">Our Little Date</p>

                <motion.div
                  className="text-6xl mb-4"
                  animate={{ scale: [1, 1.1, 1] }}
                  transition={{ duration: 2, repeat: Infinity }}
                >
                  {activityIcons[activity] || '❤️'}
                </motion.div>

                <p className="font-romantic text-3xl text-rose-500 mb-2">
                  {activityLabel}
                </p>

                <p className="font-serif text-xl text-gray-600 mb-1">
                  {dateInfo.full}
                </p>

                <p className="text-rose-400 font-medium mb-6">
                  {timeInfo.time ? `${timeInfo.label} · ${timeInfo.time}` : timeInfo.label}
                </p>

                {notes && (
                  <div className="bg-rose-50/50 rounded-xl p-4 mb-6">
                    <p className="text-sm text-gray-500 italic">&ldquo;{notes}&rdquo;</p>
                  </div>
                )}

                <div className="border-t border-rose-100 pt-4">
                  <p className="font-romantic text-xl text-rose-500">
                    Just You + Me ❤️
                  </p>
                </div>
              </motion.div>

              <AnimatePresence>
                {!isConfirmed ? (
                  <motion.div
                    key="actions"
                    className="space-y-4"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.5 }}
                  >
                    <motion.p
                      className="text-rose-400 font-romantic text-xl"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                    >
                      One ordinary day just became something to look forward to.
                    </motion.p>

                    <div className="flex flex-col sm:flex-row gap-3 justify-center">
                      <motion.button
                        onClick={onEdit}
                        className="px-6 py-3 rounded-full bg-white/80 backdrop-blur-sm text-rose-600 font-medium border border-rose-100 hover:bg-white transition-all"
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                      >
                        Change Date
                      </motion.button>

                      <motion.button
                        onClick={handleConfirm}
                        className="btn-primary flex items-center justify-center gap-2"
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                      >
                        <Heart size={20} fill="currentColor" />
                        Come inside ❤️
                      </motion.button>
                    </div>
                  </motion.div>
                ) : (
                  <motion.div
                    key="confirmed"
                    className="space-y-4"
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.6 }}
                  >
                    <motion.div
                      className="flex justify-center"
                      animate={{ scale: [1, 1.2, 1] }}
                      transition={{ duration: 1, repeat: Infinity }}
                    >
                      <Check className="w-16 h-16 text-rose-500" strokeWidth={3} />
                    </motion.div>
                    <motion.p
                      className="font-romantic text-3xl text-rose-500"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ delay: 0.3 }}
                    >
                      Date confirmed! ❤️
                    </motion.p>
                    <motion.p
                      className="text-gray-500 italic"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ delay: 0.6 }}
                    >
                      I can&apos;t wait to see you.
                    </motion.p>
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
