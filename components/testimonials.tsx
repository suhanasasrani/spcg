"use client"

import { motion, useInView } from "framer-motion"
import { useRef, useState, useEffect } from "react"
import { ChevronLeft, ChevronRight } from "lucide-react"

const testimonials = [
  {
    id: 1,
    quote: "The SPCG team did an excellent job taking multiple demos, making detailed notes, and helping us evaluate options meaningfully. Their inputs played a key role in helping us arrive at the right conclusion.",
    name: "Swapnil Bawane",
    role: "Representative for Alumni Network & Institutional Partnerships",
    organization: "Sardar Patel Institute of Technology (SPIT), Mumbai",
  },
  {
    id: 2,
    quote: "What stood out most was the team’s willingness to take ownership of the initiative and see it through end to end. The way they showed up for every discussion, took charge without being asked, and made thoughtful, sharp contributions was genuinely inspiring.",
    name: "Chirag Katarukanow",
    role: "Project Mentor",
    organization: "SPCG (Sardar Patel Consulting Group)",
  },
  {
    id: 3,
    quote: "The clarity they brought to our business process was remarkable. Every recommendation was backed by data, and the impact on our metrics was measurable and significant.",
    name: "Elena Rodriguez",
    role: "VP of Operations",
    organization: "Global Systems Corp",
  },
  {
    id: 4,
    quote: "Exceptional attention to detail combined with strategic thinking. They helped us navigate complex challenges with a framework that our entire organization could understand and execute.",
    name: "James Mitchell",
    role: "Founder & CEO",
    organization: "Digital Growth Partners",
  },
]

export function Testimonials() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: "-100px" })
  const [current, setCurrent] = useState(0)

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrent((prev) => (prev + 1) % testimonials.length)
    }, 6000)
    return () => clearInterval(timer)
  }, [])

  const getCardRotation = (index: number) => {
    const distance = (index - current + testimonials.length) % testimonials.length
    if (distance > testimonials.length / 2) {
      return distance - testimonials.length
    }
    return distance
  }

  const next = () => setCurrent((prev) => (prev + 1) % testimonials.length)
  const prev = () => setCurrent((prev) => (prev - 1 + testimonials.length) % testimonials.length)

  return (
    <section ref={ref} className="relative py-16 px-6 overflow-hidden">
      <div className="max-w-7xl mx-auto">
        {/* Section Header with Decorative Elements */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <motion.div
            initial={{ scaleX: 0 }}
            animate={isInView ? { scaleX: 1 } : {}}
            transition={{ duration: 1, ease: "easeOut" }}
            className="h-1 w-16 bg-gradient-to-r from-transparent via-[#C9A962] to-transparent mx-auto mb-6"
          />
          <h2 className="text-4xl md:text-5xl font-bold text-white text-balance mb-3">
            Testimonials
          </h2>
          <p className="text-[#B8C5D4] text-balance max-w-2xl mx-auto mb-4">
            Hear from those who've worked with us and experienced the impact firsthand
          </p>
          <motion.div
            initial={{ scaleX: 0 }}
            animate={isInView ? { scaleX: 1 } : {}}
            transition={{ duration: 1, ease: "easeOut", delay: 0.3 }}
            className="h-1 w-16 bg-gradient-to-r from-transparent via-[#C9A962] to-transparent mx-auto"
          />
        </motion.div>

        {/* 3D Carousel Container */}
        <div className="relative h-96 flex items-center justify-center perspective px-8">
          {/* Cards */}
          {testimonials.map((testimonial, index) => {
            const rotation = getCardRotation(index)
            const isCenter = rotation === 0
            const zIndex = testimonials.length - Math.abs(rotation)

            return (
              <motion.div
                key={testimonial.id}
                animate={{
                  rotateY: rotation * 25,
                  x: rotation * 120,
                  opacity: Math.abs(rotation) > 2 ? 0 : 1,
                  scale: isCenter ? 1 : 0.85,
                }}
                transition={{ type: "spring", stiffness: 300, damping: 30 }}
                style={{
                  zIndex: zIndex,
                  perspective: "1000px",
                }}
                className="absolute w-full max-w-2xl"
              >
                <motion.div
                  className="relative rounded-2xl p-8 h-80 flex flex-col justify-between border border-[#C9A962]/30 backdrop-blur-sm group cursor-pointer"
                  style={{
                    background: isCenter
                      ? "rgba(201, 169, 98, 0.1)"
                      : "rgba(15, 31, 60, 0.4)",
                  }}
                  whileHover={
                    isCenter
                      ? {
                          boxShadow: "0 20px 60px rgba(201, 169, 98, 0.2)",
                          borderColor: "#C9A962",
                        }
                      : {}
                  }
                >
                  {/* Quote Mark */}
                  <div className="text-6xl text-[#C9A962]/30 leading-none font-bold">
                    ""
                  </div>

                  {/* Quote Text */}
                  <p className="text-white text-sm md:text-base leading-relaxed font-medium line-clamp-4 flex-grow">
                    {testimonial.quote}
                  </p>

                  {/* Author Info */}
                  <div className="space-y-1 pt-4 border-t border-[#C9A962]/20">
                    <p className="text-white font-semibold text-sm">
                      {testimonial.name}
                    </p>
                    <p className="text-[#B8C5D4] text-xs">
                      {testimonial.role}
                    </p>
                    <p className="text-[#C9A962] text-xs font-medium">
                      {testimonial.organization}
                    </p>
                  </div>

                  {/* Active Indicator */}
                  {isCenter && (
                    <motion.div
                      className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-[#C9A962]/0 via-[#C9A962] to-[#C9A962]/0"
                      initial={{ scaleX: 0 }}
                      animate={{ scaleX: 1 }}
                      transition={{ duration: 0.6 }}
                      style={{ originX: 0 }}
                    />
                  )}
                </motion.div>
              </motion.div>
            )
          })}
        </div>

        {/* Navigation */}
        <div className="flex items-center justify-center gap-6 mt-6">
          <motion.button
            onClick={prev}
            whileHover={{ scale: 1.1, x: -3 }}
            whileTap={{ scale: 0.95 }}
            className="p-2 rounded-full border border-[#C9A962]/40 hover:border-[#C9A962] text-[#C9A962] hover:bg-[#C9A962]/10 transition-colors"
          >
            <ChevronLeft size={20} />
          </motion.button>

          {/* Dots */}
          <div className="flex gap-2">
            {testimonials.map((_, index) => (
              <motion.button
                key={index}
                onClick={() => setCurrent(index)}
                animate={{
                  scale: current === index ? 1.2 : 1,
                  backgroundColor:
                    current === index ? "#C9A962" : "rgba(201, 169, 98, 0.3)",
                }}
                className="w-2 h-2 rounded-full transition-colors"
              />
            ))}
          </div>

          <motion.button
            onClick={next}
            whileHover={{ scale: 1.1, x: 3 }}
            whileTap={{ scale: 0.95 }}
            className="p-2 rounded-full border border-[#C9A962]/40 hover:border-[#C9A962] text-[#C9A962] hover:bg-[#C9A962]/10 transition-colors"
          >
            <ChevronRight size={20} />
          </motion.button>
        </div>
      </div>
    </section>
  )
}
