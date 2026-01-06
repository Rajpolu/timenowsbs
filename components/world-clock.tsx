"use client"

import { useEffect, useState } from "react"
import { LayoutWithNav } from "@/app/layout-with-nav"

interface City {
  name: string
  offset: number
  country: string
}

const cities: City[] = [
  { name: "New York", offset: -5, country: "USA" },
  { name: "London", offset: 0, country: "UK" },
  { name: "Paris", offset: 1, country: "France" },
  { name: "Tokyo", offset: 9, country: "Japan" },
  { name: "Sydney", offset: 10, country: "Australia" },
  { name: "Dubai", offset: 4, country: "UAE" },
  { name: "Singapore", offset: 8, country: "Singapore" },
  { name: "Hong Kong", offset: 8, country: "Hong Kong" },
  { name: "São Paulo", offset: -3, country: "Brazil" },
  { name: "Mumbai", offset: 5.5, country: "India" },
]

export default function WorldClockPage() {
  const [times, setTimes] = useState<Record<string, string>>({})

  useEffect(() => {
    const updateTimes = () => {
      const newTimes: Record<string, string> = {}
      cities.forEach((city) => {
        const now = new Date()
        const utc = now.getTime() + now.getTimezoneOffset() * 60000
        const time = new Date(utc + 3600000 * city.offset)
        newTimes[city.name] = time.toLocaleTimeString("en-US", {
          hour: "2-digit",
          minute: "2-digit",
          second: "2-digit",
          hour12: true,
        })
      })
      setTimes(newTimes)
    }

    updateTimes()
    const interval = setInterval(updateTimes, 1000)
    return () => clearInterval(interval)
  }, [])

  return (
    <LayoutWithNav>
      <div className="max-w-6xl mx-auto px-4 sm:px-6 py-6 sm:py-12">
        <div className="mb-8">
          <h1 className="sm:text-4xl md:text-5xl mb-2 italic font-black text-4xl">{"WORLD CLOCK"}</h1>
          <p className="text-xs tracking-[0.3em] font-black text-yellow-400">CHECK CURRENT TIME ANYWHERE IN THE WORLD </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
          {cities.map((city) => (
            <div
              key={city.name}
              className="p-6 sm:p-7 bg-gradient-to-br from-card to-card/50 rounded-xl border border-border hover:border-primary hover:shadow-lg transition-all duration-300"
            >
              <div className="mb-4">
                <h3 className="text-lg sm:text-xl font-bold">{city.name}</h3>
                <p className="text-sm text-muted-foreground">{city.country}</p>
              </div>
              <div className="text-4xl sm:text-5xl font-bold text-primary font-mono mb-3">
                {times[city.name] || "00:00:00"}
              </div>
              <div className="text-sm text-muted-foreground">
                UTC {city.offset > 0 ? "+" : ""}
                {city.offset}
              </div>
            </div>
          ))}
        </div>
      </div>
    </LayoutWithNav>
  )
}
