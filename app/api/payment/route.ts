import { type NextRequest, NextResponse } from "next/server"
import { stripe } from "@/lib/stripe"

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { plan, planType } = body

    const priceMap: Record<string, Record<string, string>> = {
      standard: {
        monthly: "price_1Sm5uBPbEDCmjAtiBG2dTK5P", // $5.99/mo
        annual: "price_1Sm5uUPbEDCmjAtisgHV0seJ", // $47.92/yr (20% off)
      },
      premium: {
        monthly: "price_1Smp3QPbEDCmjAtikX1XefQc", // $11.98/mo
        annual: "price_1Smp3nPbEDCmjAtijMPZe3Jp", // $114.86/yr (20% off)
      },
    }

    const priceId = priceMap[planType || "standard"]?.[plan] || priceMap.standard.monthly

    const session = await stripe.checkout.sessions.create({
      payment_method_types: ["card"],
      line_items: [
        {
          price: priceId,
          quantity: 1,
        },
      ],
      mode: "subscription",
      success_url: `${request.nextUrl.origin}/auth/callback?session_id={CHECKOUT_SESSION_ID}&plan=${planType}`,
      cancel_url: `${request.nextUrl.origin}/pricing`,
      metadata: {
        planType: planType || "standard",
        billingPeriod: plan,
      },
    })

    if (!session.url) {
      throw new Error("Failed to create Stripe session URL")
    }

    return NextResponse.json(
      {
        url: session.url,
        success: true,
      },
      { status: 200 },
    )
  } catch (error: any) {
    console.error("[v0] Stripe Checkout Error:", error)
    return NextResponse.json({ error: error.message || "Payment failed" }, { status: 500 })
  }
}
