"use client"

import { motion, useInView } from "framer-motion"
import { useRef, useState } from "react"
import { ContactModal } from "./contact-modal"

export function Contact() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: "-100px" })
  const [isModalOpen, setIsModalOpen] = useState(false)

  return (
    <>
      <section
        ref={ref}
        className="relative min-h-screen flex items-center justify-center px-6 overflow-hidden"
      >
        <div className="absolute top-0 left-0 right-0 h-32 bg-gradient-to-b from-[#C9A962]/10 to-transparent pointer-events-none" />

        {/* Header Section */}
        <motion.div
          initial={{ opacity: 0, y: -40 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 1, ease: "easeOut" }}
          className="absolute top-20 left-0 right-0 text-center z-5"
        >
          <h3 className="text-sm md:text-base uppercase tracking-widest text-[#C9A962]/80 mb-3">
            Ready for the Next Step?
          </h3>
          <p className="text-[#B8C5D4] text-base md:text-lg max-w-2xl mx-auto px-6">
            We're here to turn your vision into reality. Let's discuss how we can collaborate on your next project.
          </p>
        </motion.div>

        <svg
          className="absolute inset-0 w-full h-full pointer-events-none"
          viewBox="0 0 1000 1000"
          preserveAspectRatio="xMidYMid meet"
        >
          <defs>
            <filter id="glow-contact">
              <feGaussianBlur stdDeviation="4" result="coloredBlur" />
              <feMerge>
                <feMergeNode in="coloredBlur" />
                <feMergeNode in="SourceGraphic" />
              </feMerge>
            </filter>
            <radialGradient id="centerGlow">
              <stop offset="0%" stopColor="#C9A962" stopOpacity="0.3" />
              <stop offset="100%" stopColor="#C9A962" stopOpacity="0" />
            </radialGradient>
          </defs>

          {/* Multiple converging paths */}
          <motion.path
            initial={{ pathLength: 0 }}
            animate={isInView ? { pathLength: 1 } : {}}
            transition={{ duration: 2.5, ease: "easeInOut" }}
            d="M 100 100 Q 200 300, 500 500"
            stroke="#C9A962"
            strokeWidth="2"
            fill="none"
            filter="url(#glow-contact)"
          />

          <motion.path
            initial={{ pathLength: 0 }}
            animate={isInView ? { pathLength: 1 } : {}}
            transition={{ duration: 2.5, delay: 0.2, ease: "easeInOut" }}
            d="M 900 100 Q 800 300, 500 500"
            stroke="#C9A962"
            strokeWidth="2"
            fill="none"
            filter="url(#glow-contact)"
          />

          <motion.path
            initial={{ pathLength: 0 }}
            animate={isInView ? { pathLength: 1 } : {}}
            transition={{ duration: 2.5, delay: 0.4, ease: "easeInOut" }}
            d="M 100 900 Q 200 700, 500 500"
            stroke="#C9A962"
            strokeWidth="2"
            fill="none"
            filter="url(#glow-contact)"
          />

          <motion.path
            initial={{ pathLength: 0 }}
            animate={isInView ? { pathLength: 1 } : {}}
            transition={{ duration: 2.5, delay: 0.6, ease: "easeInOut" }}
            d="M 900 900 Q 800 700, 500 500"
            stroke="#C9A962"
            strokeWidth="2"
            fill="none"
            filter="url(#glow-contact)"
          />

          {/* Pulsing center point */}
          <motion.circle
            animate={{
              r: [0, 300, 0],
              opacity: [0, 0.2, 0],
            }}
            transition={{
              duration: 3,
              repeat: Number.POSITIVE_INFINITY,
              ease: "easeOut",
            }}
            cx="500"
            cy="500"
            r="0"
            fill="url(#centerGlow)"
          />

          <motion.circle
            animate={{
              scale: [1, 1.5, 1],
              opacity: [0.8, 1, 0.8],
            }}
            transition={{
              duration: 2.5,
              repeat: Number.POSITIVE_INFINITY,
              ease: "easeInOut",
            }}
            cx="500"
            cy="500"
            r="40"
            fill="none"
            stroke="#C9A962"
            strokeWidth="3"
            filter="url(#glow-contact)"
          />

          <motion.circle
            animate={{
              scale: [1, 1.3, 1],
              opacity: [0.6, 1, 0.6],
            }}
            transition={{
              duration: 2,
              delay: 0.5,
              repeat: Number.POSITIVE_INFINITY,
              ease: "easeInOut",
            }}
            cx="500"
            cy="500"
            r="80"
            fill="none"
            stroke="#C9A962"
            strokeWidth="2"
            filter="url(#glow-contact)"
          />

          <motion.circle
            animate={{
              scale: [1, 1.2, 1],
              opacity: [0.4, 0.8, 0.4],
            }}
            transition={{
              duration: 3,
              delay: 1,
              repeat: Number.POSITIVE_INFINITY,
              ease: "easeInOut",
            }}
            cx="500"
            cy="500"
            r="120"
            fill="none"
            stroke="#C9A962"
            strokeWidth="1.5"
            filter="url(#glow-contact)"
          />

          {/* Particles converging to center */}
          {[0, 0.25, 0.5, 0.75].map((offset, i) => (
            <motion.circle
              key={`particle-${i}`}
              initial={{ opacity: 0 }}
              animate={
                isInView
                  ? {
                      opacity: [0, 1, 1, 0],
                    }
                  : {}
              }
              transition={{
                duration: 4,
                delay: 1 + offset * 4,
                repeat: Number.POSITIVE_INFINITY,
                ease: "linear",
              }}
              r="5"
              fill="#C9A962"
              filter="url(#glow-contact)"
            >
              <animateMotion
                dur="4s"
                begin={`${1 + offset * 4}s`}
                repeatCount="indefinite"
                path="M 100 100 Q 200 300, 500 500"
              />
            </motion.circle>
          ))}

          {[0, 0.3, 0.6].map((offset, i) => (
            <motion.circle
              key={`particle-2-${i}`}
              initial={{ opacity: 0 }}
              animate={
                isInView
                  ? {
                      opacity: [0, 1, 1, 0],
                    }
                  : {}
              }
              transition={{
                duration: 4,
                delay: 1 + offset * 4,
                repeat: Number.POSITIVE_INFINITY,
                ease: "linear",
              }}
              r="5"
              fill="#C9A962"
              filter="url(#glow-contact)"
            >
              <animateMotion
                dur="4s"
                begin={`${1 + offset * 4}s`}
                repeatCount="indefinite"
                path="M 900 100 Q 800 300, 500 500"
              />
            </motion.circle>
          ))}

          {/* Rotating orbital rings */}
          <motion.circle
            animate={{
              rotate: 360,
            }}
            transition={{
              duration: 20,
              repeat: Number.POSITIVE_INFINITY,
              ease: "linear",
            }}
            cx="500"
            cy="500"
            r="200"
            fill="none"
            stroke="#C9A962"
            strokeWidth="1"
            strokeDasharray="10 20"
            opacity="0.3"
            style={{ transformOrigin: "500px 500px" }}
          />
        </svg>

        <div className="relative z-10 text-center max-w-3xl">
          <motion.h2
            initial={{ opacity: 0, y: 30, scale: 0.9 }}
            animate={isInView ? { opacity: 1, y: 0, scale: 1 } : {}}
            transition={{ duration: 1, ease: [0.19, 1, 0.22, 1] }}
            className="text-4xl md:text-6xl font-bold mb-6 text-balance relative inline-block w-full"
          >
            <span className="relative">
              <span className="bg-gradient-to-r from-[#C9A962] via-white to-[#C9A962] bg-clip-text text-transparent">
                Let's Create Together
              </span>
              <motion.div
                initial={{ scaleX: 0 }}
                animate={isInView ? { scaleX: 1 } : {}}
                transition={{ duration: 1.2, delay: 0.5, ease: "easeOut" }}
                className="absolute -bottom-2 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-[#C9A962] to-transparent origin-center"
              />
            </span>
          </motion.h2>

          <motion.p
            initial={{ opacity: 0 }}
            animate={isInView ? { opacity: 1 } : {}}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="text-lg text-[#B8C5D4] mb-12 text-balance"
          />

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.6 }}
            className="relative inline-block"
          >
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.98 }}
              onClick={() => setIsModalOpen(true)}
              className="relative px-12 py-5 bg-[#C9A962] text-[#001146] border-2 border-[#C9A962] text-lg overflow-hidden group"
            >
              <motion.div
                animate={{
                  x: ["-100%", "100%"],
                }}
                transition={{
                  duration: 2,
                  repeat: Number.POSITIVE_INFINITY,
                  ease: "linear",
                }}
                className="absolute inset-0 bg-gradient-to-r from-transparent via-[#C9A962]/30 to-transparent"
              />
              <span className="relative z-10">Get In Touch</span>

              {/* Animated corners */}
              <motion.div
                animate={{
                  scale: [1, 1.2, 1],
                  opacity: [0.5, 1, 0.5],
                }}
                transition={{
                  duration: 2,
                  repeat: Number.POSITIVE_INFINITY,
                }}
                className="absolute top-0 left-0 w-3 h-3 border-t-2 border-l-2 border-[#C9A962]"
              />
              <motion.div
                animate={{
                  scale: [1, 1.2, 1],
                  opacity: [0.5, 1, 0.5],
                }}
                transition={{
                  duration: 2,
                  delay: 0.5,
                  repeat: Number.POSITIVE_INFINITY,
                }}
                className="absolute bottom-0 right-0 w-3 h-3 border-b-2 border-r-2 border-[#C9A962]"
              />
            </motion.button>

            <motion.div
              animate={{
                scale: [1, 1.5, 1],
                opacity: [0.2, 0.4, 0.2],
              }}
              transition={{
                duration: 2,
                repeat: Number.POSITIVE_INFINITY,
                ease: "easeInOut",
              }}
              className="absolute inset-0 bg-[#C9A962] blur-3xl -z-10"
            />
            <motion.div
              animate={{
                scale: [1, 1.8, 1],
                opacity: [0.1, 0.2, 0.1],
              }}
              transition={{
                duration: 3,
                delay: 0.5,
                repeat: Number.POSITIVE_INFINITY,
                ease: "easeInOut",
              }}
              className="absolute inset-0 bg-[#C9A962] blur-3xl -z-10 -m-4"
            />
          </motion.div>
        </div>
      </section>

      <ContactModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />
    </>
  )
}
