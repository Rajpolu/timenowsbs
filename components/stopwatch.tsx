"use client"

import { useState, useEffect } from "react"
import { Play, Pause, RotateCcw, Flag } from "lucide-react"
import { LayoutWithNav } from "@/app/layout-with-nav"

interface Lap {
  id: string
  time: string
}

export default function StopwatchPage() {
  const [elapsed, setElapsed] = useState(0)
  const [isRunning, setIsRunning] = useState(false)
  const [laps, setLaps] = useState<Lap[]>([])

  useEffect(() => {
    let interval: NodeJS.Timeout
    if (isRunning) {
      interval = setInterval(() => {
        setElapsed((prev) => prev + 10)
      }, 10)
    }
    return () => clearInterval(interval)
  }, [isRunning])

  const formatTime = (ms: number) => {
    const totalSeconds = Math.floor(ms / 1000)
    const minutes = Math.floor(totalSeconds / 60)
    const seconds = totalSeconds % 60
    const centiseconds = Math.floor((ms % 1000) / 10)

    return `${String(minutes).padStart(2, "0")}:${String(seconds).padStart(2, "0")}.${String(centiseconds).padStart(2, "0")}`
  }

  const handleLap = () => {
    setLaps([
      {
        id: Date.now().toString(),
        time: formatTime(elapsed),
      },
      ...laps,
    ])
  }

  const handleReset = () => {
    setIsRunning(false)
    setElapsed(0)
    setLaps([])
  }

  return (
    <LayoutWithNav>
      <div className="max-w-3xl mx-auto px-4 sm:px-6 py-6 sm:py-12 pb-24">
        <div className="mb-6 sm:mb-8">
          <h1 className="sm:text-3xl md:text-5xl mb-2 font-black text-4xl italic">STOPWATCH</h1>
          <p className="sm:text-base text-xs tracking-[0.3em] text-yellow-400 font-black">MEASURE ELAPSED TIME WITH PRECISION </p>
        </div>

        {/* Timer Display */}
        <div className="bg-gradient-to-br from-primary/20 to-accent/20 rounded-2xl border border-primary/30 p-6 sm:p-8 md:p-12 mb-6 sm:mb-8 text-center overflow-hidden">
          <div className="text-5xl sm:text-6xl md:text-8xl font-bold text-primary font-mono mb-6 sm:mb-8 break-words">
            {formatTime(elapsed)}
          </div>

          {/* Controls */}
          <div className="flex flex-col sm:flex-row gap-2 sm:gap-3 justify-center">
            <button
              onClick={() => setIsRunning(!isRunning)}
              className="px-4 sm:px-6 md:px-8 py-2 sm:py-3 md:py-4 bg-[#F4C430] text-black rounded-xl font-semibold hover:bg-[#E0B420] transition flex items-center justify-center gap-2 flex-1 sm:flex-none"
            >
              {isRunning ? <Pause className="w-4 sm:w-5 h-4 sm:h-5" /> : <Play className="w-4 sm:w-5 h-4 sm:h-5" />}
              {isRunning ? "Pause" : "Start"}
            </button>
            <button
              onClick={handleLap}
              disabled={!isRunning && elapsed === 0}
              className="px-4 sm:px-6 md:px-8 py-2 sm:py-3 md:py-4 bg-secondary text-foreground rounded-xl font-semibold hover:bg-secondary/80 transition flex items-center justify-center gap-2 disabled:opacity-50 flex-1 sm:flex-none"
            >
              <Flag className="w-4 sm:w-5 h-4 sm:h-5" />
              Lap
            </button>
            <button
              onClick={handleReset}
              className="px-4 sm:px-6 md:px-8 py-2 sm:py-3 md:py-4 bg-secondary text-foreground rounded-xl font-semibold hover:bg-secondary/80 transition flex items-center justify-center gap-2 flex-1 sm:flex-none"
            >
              <RotateCcw className="w-4 sm:w-5 h-4 sm:h-5" />
              Reset
            </button>
          </div>
        </div>

        {/* Laps */}
        {laps.length > 0 && (
          <div className="bg-card rounded-xl border border-border overflow-hidden">
            <div className="p-4 sm:p-6 border-b border-border">
              <h2 className="text-lg sm:text-xl font-bold">Lap Times</h2>
            </div>
            <div className="divide-y divide-border max-h-96 overflow-y-auto">
              {laps.map((lap, index) => (
                <div
                  key={lap.id}
                  className="p-3 sm:p-4 md:p-6 flex justify-between items-center hover:bg-secondary/50 transition text-sm sm:text-base"
                >
                  <span className="font-semibold">Lap {laps.length - index}</span>
                  <span className="font-mono font-bold text-primary">{lap.time}</span>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </LayoutWithNav>
  )
}
