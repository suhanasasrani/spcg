"use client"

import { motion, useInView, AnimatePresence } from "framer-motion"
import { useRef, useState, useEffect } from "react"
import { ChevronLeft, ChevronRight } from "lucide-react"

const repeatForever = Number.POSITIVE_INFINITY

const sections = [
  {
    title: "About Us",
    content: [
      "Sardar Patel Consulting Group (SPCG) is a consulting and execution partner that helps organizations turn ideas into measurable impact. We collaborate with startups, founders, and growing businesses to design, build, and scale high-quality websites and applications, while also providing strategic, financial, analytical, and operational guidance. Our approach blends consulting insight with hands-on execution, ensuring solutions are practical, data-driven, and aligned with long-term business objectives. Every engagement is driven by a structured problem-solving mindset, clear communication, and strong ownership, enabling efficient delivery, scalable outcomes, and real business value. From establishing a digital presence to navigating complex non-technical decisions, SPCG acts as a reliable partner focused on clarity, execution, and results.",
    ],
  },
  {
    title: "Our Mission",
    content: [
      "To bridge the gap between strategy and execution by delivering skilled talent, practical expertise, and industry-ready solutions that help organizations succeed across both technical and non-technical domains.",
      "We believe that great businesses are built on strong foundations—combining strategic vision with tactical excellence, clear communication, and measurable results. Our mission is to empower leaders and teams to navigate complex challenges with confidence, backed by data-driven insights and hands-on support at every step.",
    ],
  },
  {
    title: "Our Vision",
    content: [
      "To establish SPCG as a trusted and prestigious consulting partner, recognized for delivering high-quality solutions, practical expertise, and reliable execution that meet real-world industry needs.",
      "We envision a future where organizations of all sizes have access to world-class consulting and execution capabilities, enabling them to compete effectively, scale rapidly, and achieve sustainable growth in their markets.",
    ],
  },
  {
    title: "Why SPCG",
    content: [
      "At SPCG, we prioritize outcomes over optics and substance over shortcuts. Our teams go beyond understanding how industries operate, they actively contribute by delivering solutions that create real, measurable value for our clients.",
      "We combine deep industry expertise with hands-on execution, ensuring every recommendation is practical, actionable, and aligned with your business goals. Our commitment to transparency, accountability, and partnership means you're never just a client—you're a trusted collaborator in your own success.",
    ],
  },
]

const truncateToLines = (text: string, lines = 3) => {
  const charsPerLine = 85
  const charLimit = charsPerLine * lines
  if (text.length > charLimit) {
    return text.substring(0, charLimit) + "..."
  }
  return text
}

export function About() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: "-100px" })
  const [currentIndex, setCurrentIndex] = useState(0)
  const [isActive, setIsActive] = useState(false)
  const [hasEnlarged, setHasEnlarged] = useState(false)

  useEffect(() => {
    if (isActive) return

    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev === sections.length - 1 ? 0 : prev + 1))
    }, 30000)

    return () => clearInterval(interval)
  }, [isActive])

  const handleCardClick = () => {
    if (!hasEnlarged) {
      setIsActive(true)
      setHasEnlarged(true)
    } else {
      setIsActive(!isActive)
    }
  }

  const goToPrev = () => {
    setCurrentIndex((prev) => (prev === 0 ? sections.length - 1 : prev - 1))
  }

  const goToNext = () => {
    setCurrentIndex((prev) => (prev === sections.length - 1 ? 0 : prev + 1))
  }

  return (
    <section
      ref={ref}
      className="relative py-12 sm:py-20 md:py-32 px-3 sm:px-4 md:px-6 overflow-hidden"
      style={{
        paddingTop: isActive ? "8rem" : "3rem",
        paddingBottom: isActive ? "8rem" : "3rem",
      }}
    >
      <div className="absolute top-0 left-0 right-0 h-12 sm:h-20 bg-gradient-to-b from-transparent via-[#C9A962]/10 to-transparent pointer-events-none" />

      <svg
        className="absolute inset-0 w-full h-full pointer-events-none"
        viewBox="0 0 1000 800"
        preserveAspectRatio="none"
      >
        <defs>
          <filter id="glow-about">
            <feGaussianBlur stdDeviation="3" result="coloredBlur" />
            <feMerge>
              <feMergeNode in="coloredBlur" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
          <filter id="backdrop-blur">
            <feGaussianBlur in="SourceGraphic" stdDeviation="2" />
          </filter>
        </defs>

        <motion.path
          initial={{ pathLength: 0, opacity: 0 }}
          animate={isInView ? { pathLength: 1, opacity: 0.4 } : {}}
          transition={{ duration: 2, ease: "easeInOut" }}
          d="M 0 200 Q 250 400, 500 350 T 1000 500"
          stroke="#C9A962"
          strokeWidth="2"
          fill="none"
          filter="url(#glow-about)"
        />

        <motion.path
          initial={{ pathLength: 0, opacity: 0 }}
          animate={isInView ? { pathLength: 1, opacity: 0.3 } : {}}
          transition={{ duration: 2.5, delay: 0.3, ease: "easeInOut" }}
          d="M 0 600 Q 300 400, 600 550 T 1000 300"
          stroke="#C9A962"
          strokeWidth="1.5"
          fill="none"
          filter="url(#glow-about)"
        />

        {[0, 0.33, 0.66].map((offset, i) => (
          <motion.circle
            key={i}
            initial={{ opacity: 0 }}
            animate={
              isInView
                ? {
                    opacity: [0, 0.8, 0.8, 0],
                  }
                : {}
            }
            transition={{
              duration: 5,
              delay: offset * 5,
              repeat: repeatForever,
              ease: "linear",
            }}
          r="4"
          fill={i % 2 === 0 ? "#C9A962" : "#ffffff"}
            filter="url(#glow-about)"
          >
            <animateMotion
              dur="5s"
              begin={`${offset * 5}s`}
              repeatCount="indefinite"
              path="M 0 200 Q 250 400, 500 350 T 1000 500"
            />
          </motion.circle>
        ))}

        <motion.circle
          animate={{
            r: [100, 150, 100],
            opacity: [0.08, 0.2, 0.08],
          }}
          transition={{
            duration: 4,
            repeat: repeatForever,
            ease: "easeInOut",
          }}
          cx="200"
          cy="400"
          r="100"
          stroke="#C9A962"
          strokeWidth="1"
          fill="none"
          opacity="0.2"
        />

        <motion.circle
          animate={{
            r: [80, 120, 80],
            opacity: [0.1, 0.25, 0.1],
          }}
          transition={{
            duration: 3.5,
            delay: 1,
            repeat: repeatForever,
            ease: "easeInOut",
          }}
          cx="800"
          cy="300"
          r="80"
          stroke="#C9A962"
          strokeWidth="1"
          fill="none"
          opacity="0.2"
        />
      </svg>

      <div className="relative max-w-7xl mx-auto">
        <div className="flex flex-col md:flex-row justify-center items-center gap-2 sm:gap-4 md:gap-8 relative">
          <AnimatePresence mode="wait">
            <motion.div
              key={currentIndex}
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={
                isInView
                  ? {
                      opacity: 1,
                      scale: 1,
                      y: 0,
                    }
                  : {
                      opacity: 0,
                      scale: 0.95,
                      y: 20,
                    }
              }
              transition={{
                opacity: { duration: 0.5 },
                scale: { duration: 0.5, type: "spring", stiffness: 200 },
              }}
              exit={{ opacity: 0, scale: 0.95 }}
              onClick={handleCardClick}
              className="relative group rounded-2xl cursor-pointer w-full preserve-3d hover:shadow-2xl transition-all duration-300"
              style={{
                backgroundColor: "rgba(15, 31, 60, 0.9)",
                backdropFilter: "blur(10px)",
                maxWidth: "900px",
                minHeight: isActive ? "420px" : "300px",
                padding: "2.5rem",
                border: "1.5px solid rgba(201, 169, 98, 0.3)",
                boxShadow: "0 10px 40px rgba(201, 169, 98, 0.15), 0 0 60px rgba(201, 169, 98, 0.2)",
                transition: "min-height 0.5s ease, box-shadow 0.3s ease",
              }}
            >
              <div
                className="absolute inset-0 border-1.5 border-[#C9A962]/20 rounded-2xl pointer-events-none"
                style={{
                  boxShadow: "inset 0 0 30px rgba(30, 58, 95, 0.1)",
                }}
              />

              <motion.div
                initial={{ scaleX: 0 }}
                animate={isInView ? { scaleX: 1 } : {}}
                transition={{ duration: 0.6, delay: 0.3 }}
                className="absolute top-0 left-0 right-0 h-1.5 bg-gradient-to-r from-[#C9A962] via-[#ffffff] to-[#C9A962] origin-center rounded-t-2xl"
                style={{
                  boxShadow: "0 0 15px rgba(30, 58, 95, 0.6)",
                }}
              />

              <div className="relative h-full flex flex-col text-center">
                <h2 className="font-serif font-bold text-white mb-4 md:mb-6 text-2xl md:text-4xl">
                  {sections[currentIndex].title}
                </h2>

                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="space-y-4 text-white leading-relaxed overflow-hidden text-base md:text-lg flex-1 flex flex-col justify-center font-sans"
                >
                  {isActive ? (
                    <div className="overflow-y-auto max-h-[320px] pr-2 space-y-4">
                      {sections[currentIndex].content.map((paragraph, pIndex) => (
                        <p key={pIndex} className="text-left text-gray-100 leading-relaxed font-medium">
                          {paragraph}
                        </p>
                      ))}
                      <p className="text-[#C9A962] font-semibold text-sm mt-4">← Click to collapse</p>
                    </div>
                  ) : (
                    <div className="flex flex-col justify-center h-full space-y-4">
                      {sections[currentIndex].content.map((paragraph, pIndex) => (
                        <p key={pIndex} className="text-left text-gray-100 font-medium">
                          {truncateToLines(paragraph)}
                        </p>
                      ))}
                      <p className="text-[#C9A962] font-semibold text-sm mt-4">Click to view full story →</p>
                    </div>
                  )}
                </motion.div>
              </div>

              <div className="absolute bottom-5 left-1/2 transform -translate-x-1/2 flex gap-2.5">
                {sections.map((_, index) => (
                  <motion.div
                    key={index}
                    onClick={(e) => {
                      e.stopPropagation()
                      setCurrentIndex(index)
                    }}
                    className={`rounded-full transition-all cursor-pointer ${
                      index === currentIndex
        ? "bg-[#C9A962] w-8 h-2.5 shadow-lg shadow-[#C9A962]/40"
        : "bg-white/40 w-2 h-2 hover:bg-white/60"
                    }`}
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.95 }}
                  />
                ))}
              </div>
            </motion.div>
          </AnimatePresence>

          {/* Arrow Navigation */}
          <motion.button
            onClick={goToPrev}
            whileHover={{ scale: 1.1, x: -3 }}
            whileTap={{ scale: 0.95 }}
            className="absolute left-4 top-1/2 -translate-y-1/2 p-2.5 rounded-full border border-[#C9A962]/60 hover:border-[#C9A962] text-[#C9A962] hover:bg-[#C9A962]/15 bg-[#C9A962]/5 transition-colors z-10"
            aria-label="Previous slide"
          >
            <ChevronLeft size={28} strokeWidth={2} />
          </motion.button>

          <motion.button
            onClick={goToNext}
            whileHover={{ scale: 1.1, x: 3 }}
            whileTap={{ scale: 0.95 }}
            className="absolute right-4 top-1/2 -translate-y-1/2 p-2.5 rounded-full border border-[#C9A962]/60 hover:border-[#C9A962] text-[#C9A962] hover:bg-[#C9A962]/15 bg-[#C9A962]/5 transition-colors z-10"
            aria-label="Next slide"
          >
            <ChevronRight size={28} strokeWidth={2} />
          </motion.button>
        </div>
      </div>
    </section>
  )
}
