"use client"

import { useState, useEffect } from "react"
import { createClient } from "@/lib/supabase/client"
import { Settings, ArrowLeft, ToggleLeft as Toggle2 } from "lucide-react"
import Link from "next/link"
import { useRouter } from "next/navigation"

interface UserSettings {
  emailNotifications: boolean
  darkMode: boolean
  soundEnabled: boolean
  autoStartTimer: boolean
  timezone: string
}

export default function SettingsPage() {
  const [settings, setSettings] = useState<UserSettings>({
    emailNotifications: true,
    darkMode: true,
    soundEnabled: true,
    autoStartTimer: false,
    timezone: "UTC",
  })
  const [user, setUser] = useState<any>(null)
  const [saving, setSaving] = useState(false)
  const router = useRouter()
  const [supabase] = useState(() => createClient())

  useEffect(() => {
    const getSession = async () => {
      const {
        data: { session },
      } = await supabase.auth.getSession()

      if (!session) {
        router.push("/")
        return
      }

      setUser(session.user)

      // Load settings from localStorage
      const saved = localStorage.getItem(`settings-${session.user.id}`)
      if (saved) {
        setSettings(JSON.parse(saved))
      }
    }

    getSession()
  }, [supabase, router])

  const handleToggle = (key: keyof UserSettings) => {
    setSettings((prev) => ({
      ...prev,
      [key]: typeof prev[key] === "boolean" ? !prev[key] : prev[key],
    }))
  }

  const saveSettings = async () => {
    setSaving(true)
    // Simulate save delay
    await new Promise((resolve) => setTimeout(resolve, 500))
    if (user) {
      localStorage.setItem(`settings-${user.id}`, JSON.stringify(settings))
    }
    setSaving(false)
  }

  return (
    <div className="min-h-screen bg-black text-white font-sans">
      {/* Mobile Header */}
      <div className="sm:hidden fixed top-0 left-0 right-0 bg-black/95 backdrop-blur-xl border-b border-white/5 z-40">
        <div className="flex items-center justify-between p-4">
          <Link href="/profile" className="p-2 hover:bg-white/5 rounded-lg transition">
            <ArrowLeft className="w-5 h-5" />
          </Link>
          <h1 className="text-lg font-black italic uppercase tracking-tighter">Settings</h1>
          <div className="w-9" />
        </div>
      </div>

      {/* Desktop Header */}
      <div className="hidden sm:block border-b border-white/5 bg-black/50 backdrop-blur-xl sticky top-0 z-40">
        <div className="max-w-3xl mx-auto px-6 py-6 flex items-center gap-4">
          <Settings className="w-6 h-6 text-[#F4C430]" />
          <h1 className="text-2xl font-black italic uppercase tracking-tighter">Settings</h1>
        </div>
      </div>

      {/* Content */}
      <div className="max-w-3xl mx-auto px-4 sm:px-6 py-8 pt-24 sm:pt-8">
        <div className="space-y-6">
          {/* Preferences Section */}
          <div>
            <h2 className="text-lg font-black italic uppercase tracking-tighter mb-4">Preferences</h2>
            <div className="space-y-3">
              {[
                { key: "emailNotifications", label: "Email Notifications", desc: "Receive updates via email" },
                { key: "soundEnabled", label: "Sound Effects", desc: "Enable audio feedback" },
                { key: "autoStartTimer", label: "Auto-Start Timer", desc: "Start timer automatically" },
              ].map((item) => (
                <div
                  key={item.key}
                  className="flex items-center justify-between p-4 bg-zinc-950 border border-white/5 rounded-xl"
                >
                  <div>
                    <p className="font-bold text-white">{item.label}</p>
                    <p className="text-xs text-white/60 mt-1">{item.desc}</p>
                  </div>
                  <button
                    onClick={() => handleToggle(item.key as keyof UserSettings)}
                    className={`p-2 rounded-lg transition ${
                      settings[item.key as keyof UserSettings] ? "bg-[#F4C430] text-black" : "bg-white/5 text-white/40"
                    }`}
                  >
                    <Toggle2 className="w-5 h-5" />
                  </button>
                </div>
              ))}
            </div>
          </div>

          {/* Regional Section */}
          <div>
            <h2 className="text-lg font-black italic uppercase tracking-tighter mb-4">Regional</h2>
            <div className="p-4 bg-zinc-950 border border-white/5 rounded-xl">
              <label className="block text-sm font-bold text-white/60 uppercase tracking-wider mb-2">Timezone</label>
              <select
                value={settings.timezone}
                onChange={(e) => setSettings({ ...settings, timezone: e.target.value })}
                className="w-full bg-black border border-white/10 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-[#F4C430] transition"
              >
                <option value="UTC">UTC</option>
                <option value="EST">Eastern (EST)</option>
                <option value="CST">Central (CST)</option>
                <option value="MST">Mountain (MST)</option>
                <option value="PST">Pacific (PST)</option>
                <option value="GMT">GMT</option>
                <option value="IST">India (IST)</option>
                <option value="JST">Japan (JST)</option>
              </select>
            </div>
          </div>

          {/* Save Button */}
          <button
            onClick={saveSettings}
            disabled={saving}
            className="w-full py-3 bg-[#F4C430] text-black font-black uppercase tracking-widest rounded-xl hover:bg-[#F4C430]/90 transition disabled:opacity-50"
          >
            {saving ? "Saving..." : "Save Settings"}
          </button>
        </div>
      </div>
    </div>
  )
}
