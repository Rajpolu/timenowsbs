"use client"

import type { ReactNode } from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { Clock, Zap, Calendar, Globe, Timer, Activity } from "lucide-react"
import { useState } from "react"
import { createClient } from "@/lib/supabase/client"

const navItems = [
  { href: "/timezones", label: "Zones", icon: Clock },
  { href: "/pomodoro", label: "Focus", icon: Zap },
  { href: "/planner", label: "Plan", icon: Calendar },
  { href: "/world-clock", label: "World", icon: Globe },
  { href: "/timer", label: "Timer", icon: Timer },
  { href: "/stopwatch", label: "Stop", icon: Activity },
]

export function LayoutWithNav({ children }: { children: ReactNode }) {
  const pathname = usePathname()
  const [supabase] = useState(() => createClient())

  return (
    <div className="flex min-h-screen flex-col bg-black text-white font-sans">
      <nav className="fixed bottom-0 left-0 right-0 sm:static border-t sm:border-b border-white/5 bg-black/95 backdrop-blur-2xl z-50">
        <div className="max-w-7xl mx-auto px-2 sm:px-4 flex items-center justify-center h-14 sm:h-20 leading-4">
          <div className="hidden sm:flex items-center gap-4 flex-1">
            <Link
              href="/"
              className="flex items-center gap-3 font-black text-xl text-white group italic tracking-tighter"
            >
              <span className="drop-shadow-[0_0_10px_rgba(244,196,48,0.5)] text-4xl">⏱</span>
              <div className="flex items-center gap-2">
                <span className="hidden xs:inline uppercase tracking-tighter">timenow.sbs</span>
                <span className="relative inline-flex items-center px-2 py-0.5 rounded text-[10px] font-black bg-[#F4C430] text-black overflow-hidden ring-2 ring-[#F4C430]/20">
                  BETA
                  <span className="absolute inset-0 w-full h-full bg-gradient-to-r from-transparent via-white/40 to-transparent -translate-x-full animate-[shimmer_2s_infinite]"></span>
                </span>
              </div>
            </Link>
          </div>

          <div className="flex items-center gap-2 sm:gap-1.5 justify-center flex-1 sm:flex-none px-1 sm:px-0 overflow-x-auto">
            {navItems.map((item) => {
              const Icon = item.icon
              const isActive = pathname === item.href
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={`flex justify-center sm:w-11 sm:h-11 sm:rounded-xl transition-all duration-300 h-10 w-10 items-center font-normal leading-3 py-4 flex-shrink-0 rounded-md my-0.5 mx-0.5 ${
                    isActive
                      ? "bg-[#F4C430] text-black scale-105 shadow-[0_0_15px_rgba(244,196,48,0.15)]"
                      : "text-white/20 hover:text-[#F4C430] hover:bg-white/5"
                  }`}
                  aria-label={item.label}
                >
                  <Icon className="h-5 sm:w-5 sm:h-5 font-bold w-5 text-foreground" />
                </Link>
              )
            })}
          </div>

          <div className="hidden sm:flex items-center gap-4 flex-1 justify-end">
            <Link
              href="/pricing"
              className="px-5 py-2.5 bg-zinc-900 border border-white/5 rounded-xl text-[10px] font-black uppercase italic tracking-[0.15em] text-[#F4C430] hover:bg-zinc-800 transition shadow-xl shadow-[#F4C430]/5 flex items-center gap-2 group"
            >
              <Zap className="w-3.5 h-3.5 fill-[#F4C430]" />
              Upgrade
            </Link>
          </div>
        </div>
      </nav>

      <main className="flex-1 pb-20 sm:pb-0 bg-black selection:bg-[#F4C430] selection:text-black">{children}</main>
    </div>
  )
}
