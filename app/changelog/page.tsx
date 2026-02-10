"use client"
import Link from "next/link"
import { ArrowLeft, Check, Plus, Bug, Zap, Calendar } from "lucide-react"
import { useState } from "react"

const releases = [
  {
    version: "v2.5.0",
    date: "2025-02-10",
    time: "14:30 UTC",
    category: "feature",
    title: "Blog System & Widget Customization",
    description: "Major release introducing the blog platform with social sharing, comment system, and comprehensive web app widget with customization panel.",
    features: [
      "Complete blog system with markdown support",
      "Social sharing buttons (Twitter, LinkedIn, Facebook, WhatsApp)",
      "Nested comment system with moderation",
      "Web app widget with desktop dragging and mobile fullscreen",
      "Widget customization panel with theme selection",
      "Dark/Light theme support for widget",
      "State persistence across browser tabs",
    ],
  },
  {
    version: "v2.4.1",
    date: "2025-02-05",
    time: "10:15 UTC",
    category: "bugfix",
    title: "Fixed Multiple Favicon Variants",
    description: "Resolved favicon display issues and added high-resolution icon variants for all devices.",
    features: [
      "Added 512x512px, 256x256px, and 192x192px favicon variants",
      "Improved iOS home screen icon support",
      "Fixed Android PWA icon resolution",
      "Enhanced browser tab display",
    ],
  },
  {
    version: "v2.4.0",
    date: "2025-02-01",
    time: "09:00 UTC",
    category: "feature",
    title: "Enhanced Landing Page Navigation",
    description: "Comprehensive navigation improvements with integrated pricing, GitHub integration, and theme toggle.",
    features: [
      "New navigation menu with Features, Pricing, Blog, and Changelog links",
      "GitHub star button with direct repository link",
      "Theme toggle for Light/Dark mode in navbar",
      "Integrated pricing section directly on landing page",
      "Removed separate pricing page redirect",
      "Responsive mobile navigation",
    ],
  },
  {
    version: "v2.3.0",
    date: "2025-01-28",
    time: "11:45 UTC",
    category: "feature",
    title: "Daily Planner & Premium Features",
    description: "Added advanced task planning capabilities and premium subscription tier.",
    features: [
      "Advanced Daily Planner with recurring tasks",
      "Priority-based task management",
      "Session analytics dashboard",
      "Premium subscription tier with enhanced features",
      "Personal stats dashboard for premium users",
    ],
  },
  {
    version: "v2.2.5",
    date: "2025-01-20",
    time: "16:30 UTC",
    category: "improvement",
    title: "Performance Optimization",
    description: "Optimized bundle size and improved initial load performance across all devices.",
    features: [
      "Reduced JavaScript bundle by 35%",
      "Improved Time to First Paint (TTFP)",
      "Optimized image assets for mobile",
      "Implemented lazy loading for components",
      "Enhanced Core Web Vitals scores",
    ],
  },
  {
    version: "v2.2.0",
    date: "2025-01-15",
    time: "08:20 UTC",
    category: "feature",
    title: "Timezone Converter Enhancements",
    description: "Expanded timezone support and improved converter accuracy.",
    features: [
      "Support for 500+ timezones worldwide",
      "Daylight Saving Time (DST) awareness",
      "Timezone abbreviation display",
      "Multi-timezone comparison view",
      "Quick timezone search",
    ],
  },
  {
    version: "v2.1.0",
    date: "2025-01-10",
    time: "13:00 UTC",
    category: "feature",
    title: "Pomodoro Technique Integration",
    description: "Complete Pomodoro timer with customizable work/break intervals.",
    features: [
      "Customizable work and break intervals",
      "Audio notifications for session transitions",
      "Session history tracking",
      "Statistics overview",
      "Preset configurations (Standard, Aggressive, Relaxed)",
    ],
  },
  {
    version: "v2.0.0",
    date: "2025-01-01",
    time: "00:00 UTC",
    category: "feature",
    title: "Major Redesign & Public Beta Launch",
    description: "Complete redesign with new UI framework, dark mode support, and public beta launch.",
    features: [
      "Complete UI redesign with modern aesthetics",
      "Full dark mode and light mode support",
      "Responsive design for all device sizes",
      "New tool suite: Timer, Stopwatch, World Clock",
      "User authentication system",
      "Public beta launch",
    ],
  },
]

const categoryConfig = {
  feature: { icon: Plus, color: "#F4C430", label: "Feature" },
  bugfix: { icon: Bug, color: "#EF4444", label: "Bug Fix" },
  improvement: { icon: Zap, color: "#06B6D4", label: "Improvement" },
}

export default function Changelog() {
  const [mounted, setMounted] = useState(false)

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="sticky top-0 z-50 bg-background/95 backdrop-blur border-b border-border">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-2 hover:opacity-80 transition" role="banner">
            <img src="/logo.png" alt="timenow.sbs logo" className="w-9 h-9" />
            <span className="text-sm font-bold text-white/90">timenow.sbs</span>
          </Link>
          <Link
            href="/"
            className="flex items-center gap-2 text-white/70 hover:text-[#F4C430] transition text-sm"
          >
            <ArrowLeft className="w-4 h-4" />
            <span className="hidden sm:inline">Back to Home</span>
          </Link>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-24">
        {/* Title */}
        <div className="mb-16">
          <h1 className="text-4xl sm:text-5xl font-bold mb-4">Changelog</h1>
          <p className="text-muted-foreground text-lg max-w-2xl">
            Stay updated with all the latest features, improvements, and bug fixes. We're constantly evolving timenow.sbs to serve you better.
          </p>
        </div>

        {/* Releases Timeline */}
        <div className="space-y-8">
          {releases.map((release, index) => {
            const config = categoryConfig[release.category as keyof typeof categoryConfig]
            const IconComponent = config.icon

            return (
              <div
                key={release.version}
                className="relative border-l-2 border-[#F4C430]/20 pl-8 pb-8"
              >
                {/* Timeline dot */}
                <div
                  className="absolute -left-[17px] top-0 w-8 h-8 rounded-full bg-background border-2 border-[#F4C430] flex items-center justify-center"
                  style={{ borderColor: config.color }}
                >
                  <IconComponent className="w-4 h-4" style={{ color: config.color }} />
                </div>

                {/* Release card */}
                <div className="bg-card border border-border rounded-lg p-6 hover:border-[#F4C430]/30 transition">
                  {/* Header */}
                  <div className="flex items-start justify-between gap-4 mb-4">
                    <div>
                      <div className="flex items-center gap-3 mb-2">
                        <span className="text-2xl font-bold text-white">{release.version}</span>
                        <span
                          className="px-2 py-1 text-xs font-bold rounded text-black/90"
                          style={{ backgroundColor: config.color }}
                        >
                          {config.label}
                        </span>
                      </div>
                      <h3 className="text-xl font-bold text-white mb-1">{release.title}</h3>
                      <p className="text-muted-foreground text-sm">{release.description}</p>
                    </div>
                  </div>

                  {/* Date and time */}
                  <div className="flex items-center gap-2 text-white/50 text-sm mb-4">
                    <Calendar className="w-4 h-4" />
                    <time dateTime={`${release.date}T${release.time}`}>
                      {new Date(release.date).toLocaleDateString("en-US", {
                        year: "numeric",
                        month: "long",
                        day: "numeric",
                      })}{" "}
                      at {release.time}
                    </time>
                  </div>

                  {/* Features list */}
                  <div className="space-y-2">
                    {release.features.map((feature, i) => (
                      <div key={i} className="flex items-start gap-3">
                        <Check className="w-4 h-4 text-[#F4C430] flex-shrink-0 mt-0.5" />
                        <span className="text-sm text-white/80">{feature}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            )
          })}
        </div>

        {/* Footer note */}
        <div className="mt-16 p-6 bg-white/5 border border-white/10 rounded-lg text-center">
          <p className="text-white/60 text-sm">
            For more details or to report issues, visit our{" "}
            <a
              href="https://github.com/rajpolu/timenow-sbs"
              target="_blank"
              rel="noopener noreferrer"
              className="text-[#F4C430] hover:underline"
            >
              GitHub repository
            </a>
          </p>
        </div>
      </main>
    </div>
  )
}
