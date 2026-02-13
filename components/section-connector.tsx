"use client"

import { motion } from "framer-motion"

export function SectionConnector() {
  return (
    <div className="relative h-32 flex items-center justify-center">
      <div className="absolute inset-0 flex justify-center">
        <div
          className="w-1 bg-gradient-to-b from-transparent via-[#FFD700] to-transparent"
          style={{
            boxShadow:
              "0 0 30px rgba(255, 215, 0, 1), 0 0 60px rgba(255, 215, 0, 0.6), inset 0 0 20px rgba(255, 215, 0, 0.8)",
          }}
        />
      </div>

      <motion.div
        className="absolute w-4 h-4 bg-[#FFD700] rounded-full"
        animate={{
          opacity: [0.3, 1, 0.3],
          scale: [0.8, 1.2, 0.8],
        }}
        transition={{ duration: 2, repeat: Number.POSITIVE_INFINITY }}
        style={{
          boxShadow: "0 0 20px rgba(255, 215, 0, 1), 0 0 40px rgba(255, 215, 0, 0.6)",
        }}
      />
    </div>
  )
}
