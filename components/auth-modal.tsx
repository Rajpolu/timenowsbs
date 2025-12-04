"use client"

import type React from "react"
import { useState } from "react"
import { X, Loader2 } from "lucide-react"
import { createClient } from "@/lib/supabase/client"

interface AuthModalProps {
  isOpen: boolean
  onClose: () => void
  onSubmit: (email: string) => void
}

export function AuthModal({ isOpen, onClose, onSubmit }: AuthModalProps) {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [isSignUp, setIsSignUp] = useState(true)
  const [authMethod, setAuthMethod] = useState<"email" | "google" | "facebook">("email")

  const handleEmailSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setError(null)

    try {
      const supabase = createClient()

      if (isSignUp) {
        const { data, error: signUpError } = await supabase.auth.signUp({
          email,
          password,
          options: {
            emailRedirectTo: process.env.NEXT_PUBLIC_DEV_SUPABASE_REDIRECT_URL || `${window.location.origin}`,
          },
        })

        if (signUpError) throw new Error(signUpError.message)

        localStorage.setItem("userEmail", email)
        onSubmit(email)
        setEmail("")
        setPassword("")
        onClose()
      } else {
        const { data, error: signInError } = await supabase.auth.signInWithPassword({
          email,
          password,
        })

        if (signInError) throw new Error(signInError.message)

        localStorage.setItem("userEmail", email)
        onSubmit(email)
        setEmail("")
        setPassword("")
        onClose()
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : "An error occurred")
    } finally {
      setLoading(false)
    }
  }

  const handleOAuthClick = async (provider: "google" | "facebook") => {
    setLoading(true)
    try {
      const supabase = createClient()
      const { data, error: oauthError } = await supabase.auth.signInWithOAuth({
        provider: provider,
        options: {
          redirectTo: process.env.NEXT_PUBLIC_DEV_SUPABASE_REDIRECT_URL || window.location.origin,
        },
      })

      if (oauthError) throw new Error(oauthError.message)
    } catch (err) {
      setError(err instanceof Error ? err.message : "OAuth failed")
      setLoading(false)
    }
  }

  if (!isOpen) return null

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 p-4">
      <div className="bg-zinc-900 border border-white/10 rounded-xl max-w-md w-full p-6 relative">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-1 hover:bg-zinc-800 rounded transition"
          aria-label="Close"
        >
          <X className="w-5 h-5 text-white" />
        </button>

        <h2 className="text-2xl font-bold mb-2 text-white">{isSignUp ? "Save Your Progress" : "Welcome Back"}</h2>
        <p className="text-white/60 mb-6">
          {isSignUp
            ? "Sign up to store your tasks and data without losing them. Takes just 10 seconds!"
            : "Log in to access your saved data and continue where you left off."}
        </p>

        <div className="mb-6 space-y-2">
          <button
            onClick={() => handleOAuthClick("google")}
            disabled={loading}
            className="w-full px-4 py-2 bg-white text-black rounded-lg font-semibold hover:bg-white/90 transition disabled:opacity-50 flex items-center justify-center gap-2"
          >
            {loading && <Loader2 className="w-4 h-4 animate-spin" />}
            Continue with Google
          </button>
          <button
            onClick={() => handleOAuthClick("facebook")}
            disabled={loading}
            className="w-full px-4 py-2 bg-blue-600 text-white rounded-lg font-semibold hover:bg-blue-700 transition disabled:opacity-50 flex items-center justify-center gap-2"
          >
            {loading && <Loader2 className="w-4 h-4 animate-spin" />}
            Continue with Facebook
          </button>
        </div>

        <div className="relative mb-6">
          <div className="absolute inset-0 flex items-center">
            <div className="w-full border-t border-white/10"></div>
          </div>
          <div className="relative flex justify-center text-sm">
            <span className="px-2 bg-zinc-900 text-white/60">Or continue with email</span>
          </div>
        </div>

        <form onSubmit={handleEmailSubmit} className="space-y-4">
          <input
            type="email"
            placeholder="your@email.com"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            className="w-full px-4 py-2 bg-zinc-800 border border-white/10 rounded-lg text-white placeholder-white/40 focus:outline-none focus:border-[#F4C430]"
          />
          <input
            type="password"
            placeholder="Enter password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            className="w-full px-4 py-2 bg-zinc-800 border border-white/10 rounded-lg text-white placeholder-white/40 focus:outline-none focus:border-[#F4C430]"
          />

          {error && <p className="text-sm text-red-400">{error}</p>}

          <button
            type="submit"
            disabled={loading}
            className="w-full py-2 bg-[#F4C430] text-black rounded-lg font-semibold hover:bg-[#E0B420] transition disabled:opacity-50 flex items-center justify-center gap-2"
          >
            {loading && <Loader2 className="w-4 h-4 animate-spin" />}
            {loading ? (isSignUp ? "Signing up..." : "Logging in...") : isSignUp ? "Sign Up & Save" : "Log In"}
          </button>
        </form>

        <button
          onClick={onClose}
          className="w-full mt-3 py-2 text-white bg-zinc-800 rounded-lg font-semibold hover:bg-zinc-700 transition"
        >
          Continue as Guest
        </button>

        <div className="text-center mt-4">
          <button
            onClick={() => {
              setIsSignUp(!isSignUp)
              setError(null)
            }}
            className="text-sm text-white/60 hover:text-white transition"
          >
            {isSignUp ? "Already have an account? Log in" : "Don't have an account? Sign up"}
          </button>
        </div>

        <p className="text-xs text-white/60 text-center mt-4">Your data is stored securely. No credit card required.</p>
      </div>
    </div>
  )
}
