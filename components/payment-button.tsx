"use client"

import { useState } from "react"
import { Button } from "./ui/button"
import { Loader2 } from "lucide-react"

interface PaymentButtonProps {
  price: number
  plan: "monthly" | "annual"
  planType?: "standard" | "premium"
  onSuccess?: () => void
  onError?: (error: string) => void
}

export function PaymentButton({ price, plan, planType = "standard", onSuccess, onError }: PaymentButtonProps) {
  const [isLoading, setIsLoading] = useState(false)

  const handlePayment = async () => {
    setIsLoading(true)
    try {
      const response = await fetch("/api/payment", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ plan, planType }),
      })

      if (!response.ok) throw new Error("Payment failed")
      const data = await response.json()

      if (data.url) {
        console.log("[v0] Redirecting to Checkout:", data.url)

        if (typeof window !== "undefined") {
          try {
            if (window.top) {
              window.top.location.href = data.url
            } else {
              window.location.href = data.url
            }
          } catch (e) {
            window.open(data.url, "_blank", "noopener,noreferrer")
          }
        }
        return
      }
    } catch (error) {
      console.error("[v0] Payment error:", error)
      onError?.(error instanceof Error ? error.message : "Payment failed")
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="space-y-3">
      <Button
        onClick={handlePayment}
        disabled={isLoading}
        className="w-full bg-[#F4C430] text-black hover:bg-[#E0B420] font-bold h-12"
      >
        {isLoading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
        Upgrade with Stripe
      </Button>
      <p className="text-[10px] text-center text-white/40 italic">Secure checkout via Stripe Global</p>
    </div>
  )
}
