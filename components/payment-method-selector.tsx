"use client"

import { useState } from "react"
import { Loader2 } from "lucide-react"

interface PaymentMethodSelectorProps {
  price: number
  plan: "monthly" | "annual"
  onSuccess?: () => void
  onError?: (error: string) => void
}

export function PaymentMethodSelector({ price, plan, onSuccess, onError }: PaymentMethodSelectorProps) {
  const [selectedMethod, setSelectedMethod] = useState<"stripe" | "razorpay" | "paypal" | null>(null)
  const [isLoading, setIsLoading] = useState(false)

  const paymentMethods = [
    {
      id: "stripe",
      label: "Stripe",
      description: "Credit/Debit cards (International)",
      icon: "💳",
    },
    {
      id: "razorpay",
      label: "Razorpay",
      description: "UPI, Cards (India)",
      icon: "🇮🇳",
    },
    {
      id: "paypal",
      label: "PayPal",
      description: "PayPal balance (International)",
      icon: "🌐",
    },
  ]

  const handlePayment = async () => {
    if (!selectedMethod) return

    setIsLoading(true)
    try {
      const response = await fetch("/api/payment", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "x-payment-provider": selectedMethod,
        },
        body: JSON.stringify({
          amount: price,
          currency: selectedMethod === "razorpay" ? "INR" : "USD",
          plan,
          provider: selectedMethod,
        }),
      })

      if (!response.ok) throw new Error("Payment initialization failed")

      onSuccess?.()
    } catch (error) {
      console.error("[v0] Payment error:", error)
      onError?.(error instanceof Error ? error.message : "Payment failed")
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="space-y-4">
      <h3 className="font-semibold text-black mb-3">Choose Payment Method</h3>

      <div className="grid grid-cols-1 gap-3">
        {paymentMethods.map((method) => (
          <button
            key={method.id}
            onClick={() => setSelectedMethod(method.id as "stripe" | "razorpay" | "paypal")}
            className={`p-4 rounded-lg border-2 transition text-left ${
              selectedMethod === method.id
                ? "border-[#F4C430] bg-[#F4C430]/10"
                : "border-black/10 bg-white hover:border-black/20"
            }`}
          >
            <div className="flex items-center gap-3">
              <span className="text-2xl">{method.icon}</span>
              <div className="flex-1">
                <div className="font-semibold text-black">{method.label}</div>
                <div className="text-sm text-black/60">{method.description}</div>
              </div>
              {selectedMethod === method.id && <div className="text-[#F4C430]">✓</div>}
            </div>
          </button>
        ))}
      </div>

      <button
        onClick={handlePayment}
        disabled={!selectedMethod || isLoading}
        className="w-full px-4 py-3 bg-[#F4C430] text-black rounded-lg font-semibold hover:bg-[#E0B420] transition disabled:opacity-50 flex items-center justify-center gap-2"
      >
        {isLoading && <Loader2 className="w-4 h-4 animate-spin" />}
        {isLoading ? "Processing..." : `Pay $${price.toFixed(2)}`}
      </button>
    </div>
  )
}
