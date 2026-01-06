"use client"

import { useState, useEffect } from "react"
import { createClient } from "@/lib/supabase/client"
import { Bell, ArrowLeft } from "lucide-react"
import Link from "next/link"
import { useRouter } from "next/navigation"

interface Notification {
  id: string
  type: "info" | "warning" | "success"
  title: string
  message: string
  timestamp: Date
  read: boolean
}

export default function NotificationsPage() {
  const [notifications, setNotifications] = useState<Notification[]>([])
  const [user, setUser] = useState<any>(null)
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

      // Load notifications from localStorage for now
      const saved = localStorage.getItem(`notifications-${session.user.id}`)
      if (saved) {
        setNotifications(JSON.parse(saved))
      } else {
        // Mock notifications
        setNotifications([
          {
            id: "1",
            type: "success",
            title: "Welcome to timenow.sbs",
            message: "Your account is all set up! Start tracking time and boost your productivity.",
            timestamp: new Date(),
            read: false,
          },
          {
            id: "2",
            type: "info",
            title: "Upgrade to Premium",
            message: "Unlock unlimited tasks, advanced analytics, and priority support.",
            timestamp: new Date(Date.now() - 86400000),
            read: false,
          },
        ])
      }
    }

    getSession()
  }, [supabase, router])

  const markAsRead = (id: string) => {
    const updated = notifications.map((n) => (n.id === id ? { ...n, read: true } : n))
    setNotifications(updated)
    if (user) {
      localStorage.setItem(`notifications-${user.id}`, JSON.stringify(updated))
    }
  }

  return (
    <div className="min-h-screen bg-black text-white font-sans">
      {/* Mobile Header */}
      <div className="sm:hidden fixed top-0 left-0 right-0 bg-black/95 backdrop-blur-xl border-b border-white/5 z-40">
        <div className="flex items-center justify-between p-4">
          <Link href="/profile" className="p-2 hover:bg-white/5 rounded-lg transition">
            <ArrowLeft className="w-5 h-5" />
          </Link>
          <h1 className="text-lg font-black italic uppercase tracking-tighter">Notifications</h1>
          <div className="w-9" />
        </div>
      </div>

      {/* Desktop Header */}
      <div className="hidden sm:block border-b border-white/5 bg-black/50 backdrop-blur-xl sticky top-0 z-40">
        <div className="max-w-3xl mx-auto px-6 py-6 flex items-center gap-4">
          <Bell className="w-6 h-6 text-[#F4C430]" />
          <h1 className="text-2xl font-black italic uppercase tracking-tighter">Notifications</h1>
        </div>
      </div>

      {/* Content */}
      <div className="max-w-3xl mx-auto px-4 sm:px-6 py-8 pt-24 sm:pt-8">
        {notifications.length === 0 ? (
          <div className="text-center py-16">
            <Bell className="w-12 h-12 text-white/20 mx-auto mb-4" />
            <p className="text-white/60 text-lg">No notifications yet</p>
          </div>
        ) : (
          <div className="space-y-3">
            {notifications.map((notification) => (
              <div
                key={notification.id}
                onClick={() => markAsRead(notification.id)}
                className={`p-4 rounded-xl border transition cursor-pointer ${
                  notification.read ? "bg-zinc-950 border-white/5" : "bg-white/5 border-white/10 hover:bg-white/10"
                }`}
              >
                <div className="flex items-start gap-3">
                  <div
                    className={`w-2 h-2 rounded-full mt-2 flex-shrink-0 ${
                      notification.type === "success"
                        ? "bg-green-500"
                        : notification.type === "warning"
                          ? "bg-yellow-500"
                          : "bg-blue-500"
                    }`}
                  />
                  <div className="flex-1 min-w-0">
                    <h3 className="font-bold text-white">{notification.title}</h3>
                    <p className="text-sm text-white/60 mt-1">{notification.message}</p>
                    <p className="text-xs text-white/40 mt-2">{notification.timestamp.toLocaleDateString()}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}
