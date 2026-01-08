export type SubscriptionStatus = {
  isPremium: boolean
  isStandard: boolean
  status: "free" | "active"
  plan: "free" | "standard" | "premium"
  stripeSubscriptionId?: string
  stripeCustomerId?: string
}
