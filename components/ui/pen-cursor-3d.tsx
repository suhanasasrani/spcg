"use client"

import { useRef, useEffect } from "react"

export function PenCursor3D() {
  const penRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (penRef.current) {
        penRef.current.style.left = `${e.clientX}px`
        penRef.current.style.top = `${e.clientY}px`
      }
    }

    window.addEventListener("mousemove", handleMouseMove)

    return () => {
      window.removeEventListener("mousemove", handleMouseMove)
    }
  }, [])

  return (
    <div
      ref={penRef}
      className="fixed pointer-events-none"
      style={{
        width: "24px",
        height: "72px",
        zIndex: 99999,
        transform: "translate(-10px, -66px) rotate(25deg)",
      }}
    >
      <svg width="24" height="72" viewBox="0 0 40 120" xmlns="http://www.w3.org/2000/svg">
        {/* Pen body - golden metallic */}
        <defs>
          <linearGradient id="bodyGradient" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" style={{ stopColor: "#B8860B", stopOpacity: 1 }} />
            <stop offset="30%" style={{ stopColor: "#FFD700", stopOpacity: 1 }} />
            <stop offset="70%" style={{ stopColor: "#DAA520", stopOpacity: 1 }} />
            <stop offset="100%" style={{ stopColor: "#B8860B", stopOpacity: 1 }} />
          </linearGradient>
          <linearGradient id="tipGradient" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" style={{ stopColor: "#4A4A4A", stopOpacity: 1 }} />
            <stop offset="100%" style={{ stopColor: "#1A1A1A", stopOpacity: 1 }} />
          </linearGradient>
          <filter id="shadow">
            <feDropShadow dx="2" dy="2" stdDeviation="3" floodOpacity="0.3" />
          </filter>
        </defs>

        {/* Main pen body */}
        <rect x="8" y="15" width="24" height="85" rx="2" fill="url(#bodyGradient)" filter="url(#shadow)" />

        {/* Pen clip */}
        <rect x="28" y="20" width="4" height="30" rx="2" fill="#C0C0C0" />

        {/* Pen tip holder */}
        <polygon points="8,100 32,100 28,110 12,110" fill="#2A2A2A" />

        {/* Pen tip */}
        <polygon points="20,110 12,110 14,118 20,120 26,118 28,110" fill="url(#tipGradient)" />

        {/* Writing point */}
        <circle cx="20" cy="119" r="1.5" fill="#000000" />

        {/* Highlights for metallic effect */}
        <rect x="10" y="20" width="2" height="75" rx="1" fill="#FFFFFF" opacity="0.3" />
        <rect x="28" y="25" width="2" height="70" rx="1" fill="#FFD700" opacity="0.2" />
      </svg>
    </div>
  )
}
