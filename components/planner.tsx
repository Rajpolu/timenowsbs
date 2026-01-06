"use client"

import { useState, useEffect } from "react"
import { Plus, Trash2, CheckCircle, Circle, Lock, Sparkles } from "lucide-react"
import { LayoutWithNav } from "@/app/layout-with-nav"
import { AuthModal } from "@/components/auth-modal" // Added AuthModal to planner
import Link from "next/link"

interface Task {
  id: string
  title: string
  completed: boolean
  date: string
  priority?: "low" | "medium" | "high"
}

export default function PlannerComponent() {
  const [tasks, setTasks] = useState<Task[]>([])
  const [input, setInput] = useState("")
  const [selectedDate, setSelectedDate] = useState(new Date().toISOString().split("T")[0])
  const [selectedPriority, setSelectedPriority] = useState<"low" | "medium" | "high">("medium")
  const [showAuthModal, setShowAuthModal] = useState(false) // Control auth modal
  const [isPremium, setIsPremium] = useState(false)

  useEffect(() => {
    const userEmail = localStorage.getItem("userEmail")
    const isSubscriber = localStorage.getItem("isPro") === "true"
    if (userEmail && isSubscriber) {
      setIsPremium(true)
    }
  }, [])

  const todaysTasks = tasks.filter((t) => t.date === selectedDate)
  const dailyTaskLimit = 5

  const handleAddTask = () => {
    if (input.trim()) {
      if (!isPremium && todaysTasks.length >= dailyTaskLimit) {
        setShowAuthModal(true)
        return
      }

      setTasks([
        ...tasks,
        {
          id: Date.now().toString(),
          title: input,
          completed: false,
          date: selectedDate,
          priority: selectedPriority,
        },
      ])
      setInput("")
    }
  }

  const handleToggleTask = (id: string) => {
    setTasks(tasks.map((task) => (task.id === id ? { ...task, completed: !task.completed } : task)))
  }

  const handleDeleteTask = (id: string) => {
    setTasks(tasks.filter((task) => task.id !== id))
  }

  const tasksByDate = tasks.reduce(
    (acc, task) => {
      if (!acc[task.date]) acc[task.date] = []
      acc[task.date].push(task)
      return acc
    },
    {} as Record<string, Task[]>,
  )

  const dates = Object.keys(tasksByDate).sort()

  const getPriorityColor = (priority?: string) => {
    switch (priority) {
      case "high":
        return "border-red-500/50 bg-red-500/5"
      case "medium":
        return "border-[#F4C430]/50 bg-[#F4C430]/5"
      case "low":
        return "border-green-500/50 bg-green-500/5"
      default:
        return "border-white/10"
    }
  }

  const getPriorityLabel = (priority?: string) => {
    switch (priority) {
      case "high":
        return "High Priority"
      case "medium":
        return "Medium Priority"
      case "low":
        return "Low Priority"
      default:
        return ""
    }
  }

  return (
    <LayoutWithNav>
      <div className="max-w-4xl mx-auto px-4 py-12 pb-32 sm:pb-12 bg-black">
        <AuthModal
          isOpen={showAuthModal}
          onClose={() => setShowAuthModal(false)}
          onSubmit={(email) => {
            localStorage.setItem("userEmail", email)
            // Redirect to pricing after initial email capture
            window.location.href = "/pricing"
          }}
        />

        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between mb-12 gap-6">
          <div>
            <h1 className="sm:text-6xl font-black mb-3 text-white uppercase tracking-tighter italic text-4xl">
              Daily Planner
            </h1>
            <div className="flex items-center gap-3">
              <div className="w-8 h-[2px] bg-[#F4C430]" />
              <p className="text-[#F4C430] text-xs font-black tracking-[0.3em] uppercase">Optimized Task Management</p>
            </div>
          </div>
          {!isPremium ? (
            <button
              onClick={() => setShowAuthModal(true)}
              className="bg-[#F4C430]/5 text-[#F4C430] border border-[#F4C430]/20 px-5 py-2.5 rounded-xl flex items-center gap-2 text-[10px] font-black uppercase tracking-[0.2em] hover:bg-[#F4C430]/10 transition"
            >
              <Sparkles className="w-4 h-4" />
              Upgrade to Pro
            </button>
          ) : (
            <div className="bg-[#F4C430] text-black px-5 py-2.5 rounded-xl flex items-center gap-2 text-[10px] font-black uppercase tracking-[0.2em] shadow-lg shadow-[#F4C430]/20">
              <Sparkles className="w-4 h-4" />
              Pro Unlimited
            </div>
          )}
        </div>

        {todaysTasks.length >= dailyTaskLimit && !isPremium && (
          <div className="mb-10 p-8 bg-zinc-950 border border-[#F4C430]/20 rounded-3xl relative overflow-hidden group">
            <div className="absolute top-0 right-0 w-32 h-32 bg-[#F4C430]/5 blur-3xl -mr-16 -mt-16 group-hover:bg-[#F4C430]/10 transition-colors" />
            <div className="flex flex-col sm:flex-row items-center gap-8 relative z-10">
              <div className="flex-shrink-0 w-16 h-16 bg-[#F4C430]/10 rounded-2xl flex items-center justify-center border border-[#F4C430]/20">
                <Lock className="w-8 h-8 text-[#F4C430]" />
              </div>
              <div className="flex-1 text-center sm:text-left">
                <h3 className="text-xl font-black text-white uppercase italic tracking-tight mb-2">Limit Reached</h3>
                <p className="text-white/50 text-sm leading-relaxed max-w-md">
                  Free users are limited to 5 tasks per day. Unlock{" "}
                  <span className="text-white font-bold">Unlimited Tasks</span>,{" "}
                  <span className="text-white font-bold">Analytics</span>, and{" "}
                  <span className="text-white font-bold">Custom Intervals</span> now.
                </p>
              </div>
              <Link
                href="/pricing"
                className="w-full sm:w-auto px-10 py-4 bg-[#F4C430] text-black rounded-2xl font-black uppercase tracking-widest hover:bg-[#E0B420] transition shadow-2xl shadow-[#F4C430]/20 hover:scale-[1.02] active:scale-[0.98]"
              >
                Go Pro
              </Link>
            </div>
          </div>
        )}

        <div className="bg-zinc-900 border-2 border-white/5 rounded-2xl p-6 mb-8 shadow-2xl">
          <h2 className="text-xl font-black mb-4 text-white uppercase tracking-tight">Add New Task</h2>
          <div className="flex flex-col gap-3 mb-4">
            <input
              type="date"
              value={selectedDate}
              onChange={(e) => setSelectedDate(e.target.value)}
              className="px-3 py-2 bg-zinc-800 border-2 border-white/10 rounded-lg text-white text-sm focus:border-[#F4C430] focus:outline-none flex-1"
            />
            <input
              type="text"
              placeholder="What do you need to do?"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyPress={(e) => e.key === "Enter" && handleAddTask()}
              className="flex-1 px-3 py-2 bg-zinc-800 border-2 border-white/10 rounded-lg text-white placeholder-white/40 text-sm focus:border-[#F4C430] focus:outline-none"
            />
          </div>
          <div className="flex gap-2 flex-wrap items-center mt-4">
            <select
              value={selectedPriority}
              onChange={(e) => setSelectedPriority(e.target.value as "low" | "medium" | "high")}
              className="px-3 py-2 bg-zinc-800 border-2 border-white/10 rounded-lg text-white text-sm font-bold focus:border-[#F4C430] focus:outline-none"
            >
              <option value="low">Low Priority</option>
              <option value="medium">Medium Priority</option>
              <option value="high">High Priority</option>
            </select>
            <button
              onClick={handleAddTask}
              className="flex-1 sm:flex-none px-6 py-2 bg-[#F4C430] text-black rounded-lg font-black hover:bg-[#E0B420] transition flex items-center justify-center gap-2 group shadow-lg shadow-[#F4C430]/10 uppercase tracking-tight"
            >
              <Plus className="w-5 h-5" />
              <span>Add Task</span>
            </button>
          </div>
        </div>

        {dates.length === 0 ? (
          <div className="text-center py-12 text-white/60">
            <p className="text-sm">No tasks yet. Add one to get started!</p>
          </div>
        ) : (
          <div className="space-y-4 sm:space-y-6">
            {dates.map((date) => {
              const dateObj = new Date(date + "T00:00:00")
              const dayName = dateObj.toLocaleDateString("en-US", {
                weekday: "long",
                month: "short",
                day: "numeric",
              })
              const dateTasks = tasksByDate[date]
              const completedCount = dateTasks.filter((t) => t.completed).length

              return (
                <div key={date} className="bg-zinc-900 border-2 border-white/10 rounded-xl overflow-hidden">
                  <div className="p-3 sm:p-4 bg-white/5 border-b border-white/10">
                    <h3 className="font-semibold text-sm sm:text-base text-white">
                      {dayName}
                      <span className="text-xs sm:text-sm text-white/60 ml-2">
                        ({completedCount}/{dateTasks.length} completed)
                      </span>
                    </h3>
                  </div>
                  <div className="divide-y divide-white/10">
                    {dateTasks.map((task) => (
                      <div
                        key={task.id}
                        className={`p-3 sm:p-4 flex items-center gap-3 hover:bg-white/2 transition border-l-4 ${getPriorityColor(task.priority)}`}
                      >
                        <button onClick={() => handleToggleTask(task.id)} className="flex-shrink-0">
                          {task.completed ? (
                            <CheckCircle className="w-5 h-5 sm:w-6 sm:h-6 text-[#F4C430]" />
                          ) : (
                            <Circle className="w-5 h-5 sm:w-6 sm:h-6 text-white/30 hover:text-white/60 transition" />
                          )}
                        </button>
                        <div className="flex-1 min-w-0">
                          <span
                            className={`text-sm sm:text-base block ${
                              task.completed ? "line-through text-white/40" : "text-white"
                            }`}
                          >
                            {task.title}
                          </span>
                          <span className="text-xs text-white/50">{getPriorityLabel(task.priority)}</span>
                        </div>
                        <button
                          onClick={() => handleDeleteTask(task.id)}
                          className="p-2 hover:bg-red-500/10 rounded transition flex-shrink-0"
                        >
                          <Trash2 className="w-4 h-4 sm:w-5 sm:h-5 text-red-500" />
                        </button>
                      </div>
                    ))}
                  </div>
                </div>
              )
            })}
          </div>
        )}
      </div>
    </LayoutWithNav>
  )
}
