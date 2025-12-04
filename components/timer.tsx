"use client"

import { useState, useEffect } from "react"
import { Play, Pause, RotateCcw, Plus, Minus } from "lucide-react"
import { LayoutWithNav } from "@/app/layout-with-nav"

export default function TimerPage() {
  const [minutes, setMinutes] = useState(5)
  const [seconds, setSeconds] = useState(0)
  const [timeLeft, setTimeLeft] = useState(5 * 60)
  const [isRunning, setIsRunning] = useState(false)
  const [timerAlert, setTimerAlert] = useState("")

  useEffect(() => {
    let interval: NodeJS.Timeout
    if (isRunning && timeLeft > 0) {
      interval = setInterval(() => {
        setTimeLeft((prev) => prev - 1)
      }, 1000)
    } else if (timeLeft === 0 && isRunning) {
      playAlert()
      setIsRunning(false)
      setTimerAlert("Time's up!")
      setTimeout(() => setTimerAlert(""), 3000)
    }
    return () => clearInterval(interval)
  }, [isRunning, timeLeft])

  const playAlert = () => {
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
  }

  const displayMinutes = Math.floor(timeLeft / 60)
  const displaySeconds = timeLeft % 60

  const handleSetTime = () => {
    setTimeLeft(minutes * 60 + seconds)
    setIsRunning(false)
  }

  const handleReset = () => {
    setIsRunning(false)
    setTimeLeft(minutes * 60 + seconds)
  }

  return (
    <LayoutWithNav>
      <div className="max-w-3xl mx-auto px-4 sm:px-6 py-6 sm:py-12">
        <div className="mb-8">
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-2">Timer</h1>
          <p className="text-muted-foreground">Set countdowns with smart alarms</p>
        </div>

        {/* Timer Display - Large and mobile friendly */}
        <div className="bg-gradient-to-br from-primary/20 to-accent/20 rounded-2xl border border-primary/30 p-8 sm:p-12 mb-8 text-center">
          <div className="text-6xl sm:text-8xl font-bold text-primary mb-2 font-mono">
            {String(displayMinutes).padStart(2, "0")}:{String(displaySeconds).padStart(2, "0")}
          </div>

          {timerAlert && <div className="text-primary font-semibold mb-4 text-lg">{timerAlert}</div>}

          {/* Progress Bar */}
          <div className="w-full bg-secondary rounded-full h-2 mb-8 overflow-hidden">
            <div
              className="bg-primary h-full transition-all duration-300"
              style={{
                width:
                  timeLeft === 0
                    ? "0%"
                    : `${((minutes * 60 + seconds - timeLeft) / (minutes * 60 + seconds)) * 100}%` || "0%",
              }}
            />
          </div>

          {/* Controls */}
          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            {/* Button color changed to light orange */}
            <button
              onClick={() => setIsRunning(!isRunning)}
              disabled={timeLeft === 0}
              className="px-6 sm:px-8 py-3 sm:py-4 bg-[#F4C430] text-black rounded-xl font-semibold hover:bg-[#E0B420] transition flex items-center justify-center gap-2 disabled:opacity-50 flex-1 sm:flex-none"
            >
              {isRunning ? <Pause className="w-5 h-5" /> : <Play className="w-5 h-5" />}
              {isRunning ? "Pause" : "Start"}
            </button>
            <button
              onClick={handleReset}
              className="px-6 sm:px-8 py-3 sm:py-4 bg-secondary text-foreground rounded-xl font-semibold hover:bg-secondary/80 transition flex items-center justify-center gap-2 flex-1 sm:flex-none"
            >
              <RotateCcw className="w-5 h-5" />
              Reset
            </button>
          </div>
        </div>

        {/* Time Input */}
        <div className="bg-card rounded-xl border border-border p-6 sm:p-8">
          <h2 className="text-xl sm:text-2xl font-bold mb-6">Set Timer</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mb-6">
            <div>
              <label className="block text-sm font-semibold mb-3">Minutes</label>
              <div className="flex items-center gap-3">
                <button
                  onClick={() => setMinutes(Math.max(0, minutes - 1))}
                  disabled={isRunning}
                  className="p-2 bg-secondary hover:bg-primary hover:text-primary-foreground rounded-lg disabled:opacity-50 transition"
                >
                  <Minus className="w-5 h-5" />
                </button>
                <input
                  type="number"
                  min="0"
                  max="99"
                  value={minutes}
                  onChange={(e) => setMinutes(Number(e.target.value))}
                  disabled={isRunning}
                  className="flex-1 px-4 py-3 bg-secondary border border-border rounded-lg text-center text-foreground disabled:opacity-50 font-semibold text-lg focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary"
                />
                <button
                  onClick={() => setMinutes(Math.min(99, minutes + 1))}
                  disabled={isRunning}
                  className="p-2 bg-secondary hover:bg-primary hover:text-primary-foreground rounded-lg disabled:opacity-50 transition"
                >
                  <Plus className="w-5 h-5" />
                </button>
              </div>
            </div>
            <div>
              <label className="block text-sm font-semibold mb-3">Seconds</label>
              <div className="flex items-center gap-3">
                <button
                  onClick={() => setSeconds(Math.max(0, seconds - 1))}
                  disabled={isRunning}
                  className="p-2 bg-secondary hover:bg-primary hover:text-primary-foreground rounded-lg disabled:opacity-50 transition"
                >
                  <Minus className="w-5 h-5" />
                </button>
                <input
                  type="number"
                  min="0"
                  max="59"
                  value={seconds}
                  onChange={(e) => setSeconds(Math.min(59, Number(e.target.value)))}
                  disabled={isRunning}
                  className="flex-1 px-4 py-3 bg-secondary border border-border rounded-lg text-center text-foreground disabled:opacity-50 font-semibold text-lg focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary"
                />
                <button
                  onClick={() => setSeconds(Math.min(59, seconds + 1))}
                  disabled={isRunning}
                  className="p-2 bg-secondary hover:bg-primary hover:text-primary-foreground rounded-lg disabled:opacity-50 transition"
                >
                  <Plus className="w-5 h-5" />
                </button>
              </div>
            </div>
          </div>
          <button
            onClick={handleSetTime}
            disabled={isRunning}
            className="w-full px-4 py-3 bg-primary text-primary-foreground rounded-lg font-semibold hover:opacity-90 transition disabled:opacity-50"
          >
            Set Timer
          </button>
        </div>
      </div>
    </LayoutWithNav>
  )
}
