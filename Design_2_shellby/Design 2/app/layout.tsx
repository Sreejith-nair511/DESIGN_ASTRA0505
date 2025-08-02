import type React from "react"
import type { Metadata } from "next"
import { JetBrains_Mono } from "next/font/google"
import "./globals.css"

const jetbrainsMono = JetBrains_Mono({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "[ADASTRA_COMMAND] - Classified Drone Operations",
  description: "RESTRICTED ACCESS - Elite robotics and drone operations center. Security clearance required.",
  keywords: "classified, drones, robotics, military, operations, terminal, command center",
  viewport: "width=device-width, initial-scale=1, maximum-scale=1, user-scalable=no",
    generator: 'v0.dev'
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className="dark scroll-smooth">
      <body className={`${jetbrainsMono.className} antialiased bg-black`}>{children}</body>
    </html>
  )
}
