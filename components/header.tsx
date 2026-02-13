"use client"

import React from "react"
import { X, Menu } from "react-feather" // Import X and Menu components
import { useState, useEffect } from "react"
import Link from "next/link"
import { useRouter, usePathname } from "next/navigation"
import { motion } from "framer-motion"

export function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const router = useRouter()
  const pathname = usePathname()

  const navItems = [
    { label: "Home", href: "#home", isAnchor: true },
    { label: "About", href: "#about", isAnchor: true },
    { label: "Services", href: "/services", isAnchor: false },
    { label: "Team", href: "/team", isAnchor: false },
    { label: "Projects", href: "/projects", isAnchor: false },
    { label: "Partners", href: "#partners", isAnchor: true },
    { label: "Testimonials", href: "#testimonials", isAnchor: true },
    { label: "Contact", href: "#contact", isAnchor: true },
  ]

  const handleNavClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string, isAnchor: boolean) => {
    if (isAnchor) {
      e.preventDefault()
      
      // If not on homepage, navigate to home first with the anchor
      if (pathname !== "/") {
        router.push("/" + href)
        setMobileMenuOpen(false)
        return
      }
      
      // If on homepage, scroll to the section
      const element = document.querySelector(href)
      if (element) {
        element.scrollIntoView({ behavior: "smooth" })
        setMobileMenuOpen(false)
      }
    }
  }

  // Scroll to anchor when returning to homepage
  useEffect(() => {
    const hash = window.location.hash
    if (hash && pathname === "/") {
      setTimeout(() => {
        const element = document.querySelector(hash)
        if (element) {
          element.scrollIntoView({ behavior: "smooth" })
        }
      }, 100)
    }
  }, [pathname])

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2,
      },
    },
  }

  const itemVariants = {
    hidden: { opacity: 0, y: -20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.5, ease: "easeOut" },
    },
  }

  return (
    <motion.header
      className="fixed top-0 w-full z-50 backdrop-blur-lg bg-transparent border-b border-[#C9A962]/20"
      initial={{ opacity: 0, y: -100 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
    >
      <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-center h-20">
          {/* Navigation */}
          <motion.div
            className="flex items-center gap-1"
            variants={containerVariants}
            initial="hidden"
            animate="visible"
          >
            {navItems.map((item: any) => (
              <motion.div key={item.href} variants={itemVariants}>
                {item.isAnchor ? (
                  <a
                    href={item.href}
                    onClick={(e) => handleNavClick(e, item.href, item.isAnchor)}
                    className="relative px-4 py-2 text-sm font-medium text-white hover:text-[#C9A962] transition-colors group cursor-pointer"
                  >
                    <span className="relative z-10">{item.label}</span>
                    <motion.div
                      className="absolute inset-0 bg-gradient-to-r from-[#C9A962]/0 via-[#C9A962]/20 to-[#C9A962]/0 rounded opacity-0 group-hover:opacity-100"
                      layoutId="hoverBackground"
                      initial={{ opacity: 0 }}
                      whileHover={{ opacity: 1 }}
                      transition={{ duration: 0.3 }}
                    />
                  </a>
                ) : (
                  <Link
                    href={item.href}
                    className="relative px-4 py-2 text-sm font-medium text-white hover:text-[#C9A962] transition-colors group"
                  >
                    <span className="relative z-10">{item.label}</span>
                    <motion.div
                      className="absolute inset-0 bg-gradient-to-r from-[#C9A962]/0 via-[#C9A962]/20 to-[#C9A962]/0 rounded opacity-0 group-hover:opacity-100"
                      layoutId="hoverBackground"
                      initial={{ opacity: 0 }}
                      whileHover={{ opacity: 1 }}
                      transition={{ duration: 0.3 }}
                    />
                  </Link>
                )}
              </motion.div>
            ))}
          </motion.div>


        </div>

        {/* Mobile Navigation */}
        <motion.div
          className="md:hidden overflow-hidden"
          initial={{ height: 0, opacity: 0 }}
          animate={{
            height: mobileMenuOpen ? "auto" : 0,
            opacity: mobileMenuOpen ? 1 : 0,
          }}
          transition={{ duration: 0.3 }}
        >
          <div className="px-4 py-4 space-y-2 border-t border-[#C9A962]/20">
            {navItems.map((item: any) => (
              <motion.div
                key={item.href}
                initial={{ opacity: 0, x: -20 }}
                animate={{
                  opacity: mobileMenuOpen ? 1 : 0,
                  x: mobileMenuOpen ? 0 : -20,
                }}
                transition={{ duration: 0.3 }}
              >
                {item.isAnchor ? (
                  <a
                    href={item.href}
                    onClick={(e) => handleNavClick(e, item.href, item.isAnchor)}
                    className="block px-4 py-2 text-white hover:text-[#C9A962] hover:bg-[#C9A962]/10 rounded transition-colors cursor-pointer"
                  >
                    {item.label}
                  </a>
                ) : (
                  <Link
                    href={item.href}
                    className="block px-4 py-2 text-white hover:text-[#C9A962] hover:bg-[#C9A962]/10 rounded transition-colors"
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    {item.label}
                  </Link>
                )}
              </motion.div>
            ))}
          </div>
        </motion.div>
      </nav>
    </motion.header>
  )
}
