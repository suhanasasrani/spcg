"use client"

import { motion, useScroll, useTransform, useInView, AnimatePresence } from "framer-motion"
import { useRef, useState, useEffect } from "react"
import { X } from "lucide-react"

const repeatForever = Number.POSITIVE_INFINITY

const projects = [
  {
    id: 1,
    title: "Alumni Association",
    category: "",
    description: "Alumni SaaS Portal vendor selection and implementation support.",
    details:
      "SPCG supported the Alumni Association in selecting a suitable Alumni SaaS Portal by conducting a structured comparative business analysis (CBA) of 8–10 vendors. Using a standardized evaluation framework covering functionality, security, user experience, cost–value, and vendor credibility, SPCG shortlisted three vendors. The committee facilitated multiple vendor discussions and technical deep dives, enabling the Alumni Association to onboard a scalable, secure, and value-aligned solution.",
    fullDescription:
      "Evaluation Methodology\nEach vendor was assessed using a standardized evaluation framework developed by SPCG, covering:\n\n• Functional Capabilities\nAlumni database management, event handling, communication tools, donation & payment workflows\n\n• Technical & Security Aspects\nData privacy, platform scalability, system reliability, and integration support\n\n• User Experience\nEase of use for administrators and alumni, UI/UX quality, accessibility\n\n• Cost–Value Assessment\nPricing structures, long-term cost efficiency, feature-to-cost alignment\n\n• Vendor Credibility & Support\nTrack record, customer references, post-deployment support, SLAs",
    position: 15,
  },
  {
    id: 2,
    title: "Global Brand Transformation",
    category: "Branding",
    description: "Secure therapy booking and management platform.",
    details:
      "SPCG delivered a secure, end-to-end therapy booking and management platform for Echoing Healthy Ageing. The solution enables clients to book, reschedule, and track therapy sessions, therapists to manage schedules and submit session reports, and administrators to monitor all platform activity through a centralized dashboard.",
    fullDescription:
      "Discovery & Planning: Mapped therapy workflows, user roles, and compliance needs\n\nArchitecture & Design: Built a secure, scalable full-stack system with role-based access\n\nCore Development: Implemented session booking, dashboards, and admin controls\n\nIntegrations & Automation: Enabled WhatsApp reminders and Razorpay payments\n\nSecurity & Testing: Ensured data privacy, access control, and system reliability\n\nDeployment: Launched a production-ready platform with operational handover",
    position: 40,
  },
  {
    id: 3,
    title: "Next-Gen Financial Platform",
    category: "Technology",
    description: "Growth & Strategy initiatives with partnerships and optimization.",
    details:
      "SPCG supported a Growth & Strategy initiative focused on partnerships, marketing activation, product optimization, and operational efficiency. The team drove strategic partnerships that reduced CAC from ₹150+ to under ₹50, supported a Diwali influencer campaign generating a ₹4.5L revenue uplift.",
    fullDescription:
      "The project was executed through parallel, outcome-driven workstreams:\n\n* Growth Strategy & Partnerships\nDesigned and executed strategic partnerships with colleges and ecosystem players (including NoBrokerHood and GreenGains), expanding reach while reducing Customer Acquisition Cost (CAC) from ₹150+ to under ₹50.\n\n* Marketing & Demand Generation\nSupported Diwali influencer activation campaigns, contributing to a ₹4.5L uplift in festive-period orders. Coordinated social media partnerships to amplify brand reach and conversions.\n\n* Product, UX & Conversion Optimization\nEnhanced landing page UX through user research and competitor benchmarking to identify preference drivers. Coordinated with the technology team for deployments and iteration cycles.\n\n* Brand & D2C Enablement\nBuilt a D2C onboarding tracker to streamline brand onboarding and monitor activation status across channels.\n\n* Operations & Automation\nDeveloped Python-based automation scripts for data extraction and formatting, significantly reducing manual effort and accelerating insight generation for decision-making.",
    position: 65,
  },
  {
    id: 4,
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
    viewLiveUrl: "https://drive.google.com/drive/folders/1hNiqQvcIS2hk022noJZcx672bfOqUg-8?usp=sharing",
    position: 90,
  },
]

export function Projects() {
  const containerRef = useRef<HTMLDivElement>(null)
  const isInView = useInView(containerRef, { once: true, margin: "-100px" })
  const [expandedProject, setExpandedProject] = useState<number | null>(null)
  const [hoveredProject, setHoveredProject] = useState<number | null>(null)

  useEffect(() => {
    const savedScrollPosition = sessionStorage.getItem("projectsScrollPosition")
    if (savedScrollPosition && containerRef.current) {
      containerRef.current.scrollLeft = Number.parseInt(savedScrollPosition, 10)
    }
  }, [])

  useEffect(() => {
    const container = containerRef.current
    if (!container) return

    const handleScroll = () => {
      sessionStorage.setItem("projectsScrollPosition", container.scrollLeft.toString())
    }

    container.addEventListener("scroll", handleScroll)
    return () => container.removeEventListener("scroll", handleScroll)
  }, [])

  const { scrollXProgress } = useScroll({
    container: containerRef,
    axis: "x",
  })

  const pathTranslateX = useTransform(scrollXProgress, [0, 1], ["0%", "-66.6%"])
  const cardsTranslateX = useTransform(scrollXProgress, [0, 1], [150, -500])

  const backgroundX = useTransform(scrollXProgress, [0, 1], [0, -200])
  const backgroundOpacity = useTransform(scrollXProgress, [0, 0.3, 0.7, 1], [0, 0.4, 0.4, 0])

  const card1X = useTransform(cardsTranslateX, (x) => x + (projects[0].position / 100) * 1200)
  const card2X = useTransform(cardsTranslateX, (x) => x + (projects[1].position / 100) * 1200)
  const card3X = useTransform(cardsTranslateX, (x) => x + (projects[2].position / 100) * 1200)
  const card4X = useTransform(cardsTranslateX, (x) => x + (projects[3].position / 100) * 1200)

  const card1Scale = useTransform(card1X, [50, 150, 250], [0.9, 1.05, 0.9])
  const card2Scale = useTransform(card2X, [50, 150, 250], [0.9, 1.05, 0.9])
  const card3Scale = useTransform(card3X, [50, 150, 250], [0.9, 1.05, 0.9])
  const card4Scale = useTransform(card4X, [50, 150, 250], [0.9, 1.05, 0.9])

  const pathGlow1 = useTransform(card1X, [100, 150, 200], [0, 1, 0])
  const pathGlow2 = useTransform(card2X, [100, 150, 200], [0, 1, 0])
  const pathGlow3 = useTransform(card3X, [100, 150, 200], [0, 1, 0])
  const pathGlow4 = useTransform(card4X, [100, 150, 200], [0, 1, 0])

  const cardOpacity1 = useTransform(pathGlow1, [0, 1], [0.6, 1])
  const cardOpacity2 = useTransform(pathGlow2, [0, 1], [0.6, 1])
  const cardOpacity3 = useTransform(pathGlow3, [0, 1], [0.6, 1])
  const cardOpacity4 = useTransform(pathGlow4, [0, 1], [0.6, 1])

  const cardTransforms = [
    {
      cardX: card1X,
      cardScale: card1Scale,
      pathGlow: pathGlow1,
      cardOpacity: cardOpacity1,
      cardY: 20,
      isAbove: true,
      zIndex: 20,
    },
    {
      cardX: card2X,
      cardScale: card2Scale,
      pathGlow: pathGlow2,
      cardOpacity: cardOpacity2,
      cardY: 140,
      isAbove: false,
      zIndex: 10,
    },
    {
      cardX: card3X,
      cardScale: card3Scale,
      pathGlow: pathGlow3,
      cardOpacity: cardOpacity3,
      cardY: 20,
      isAbove: true,
      zIndex: 30,
    },
    {
      cardX: card4X,
      cardScale: card4Scale,
      pathGlow: pathGlow4,
      cardOpacity: cardOpacity4,
      cardY: 140,
      isAbove: false,
      zIndex: 15,
    },
  ]

  return (
    <>
      <section
        ref={containerRef}
        className="relative w-full h-screen md:h-screen flex items-center justify-center overflow-x-auto overflow-y-hidden snap-x snap-mandatory perspective-1500 scrollbar-custom"
      >
        <div className="w-[300%] md:w-[250%] lg:w-[220%] h-full flex items-center relative">
          <div className="absolute inset-0 pointer-events-none z-0">
            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-[#C9A962]/10 to-transparent" />
            {[...Array(8)].map((_, i) => (
              <div key={i} className="absolute top-0 bottom-0 w-px bg-[#C9A962]/20" style={{ left: `${i * 15}%` }} />
            ))}
          </div>

          <div className="relative h-full flex items-center w-full">
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.8 }}
              className="absolute top-4 sm:top-8 md:top-16 left-0 right-0 text-2xl sm:text-3xl md:text-5xl font-bold text-white text-center text-balance z-20"
            >
              Featured Projects
            </motion.h2>

            <div className="relative w-full h-full flex items-center overflow-hidden">
              <motion.div style={{ x: pathTranslateX }} className="absolute inset-0 w-[300%]">
                <svg className="w-full h-full pointer-events-none" viewBox="0 0 3000 500" preserveAspectRatio="none">
                  <defs>
                    <filter id="glow-horizontal">
                      <feGaussianBlur stdDeviation="6" result="coloredBlur" />
                      <feMerge>
                        <feMergeNode in="coloredBlur" />
                        <feMergeNode in="SourceGraphic" />
                      </feMerge>
                    </filter>
                    <linearGradient id="pathGradient" x1="0%" y1="0%" x2="100%" y2="0%">
                      <stop offset="0%" stopColor="#C9A962" stopOpacity="0.3" />
                      <stop offset="50%" stopColor="#C9A962" stopOpacity="1" />
                      <stop offset="100%" stopColor="#C9A962" stopOpacity="0.3" />
                    </linearGradient>
                  </defs>

                  <motion.path
                    initial={{ pathLength: 0, opacity: 0 }}
                    animate={
                      isInView
                        ? {
                            pathLength: 1,
                            opacity: 1,
                          }
                        : {}
                    }
                    transition={{
                      pathLength: { duration: 2, ease: "easeInOut" },
                      opacity: { duration: 1 },
                    }}
                    d="M 0 250 Q 500 180, 900 250 T 1700 250 Q 2100 320, 2500 250 T 3000 250"
                    stroke="url(#pathGradient)"
                    strokeWidth="4"
                    fill="none"
                    filter="url(#glow-horizontal)"
                    style={{
                      filter: "drop-shadow(0 0 20px rgba(212, 175, 55, 0.8))",
                    }}
                  />

                  <motion.path
                    initial={{ pathLength: 0, opacity: 0 }}
                    animate={
                      isInView
                        ? {
                            pathLength: 1,
                            opacity: 0.4,
                          }
                        : {}
                    }
                    transition={{
                      pathLength: { duration: 2.5, delay: 0.3, ease: "easeInOut" },
                      opacity: { duration: 1, delay: 0.3 },
                    }}
                    d="M 0 230 Q 500 160, 900 230 T 1700 230 Q 2100 300, 2500 230 T 3000 230"
                    stroke="#C9A962"
                    strokeWidth="2"
                    fill="none"
                    opacity="0.4"
                    filter="url(#glow-horizontal)"
                  />

                  <motion.path
                    animate={{
                      strokeDashoffset: [0, -200],
                    }}
                    transition={{
                      duration: 4,
                      repeat: repeatForever,
                      ease: "linear",
                    }}
                    d="M 0 250 Q 500 180, 900 250 T 1700 250 Q 2100 320, 2500 250 T 3000 250"
                    stroke="#C9A962"
                    strokeWidth="2"
                    strokeDasharray="40 60"
                    fill="none"
                    opacity="0.6"
                    filter="url(#glow-horizontal)"
                  />

                  {[0, 0.33, 0.66].map((offset, i) => (
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
                        duration: 8,
                        delay: offset * 8,
                        repeat: repeatForever,
                        ease: "linear",
                      }}
                      r="8"
                      fill="#C9A962"
                      filter="url(#glow-horizontal)"
                      style={{
                        filter: "drop-shadow(0 0 15px rgba(212, 175, 55, 1))",
                      }}
                    >
                      <animateMotion
                        dur="8s"
                        begin={`${offset * 8}s`}
                        repeatCount="indefinite"
                        path="M 0 250 Q 500 180, 900 250 T 1700 250 Q 2100 320, 2500 250 T 3000 250"
                      />
                    </motion.circle>
                  ))}

                  {[15, 40, 65, 90].map((pos) => {
                    const x = (pos / 100) * 3000
                    const y = 250 + Math.sin((pos / 100) * Math.PI * 4) * 30
                    return (
                      <motion.circle
                        key={`waypoint-${pos}`}
                        initial={{ scale: 0, opacity: 0 }}
                        animate={
                          isInView
                            ? {
                                scale: [1, 1.4, 1],
                                opacity: [0.6, 1, 0.6],
                              }
                            : {}
                        }
                        transition={{
                          duration: 2.5,
                          delay: 0.5 + pos / 100,
                          repeat: repeatForever,
                          ease: "easeInOut",
                        }}
                        cx={x}
                        cy={y}
                        r="12"
                        fill="#C9A962"
                        filter="url(#glow-horizontal)"
                        style={{
                          filter: "drop-shadow(0 0 25px rgba(212, 175, 55, 1))",
                        }}
                      />
                    )
                  })}
                </svg>
              </motion.div>

              <div className="absolute inset-0 flex items-center">
                {projects.map((project, index) => {
                  const { cardX, cardScale, cardOpacity, cardY, isAbove, zIndex } = cardTransforms[index]

                  return (
                    <motion.div
                      key={project.id}
                      style={{
                        x: cardX,
                        y: cardY,
                        zIndex,
                      }}
                      className="absolute preserve-3d"
                      onMouseEnter={() => setHoveredProject(project.id)}
                      onMouseLeave={() => setHoveredProject(null)}
                    >
                      <motion.div
                        animate={{
                          scaleY: hoveredProject === project.id ? 1.3 : 1,
                        }}
                        style={{
                          opacity: cardOpacity.get(),
                        }}
                        className="absolute left-1/2 -translate-x-1/2 w-1 bg-[#C9A962]"
                        style={{
                          height: "80px",
                          top: isAbove ? "100%" : "-80px",
                          boxShadow: `0 0 10px rgba(212, 175, 55, 0.9)`,
                        }}
                      />

                      <motion.div
                        initial={{ opacity: 0, scale: 0.8 }}
                        animate={isInView ? { opacity: 1, scale: 1 } : {}}
                        style={{
                          scale: cardScale,
                        }}
                        whileHover={{
                          scale: 1.08,
                          rotateX: 5,
                          rotateY: -5,
                          boxShadow: "0 0 60px rgba(212, 175, 55, 0.9), inset 0 0 30px rgba(212, 175, 55, 0.2)",
                        }}
                        transition={{ duration: 0.5, delay: 0.5 + index * 0.15 }}
                        className="relative bg-[#000f3f]/95 border border-white/20 p-2 sm:p-2.5 md:p-3 cursor-pointer w-40 sm:w-48 md:w-64 h-auto preserve-3d"
                        onClick={() => setExpandedProject(project.id)}
                      >
                        <div className="text-[8px] sm:text-[9px] md:text-xs text-[#B8C5D4] mb-1 tracking-wider uppercase">
                          {project.category}
                        </div>
                        <h3 className="text-xs sm:text-sm md:text-base font-bold text-white mb-2 text-balance">
                          {project.title}
                        </h3>
                        <p className="text-[#B8C5D4] text-[10px] sm:text-xs leading-relaxed">{project.description}</p>

                        <div className="flex items-center justify-center mt-3 pt-2 border-t border-white/10">
                          <button className="text-[9px] md:text-xs text-[#C9A962] hover:text-white font-semibold uppercase tracking-wider transition-colors">
                            Click to View More →
                          </button>
                        </div>

                        <motion.div
                          style={{
                            opacity: cardOpacity.get(),
                          }}
                          className="absolute inset-0 border-2 border-[#C9A962] pointer-events-none"
                          style={{
                            boxShadow: "0 0 40px rgba(212, 175, 55, 1)",
                          }}
                        />
                      </motion.div>
                    </motion.div>
                  )
                })}
              </div>
            </div>
          </div>
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

                  <div className="space-y-4 pt-6 border-t border-[#C9A962]/30">
                    <h3 className="text-xl font-semibold text-[#C9A962]">Project Gallery</h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      {[1, 2, 3, 4].map((i) => (
                        <div
                          key={i}
                          className="aspect-video bg-gradient-to-br from-[#C9A962]/10 to-[#C9A962]/5 border border-[#C9A962]/30 rounded-lg flex items-center justify-center"
                        >
                          <div className="text-center">
                            <div className="text-[#C9A962] text-sm">Image {i}</div>
                            <div className="text-gray-500 text-xs mt-1">Add project images here</div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>

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
                      <a
                        href="#"
                        className="px-6 py-2 bg-[#C9A962]/10 border border-[#C9A962] text-[#C9A962] rounded hover:bg-[#C9A962]/20 transition-colors"
                      >
                        Case Study
                      </a>
                      <a
                        href="#"
                        className="px-6 py-2 bg-[#C9A962]/10 border border-[#C9A962] text-[#C9A962] rounded hover:bg-[#C9A962]/20 transition-colors"
                      >
                        Documentation
                      </a>
                    </div>
                  </div>
                </div>
              )}
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
