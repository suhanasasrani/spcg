"use client"

import { motion } from "framer-motion"
import { type ReactNode, useEffect, useState } from "react"

type TransitionVariant = "fade" | "slideUp" | "slideRight" | "parallax" | "sequential" | "slideLeft" | "zoomOut"

const variants = {
  fade: {
    initial: { opacity: 0, scale: 0.95 },
    animate: { opacity: 1, scale: 1 },
    exit: { opacity: 0, scale: 0.95 },
    transition: { duration: 0.6, ease: [0.19, 1, 0.22, 1] },
  },
  slideUp: {
    initial: { opacity: 0, y: 100 },
    animate: { opacity: 1, y: 0 },
    exit: { opacity: 0, y: -100 },
    transition: { duration: 0.7, ease: [0.22, 1, 0.36, 1] },
  },
  slideRight: {
    initial: { opacity: 0, x: -100 },
    animate: { opacity: 1, x: 0 },
    exit: { opacity: 0, x: 100 },
    transition: { duration: 0.7, ease: [0.22, 1, 0.36, 1] },
  },
  parallax: {
    initial: { opacity: 0, x: 100, scale: 0.9 },
    animate: { opacity: 1, x: 0, scale: 1 },
    exit: { opacity: 0, x: -100, scale: 0.9 },
    transition: { duration: 0.8, ease: [0.19, 1, 0.22, 1] },
  },
  sequential: {
    initial: { opacity: 0 },
    animate: { opacity: 1 },
    exit: { opacity: 0 },
    transition: { duration: 0.6, ease: "easeInOut" },
  },
  slideLeft: {
    initial: { opacity: 0, x: 100, filter: "blur(10px)" },
    animate: { opacity: 1, x: 0, filter: "blur(0px)" },
    exit: { opacity: 0, x: -100, filter: "blur(10px)" },
    transition: { duration: 0.7, ease: [0.22, 1, 0.36, 1] },
  },
  zoomOut: {
    initial: { opacity: 0, scale: 1.2 },
    animate: { opacity: 1, scale: 1 },
    exit: { opacity: 0, scale: 0.8 },
    transition: { duration: 0.8, ease: [0.19, 1, 0.22, 1] },
  },
}

export function PageTransition({ children, variant = "fade" }: { children: ReactNode; variant?: TransitionVariant }) {
  const [isMounted, setIsMounted] = useState(false)
  const transitionConfig = variants[variant]

  useEffect(() => {
    setIsMounted(true)
  }, [])

  if (!isMounted) return null

  return (
    <motion.div
      initial={transitionConfig.initial}
      animate={transitionConfig.animate}
      exit={transitionConfig.exit}
      transition={transitionConfig.transition}
    >
      {children}
    </motion.div>
  )
}
