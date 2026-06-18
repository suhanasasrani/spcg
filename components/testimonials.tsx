"use client"

import { motion, useInView, AnimatePresence } from "framer-motion"
import { useRef, useState, useEffect } from "react"
import { Quote, ArrowRight } from "lucide-react"

const testimonialsData = [
  {
    id: 1,
    quote: "The SPCG team did an excellent job taking multiple demos, making detailed notes, and helping us evaluate options meaningfully. Their inputs played a key role in helping us arrive at the right conclusion.",
    name: "Swapnil Bawane",
    role: "Representative for Alumni Network",
    organization: "Sardar Patel Institute of Technology",
  },
  {
    id: 2,
    quote: "What stood out most was the team’s willingness to take ownership of the initiative and see it through end to end. The way they showed up for every discussion, took charge without being asked, and made thoughtful, sharp contributions was genuinely inspiring.",
    name: "Chirag Kataruka",
    role: "Project Mentor",
    organization: "SPCG",
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
  const [cards, setCards] = useState(testimonialsData)

  const moveToEnd = () => {
    setCards((prev) => {
      const newCards = [...prev]
      const first = newCards.shift()
      if (first) newCards.push(first)
      return newCards
    })
  }

  const moveToStart = () => {
    setCards((prev) => {
      const newCards = [...prev]
      const last = newCards.pop()
      if (last) newCards.unshift(last)
      return newCards
    })
  }

  // Auto flip every 5 seconds
  useEffect(() => {
    const timer = setInterval(() => {
      moveToEnd()
    }, 5000)
    return () => clearInterval(timer)
  }, [])

  return (
    <section ref={ref} className="relative py-24 px-6 overflow-hidden min-h-screen flex flex-col justify-center">
      <div className="absolute inset-0 bg-gradient-to-b from-[#000923] via-[#001339] to-[#000923] pointer-events-none -z-10" />
      
      {/* Decorative blurred lights */}
      <div className="absolute top-1/2 left-1/4 w-96 h-96 bg-[#C9A962]/10 blur-[120px] rounded-full pointer-events-none -z-10" />
      <div className="absolute top-1/3 right-1/4 w-96 h-96 bg-blue-500/10 blur-[120px] rounded-full pointer-events-none -z-10" />

      <div className="max-w-7xl mx-auto w-full">
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
            className="h-[2px] w-24 bg-gradient-to-r from-transparent via-[#C9A962] to-transparent mx-auto mb-6"
          />
          <h2 className="text-4xl md:text-5xl font-bold text-white text-balance mb-6">
            Client <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#C9A962] to-[#E5C989]">Testimonials</span>
          </h2>
          <p className="text-[#B8C5D4] text-lg max-w-2xl mx-auto font-light text-balance">
            Hear from those who've worked with us and experienced the impact firsthand
          </p>
        </motion.div>

        <div className="relative h-[450px] md:h-[350px] w-full max-w-3xl mx-auto flex justify-center perspective-[1000px]">
          <AnimatePresence mode="popLayout">
            {cards.map((testimonial, index) => {
              const isFront = index === 0
              return (
                <motion.div
                  key={testimonial.id}
                  layout
                  initial={{ opacity: 0, y: -50, scale: 0.9 }}
                  animate={{
                    x: index === 0 ? 0 : index === 1 ? 320 : index === cards.length - 1 ? -320 : 0,
                    y: index === 0 ? 0 : 20,
                    scale: index === 0 ? 1 : index === 1 || index === cards.length - 1 ? 0.8 : 0.6,
                    rotateY: index === 0 ? 0 : index === 1 ? -20 : index === cards.length - 1 ? 20 : 0,
                    rotateZ: index === 0 ? 0 : index === 1 ? 4 : index === cards.length - 1 ? -4 : 0,
                    zIndex: index === 0 ? 50 : index === 1 || index === cards.length - 1 ? 40 : 30,
                    opacity: index === 0 ? 1 : index === 1 || index === cards.length - 1 ? 0.4 : 0,
                  }}
                  exit={{ opacity: 0, y: 200, scale: 0.5 }}
                  transition={{ 
                    type: "spring", 
                    stiffness: 260, 
                    damping: 20,
                    layout: { duration: 0.4 } 
                  }}
                  className={`absolute left-0 right-0 mx-auto w-full max-w-xl cursor-pointer`}
                  onClick={() => {
                    if (index === 1) moveToEnd()
                    else if (index === cards.length - 1) moveToStart()
                  }}
                  style={{ transformOrigin: "top center" }}
                >
                  <div className="relative h-full bg-[#0a1530]/80 backdrop-blur-xl border border-white/10 hover:border-[#C9A962]/50 rounded-2xl p-8 md:p-10 transition-colors duration-500 flex flex-col justify-between shadow-[0_20px_50px_rgba(0,0,0,0.5)]">
                    {/* Highlight rim for front card */}
                    {isFront && (
                      <div className="absolute inset-0 border border-[#C9A962]/30 rounded-2xl animate-pulse pointer-events-none" />
                    )}
                    
                    <div>
                      <Quote className="w-10 h-10 text-[#C9A962]/40 mb-6" />
                      <p className="text-[#E2E8F0] text-lg md:text-xl leading-relaxed mb-8 font-light italic">
                        "{testimonial.quote}"
                      </p>
                    </div>
                    
                    <div className="flex items-center justify-between border-t border-white/10 pt-6">
                      <div className="flex items-center gap-4">
                        <div className="w-12 h-12 rounded-full bg-gradient-to-br from-[#C9A962] to-[#8C7335] flex items-center justify-center text-[#000923] font-bold text-xl shadow-lg">
                          {testimonial.name.charAt(0)}
                        </div>
                        <div>
                          <h4 className="text-white font-semibold text-lg">{testimonial.name}</h4>
                          <p className="text-[#C9A962] text-sm font-medium">{testimonial.role}</p>
                          <p className="text-[#8B9BB4] text-xs mt-1">{testimonial.organization}</p>
                        </div>
                      </div>
                      
                      {isFront && (
                        <div className="flex items-center gap-2 text-[#C9A962]/60 text-sm animate-pulse">
                          <span>Next</span>
                          <ArrowRight className="w-4 h-4" />
                        </div>
                      )}
                    </div>
                  </div>
                </motion.div>
              )
            })}
          </AnimatePresence>
        </div>
      </div>
    </section>
  )
}

