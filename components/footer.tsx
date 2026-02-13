"use client"

import { motion } from "framer-motion"
import { Mail, Linkedin, Instagram } from "lucide-react"

export function Footer() {
  const socialLinks = [
    {
      icon: Mail,
      href: "mailto:hello@spcg.com",
      label: "Email",
    },
    {
      icon: Linkedin,
      href: "https://linkedin.com",
      label: "LinkedIn",
    },
    {
      icon: Instagram,
      href: "https://instagram.com",
      label: "Instagram",
    },
  ]

  return (
    <footer className="relative bg-transparent border-t border-[#C9A962]/30">
      <div className="max-w-7xl mx-auto px-6 py-16 md:py-24">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="flex flex-col md:flex-row justify-between items-start md:items-center gap-12"
        >
          {/* Left Section */}
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.1 }}
            className="flex-1"
          >
            <h3 className="text-2xl md:text-3xl font-bold text-white mb-2">SPCG</h3>
            <p className="text-[#B8C5D4] max-w-md">
              Premium digital experiences through innovative design and strategic solutions.
            </p>
          </motion.div>

          {/* Right Section - Social Links */}
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="flex flex-col items-start md:items-end gap-8"
          >
            <div className="flex gap-6">
              {socialLinks.map((link, index) => (
                <motion.a
                  key={link.label}
                  href={link.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  initial={{ opacity: 0, scale: 0.8 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.5, delay: 0.3 + index * 0.1 }}
                  whileHover={{
                    scale: 1.2,
                    rotate: 5,
                  }}
                  className="relative group"
                >
                  <div className="absolute inset-0 bg-[#C9A962] blur-lg opacity-0 group-hover:opacity-60 transition-opacity duration-300 rounded-full" />
                  <div className="relative w-12 h-12 flex items-center justify-center rounded-full border-2 border-white/30 group-hover:border-[#C9A962] transition-colors duration-300 bg-transparent">
                    <link.icon className="w-5 h-5 text-white group-hover:text-[#C9A962] transition-colors duration-300" />
                  </div>
                </motion.a>
              ))}
            </div>

            <motion.div
              initial={{ width: 0 }}
              whileInView={{ width: "100%" }}
              transition={{ duration: 1, delay: 0.5 }}
              className="h-px bg-gradient-to-l from-[#C9A962] to-transparent"
            />
          </motion.div>
        </motion.div>
      </div>
    </footer>
  )
}
