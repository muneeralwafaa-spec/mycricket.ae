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
      <body className="antialiased">
        <AuthProvider>{children}</AuthProvider>
      </body>
    </html>
  )
}
