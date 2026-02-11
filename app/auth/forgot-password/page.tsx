'use client'

import React from "react"

import { useState } from 'react'
import { createClient } from '@/lib/supabase/client'
import Link from 'next/link'
import { Mail, ArrowLeft, Loader2, Check } from 'lucide-react'

export default function ForgotPasswordPage() {
  const [email, setEmail] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [success, setSuccess] = useState(false)
  const supabase = createClient()

  const handleResetPassword = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setError(null)

    try {
      const { error: resetError } = await supabase.auth.resetPasswordForEmail(email, {
        redirectTo:
          typeof window !== 'undefined'
            ? `${window.location.origin}/auth/reset-password`
            : process.env.NEXT_PUBLIC_DEV_SUPABASE_REDIRECT_URL || '',
      })

      if (resetError) throw new Error(resetError.message)

      setSuccess(true)
      setEmail('')
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to send reset email')
    } finally {
      setLoading(false)
    }
  }

  if (success) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-black flex items-center justify-center p-4">
        <div className="w-full max-w-md text-center">
          <div className="mb-6 flex justify-center">
            <div className="w-16 h-16 bg-amber-500/20 rounded-full flex items-center justify-center">
              <Check className="w-8 h-8 text-amber-500" />
            </div>
          </div>

          <h1 className="text-3xl font-bold text-white mb-2">Check your email</h1>
          <p className="text-slate-400 mb-6">We've sent you a link to reset your password. It expires in 24 hours.</p>

          <Link
            href="/auth/sign-in"
            className="inline-block px-6 py-3 bg-gradient-to-r from-amber-400 to-orange-500 text-black font-bold rounded-lg hover:from-amber-300 hover:to-orange-400 transition-all shadow-lg shadow-amber-500/20"
          >
            Back to sign in
          </Link>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-black flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        {/* Header */}
        <div className="mb-10">
          <Link href="/auth/sign-in" className="inline-flex items-center gap-1 text-amber-500 hover:text-amber-400 transition mb-8">
            <ArrowLeft className="w-4 h-4" />
            Back to sign in
          </Link>

          <h1 className="text-4xl font-bold text-white mb-2 tracking-tight">Reset password</h1>
          <p className="text-slate-400 text-sm">Enter your email and we'll send you a link to reset your password</p>
        </div>

        {/* Reset Form */}
        <form onSubmit={handleResetPassword} className="space-y-5 mb-8">
          {/* Email Field */}
          <div className="space-y-2">
            <label className="block text-sm font-medium text-slate-200">Email address</label>
            <div className="relative">
              <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-500 pointer-events-none" />
              <input
                type="email"
                placeholder="you@example.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="w-full pl-10 pr-4 py-3 bg-slate-900/50 border border-slate-700/50 rounded-lg text-white placeholder-slate-500 focus:outline-none focus:border-amber-500/50 focus:ring-2 focus:ring-amber-500/20 transition-all"
              />
            </div>
          </div>

          {/* Error Message */}
          {error && <div className="p-3 bg-red-500/10 border border-red-500/20 rounded-lg text-red-400 text-sm">{error}</div>}

          {/* Submit Button */}
          <button
            type="submit"
            disabled={loading}
            className="w-full py-3 bg-gradient-to-r from-amber-400 to-orange-500 hover:from-amber-300 hover:to-orange-400 text-black font-bold rounded-lg transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2 shadow-lg shadow-amber-500/20"
          >
            {loading ? (
              <>
                <Loader2 className="w-4 h-4 animate-spin" />
                Sending email...
              </>
            ) : (
              <>Send reset link</>
            )}
          </button>
        </form>

        {/* Info Box */}
        <div className="p-4 bg-slate-900/30 border border-slate-700/30 rounded-lg">
          <p className="text-sm text-slate-400">
            <span className="font-medium text-slate-300">Tip:</span> Check your spam folder if you don't see the email within a few minutes.
          </p>
        </div>
      </div>
    </div>
  )
}
