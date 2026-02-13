"use client"

import { motion, AnimatePresence } from "framer-motion"
import { useEffect, useRef, useState } from "react"

const services = [
  {
    title: "Consulting and Strategy",
    description: "Structured problem solving and strategic insights driven by real world business challenges.",
    fullDescription:
      "Structured problem solving and strategic insights driven by real world business challenges. We help organizations identify opportunities, navigate complexities, and build sustainable competitive advantages through rigorous analysis and actionable recommendations.",
  },
  {
    title: "Finance and Investment Readiness",
    description: "Financial analysis, modeling, and valuation built to meet industry and investment standards.",
    fullDescription:
      "Financial analysis, modeling, and valuation built to meet industry and investment standards. From pitch deck preparation to due diligence support, we equip startups and businesses with the financial rigor needed to attract capital and drive growth.",
  },
  {
    title: "Technology and Product Development",
    description: "End to end execution of technical solutions, from ideation to deployment.",
    fullDescription:
      "End to end execution of technical solutions, from ideation to deployment. We build MVPs, full stack applications, and automation tools that solve real problems, leveraging modern frameworks and best practices to deliver scalable, production ready products.",
  },
  {
    title: "Training and Professional Development",
    description: "Hands on training and mentorship designed to build industry ready professionals.",
    fullDescription:
      "Hands on training and mentorship designed to build industry ready professionals. Through structured workshops, case studies, and real project experience, we develop technical and business skills that translate directly to workplace performance.",
  },
  {
    title: "Market Research & Analysis",
    description: "Data-driven insights and competitive intelligence to inform strategic decisions.",
    fullDescription:
      "Data-driven insights and competitive intelligence to inform strategic decisions. We provide comprehensive market analysis, customer research, and trend forecasting to help businesses make informed decisions and stay ahead of the competition.",
  },
  {
    title: "Operational Excellence",
    description: "Process optimization and efficiency improvements for sustainable business growth.",
    fullDescription:
      "Process optimization and efficiency improvements for sustainable business growth. We identify bottlenecks, streamline workflows, and implement best practices to maximize productivity and reduce operational costs.",
  },
]

export function Services() {
  const containerRef = useRef<HTMLDivElement>(null)
  const [activeIndex, setActiveIndex] = useState(0)
  const [isAutoRotating, setIsAutoRotating] = useState(true)

  // Auto-rotate through services
  useEffect(() => {
    if (!isAutoRotating) return

    const interval = setInterval(() => {
      setActiveIndex((prev) => (prev + 1) % services.length)
    }, 4000)

    return () => clearInterval(interval)
  }, [isAutoRotating])

  const getOrbitPosition = (index: number, total: number, radius: number) => {
    const angle = (index / total) * 2 * Math.PI - Math.PI / 2
    return {
      x: Math.cos(angle) * radius,
      y: Math.sin(angle) * radius,
    }
  }

  const repeatForever = Number.POSITIVE_INFINITY

  return (
    <section
      ref={containerRef}
      className="relative overflow-hidden px-6 py-20"
    >
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.2 }}
        className="text-center mb-12 md:mb-20"
      >
        <div className="relative inline-block">
          <motion.div
            className="absolute inset-0 bg-gradient-to-r from-[#D4AF37]/30 via-[#FDB913]/25 to-[#D4AF37]/30 blur-2xl rounded-full"
            animate={{
              opacity: [0.5, 0.9, 0.5],
              scale: [1, 1.2, 1],
            }}
            transition={{
              duration: 4,
              repeat: Number.POSITIVE_INFINITY,
              ease: "easeInOut",
            }}
          />

          <h2 className="relative text-4xl md:text-5xl font-bold text-white text-balance">
            <motion.span
              initial={{ opacity: 0, x: -60 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{
                duration: 0.7,
                delay: 0.3,
                ease: "easeOut",
              }}
              className="inline-block mr-2"
            >
              Our
            </motion.span>
            <motion.span
              initial={{ opacity: 0, x: 60 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{
                duration: 0.7,
                delay: 0.5,
                ease: "easeOut",
              }}
              className="inline-block"
            >
              Services
            </motion.span>
          </h2>

          <motion.div
            initial={{ scaleX: 0, opacity: 0 }}
            animate={{ scaleX: 1, opacity: 1 }}
            transition={{
              duration: 0.8,
              delay: 0.9,
              ease: "easeOut",
            }}
            className="absolute bottom-0 left-0 right-0 h-2 bg-gradient-to-r from-transparent via-[#FFD700] to-transparent origin-left"
          />

          <motion.div
            initial={{ opacity: 0, scale: 0, y: -20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 1.1, ease: "backOut" }}
            className="absolute -top-8 right-0 w-3 h-3 bg-[#FFD700] rounded-full shadow-lg shadow-[#FFD700]/50"
          />
          <motion.div
            initial={{ opacity: 0, scale: 0, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 1.2, ease: "backOut" }}
            className="absolute -bottom-8 left-0 w-2 h-2 bg-[#D4AF37] rounded-full shadow-lg shadow-[#D4AF37]/50"
          />
        </div>
      </motion.div>

      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col lg:flex-row items-center justify-between gap-8 lg:gap-16 min-h-[70vh]">
          {/* Left side - Globe/Sphere with orbiting service items */}
          <div className="relative w-full lg:w-1/2 flex items-center justify-center">
            <div className="relative w-[380px] h-[380px] md:w-[520px] md:h-[520px]">
              {/* Rotating outer ring */}
              <motion.div
                animate={{ rotate: 360 }}
                transition={{ duration: 30, repeat: repeatForever, ease: "linear" }}
                className="absolute inset-[60px] md:inset-[80px]"
              >
                <div className="absolute inset-0 border border-[#D4AF37]/20 rounded-full" />
              </motion.div>

              {/* Second rotating ring */}
              <motion.div
                animate={{ rotate: -360 }}
                transition={{ duration: 25, repeat: repeatForever, ease: "linear" }}
                className="absolute inset-[70px] md:inset-[90px]"
              >
                <div className="absolute inset-0 border border-[#D4AF37]/15 rounded-full" />
              </motion.div>

              <div className="absolute inset-[80px] md:inset-[100px] rounded-full bg-transparent border-2 border-[#C9A962]/30 shadow-[0_0_60px_rgba(201,169,98,0.15)] overflow-hidden">
                <div className="absolute inset-0 opacity-20 bg-[#000f3f]" />

                <div className="absolute inset-0 flex items-center justify-center p-4 md:p-6">
                  <AnimatePresence mode="wait">
                    <motion.div
                      key={activeIndex}
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -10 }}
                      transition={{ duration: 0.4 }}
                      className="text-center"
                    >
                      <h3 className="text-white text-sm md:text-lg font-bold leading-tight text-balance px-2">
                        {services[activeIndex].title}
                      </h3>
                    </motion.div>
                  </AnimatePresence>
                </div>

                {/* Internal glow */}
                <div className="absolute inset-0 rounded-full shadow-[inset_0_0_80px_rgba(201,169,98,0.15)] pointer-events-none" />
              </div>

              {services.map((_, index) => {
                const position = getOrbitPosition(index, services.length, 170)
                const isActive = index === activeIndex

                return (
                  <button
                    key={index}
                    onClick={() => {
                      setActiveIndex(index)
                      setIsAutoRotating(false)
                      setTimeout(() => setIsAutoRotating(true), 10000)
                    }}
                    className={`absolute w-10 h-10 md:w-12 md:h-12 rounded-full flex items-center justify-center cursor-pointer transition-all duration-300 ${
                      isActive
        ? "bg-[#C9A962] text-[#001146] shadow-[0_0_30px_rgba(201,169,98,0.5)]"
        : "bg-[#000f3f]/90 text-[#C9A962] hover:bg-[#000e38] border border-[#C9A962]/30"
                    }`}
                    style={{
                      left: `calc(50% + ${position.x}px)`,
                      top: `calc(50% + ${position.y}px)`,
                      transform: "translate(-50%, -50%)",
                    }}
                  >
                    <span className={`text-sm md:text-base font-bold ${isActive ? "text-[#001146]" : "text-[#C9A962]"}`}>
                      {String(index + 1).padStart(2, "0")}
                    </span>
                  </button>
                )
              })}

              <svg className="absolute inset-0 w-full h-full pointer-events-none" viewBox="0 0 520 520">
                {services.map((_, index) => {
                  const position = getOrbitPosition(index, services.length, 170)
                  const isActive = index === activeIndex
                  const centerX = 260
                  const centerY = 260

                  return (
                    <line
                      key={index}
                      x1={centerX}
                      y1={centerY}
                      x2={centerX + position.x}
                      y2={centerY + position.y}
                      stroke="#D4AF37"
                      strokeWidth={isActive ? 2 : 0.5}
                      strokeOpacity={isActive ? 0.6 : 0.15}
                      className="transition-all duration-300"
                    />
                  )
                })}
              </svg>
            </div>
          </div>

          {/* Right side - Service cards that rotate based on active selection */}
          <div className="w-full lg:w-1/2 relative h-[400px] md:h-[500px] flex items-center justify-center">
            <AnimatePresence mode="wait">
              <motion.div
                key={activeIndex}
                initial={{ opacity: 0, rotateY: 90, x: 50 }}
                animate={{ opacity: 1, rotateY: 0, x: 0 }}
                exit={{ opacity: 0, rotateY: -90, x: -50 }}
                transition={{ duration: 0.6, ease: "easeInOut" }}
                className="w-full max-w-lg"
                style={{ transformStyle: "preserve-3d", perspective: "1000px" }}
              >
                <div className="relative p-8 md:p-10 bg-transparent border border-[#C9A962]/30 rounded-2xl hover:border-[#C9A962]/50 transition-colors backdrop-blur-sm shadow-2xl">
                  {/* Service number badge */}
                  <div className="flex items-center gap-4 mb-6">
                    <div className="w-12 h-12 rounded-full bg-[#C9A962] flex items-center justify-center">
                      <span className="text-[#001146] font-bold text-lg">{String(activeIndex + 1).padStart(2, "0")}</span>
                    </div>
                    <div className="h-1 flex-1 bg-gradient-to-r from-[#C9A962] to-transparent rounded-full" />
                  </div>

                  {/* Service title */}
                  <h3 className="text-2xl md:text-3xl font-bold text-white mb-4">{services[activeIndex].title}</h3>

                  {/* Service description */}
                  <p className="text-[#B8C5D4] leading-relaxed text-base md:text-lg">
                    {services[activeIndex].fullDescription}
                  </p>

                  {/* Decorative corner accents */}
                  <div className="absolute top-0 right-0 w-16 h-16 border-t-2 border-r-2 border-[#C9A962]/30 rounded-tr-2xl pointer-events-none" />
                  <div className="absolute bottom-0 left-0 w-16 h-16 border-b-2 border-l-2 border-[#C9A962]/30 rounded-bl-2xl pointer-events-none" />
                </div>
              </motion.div>
            </AnimatePresence>

            {/* Background cards for depth effect */}
            <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
              <div className="w-full max-w-lg h-full relative">
                {[1, 2].map((offset) => (
                  <div
                    key={offset}
                    className="absolute inset-0 bg-[#000f3f]/30 border border-[#000e38]/50 rounded-2xl"
                    style={{
                      transform: `translateX(${offset * 10}px) translateY(${offset * 10}px) scale(${1 - offset * 0.03})`,
                      zIndex: -offset,
                    }}
                  />
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Progress indicator */}
        <div className="flex justify-center items-center gap-4 mt-12">
          <div className="flex gap-2">
            {services.map((_, index) => (
              <button
                key={index}
                onClick={() => {
                  setActiveIndex(index)
                  setIsAutoRotating(false)
                  setTimeout(() => setIsAutoRotating(true), 10000)
                }}
                className="relative h-1 overflow-hidden rounded-full transition-all duration-300"
                style={{ width: index === activeIndex ? "48px" : "8px" }}
              >
                <div className={`absolute inset-0 ${index === activeIndex ? "bg-[#C9A962]/30" : "bg-[#000e38]"}`} />
                {index === activeIndex && isAutoRotating && (
                  <motion.div
                    className="absolute inset-0 bg-[#C9A962]"
                    initial={{ scaleX: 0 }}
                    animate={{ scaleX: 1 }}
                    transition={{ duration: 4, ease: "linear" }}
                    style={{ transformOrigin: "left" }}
                  />
                )}
              </button>
            ))}
          </div>
        </div>

        {/* Instructions */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 1 }}
          className="mt-6 text-center"
        >
          <p className="text-[#B8C5D4]/60 text-xs uppercase tracking-widest">
            Click on the orbit points to navigate services
          </p>
        </motion.div>
      </div>
    </section>
  )
}
