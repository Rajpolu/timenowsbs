"use client"

import { useState, useEffect } from "react"
import { Play, Pause, RotateCcw, Plus, Minus } from "lucide-react"
import { LayoutWithNav } from "@/app/layout-with-nav"

export default function PomodoroComponent() {
  const [workMinutes, setWorkMinutes] = useState(25)
  const [breakMinutes, setBreakMinutes] = useState(5)
  const [timeLeft, setTimeLeft] = useState(25 * 60)
  const [isRunning, setIsRunning] = useState(false)
  const [isWorkSession, setIsWorkSession] = useState(true)
  const [sessionsCompleted, setSessionsCompleted] = useState(0)
  const [alert, setAlert] = useState("")

  useEffect(() => {
    let interval: NodeJS.Timeout
    if (isRunning && timeLeft > 0) {
      interval = setInterval(() => {
        setTimeLeft((prev) => prev - 1)
      }, 1000)
    } else if (timeLeft === 0 && isRunning) {
      playAlert()
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

  return (
    <LayoutWithNav>
      <div className="max-w-3xl mx-auto px-3 sm:px-6 py-6 sm:py-12">
        <div className="mb-6 sm:mb-8">
          <h1 className="text-3xl sm:text-4xl font-bold mb-2">Pomodoro Timer</h1>
          <p className="text-black/60">Stay focused with the Pomodoro Technique</p>
        </div>

        <div className="bg-white border-2 border-black rounded-2xl p-6 sm:p-12 mb-8 text-center">
          <div className="mb-4">
            <span className="text-sm font-semibold text-black/70">
              {isWorkSession ? "🎯 Work Session" : "☕ Break Time"}
            </span>
          </div>

          {/* Timer Display */}
          <div className="text-6xl sm:text-8xl font-bold text-black font-mono mb-4">
            {String(displayMinutes).padStart(2, "0")}:{String(displaySeconds).padStart(2, "0")}
          </div>

          {/* Progress Bar */}
          <div className="w-full bg-black/10 rounded-full h-2 mb-6 overflow-hidden">
            <div className="bg-[#F4C430] h-full transition-all duration-300" style={{ width: `${progressPercent}%` }} />
          </div>

          {alert && <div className="text-black font-semibold mb-4 text-base">{alert}</div>}

          {/* Controls */}
          <div className="flex flex-col sm:flex-row gap-3 justify-center mb-6">
            <button
              onClick={() => setIsRunning(!isRunning)}
              className="px-6 sm:px-8 py-3 bg-[#F4C430] text-black rounded-lg font-semibold hover:bg-[#E0B420] transition flex items-center justify-center gap-2 flex-1 sm:flex-none"
            >
              {isRunning ? <Pause className="w-5 h-5" /> : <Play className="w-5 h-5" />}
              {isRunning ? "Pause" : "Start"}
            </button>
            <button
              onClick={handleReset}
              className="px-6 sm:px-8 py-3 bg-black/10 text-black rounded-lg font-semibold hover:bg-black/20 transition flex items-center justify-center gap-2 flex-1 sm:flex-none"
            >
              <RotateCcw className="w-5 h-5" />
              Reset
            </button>
          </div>

          <div className="text-sm text-black/70">
            Sessions completed: <span className="font-bold text-black">{sessionsCompleted}</span>
          </div>
        </div>

        {/* Configuration */}
        <div className="bg-white border-2 border-black/10 rounded-xl p-6">
          <h2 className="text-xl font-bold mb-6">Settings</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-semibold mb-3">Work Duration (min)</label>
              <div className="flex items-center gap-3">
                <button
                  onClick={() => setWorkMinutes(Math.max(1, workMinutes - 1))}
                  disabled={isRunning}
                  className="p-2 bg-black/10 hover:bg-black/20 rounded-lg disabled:opacity-50 transition"
                >
                  <Minus className="w-5 h-5" />
                </button>
                <input
                  type="number"
                  min="1"
                  max="60"
                  value={workMinutes}
                  onChange={(e) => setWorkMinutes(Number(e.target.value))}
                  disabled={isRunning}
                  className="flex-1 px-4 py-2 bg-white border-2 border-black/10 rounded-lg text-center font-semibold disabled:opacity-50 focus:border-black focus:outline-none"
                />
                <button
                  onClick={() => setWorkMinutes(Math.min(60, workMinutes + 1))}
                  disabled={isRunning}
                  className="p-2 bg-black/10 hover:bg-black/20 rounded-lg disabled:opacity-50 transition"
                >
                  <Plus className="w-5 h-5" />
                </button>
              </div>
            </div>
            <div>
              <label className="block text-sm font-semibold mb-3">Break Duration (min)</label>
              <div className="flex items-center gap-3">
                <button
                  onClick={() => setBreakMinutes(Math.max(1, breakMinutes - 1))}
                  disabled={isRunning}
                  className="p-2 bg-black/10 hover:bg-black/20 rounded-lg disabled:opacity-50 transition"
                >
                  <Minus className="w-5 h-5" />
                </button>
                <input
                  type="number"
                  min="1"
                  max="30"
                  value={breakMinutes}
                  onChange={(e) => setBreakMinutes(Number(e.target.value))}
                  disabled={isRunning}
                  className="flex-1 px-4 py-2 bg-white border-2 border-black/10 rounded-lg text-center font-semibold disabled:opacity-50 focus:border-black focus:outline-none"
                />
                <button
                  onClick={() => setBreakMinutes(Math.min(30, breakMinutes + 1))}
                  disabled={isRunning}
                  className="p-2 bg-black/10 hover:bg-black/20 rounded-lg disabled:opacity-50 transition"
                >
                  <Plus className="w-5 h-5" />
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </LayoutWithNav>
  )
}
