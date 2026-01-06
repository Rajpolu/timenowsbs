import { type NextRequest, NextResponse } from "next/server"
import { stripe } from "@/lib/stripe"

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { plan } = body

    const priceId = plan === "annual" ? "price_1Sm5uUPbEDCmjAtisgHV0seJ" : "price_1Sm5uBPbEDCmjAtiBG2dTK5P"

    // The user provided the Stripe integration, so we use the real SDK
    const session = await stripe.checkout.sessions.create({
      payment_method_types: ["card"],
      line_items: [
        {
          price: priceId,
          quantity: 1,
        },
      ],
      mode: "subscription",
      // Use the origin from headers to ensure correct redirect URLs in preview
      success_url: `${request.nextUrl.origin}/dashboard?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${request.nextUrl.origin}/pricing`,
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
