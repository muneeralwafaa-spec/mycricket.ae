# MyCricket.ae — UAE's #1 Cricket Platform

Full-stack Next.js platform: facilities, coaches, classifieds, tours connect, live scores, noticeboard and more.

## Stack
- **Frontend**: Next.js 15 + TypeScript + Tailwind CSS
- **Database**: Supabase (PostgreSQL + RLS + Auth + Storage)
- **Hosting**: Vercel + Cloudflare
- **Email**: Resend | **Payments**: Telr | **Scores**: CricAPI

## Quick Start
```bash
cp .env.local.example .env.local   # fill in Supabase keys
npm install
npm run dev                         # http://localhost:3000
```

## Supabase Setup
1. Create project at supabase.com
2. Run `lib/schema.sql` in SQL Editor
3. Create storage buckets: facilities, coaches, classifieds, shops, news

## Deploy
```bash
vercel
# Add env vars in Vercel dashboard
# Point mycricket.ae DNS → Vercel via Cloudflare
```

## Pages
/ · /academies · /coaches · /classifieds · /tournaments · /tours · /news · /jobs · /noticeboard · /national-team · /councils · /register

## API Routes
/api/academies · /api/classifieds · /api/coaches · /api/tours · /api/notices

Built with ♥ for UAE Cricket by Daidu.ai
