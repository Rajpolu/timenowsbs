"use server"

import { createServerClient } from "@supabase/ssr"
import { cookies } from "next/headers"
import type { SubscriptionStatus } from "@/lib/subscription"

export { getSubscriptionStatus as getSubscriptionStatusAction }

export async function getSubscriptionStatus(userId: string): Promise<SubscriptionStatus> {
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

    const { data, error } = await supabase.from("subscriptions").select("*").eq("user_id", userId).single()

    if (error) {
      console.log("[v0] No subscription found for user")
      return { isPremium: false, isStandard: false, status: "free", plan: "free" }
    }

    const isPremium = data?.status === "active" && data?.plan_name === "premium"
    const isStandard = data?.status === "active" && data?.plan_name === "standard"

    return {
      isPremium,
      isStandard,
      status: data?.status || "free",
      plan: data?.plan_name || "free",
      stripeSubscriptionId: data?.stripe_subscription_id,
      stripeCustomerId: data?.stripe_customer_id,
    }
  } catch (error) {
    console.error("[v0] Error fetching subscription:", error)
    return { isPremium: false, isStandard: false, status: "free", plan: "free" }
  }
}

export async function createOrUpdateSubscription(
  userId: string,
  stripeCustomerId: string,
  plan: "free" | "standard" | "premium",
) {
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

    const { data, error } = await supabase
      .from("subscriptions")
      .upsert(
        {
          user_id: userId,
          stripe_customer_id: stripeCustomerId,
          status: plan === "free" ? "free" : "active",
          plan_name: plan,
          updated_at: new Date().toISOString(),
        },
        { onConflict: "user_id" },
      )
      .select()
      .single()

    if (error) {
      console.error("[v0] Error updating subscription:", error)
      return null
    }

    return data
  } catch (error) {
    console.error("[v0] Error in createOrUpdateSubscription:", error)
    return null
  }
}
