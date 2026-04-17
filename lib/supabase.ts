// Re-export browser client (safe to use in client components)
export { createClient } from './supabase-browser'

// Server client — only import this in Server Components / API routes
export { createServerSupabaseClient, createAdminClient } from './supabase-server'
