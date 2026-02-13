"use client"

import { motion, useInView } from "framer-motion"
import { useRef } from "react"

const partners = [
  { name: "TechCorp", logo: "/tech-company-logo.jpg" },
  { name: "Innovate Inc", logo: "/innovation-company-logo.png" },
  { name: "Global Solutions", logo: "/global-company-logo.png" },
  { name: "Future Labs", logo: "/future-tech-logo.png" },
  { name: "Design Studio", logo: "/design-studio-logo.png" },
  { name: "Digital Ventures", logo: "/digital-company-logo.png" },
]

// Duplicate partners for seamless loop
const extendedPartners = [...partners, ...partners, ...partners]

export function Partners() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: "-100px" })

  return (
    <section
      ref={ref}
      className="relative py-20 px-6 overflow-hidden bg-transparent"
    >
      <div className="max-w-7xl mx-auto relative z-10 mb-12">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="text-4xl md:text-5xl font-bold text-white text-center text-balance"
        >
          Our Partners
        </motion.h2>
      </div>

      <div className="relative w-full overflow-hidden">

        <motion.div
          className="flex gap-8 py-8"
          animate={{ x: [0, -2000] }}
          transition={{
            duration: 30,
            repeat: Number.POSITIVE_INFINITY,
            ease: "linear",
          }}
        >
          {extendedPartners.map((partner, index) => (
            <div
              key={`${partner.name}-${index}`}
              className="flex-shrink-0 w-48 h-32 bg-[#000f3f]/30 border border-[#000e38] p-6 flex items-center justify-center group hover:border-[#C9A962]/70 transition-colors duration-300"
            >
              <img
                src={partner.logo || "/placeholder.svg"}
                alt={partner.name}
                className="max-w-full max-h-full object-contain grayscale opacity-70 group-hover:opacity-100 transition-opacity duration-300"
              />
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  )
}
