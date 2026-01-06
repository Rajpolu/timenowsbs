"use client"

import type React from "react"
import { useState, useEffect } from "react"
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
  const [supabaseReady, setSupabaseReady] = useState(false)
  const [supabase] = useState(() => createClient())

  useEffect(() => {
    if (process.env.NEXT_PUBLIC_SUPABASE_URL && process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY) {
      setSupabaseReady(true)
    }
  }, [])

  const handleEmailSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    if (!supabaseReady) {
      setError("Authentication service is temporarily unavailable. Please check your connection.")
      return
    }

    setLoading(true)
    setError(null)

    try {
      if (isSignUp) {
        const { data, error: signUpError } = await supabase.auth.signUp({
          email,
          password,
          options: {
            emailRedirectTo: typeof window !== "undefined" ? `${window.location.origin}/auth/callback` : undefined,
          },
        })

        if (signUpError) throw new Error(signUpError.message)
        setError("Please check your email for the confirmation link.")
        setLoading(false)
        return
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
      let message = err instanceof Error ? err.message : "An error occurred"

      if (message.includes("fetch")) {
        message = "Connection to authentication service failed. Please try again."
      }

      setError(message)
    } finally {
      setLoading(false)
    }
  }

  const handleOAuthClick = async (provider: "google" | "facebook") => {
    setLoading(true)
    setError(null)
    try {
      const redirectUrl =
        typeof window !== "undefined"
          ? `${window.location.origin}/auth/callback`
          : process.env.NEXT_PUBLIC_DEV_SUPABASE_REDIRECT_URL || ""

      const { data, error: oauthError } = await supabase.auth.signInWithOAuth({
        provider: provider,
        options: {
          redirectTo: redirectUrl,
          queryParams: {
            access_type: "offline",
            prompt: "consent",
          },
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
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 p-4 backdrop-blur-sm">
      <div className="bg-zinc-950 border-2 border-[#F4C430]/20 rounded-2xl max-w-md w-full p-8 relative shadow-2xl">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-2 hover:bg-white/5 rounded-full transition text-white/40 hover:text-white"
          aria-label="Close"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="text-center mb-8">
          <h2 className="text-3xl font-black mb-2 text-white italic uppercase tracking-tighter">
            {isSignUp ? "Unlock Pro" : "Welcome Back"}
          </h2>
          <p className="text-white/50 text-xs font-black uppercase tracking-widest">
            {isSignUp ? "Join 10,000+ high performers" : "Access your productivity lab"}
          </p>
        </div>

        <div className="space-y-3 mb-8">
          <button
            onClick={() => handleOAuthClick("google")}
            disabled={loading}
            className="w-full h-12 bg-white text-black rounded-xl font-black uppercase tracking-widest hover:bg-white/90 transition disabled:opacity-50 flex items-center justify-center gap-3 text-xs shadow-lg"
          >
            {loading ? <Loader2 className="w-4 h-4 animate-spin" /> : "G"}
            Continue with Google
          </button>
          <button
            onClick={() => handleOAuthClick("facebook")}
            disabled={loading}
            className="w-full h-12 bg-[#1877F2] text-white rounded-xl font-black uppercase tracking-widest hover:bg-[#1877F2]/90 transition disabled:opacity-50 flex items-center justify-center gap-3 text-xs shadow-lg"
          >
            {loading ? <Loader2 className="w-4 h-4 animate-spin" /> : "F"}
            Continue with Facebook
          </button>
        </div>

        <div className="relative mb-8">
          <div className="absolute inset-0 flex items-center">
            <div className="w-full border-t border-white/10"></div>
          </div>
          <div className="relative flex justify-center text-[10px] font-black uppercase tracking-[0.2em]">
            <span className="px-4 bg-zinc-950 text-white/20">Secure Email Login</span>
          </div>
        </div>

        <form onSubmit={handleEmailSubmit} className="space-y-4">
          <input
            type="email"
            placeholder="ACCESS@TIMENOW.SBS"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            className="w-full h-12 px-4 bg-zinc-900 border-2 border-white/5 rounded-xl text-white placeholder-white/20 font-bold focus:outline-none focus:border-[#F4C430] transition-all"
          />
          <input
            type="password"
            placeholder="Enter password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            className="w-full h-12 px-4 bg-zinc-900 border-2 border-white/5 rounded-xl text-white placeholder-white/20 font-bold focus:outline-none focus:border-[#F4C430] transition-all"
          />

          {error && <p className="text-sm text-red-400">{error}</p>}

          <button
            type="submit"
            disabled={loading}
            className="w-full h-14 bg-[#F4C430] text-black rounded-xl font-black uppercase tracking-[0.15em] hover:bg-[#E0B420] transition disabled:opacity-50 flex items-center justify-center gap-2 shadow-[0_0_30px_rgba(244,196,48,0.2)]"
          >
            {loading && <Loader2 className="w-4 h-4 animate-spin" />}
            {loading ? "PROCESSING..." : isSignUp ? "CREATE ACCOUNT" : "SIGN IN"}
          </button>
        </form>

        <div className="mt-8 text-center space-y-4">
          <button
            onClick={() => {
              setIsSignUp(!isSignUp)
              setError(null)
            }}
            className="text-[10px] font-black uppercase tracking-widest text-white/40 hover:text-[#F4C430] transition"
          >
            {isSignUp ? "Already a member? Sign in" : "New here? Create your account"}
          </button>

          <button
            onClick={onClose}
            className="block w-full text-[10px] font-black uppercase tracking-widest text-white/20 hover:text-white transition"
          >
            Stay as Guest
          </button>
        </div>
      </div>
    </div>
  )
}
