"use client"

import { useState } from "react"
import { Plus, Trash2 } from "lucide-react"
import { LayoutWithNav } from "@/app/layout-with-nav"

interface Timezone {
  id: string
  name: string
  offset: number
}

const timezones: Timezone[] = [
  { id: "utc", name: "UTC", offset: 0 },
  { id: "est", name: "EST", offset: -5 },
  { id: "cst", name: "CST", offset: -6 },
  { id: "mst", name: "MST", offset: -7 },
  { id: "pst", name: "PST", offset: -8 },
  { id: "gmt", name: "GMT", offset: 0 },
  { id: "cet", name: "CET", offset: 1 },
  { id: "ist", name: "IST", offset: 5.5 },
  { id: "jst", name: "JST", offset: 9 },
  { id: "aest", name: "AEST", offset: 10 },
]

export default function TimezonesPage() {
  const [selected, setSelected] = useState<Timezone[]>([
    { id: "utc", name: "UTC", offset: 0 },
    { id: "est", name: "EST", offset: -5 },
  ])

  const handleAdd = (tz: Timezone) => {
    if (!selected.find((s) => s.id === tz.id)) {
      setSelected([...selected, tz])
    }
  }

  const handleRemove = (id: string) => {
    setSelected(selected.filter((s) => s.id !== id))
  }

  const getTime = (offset: number) => {
    const now = new Date()
    const utc = now.getTime() + now.getTimezoneOffset() * 60000
    const time = new Date(utc + 3600000 * offset)
    return time.toLocaleTimeString("en-US", {
      hour: "2-digit",
      minute: "2-digit",
      second: "2-digit",
      hour12: true,
    })
  }

  return (
    <LayoutWithNav>
      <div className="max-w-6xl mx-auto px-4 sm:px-6 py-6 sm:py-12">
        <div className="mb-8">
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-2">Timezone Converter</h1>
          <p className="text-muted-foreground">Convert time across different zones instantly</p>
        </div>

        {/* Selected Timezones */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 mb-12">
          {selected.map((tz) => (
            <div
              key={tz.id}
              className="p-6 sm:p-7 bg-gradient-to-br from-card to-card/50 rounded-xl border border-border hover:border-primary hover:shadow-lg transition-all duration-300"
            >
              <div className="flex justify-between items-start mb-4">
                <h3 className="text-lg sm:text-xl font-bold">{tz.name}</h3>
                <button
                  onClick={() => handleRemove(tz.id)}
                  className="p-2 hover:bg-secondary rounded-lg transition focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary"
                  aria-label={`Remove ${tz.name}`}
                >
                  <Trash2 className="w-5 h-5 text-destructive" />
                </button>
              </div>
              <div className="text-4xl sm:text-5xl font-bold text-primary mb-3 font-mono">{getTime(tz.offset)}</div>
              <div className="text-sm text-muted-foreground">
                UTC {tz.offset > 0 ? "+" : ""}
                {tz.offset}
              </div>
            </div>
          ))}
        </div>

        {/* Add Timezone */}
        <div className="bg-card rounded-xl border border-border p-6 sm:p-8">
          <h2 className="text-xl sm:text-2xl font-bold mb-6 flex items-center gap-2">
            <Plus className="w-6 h-6 text-primary" />
            Add Timezone
          </h2>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-3">
            {timezones
              .filter((tz) => !selected.find((s) => s.id === tz.id))
              .map((tz) => (
                <button
                  key={tz.id}
                  onClick={() => handleAdd(tz)}
                  className="p-3 bg-secondary hover:bg-primary hover:text-primary-foreground rounded-lg transition text-sm font-semibold focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary"
                >
                  {tz.name}
                </button>
              ))}
          </div>
        </div>
      </div>
    </LayoutWithNav>
  )
}
