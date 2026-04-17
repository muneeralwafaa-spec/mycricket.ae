import { type ClassValue, clsx } from 'clsx'
import { twMerge } from 'tailwind-merge'
import { Emirate } from '@/types'

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export const EMIRATES: { value: Emirate; label: string }[] = [
  { value: 'dubai', label: 'Dubai' },
  { value: 'abu-dhabi', label: 'Abu Dhabi' },
  { value: 'sharjah', label: 'Sharjah' },
  { value: 'ajman', label: 'Ajman' },
  { value: 'ras-al-khaimah', label: 'Ras Al Khaimah' },
  { value: 'fujairah', label: 'Fujairah' },
  { value: 'umm-al-quwain', label: 'Umm Al Quwain' },
]

export const FACILITY_TYPES = [
  { value: 'academy', label: 'Cricket Academy' },
  { value: 'nets', label: 'Nets & Practice Facility' },
  { value: 'ground', label: 'Cricket Ground' },
  { value: 'indoor-centre', label: 'Indoor Centre' },
  { value: 'sports-complex', label: 'Sports Complex' },
]

export const CLASSIFIED_CATEGORIES = [
  { value: 'bats', label: 'Bats', icon: '🏏' },
  { value: 'pads', label: 'Batting Pads', icon: '🦺' },
  { value: 'gloves', label: 'Gloves', icon: '🥊' },
  { value: 'helmets', label: 'Helmets', icon: '⛑️' },
  { value: 'balls', label: 'Balls', icon: '⚾' },
  { value: 'kits', label: 'Full Kits', icon: '👕' },
  { value: 'shoes', label: 'Shoes', icon: '👟' },
  { value: 'clothing', label: 'Clothing', icon: '🎽' },
  { value: 'accessories', label: 'Accessories', icon: '🎒' },
  { value: 'other', label: 'Other', icon: '📦' },
]

export const TOUR_DESTINATIONS = [
  { code: 'IN', flag: '🇮🇳', name: 'India' },
  { code: 'PK', flag: '🇵🇰', name: 'Pakistan' },
  { code: 'LK', flag: '🇱🇰', name: 'Sri Lanka' },
  { code: 'BD', flag: '🇧🇩', name: 'Bangladesh' },
  { code: 'GB', flag: '🏴󠁧󠁢󠁥󠁮󠁧󠁿', name: 'England' },
  { code: 'AU', flag: '🇦🇺', name: 'Australia' },
  { code: 'ZA', flag: '🇿🇦', name: 'South Africa' },
  { code: 'NZ', flag: '🇳🇿', name: 'New Zealand' },
  { code: 'WI', flag: '🏝️', name: 'West Indies' },
  { code: 'KE', flag: '🇰🇪', name: 'Kenya' },
  { code: 'OM', flag: '🇴🇲', name: 'Oman' },
  { code: 'QA', flag: '🇶🇦', name: 'Qatar' },
]

export const GOVERNING_BODIES = [
  {
    id: 'ecb',
    name: 'Emirates Cricket Board',
    short_name: 'ECB',
    description: 'The governing body for cricket in the UAE.',
    scope: 'national' as const,
    website: 'https://www.emiratescricket.com',
    icon: '🏛️',
  },
  {
    id: 'icc',
    name: 'International Cricket Council',
    short_name: 'ICC',
    description: 'The global governing body for cricket, headquartered in Dubai.',
    scope: 'international' as const,
    website: 'https://www.icc-cricket.com',
    icon: '🌍',
  },
  {
    id: 'adc',
    name: 'Abu Dhabi Cricket',
    short_name: 'ADC',
    description: 'Cricket development body for Abu Dhabi.',
    scope: 'local' as const,
    website: 'https://www.abudhabicricket.ae',
    icon: '🏟️',
  },
  {
    id: 'sca',
    name: 'Sharjah Cricket Association',
    short_name: 'SCA',
    description: 'Governing body for cricket in Sharjah.',
    scope: 'local' as const,
    icon: '🏏',
  },
  {
    id: 'acc',
    name: 'Asia Cricket Council',
    short_name: 'ACC',
    description: 'Regional governing body for Asian cricket.',
    scope: 'regional' as const,
    website: 'https://www.asiancricket.org',
    icon: '🌙',
  },
  {
    id: 'dsc',
    name: 'Dubai Sports Council',
    short_name: 'DSC',
    description: 'Sports development authority for Dubai.',
    scope: 'local' as const,
    website: 'https://www.dubaisportscouncil.ae',
    icon: '📋',
  },
]

export function formatAED(amount: number): string {
  return `AED ${amount.toLocaleString()}`
}

export function getEmirateName(value: Emirate): string {
  return EMIRATES.find(e => e.value === value)?.label ?? value
}

export function slugify(text: string): string {
  return text.toLowerCase().replace(/\s+/g, '-').replace(/[^\w-]+/g, '')
}

export function timeAgo(date: string): string {
  const seconds = Math.floor((Date.now() - new Date(date).getTime()) / 1000)
  if (seconds < 60) return 'just now'
  if (seconds < 3600) return `${Math.floor(seconds / 60)}m ago`
  if (seconds < 86400) return `${Math.floor(seconds / 3600)}h ago`
  return `${Math.floor(seconds / 86400)}d ago`
}

// ── SHOP CONSTANTS ────────────────────────────────────────

export const PRODUCT_CATEGORIES = [
  { id: 'bats',        name: 'Bats',           icon: '🏏', slug: 'bats' },
  { id: 'pads',        name: 'Batting Pads',   icon: '🦺', slug: 'pads' },
  { id: 'gloves',      name: 'Gloves',         icon: '🥊', slug: 'gloves' },
  { id: 'helmets',     name: 'Helmets',        icon: '⛑️', slug: 'helmets' },
  { id: 'balls',       name: 'Balls',          icon: '⚾', slug: 'balls' },
  { id: 'shoes',       name: 'Shoes',          icon: '👟', slug: 'shoes' },
  { id: 'jerseys',     name: 'Jerseys & Kits', icon: '🎽', slug: 'jerseys' },
  { id: 'clothing',    name: 'Clothing',       icon: '👕', slug: 'clothing' },
  { id: 'accessories', name: 'Accessories',    icon: '🎒', slug: 'accessories' },
  { id: 'bundles',     name: 'Bundles',        icon: '📦', slug: 'bundles' },
  { id: 'custom',      name: 'Custom Print',   icon: '🏷️', slug: 'custom' },
]

export const CRICKET_BRANDS = [
  'Gray Nicolls', 'Kookaburra', 'SS Ton', 'SG', 'Gunn & Moore',
  'Adidas', 'Nike', 'New Balance', 'Puma', 'Shrey', 'Masuri',
  'MRF', 'Spartan', 'Slazenger', 'CA Sports', 'BAS',
]

export const ORDER_STATUS_LABELS: Record<string, { label: string; color: string }> = {
  pending:    { label: 'Pending',    color: '#854F0B' },
  confirmed:  { label: 'Confirmed',  color: '#185FA5' },
  processing: { label: 'Processing', color: '#534AB7' },
  shipped:    { label: 'Shipped',    color: '#0F6E56' },
  delivered:  { label: 'Delivered',  color: '#3B6D11' },
  cancelled:  { label: 'Cancelled',  color: '#A32D2D' },
  refunded:   { label: 'Refunded',   color: '#5F5E5A' },
}

export const UAE_SHIPPING_FEE = 25   // AED flat rate
export const FREE_SHIPPING_THRESHOLD = 200  // AED
