"use client"

import { motion, useInView, useScroll, useTransform } from "framer-motion"
import { useRef, useState } from "react"

const alumni = [
  {
    name: "Dr. Elena Martinez",
    achievement: "Founded successful AI startup",
    image: "/professional-woman-portrait-grayscale.jpg",
  },
  {
    name: "David Kim",
    achievement: "Lead designer at Fortune 100 company",
    image: "/professional-man-grayscale-portrait.png",
  },
  {
    name: "Rachel Foster",
    achievement: "Award-winning creative director",
    image: "/professional-woman-portrait-grayscale.jpg",
  },
  {
    name: "Alex Thompson",
    achievement: "Tech innovator and author",
    image: "/professional-person-portrait-grayscale.jpg",
  },
]

export function Alumni() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: "-200px" })
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null)

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "start center"],
  })

  const entranceZ = useTransform(scrollYProgress, [0, 1], [-400, 0])
  const entranceOpacity = useTransform(scrollYProgress, [0, 0.5, 1], [0, 0.5, 1])

  return (
    <section ref={ref} className="relative py-32 px-6 perspective-1000" style={{ backgroundAttachment: "fixed" }}>
      <div className="max-w-7xl mx-auto">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="text-4xl md:text-5xl font-bold text-white mb-16 text-center text-balance"
        >
          Notable Alumni
        </motion.h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {alumni.map((member, index) => (
            <motion.div
              key={member.name}
              initial={{ opacity: 0, scale: 0.8 }}
              animate={
                isInView
                  ? {
                      opacity: 1,
                      scale: 1,
                      y: hoveredIndex === index ? 0 : [0, -12, 0],
                    }
                  : {
                      opacity: 0,
                      scale: 0.8,
                    }
              }
              transition={{
                opacity: { duration: 1, delay: index * 0.15 },
                scale: { duration: 1, delay: index * 0.15 },
                y:
                  hoveredIndex === index
                    ? { duration: 0 }
                    : { duration: 5 + index * 0.5, repeat: Number.POSITIVE_INFINITY, ease: "easeInOut" },
              }}
              whileHover={{
                scale: 1.08,
                y: -12,
                rotateX: -8,
                rotateY: 5,
                transition: { duration: 0.4 },
              }}
              className="group cursor-pointer preserve-3d"
              onMouseEnter={() => setHoveredIndex(index)}
              onMouseLeave={() => setHoveredIndex(null)}
              style={{
                perspective: "1200px",
              }}
            >
              <motion.div
                className="relative overflow-hidden bg-[#000f3f]/30 border border-[#000e38]"
                animate={{
                  boxShadow:
                    hoveredIndex === index
                      ? "0 20px 40px rgba(0,0,0,0.5), 0 0 60px rgba(201,169,98,0.3)"
                      : "0 10px 20px rgba(0,0,0,0.3)",
                }}
                transition={{ duration: 0.3 }}
              >
                <img
                  src={member.image || "/placeholder.svg"}
                  alt={member.name}
                  className="w-full aspect-square object-cover grayscale"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#001146]/90 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                <div className="absolute bottom-0 left-0 right-0 p-6 translate-y-full group-hover:translate-y-0 transition-transform duration-300">
                  <h3 className="text-lg font-bold text-white mb-1 text-balance">{member.name}</h3>
                  <p className="text-sm text-[#B8C5D4]">{member.achievement}</p>
                </div>
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{
                    opacity: hoveredIndex === index ? [0, 0.8, 0] : 0,
                  }}
                  transition={{
                    duration: 1.5,
                    repeat: hoveredIndex === index ? Number.POSITIVE_INFINITY : 0,
                  }}
                  className="absolute inset-0 border-2 border-[#C9A962] pointer-events-none"
                  style={{
                    boxShadow:
                      "0 0 30px rgba(201, 169, 98, 1), inset 0 0 30px rgba(201, 169, 98, 0.5), 0 0 60px rgba(201, 169, 98, 0.6)",
                  }}
                />
              </motion.div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
