import { type NextRequest, NextResponse } from "next/server"
import { stripe } from "@/lib/stripe"
import { createServerClient } from "@supabase/ssr"
import { cookies } from "next/headers"

const webhookSecret = process.env.STRIPE_WEBHOOK_SECRET || ""

async function updateSubscriptionInDB(customerId: string, planType: string, status: string) {
  try {
    const cookieStore = await cookies()
    const supabase = createServerClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL!,
      process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
      {
        cookies: {
          getAll() {
            return cookieStore.getAll()
          },
          setAll(cookiesToSet) {
            cookiesToSet.forEach(({ name, value, options }) => {
              cookieStore.set(name, value, options)
            })
          },
        },
      },
    )

    const { data: subscription, error: findError } = await supabase
      .from("subscriptions")
      .select("user_id")
      .eq("stripe_customer_id", customerId)
      .single()

    if (findError || !subscription) {
      console.error("[v0] Subscription not found for customer:", customerId)
      return
    }

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
    }
  } catch (error) {
    console.error("[v0] Error in updateSubscriptionInDB:", error)
  }
}

export async function POST(request: NextRequest) {
  const body = await request.text()
  const signature = request.headers.get("stripe-signature") || ""

  try {
    const event = stripe.webhooks.constructEvent(body, signature, webhookSecret)

    switch (event.type) {
      case "customer.subscription.created":
      case "customer.subscription.updated": {
        const subscription = event.data.object as any
        const planType = subscription.metadata?.planType || "standard"
        await updateSubscriptionInDB(subscription.customer, planType, subscription.status)
        break
      }

      case "customer.subscription.deleted": {
        const subscription = event.data.object as any
        await updateSubscriptionInDB(subscription.customer, "free", "canceled")
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
    return NextResponse.json({ error: "Webhook failed" }, { status: 400 })
  }
}
