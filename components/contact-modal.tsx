"use client"

import type React from "react"
import { motion, AnimatePresence } from "framer-motion"
import { useState } from "react"
import { X } from "lucide-react"
import emailjs from "@emailjs/browser"

interface ContactModalProps {
  isOpen: boolean
  onClose: () => void
}

export function ContactModal({ isOpen, onClose }: ContactModalProps) {
  const [name, setName] = useState("")
  const [company, setCompany] = useState("")
  const [email, setEmail] = useState("")
  const [purpose, setPurpose] = useState("")
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [error, setError] = useState("")
  const [success, setSuccess] = useState("")

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    setIsSubmitting(true)
    setError("")
    setSuccess("")

    try {
      await emailjs.send(
        "service_bb3cznz",
        "template_5xya1tc",
        {
          name: name,
          email: email,
          message: purpose,
          title: company,
        },
        "lBp3VLhdYy4a7g_zY"
      )
      setSuccess("Message sent successfully!")
      setName("")
      setCompany("")
      setEmail("")
      setPurpose("")
      setTimeout(() => {
        onClose()
      }, 1500)
    } catch (err) {
      console.error("EMAIL ERROR:", err)
      setError("Failed to send message. Try again.")
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-black/60 backdrop-blur-sm z-40"
          />

          {/* Modal */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            className="fixed inset-0 flex items-center justify-center z-50 p-4"
          >
            <div className="relative w-full max-w-md bg-[#000923] border border-[#C9A962]/30 rounded-xl shadow-2xl">
              {/* Golden glow effect */}
              <div className="absolute inset-0 bg-gradient-to-br from-[#C9A962]/5 to-transparent rounded-xl pointer-events-none" />

              {/* Close button */}
              <button
                onClick={onClose}
                className="absolute top-4 right-4 text-gray-400 hover:text-[#C9A962] transition-colors z-20 p-2 hover:bg-[#C9A962]/10 rounded-full"
                aria-label="Close modal"
              >
                <X size={20} />
              </button>

              {/* Content */}
              <div className="relative z-10 p-6 md:p-8">
                <h2 className="text-2xl font-bold text-white mb-6">Get In Touch</h2>

                <form onSubmit={handleSubmit} className="space-y-4">
                  <div>
                    <label className="block text-sm text-[#B8C5D4] mb-2 font-medium">Your Name</label>
                    <input
                      type="text"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      required
                      className="w-full px-4 py-2.5 bg-[#0a1530] border border-white/10 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:border-[#C9A962] focus:ring-1 focus:ring-[#C9A962] transition-all"
                      placeholder="John Doe"
                    />
                  </div>

                  <div>
                    <label className="block text-sm text-[#B8C5D4] mb-2 font-medium">Company Name</label>
                    <input
                      type="text"
                      value={company}
                      onChange={(e) => setCompany(e.target.value)}
                      required
                      className="w-full px-4 py-2.5 bg-[#0a1530] border border-white/10 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:border-[#C9A962] focus:ring-1 focus:ring-[#C9A962] transition-all"
                      placeholder="Your Company"
                    />
                  </div>

                  <div>
                    <label className="block text-sm text-[#B8C5D4] mb-2 font-medium">Email</label>
                    <input
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      required
                      className="w-full px-4 py-2.5 bg-[#0a1530] border border-white/10 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:border-[#C9A962] focus:ring-1 focus:ring-[#C9A962] transition-all"
                      placeholder="john@company.com"
                    />
                  </div>

                  <div>
                    <label className="block text-sm text-[#B8C5D4] mb-2 font-medium">Message</label>
                    <textarea
                      value={purpose}
                      onChange={(e) => setPurpose(e.target.value)}
                      required
                      className="w-full px-4 py-2.5 bg-[#0a1530] border border-white/10 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:border-[#C9A962] focus:ring-1 focus:ring-[#C9A962] transition-all resize-none"
                      placeholder="How can we help you?"
                      rows={4}
                    />
                  </div>

                  {error && <p className="text-red-400 text-sm font-medium">{error}</p>}
                  {success && <p className="text-green-400 text-sm font-medium">{success}</p>}

                  <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full mt-6 px-6 py-3 bg-gradient-to-r from-[#C9A962] to-[#B3934A] text-[#000923] font-bold rounded-lg hover:from-[#E5C989] hover:to-[#C9A962] disabled:opacity-50 transition-all shadow-lg shadow-[#C9A962]/20"
                  >
                    {isSubmitting ? "Sending..." : "Send Message"}
                  </motion.button>
                </form>
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  )
}

