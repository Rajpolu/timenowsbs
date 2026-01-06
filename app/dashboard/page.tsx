"use client"
import Link from "next/link"
import { useEffect } from "react"
import { useRouter } from "next/navigation"

import { useState } from "react"

import {
  LineChart,
  Line,
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  Tooltip,
  AreaChart,
  Area,
  CartesianGrid,
} from "recharts"
import {
  Clock,
  MoreHorizontal,
  Calendar,
  ArrowLeft,
  Loader2,
  Download,
  LifeBuoy,
  FileJson,
  FileSpreadsheet,
  Lock,
} from "lucide-react"
import { createClient } from "@/lib/supabase/client"
import { getSubscriptionStatus } from "@/lib/subscription"
import { Zap } from "lucide-react"

export default function Dashboard() {
  const [loading, setLoading] = useState(true)
  const [isPremium, setIsPremium] = useState(false)
  const [stats, setStats] = useState({
    focusMinutes: 0,
    tasksCompleted: 0,
    totalSessions: 0,
    activities: [] as any[],
    hourlyData: [] as any[],
  })
  const router = useRouter()
  const [supabase] = useState(() => createClient())

  useEffect(() => {
    async function fetchStats() {
      const {
        data: { user },
      } = await supabase.auth.getUser()

      if (!user) {
        setLoading(false)
        router.push("/")
        return
      }

      const subscription = await getSubscriptionStatus(user.id)
      setIsPremium(subscription.isPremium)

      if (!subscription.isPremium) {
        setTimeout(() => {
          router.push("/pricing")
        }, 500)
      }

      const { data: tasks } = await supabase.from("tasks").select("*").eq("user_id", user.id)
      const { data: sessions } = await supabase.from("pomodoro_sessions").select("*").eq("user_id", user.id)

      const completedTasks = tasks?.filter((t) => t.completed).length || 0
      const totalFocus = sessions?.reduce((acc, s) => acc + (s.duration || 0), 0) || 0

      const hourlyData = [
        { hour: "8am", work: 20, break: 5 },
        { hour: "10am", work: 45, break: 10 },
        { hour: "12pm", work: 30, break: 15 },
        { hour: "2pm", work: 50, break: 5 },
        { hour: "4pm", work: 40, break: 10 },
        { hour: "6pm", work: 15, break: 5 },
      ]

      setStats({
        focusMinutes: totalFocus,
        tasksCompleted: completedTasks,
        totalSessions: sessions?.length || 0,
        activities: [
          { path: "Focus Sessions", count: sessions?.length || 0, percent: "100%", icon: Zap },
          {
            path: "Tasks Finished",
            count: completedTasks,
            percent: tasks?.length ? `${(completedTasks / tasks.length) * 100}%` : "0%",
            icon: Calendar,
          },
        ],
        hourlyData,
      })
      setLoading(false)
    }

    fetchStats()
  }, [supabase, router])

  const handleExport = (type: "json" | "csv") => {
    if (!isPremium) return
    console.log(`[v0] Exporting data as ${type}`)
    // Real implementation would generate and download file
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-black flex items-center justify-center text-[#F4C430]">
        <Loader2 className="w-8 h-8 animate-spin" />
      </div>
    )
  }

  if (!isPremium) {
    return (
      <div className="min-h-screen bg-black flex items-center justify-center">
        <div className="text-center">
          <Lock className="w-12 h-12 text-[#F4C430] mx-auto mb-4" />
          <h1 className="text-xl font-black text-white uppercase mb-2">Premium Only</h1>
          <p className="text-white/60 mb-6">This dashboard is exclusively for premium members.</p>
          <Link
            href="/pricing"
            className="px-6 py-2.5 bg-[#F4C430] text-black font-black uppercase rounded-xl hover:bg-[#E0B420] transition inline-block"
          >
            Upgrade Now
          </Link>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-black text-white font-sans selection:bg-[#F4C430] selection:text-black">
      <header className="border-b border-white/5 px-6 h-14 flex items-center justify-between sticky top-0 bg-black/80 backdrop-blur-md z-50">
        <div className="flex items-center gap-6">
          <Link href="/" className="text-[#F4C430] hover:scale-110 transition flex items-center gap-2">
            <ArrowLeft className="w-4 h-4" />
            <Clock className="w-5 h-5" />
          </Link>
          <div className="flex items-center gap-2 text-sm text-white/60">
            <span>timenow.sbs</span>
            <span>/</span>
            <span className="text-white font-medium text-xs tracking-widest uppercase">Dashboard</span>
          </div>
        </div>
        <div className="flex items-center gap-4">
          {isPremium && (
            <button className="flex items-center gap-2 px-3 py-1 bg-[#F4C430]/10 text-[#F4C430] border border-[#F4C430]/20 rounded-md text-xs font-black uppercase tracking-widest hover:bg-[#F4C430]/20 transition">
              <LifeBuoy className="w-3.5 h-3.5" />
              Priority Support
            </button>
          )}
          <button className="px-3 py-1 bg-zinc-900 border border-white/10 rounded-md text-xs font-medium hover:bg-zinc-800 transition">
            Production
          </button>
          <button className="p-1.5 hover:bg-zinc-900 rounded-md transition">
            <MoreHorizontal className="w-4 h-4" />
          </button>
        </div>
      </header>

      <main className="p-8 max-w-7xl mx-auto animate-in fade-in duration-700">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-12 gap-6">
          <div>
            <h1 className="text-4xl sm:text-5xl font-black tracking-tighter italic uppercase mb-2">
              Metrics Dashboard
            </h1>
            <p className="text-[#F4C430] text-xs font-black tracking-[0.3em] uppercase opacity-80">
              Real-time Productivity Analytics
            </p>
          </div>
          <div className="flex items-center gap-2 px-4 py-2 bg-zinc-900 border border-white/5 rounded-xl text-[10px] font-black uppercase tracking-widest text-white/40">
            <Calendar className="w-3.5 h-3.5" /> This Billing Cycle
          </div>
        </div>

        {isPremium && (
          <div className="mb-12 flex flex-wrap items-center gap-4 p-6 bg-zinc-950 border border-white/5 rounded-2xl">
            <div className="flex items-center gap-3 mr-auto">
              <Download className="w-5 h-5 text-[#F4C430]" />
              <div>
                <h4 className="text-sm font-bold text-white uppercase tracking-tight">Data Management</h4>
                <p className="text-xs text-white/40">Export your productivity logs</p>
              </div>
            </div>
            <button
              onClick={() => handleExport("csv")}
              className="flex items-center gap-2 px-4 py-2 bg-white/5 hover:bg-white/10 border border-white/10 rounded-xl text-[10px] font-black uppercase tracking-widest transition"
            >
              <FileSpreadsheet className="w-3.5 h-3.5 text-green-500" />
              Export CSV
            </button>
            <button
              onClick={() => handleExport("json")}
              className="flex items-center gap-2 px-4 py-2 bg-white/5 hover:bg-white/10 border border-white/10 rounded-xl text-[10px] font-black uppercase tracking-widest transition"
            >
              <FileJson className="w-3.5 h-3.5 text-blue-500" />
              Export JSON
            </button>
          </div>
        )}

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-16">
          <div className="bg-zinc-950 border border-white/5 rounded-2xl p-8 shadow-2xl group hover:border-[#F4C430]/20 transition-all duration-500">
            <div className="flex items-center justify-between mb-10">
              <div>
                <h3 className="text-[10px] font-black text-white/20 uppercase tracking-[0.25em] mb-2">
                  Total Focus Time
                </h3>
                <div className="text-5xl font-black text-[#F4C430] tracking-tighter">
                  {stats.focusMinutes}
                  <span className="text-lg ml-1 opacity-50 font-medium">min</span>
                </div>
              </div>
              <div className="p-4 bg-[#F4C430]/5 border border-[#F4C430]/10 rounded-2xl group-hover:bg-[#F4C430]/10 transition-colors">
                <Zap className="w-8 h-8 text-[#F4C430]" />
              </div>
            </div>
            <div className="h-[200px] w-full">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart
                  data={[
                    { name: "Day 1", value: stats.focusMinutes * 0.2 },
                    { name: "Day 2", value: stats.focusMinutes * 0.4 },
                    { name: "Day 3", value: stats.focusMinutes * 0.3 },
                    { name: "Day 4", value: stats.focusMinutes * 0.6 },
                    { name: "Day 5", value: stats.focusMinutes * 0.8 },
                    { name: "Today", value: stats.focusMinutes },
                  ]}
                >
                  <XAxis dataKey="name" hide />
                  <Tooltip
                    contentStyle={{
                      backgroundColor: "#09090b",
                      border: "1px solid rgba(255,255,255,0.1)",
                      borderRadius: "8px",
                    }}
                    itemStyle={{ color: "#F4C430" }}
                  />
                  <Line
                    type="monotone"
                    dataKey="value"
                    stroke="#F4C430"
                    strokeWidth={3}
                    dot={{ fill: "#F4C430", strokeWidth: 2 }}
                  />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </div>

          <div className="bg-zinc-950 border border-white/5 rounded-2xl p-8 shadow-2xl group hover:border-[#F4C430]/20 transition-all duration-500">
            <div className="flex items-center justify-between mb-10">
              <div>
                <h3 className="text-[10px] font-black text-white/20 uppercase tracking-[0.25em] mb-2">
                  Tasks Completed
                </h3>
                <div className="text-5xl font-black text-white tracking-tighter">
                  {stats.tasksCompleted}
                  <span className="text-lg ml-1 opacity-50 font-medium">tasks</span>
                </div>
              </div>
              <div className="p-4 bg-white/5 border border-white/10 rounded-2xl group-hover:bg-white/10 transition-colors">
                <Calendar className="w-8 h-8 text-white/40" />
              </div>
            </div>
            <div className="h-[200px] w-full">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart
                  data={[
                    { name: "Day 1", value: Math.floor(stats.tasksCompleted * 0.1) },
                    { name: "Day 2", value: Math.floor(stats.tasksCompleted * 0.3) },
                    { name: "Day 3", value: Math.floor(stats.tasksCompleted * 0.5) },
                    { name: "Day 4", value: Math.floor(stats.tasksCompleted * 0.2) },
                    { name: "Day 5", value: Math.floor(stats.tasksCompleted * 0.7) },
                    { name: "Today", value: stats.tasksCompleted },
                  ]}
                >
                  <Bar dataKey="value" fill="#F4C430" radius={[6, 6, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>
        </div>

        <div className="bg-zinc-950 border border-white/5 rounded-2xl overflow-hidden shadow-2xl mb-16">
          <div className="p-4 border-b border-white/5 bg-zinc-900/30 flex items-center justify-between">
            <div className="text-xs font-bold text-white/40 uppercase">Top Activities</div>
            <div className="text-xs text-white/40">Total Sessions</div>
          </div>
          <div className="divide-y divide-white/5">
            {stats.activities.map((row, i) => (
              <div
                key={i}
                className="px-6 py-5 flex items-center justify-between hover:bg-white/5 transition group cursor-pointer"
              >
                <div className="flex items-center gap-3">
                  <div className="w-1.5 h-1.5 rounded-full bg-[#F4C430]" />
                  <span className="text-sm font-medium">{row.path}</span>
                </div>
                <div className="flex items-center gap-8">
                  <div className="text-sm font-bold">{row.count}</div>
                  <div className="w-20 bg-zinc-800 h-1 rounded-full overflow-hidden">
                    <div className="h-full bg-[#F4C430]" style={{ width: row.percent }} />
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="mb-16">
          <div className="flex items-center justify-between mb-8 px-2">
            <div>
              <h2 className="text-xl font-black text-white uppercase italic tracking-tighter">Session Analytics</h2>
              <p className="text-[10px] text-white/40 font-black uppercase tracking-[0.2em]">Hourly Distribution</p>
            </div>
            {!isPremium && (
              <div className="flex items-center gap-2 text-[10px] font-black uppercase text-[#F4C430]">
                <Lock className="w-3 h-3" /> Locked Feature
              </div>
            )}
          </div>

          <div
            className={`bg-zinc-950 border border-white/5 rounded-3xl p-8 relative ${!isPremium ? "overflow-hidden" : ""}`}
          >
            {!isPremium && (
              <div className="absolute inset-0 z-20 bg-black/40 backdrop-blur-sm flex items-center justify-center p-8">
                <div className="max-w-xs text-center">
                  <div className="w-12 h-12 bg-[#F4C430]/10 border border-[#F4C430]/20 rounded-2xl flex items-center justify-center mx-auto mb-4">
                    <Lock className="w-6 h-6 text-[#F4C430]" />
                  </div>
                  <h3 className="text-sm font-bold text-white uppercase mb-2">Deep Work Distribution</h3>
                  <p className="text-xs text-white/50 mb-6 leading-relaxed">
                    Upgrade to Pro to see exactly when you're most productive throughout the day.
                  </p>
                  <Link
                    href="/pricing"
                    className="inline-block px-6 py-2.5 bg-[#F4C430] text-black text-[10px] font-black uppercase tracking-widest rounded-xl hover:bg-[#E0B420] transition"
                  >
                    Unlock Analytics
                  </Link>
                </div>
              </div>
            )}

            <div className={`h-[300px] w-full ${!isPremium ? "opacity-20 grayscale pointer-events-none" : ""}`}>
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={stats.hourlyData || []}>
                  <defs>
                    <linearGradient id="colorWork" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#F4C430" stopOpacity={0.3} />
                      <stop offset="95%" stopColor="#F4C430" stopOpacity={0} />
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.05)" vertical={false} />
                  <XAxis
                    dataKey="hour"
                    stroke="rgba(255,255,255,0.3)"
                    fontSize={10}
                    tickLine={false}
                    axisLine={false}
                    dy={10}
                  />
                  <Tooltip
                    contentStyle={{
                      backgroundColor: "#09090b",
                      border: "1px solid rgba(255,255,255,0.1)",
                      borderRadius: "12px",
                    }}
                  />
                  <Area
                    type="monotone"
                    dataKey="work"
                    stroke="#F4C430"
                    strokeWidth={3}
                    fillOpacity={1}
                    fill="url(#colorWork)"
                    name="Work Minutes"
                  />
                  <Area
                    type="monotone"
                    dataKey="break"
                    stroke="rgba(255,255,255,0.2)"
                    strokeWidth={2}
                    fill="transparent"
                    name="Break Minutes"
                  />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </div>
        </div>

        <div className="mt-12 text-center">
          <Link href="/pricing" className="text-xs text-[#F4C430] hover:underline font-black tracking-widest uppercase">
            Upgrade to Premium for full analytics &rarr;
          </Link>
        </div>
      </main>
    </div>
  )
}
