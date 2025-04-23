import type { Metadata } from "next"
import { Analytics } from '@vercel/analytics/next';
import { JetBrains_Mono } from "next/font/google"
import 'katex/dist/katex.min.css'
import "./globals.css"

const jetbrainsMono = JetBrains_Mono({ subsets: ["latin"] })

export const metadata: Metadata = {
  metadataBase: new URL('https://jamesparsloe.com'),
  alternates: {
    canonical: '/'
  },
  title: {
    default: 'James Parsloe',
    template: '%s | James Parsloe'
  },
  description: "It from bit",
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html
      lang="en"
      className="prose prose-headings:no-underline prose-a:no-underline mx-auto max-w-full sm:max-w-2xl lg:max-w-4xl"
    >
      <body className={`${jetbrainsMono.className} m-4 md:m-8`}>
        {children}
        <Analytics />
      </body>
    </html>
  )
}
