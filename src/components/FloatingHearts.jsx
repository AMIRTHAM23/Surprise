import { useState, useEffect, useCallback } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Heart } from 'lucide-react'

const hearts = Array.from({ length: 20 }, (_, i) => ({
  id: i,
  left: Math.random() * 100,
  animationDuration: 3 + Math.random() * 4,
  size: 8 + Math.random() * 16,
  delay: Math.random() * 5,
}))

export default function FloatingHearts() {
  return (
    <div className="fixed inset-0 pointer-events-none overflow-hidden z-0">
      {hearts.map((heart) => (
        <motion.div
          key={heart.id}
          className="absolute text-rose-300/40"
          style={{
            left: `${heart.left}%`,
            bottom: '-20px',
            fontSize: heart.size,
          }}
          animate={{
            y: [0, -(window.innerHeight + 100)],
            x: [0, Math.sin(heart.id) * 40],
            opacity: [0, 0.6, 0.6, 0],
            rotate: [0, 20, -20, 0],
          }}
          transition={{
            duration: heart.animationDuration,
            delay: heart.delay,
            repeat: Infinity,
            ease: 'easeInOut',
          }}
        >
          <Heart fill="currentColor" stroke="none" />
        </motion.div>
      ))}
    </div>
  )
}
