import Link from "next/link"
import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "Refund Policy - timenow.sbs",
  description: "Our refund and satisfaction guarantee policy.",
}

export default function RefundPage() {
  return (
    <div className="min-h-screen bg-background">
      <header className="border-b border-border sticky top-0 z-50 bg-background/95 backdrop-blur">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center">
          <Link href="/" className="flex items-center gap-2 hover:opacity-80 transition">
            <div className="text-2xl font-bold text-primary">⏱</div>
            <span className="text-xl font-bold hidden sm:inline">timenow.sbs</span>
          </Link>
        </div>
      </header>

      <main className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-16">
        <h1 className="text-4xl font-bold mb-8">Refund Policy</h1>

        <div className="prose prose-invert max-w-none space-y-8">
          <section>
            <h2 className="text-2xl font-bold mb-4">1. 30-Day Money Back Guarantee</h2>
            <p className="text-muted-foreground">
              We offer a full 30-day money back guarantee on all Pro plan subscriptions. If you are not completely
              satisfied with your purchase, we will refund your money, no questions asked.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold mb-4">2. How to Request a Refund</h2>
            <p className="text-muted-foreground mb-3">To request a refund, please:</p>
            <ol className="list-decimal list-inside space-y-2 text-muted-foreground">
              <li>Contact us at support@timenow.sbs with your order details</li>
              <li>Provide a brief explanation of why you'd like a refund</li>
              <li>We will process your refund within 5-7 business days</li>
            </ol>
          </section>

          <section>
            <h2 className="text-2xl font-bold mb-4">3. Refund Conditions</h2>
            <p className="text-muted-foreground mb-3">Refunds are available under the following conditions:</p>
            <ul className="list-disc list-inside space-y-2 text-muted-foreground">
              <li>The request is made within 30 days of the initial purchase</li>
              <li>You have not engaged in fraudulent activity</li>
              <li>You have not abused the free trial period</li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-bold mb-4">4. Refund Processing</h2>
            <p className="text-muted-foreground">
              Once approved, refunds will be processed to your original payment method within 5-7 business days.
              Depending on your bank, it may take an additional 2-3 business days for the funds to appear in your
              account.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold mb-4">5. Subscription Cancellation</h2>
            <p className="text-muted-foreground">
              You can cancel your subscription at any time from your account settings. Upon cancellation, you will
              retain access to Pro features until the end of your current billing period. No refund will be issued for
              partial months.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold mb-4">6. Contact Us</h2>
            <p className="text-muted-foreground">
              If you have questions about our refund policy, please contact us at{" "}
              <a href="mailto:support@timenow.sbs" className="text-primary hover:underline">
                support@timenow.sbs
              </a>
            </p>
          </section>
        </div>
      </main>

      <footer className="border-t border-border mt-16">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8 text-center text-sm text-muted-foreground">
          <p>&copy; 2025 timenow.sbs. All rights reserved.</p>
        </div>
      </footer>
    </div>
  )
}
