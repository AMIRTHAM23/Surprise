import { useState, useEffect, useCallback } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import FloatingHearts from './components/FloatingHearts'
import CursorTrail from './components/CursorTrail'
import MusicController from './components/MusicController'
import ProgressIndicator from './components/ProgressIndicator'
import WelcomeScreen from './components/WelcomeScreen'
import QuestionScreen from './components/QuestionScreen'
import PromiseSection from './components/PromiseSection'
import DatePlanning from './components/DatePlanner'
import DateConfirmation from './components/DateConfirmation'
import FinalSurprise from './components/FinalSurprise'

const STORAGE_KEY = 'love-story-date'

const chapters = [
  'The Secret Door',
  'The Question',
  'Lifelong Promises',
  'One Romantic Day',
  'Date Confirmation',
  'Final Surprise',
]

const pageVariants = {
  initial: { opacity: 0, x: 100, rotateY: 5 },
  in: { opacity: 1, x: 0, rotateY: 0 },
  out: { opacity: 0, x: -100, rotateY: -5 },
}

const pageTransition = {
  type: 'tween',
  ease: 'anticipate',
  duration: 0.8,
}

export default function App() {
  const [step, setStep] = useState(0)
  const [savedDate, setSavedDate] = useState(null)
  const [isTransitioning, setIsTransitioning] = useState(false)

  useEffect(() => {
    try {
      const stored = localStorage.getItem(STORAGE_KEY)
      if (stored) {
        const data = JSON.parse(stored)
        if (data.confirmed && data.date) {
          setSavedDate(data)
        }
      }
    } catch (e) {
      console.error('Failed to load stored date', e)
    }
  }, [])

  const handleNext = useCallback(() => {
    if (isTransitioning) return
    setIsTransitioning(true)
    setTimeout(() => {
      setStep((prev) => Math.min(prev + 1, 5))
      setIsTransitioning(false)
    }, 400)
  }, [isTransitioning])

  const handleDateSave = useCallback((dateData) => {
    const payload = {
      ...dateData,
      confirmed: false,
      savedAt: new Date().toISOString(),
    }
    localStorage.setItem(STORAGE_KEY, JSON.stringify(payload))
    setSavedDate(payload)
    handleNext()
  }, [handleNext])

  const handleConfirmDate = useCallback((confirmedData) => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(confirmedData))
    setSavedDate(confirmedData)
    handleNext()
  }, [handleNext])

  const handleEditDate = useCallback(() => {
    setStep(3)
  }, [])

  const handleReplay = useCallback(() => {
    setStep(0)
  }, [])

  const screens = [
    <WelcomeScreen key="welcome" onNext={handleNext} />,
    <QuestionScreen key="question" onNext={handleNext} />,
    <PromiseSection key="promises" onNext={handleNext} />,
    <DatePlanning key="planning" onNext={handleDateSave} />,
    <DateConfirmation
      key="confirm"
      dateData={savedDate}
      onEdit={handleEditDate}
      onConfirm={handleConfirmDate}
    />,
    <FinalSurprise key="finale" onReplay={handleReplay} />,
  ]

  return (
    <div className="relative min-h-screen">
      <FloatingHearts />
      <CursorTrail />
      <MusicController />

      <ProgressIndicator currentStep={step} chapters={chapters} totalSteps={6} />

      <AnimatePresence mode="wait">
        <motion.div
          key={step}
          variants={pageVariants}
          initial="initial"
          animate="in"
          exit="out"
          transition={pageTransition}
          className="min-h-screen"
        >
          {screens[step]}
        </motion.div>
      </AnimatePresence>

      {isTransitioning && (
        <motion.div
          className="fixed inset-0 bg-rose-50/80 backdrop-blur-sm z-50 pointer-events-none"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        />
      )}
    </div>
  )
}
