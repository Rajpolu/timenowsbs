import { type NextRequest, NextResponse } from "next/server"
import { stripe } from "@/lib/stripe"
import { createClient } from "@supabase/supabase-js"

const webhookSecret = process.env.STRIPE_WEBHOOK_SECRET || ""

async function updateSubscriptionInDB(customerId: string, planType: string, status: string) {
  try {
    const supabase = createClient(process.env.NEXT_PUBLIC_SUPABASE_URL!, process.env.SUPABASE_SERVICE_ROLE_KEY!)

    // First, find the user by Stripe customer ID
    const { data: subscription, error: findError } = await supabase
      .from("subscriptions")
      .select("user_id")
      .eq("stripe_customer_id", customerId)
      .single()

    if (findError || !subscription) {
      console.error("[v0] Subscription not found for customer:", customerId, findError)
      return
    }

    // Update the subscription with new plan and status
    const { error: updateError } = await supabase
      .from("subscriptions")
      .update({
        status: status === "active" ? "active" : "inactive",
        plan_name: planType,
        updated_at: new Date().toISOString(),
      })
      .eq("user_id", subscription.user_id)

    if (updateError) {
      console.error("[v0] Error updating subscription:", updateError)
    } else {
      console.log("[v0] Successfully updated subscription for user:", subscription.user_id, "Plan:", planType)
    }
  } catch (error) {
    console.error("[v0] Error in updateSubscriptionInDB:", error)
  }
}

function determinePlanFromPrice(priceId: string | undefined): string | undefined {
  // Map actual Stripe price IDs to plan names
  const priceMap: Record<string, string> = {
    price_1Sm5uBPbEDCmjAtiBG2dTK5P: "standard", // Standard monthly
    price_1Sm5uUPbEDCmjAtisgHV0seJ: "standard", // Standard annual
    price_1Smp3QPbEDCmjAtikX1XefQc: "premium", // Premium monthly
    price_1Smp3nPbEDCmjAtijMPZe3Jp: "premium", // Premium annual
  }
  return priceMap[priceId || ""]
}

export async function POST(request: NextRequest) {
  if (!webhookSecret) {
    console.error("[v0] STRIPE_WEBHOOK_SECRET is not configured")
    return NextResponse.json({ error: "Webhook secret not configured" }, { status: 500 })
  }

  const body = await request.text()
  const signature = request.headers.get("stripe-signature") || ""

  try {
    const event = stripe.webhooks.constructEvent(body, signature, webhookSecret)

    switch (event.type) {
      case "customer.subscription.created":
      case "customer.subscription.updated": {
        const subscription = event.data.object as any
        const planType =
          subscription.metadata?.planType || determinePlanFromPrice(subscription.items.data[0]?.price?.id) || "standard"

        console.log("[v0] Processing subscription event:", event.type, "Plan:", planType)
        await updateSubscriptionInDB(subscription.customer, planType, subscription.status)
        break
      }

      case "customer.subscription.deleted": {
        const subscription = event.data.object as any
        console.log("[v0] Processing subscription deletion for customer:", subscription.customer)
        await updateSubscriptionInDB(subscription.customer, "free", "canceled")
        break
      }

      case "checkout.session.completed": {
        const session = event.data.object as any
        console.log("[v0] Checkout session completed:", session.id, "Customer:", session.customer)
        break
      }

      case "invoice.payment_succeeded": {
        console.log("[v0] Payment succeeded for invoice:", event.data.object.id)
        break
      }

      case "invoice.payment_failed": {
        console.log("[v0] Payment failed for invoice:", event.data.object.id)
        break
      }

      default:
        console.log(`[v0] Unhandled event type: ${event.type}`)
    }

    return NextResponse.json({ received: true }, { status: 200 })
  } catch (error: any) {
    console.error("[v0] Webhook Error:", error.message)
    // Return 400 for signature verification failures so Stripe retries
    return NextResponse.json({ error: "Webhook failed" }, { status: 400 })
  }
}
