"use client"
import Link from "next/link"
import {
  Clock,
  Zap,
  Calendar,
  Globe,
  Timer,
  Activity,
  ChevronRight,
  Laptop,
  Code,
  Briefcase,
  Plane,
  Twitter,
  Instagram,
  Facebook,
  LayoutDashboard,
  ShieldCheck,
} from "lucide-react"
import { useState, useEffect } from "react"
import { AuthModal } from "@/components/auth-modal"
import { FeedbackButton } from "@/components/feedback-button"

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
  const [userEmail, setUserEmail] = useState<string | null>(null)
  const [isPremium, setIsPremium] = useState(false)
  const [authModalOpen, setAuthModalOpen] = useState(false)

  useEffect(() => {
    setMounted(true)
    const savedEmail = localStorage.getItem("userEmail")
    if (savedEmail) {
      setUserEmail(savedEmail)
      const premiumUsers = localStorage.getItem("premiumUsers")
      if (premiumUsers?.includes(savedEmail)) {
        setIsPremium(true)
      }
    }
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
    <div className="min-h-screen bg-black text-white font-sans selection:bg-[#F4C430] selection:text-black">
      <AuthModal isOpen={authModalOpen} onClose={() => setAuthModalOpen(false)} onSubmit={handleAuthSubmit} />

      <header className="sticky top-0 z-50 bg-background/95 backdrop-blur border-b border-border">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
          <div className="flex items-center gap-2" role="banner">
            <div className="text-primary font-semibold text-xl">{""} </div>
            <div className="flex items-center gap-2">
              <span className="text-xl font-bold hidden sm:inline">timenow.sbs</span>
              <span className="relative inline-flex items-center px-2 py-0.5 rounded text-[10px] font-bold text-black overflow-hidden bg-yellow-400">
                BETA
                <span className="absolute inset-0 w-full h-full bg-gradient-to-r from-transparent via-white/50 to-transparent -translate-x-full animate-[shimmer_2s_infinite]"></span>
              </span>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <Link
              href="/pricing"
              className="px-4 py-2 rounded-lg bg-primary text-black font-bold hover:bg-[#E0B420] transition text-sm shadow-lg shadow-primary/20"
              aria-label="Upgrade to Pro"
            >
              Upgrade
            </Link>
          </div>
        </div>
      </header>

      <div className="flex justify-center py-4 px-4">
        <div className="inline-flex items-center gap-2 py-2 bg-zinc-950 border border-white/5 rounded-2xl shadow-xl px-3.5">
          <div className="bg-[#F4C430] text-black text-[9px] font-black px-2 py-0.5 rounded-md uppercase italic leading-none animate-pulse">
            {"SALE "}
          </div>
          <span className="text-[10px] font-black uppercase tracking-widest text-white/80">
            SAVE <span className="text-[#F4C430]">20%</span> ON ANNUAL PLANS
          </span>
        </div>
      </div>

      {/* Hero Section */}
      <section className="relative px-4 sm:px-6 lg:px-8 py-20 sm:py-32 overflow-hidden">
        <div className="max-w-5xl mx-auto text-center relative z-10">
          <div className="mb-8 inline-block animate-fade-in">
            <span className="bg-[#F4C430]/10 text-[#F4C430] border border-[#F4C430]/20 px-5 py-2 rounded-full text-xs font-black tracking-[0.2em] uppercase">
              No Sign up required
            </span>
          </div>
          <h1 className="text-5xl sm:text-7xl md:text-8xl font-black mb-8 leading-[0.9] tracking-tighter text-white">
            MASTER YOUR <span className="text-[#F4C430]">FLOW.</span>
          </h1>
          <p className="text-xl sm:text-2xl text-white/50 mb-12 text-pretty max-w-3xl mx-auto font-medium">
            The ultimate time toolkit for <span className="text-white">Developers</span>,{" "}
            <span className="text-white">Freelancers</span>, and <span className="text-white">Digital Nomads</span>.
            Stop managing time. Start owning it.
          </p>
          <div className="flex flex-col sm:flex-row gap-5 justify-center">
            <Link
              href="/timezones"
              className="px-10 py-4 bg-[#F4C430] text-black rounded-xl font-black text-lg hover:scale-105 transition-all shadow-[0_0_40px_rgba(244,196,48,0.2)] flex items-center justify-center gap-3 uppercase tracking-tighter italic"
            >
              START FOR FREE <ChevronRight className="w-5 h-5" />
            </Link>
            {isPremium ? (
              <Link
                href="/dashboard"
                className="px-10 py-4 bg-zinc-900 border border-[#F4C430]/20 text-white rounded-xl font-bold text-lg hover:bg-zinc-800 transition flex items-center justify-center gap-3"
              >
                <LayoutDashboard className="w-5 h-5 text-[#F4C430]" /> View Dashboard
              </Link>
            ) : (
              <Link
                href="/pricing"
                className="px-10 py-4 bg-zinc-900 border border-white/10 text-white rounded-xl font-black text-lg hover:bg-zinc-800 transition flex items-center justify-center gap-3 group uppercase italic tracking-tighter"
              >
                <ShieldCheck className="w-5 h-5 text-[#F4C430] group-hover:scale-110 transition" />
                See Plans
              </Link>
            )}
          </div>
        </div>
        {/* Background Decorative Elements */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-[#F4C430]/5 rounded-full blur-[120px] -z-10"></div>
      </section>

      <section className="py-24 border-y border-white/5 bg-zinc-950/50">
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-12">
            {[
              { icon: Code, label: "Programmers", desc: "Deep work timers designed for complex coding sprints." },
              { icon: Briefcase, label: "Freelancers", desc: "Track billable time and manage multi-client deadlines." },
              { icon: Plane, label: "Travellers", desc: "Zero-latency world clocks for the global nomad." },
              { icon: Laptop, label: "Creators", desc: "Distraction-free planning for high-output creators." },
            ].map((item, i) => (
              <div key={i} className="group text-center">
                <div className="mb-6 inline-flex p-4 bg-white/5 rounded-2xl group-hover:bg-[#F4C430]/10 group-hover:scale-110 transition-all duration-500">
                  <item.icon className="w-8 h-8 text-white/40 group-hover:text-[#F4C430]" />
                </div>
                <h3 className="text-lg font-bold mb-2">{item.label}</h3>
                <p className="text-sm text-white/40 leading-relaxed">{item.desc}</p>
              </div>
            ))}
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

      {/* Feedback Button */}
      <FeedbackButton />

      <footer className="border-t border-white/5 mt-32 bg-black pb-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <div className="flex flex-col md:flex-row justify-between items-start gap-12">
            <div className="max-w-xs">
              <div className="flex items-center gap-2 mb-6">
                <div className="text-2xl font-bold text-[#F4C430]">⏱</div>
                <span className="text-xl font-bold text-white">timenow.sbs</span>
              </div>
              <p className="text-white/40 text-sm leading-relaxed mb-8">
                The world's most minimal and effective time management toolkit for high-performers.
              </p>
              <div className="flex gap-4">
                <Link
                  href="https://twitter.com/timenow"
                  className="p-2 bg-white/5 rounded-lg hover:text-[#F4C430] transition"
                >
                  <Twitter className="w-5 h-5" />
                </Link>
                <Link
                  href="https://instagram.com/timenow"
                  className="p-2 bg-white/5 rounded-lg hover:text-[#F4C430] transition"
                >
                  <Instagram className="w-5 h-5" />
                </Link>
                <Link
                  href="https://facebook.com/timenow"
                  className="p-2 bg-white/5 rounded-lg hover:text-[#F4C430] transition"
                >
                  <Facebook className="w-5 h-5" />
                </Link>
              </div>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-3 gap-16">
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
          </div>

          <div className="mt-20 pt-8 border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-6">
            <p className="text-white/20 text-xs tracking-widest uppercase">
              &copy; 2026 timenow.sbs — Built for the future of work.
            </p>
            <div className="flex items-center gap-2">
              <span className="text-white/20 text-[9px] uppercase tracking-[0.3em]">App by</span>
              <span className="bg-[#F4C430] text-black text-[10px] font-black px-3 py-1 rounded-full shadow-lg shadow-[#F4C430]/10 hover:scale-105 transition cursor-default">
                RajPolu
              </span>
            </div>
          </div>
        </div>
      </footer>
    </div>
  )
}
