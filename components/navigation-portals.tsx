"use client"

import Link from "next/link"
import { motion, useInView } from "framer-motion"
import { useRef } from "react"
import { saveScrollPosition } from "@/hooks/use-scroll-restore"

const repeatForever = Number.POSITIVE_INFINITY

const portals = [
  {
    href: "/services",
    title: "Services",
    description: "Explore our innovative solutions",
    icon: "cube",
  },
  {
    href: "/projects",
    title: "Featured Projects",
    description: "Journey through our work",
    icon: "pathway",
  },
  {
    href: "/team",
    title: "Team",
    description: "Meet our visionaries",
    icon: "tree",
  },
]

function saveReturnSection() {
  if (typeof window !== "undefined") {
    sessionStorage.setItem("homepage-return-section", "portals")
  }
}

export function NavigationPortals() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: "-100px" })

  return (
    <section ref={ref} className="relative py-32 px-6 overflow-hidden">
      <div className="absolute top-0 left-0 right-0 h-20 bg-transparent pointer-events-none" />

      <svg
        className="absolute inset-0 w-full h-full pointer-events-none"
        viewBox="0 0 1000 800"
        preserveAspectRatio="none"
      >
        <defs>
          <filter id="glow-expertise">
            <feGaussianBlur stdDeviation="3" result="coloredBlur" />
            <feMerge>
              <feMergeNode in="coloredBlur" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
        </defs>

        {/* Single diagonal curvy path */}
        <motion.path
          initial={{ pathLength: 0, opacity: 0 }}
          animate={isInView ? { pathLength: 1, opacity: 0.5 } : {}}
          transition={{ duration: 2.5, ease: "easeInOut" }}
          d="M 0 100 Q 250 300, 500 250 T 1000 400"
          stroke="#FFD700"
          strokeWidth="2"
          fill="none"
          filter="url(#glow-expertise)"
        />
      </svg>

      <div className="max-w-7xl mx-auto relative z-10">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="text-4xl md:text-5xl font-bold text-white mb-16 text-center text-balance"
        >
          Explore Our Expertise
        </motion.h2>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {portals.map((portal, index) => (
            <Link
              key={portal.href}
              href={portal.href}
              onClick={() => {
                saveReturnSection()
                saveScrollPosition()
              }}
            >
              <motion.div
                initial={{ opacity: 0, y: 50 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.8, delay: index * 0.2 }}
                whileHover={{
                  scale: 1.05,
                  y: -10,
                  transition: { duration: 0.3 },
                }}
                className="group relative h-80 bg-transparent backdrop-blur-sm border-2 border-[#C9A962] overflow-hidden cursor-pointer"
              >
                <motion.div
                  animate={{
                    opacity: [0.3, 0.8, 0.3],
                  }}
                  transition={{
                    duration: 2,
                    repeat: repeatForever,
                    ease: "easeInOut",
                  }}
                  className="absolute inset-0 border-2 border-[#FFD700] opacity-0 group-hover:opacity-100 transition-opacity"
                  style={{
                    boxShadow: "0 0 40px rgba(255, 215, 0, 0.8), inset 0 0 40px rgba(255, 215, 0, 0.3)",
                  }}
                />

                {/* Icon visual */}
                <div className="absolute inset-0 flex items-center justify-center opacity-20 group-hover:opacity-30 transition-opacity">
                  {portal.icon === "cube" && (
                    <motion.div
                      animate={{
                        rotateY: [0, 360],
                      }}
                      transition={{
                        duration: 20,
                        repeat: repeatForever,
                        ease: "linear",
                      }}
                      className="w-40 h-40 border-4 border-[#FFD700]"
                      style={{ transformStyle: "preserve-3d" }}
                    />
                  )}
                  {portal.icon === "pathway" && (
                    <svg className="w-60 h-60" viewBox="0 0 200 200">
                      <motion.path
                        initial={{ pathLength: 0 }}
                        animate={{
                          pathLength: 1,
                        }}
                        transition={{
                          duration: 3,
                          repeat: repeatForever,
                          ease: "linear",
                        }}
                        d="M 20 100 Q 100 20, 180 100"
                        stroke="#FFD700"
                        strokeWidth="3"
                        fill="none"
                      />
                    </svg>
                  )}
                  {portal.icon === "tree" && (
                    <svg className="w-40 h-40" viewBox="0 0 100 100">
                      <motion.line
                        initial={{ pathLength: 0 }}
                        animate={{
                          pathLength: 1,
                        }}
                        transition={{
                          duration: 2,
                          repeat: repeatForever,
                          ease: "linear",
                        }}
                        x1="50"
                        y1="10"
                        x2="50"
                        y2="90"
                        stroke="#FFD700"
                        strokeWidth="2"
                      />
                      <motion.line x1="50" y1="30" x2="30" y2="50" stroke="#FFD700" strokeWidth="2" />
                      <motion.line x1="50" y1="30" x2="70" y2="50" stroke="#FFD700" strokeWidth="2" />
                    </svg>
                  )}
                </div>

                {/* Content */}
                <div className="relative h-full flex flex-col items-center justify-center p-8 text-center">
                  <motion.h3
                    className="text-3xl font-bold text-white mb-4 text-balance"
                    style={{
                      textShadow: "0 0 30px rgba(255, 215, 0, 0.6)",
                    }}
                  >
                    {portal.title}
                  </motion.h3>
                  <p className="text-[#7A8FA8] text-lg">{portal.description}</p>

                  {/* Enter indicator */}
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    whileHover={{ opacity: 1, y: 0 }}
                    className="absolute bottom-8 left-0 right-0 flex items-center justify-center gap-2 text-[#FFD700]"
                  >
                    <span className="text-sm uppercase tracking-wider">Enter</span>
                    <motion.div
                      animate={{
                        x: [0, 5, 0],
                      }}
                      transition={{
                        duration: 1.5,
                        repeat: repeatForever,
                        ease: "easeInOut",
                      }}
                    >
                      →
                    </motion.div>
                  </motion.div>
                </div>

                {/* Animated corner accents */}
                <motion.div
                  animate={{
                    scale: [1, 1.2, 1],
                    opacity: [0.5, 1, 0.5],
                  }}
                  transition={{
                    duration: 2,
                    delay: index * 0.3,
                    repeat: repeatForever,
                  }}
                  className="absolute top-0 left-0 w-8 h-8 border-t-2 border-l-2 border-[#FFD700]"
                />
                <motion.div
                  animate={{
                    scale: [1, 1.2, 1],
                    opacity: [0.5, 1, 0.5],
                  }}
                  transition={{
                    duration: 2,
                    delay: index * 0.3 + 1,
                    repeat: repeatForever,
                  }}
                  className="absolute bottom-0 right-0 w-8 h-8 border-b-2 border-r-2 border-[#FFD700]"
                />

                {/* Hover sweep effect */}
                <motion.div
                  initial={{ x: "-100%" }}
                  whileHover={{
                    x: "100%",
                    transition: { duration: 0.8, ease: "easeInOut" },
                  }}
                  className="absolute inset-0 bg-gradient-to-r from-transparent via-[#FFD700]/20 to-transparent pointer-events-none"
                />
              </motion.div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  )
}
