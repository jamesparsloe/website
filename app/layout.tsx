import type { Metadata } from "next"
import { Analytics } from '@vercel/analytics/next';
import { Source_Sans_3, Work_Sans, Karla, Crimson_Pro, Lora, Fraunces, Source_Serif_4, Playfair, Crimson_Text } from "next/font/google"
import "./globals.css"

const font = Crimson_Text({ subsets: ["latin"], weight: ["400", "600", "700"] })

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
    <html lang="en">
      <body className={`${font.className} mx-4 sm:mx-8 sm:py-8 py-16 bg-white`}>
        <div className="prose prose-sm sm:prose-base lg:prose-lg xl:prose-xl prose-headings:no-underline prose-a:no-underline mx-auto max-w-full sm:max-w-2xl lg:max-w-4xl">
          {children}
        </div>
        <Analytics />
      </body>
    </html>
  )
}
