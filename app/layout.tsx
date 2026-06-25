import type React from "react"
import type { Metadata, Viewport } from "next"
import { Geist, Geist_Mono } from "next/font/google"
import { Analytics } from "@vercel/analytics/next"
import { ThemeProvider } from "@/components/theme-provider"
import "./globals.css"

const _geist = Geist({ subsets: ["latin"] })
const _geistMono = Geist_Mono({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "timenow.sbs - Time Tools for Productivity",
  description:
    "Master your time with timenow.sbs. Timezone converter, Pomodoro, Daily Planner, Timer, Stopwatch, and World Clock. Free forever or upgrade to Pro. Fast, accessible, and built for every device.",
  keywords: [
    "timezone converter",
    "pomodoro timer",
    "daily planner",
    "time tracking",
    "productivity tools",
    "world clock",
    "stopwatch",
    "time management",
    "productivity app",
    "focus timer",
  ],
  openGraph: {
    title: "timenow.sbs - Master Your Time",
    description: "All the time tools you need to stay productive, organized, and on schedule.",
    type: "website",
    url: "https://timenow.sbs",
    siteName: "timenow.sbs",
    images: [
      {
        url: "/logo.png",
        width: 512,
        height: 512,
        alt: "timenow.sbs - Time Tools for Productivity",
      },
    ],
  },
  alternates: {
    canonical: "https://timenow.sbs",
  },
  icons: {
    icon: [
      {
        url: "/favicon-16x16.png",
        sizes: "16x16",
        type: "image/png",
      },
      {
        url: "/favicon-32x32.png",
        sizes: "32x32",
        type: "image/png",
      },
      {
        url: "/android-chrome-192x192.png",
        sizes: "192x192",
        type: "image/png",
      },
      {
        url: "/android-chrome-512x512.png",
        sizes: "512x512",
        type: "image/png",
      },
      {
        url: "/favicon.ico",
        sizes: "any",
      },
    ],
    apple: {
      url: "/apple-touch-icon.png",
      sizes: "180x180",
      type: "image/png",
    },
    shortcut: "/favicon-32x32.png",
  },
  robots: {
    index: true,
    follow: true,
  },
  generator: "v0.app",
}

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
  userScalable: true,
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#fbbf24" },
    { media: "(prefers-color-scheme: dark)", color: "#fbbf24" },
  ],
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <meta name="apple-mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-status-bar-style" content="black-translucent" />
        <meta name="format-detection" content="telephone=no" />
        <link rel="sitemap" type="application/xml" href="/sitemap.xml" />
        
        {/* JSON-LD Schema Markup */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "WebApplication",
              "name": "timenow.sbs",
              "description": "Master your time with timenow.sbs. Timezone converter, Pomodoro, Daily Planner, Timer, Stopwatch, and World Clock.",
              "url": "https://timenow.sbs",
              "applicationCategory": "ProductivityApplication",
              "offers": {
                "@type": "Offer",
                "price": "0",
                "priceCurrency": "USD",
                "category": "Free"
              },
              "author": {
                "@type": "Organization",
                "name": "timenow.sbs",
                "url": "https://timenow.sbs"
              },
              "image": "/logo.png",
              "aggregateRating": {
                "@type": "AggregateRating",
                "ratingValue": "4.8",
                "ratingCount": "500+"
              }
            })
          }}
        />
      </head>
      <body className={`font-sans antialiased`}>
        <ThemeProvider attribute="class" defaultTheme="dark" enableSystem>
          {children}
        </ThemeProvider>
        <Analytics />
      </body>
    </html>
  )
}
