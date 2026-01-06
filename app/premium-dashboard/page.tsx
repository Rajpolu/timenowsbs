"use client"

import { useState, useEffect } from "react"
import { createClient } from "@/lib/supabase/client"
import { getSubscriptionStatus } from "@/lib/subscription"
import { ArrowLeft, BarChart3, Download, Zap } from "lucide-react"
import Link from "next/link"
import { useRouter } from "next/navigation"

export default function PremiumDashboard() {
  const [user, setUser] = useState<any>(null)
  const [isPremium, setIsPremium] = useState(false)
  const [loading, setLoading] = useState(true)
  const router = useRouter()
  const [supabase] = useState(() => createClient())

  useEffect(() => {
    const checkPremiumAccess = async () => {
      try {
        const {
          data: { session },
        } = await supabase.auth.getSession()

        if (!session) {
          router.push("/")
          return
        }

        setUser(session.user)

        // Check if user is premium
        const subscription = await getSubscriptionStatus(session.user.id)
        const isPremiumUser = subscription.isPremium

        if (!isPremiumUser) {
          router.push("/pricing")
          return
        }

        setIsPremium(true)
      } catch (error) {
        console.error("[v0] Error checking premium access:", error)
        router.push("/")
      } finally {
        setLoading(false)
      }
    }

    checkPremiumAccess()
  }, [supabase, router])

  if (loading) {
    return (
      <div className="min-h-screen bg-black text-white flex items-center justify-center">
        <div className="animate-spin">
          <Zap className="w-8 h-8 text-[#F4C430]" />
        </div>
      </div>
    )
  }

  if (!isPremium) {
    return null // Redirect handled in useEffect
  }

  return (
    <div className="min-h-screen bg-black text-white font-sans pb-20 sm:pb-0">
      {/* Mobile Header */}
      <div className="sm:hidden fixed top-0 left-0 right-0 bg-black/95 backdrop-blur-xl border-b border-white/5 z-40">
        <div className="flex items-center justify-between p-4">
          <Link href="/profile" className="p-2 hover:bg-white/5 rounded-lg transition">
            <ArrowLeft className="w-5 h-5" />
          </Link>
          <h1 className="text-lg font-black italic uppercase tracking-tighter">Premium Hub</h1>
          <div className="w-9" />
        </div>
      </div>

      {/* Desktop Header */}
      <div className="hidden sm:block border-b border-white/5 bg-black/50 backdrop-blur-xl sticky top-0 z-40">
        <div className="max-w-5xl mx-auto px-6 py-6 flex items-center gap-4">
          <Zap className="w-6 h-6 text-[#F4C430]" />
          <h1 className="text-2xl font-black italic uppercase tracking-tighter">Premium Dashboard</h1>
        </div>
      </div>

      {/* Content */}
      <div className="max-w-5xl mx-auto px-4 sm:px-6 py-8 pt-24 sm:pt-8">
        {/* Features Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-8">
          {[
            {
              title: "Advanced Daily Planner",
              desc: "Organize unlimited tasks with smart scheduling and priority management",
              icon: "📅",
            },
            {
              title: "Unlimited Tasks",
              desc: "Create and manage as many tasks as you need without limits",
              icon: "✓",
            },
            {
              title: "Custom Work Intervals",
              desc: "Customize Pomodoro intervals and break durations to your preference",
              icon: "⚙",
            },
            {
              title: "Session Analytics",
              desc: "Get detailed insights into your productivity patterns and trends",
              icon: "📊",
            },
            {
              title: "Priority Support",
              desc: "Get help from our support team with priority response times",
              icon: "⭐",
            },
            {
              title: "Data Export",
              desc: "Export your data in CSV and JSON formats for backup and analysis",
              icon: "💾",
            },
          ].map((feature, i) => (
            <div
              key={i}
              className="p-6 bg-gradient-to-br from-white/5 to-white/2 border border-white/10 rounded-2xl hover:border-[#F4C430]/50 transition group"
            >
              <div className="text-3xl mb-3 group-hover:scale-110 transition">{feature.icon}</div>
              <h3 className="font-black text-white mb-2 uppercase tracking-tight">{feature.title}</h3>
              <p className="text-sm text-white/60">{feature.desc}</p>
            </div>
          ))}
        </div>

        {/* Export Section */}
        <div className="bg-zinc-950 border border-white/10 rounded-2xl p-8">
          <h2 className="text-xl font-black italic uppercase tracking-tighter mb-6">Export Your Data</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <button className="flex items-center gap-3 p-4 bg-white/5 border border-white/10 rounded-xl hover:bg-white/10 transition text-left">
              <Download className="w-5 h-5 text-[#F4C430] flex-shrink-0" />
              <div>
                <p className="font-bold text-white">Export as CSV</p>
                <p className="text-xs text-white/60">Spreadsheet format</p>
              </div>
            </button>
            <button className="flex items-center gap-3 p-4 bg-white/5 border border-white/10 rounded-xl hover:bg-white/10 transition text-left">
              <Download className="w-5 h-5 text-[#F4C430] flex-shrink-0" />
              <div>
                <p className="font-bold text-white">Export as JSON</p>
                <p className="text-xs text-white/60">Raw data format</p>
              </div>
            </button>
          </div>
        </div>

        {/* Sessions Analytics Placeholder */}
        <div className="mt-8 p-8 bg-zinc-950 border border-white/10 rounded-2xl">
          <div className="flex items-center gap-3 mb-6">
            <BarChart3 className="w-6 h-6 text-[#F4C430]" />
            <h2 className="text-xl font-black italic uppercase tracking-tighter">Session Analytics</h2>
          </div>
          <div className="h-64 bg-black/50 rounded-xl border border-white/5 flex items-center justify-center">
            <p className="text-white/40">Your analytics will appear here as you use the app</p>
          </div>
        </div>
      </div>
    </div>
  )
}
