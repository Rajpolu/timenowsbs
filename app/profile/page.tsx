"use client"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import { createClient } from "@/lib/supabase/client"
import { ArrowLeft, Mail, Shield, Calendar, Zap } from "lucide-react"
import Link from "next/link"

export default function ProfilePage() {
  const [user, setUser] = useState<any>(null)
  const [subscription, setSubscription] = useState<any>(null)
  const [loading, setLoading] = useState(true)
  const router = useRouter()
  const [supabase] = useState(() => createClient())

  useEffect(() => {
    async function fetchProfile() {
      try {
        const {
          data: { user },
        } = await supabase.auth.getUser()

        if (!user) {
          router.push("/")
          return
        }

        setUser(user)

        const { data: subData } = await supabase.from("subscriptions").select("*").eq("user_id", user.id).single()

        setSubscription(subData || { plan: "free", status: "active" })
      } catch (error) {
        console.error("[v0] Profile fetch error:", error)
      } finally {
        setLoading(false)
      }
    }

    fetchProfile()
  }, [supabase, router])

  if (loading) {
    return (
      <div className="min-h-screen bg-black flex items-center justify-center text-[#F4C430]">
        <div className="animate-spin rounded-full h-12 w-12 border-2 border-[#F4C430] border-t-transparent"></div>
      </div>
    )
  }

  if (!user) {
    return null
  }

  const isPremium = subscription?.plan === "pro" && subscription?.status === "active"

  return (
    <div className="min-h-screen bg-black text-white">
      <header className="border-b border-white/5 px-6 h-14 flex items-center sticky top-0 bg-black/80 backdrop-blur-md z-50">
        <Link href="/dashboard" className="text-[#F4C430] hover:scale-110 transition">
          <ArrowLeft className="w-5 h-5" />
        </Link>
        <div className="ml-4 text-sm font-black uppercase tracking-widest">Profile Settings</div>
      </header>

      <main className="max-w-2xl mx-auto p-8">
        {/* Profile Card */}
        <div className="bg-zinc-950 border border-white/5 rounded-2xl p-8 mb-8">
          <div className="flex items-center justify-between mb-8">
            <div>
              <h1 className="text-2xl font-black italic uppercase tracking-tighter mb-2">Account Details</h1>
              <p className="text-white/50 text-xs font-black uppercase tracking-widest">
                {isPremium ? "✓ Premium Member" : "Free Plan"}
              </p>
            </div>
            {isPremium && (
              <div className="px-4 py-2 bg-[#F4C430]/10 border border-[#F4C430]/20 rounded-xl">
                <div className="flex items-center gap-2 text-[#F4C430] text-xs font-black uppercase">
                  <Zap className="w-4 h-4" />
                  Pro
                </div>
              </div>
            )}
          </div>

          {/* Email */}
          <div className="space-y-4 mb-8">
            <div className="flex items-center gap-4 p-4 bg-zinc-900 rounded-xl border border-white/5">
              <Mail className="w-5 h-5 text-[#F4C430]" />
              <div>
                <p className="text-xs font-black text-white/40 uppercase tracking-widest mb-1">Email</p>
                <p className="text-sm font-bold text-white">{user.email}</p>
              </div>
            </div>

            {/* Account Created */}
            <div className="flex items-center gap-4 p-4 bg-zinc-900 rounded-xl border border-white/5">
              <Calendar className="w-5 h-5 text-white/40" />
              <div>
                <p className="text-xs font-black text-white/40 uppercase tracking-widest mb-1">Member Since</p>
                <p className="text-sm font-bold text-white">{new Date(user.created_at).toLocaleDateString()}</p>
              </div>
            </div>

            {/* Subscription Status */}
            <div className="flex items-center gap-4 p-4 bg-zinc-900 rounded-xl border border-white/5">
              <Shield className="w-5 h-5 text-[#F4C430]" />
              <div>
                <p className="text-xs font-black text-white/40 uppercase tracking-widest mb-1">Plan</p>
                <p className="text-sm font-bold text-white capitalize">
                  {subscription?.plan === "pro" ? "Professional Plan" : "Free Plan"}
                </p>
              </div>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="grid grid-cols-2 gap-4 pt-4 border-t border-white/5">
            <Link
              href="/billing"
              className="px-4 py-2 bg-[#F4C430] text-black rounded-xl font-black uppercase tracking-widest text-xs hover:bg-[#E0B420] transition text-center"
            >
              Manage Billing
            </Link>
            <button
              onClick={async () => {
                await supabase.auth.signOut()
                router.push("/")
              }}
              className="px-4 py-2 bg-red-500/10 text-red-400 rounded-xl font-black uppercase tracking-widest text-xs hover:bg-red-500/20 transition border border-red-500/20"
            >
              Sign Out
            </button>
          </div>
        </div>

        {/* Premium Features */}
        {isPremium && (
          <div className="bg-zinc-950 border border-[#F4C430]/20 rounded-2xl p-8">
            <h2 className="text-lg font-black italic uppercase tracking-tighter mb-6">Your Premium Benefits</h2>
            <div className="grid gap-4">
              {[
                "Unlimited daily tasks",
                "Custom work intervals",
                "Session analytics",
                "Data export (CSV/JSON)",
                "Priority email support",
                "Ad-free experience",
              ].map((benefit, i) => (
                <div
                  key={i}
                  className="flex items-center gap-3 p-3 bg-[#F4C430]/5 rounded-lg border border-[#F4C430]/10"
                >
                  <Zap className="w-4 h-4 text-[#F4C430]" />
                  <span className="text-sm font-bold text-white">{benefit}</span>
                </div>
              ))}
            </div>
          </div>
        )}

        {!isPremium && (
          <div className="bg-zinc-950 border border-white/5 rounded-2xl p-8 text-center">
            <h2 className="text-lg font-black italic uppercase tracking-tighter mb-4">Upgrade to Pro</h2>
            <p className="text-sm text-white/60 mb-6">
              Unlock unlimited tasks, analytics, and exclusive features designed for power users.
            </p>
            <Link
              href="/pricing"
              className="inline-block px-6 py-3 bg-[#F4C430] text-black rounded-xl font-black uppercase tracking-widest hover:bg-[#E0B420] transition"
            >
              View Plans
            </Link>
          </div>
        )}
      </main>
    </div>
  )
}
