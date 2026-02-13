"use client"

import { motion, useInView } from "framer-motion"
import { useRef } from "react"

interface SectionDividerProps {
  delay?: number
}

export function SectionDivider({ delay = 0 }: SectionDividerProps) {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: "-50px" })

  return (
    <div ref={ref} className="relative h-px flex items-center justify-center overflow-hidden perspective-1000">
      <motion.div
        className="absolute top-1/2 left-1/2 w-px bg-gradient-to-b from-transparent via-[#C9A962] to-transparent"
        style={{
          height: "200%",
          transform: "translateX(-50%) translateY(-50%)",
        }}
        initial={{ scaleY: 0 }}
        animate={isInView ? { scaleY: 1 } : {}}
        transition={{ duration: 1.5, delay }}
      />

      <motion.div
        className="relative z-10 flex items-center justify-center bg-[#001146]"
        initial={{ scale: 0, opacity: 0 }}
        animate={isInView ? { scale: 1, opacity: 1 } : {}}
        transition={{ duration: 0.8, delay: delay + 0.3 }}
      >
        <motion.div
          className="absolute w-3 h-3 sm:w-4 sm:h-4 border-2 border-[#C9A962] rotate-45 preserve-3d"
          animate={{
            boxShadow: ["0 0 0 0 rgba(201, 169, 98, 0.7)", "0 0 0 12px rgba(201, 169, 98, 0)"],
            rotateZ: [0, 360],
          }}
          transition={{
            boxShadow: {
              duration: 2,
              repeat: Number.POSITIVE_INFINITY,
              ease: "easeOut",
            },
            rotateZ: {
              duration: 8,
              repeat: Number.POSITIVE_INFINITY,
              ease: "linear",
            },
          }}
        />
        <div className="w-2 h-2 bg-[#C9A962] rotate-45" />
      </motion.div>

      <div className="absolute left-0 right-0 flex items-center justify-center gap-2 sm:gap-4 px-3 sm:px-4">
        <motion.div
          className="flex-1 h-px bg-gradient-to-r from-transparent to-[#C9A962]/50"
          initial={{ scaleX: 0 }}
          animate={isInView ? { scaleX: 1 } : {}}
          transition={{ duration: 1, delay: delay + 0.2 }}
          style={{ transformOrigin: "left" }}
        />
        <motion.div
          className="flex-1 h-px bg-gradient-to-l from-transparent to-[#C9A962]/50"
          initial={{ scaleX: 0 }}
          animate={isInView ? { scaleX: 1 } : {}}
          transition={{ duration: 1, delay: delay + 0.2 }}
          style={{ transformOrigin: "right" }}
        />
      </div>
    </div>
  )
}
