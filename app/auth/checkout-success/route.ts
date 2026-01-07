import { type NextRequest, NextResponse } from "next/server"

export async function GET(request: NextRequest) {
  const sessionId = request.nextUrl.searchParams.get("session_id")

  if (!sessionId) {
    return NextResponse.redirect(new URL("/pricing", request.url))
  }

  // Redirect to dashboard with success indicator
  return NextResponse.redirect(new URL("/dashboard?checkout_success=true", request.url))
}
