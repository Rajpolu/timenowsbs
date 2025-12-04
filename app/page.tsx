"use client"
import Link from "next/link"
import { Clock, Zap, Calendar, Globe, Timer, Activity, ChevronRight, Sparkles, Send } from "lucide-react"
import { useState, useEffect } from "react"
import { AuthModal } from "@/components/auth-modal"

const tools = [
  {
    id: "timezones",
    title: "Timezones",
    description: "Convert time across different zones instantly",
    icon: Clock,
    href: "/timezones",
    free: true,
  },
  {
    id: "pomodoro",
    title: "Pomodoro",
    description: "Boost productivity with timed work sessions",
    icon: Zap,
    href: "/pomodoro",
    free: true,
  },
  {
    id: "planner",
    title: "Daily Planner",
    description: "Plan your days and weeks to stay organized",
    icon: Calendar,
    href: "/planner",
    free: false,
  },
  {
    id: "world-clock",
    title: "World Clock",
    description: "Check current time anywhere instantly",
    icon: Globe,
    href: "/world-clock",
    free: true,
  },
  {
    id: "timer",
    title: "Timer",
    description: "Set countdowns with smart alarms",
    icon: Timer,
    href: "/timer",
    free: true,
  },
  {
    id: "stopwatch",
    title: "Stopwatch",
    description: "Measure elapsed time with precision",
    icon: Activity,
    href: "/stopwatch",
    free: true,
  },
]

export default function Home() {
  const [timeLeft, setTimeLeft] = useState(336)
  const [mounted, setMounted] = useState(false)
  const [showAuthModal, setShowAuthModal] = useState(false)
  const [userEmail, setUserEmail] = useState<string | null>(null)

  useEffect(() => {
    setMounted(true)
    const savedEmail = localStorage.getItem("userEmail")
    if (savedEmail) setUserEmail(savedEmail)
  }, [])

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft((prev) => (prev > 0 ? prev - 1 : 0))
    }, 1000)
    return () => clearInterval(timer)
  }, [])

  const handleAuthSubmit = (email: string) => {
    localStorage.setItem("userEmail", email)
    setUserEmail(email)
  }

  const hours = Math.floor(timeLeft / 3600)
  const minutes = Math.floor((timeLeft % 3600) / 60)

  if (!mounted) return null

  return (
    <div className="min-h-screen bg-background">
      <AuthModal isOpen={showAuthModal} onClose={() => setShowAuthModal(false)} onSubmit={handleAuthSubmit} />

      <header className="sticky top-0 z-50 bg-background/95 backdrop-blur border-b border-border">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
          <div className="flex items-center gap-2" role="banner">
            <div className="text-2xl font-bold text-primary">⏱</div>
            <div className="flex items-center gap-2">
              <span className="text-xl font-bold hidden sm:inline">timenow.sbs</span>
              <span className="text-xs font-bold px-2 py-1 rounded-full bg-orange-600/20 text-orange-600 border border-orange-600/30 animate-pulse">
                BETA
              </span>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <button
              onClick={() => (window.location.href = "mailto:feedback@timenow.sbs")}
              className="px-3 sm:px-4 py-2 rounded-lg bg-secondary text-foreground font-semibold hover:bg-secondary/80 transition flex items-center gap-2 text-sm"
              aria-label="Send feedback"
            >
              <Send className="w-4 h-4" />
              <span className="hidden sm:inline">Feedback</span>
            </button>
            <Link
              href="/pricing"
              className="px-4 py-2 rounded-lg bg-[#F4C430] text-black font-semibold hover:bg-[#E0B420] transition text-sm focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#F4C430]"
              aria-label="Upgrade to Pro"
            >
              Upgrade
            </Link>
          </div>
        </div>
      </header>

      {/* Urgency Banner */}
      <div
        className="bg-gradient-to-r from-orange-600/10 to-orange-400/10 border-b border-orange-600/20"
        role="region"
        aria-label="Limited time offer"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3 flex flex-col sm:flex-row items-center justify-center gap-2 text-sm">
          <Sparkles className="w-4 h-4 text-orange-600 flex-shrink-0" aria-hidden="true" />
          <span>
            🎉 Limited Time: <strong>20% OFF</strong> upgrade - then just <strong>$4.79/month</strong>
          </span>
          <div className="text-xs text-muted-foreground" aria-live="polite" aria-atomic="true">
            Offer expires in {hours}h {minutes}m
          </div>
        </div>
      </div>

      {/* Hero Section */}
      <section className="px-4 sm:px-6 lg:px-8 py-12 sm:py-16 md:py-24">
        <div className="max-w-4xl mx-auto text-center">
          <div className="mb-4 inline-block">
            <span className="bg-orange-600/20 text-orange-600 px-4 py-2 rounded-full text-sm font-semibold">
              No Sign up required
            </span>
          </div>
          <h1 className="text-4xl sm:text-5xl md:text-7xl font-bold mb-6 text-balance">Master Your Time Instantly</h1>
          <p className="text-lg sm:text-xl text-muted-foreground mb-8 text-balance max-w-2xl mx-auto">
            Powerful time tools ready to use immediately. No account needed. Start free, upgrade when you need more
            power.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/timezones"
              className="px-8 py-3 bg-[#F4C430] text-black rounded-lg font-semibold hover:bg-[#E0B420] transition flex items-center justify-center gap-2 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#F4C430]"
              aria-label="Start free trial"
            >
              Start Free <ChevronRight className="w-4 h-4" aria-hidden="true" />
            </Link>
            <Link
              href="/pricing"
              className="px-8 py-3 bg-card border border-border text-foreground rounded-lg font-semibold hover:border-[#F4C430] transition flex items-center justify-center gap-2 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary"
              aria-label="See pricing plans"
            >
              See Plans <ChevronRight className="w-4 h-4" aria-hidden="true" />
            </Link>
          </div>
        </div>
      </section>

      {/* Tools Grid */}
      <section className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-20">
        <h2 className="text-3xl sm:text-4xl font-bold mb-4 text-center">Advanced Tools</h2>
        <p className="text-muted-foreground text-center mb-12 text-lg">
          6 powerful tools to maximize your productivity
        </p>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6" role="list">
          {tools.map((tool) => {
            const Icon = tool.icon
            return (
              <Link key={tool.id} href={tool.free ? tool.href : "/pricing"} role="listitem">
                <div className="group p-6 sm:p-7 bg-gradient-to-br from-card to-card/50 rounded-xl border border-border hover:border-primary hover:shadow-lg transition-all duration-300 cursor-pointer h-full">
                  <div className="flex items-start justify-between mb-4">
                    <div className="p-3 bg-primary/10 rounded-lg group-hover:bg-primary/20 transition">
                      <Icon className="w-6 h-6 text-primary" aria-hidden="true" />
                    </div>
                    {!tool.free && (
                      <span className="text-xs bg-primary/20 text-primary px-2 py-1 rounded-full font-semibold">
                        Pro
                      </span>
                    )}
                  </div>
                  <h3 className="text-lg sm:text-xl font-bold mb-2 group-hover:text-primary transition">
                    {tool.title}
                  </h3>
                  <p className="text-sm text-muted-foreground">{tool.description}</p>
                </div>
              </Link>
            )
          })}
        </div>
      </section>

      {/* Features */}
      <section className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-20">
        <h2 className="text-3xl sm:text-4xl font-bold mb-4 text-center">Why timenow.sbs?</h2>
        <p className="text-muted-foreground text-center mb-12 text-lg">Everything you need, nothing you don't</p>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 sm:gap-8" role="list">
          {[
            { icon: Globe, title: "Global Timezones", desc: "Compare timezones worldwide with saved favorites" },
            { icon: Zap, title: "Lightning Fast", desc: "Instant access to all tools - no loading delays" },
            { icon: Calendar, title: "Smart Planning", desc: "Daily planner with intelligent task management" },
            { icon: Clock, title: "Precision Tracking", desc: "Accurate stopwatch with lap timing for any activity" },
          ].map((feature, i) => {
            const Icon = feature.icon
            return (
              <div
                key={i}
                className="flex gap-4 p-6 bg-card rounded-xl border border-border hover:border-primary transition"
                role="listitem"
              >
                <Icon className="w-8 h-8 text-primary flex-shrink-0 mt-1" aria-hidden="true" />
                <div>
                  <h3 className="font-bold text-lg mb-1">{feature.title}</h3>
                  <p className="text-sm text-muted-foreground">{feature.desc}</p>
                </div>
              </div>
            )
          })}
        </div>
      </section>

      {/* CTA Section */}
      <section className="bg-gradient-to-r from-primary/15 to-accent/15 border-t border-b border-primary/20 mx-4 sm:mx-6 lg:mx-8 my-12 sm:my-20 rounded-2xl">
        <div className="py-12 sm:py-16 px-6 sm:px-8 text-center">
          <h2 className="text-3xl sm:text-4xl font-bold mb-4">Ready to Master Your Time?</h2>
          <p className="text-muted-foreground mb-8 text-balance max-w-2xl mx-auto text-lg">
            Get started instantly with no sign up required. Upgrade anytime to unlock all premium features.
          </p>
          <Link
            href="/pricing"
            className="inline-block px-8 py-3 bg-[#F4C430] text-black rounded-lg font-semibold hover:bg-[#E0B420] transition focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#F4C430]"
            aria-label="Upgrade now with 20% discount"
          >
            Upgrade Now - 20% Off
          </Link>
        </div>
      </section>

      <footer className="border-t border-border mt-20 sm:mt-24">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 mb-8">
            <div>
              <h3 className="font-bold mb-4">Company</h3>
              <ul className="space-y-2 text-sm">
                <li>
                  <Link href="/" className="text-muted-foreground hover:text-foreground transition">
                    Home
                  </Link>
                </li>
                <li>
                  <Link href="/pricing" className="text-muted-foreground hover:text-foreground transition">
                    Pricing
                  </Link>
                </li>
              </ul>
            </div>
            <div>
              <h3 className="font-bold mb-4">Legal</h3>
              <ul className="space-y-2 text-sm">
                <li>
                  <Link href="/terms" className="text-muted-foreground hover:text-foreground transition">
                    Terms of Service
                  </Link>
                </li>
                <li>
                  <Link href="/privacy" className="text-muted-foreground hover:text-foreground transition">
                    Privacy Policy
                  </Link>
                </li>
                <li>
                  <Link href="/refund" className="text-muted-foreground hover:text-foreground transition">
                    Refund Policy
                  </Link>
                </li>
              </ul>
            </div>
            <div>
              <h3 className="font-bold mb-4">Features</h3>
              <ul className="space-y-2 text-sm">
                <li>
                  <Link href="/timezones" className="text-muted-foreground hover:text-foreground transition">
                    Timezone Converter
                  </Link>
                </li>
                <li>
                  <Link href="/pomodoro" className="text-muted-foreground hover:text-foreground transition">
                    Pomodoro Timer
                  </Link>
                </li>
                <li>
                  <Link href="/timer" className="text-muted-foreground hover:text-foreground transition">
                    Timer
                  </Link>
                </li>
              </ul>
            </div>
            <div>
              <h3 className="font-bold mb-4">Support</h3>
              <ul className="space-y-2 text-sm">
                <li>
                  <a
                    href="mailto:support@timenow.sbs"
                    className="text-muted-foreground hover:text-foreground transition"
                  >
                    Contact Us
                  </a>
                </li>
              </ul>
            </div>
          </div>
          <div className="border-t border-border pt-8 text-center text-sm text-muted-foreground">
            <p>&copy; 2025 timenow.sbs. All rights reserved.</p>
            <p className="mt-2">
              App by{" "}
              <span className="font-bold bg-[#F4C430] text-black px-3 py-1 rounded-full inline-block">RajPolu</span>
            </p>
          </div>
        </div>
      </footer>
    </div>
  )
}
