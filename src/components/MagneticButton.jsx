import { useRef, useEffect } from 'react'
import { motion, useMotionValue, useSpring } from 'framer-motion'
import { Heart } from 'lucide-react'

export default function MagneticButton({ children, onClick, className = '', disabled = false }) {
  const ref = useRef(null)
  const x = useMotionValue(0)
  const y = useMotionValue(0)
  const springX = useSpring(x, { stiffness: 150, damping: 15 })
  const springY = useSpring(y, { stiffness: 150, damping: 15 })

  useEffect(() => {
    const el = ref.current
    if (!el || disabled) return

    const handleMouseMove = (e) => {
      const rect = el.getBoundingClientRect()
      const centerX = rect.left + rect.width / 2
      const centerY = rect.top + rect.height / 2
      const deltaX = (e.clientX - centerX) * 0.3
      const deltaY = (e.clientY - centerY) * 0.3
      x.set(deltaX)
      y.set(deltaY)
    }

    const handleMouseLeave = () => {
      x.set(0)
      y.set(0)
    }

    el.addEventListener('mousemove', handleMouseMove)
    el.addEventListener('mouseleave', handleMouseLeave)

    return () => {
      el.removeEventListener('mousemove', handleMouseMove)
      el.removeEventListener('mouseleave', handleMouseLeave)
    }
  }, [disabled, x, y])

  const handleClick = (e) => {
    if (disabled) return
    const rect = ref.current.getBoundingClientRect()
    const ripple = document.createElement('span')
    ripple.style.cssText = `
      position: fixed;
      left: ${e.clientX - rect.left}px;
      top: ${e.clientY - rect.top}px;
      width: 0;
      height: 0;
      border-radius: 50%;
      background: rgba(255, 255, 255, 0.5);
      transform: translate(-50%, -50%);
      pointer-events: none;
      z-index: 10;
    `
    ref.current.appendChild(ripple)
    ripple.animate(
      [
        { width: '0px', height: '0px', opacity: 0.6 },
        { width: '300px', height: '300px', opacity: 0 },
      ],
      { duration: 700, easing: 'ease-out' }
    )
    setTimeout(() => ripple.remove(), 700)
    onClick?.(e)
  }

  return (
    <motion.button
      ref={ref}
      onClick={handleClick}
      disabled={disabled}
      style={{ x: springX, y: springY }}
      className={className}
      whileTap={{ scale: 0.95 }}
    >
      {children}
    </motion.button>
  )
}
