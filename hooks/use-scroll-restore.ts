"use client"

import { useEffect } from "react"
import { usePathname } from "next/navigation"

export function saveScrollPosition() {
  if (typeof window !== "undefined") {
    sessionStorage.setItem("scrollPosition", window.scrollY.toString())
  }
}

export function useScrollRestore() {
  const pathname = usePathname()

  useEffect(() => {
    // Only scroll to top on new route if not on homepage
    if (pathname !== "/") {
      window.scrollTo(0, 0)
    }
  }, [pathname])

  useEffect(() => {
    // Handle hash navigation for smooth scrolling to sections
    const handleHashChange = () => {
      const hash = window.location.hash
      if (hash) {
        // Wait a bit for DOM to be ready, then scroll
        setTimeout(() => {
          const element = document.querySelector(hash)
          if (element) {
            element.scrollIntoView({ behavior: "smooth" })
          }
        }, 100)
      }
    }

    // Check for hash on initial load
    handleHashChange()

    window.addEventListener("hashchange", handleHashChange)
    return () => window.removeEventListener("hashchange", handleHashChange)
  }, [pathname])
}
