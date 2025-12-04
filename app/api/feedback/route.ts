export async function POST(request: Request) {
  try {
    const { feedback, timestamp } = await request.json()

    // Store feedback in your database or send email
    console.log("[Feedback] New feedback received:", { feedback, timestamp })

    // Example: Send to email or database
    // await saveToDatabase({ feedback, timestamp })

    return Response.json({ success: true, message: "Feedback received" })
  } catch (error) {
    console.error("[Feedback Error]:", error)
    return Response.json({ error: "Failed to submit feedback" }, { status: 500 })
  }
}
