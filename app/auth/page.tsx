"use client"

import { useState } from "react"
import { AuthModal } from "@/components/auth-modal"
import { useRouter } from "next/navigation"
import { Check, ArrowLeft } from "lucide-react"
import Link from "next/link"

export default function AuthPage() {
  const [isOpen, setIsOpen] = useState(true)
  const router = useRouter()

  const handleClose = () => {
    setIsOpen(false)
    router.push("/")
  }

  const handleSubmit = (email: string) => {
    console.log("[v0] Auth submitted for:", email)
    router.push("/planner")
  }

  return (
    <div className="min-h-screen bg-black flex flex-col items-center justify-center p-4">
      <div className="w-full max-w-lg">
        <div className="mb-8">
          <Link href="/" className="inline-flex items-center gap-2 text-[#F4C430] hover:underline mb-6 font-bold">
            <ArrowLeft className="w-4 h-4" /> Back to timenow
          </Link>
          <h1 className="text-4xl font-black text-white mb-4">Unlock Your Full Potential.</h1>
          <p className="text-white/60 text-lg">
            Join thousands of high-performers owning their time. Save your data and sync across all your devices.
          </p>
        </div>

        <div className="grid grid-cols-1 gap-3 mb-10">
          {[
            "Sync data across all devices",
            "Access to Premium Stats Dashboard",
            "Unlimited tasks in Daily Planner",
            "Advanced Pomodoro analytics",
          ].map((feature, i) => (
            <div key={i} className="flex items-center gap-3 text-sm text-white/80">
              <div className="w-5 h-5 rounded-full bg-[#F4C430]/20 flex items-center justify-center">
                <Check className="w-3 h-3 text-[#F4C430]" />
              </div>
              {feature}
            </div>
          ))}
        </div>

        <AuthModal isOpen={isOpen} onClose={() => {}} onSubmit={handleSubmit} />
      </div>
    </div>
  )
}
