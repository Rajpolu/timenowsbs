"use client"

import { useState, useEffect } from "react"
import { createClient } from "@/lib/supabase/client"
import { LogOut, Settings, CreditCard, Bell, User } from "lucide-react"
import Link from "next/link"
import { useRouter } from "next/navigation"

export function UserMenu() {
  const [user, setUser] = useState<any>(null)
  const [open, setOpen] = useState(false)
  const router = useRouter()
  const [supabase] = useState(() => createClient())

  useEffect(() => {
    const getSession = async () => {
      const {
        data: { session },
      } = await supabase.auth.getSession()
      setUser(session?.user)
    }

    getSession()

    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, session) => {
      setUser(session?.user)
    })

    return () => subscription?.unsubscribe()
  }, [supabase])

  const handleLogout = async () => {
    await supabase.auth.signOut()
    setUser(null)
    router.push("/")
  }

  if (!user) return null

  return (
    <div className="relative">
      <button
        onClick={() => setOpen(!open)}
        className="flex items-center gap-2 px-3 py-2 bg-zinc-900 border border-white/5 rounded-lg hover:bg-zinc-800 transition text-sm font-bold text-white"
      >
        <User className="w-4 h-4" />
        <span className="hidden sm:inline">{user.email?.split("@")[0]}</span>
      </button>

      {open && (
        <div className="absolute right-0 top-12 w-48 bg-zinc-950 border border-white/10 rounded-xl shadow-lg z-40">
          <div className="p-3 border-b border-white/5">
            <p className="text-xs font-bold text-white/60 uppercase tracking-wider">Account</p>
            <p className="text-sm font-bold text-white truncate mt-1">{user.email}</p>
          </div>

          <div className="space-y-1 p-2">
            <Link
              href="/profile"
              className="flex items-center gap-3 px-3 py-2 rounded-lg hover:bg-white/5 transition text-sm text-white/80 hover:text-white"
              onClick={() => setOpen(false)}
            >
              <User className="w-4 h-4" />
              Profile
            </Link>
            <Link
              href="/notifications"
              className="flex items-center gap-3 px-3 py-2 rounded-lg hover:bg-white/5 transition text-sm text-white/80 hover:text-white"
              onClick={() => setOpen(false)}
            >
              <Bell className="w-4 h-4" />
              Notifications
            </Link>
            <Link
              href="/billing"
              className="flex items-center gap-3 px-3 py-2 rounded-lg hover:bg-white/5 transition text-sm text-white/80 hover:text-white"
              onClick={() => setOpen(false)}
            >
              <CreditCard className="w-4 h-4" />
              Billing
            </Link>
            <Link
              href="/settings"
              className="flex items-center gap-3 px-3 py-2 rounded-lg hover:bg-white/5 transition text-sm text-white/80 hover:text-white"
              onClick={() => setOpen(false)}
            >
              <Settings className="w-4 h-4" />
              Settings
            </Link>
          </div>

          <div className="border-t border-white/5 p-2">
            <button
              onClick={handleLogout}
              className="w-full flex items-center gap-3 px-3 py-2 rounded-lg hover:bg-red-500/10 transition text-sm text-red-400 hover:text-red-300"
            >
              <LogOut className="w-4 h-4" />
              Logout
            </button>
          </div>
        </div>
      )}
    </div>
  )
}
