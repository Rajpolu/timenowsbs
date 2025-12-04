"use client"

import { useState } from "react"
import { Button } from "./ui/button"
import { Loader2 } from "lucide-react"

interface PaymentButtonProps {
  price: number
  plan: "monthly" | "annual"
  onSuccess?: () => void
  onError?: (error: string) => void
}

export function PaymentButton({ price, plan, onSuccess, onError }: PaymentButtonProps) {
  const [isLoading, setIsLoading] = useState(false)

  const handlePayment = async (provider: "stripe" | "razorpay" | "paypal") => {
    setIsLoading(true)
    try {
      const response = await fetch("/api/payment", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "x-payment-provider": provider,
        },
        body: JSON.stringify({
          amount: price,
          currency: provider === "razorpay" ? "INR" : "USD",
          plan,
          provider,
        }),
      })

      if (!response.ok) throw new Error("Payment initialization failed")

      // For now, we show success (replace with actual payment flow)
      onSuccess?.()
    } catch (error) {
      console.error("[v0] Payment error:", error)
      onError?.(error instanceof Error ? error.message : "Payment failed")
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="space-y-3">
      <Button onClick={() => handlePayment("stripe")} disabled={isLoading} className="w-full">
        {isLoading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
        Pay with Stripe
      </Button>
      <Button onClick={() => handlePayment("razorpay")} disabled={isLoading} variant="outline" className="w-full">
        {isLoading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
        Pay with Razorpay (India)
      </Button>
      <Button onClick={() => handlePayment("paypal")} disabled={isLoading} variant="outline" className="w-full">
        {isLoading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
        Pay with PayPal
      </Button>
    </div>
  )
}
