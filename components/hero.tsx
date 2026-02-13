"use client"

import { useEffect, useState, useRef } from "react"
import { motion, useMotionValue, useSpring } from "framer-motion"
import { ContactModal } from "./contact-modal" // Updated import statement

export function Hero() {
  const [mounted, setMounted] = useState(false)
  const [isContactOpen, setIsContactOpen] = useState(false) // Added state management for contact modal
  const containerRef = useRef<HTMLDivElement>(null)
  const mouseX = useMotionValue(0)
  const mouseY = useMotionValue(0)

  const springX = useSpring(mouseX, { stiffness: 35, damping: 25 })
  const springY = useSpring(mouseY, { stiffness: 35, damping: 25 })

  useEffect(() => {
    setMounted(true)

    const handleMouseMove = (e: MouseEvent) => {
      if (!containerRef.current) return
      const rect = containerRef.current.getBoundingClientRect()
      const centerX = rect.left + rect.width / 2
      const centerY = rect.top + rect.height / 2

      mouseX.set((e.clientX - centerX) / (rect.width / 2))
      mouseY.set((e.clientY - centerY) / (rect.height / 2))
    }

    window.addEventListener("mousemove", handleMouseMove)
    return () => window.removeEventListener("mousemove", handleMouseMove)
  }, [mouseX, mouseY])

  const letters = [
    { char: "S", delay: 0, initialX: -200, initialY: -150, initialScale: 0.3 },
    { char: "P", delay: 0.15, initialX: -250, initialY: 100, initialScale: 0.2 },
    { char: "C", delay: 0.3, initialX: 280, initialY: -120, initialScale: 0.25 },
    { char: "G", delay: 0.45, initialX: 220, initialY: 140, initialScale: 0.35 },
  ]

  if (!mounted) return null

  return (
    <section
      ref={containerRef}
      className="relative min-h-screen flex items-center justify-center overflow-hidden px-4 sm:px-6 pb-8 sm:pb-12 perspective-1500"
    >
      {/* Animated background gradient */}
      <motion.div
        animate={{
          background: [
            "radial-gradient(circle at 20% 50%, rgba(201, 169, 98, 0.05) 0%, transparent 50%)",
            "radial-gradient(circle at 80% 50%, rgba(201, 169, 98, 0.05) 0%, transparent 50%)",
            "radial-gradient(circle at 20% 50%, rgba(201, 169, 98, 0.05) 0%, transparent 50%)",
          ],
        }}
        transition={{
          duration: 10,
          repeat: Number.POSITIVE_INFINITY,
          ease: "linear",
        }}
        className="absolute inset-0"
      />

      {/* Kinetic sculpture in background */}
      <div className="absolute inset-0 flex items-center justify-center">
        <motion.div
          style={{
            x: springX,
            y: springY,
          }}
          className="relative w-[85vw] h-[85vw] max-w-[600px] max-h-[600px] sm:w-[75vw] sm:h-[75vw] md:w-[85vw] md:h-[85vw] preserve-3d"
        >
          {/* Layer 1: Outer rotating wireframe */}
          <motion.div
            animate={{ rotate: 360 }}
            transition={{ duration: 15, repeat: Number.POSITIVE_INFINITY, ease: "linear" }}
            className="absolute inset-0"
          >
            <svg className="w-full h-full" viewBox="0 0 600 600">
              <motion.circle
                initial={{ pathLength: 0, opacity: 0 }}
                animate={{ pathLength: 1, opacity: 1 }}
                transition={{ duration: 2, delay: 0.5 }}
                cx="300"
                cy="300"
                r="250"
                stroke="#C9A962"
                strokeWidth="2"
                fill="none"
                style={{ filter: "drop-shadow(0 0 20px rgba(201, 169, 98, 0.9))" }}
              />
              <motion.path
                initial={{ pathLength: 0, opacity: 0 }}
                animate={{ pathLength: 1, opacity: 1 }}
                transition={{ duration: 2, delay: 0.7 }}
                d="M 50 300 L 550 300 M 300 50 L 300 550"
                stroke="#C9A962"
                strokeWidth="1"
                fill="none"
                opacity="0.5"
              />
            </svg>
          </motion.div>

          {/* Layer 2: Inner rotating arcs */}
          <motion.div
            animate={{ rotate: -360 }}
            transition={{ duration: 12, repeat: Number.POSITIVE_INFINITY, ease: "linear" }}
            className="absolute inset-0"
          >
            <svg className="w-full h-full" viewBox="0 0 600 600">
              <motion.path
                initial={{ pathLength: 0, opacity: 0 }}
                animate={{ pathLength: 1, opacity: 1 }}
                transition={{ duration: 2, delay: 0.9 }}
                d="M 150 300 A 150 150 0 1 1 450 300"
                stroke="#C9A962"
                strokeWidth="2"
                fill="none"
                style={{ filter: "drop-shadow(0 0 18px rgba(201, 169, 98, 0.95))" }}
              />
              <motion.path
                initial={{ pathLength: 0, opacity: 0 }}
                animate={{ pathLength: 1, opacity: 1 }}
                transition={{ duration: 2, delay: 1.1 }}
                d="M 300 150 A 150 150 0 1 1 300 450"
                stroke="#C9A962"
                strokeWidth="2"
                fill="none"
                opacity="0.5"
              />
            </svg>
          </motion.div>

          {/* Layer 3: Diagonal intersecting lines */}
          <motion.div
            animate={{ rotate: 180 }}
            transition={{ duration: 25, repeat: Number.POSITIVE_INFINITY, ease: "linear" }}
            className="absolute inset-0"
          >
            <svg className="w-full h-full" viewBox="0 0 600 600">
              <motion.path
                initial={{ pathLength: 0, opacity: 0 }}
                animate={{
                  pathLength: 1,
                  opacity: 1,
                  strokeDashoffset: [0, -1000],
                }}
                transition={{
                  pathLength: { duration: 2, delay: 1.5 },
                  opacity: { duration: 2, delay: 1.5 },
                  strokeDashoffset: { duration: 20, repeat: Number.POSITIVE_INFINITY, ease: "linear" },
                }}
                d="M 100 100 L 500 500 M 100 500 L 500 100"
                stroke="#C9A962"
                strokeWidth="1.5"
                fill="none"
                opacity="0.6"
              />
            </svg>
          </motion.div>

          {/* Layer 4: Animated stroke-dash paths */}
          <motion.div className="absolute inset-0">
            <svg className="w-full h-full" viewBox="0 0 600 600">
              <motion.circle
                initial={{ pathLength: 0, opacity: 0 }}
                animate={{
                  pathLength: 1,
                  opacity: 1,
                  strokeDashoffset: [0, -1000],
                }}
                transition={{
                  pathLength: { duration: 2, delay: 1.5 },
                  opacity: { duration: 2, delay: 1.5 },
                  strokeDashoffset: { duration: 20, repeat: Number.POSITIVE_INFINITY, ease: "linear" },
                }}
                cx="300"
                cy="300"
                r="180"
                stroke="#C9A962"
                strokeWidth="2"
                strokeDasharray="10 20"
                fill="none"
                style={{ filter: "drop-shadow(0 0 25px rgba(201, 169, 98, 0.85))" }}
              />
            </svg>
          </motion.div>

          {/* Layer 5: Innermost pulsing core */}
          <motion.div
            animate={{
              scale: [1, 1.15, 1],
              opacity: [0.8, 1, 0.8],
              rotate: [0, 180, 360],
            }}
            transition={{
              scale: { duration: 3, repeat: Number.POSITIVE_INFINITY, ease: "easeInOut" },
              opacity: { duration: 3, repeat: Number.POSITIVE_INFINITY, ease: "easeInOut" },
              rotate: { duration: 30, repeat: Number.POSITIVE_INFINITY, ease: "linear" },
            }}
            className="absolute inset-0 flex items-center justify-center"
          >
            <svg className="w-full h-full" viewBox="0 0 600 600">
              <motion.circle
                initial={{ scale: 0, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ duration: 2, delay: 1.7 }}
                cx="300"
                cy="300"
                r="100"
                stroke="#C9A962"
                strokeWidth="3"
                fill="none"
                style={{ filter: "drop-shadow(0 0 30px rgba(201, 169, 98, 1))" }}
              />
            </svg>
          </motion.div>

          {/* Letter-by-letter SPCG text */}
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="flex gap-1 sm:gap-2">
              {letters.map((letter) => (
                <motion.span
                  key={letter.char}
                  initial={{
                    opacity: 0,
                    x: letter.initialX,
                    y: letter.initialY,
                    scale: letter.initialScale,
                  }}
                  animate={{
                    opacity: 1,
                    x: 0,
                    y: 0,
                    scale: 1,
                  }}
                  whileHover={{
                    scale: 1.1,
                    y: -5,
                    rotateZ: 5,
                    transition: { duration: 0.2 },
                  }}
                  transition={{
                    duration: 1.2,
                    delay: letter.delay,
                    ease: [0.19, 1, 0.22, 1],
                    scale: {
                      type: "spring",
                      stiffness: 100,
                      damping: 10,
                    },
                  }}
                  className="text-4xl sm:text-5xl md:text-7xl lg:text-9xl font-bold text-white inline-block cursor-default preserve-3d"
                  style={{
                    textShadow: "0 0 50px rgba(201, 169, 98, 0.8), 0 0 100px rgba(201, 169, 98, 0.4)",
                  }}
                >
                  {letter.char}
                </motion.span>
              ))}
            </div>

            {/* Gold highlight sweep */}
            <motion.div
              initial={{ x: "-100%", opacity: 0 }}
              animate={{
                x: "200%",
                opacity: [0, 1, 1, 0],
              }}
              transition={{
                duration: 1.5,
                delay: 1.8,
                ease: "easeInOut",
              }}
              className="absolute inset-0 bg-gradient-to-r from-transparent via-[#C9A962]/80 to-transparent pointer-events-none"
              style={{
                filter: "blur(8px)",
              }}
            />
          </div>
        </motion.div>
      </div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1.5, delay: 2.5 }}
        className="absolute bottom-10 sm:bottom-20 md:bottom-32 left-0 right-0 text-center z-10 px-4 sm:px-6 flex flex-col items-center gap-4 sm:gap-6"
      >
        
      </motion.div>

      <ContactModal isOpen={isContactOpen} onClose={() => setIsContactOpen(false)} />
    </section>
  )
}
