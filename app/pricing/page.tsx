"use client"
import { Check } from "lucide-react"
import Link from "next/link"
import { useState, useEffect } from "react"
import { PaymentButton } from "@/components/payment-button"

export default function PricingPage() {
  const [timeLeft, setTimeLeft] = useState(336)
  const [isAnnual, setIsAnnual] = useState(false)
  const [mounted, setMounted] = useState(false)
  const [notification, setNotification] = useState<{ type: "success" | "error"; message: string } | null>(null)
  const [activeTab, setActiveTab] = useState<"standard" | "premium">("standard")

  useEffect(() => {
    setMounted(true)
  }, [])

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft((prev) => (prev > 0 ? prev - 1 : 0))
    }, 1000)
    return () => clearInterval(timer)
  }, [])

  const showNotification = (type: "success" | "error", message: string) => {
    setNotification({ type, message })
    setTimeout(() => setNotification(null), 3000)
  }

  const hours = Math.floor(timeLeft / 3600)
  const minutes = Math.floor((timeLeft % 3600) / 60)

  const freeFeatures = [
    "Timezone converter",
    "World clock",
    "Basic timer",
    "Stopwatch with laps",
    "Pomodoro (basic)",
    "Limited to 5 tasks/day",
  ]

  const standardFeatures = [
    "Everything in Free +",
    "Advanced Daily Planner",
    "Unlimited tasks",
    "Custom work intervals",
    "Session analytics",
    "Priority support",
  ]

  const premiumFeatures = [
    "Everything in Standard +",
    "Personal Stats Dashboard",
    "Export session data (CSV/JSON)",
    "API Access for developers",
    "Ad-free experience",
    "Early access to beta tools",
  ]

  const prices = {
    standard: {
      monthly: 5.99,
      annual: 4.79, // $5.99 * 0.8
    },
    premium: {
      monthly: 11.98,
      annual: 9.58, // $11.98 * 0.8
    },
  }

  const currentPrice =
    activeTab === "standard"
      ? isAnnual
        ? prices.standard.annual
        : prices.standard.monthly
      : isAnnual
        ? prices.premium.annual
        : prices.premium.monthly

  if (!mounted) return null

  return (
    <div className="min-h-screen bg-black text-white font-sans">
      {notification && (
        <div
          className={`fixed top-4 right-4 px-4 py-3 rounded-lg z-50 ${
            notification.type === "success" ? "bg-green-500/90 text-white" : "bg-red-500/90 text-white"
          }`}
          role="alert"
        >
          {notification.message}
        </div>
      )}

      <header className="border-b border-white/5 sticky top-0 z-50 bg-black/80 backdrop-blur-xl">
        <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-3 font-black text-xl italic tracking-tighter">
            <span className="text-2xl drop-shadow-[0_0_10px_rgba(244,196,48,0.5)]">⏱</span>
            <span className="uppercase">timenow.sbs</span>
          </Link>
          <Link href="/" className="text-white hover:text-[#F4C430] transition text-sm font-medium">
            Back to Home
          </Link>
        </div>
      </header>

      <div className="flex justify-center py-6">
        <div className="inline-flex items-center gap-2 px-6 py-2 bg-zinc-950 border border-[#F4C430]/20 rounded-2xl shadow-2xl">
          <div className="bg-[#F4C430] text-black text-[9px] font-black px-2 py-0.5 rounded-md uppercase italic leading-none">
            SALE
          </div>
          <span className="text-[10px] font-black uppercase tracking-widest text-white/80">
            20% OFF ANNUAL — <span className="text-[#F4C430]">LIMITED TIME</span>
          </span>
        </div>
      </div>

      <section className="px-6 py-12 md:py-24">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16 px-4">
            <h1 className="text-5xl md:text-8xl font-black mb-6 uppercase italic tracking-tighter">Pricing</h1>
            <p className="text-white/40 text-xs md:text-base font-medium max-w-xl mx-auto leading-relaxed mb-12">
              Precision tools for elite performers. Choose your level of focus.
            </p>

            <div className="flex justify-center mb-10">
              <div className="flex p-1 bg-zinc-950 border border-white/5 rounded-2xl w-full max-w-[280px] sm:max-w-xs gap-1">
                <button
                  onClick={() => setActiveTab("standard")}
                  className={`flex-1 py-3 rounded-xl text-[9px] sm:text-[10px] font-black uppercase tracking-widest transition-all duration-300 ${
                    activeTab === "standard" ? "bg-[#F4C430] text-black shadow-xl" : "text-white/40 hover:text-white"
                  }`}
                >
                  Standard
                </button>
                <button
                  onClick={() => setActiveTab("premium")}
                  className={`flex-1 py-3 rounded-xl text-[9px] sm:text-[10px] font-black uppercase tracking-widest transition-all duration-300 ${
                    activeTab === "premium" ? "bg-[#F4C430] text-black shadow-xl" : "text-white/40 hover:text-white"
                  }`}
                >
                  Premium
                </button>
              </div>
            </div>

            <div className="flex items-center justify-center gap-4 sm:gap-6">
              <span
                className={`text-[9px] sm:text-[10px] font-black uppercase tracking-widest transition ${!isAnnual ? "text-[#F4C430]" : "text-white/20"}`}
              >
                Monthly
              </span>
              <button
                onClick={() => setIsAnnual(!isAnnual)}
                className="relative w-12 sm:w-14 bg-zinc-900 rounded-full border border-white/10 transition-all duration-300 sm:h-[26px] h-[22px]"
              >
                <div
                  className={`absolute top-0.5 left-0.5 w-4 h-4 sm:w-5 rounded-full transition-all duration-500 sm:h-5 font-normal ${
                    isAnnual ? "translate-x-6 sm:translate-x-7 bg-[#F4C430]" : "bg-white/40"
                  }`}
                />
              </button>
              <div className="flex flex-col items-start">
                <span
                  className={`text-[9px] sm:text-[10px] font-black uppercase tracking-widest transition ${isAnnual ? "text-[#F4C430]" : "text-white/20"}`}
                >
                  Annually
                </span>
                <span className="text-[8px] text-[#F4C430] font-black uppercase tracking-tighter leading-none">
                  -20%
                </span>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-10 max-w-4xl mx-auto">
            <div className="bg-zinc-950 border border-white/5 rounded-3xl p-10 flex flex-col hover:border-white/10 transition-colors">
              <h2 className="text-sm font-black text-white/40 uppercase tracking-[0.2em] mb-4">Base Plan</h2>
              <div className="mb-10">
                <div className="text-6xl font-black text-white tracking-tighter">$0</div>
                <p className="text-[10px] text-white/20 mt-3 font-black uppercase tracking-widest">
                  Free for individuals
                </p>
              </div>
              <Link
                href="/auth"
                className="w-full h-14 bg-white/5 border border-white/10 text-white rounded-2xl font-black uppercase tracking-widest hover:bg-white/10 transition flex items-center justify-center mb-10 text-xs"
              >
                {"CURRENT PLAN"}
              </Link>
              <div className="space-y-4 flex-grow">
                {freeFeatures.map((f, i) => (
                  <div key={i} className="flex items-start gap-3">
                    <Check className="w-4 h-4 text-[#F4C430] mt-0.5" />
                    <span className="text-sm text-white/80">{f}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="bg-zinc-950 border-2 border-[#F4C430] rounded-3xl p-10 flex flex-col relative shadow-[0_0_60px_rgba(244,196,48,0.1)]">
              <div className="absolute -top-4 left-1/2 -translate-x-1/2 bg-[#F4C430] text-black text-[9px] font-black px-4 py-1.5 rounded-full uppercase tracking-widest ring-8 ring-black">
                Performance Tier
              </div>
              <h2 className="text-sm font-black text-[#F4C430] uppercase tracking-[0.2em] mb-4">
                {activeTab === "premium" ? "Premium Elite" : "Standard Pro"}
              </h2>

              <div className="mb-10">
                <div className="flex items-baseline gap-2">
                  <div className="text-7xl font-black text-white tracking-tighter">${currentPrice.toFixed(2)}</div>
                  <div className="text-white/20 text-xs font-black uppercase tracking-widest">/mo</div>
                </div>
                <p className="text-[10px] text-white/40 mt-3 font-black uppercase tracking-widest">
                  {isAnnual ? `Billed $${(currentPrice * 12).toFixed(2)} annually` : "Billed monthly"}
                </p>
              </div>

              <PaymentButton
                price={currentPrice}
                plan={isAnnual ? "annual" : "monthly"}
                onSuccess={() => showNotification("success", "Welcome to the Pro family!")}
                onError={(e) => showNotification("error", e)}
              />

              <div className="mt-8 space-y-4 flex-grow">
                {(activeTab === "premium" ? premiumFeatures : standardFeatures).map((f, i) => (
                  <div key={i} className="flex items-start gap-3">
                    <Check className="w-4 h-4 text-[#F4C430] mt-0.5" />
                    <span className="text-sm font-medium">{f}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      <footer className="border-t border-white/5 mt-20 pb-12">
        <div className="max-w-7xl mx-auto px-4 text-center pt-12">
          <p className="text-white/20 text-[10px] uppercase tracking-[0.2em]">
            App by <span className="text-[#F4C430] font-bold">RajPolu</span>
          </p>
        </div>
      </footer>
    </div>
  )
}
