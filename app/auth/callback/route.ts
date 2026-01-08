import { createServerClient } from "@supabase/ssr"
import { cookies } from "next/headers"
import { type NextRequest, NextResponse } from "next/server"
import { createOrUpdateSubscription } from "@/app/actions/subscription-actions"

export async function GET(request: NextRequest) {
  const requestUrl = new URL(request.url)
  const code = requestUrl.searchParams.get("code")
  const sessionId = requestUrl.searchParams.get("session_id")
  const plan = requestUrl.searchParams.get("plan")

  if (code) {
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
            try {
              cookiesToSet.forEach(({ name, value, options }) => cookieStore.set(name, value, options))
            } catch {
              // Handle errors gracefully
            }
          },
        },
      },
    )

    const { error } = await supabase.auth.exchangeCodeForSession(code)
    if (!error) {
      const {
        data: { user },
      } = await supabase.auth.getUser()

      if (user) {
        await createOrUpdateSubscription(user.id, user.email || "", "free")
      }

      return NextResponse.redirect(new URL("/dashboard", requestUrl.origin))
    }
  }

  if (sessionId && plan) {
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
            try {
              cookiesToSet.forEach(({ name, value, options }) => cookieStore.set(name, value, options))
            } catch {
              // Handle errors gracefully
            }
          },
        },
      },
    )

    const {
      data: { user },
    } = await supabase.auth.getUser()

    if (user) {
      // Update subscription with the purchased plan
      await createOrUpdateSubscription(user.id, user.email || "", plan as "standard" | "premium")
      console.log("[v0] Subscription updated after checkout:", { userId: user.id, plan })
    }

    return NextResponse.redirect(new URL("/dashboard?upgraded=true", requestUrl.origin))
  }

  return NextResponse.redirect(new URL("/auth", requestUrl.origin))
}
