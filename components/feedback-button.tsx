"use client"

import type React from "react"
import { useState } from "react"
import { MessageCircle, X } from "lucide-react"

export function FeedbackButton() {
  const [isOpen, setIsOpen] = useState(false)
  const [feedback, setFeedback] = useState("")
  const [submitted, setSubmitted] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    try {
      const response = await fetch("/api/feedback", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ feedback, timestamp: new Date().toISOString() }),
      })

      if (!response.ok) throw new Error("Failed to submit feedback")

      setSubmitted(true)
      setTimeout(() => {
        setIsOpen(false)
        setFeedback("")
        setSubmitted(false)
      }, 2000)
    } catch (error) {
      console.error("[v0] Feedback submission error:", error)
    }
  }

  return (
    <>
      <button
        onClick={() => setIsOpen(true)}
        className="fixed bottom-6 right-6 z-40 p-4 bg-[#F4C430] text-black rounded-full shadow-lg hover:bg-[#E0B420] transition-all duration-300 hover:scale-110 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#F4C430]"
        aria-label="Send feedback"
        title="Send us feedback"
      >
        <MessageCircle className="w-6 h-6" />
      </button>

      {isOpen && (
        <div className="fixed inset-0 z-50 bg-black/70 flex items-center justify-center p-4">
          <div className="bg-zinc-900 rounded-xl border border-white/10 max-w-md w-full shadow-xl">
            <div className="flex items-center justify-between p-6 border-b border-white/10">
              <h2 className="text-xl font-bold text-white">Share Your Feedback</h2>
              <button
                onClick={() => setIsOpen(false)}
                className="p-2 hover:bg-zinc-800 rounded-lg transition focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"
                aria-label="Close feedback dialog"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleSubmit} className="p-6 space-y-4">
              {submitted ? (
                <div className="text-center py-4">
                  <p className="text-[#F4C430] font-semibold">Thank you for your feedback!</p>
                  <p className="text-sm text-white/60">We appreciate your input.</p>
                </div>
              ) : (
                <>
                  <textarea
                    value={feedback}
                    onChange={(e) => setFeedback(e.target.value)}
                    placeholder="Tell us what you think..."
                    className="w-full px-4 py-3 bg-zinc-800 border border-white/10 rounded-lg text-white placeholder-white/40 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#F4C430] resize-none"
                    rows={4}
                    required
                  />
                  <button
                    type="submit"
                    disabled={!feedback.trim()}
                    className="w-full px-4 py-2 bg-[#F4C430] text-black rounded-lg font-semibold hover:bg-[#E0B420] transition disabled:opacity-50"
                  >
                    Send Feedback
                  </button>
                </>
              )}
            </form>
          </div>
        </div>
      )}
    </>
  )
}
