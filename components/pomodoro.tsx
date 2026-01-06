"use client"

import { useState, useEffect } from "react"
import { Play, Pause, RotateCcw, Plus, Minus, Lock } from "lucide-react"
import { LayoutWithNav } from "@/app/layout-with-nav"
import Link from "next/link"

export default function PomodoroComponent() {
  const [workMinutes, setWorkMinutes] = useState(25)
  const [breakMinutes, setBreakMinutes] = useState(5)
  const [timeLeft, setTimeLeft] = useState(25 * 60)
  const [isRunning, setIsRunning] = useState(false)
  const [isWorkSession, setIsWorkSession] = useState(true)
  const [sessionsCompleted, setSessionsCompleted] = useState(0)
  const [alert, setAlert] = useState("")
  const [isPremium, setIsPremium] = useState(false)

  useEffect(() => {
    if ("Notification" in window && Notification.permission === "default") {
      Notification.requestPermission()
    }

    const userEmail = localStorage.getItem("userEmail")
    const premiumUsers = localStorage.getItem("premiumUsers")
    if (userEmail && premiumUsers?.includes(userEmail)) {
      setIsPremium(true)
    }
  }, [])

  useEffect(() => {
    let interval: NodeJS.Timeout
    if (isRunning && timeLeft > 0) {
      interval = setInterval(() => {
        setTimeLeft((prev) => prev - 1)
      }, 1000)
    } else if (timeLeft === 0 && isRunning) {
      playAlert()
      if ("Notification" in window && Notification.permission === "granted") {
        new Notification(isWorkSession ? "Work session complete!" : "Break time over!", {
          body: isWorkSession ? "Time for a well-deserved break." : "Ready for another focus session?",
          icon: "/placeholder.svg?key=x6xif",
        })
      }
      if (isWorkSession) {
        setSessionsCompleted((prev) => prev + 1)
        setAlert("Work session complete! Time for a break.")
        setTimeLeft(breakMinutes * 60)
      } else {
        setAlert("Break time over! Ready for another session?")
        setTimeLeft(workMinutes * 60)
      }
      setIsWorkSession(!isWorkSession)
      setIsRunning(false)
      setTimeout(() => setAlert(""), 4000)
    }
    return () => clearInterval(interval)
  }, [isRunning, timeLeft, isWorkSession, workMinutes, breakMinutes])

  const playAlert = () => {
    try {
      const audioContext = new (window.AudioContext || (window as any).webkitAudioContext)()
      for (let i = 0; i < 3; i++) {
        const oscillator = audioContext.createOscillator()
        const gainNode = audioContext.createGain()
        oscillator.connect(gainNode)
        gainNode.connect(audioContext.destination)
        oscillator.frequency.value = 1000
        gainNode.gain.setValueAtTime(0.3, audioContext.currentTime + i * 0.3)
        gainNode.gain.exponentialRampToValueAtTime(0.01, audioContext.currentTime + i * 0.3 + 0.2)
        oscillator.start(audioContext.currentTime + i * 0.3)
        oscillator.stop(audioContext.currentTime + i * 0.3 + 0.2)
      }
    } catch (e) {
      console.error("Audio error:", e)
    }
  }

  const displayMinutes = Math.floor(timeLeft / 60)
  const displaySeconds = timeLeft % 60
  const totalTime = (isWorkSession ? workMinutes : breakMinutes) * 60
  const progressPercent = ((totalTime - timeLeft) / totalTime) * 100

  const handleReset = () => {
    setIsRunning(false)
    setTimeLeft(workMinutes * 60)
    setIsWorkSession(true)
  }

  const canChangeInterval = (newVal: number, current: number) => {
    const presets = [15, 25, 45, 60]
    if (isPremium) return true
    if (presets.includes(newVal)) return true
    return false
  }

  return (
    <LayoutWithNav>
      <div className="max-w-3xl mx-auto px-3 sm:px-6 py-6 sm:py-12 bg-black min-h-screen">
        <div className="mb-6 sm:mb-8 text-center sm:text-left">
          <h1 className="text-4xl sm:text-6xl font-black mb-2 text-white uppercase italic tracking-tighter">
            Focus Timer
          </h1>
          <p className="text-[#F4C430] text-xs sm:text-sm font-black uppercase tracking-[0.3em]">
            Master your deep work flow
          </p>
        </div>

        <div className="bg-zinc-900 border-2 border-white/5 p-8 sm:p-16 mb-8 text-center shadow-[0_0_50px_rgba(0,0,0,0.5)] rounded-md">
          <div className="mb-6">
            <span className="px-4 py-1.5 bg-[#F4C430]/10 text-[#F4C430] border border-[#F4C430]/20 rounded-full text-xs font-black uppercase tracking-widest">
              {isWorkSession ? "🎯 Work Session" : "☕ Break Time"}
            </span>
          </div>

          <div className="sm:text-[10rem] font-black text-white font-mono mb-8 tracking-tighter leading-none text-7xl">
            {String(displayMinutes).padStart(2, "0")}:{String(displaySeconds).padStart(2, "0")}
          </div>

          <div className="w-full bg-white/5 rounded-full mb-10 overflow-hidden border border-white/5 h-2.5">
            <div
              className="bg-[#F4C430] h-full transition-all duration-300 shadow-[0_0_20px_rgba(244,196,48,0.4)]"
              style={{ width: `${progressPercent}%` }}
            />
          </div>

          {alert && (
            <div className="text-[#F4C430] font-black mb-8 text-xl animate-pulse italic uppercase">{alert}</div>
          )}

          <div className="flex flex-col sm:flex-row gap-5 justify-center mb-8">
            <button
              onClick={() => setIsRunning(!isRunning)}
              className="px-10 sm:px-14 py-5 bg-[#F4C430] text-black rounded-2xl font-black text-xl hover:scale-105 transition shadow-2xl shadow-[#F4C430]/20 flex items-center justify-center gap-3 flex-1 sm:flex-none uppercase italic"
            >
              {isRunning ? <Pause className="w-7 h-7 fill-current" /> : <Play className="w-7 h-7 fill-current" />}
              {isRunning ? "Pause" : "Start"}
            </button>
            <button
              onClick={handleReset}
              className="px-10 sm:px-14 py-5 bg-zinc-800 text-white border-2 border-white/5 rounded-2xl font-black text-xl hover:bg-zinc-700 transition flex items-center justify-center gap-3 flex-1 sm:flex-none uppercase italic shadow-xl"
            >
              <RotateCcw className="w-6 h-6" />
              Reset
            </button>
          </div>

          <div className="text-sm text-white/40 uppercase tracking-widest font-black">
            Sessions completed: <span className="text-white ml-1">{sessionsCompleted}</span>
          </div>
        </div>

        <div className="bg-zinc-900 border border-white/5 rounded-2xl p-8 relative overflow-hidden">
          {!isPremium && (
            <div className="absolute top-4 right-4 z-10">
              <Link
                href="/pricing"
                className="flex items-center text-[10px] font-black uppercase tracking-widest text-[#F4C430] hover:underline gap-2 py-0"
              >
                <Lock className="w-3 h-3" />
                Unlock Custom Durations
              </Link>
            </div>
          )}

          <h2 className="text-xl font-black mb-8 uppercase tracking-tight text-white/90 mt-3.5">Timer Settings</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
            <div>
              <label className="block text-xs font-black uppercase tracking-widest text-white/40 mb-4">
                Work Duration (min)
              </label>
              <div className="flex items-center gap-4">
                <button
                  onClick={() => setWorkMinutes(Math.max(1, workMinutes - 5))}
                  disabled={isRunning}
                  className="p-3 bg-white/5 hover:bg-white/10 text-white rounded-xl disabled:opacity-30 transition border border-white/5"
                >
                  <Minus className="w-5 h-5" />
                </button>
                <div className="flex-1 relative">
                  <input
                    type="number"
                    value={workMinutes}
                    onChange={(e) => setWorkMinutes(Number(e.target.value))}
                    disabled={isRunning || !isPremium}
                    className="w-full py-3 bg-black border-white/10 rounded-xl text-center text-xl font-bold text-white focus:border-[#F4C430] focus:outline-none disabled:opacity-50 border-2 px-4"
                  />
                </div>
                <button
                  onClick={() => setWorkMinutes(Math.min(120, workMinutes + 5))}
                  disabled={isRunning}
                  className="p-3 bg-white/5 hover:bg-white/10 text-white rounded-xl disabled:opacity-30 transition border border-white/5"
                >
                  <Plus className="w-5 h-5" />
                </button>
              </div>
            </div>
            <div>
              <label className="block text-xs font-black uppercase tracking-widest text-white/40 mb-4">
                Break Duration (min)
              </label>
              <div className="flex items-center gap-4">
                <button
                  onClick={() => setBreakMinutes(Math.max(1, breakMinutes - 5))}
                  disabled={isRunning}
                  className="p-3 bg-white/5 hover:bg-white/10 text-white rounded-xl disabled:opacity-30 transition border border-white/5"
                >
                  <Minus className="w-5 h-5" />
                </button>
                <div className="flex-1 relative">
                  <input
                    type="number"
                    value={breakMinutes}
                    onChange={(e) => setBreakMinutes(Number(e.target.value))}
                    disabled={isRunning || !isPremium}
                    className="w-full px-4 py-3 bg-black border-2 border-white/10 rounded-xl text-center text-xl font-bold text-white focus:border-[#F4C430] focus:outline-none disabled:opacity-50"
                  />
                </div>
                <button
                  onClick={() => setBreakMinutes(Math.min(60, breakMinutes + 5))}
                  disabled={isRunning}
                  className="p-3 bg-white/5 hover:bg-white/10 text-white rounded-xl disabled:opacity-30 transition border border-white/5"
                >
                  <Plus className="w-5 h-5" />
                </button>
              </div>
            </div>
          </div>

          {!isPremium && (
            <p className="mt-8 text-xs text-white/30 italic text-center">
              Free users are limited to 5-minute increments. Upgrade for per-minute control.
            </p>
          )}
        </div>
      </div>
    </LayoutWithNav>
  )
}
