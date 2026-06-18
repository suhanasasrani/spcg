"use client"

import Image from "next/image"
import { motion, useInView } from "framer-motion"
import { useRef, useState, useEffect } from "react"
import { Linkedin } from "lucide-react"
import { PenCursor3D } from "./ui/pen-cursor-3d"

const teamData = {
  chairperson: {
    name: "Vanshi Gathani",
    role: "Chairperson",
    bio: "Leading SPCG's strategic vision and operational excellence with dedication to student development.",
    image: "/images/team-member-5.jpeg",
    linkedin:
      "https://www.linkedin.com/in/vanshi-gathani-11b54a283?utm_source=share&utm_campaign=share_via&utm_content=profile&utm_medium=ios_app",
  },
  levels: [
    [
      {
        name: "Arjun Bagade",
        role: "Secretary",
        bio: "Supporting strategic initiatives and coordinating cross-functional teams.",
        image: "/images/team-member-1.jpeg",
        linkedin:
          "https://www.linkedin.com/in/arjun-bagade-86444728b?utm_source=share&utm_campaign=share_via&utm_content=profile&utm_medium=ios_app",
      },
    ],
    [
      {
        name: "Tanay Kinariwala",
        role: "Vice Chairperson",
        bio: "Driving operational efficiency and team coordination across all SPCG initiatives.",
        image: "/images/team-member-3.jpeg",
        linkedin:
          "https://www.linkedin.com/in/tanay-kinariwala?utm_source=share&utm_campaign=share_via&utm_content=profile&utm_medium=ios_app",
      },
      {
        name: "Harsh Bhatt",
        role: "Finance Head",
        bio: "Leading financial analysis and investment readiness initiatives with precision.",
        image: "/images/team-member-4.jpeg",
        linkedin:
          "https://www.linkedin.com/in/harshbhattt?utm_source=share&utm_campaign=share_via&utm_content=profile&utm_medium=ios_app",
      },
      {
        name: "Vir Bhalani",
        role: "Vice Chairperson",
        bio: "Designing and delivering professional development programs for SPCG members.",
        image: "/images/team-member-2.jpeg",
        linkedin:
          "https://www.linkedin.com/in/vir-bhalani-vcb72?utm_source=share&utm_campaign=share_via&utm_content=profile&utm_medium=ios_app",
      },
    ],
  ],
}

export function Team() {
  const ref = useRef(null)
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const backgroundCanvasRef = useRef<HTMLCanvasElement>(null)
  const lastPosRef = useRef<{ x: number; y: number } | null>(null)
  const strokesRef = useRef<Array<{ points: Array<{ x: number; y: number; color: string }>; timestamp: number }>>([])
  const animationFrameRef = useRef<number>(0)
  const scrollOffsetRef = useRef(0)
  const penLoadedRef = useRef(false)
  const [flippedCards, setFlippedCards] = useState<Set<string>>(new Set())
  const [hoveredCard, setHoveredCard] = useState<string | null>(null)
  const [treeAnimationComplete, setTreeAnimationComplete] = useState(false)
  const [penReady, setPenReady] = useState(false)
  const [pageLoaded, setPageLoaded] = useState(false)
  const isInView = useInView(ref, { once: true })

  useEffect(() => {
    const canvas = canvasRef.current
    const backgroundCanvas = backgroundCanvasRef.current
    if (!canvas || !backgroundCanvas) return

    const ctx = canvas.getContext("2d", { alpha: true })
    const bgCtx = backgroundCanvas.getContext("2d")
    if (!ctx || !bgCtx) return

    const resizeCanvas = () => {
      canvas.width = window.innerWidth
      canvas.height = window.innerHeight
      backgroundCanvas.width = window.innerWidth
      backgroundCanvas.height = window.innerHeight

      bgCtx.fillStyle = "transparent"
      bgCtx.fillRect(0, 0, backgroundCanvas.width, backgroundCanvas.height)

      const lineSpacing = 40
      const tiltAngle = 8 * (Math.PI / 180)
      bgCtx.strokeStyle = "rgba(60, 60, 60, 0.3)"
      bgCtx.lineWidth = 1

      const numLines = Math.ceil(backgroundCanvas.height / lineSpacing) + 20
      for (let i = 0; i < numLines; i++) {
        const y = i * lineSpacing
        const xOffset = y * Math.tan(tiltAngle)
        bgCtx.beginPath()
        bgCtx.moveTo(-xOffset, y)
        bgCtx.lineTo(backgroundCanvas.width - xOffset, y)
        bgCtx.stroke()
      }
    }

    const getGoldColor = (progress: number) => {
      const hue = 50 + Math.sin(progress * 0.02) * 2
      const saturation = 80 + Math.sin(progress * 0.015) * 8
      const lightness = 58 + Math.sin(progress * 0.025) * 12
      return `hsl(${hue}, ${saturation}%, ${lightness}%)`
    }

    let progressCounter = 0

    const handleScroll = () => {
      scrollOffsetRef.current = window.scrollY
    }

    const handleMouseMove = (e: MouseEvent) => {
      if (!penReady) return

      const x = e.clientX
      const y = e.clientY + scrollOffsetRef.current
      progressCounter += 2
      const color = getGoldColor(progressCounter)

      if (lastPosRef.current) {
        const distance = Math.sqrt(Math.pow(x - lastPosRef.current.x, 2) + Math.pow(y - lastPosRef.current.y, 2))
        if (distance > 0) {
          const lastStroke = strokesRef.current[strokesRef.current.length - 1]
          if (lastStroke && Date.now() - lastStroke.timestamp < 50) {
            lastStroke.points.push({ x, y, color })
          } else {
            strokesRef.current.push({
              points: [
                { x: lastPosRef.current.x, y: lastPosRef.current.y, color },
                { x, y, color },
              ],
              timestamp: Date.now(),
            })
          }
        }
      }
      lastPosRef.current = { x, y }
    }

    const animate = () => {
      const now = Date.now()
      strokesRef.current = strokesRef.current.filter((stroke) => now - stroke.timestamp < 1000)
      const ctx = canvasRef.current?.getContext("2d")
      if (!ctx) return

      ctx.clearRect(0, 0, canvas.width, canvas.height)
      const currentScroll = scrollOffsetRef.current

      strokesRef.current.forEach((stroke) => {
        const age = now - stroke.timestamp
        const opacity = Math.max(0, 1 - age / 1000)
        ctx.globalAlpha = opacity
        ctx.lineWidth = 8
        ctx.lineCap = "round"
        ctx.lineJoin = "round"

        if (stroke.points.length > 1) {
          ctx.beginPath()
          ctx.moveTo(stroke.points[0].x, stroke.points[0].y - currentScroll)
          for (let i = 1; i < stroke.points.length - 1; i++) {
            const xc = (stroke.points[i].x + stroke.points[i + 1].x) / 2
            const yc = (stroke.points[i].y + stroke.points[i + 1].y) / 2 - currentScroll
            ctx.quadraticCurveTo(stroke.points[i].x, stroke.points[i].y - currentScroll, xc, yc)
          }
          const last = stroke.points[stroke.points.length - 1]
          ctx.lineTo(last.x, last.y - currentScroll)

          const gradient = ctx.createLinearGradient(
            stroke.points[0].x,
            stroke.points[0].y - currentScroll,
            last.x,
            last.y - currentScroll,
          )
          stroke.points.forEach((point, index) => {
            gradient.addColorStop(index / (stroke.points.length - 1 || 1), point.color)
          })
          ctx.strokeStyle = gradient
          ctx.stroke()
        }
      })
      ctx.globalAlpha = 1
      animationFrameRef.current = requestAnimationFrame(animate)
    }

    resizeCanvas()
    window.addEventListener("resize", resizeCanvas)
    window.addEventListener("mousemove", handleMouseMove)
    window.addEventListener("scroll", handleScroll)
    animate()

    return () => {
      window.removeEventListener("resize", resizeCanvas)
      window.removeEventListener("mousemove", handleMouseMove)
      window.removeEventListener("scroll", handleScroll)
      if (animationFrameRef.current) cancelAnimationFrame(animationFrameRef.current)
    }
  }, [penReady])

  useEffect(() => {
    setPageLoaded(true)
    setPenReady(true)
  }, [])

  const toggleCard = (id: string) => {
    if (!treeAnimationComplete) return
    setFlippedCards((prev) => {
      const newSet = new Set(prev)
      if (newSet.has(id)) {
        newSet.delete(id)
      } else {
        newSet.add(id)
      }
      return newSet
    })
  }

  return (
    <section ref={ref} className="relative py-32 px-6 overflow-hidden">
      <canvas
        ref={backgroundCanvasRef}
        className="fixed top-0 left-0 w-full h-full pointer-events-none"
        style={{ zIndex: 1 }}
      />
      <canvas ref={canvasRef} className="fixed top-0 left-0 w-full h-full pointer-events-none" style={{ zIndex: 2 }} />
      {penReady && <PenCursor3D />}

      <div className="max-w-7xl mx-auto relative z-10">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="text-4xl md:text-5xl font-bold text-white mb-24 text-center text-balance"
        >
          Our Team
        </motion.h2>

        {/* Tree Container */}
        <div className="relative" style={{ perspective: "1400px" }}>
          {/* Central Vertical Spine */}
          <motion.div
            initial={{ scaleY: 0 }}
            animate={isInView ? { scaleY: 1 } : {}}
            transition={{ duration: 0.3, ease: "easeOut" }}
            onAnimationComplete={() => {
              setTimeout(() => setTreeAnimationComplete(true), 100)
            }}
            className="absolute left-1/2 top-0 bottom-0 w-0.5 bg-[#C9A962] origin-top -translate-x-1/2"
            style={{
              boxShadow: "0 0 10px rgba(212, 175, 55, 0.6)",
            }}
          />

          <div className="flex justify-center mb-24">
            <TeamNode
              member={teamData.chairperson}
              id="chairperson"
              isFlipped={flippedCards.has("chairperson")}
              isHovered={hoveredCard === "chairperson"}
              onToggle={() => toggleCard("chairperson")}
              onHover={(id) => setHoveredCard(id)}
              delay={0.1}
              treeAnimationComplete={treeAnimationComplete}
              zPosition={50}
              glowDelay={0.15}
              isInView={isInView}
            />
          </div>

          <div className="relative mb-24">
            {/* Branch from spine to single node */}
            <svg className="absolute left-1/2 top-0 w-full h-24 -translate-x-1/2" style={{ overflow: "visible" }}>
              <motion.line
                initial={{ pathLength: 0, opacity: 0 }}
                animate={isInView ? { pathLength: 1, opacity: 0.6 } : {}}
                transition={{ duration: 0.2, delay: 0.15 }}
                x1="50%"
                y1="0"
                x2="50%"
                y2="90"
                stroke="#C9A962"
                strokeWidth="1"
                style={{ filter: "drop-shadow(0 0 4px rgba(212, 175, 55, 0.6))" }}
              />
              <motion.line
                initial={{ pathLength: 0, opacity: 0 }}
                animate={isInView ? { pathLength: 1, opacity: [0, 1, 0.3] } : {}}
                transition={{
                  pathLength: { duration: 0.2, delay: 0.2 },
                  opacity: { duration: 0.3, delay: 0.2, times: [0, 0.6, 1] },
                }}
                x1="50%"
                y1="0"
                x2="50%"
                y2="90"
                stroke="#C9A962"
                strokeWidth="3"
                style={{ filter: "drop-shadow(0 0 12px rgba(212, 175, 55, 1))", strokeLinecap: "round" }}
              />
              {hoveredCard === "level1-0" && (
                <motion.line
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 0.8 }}
                  transition={{ duration: 0.2 }}
                  x1="50%"
                  y1="0"
                  x2="50%"
                  y2="90"
                  stroke="#C9A962"
                  strokeWidth="2"
                  style={{ filter: "drop-shadow(0 0 8px rgba(212, 175, 55, 1))" }}
                />
              )}
            </svg>

            <div className="flex justify-center pt-24">
              <TeamNode
                member={teamData.levels[0][0]}
                id="level1-0"
                isFlipped={flippedCards.has("level1-0")}
                isHovered={hoveredCard === "level1-0"}
                onToggle={() => toggleCard("level1-0")}
                onHover={(id) => setHoveredCard(id)}
                delay={0.25}
                treeAnimationComplete={treeAnimationComplete}
                zPosition={30}
                glowDelay={0.3}
                isInView={isInView}
              />
            </div>
          </div>

          <div className="relative">
            {/* Branches from spine to 3 nodes */}
            <svg className="absolute left-1/2 top-0 w-full h-40 -translate-x-1/2" style={{ overflow: "visible" }}>
              <motion.line
                initial={{ pathLength: 0, opacity: 0 }}
                animate={isInView ? { pathLength: 1, opacity: 0.6 } : {}}
                transition={{ duration: 0.2, delay: 0.3 }}
                x1="50%"
                y1="0"
                x2="25%"
                y2="120"
                stroke="#C9A962"
                strokeWidth="1"
                style={{ filter: "drop-shadow(0 0 4px rgba(212, 175, 55, 0.6))" }}
              />
              <motion.line
                initial={{ pathLength: 0, opacity: 0 }}
                animate={isInView ? { pathLength: 1, opacity: 0.6 } : {}}
                transition={{ duration: 0.2, delay: 0.3 }}
                x1="50%"
                y1="0"
                x2="50%"
                y2="120"
                stroke="#C9A962"
                strokeWidth="1"
                style={{ filter: "drop-shadow(0 0 4px rgba(212, 175, 55, 0.6))" }}
              />
              <motion.line
                initial={{ pathLength: 0, opacity: 0 }}
                animate={isInView ? { pathLength: 1, opacity: 0.6 } : {}}
                transition={{ duration: 0.2, delay: 0.3 }}
                x1="50%"
                y1="0"
                x2="75%"
                y2="120"
                stroke="#C9A962"
                strokeWidth="1"
                style={{ filter: "drop-shadow(0 0 4px rgba(212, 175, 55, 0.6))" }}
              />
              <motion.line
                initial={{ pathLength: 0, opacity: 0 }}
                animate={isInView ? { pathLength: 1, opacity: [0, 1, 0.3] } : {}}
                transition={{
                  pathLength: { duration: 0.2, delay: 0.35 },
                  opacity: { duration: 0.3, delay: 0.35, times: [0, 0.6, 1] },
                }}
                x1="50%"
                y1="0"
                x2="25%"
                y2="120"
                stroke="#C9A962"
                strokeWidth="3"
                style={{ filter: "drop-shadow(0 0 12px rgba(212, 175, 55, 1))", strokeLinecap: "round" }}
              />
              <motion.line
                initial={{ pathLength: 0, opacity: 0 }}
                animate={isInView ? { pathLength: 1, opacity: [0, 1, 0.3] } : {}}
                transition={{
                  pathLength: { duration: 0.2, delay: 0.4 },
                  opacity: { duration: 0.3, delay: 0.4, times: [0, 0.6, 1] },
                }}
                x1="50%"
                y1="0"
                x2="50%"
                y2="120"
                stroke="#C9A962"
                strokeWidth="3"
                style={{ filter: "drop-shadow(0 0 12px rgba(212, 175, 55, 1))", strokeLinecap: "round" }}
              />
              <motion.line
                initial={{ pathLength: 0, opacity: 0 }}
                animate={isInView ? { pathLength: 1, opacity: [0, 1, 0.3] } : {}}
                transition={{
                  pathLength: { duration: 0.2, delay: 0.45 },
                  opacity: { duration: 0.3, delay: 0.45, times: [0, 0.6, 1] },
                }}
                x1="50%"
                y1="0"
                x2="75%"
                y2="120"
                stroke="#C9A962"
                strokeWidth="3"
                style={{ filter: "drop-shadow(0 0 12px rgba(212, 175, 55, 1))", strokeLinecap: "round" }}
              />
              {hoveredCard?.startsWith("level2") && (
                <motion.line
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 0.8 }}
                  transition={{ duration: 0.2 }}
                  x1="50%"
                  y1="0"
                  x2={hoveredCard === "level2-0" ? "25%" : hoveredCard === "level2-1" ? "50%" : "75%"}
                  y2="120"
                  stroke="#C9A962"
                  strokeWidth="2"
                  style={{ filter: "drop-shadow(0 0 8px rgba(212, 175, 55, 1))" }}
                />
              )}
            </svg>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-16 md:gap-24 max-w-6xl mx-auto pt-32">
              {teamData.levels[1].map((member, idx) => (
                <div key={`level2-${idx}`} className="flex justify-center">
                  <TeamNode
                    member={member}
                    id={`level2-${idx}`}
                    isFlipped={flippedCards.has(`level2-${idx}`)}
                    isHovered={hoveredCard === `level2-${idx}`}
                    onToggle={() => toggleCard(`level2-${idx}`)}
                    onHover={(id) => setHoveredCard(id)}
                    delay={0.4 + idx * 0.05}
                    treeAnimationComplete={treeAnimationComplete}
                    zPosition={10}
                    glowDelay={0.45 + idx * 0.05}
                    isInView={isInView}
                  />
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

function TeamNode({
  member,
  id,
  isFlipped,
  isHovered,
  onToggle,
  onHover,
  delay,
  treeAnimationComplete,
  zPosition,
  glowDelay,
  isInView,
}: {
  member: { name: string; role: string; bio: string; image: string; linkedin?: string }
  id: string
  isFlipped: boolean
  isHovered: boolean
  onToggle: () => void
  onHover: (id: string | null) => void
  delay: number
  treeAnimationComplete: boolean
  zPosition: number
  glowDelay: number
  isInView: boolean
}) {
  const nodeRef = useRef(null)
  const nodeInView = useInView(nodeRef, { once: true })

  return (
    <motion.div
      ref={nodeRef}
      initial={{ opacity: 0, scale: 0.5 }}
      animate={nodeInView ? { opacity: 1, scale: 1 } : {}}
      transition={{ duration: 0.6, delay, ease: [0.19, 1, 0.22, 1] }}
      style={{ perspective: "1400px" }}
      className="w-48 h-48 sm:w-56 sm:h-56 md:w-64 md:h-64 cursor-pointer"
      onClick={onToggle}
      onMouseEnter={() => onHover(id)}
      onMouseLeave={() => onHover(null)}
      onKeyDown={(e) => {
        if (e.key === "Enter" || e.key === " ") {
          e.preventDefault()
          onToggle()
        }
      }}
      tabIndex={0}
      role="button"
      aria-label={`${member.name}, ${member.role}. Click to flip card.`}
    >
      <motion.div
        animate={{
          rotateY: isFlipped ? 180 : 0,
        }}
        style={{
          transform: isHovered ? "translateZ(40px)" : "translateZ(0px)",
          transformStyle: "preserve-3d"
        }}
        transition={{
          rotateY: { duration: 0.7, ease: [0.4, 0, 0.2, 1] },
        }}
        className="relative w-full h-full"
      >
        <div
          className="absolute inset-0 overflow-hidden"
          style={{
            backfaceVisibility: "hidden",
            transform: "translateZ(0)",
          }}
        >
          <Image
            src={member.image || "/placeholder.svg"}
            alt={member.name}
            fill
            sizes="(max-width: 640px) 192px, (max-width: 768px) 224px, 256px"
            className="w-full h-full object-cover"
            loading="eager"
            priority={false}
          />
          <div className="absolute inset-0 bg-gradient-to-b from-transparent via-black/30 to-black/70" />

          <div
            className="absolute inset-0 border-2 border-[#C9A962]"
            style={{
              boxShadow: "0 0 10px rgba(212, 175, 55, 0.5)",
            }}
          />

          <motion.div
            initial={{ opacity: 0, scale: 1 }}
            animate={
              isInView
                ? {
                    opacity: [0, 1, 0.6],
                    scale: [0.98, 1.02, 1],
                  }
                : {}
            }
            transition={{
              duration: 1.5,
              delay: glowDelay,
              times: [0, 0.5, 1],
              ease: "easeOut",
            }}
            className="absolute inset-0 border-2 border-[#C9A962]"
            style={{
              boxShadow: "0 0 20px rgba(212, 175, 55, 0.9), inset 0 0 20px rgba(212, 175, 55, 0.3)",
            }}
          />

          <motion.div
            animate={{
              opacity: isHovered ? [0.6, 1, 0.6] : 0,
            }}
            transition={{
              duration: 1.5,
              repeat: isHovered ? Number.POSITIVE_INFINITY : 0,
            }}
            className="absolute inset-0 border-2 border-[#C9A962] pointer-events-none"
            style={{
              boxShadow: "0 0 30px rgba(212, 175, 55, 1), inset 0 0 30px rgba(212, 175, 55, 0.5)",
            }}
          />

          <div className="absolute inset-0 flex flex-col justify-end p-4 sm:p-6">
            <div>
              <h3 className="text-lg sm:text-xl font-bold text-white mb-1">{member.name}</h3>
              <p className="text-xs sm:text-sm text-[#C9A962] font-medium">{member.role}</p>
            </div>
          </div>
        </div>

        {/* Back of card */}
        <div
          className="absolute inset-0 bg-gradient-to-br from-[#000923] via-[#000d33] to-[#001339] p-6 flex flex-col justify-center items-center"
          style={{
            backfaceVisibility: "hidden",
            transform: "rotateY(180deg)",
            zIndex: 2,
          }}
        >
          <p className="text-white text-center text-sm sm:text-base leading-relaxed mb-6">{member.bio}</p>
          {member.linkedin && (
            <a
              href={member.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              className="bg-[#C9A962]/10 border border-[#C9A962]/30 px-4 py-2 rounded-full text-[#C9A962] hover:bg-[#C9A962] hover:text-black transition-all duration-300 flex items-center gap-2 text-sm font-medium group"
              onClick={(e) => e.stopPropagation()}
            >
              <Linkedin className="w-4 h-4 group-hover:scale-110 transition-transform" />
              <span>LinkedIn Profile</span>
            </a>
          )}
          <div className="absolute inset-0 border-2 border-[#C9A962] pointer-events-none" />
        </div>
      </motion.div>
    </motion.div>
  )
}
