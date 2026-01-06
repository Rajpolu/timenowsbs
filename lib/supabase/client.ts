import { createBrowserClient } from "@supabase/ssr"

let supabaseClientInstance: ReturnType<typeof createBrowserClient> | null = null

export function getSupabaseClient() {
  if (!supabaseClientInstance) {
    supabaseClientInstance = createBrowserClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL!,
      process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    )
  }
  return supabaseClientInstance
}

// Keep createClient for backward compatibility but use singleton internally
export function createClient() {
  return getSupabaseClient()
}
