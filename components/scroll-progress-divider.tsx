"use client"

import { motion, useScroll, useTransform } from "framer-motion"
import { useRef } from "react"

export function ScrollProgressDivider({ delay = 0 }: { delay?: number }) {
  const ref = useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  })

  const scaleX = useTransform(scrollYProgress, [0, 0.5, 1], [0, 1, 0])
  const opacity = useTransform(scrollYProgress, [0, 0.5, 1], [0, 1, 0])
  const glowOpacity = useTransform(scrollYProgress, [0, 0.3, 0.7, 1], [0, 0.6, 0.6, 0])

  return (
    <div ref={ref} className="relative h-1 overflow-hidden">
      {/* Main glowing progress line with blur effect */}
      <motion.div
        style={{
          scaleX,
          opacity,
        }}
        className="absolute inset-0 origin-center bg-gradient-to-r from-transparent via-[#D4AF37] to-transparent"
      />

      <motion.div
        style={{
          scaleX,
          opacity: glowOpacity,
        }}
        className="absolute inset-0 origin-center bg-gradient-to-r from-transparent via-[#D4AF37] to-transparent blur-md"
      />

      <motion.div
        style={{
          scaleX,
          opacity: glowOpacity,
        }}
        className="absolute inset-0 origin-center bg-gradient-to-r from-transparent via-[#D4AF37] to-transparent blur-lg"
      />

      <motion.div
        style={{
          scaleX,
          opacity,
        }}
        className="absolute inset-0 origin-center shadow-lg"
        style={{
          boxShadow: "0 0 16px rgba(212, 175, 55, 0.6), 0 0 32px rgba(212, 175, 55, 0.3)",
        }}
      />
    </div>
  )
}
