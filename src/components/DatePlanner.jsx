import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Heart, Coffee, Utensils, Film, Sunset, IceCreamCone, Sparkles, ChevronRight } from 'lucide-react'

const activities = [
  { id: 'coffee', label: 'Coffee', icon: Coffee, emoji: '☕' },
  { id: 'dinner', label: 'Dinner', icon: Utensils, emoji: '🍽️' },
  { id: 'movie', label: 'Movie', icon: Film, emoji: '🎬' },
  { id: 'walk', label: 'Sunset Walk', icon: Sunset, emoji: '🌅' },
  { id: 'icecream', label: 'Ice Cream', icon: IceCreamCone, emoji: '🍦' },
  { id: 'surprise', label: 'Surprise Date', icon: Sparkles, emoji: '🎁' },
]

const times = [
  { id: 'morning', label: 'Morning', time: '9:00 AM' },
  { id: 'afternoon', label: 'Afternoon', time: '2:00 PM' },
  { id: 'evening', label: 'Evening', time: '6:00 PM' },
  { id: 'night', label: 'Night', time: '8:00 PM' },
]

function getNextDays(count) {
  const days = []
  const today = new Date()
  for (let i = 1; i <= count; i++) {
    const date = new Date(today)
    date.setDate(today.getDate() + i)
    days.push({
      date,
      dayName: date.toLocaleDateString('en-US', { weekday: 'short' }),
      dayNum: date.getDate(),
      month: date.toLocaleDateString('en-US', { month: 'short' }),
      full: date.toLocaleDateString('en-US', { weekday: 'long', month: 'long', day: 'numeric', year: 'numeric' }),
    })
  }
  return days
}

export default function DatePlanner({ onNext }) {
  const [phase, setPhase] = useState('activity')
  const [selectedActivity, setSelectedActivity] = useState(null)
  const [selectedDate, setSelectedDate] = useState(null)
  const [selectedTime, setSelectedTime] = useState(null)
  const [notes, setNotes] = useState('')
  const [days] = useState(() => getNextDays(14))

  const handleActivityConfirm = () => {
    if (selectedActivity) setPhase('date')
  }

  const handleDateConfirm = () => {
    if (selectedDate) setPhase('time')
  }

  const handleTimeConfirm = () => {
    if (selectedTime) setPhase('notes')
  }

  const handleFinish = () => {
    onNext({
      activity: selectedActivity,
      date: selectedDate,
      time: selectedTime,
      notes,
    })
  }

  return (
    <div className="relative min-h-screen py-12 px-6">
      <div className="absolute inset-0 bg-gradient-to-br from-rose-50 via-soft-pink to-lavender-50" />

      <motion.div
        className="relative z-10 max-w-lg mx-auto"
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
      >
        <motion.h2
          className="font-romantic text-4xl md:text-5xl text-rose-500 text-center mb-3"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
        >
          One romantic day with you.
        </motion.h2>

        <motion.p
          className="text-gray-500 text-center mb-10 italic font-light"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3 }}
        >
          Please come inside. ❤️
        </motion.p>

        <AnimatePresence mode="wait">
          {phase === 'activity' && (
            <motion.div
              key="activity"
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -50 }}
              transition={{ duration: 0.5 }}
            >
              <motion.p
                className="font-romantic text-2xl text-rose-500 mb-4"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
              >
                What should we do together?
              </motion.p>

              <motion.div
                className="grid grid-cols-2 gap-3 mb-6"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.1 }}
              >
                {activities.map((activity) => {
                  const Icon = activity.icon
                  const isSelected = selectedActivity === activity.id
                  return (
                    <motion.button
                      key={activity.id}
                      onClick={() => setSelectedActivity(activity.id)}
                      className={`relative p-4 rounded-2xl border-2 transition-all duration-300 text-left ${
                        isSelected
                          ? 'border-rose-400 bg-rose-50 shadow-lg shadow-rose-100'
                          : 'border-rose-100 bg-white/60 hover:border-rose-200 hover:bg-white/80'
                      }`}
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                    >
                      <Icon className={`w-6 h-6 mb-2 ${isSelected ? 'text-rose-500' : 'text-rose-300'}`} />
                      <p className={`font-medium ${isSelected ? 'text-rose-600' : 'text-gray-600'}`}>
                        {activity.emoji} {activity.label}
                      </p>
                      {isSelected && (
                        <motion.div
                          className="absolute -top-1 -right-1 w-5 h-5 bg-rose-400 rounded-full flex items-center justify-center"
                          initial={{ scale: 0 }}
                          animate={{ scale: 1 }}
                        >
                          <Heart size={12} className="text-white" fill="white" />
                        </motion.div>
                      )}
                    </motion.button>
                  )
                })}
              </motion.div>

              {selectedActivity && (
                <motion.div
                  className="text-center space-y-4"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                >
                  <motion.p className="text-rose-400 font-romantic text-xl">
                    Good choice. ❤️
                  </motion.p>
                  <motion.button
                    onClick={handleActivityConfirm}
                    className="btn-primary"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    Come inside ❤️
                  </motion.button>
                </motion.div>
              )}
            </motion.div>
          )}

          {phase === 'date' && (
            <motion.div
              key="date"
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -50 }}
              transition={{ duration: 0.5 }}
            >
              <motion.p
                className="font-romantic text-2xl text-rose-500 mb-4"
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
              >
                When should our little memory happen?
              </motion.p>

              <motion.div
                className="flex gap-2 overflow-x-auto pb-4 mb-6 scrollbar-hide"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
              >
                {days.map((day, i) => (
                  <motion.button
                    key={i}
                    onClick={() => setSelectedDate(day)}
                    className={`flex-shrink-0 w-20 p-3 rounded-2xl border-2 text-center transition-all ${
                      selectedDate?.date.toDateString() === day.date.toDateString()
                        ? 'border-rose-400 bg-rose-50 shadow-lg'
                        : 'border-rose-100 bg-white/60 hover:border-rose-200'
                    }`}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <p className="text-xs text-gray-400 uppercase tracking-wider">{day.dayName}</p>
                    <p className={`text-2xl font-bold ${selectedDate?.date.toDateString() === day.date.toDateString() ? 'text-rose-500' : 'text-gray-700'}`}>
                      {day.dayNum}
                    </p>
                    <p className="text-xs text-gray-400">{day.month}</p>
                  </motion.button>
                ))}
              </motion.div>

              {selectedDate && (
                <motion.div
                  className="text-center space-y-4"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                >
                  <motion.p className="text-rose-400 font-romantic text-xl">
                    {selectedDate.full} looks perfect. ❤️
                  </motion.p>
                  <motion.button
                    onClick={handleDateConfirm}
                    className="btn-primary"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    Come inside ❤️
                  </motion.button>
                </motion.div>
              )}
            </motion.div>
          )}

          {phase === 'time' && (
            <motion.div
              key="time"
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -50 }}
              transition={{ duration: 0.5 }}
            >
              <motion.p
                className="font-romantic text-2xl text-rose-500 mb-4"
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
              >
                What time should I save for you?
              </motion.p>

              <motion.div
                className="grid grid-cols-2 gap-3 mb-6"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
              >
                {times.map((time) => (
                  <motion.button
                    key={time.id}
                    onClick={() => setSelectedTime(time)}
                    className={`p-4 rounded-2xl border-2 text-center transition-all ${
                      selectedTime?.id === time.id
                        ? 'border-rose-400 bg-rose-50 shadow-lg'
                        : 'border-rose-100 bg-white/60 hover:border-rose-200'
                    }`}
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    <p className={`font-medium ${selectedTime?.id === time.id ? 'text-rose-600' : 'text-gray-600'}`}>
                      {time.label}
                    </p>
                    <p className="text-sm text-gray-400">{time.time}</p>
                  </motion.button>
                ))}
              </motion.div>

              <div className="mb-6">
                <label className="block text-sm text-gray-400 mb-2">Or enter a custom time</label>
                <input
                  type="time"
                  value={selectedTime?.id === 'custom' ? selectedTime.time : ''}
                  onChange={(e) => setSelectedTime({ id: 'custom', label: 'Custom', time: e.target.value })}
                  className="w-full p-3 rounded-xl border-2 border-rose-100 bg-white/60 focus:border-rose-300 focus:outline-none transition-colors"
                />
              </div>

              {selectedTime && (
                <motion.div
                  className="text-center space-y-4"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                >
                  <motion.p className="text-rose-400 font-romantic text-xl">
                    Perfect. ❤️
                  </motion.p>
                  <motion.button
                    onClick={handleTimeConfirm}
                    className="btn-primary"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    Come inside ❤️
                  </motion.button>
                </motion.div>
              )}
            </motion.div>
          )}

          {phase === 'notes' && (
            <motion.div
              key="notes"
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -50 }}
              transition={{ duration: 0.5 }}
            >
              <motion.p
                className="font-romantic text-2xl text-rose-500 mb-4"
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
              >
                Anything else you&apos;d like?
              </motion.p>

              <motion.textarea
                value={notes}
                onChange={(e) => setNotes(e.target.value)}
                placeholder="Tell me what would make this day special..."
                className="w-full p-4 rounded-2xl border-2 border-rose-100 bg-white/60 focus:border-rose-300 focus:outline-none transition-colors resize-none h-32 text-gray-600 placeholder:text-gray-300 mb-6"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
              />

              <motion.div className="text-center">
                <motion.button
                  onClick={handleFinish}
                  className="btn-primary"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  Save Our Date ❤️
                </motion.button>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>
    </div>
  )
}
