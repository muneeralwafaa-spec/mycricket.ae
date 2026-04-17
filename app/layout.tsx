import type { Metadata } from 'next'
import './globals.css'
import { AuthProvider } from '@/components/auth/AuthProvider'

export const metadata: Metadata = {
  title: { default: "MyCricket.ae — UAE's Home of Cricket", template: '%s | MyCricket.ae' },
  description: "Find cricket academies, coaches, umpires, gear shops, classifieds, tournaments, and cricket tours across the UAE.",
  keywords: ['cricket UAE', 'cricket academy Dubai', 'cricket coach UAE', 'cricket nets Dubai'],
  metadataBase: new URL('https://mycricket.ae'),
  openGraph: { type: 'website', locale: 'en_AE', siteName: 'MyCricket.ae' },
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Bebas+Neue&family=DM+Sans:wght@300;400;500&family=DM+Mono:wght@400;500&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className="antialiased">
        <AuthProvider>{children}</AuthProvider>
      </body>
    </html>
  )
}
