"use client"

import { motion, useScroll, useTransform, useInView, AnimatePresence } from "framer-motion"
import { useRef, useState, useEffect } from "react"
import { X } from "lucide-react"

const repeatForever = Number.POSITIVE_INFINITY

const projects = [
  {
    id: 1,
    title: "Alumni Association",
    category: "Operations & Tools",
    description: "Alumni SaaS Portal vendor selection and implementation support.",
    details:
      "SPCG supported the Alumni Association in selecting a suitable Alumni SaaS Portal by conducting a structured comparative business analysis (CBA) of 8–10 vendors. Using a standardized evaluation framework covering functionality, security, user experience, cost–value, and vendor credibility, SPCG shortlisted three vendors. The committee facilitated multiple vendor discussions and technical deep dives, enabling the Alumni Association to onboard a scalable, secure, and value-aligned solution.",
    fullDescription:
      "Evaluation Methodology\nEach vendor was assessed using a standardized evaluation framework developed by SPCG, covering:\n\n• Functional Capabilities\nAlumni database management, event handling, communication tools, donation & payment workflows\n\n• Technical & Security Aspects\nData privacy, platform scalability, system reliability, and integration support\n\n• User Experience\nEase of use for administrators and alumni, UI/UX quality, accessibility\n\n• Cost–Value Assessment\nPricing structures, long-term cost efficiency, feature-to-cost alignment\n\n• Vendor Credibility & Support\nTrack record, customer references, post-deployment support, SLAs",
    images: []
  },
  {
    id: 2,
    title: "Echoing Healthy Ageing",
    category: "Digital Therapy & Care Management",
    description:
      "Digital therapy & care platform for senior care, offering secure session booking, automated reminders, online payments, and admin analytics.",
    details:
      "Full-stack digital therapy & care management platform for senior care, with secure session booking, automated reminders, online payments, and admin analytics.",
    fullDescription: `Project Overview:
SPCG built a secure, scalable platform for Echoing Healthy Ageing, centralizing client bookings, therapist schedules, and admin operations. Designed for sensitive healthcare data, it ensures real-time session management and a user-friendly experience for elderly clients.

Business Problem:
The platform needed to handle multiple user roles, prevent scheduling conflicts, ensure data privacy, automate reminders and payments, and provide full admin visibility. Existing tools were fragmented and not healthcare-grade.

Solution & Features:

Role-Based Access: Clients book sessions, view therapists, get reminders; Therapists manage schedules & reports; Admins track operations & analytics.

Secure Auth & Access Control: Supabase authentication with role-specific UI.

Smart Booking: Real-time availability, session lifecycle management, admin overrides.

Automated Communication: WhatsApp reminders reduce missed sessions.

Payments: Razorpay integration for secure, transparent transactions.

Analytics: Dashboard for session volumes, therapist activity, and platform insights.

Impact:
Reduced manual work, improved session reliability, enhanced client experience, full admin visibility, and secure handling of healthcare data. Foundation ready for analytics and AI-driven insights.`,
    viewLiveUrl: "https://eha-rose.vercel.app/",
    images: [
      "/images/eha-group.jpg",
      "/images/eha-screenshot-1.png",
      "/images/eha-screenshot-2.png",
      "/images/eha-screenshot-3.png"
    ]
  },
  {
    id: 3,
    title: "Blueberry Fin",
    category: "Financial Technology",
    description: "Financial modeling and strategic positioning for a rapidly scaling fintech company.",
    details:
      "SPCG partnered with Blueberry Fin to refine their market positioning and optimize their financial models. The project focused on aligning their product offerings with market demands, streamlining revenue streams, and creating a scalable operational framework.",
    fullDescription:
      "Strategic Alignment & Financial Optimization\n\n• Market Analysis & Positioning\nConducted deep-dive analysis into the fintech landscape to carve out a unique value proposition for Blueberry Fin's services.\n\n• Financial Modeling\nDeveloped robust financial projections and scenario analyses to support future funding rounds and sustainable growth.\n\n• Operational Strategy\nCreated scalable frameworks to handle increasing transaction volumes without compromising on user experience or security.\n\n• Growth Initiatives\nIdentified key partnership opportunities to drive user acquisition and expand market reach.",
    viewLiveUrl: "https://www.blueberryfin.com/",
    images: [
      "/images/blueberry-screenshot-1.png",
      "/images/blueberry-screenshot-2.png"
    ]
  },
  {
    id: 4,
    title: "Loopify",
    category: "Sustainability & Tech",
    description: "End-to-end platform architecture and strategic roadmap for a circular economy startup.",
    details:
      "SPCG worked closely with Loopify to design a seamless digital experience that connects eco-conscious consumers with sustainable products. We provided a comprehensive technology architecture and go-to-market strategy.",
    fullDescription: "Empowering the Circular Economy\n\n• Platform Architecture\nDesigned a scalable, cloud-native architecture capable of supporting complex supply chain tracking and vendor integrations.\n\n• User Experience Strategy\nMapped out intuitive user journeys to simplify the process of discovering and purchasing sustainable products.\n\n• Go-To-Market Plan\nFormulated a targeted launch strategy focusing on key demographics and strategic brand partnerships to maximize initial impact.\n\n• Impact Measurement\nIntegrated analytics to track and display the environmental impact of user purchases, enhancing brand transparency and customer loyalty.",
    images: [
      "/images/loopify-logo.png"
    ]
  },
  {
    id: 5,
    title: "Boncare Insurance Solutions",
    category: "Corporate Insurance Platform",
    description: "A comprehensive platform for corporate and individual insurance management, focusing on clarity, trust, and expert support.",
    details:
      "Boncare delivers clear, human insurance advice with practical solutions and long-term, dedicated support when it matters most. Built on years of corporate exposure, it guides businesses and families with clarity and care.",
    fullDescription: "Everything Your Business Needs - Covered\n\n• Seamless Corporate & Individual Portals\nTailored digital experiences for enterprises, MSMEs, and individual policyholders to easily discover and manage coverage.\n\n• Claims Assistance Workflow\nStreamlined digital claims filing and tracking system ensuring fast, transparent resolution when it matters most.\n\n• Intelligent Quotation Engine\nIntegrated robust form processes to instantly connect prospective clients with tailored insurance solutions.\n\n• Policy Management\nEnd-to-end management from group health to liability and cyber insurance, all within an intuitive dashboard.",
    viewLiveUrl: "https://boncare1.lovable.app/corporate",
    images: [
      "/images/boncare-screenshot-1.png",
      "/images/boncare-screenshot-2.png",
      "/images/boncare-screenshot-3.png",
      "/images/boncare-screenshot-4.png"
    ]
  },
]

export function Projects() {
  const containerRef = useRef<HTMLDivElement>(null)
  const isInView = useInView(containerRef, { once: true, margin: "-100px" })
  const [expandedProject, setExpandedProject] = useState<number | null>(null)
  const [hoveredProject, setHoveredProject] = useState<number | null>(null)

  const { scrollYProgress } = useScroll({
    target: containerRef,
  })
  
  const drawProgress = scrollYProgress

  // Projects are evenly spaced for 5 items
  const positions = [10, 30, 50, 70, 90]
  
  const containerX = useTransform(scrollYProgress, [0, 1], ["0%", "-80%"]) // Moves the 500vw container left by 400vw, perfectly centering the last item (at 450vw) at the end of scroll
  
  const [enlargedImage, setEnlargedImage] = useState<string | null>(null)

  return (
    <>
      <section
        ref={containerRef}
        className="relative w-full h-[600vh] bg-[#000513]"
      >
        <div className="sticky top-0 h-screen overflow-hidden flex items-center">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8 }}
            className="fixed top-4 sm:top-8 md:top-16 left-0 right-0 text-2xl sm:text-3xl md:text-5xl font-bold text-white text-center text-balance z-20 pointer-events-none"
          >
            Featured Projects
          </motion.h2>

          <motion.div 
            className="w-[500vw] h-full flex items-center relative"
            style={{ x: containerX }}
          >
          <div className="absolute inset-0 pointer-events-none z-0">
            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-[#C9A962]/5 to-transparent" />
          </div>

          <div className="absolute inset-0 w-full h-full flex items-center">
            <svg className="w-full h-full pointer-events-none" viewBox="0 0 1000 100" preserveAspectRatio="none">
              <defs>
                <linearGradient id="pathGradient" x1="0%" y1="0%" x2="100%" y2="0%">
                  <stop offset="0%" stopColor="#FFDF88" stopOpacity="0.4" />
                  <stop offset="50%" stopColor="#FFFFFF" stopOpacity="1" />
                  <stop offset="100%" stopColor="#FFDF88" stopOpacity="0.4" />
                </linearGradient>
              </defs>

              {/* Bright static curvy track */}
              <motion.path
                initial={{ opacity: 0 }}
                animate={isInView ? { opacity: 1 } : {}}
                transition={{ duration: 1.5, delay: 0.2 }}
                d="M -100 52 C 0 52, 0 48, 100 48 C 200 48, 200 52, 300 52 C 400 52, 400 48, 500 48 C 600 48, 600 52, 700 52 C 800 52, 800 48, 900 48"
                stroke="#FFDF88"
                strokeWidth="0.5"
                fill="none"
                style={{
                  filter: "drop-shadow(0 0 10px rgba(255, 223, 136, 0.8)) drop-shadow(0 0 20px rgba(201, 169, 98, 0.6))"
                }}
              />

              {/* Main animated glowing curvy path following scroll */}
              <motion.path
                style={{
                  pathLength: drawProgress,
                  opacity: isInView ? 1 : 0,
                  filter: "drop-shadow(0 0 15px rgba(255, 255, 255, 0.8)) drop-shadow(0 0 30px rgba(255, 223, 136, 0.8))"
                }}
                transition={{ opacity: { duration: 1 } }}
                d="M -100 52 C 0 52, 0 48, 100 48 C 200 48, 200 52, 300 52 C 400 52, 400 48, 500 48 C 600 48, 600 52, 700 52 C 800 52, 800 48, 900 48"
                stroke="url(#pathGradient)"
                strokeWidth="1.5"
                fill="none"
              />

              {/* Clean waypoints for each project */}
              {positions.map((pos, index) => {
                return (
                  <motion.circle
                    key={`waypoint-${pos}`}
                    initial={{ scale: 0, opacity: 0 }}
                    animate={isInView ? { scale: 1, opacity: 1 } : {}}
                    transition={{ duration: 0.8, delay: 0.5 + pos / 100 }}
                    cx={pos * 10}
                    cy={index % 2 === 0 ? "48" : "52"}
                    r="2.5"
                    fill="#000923"
                    stroke="#FFDF88"
                    strokeWidth="1.5"
                    style={{
                      filter: "drop-shadow(0 0 5px rgba(255, 223, 136, 0.8))"
                    }}
                  />
                )
              })}
            </svg>
          </div>

          <div className="absolute inset-0 w-full h-full">
            {projects.map((project, index) => {
              const pos = positions[index]
              const isAbove = index % 2 === 0
              
              return (
                <div
                  key={project.id}
                  className="absolute z-10"
                  style={{ 
                    left: `${pos}%`,
                    top: `${isAbove ? 48 : 52}%`,
                    transform: 'translate(-50%, -50%)'
                  }}
                >
                  <motion.div
                    className="absolute left-1/2 -translate-x-1/2 w-0.5 bg-[#C9A962]/50"
                    style={{
                      height: "80px",
                      top: isAbove ? "auto" : "50%",
                      bottom: isAbove ? "50%" : "auto",
                      boxShadow: `0 0 10px rgba(212, 175, 55, 0.4)`,
                    }}
                  />

                  <motion.div
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={isInView ? { opacity: 1, scale: 1 } : {}}
                    whileHover={{
                      scale: 1.05,
                      boxShadow: "0 0 40px rgba(212, 175, 55, 0.6), inset 0 0 20px rgba(212, 175, 55, 0.15)",
                    }}
                    transition={{ duration: 0.5, delay: 0.5 + index * 0.15 }}
                    className="relative bg-[#000f3f]/95 border border-[#C9A962]/30 p-4 sm:p-5 cursor-pointer w-64 sm:w-72 md:w-80 backdrop-blur-sm shadow-2xl"
                    style={{
                      transform: `translateY(${isAbove ? '-160px' : '160px'})`
                    }}
                    onClick={() => setExpandedProject(project.id)}
                    onMouseEnter={() => setHoveredProject(project.id)}
                    onMouseLeave={() => setHoveredProject(null)}
                  >
                    <div className="text-[10px] sm:text-xs text-[#C9A962] mb-2 tracking-wider uppercase font-semibold">
                      {project.category}
                    </div>
                    <h3 className="text-sm sm:text-base md:text-lg font-bold text-white mb-2 text-balance leading-tight">
                      {project.title}
                    </h3>
                    <p className="text-[#B8C5D4] text-xs sm:text-sm leading-relaxed line-clamp-3 mb-4">
                      {project.description}
                    </p>

                    <div className="flex items-center justify-between pt-3 border-t border-[#C9A962]/20">
                      <span className="text-xs text-[#C9A962] hover:text-white font-semibold uppercase tracking-wider transition-colors">
                        View Case Study →
                      </span>
                    </div>
                  </motion.div>
                </div>
              )
            })}
          </div>
          </motion.div>
        </div>
      </section>

      <AnimatePresence>
        {expandedProject !== null && (
          <motion.div
            key="modal-backdrop"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 bg-black/30 backdrop-blur-md z-50 flex items-center justify-center p-4"
            onClick={() => setExpandedProject(null)}
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              transition={{ duration: 0.4, ease: "easeOut" }}
              className="relative w-full h-full max-w-4xl max-h-[85vh] bg-gradient-to-br from-[#000923] via-[#000d33] to-[#001339] border border-[#C9A962]/50 rounded-lg overflow-y-auto"
              onClick={(e) => e.stopPropagation()}
            >
              <button
                onClick={() => setExpandedProject(null)}
                className="sticky top-0 right-0 p-4 z-10 bg-[#000923]/80 backdrop-blur-sm hover:bg-[#000923]/95 transition-colors"
              >
                <X className="w-6 h-6 text-[#C9A962]" />
              </button>

              {projects.find((p) => p.id === expandedProject) && (
                <div className="p-6 sm:p-8 md:p-10 space-y-6">
                  <div>
                    <div className="text-[#C9A962] text-sm tracking-wider uppercase mb-2">
                      {projects.find((p) => p.id === expandedProject)?.category}
                    </div>
                    <h2 className="text-4xl sm:text-5xl font-bold text-white mb-4 text-balance">
                      {projects.find((p) => p.id === expandedProject)?.title}
                    </h2>
                  </div>

                  <div className="space-y-4">
                    <h3 className="text-xl font-semibold text-[#C9A962]">Overview</h3>
                    <p className="text-gray-300 leading-relaxed whitespace-pre-wrap text-base">
                      {projects.find((p) => p.id === expandedProject)?.details}
                    </p>
                  </div>

                  <div className="space-y-4 pt-6 border-t border-[#C9A962]/30">
                    <h3 className="text-xl font-semibold text-[#C9A962]">Details</h3>
                    <p className="text-gray-300 leading-relaxed whitespace-pre-wrap text-base">
                      {projects.find((p) => p.id === expandedProject)?.fullDescription}
                    </p>
                  </div>

                  {projects.find((p) => p.id === expandedProject)?.images && projects.find((p) => p.id === expandedProject)!.images.length > 0 && (
                    <div className="space-y-4 pt-6 border-t border-[#C9A962]/30">
                      <h3 className="text-xl font-semibold text-[#C9A962]">Project Gallery</h3>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        {projects.find((p) => p.id === expandedProject)?.images.map((imgSrc, i) => (
                          <div key={i} className="w-full rounded-lg overflow-hidden border border-[#C9A962]/30 bg-[#000923] group">
                            <img 
                              src={imgSrc} 
                              alt={`Project screenshot ${i + 1}`} 
                              className="w-full h-full object-contain object-center aspect-video group-hover:scale-105 transition-transform duration-500 cursor-pointer bg-black/40 p-2"
                              onClick={() => setEnlargedImage(imgSrc)}
                            />
                          </div>
                        ))}
                      </div>
                    </div>
                  )}

                  <div className="space-y-4 pt-6 border-t border-[#C9A962]/30 pb-8">
                    <h3 className="text-xl font-semibold text-[#C9A962]">Links & Resources</h3>
                    <div className="flex flex-wrap gap-4">
                      {projects.find((p) => p.id === expandedProject)?.viewLiveUrl && (
                        <a
                          href={projects.find((p) => p.id === expandedProject)?.viewLiveUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="px-6 py-2 bg-[#C9A962]/10 border border-[#C9A962] text-[#C9A962] rounded hover:bg-[#C9A962]/20 transition-colors"
                        >
                          View Live
                        </a>
                      )}
                    </div>
                  </div>
                </div>
              )}
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Image Lightbox Modal */}
      <AnimatePresence>
        {enlargedImage && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] flex items-center justify-center bg-black/90 backdrop-blur-sm p-4"
            onClick={() => setEnlargedImage(null)}
          >
            <button
              onClick={() => setEnlargedImage(null)}
              className="absolute top-4 right-4 p-2 text-white/70 hover:text-white transition-colors z-[101]"
            >
              <X className="w-8 h-8" />
            </button>
            <motion.img
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              transition={{ type: "spring", damping: 25, stiffness: 300 }}
              src={enlargedImage}
              alt="Enlarged view"
              className="max-w-full max-h-[90vh] object-contain rounded-md shadow-2xl border border-white/10 cursor-default"
              onClick={(e) => e.stopPropagation()}
            />
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
