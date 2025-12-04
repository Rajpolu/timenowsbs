"use client"

import type { ReactNode } from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { Clock, Zap, Calendar, Globe, Timer, Activity } from "lucide-react"

const navItems = [
  { href: "/timezones", label: "Timezones", icon: Clock },
  { href: "/pomodoro", label: "Pomodoro", icon: Zap },
  { href: "/planner", label: "Planner", icon: Calendar },
  { href: "/world-clock", label: "World Clock", icon: Globe },
  { href: "/timer", label: "Timer", icon: Timer },
  { href: "/stopwatch", label: "Stopwatch", icon: Activity },
]

export function LayoutWithNav({ children }: { children: ReactNode }) {
  const pathname = usePathname()

  return (
    <div className="flex min-h-screen flex-col bg-black text-white">
      <nav className="fixed bottom-0 left-0 right-0 sm:static border-t sm:border-b border-white/10 bg-black z-50">
        <div className="w-full flex items-center justify-center sm:justify-between px-2 sm:px-4 py-2 sm:py-3">
          <Link href="/" className="hidden sm:flex items-center gap-2 font-bold text-lg text-white flex-shrink-0">
            <span className="text-2xl">⏱</span>
            <span>timenow.sbs</span>
          </Link>

          <div className="flex gap-2 justify-center items-center flex-wrap max-w-full">
            {navItems.map((item) => {
              const Icon = item.icon
              const isActive = pathname === item.href
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={`p-2 rounded-lg flex items-center justify-center gap-2 text-xs sm:text-sm transition focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white ${
                    isActive
                      ? "bg-[#F4C430] text-black font-semibold"
                      : "hover:bg-white/10 text-white/70 hover:text-white"
                  }`}
                  title={item.label}
                >
                  <Icon className="w-5 h-5 sm:w-4 sm:h-4 flex-shrink-0" />
                  <span className="hidden sm:inline">{item.label}</span>
                </Link>
              )
            })}
          </div>
        </div>
      </nav>

      <main className="flex-1 pb-16 sm:pb-0 bg-black">{children}</main>
    </div>
  )
}
