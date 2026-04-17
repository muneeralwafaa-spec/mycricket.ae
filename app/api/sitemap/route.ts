import { NextResponse } from 'next/server'

const SITE = 'https://mycricket.ae'

const staticRoutes = [
  { url: '/',               priority: '1.0', changefreq: 'daily' },
  { url: '/academies',      priority: '0.9', changefreq: 'daily' },
  { url: '/coaches',        priority: '0.9', changefreq: 'daily' },
  { url: '/umpires',        priority: '0.8', changefreq: 'weekly' },
  { url: '/shop',           priority: '0.9', changefreq: 'daily' },
  { url: '/shop/bats',      priority: '0.8', changefreq: 'daily' },
  { url: '/shop/pads',      priority: '0.8', changefreq: 'daily' },
  { url: '/shop/gloves',    priority: '0.8', changefreq: 'daily' },
  { url: '/shop/helmets',   priority: '0.7', changefreq: 'daily' },
  { url: '/shop/balls',     priority: '0.7', changefreq: 'daily' },
  { url: '/shop/jerseys',   priority: '0.8', changefreq: 'daily' },
  { url: '/shop/custom',    priority: '0.8', changefreq: 'weekly' },
  { url: '/classifieds',    priority: '0.8', changefreq: 'hourly' },
  { url: '/tournaments',    priority: '0.8', changefreq: 'daily' },
  { url: '/tours',          priority: '0.8', changefreq: 'weekly' },
  { url: '/tours/register', priority: '0.7', changefreq: 'monthly' },
  { url: '/news',           priority: '0.8', changefreq: 'daily' },
  { url: '/jobs',           priority: '0.7', changefreq: 'daily' },
  { url: '/noticeboard',    priority: '0.7', changefreq: 'daily' },
  { url: '/national-team',  priority: '0.8', changefreq: 'weekly' },
  { url: '/councils',       priority: '0.7', changefreq: 'monthly' },
  { url: '/shops',          priority: '0.7', changefreq: 'weekly' },
  { url: '/list-business',  priority: '0.6', changefreq: 'monthly' },
]

export async function GET() {
  const today = new Date().toISOString().split('T')[0]

  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${staticRoutes.map(r => `  <url>
    <loc>${SITE}${r.url}</loc>
    <lastmod>${today}</lastmod>
    <changefreq>${r.changefreq}</changefreq>
    <priority>${r.priority}</priority>
  </url>`).join('\n')}
</urlset>`

  return new NextResponse(xml, {
    headers: {
      'Content-Type': 'application/xml',
      'Cache-Control': 'public, max-age=3600, s-maxage=3600',
    },
  })
}
