"use client"

import { motion, useScroll, useSpring } from "framer-motion"
import { useEffect, useState } from "react"

export function ScrollProgressBar() {
  const { scrollYProgress } = useScroll()
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    mass: 0.1,
  })

  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted) return null

  return (
    <div className="fixed top-0 left-0 right-0 h-1 bg-black z-50 origin-left pointer-events-none">
      <motion.div
        style={{
          scaleX,
          background: "linear-gradient(90deg, #FFD700, #FFC700, #FFD700)",
          boxShadow: "0 0 20px rgba(255, 215, 0, 0.8)",
        }}
        className="w-full h-full origin-left"
      />
    </div>
  )
}
