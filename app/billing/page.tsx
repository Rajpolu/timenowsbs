"use client"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import { createClient } from "@/lib/supabase/client"
import { ArrowLeft, CreditCard, CheckCircle } from "lucide-react"
import Link from "next/link"

export default function BillingPage() {
  const [user, setUser] = useState<any>(null)
  const [subscription, setSubscription] = useState<any>(null)
  const [loading, setLoading] = useState(true)
  const router = useRouter()
  const [supabase] = useState(() => createClient())

  useEffect(() => {
    async function fetchBilling() {
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
        console.error("[v0] Billing fetch error:", error)
      } finally {
        setLoading(false)
      }
    }

    fetchBilling()
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
        <Link href="/profile" className="text-[#F4C430] hover:scale-110 transition">
          <ArrowLeft className="w-5 h-5" />
        </Link>
        <div className="ml-4 text-sm font-black uppercase tracking-widest">Billing & Subscription</div>
      </header>

      <main className="max-w-2xl mx-auto p-8">
        {/* Current Plan */}
        <div className="bg-zinc-950 border border-white/5 rounded-2xl p-8 mb-8">
          <h2 className="text-xl font-black italic uppercase tracking-tighter mb-6">Current Plan</h2>

          <div className="p-6 bg-zinc-900 rounded-xl border border-white/5 mb-6">
            <div className="flex items-center justify-between mb-4">
              <div>
                <p className="text-xs font-black text-white/40 uppercase tracking-widest mb-2">Plan Name</p>
                <p className="text-lg font-black text-white capitalize">
                  {subscription?.plan === "pro" ? "Professional" : "Free"} Plan
                </p>
              </div>
              {isPremium && (
                <div className="flex items-center gap-2 text-[#F4C430]">
                  <CheckCircle className="w-5 h-5" />
                  <span className="text-xs font-black uppercase">Active</span>
                </div>
              )}
            </div>

            {isPremium && (
              <div className="pt-4 border-t border-white/5">
                <p className="text-xs font-black text-white/40 uppercase tracking-widest mb-2">Billing Cycle</p>
                <p className="text-sm font-bold text-white">Monthly - $5.99/month</p>
              </div>
            )}
          </div>

          {!isPremium && (
            <Link
              href="/pricing"
              className="w-full inline-block px-6 py-3 bg-[#F4C430] text-black rounded-xl font-black uppercase tracking-widest text-center hover:bg-[#E0B420] transition"
            >
              Upgrade to Pro
            </Link>
          )}

          {isPremium && (
            <div className="space-y-3">
              <button className="w-full px-6 py-3 bg-white/5 text-white rounded-xl font-black uppercase tracking-widest text-sm hover:bg-white/10 transition border border-white/10">
                Update Payment Method
              </button>
              <button className="w-full px-6 py-3 bg-red-500/10 text-red-400 rounded-xl font-black uppercase tracking-widest text-sm hover:bg-red-500/20 transition border border-red-500/20">
                Cancel Subscription
              </button>
            </div>
          )}
        </div>

        {/* Billing History */}
        <div className="bg-zinc-950 border border-white/5 rounded-2xl p-8">
          <h2 className="text-xl font-black italic uppercase tracking-tighter mb-6">Billing History</h2>

          <div className="space-y-3">
            {isPremium ? (
              <div className="p-4 bg-zinc-900 rounded-xl border border-white/5 flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <CreditCard className="w-5 h-5 text-[#F4C430]" />
                  <div>
                    <p className="text-sm font-bold text-white">Professional Plan - Monthly</p>
                    <p className="text-xs text-white/40">Next billing: Jan 6, 2026</p>
                  </div>
                </div>
                <div className="text-right">
                  <p className="text-sm font-black text-[#F4C430]">$5.99</p>
                  <p className="text-xs text-white/40">Paid</p>
                </div>
              </div>
            ) : (
              <div className="text-center py-8 text-white/50">
                <p className="text-sm">No billing history. Upgrade to Pro to see transaction details.</p>
              </div>
            )}
          </div>
        </div>
      </main>
    </div>
  )
}
