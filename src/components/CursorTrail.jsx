import { useEffect, useState } from 'react'
import { motion } from 'framer-motion'
import { Heart } from 'lucide-react'

export default function CursorTrail() {
  const [trails, setTrails] = useState([])

  useEffect(() => {
    let trailsArray = []
    const maxTrails = 8

    const handleMouseMove = (e) => {
      trailsArray = [
        { id: Date.now(), x: e.clientX, y: e.clientY },
        ...trailsArray.slice(0, maxTrails - 1),
      ]
      setTrails([...trailsArray])
    }

    window.addEventListener('mousemove', handleMouseMove)
    return () => window.removeEventListener('mousemove', handleMouseMove)
  }, [])

  return (
    <div className="fixed inset-0 pointer-events-none z-50 hidden md:block">
      {trails.map((trail, i) => (
        <motion.div
          key={trail.id}
          className="absolute text-rose-300/60"
          style={{ left: trail.x - 6, top: trail.y - 6 }}
          initial={{ scale: 1, opacity: 0.8 }}
          animate={{ scale: 0, opacity: 0 }}
          transition={{ duration: 0.8, delay: i * 0.05 }}
        >
          <Heart size={12} fill="currentColor" />
        </motion.div>
      ))}
    </div>
  )
}
