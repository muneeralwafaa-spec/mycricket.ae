'use client'
import { createContext, useContext, useEffect, useState, useCallback } from 'react'
import { User, Session } from '@supabase/supabase-js'

interface Profile {
  id: string
  email: string
  full_name?: string
  phone?: string
  role: 'user' | 'vendor' | 'admin'
  avatar_url?: string
}

interface AuthContextType {
  user: User | null
  profile: Profile | null
  session: Session | null
  loading: boolean
  signIn: (email: string, password: string) => Promise<{ error: string | null }>
  signUp: (email: string, password: string, fullName: string, phone?: string) => Promise<{ error: string | null }>
  signOut: () => Promise<void>
  signInWithGoogle: () => Promise<void>
  resetPassword: (email: string) => Promise<{ error: string | null }>
  isVendor: boolean
  isAdmin: boolean
}

const AuthContext = createContext<AuthContextType>({
  user: null, profile: null, session: null, loading: true,
  signIn: async () => ({ error: null }),
  signUp: async () => ({ error: null }),
  signOut: async () => {},
  signInWithGoogle: async () => {},
  resetPassword: async () => ({ error: null }),
  isVendor: false, isAdmin: false,
})

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null)
  const [profile, setProfile] = useState<Profile | null>(null)
  const [session, setSession] = useState<Session | null>(null)
  const [loading, setLoading] = useState(true)
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  const getSupabase = useCallback(async () => {
    const { createClient } = await import('@/lib/supabase-browser')
    return createClient()
  }, [])

  const fetchProfile = useCallback(async (userId: string) => {
    const supabase = await getSupabase()
    const { data } = await supabase.from('profiles').select('*').eq('id', userId).single()
    if (data) setProfile(data as Profile)
  }, [getSupabase])

  useEffect(() => {
    if (!mounted) return
    let subscription: { unsubscribe: () => void } | null = null

    getSupabase().then(supabase => {
      supabase.auth.getSession().then(({ data: { session } }) => {
        setSession(session)
        setUser(session?.user ?? null)
        if (session?.user) fetchProfile(session.user.id)
        setLoading(false)
      })

      const { data } = supabase.auth.onAuthStateChange((_event, session) => {
        setSession(session)
        setUser(session?.user ?? null)
        if (session?.user) fetchProfile(session.user.id)
        else setProfile(null)
        setLoading(false)
      })
      subscription = data.subscription
    })

    return () => { subscription?.unsubscribe() }
  }, [mounted, getSupabase, fetchProfile])

  const signIn = async (email: string, password: string) => {
    const supabase = await getSupabase()
    const { error } = await supabase.auth.signInWithPassword({ email, password })
    return { error: error?.message ?? null }
  }

  const signUp = async (email: string, password: string, fullName: string, phone?: string) => {
    const supabase = await getSupabase()
    const { error } = await supabase.auth.signUp({
      email, password,
      options: {
        data: { full_name: fullName, phone: phone ?? '' },
        emailRedirectTo: `${process.env.NEXT_PUBLIC_SITE_URL}/api/auth/callback`,
      },
    })
    return { error: error?.message ?? null }
  }

  const signOut = async () => {
    const supabase = await getSupabase()
    await supabase.auth.signOut()
    setUser(null); setProfile(null); setSession(null)
  }

  const signInWithGoogle = async () => {
    const supabase = await getSupabase()
    await supabase.auth.signInWithOAuth({
      provider: 'google',
      options: { redirectTo: `${process.env.NEXT_PUBLIC_SITE_URL}/api/auth/callback` },
    })
  }

  const resetPassword = async (email: string) => {
    const supabase = await getSupabase()
    const { error } = await supabase.auth.resetPasswordForEmail(email, {
      redirectTo: `${process.env.NEXT_PUBLIC_SITE_URL}/reset-password`,
    })
    return { error: error?.message ?? null }
  }

  return (
    <AuthContext.Provider value={{
      user, profile, session, loading,
      signIn, signUp, signOut, signInWithGoogle, resetPassword,
      isVendor: profile?.role === 'vendor' || profile?.role === 'admin',
      isAdmin: profile?.role === 'admin',
    }}>
      {children}
    </AuthContext.Provider>
  )
}

export function useAuth() {
  return useContext(AuthContext)
}
