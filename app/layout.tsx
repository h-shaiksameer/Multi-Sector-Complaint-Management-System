import type React from "react"
import type { Metadata } from "next"
import { Inter } from "next/font/google"
import "./globals.css"
import Navbar from "@/components/layout/navbar"
import { Toaster } from "@/components/ui/toaster"
import GeminiChat from "@/components/chatbot/gemini-chat"

const inter = Inter({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "ComplaintPortal - Multi-Sector Public Complaint Management",
  description:
    "File and track complaints for Food, Healthcare, and Hospitality services with our premium complaint management platform.",
  keywords: "complaints, food safety, healthcare, hospitality, public services",
  generator: "v0.dev",
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <head>
        <link
          rel="icon"
          href="https://i.postimg.cc/QxbmBfBM/Leonardo-Phoenix-09-Create-a-modern-minimalistic-and-professio-0-1.jpg"
          type="image/jpeg"
        />
      </head>
      <body className={inter.className}>
        <Navbar />
        <main className="pt-16">{children}</main>
        <GeminiChat />
        <Toaster />
      </body>
    </html>
  )
}
