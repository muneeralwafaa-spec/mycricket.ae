import { NextResponse } from 'next/server'

export async function GET() {
  const robots = `User-agent: *
Allow: /

# Disallow admin and private areas
Disallow: /admin/
Disallow: /vendor/
Disallow: /account/
Disallow: /api/
Disallow: /login
Disallow: /register

# Sitemap
Sitemap: https://mycricket.ae/sitemap.xml
`

  return new NextResponse(robots, {
    headers: {
      'Content-Type': 'text/plain',
      'Cache-Control': 'public, max-age=86400',
    },
  })
}
