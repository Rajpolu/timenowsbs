"use client"
import { Check, Sparkles } from "lucide-react"
import Link from "next/link"
import { useState, useEffect } from "react"
import { PaymentButton } from "@/components/payment-button"

export default function PricingPage() {
  const [timeLeft, setTimeLeft] = useState(336)
  const [isAnnual, setIsAnnual] = useState(false)
  const [mounted, setMounted] = useState(false)
  const [notification, setNotification] = useState<{ type: "success" | "error"; message: string } | null>(null)

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

  const proFeatures = [
    "Everything in Free +",
    "Advanced Daily Planner",
    "Unlimited tasks",
    "Custom work intervals",
    "Session analytics",
    "Export data",
    "Priority support",
    "Ad-free experience",
  ]

  const regularPrice = isAnnual ? 71.88 : 5.99
  const discountedPrice = 4.79

  if (!mounted) return null

  return (
    <div className="min-h-screen bg-black">
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

      <header className="border-b border-white/10 sticky top-0 z-50 bg-black">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-2">
            <div className="text-2xl font-bold text-[#F4C430]">⏱</div>
            <span className="text-xl font-bold hidden sm:inline text-white">timenow.sbs</span>
          </Link>
          <Link href="/" className="text-white hover:text-[#F4C430] transition">
            Back
          </Link>
        </div>
      </header>

      <div className="bg-gradient-to-r from-[#F4C430]/20 to-[#F4C430]/10 border-b border-[#F4C430]/30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3 flex flex-col sm:flex-row items-center justify-center gap-2 text-sm">
          <Sparkles className="w-4 h-4 text-[#F4C430] flex-shrink-0" aria-hidden="true" />
          <span className="text-white">
            🎉 Limited Time: <strong>20% OFF</strong> - then just <strong>$4.79/month</strong> - Expires in {hours}h{" "}
            {minutes}m
          </span>
        </div>
      </div>

      <section className="px-4 sm:px-6 lg:px-8 py-12 sm:py-16 md:py-20">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-12">
            <h1 className="text-4xl sm:text-5xl font-bold mb-4 text-white">Pricing</h1>
            <p className="text-lg text-white/60 mb-6">Start free, upgrade whenever you need more power</p>

            <div className="flex items-center justify-center gap-4 bg-zinc-900 border border-white/10 rounded-lg p-2 w-fit mx-auto">
              <button
                onClick={() => setIsAnnual(false)}
                className={`px-4 py-2 rounded font-semibold transition ${
                  !isAnnual ? "bg-[#F4C430] text-black" : "text-white/60 hover:text-white"
                }`}
                aria-pressed={!isAnnual}
              >
                Monthly
              </button>
              <button
                onClick={() => setIsAnnual(true)}
                className={`px-4 py-2 rounded font-semibold transition ${
                  isAnnual ? "bg-[#F4C430] text-black" : "text-white/60 hover:text-white"
                }`}
                aria-pressed={isAnnual}
              >
                Annual
              </button>
              {isAnnual && <span className="text-xs bg-red-500 text-white px-2 py-1 rounded">Save 20%</span>}
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8">
            <div className="bg-card border border-border rounded-lg p-6 sm:p-8">
              <h2 className="text-2xl font-bold mb-2">Free</h2>
              <p className="text-muted-foreground text-sm mb-6">Perfect for getting started</p>
              <div className="mb-8">
                <div className="text-4xl font-bold">$0</div>
                <p className="text-sm text-muted-foreground mt-1">Forever free</p>
              </div>
              <Link
                href="/timezones"
                className="w-full py-2 px-4 bg-secondary text-secondary-foreground rounded-lg font-semibold hover:opacity-90 transition text-center block"
              >
                Get Started
              </Link>
              <div className="mt-8 space-y-4">
                {freeFeatures.map((feature, i) => (
                  <div key={i} className="flex items-start gap-3">
                    <Check className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" aria-hidden="true" />
                    <span className="text-sm">{feature}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="bg-gradient-to-br from-primary/10 to-accent/10 border-2 border-primary rounded-lg p-6 sm:p-8 relative overflow-hidden">
              <div className="absolute top-4 right-4 bg-primary text-primary-foreground text-xs font-bold px-3 py-1 rounded-full">
                MOST POPULAR
              </div>

              <h2 className="text-2xl font-bold mb-2">Pro</h2>
              <p className="text-muted-foreground text-sm mb-6">For power users</p>

              <div className="mb-8">
                <div className="flex items-baseline gap-2">
                  <span className="text-sm line-through text-muted-foreground">${regularPrice.toFixed(2)}</span>
                  <div>
                    <div className="text-4xl font-bold text-primary">${discountedPrice.toFixed(2)}</div>
                    <p className="text-sm text-muted-foreground mt-1">
                      {isAnnual ? "/year (billed once)" : "/month"}{" "}
                      <span className="text-primary font-bold">20% OFF</span>
                    </p>
                  </div>
                </div>
              </div>

              <PaymentButton
                price={discountedPrice}
                plan={isAnnual ? "annual" : "monthly"}
                onSuccess={() => {
                  showNotification("success", "Payment successful! You now have access to Pro features.")
                }}
                onError={(error) => {
                  showNotification("error", `Payment failed: ${error}`)
                }}
              />

              <p className="text-xs text-center text-muted-foreground mt-2">
                {isAnnual ? "Next payment: 12 months" : "Cancel anytime"}
              </p>

              <div className="mt-8 space-y-4">
                {proFeatures.map((feature, i) => (
                  <div key={i} className="flex items-start gap-3">
                    <Check className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" aria-hidden="true" />
                    <span className="text-sm">{feature}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div className="mt-12 bg-card border border-border rounded-lg p-6 text-center">
            <p className="text-sm text-muted-foreground mb-4">
              💳 <strong>14-day free trial</strong> on Pro plan. No credit card required to start free plan.
            </p>
            <p className="text-xs text-muted-foreground">
              All prices include 20% limited-time discount. Offer expires in {hours}h {minutes}m
            </p>
          </div>
        </div>
      </section>

      <footer className="border-t border-white/10 mt-16">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-8 mb-8">
            <div>
              <h3 className="font-semibold mb-4 text-white">Legal</h3>
              <ul className="space-y-2 text-sm">
                <li>
                  <Link href="/terms" className="text-white/60 hover:text-white transition">
                    Terms of Service
                  </Link>
                </li>
                <li>
                  <Link href="/privacy" className="text-white/60 hover:text-white transition">
                    Privacy Policy
                  </Link>
                </li>
                <li>
                  <Link href="/refund" className="text-white/60 hover:text-white transition">
                    Refund Policy
                  </Link>
                </li>
              </ul>
            </div>
            <div>
              <h3 className="font-semibold mb-4 text-white">Support</h3>
              <ul className="space-y-2 text-sm">
                <li>
                  <a href="mailto:support@timenow.sbs" className="text-white/60 hover:text-white transition">
                    Contact Us
                  </a>
                </li>
              </ul>
            </div>
            <div>
              <p className="text-xs text-white/60">Payment methods: Stripe (International), Razorpay (India), PayPal</p>
            </div>
          </div>
          <div className="border-t border-white/10 pt-8 text-center text-sm text-white/60">
            <p>&copy; 2025 timenow.sbs. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  )
}
