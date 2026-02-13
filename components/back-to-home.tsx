"use client"

import { useRouter } from "next/navigation"
import { motion } from "framer-motion"

const repeatForever = Number.POSITIVE_INFINITY

export function BackToHome() {
  const router = useRouter()

  const handleReturn = () => {
    const returnSection = sessionStorage.getItem("homepage-return-section")
    sessionStorage.removeItem("homepage-return-section")
    
    // Navigate to home with hash for smooth scroll
    if (returnSection) {
      router.push(`/#${returnSection}`)
    } else {
      router.push("/")
    }
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay: 0.3 }}
      className="fixed top-8 left-8 z-50"
    >
      <motion.button
        onClick={handleReturn}
        whileHover={{ scale: 1.05, x: -5 }}
        whileTap={{ scale: 0.95 }}
        className="flex items-center gap-3 px-6 py-3 bg-transparent backdrop-blur-sm border border-[#C9A962]/50 hover:border-[#C9A962] transition-colors group cursor-pointer"
      >
        <motion.div
          animate={{
            x: [-3, 0, -3],
          }}
          transition={{
            duration: 1.5,
            repeat: repeatForever,
            ease: "easeInOut",
          }}
          className="text-[#C9A962] text-xl"
        >
          ←
        </motion.div>
        <div className="flex flex-col">
          <span className="text-xs text-[#C9A962]/60 uppercase tracking-wider">Return to</span>
          <span className="text-white font-bold tracking-wide group-hover:text-[#C9A962] transition-colors">
            SPCG
          </span>
        </div>
      </motion.button>
    </motion.div>
  )
}
