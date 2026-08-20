import { useState, useEffect, useRef } from 'react'
import { motion } from 'framer-motion'
import { Music2, Music } from 'lucide-react'

export default function MusicController() {
  const [isPlaying, setIsPlaying] = useState(false)
  const [isLoaded, setIsLoaded] = useState(false)
  const audioRef = useRef(null)

  useEffect(() => {
    const audio = new Audio('/audio/romantic.mp3')
    audio.loop = true
    audio.volume = 0.3
    audio.preload = 'auto'
    audioRef.current = audio

    const handleCanPlay = () => setIsLoaded(true)
    audio.addEventListener('canplaythrough', handleCanPlay)

    return () => {
      audio.removeEventListener('canplaythrough', handleCanPlay)
      audio.pause()
      audio.src = ''
    }
  }, [])

  const toggleMusic = () => {
    if (!audioRef.current) return
    if (isPlaying) {
      audioRef.current.pause()
    } else {
      audioRef.current.play().catch(() => {})
    }
    setIsPlaying(!isPlaying)
  }

  const openSong = () => {
    window.open('https://youtu.be/jlmyZ_x5vjc?si=gAuDftLffrw61kj3', '_blank')
  }

  if (!isLoaded) {
    return (
      <div className="fixed bottom-6 right-6 z-50 flex items-center gap-2">
        <span className="text-xs text-rose-400 font-romantic">click here to have our fav song</span>
        <button
          onClick={openSong}
          className="w-10 h-10 rounded-full bg-white/80 backdrop-blur-md border border-rose-100 shadow-lg flex items-center justify-center text-rose-400 hover:scale-110 transition-transform"
          title="Play our song"
        >
          <Music2 size={18} />
        </button>
      </div>
    )
  }

  return (
    <div className="fixed bottom-6 right-6 z-50 flex items-center gap-2">
      <span className="text-xs text-rose-400 font-romantic">click here to have our fav song</span>
      <motion.button
        onClick={openSong}
        className="w-10 h-10 rounded-full bg-white/80 backdrop-blur-md border border-rose-100 shadow-lg flex items-center justify-center text-rose-400 hover:scale-110 transition-all"
        title="Play our song"
        whileTap={{ scale: 0.9 }}
      >
        <Music size={18} />
      </motion.button>
    </div>
  )
}
