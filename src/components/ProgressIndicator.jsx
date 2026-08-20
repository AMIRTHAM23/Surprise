import { motion } from 'framer-motion'
import { Heart } from 'lucide-react'

export default function ProgressIndicator({ currentStep, chapters, totalSteps = 8 }) {
  const currentChapter = chapters?.[currentStep] || `Chapter ${String(currentStep + 1).padStart(2, '0')}`

  return (
    <div className="fixed top-0 left-0 right-0 z-40 px-4 py-4">
      <div className="max-w-md mx-auto">
        <div className="flex items-center justify-between mb-2">
          <span className="text-xs font-medium text-rose-400 tracking-wider uppercase">
            {currentChapter}
          </span>
          <span className="text-xs text-rose-300">
            {String(currentStep + 1).padStart(2, '0')} / {String(totalSteps).padStart(2, '0')}
          </span>
        </div>
        <div className="h-1.5 bg-rose-100 rounded-full overflow-hidden">
          <motion.div
            className="h-full bg-gradient-to-r from-rose-400 to-rose-500 rounded-full"
            initial={{ width: 0 }}
            animate={{ width: `${((currentStep + 1) / totalSteps) * 100}%` }}
            transition={{ duration: 0.8, ease: 'easeOut' }}
          />
        </div>
      </div>
    </div>
  )
}
