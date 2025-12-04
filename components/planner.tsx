"use client"

import { useState, useEffect } from "react"
import { Plus, Trash2, CheckCircle, Circle, Lock } from "lucide-react"
import { LayoutWithNav } from "@/app/layout-with-nav"

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
  const [showUpgradePrompt, setShowUpgradePrompt] = useState(false)
  const [isPremium, setIsPremium] = useState(false)

  useEffect(() => {
    const userEmail = localStorage.getItem("userEmail")
    const premiumUsers = localStorage.getItem("premiumUsers")
    if (userEmail && premiumUsers?.includes(userEmail)) {
      setIsPremium(true)
    }
  }, [])

  const todaysTasks = tasks.filter((t) => t.date === selectedDate)
  const dailyTaskLimit = 5

  const handleAddTask = () => {
    if (input.trim()) {
      if (!isPremium && todaysTasks.length >= dailyTaskLimit) {
        setShowUpgradePrompt(true)
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
        return "🔴 High"
      case "medium":
        return "🟡 Medium"
      case "low":
        return "🟢 Low"
      default:
        return ""
    }
  }

  return (
    <LayoutWithNav>
      <div className="max-w-4xl mx-auto px-3 sm:px-4 py-6 sm:py-8 pb-24 sm:pb-8 bg-black">
        <h1 className="text-3xl sm:text-4xl font-bold mb-2 text-white">Daily Planner</h1>
        <p className="text-white/60 mb-6 sm:mb-8 text-sm sm:text-base">Plan your days and stay organized</p>

        {showUpgradePrompt && (
          <div className="mb-6 p-4 bg-[#F4C430]/10 border border-[#F4C430]/30 rounded-lg flex items-start gap-3">
            <Lock className="w-5 h-5 text-[#F4C430] flex-shrink-0 mt-0.5" />
            <div className="flex-1">
              <p className="font-semibold text-white mb-1">Upgrade to add more tasks</p>
              <p className="text-sm text-white/70 mb-3">Free plan limited to 5 tasks per day. Upgrade for unlimited.</p>
              <a
                href="/pricing"
                className="inline-block px-4 py-2 bg-[#F4C430] text-black rounded-lg font-semibold hover:bg-[#E0B420] transition text-sm"
              >
                Upgrade Now
              </a>
            </div>
          </div>
        )}

        <div className="bg-zinc-900 border-2 border-white/10 rounded-xl p-4 sm:p-6 mb-6 sm:mb-8">
          <h2 className="text-lg sm:text-xl font-semibold mb-4 text-white">Add New Task</h2>
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
          <div className="flex gap-2 flex-wrap items-center">
            <select
              value={selectedPriority}
              onChange={(e) => setSelectedPriority(e.target.value as "low" | "medium" | "high")}
              className="px-3 py-2 bg-zinc-800 border-2 border-white/10 rounded-lg text-white text-sm focus:border-[#F4C430] focus:outline-none"
            >
              <option value="low">🟢 Low</option>
              <option value="medium">🟡 Medium</option>
              <option value="high">🔴 High</option>
            </select>
            <button
              onClick={handleAddTask}
              disabled={!isPremium && todaysTasks.length >= dailyTaskLimit}
              className="px-4 py-2 bg-[#F4C430] text-black rounded-lg font-semibold hover:bg-[#E0B420] transition flex items-center justify-center gap-2 whitespace-nowrap text-sm disabled:opacity-50 disabled:cursor-not-allowed"
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
