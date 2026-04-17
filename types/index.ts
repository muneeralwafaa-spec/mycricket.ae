// ── ENUMS ──────────────────────────────────────────────
export type Emirate = 'dubai' | 'abu-dhabi' | 'sharjah' | 'ajman' | 'ras-al-khaimah' | 'fujairah' | 'umm-al-quwain'

export type ListingStatus = 'pending' | 'active' | 'suspended' | 'expired'

export type UserRole = 'user' | 'vendor' | 'admin'

export type ClassifiedCondition = 'new' | 'used' | 'refurbished'

export type TourDirection = 'uae-outbound' | 'uae-inbound'

export type NoticeType = 'tryout' | 'announcement' | 'urgent' | 'tournament' | 'job'

// ── USER ──────────────────────────────────────────────
export interface User {
  id: string
  email: string
  full_name: string
  phone?: string
  emirate?: Emirate
  role: UserRole
  avatar_url?: string
  created_at: string
}

// ── FACILITY / ACADEMY ────────────────────────────────
export interface Facility {
  id: string
  name: string
  slug: string
  type: 'academy' | 'nets' | 'ground' | 'indoor-centre' | 'sports-complex'
  description: string
  emirate: Emirate
  area: string
  address: string
  lat?: number
  lng?: number
  phone?: string
  email?: string
  website?: string
  whatsapp?: string
  images: string[]
  facilities: string[]        // e.g. ['turf wicket', 'indoor nets', 'gym']
  age_groups: string[]        // e.g. ['U8', 'U12', 'Adults']
  price_from?: number
  price_currency: 'AED'
  coaches_count?: number
  is_featured: boolean
  is_verified: boolean
  status: ListingStatus
  owner_id: string
  rating?: number
  review_count: number
  created_at: string
  updated_at: string
}

// ── COACH ─────────────────────────────────────────────
export interface Coach {
  id: string
  user_id: string
  full_name: string
  slug: string
  specialisation: string[]    // e.g. ['batting', 'bowling', 'fielding']
  bio: string
  emirate: Emirate
  area?: string
  phone?: string
  email?: string
  whatsapp?: string
  photo_url?: string
  certifications: string[]    // e.g. ['ICC Level 2', 'Cricket Australia Level 3']
  experience_years: number
  nationality?: string
  languages: string[]
  age_groups: string[]
  hourly_rate?: number
  price_currency: 'AED'
  facility_id?: string        // linked academy if applicable
  is_featured: boolean
  is_verified: boolean
  status: ListingStatus
  rating?: number
  review_count: number
  created_at: string
}

// ── UMPIRE ────────────────────────────────────────────
export interface Umpire {
  id: string
  user_id: string
  full_name: string
  slug: string
  bio?: string
  emirate: Emirate
  phone?: string
  email?: string
  whatsapp?: string
  photo_url?: string
  certifications: string[]
  experience_years: number
  formats: string[]           // e.g. ['T20', 'ODI', 'Club']
  availability: string        // free text for now
  is_featured: boolean
  is_verified: boolean
  status: ListingStatus
  rating?: number
  review_count: number
  created_at: string
}

// ── SHOP ──────────────────────────────────────────────
export interface Shop {
  id: string
  name: string
  slug: string
  description: string
  emirate: Emirate
  area: string
  address?: string
  phone?: string
  email?: string
  website?: string
  whatsapp?: string
  images: string[]
  shop_type: 'physical' | 'online' | 'both'
  brands: string[]            // e.g. ['Gray Nicolls', 'Kookaburra', 'SG']
  is_featured: boolean
  is_verified: boolean
  status: ListingStatus
  rating?: number
  review_count: number
  created_at: string
}

// ── CLASSIFIED ────────────────────────────────────────
export interface Classified {
  id: string
  title: string
  description: string
  category: 'bats' | 'pads' | 'gloves' | 'helmets' | 'balls' | 'kits' | 'shoes' | 'clothing' | 'accessories' | 'other'
  condition: ClassifiedCondition
  price: number
  price_currency: 'AED'
  is_negotiable: boolean
  emirate: Emirate
  area?: string
  images: string[]
  seller_id: string
  seller_name: string
  seller_phone?: string
  seller_whatsapp?: string
  is_featured: boolean
  is_sold: boolean
  views: number
  expires_at: string
  created_at: string
}

// ── TOURNAMENT ────────────────────────────────────────
export interface Tournament {
  id: string
  name: string
  slug: string
  description?: string
  format: 'T20' | 'ODI' | 'Test' | 'T10' | 'Other'
  emirate: Emirate
  venue?: string
  organiser: string
  organiser_contact?: string
  start_date: string
  end_date?: string
  registration_deadline?: string
  max_teams?: number
  fee?: number
  prize_pool?: string
  age_group?: string
  level: 'beginner' | 'intermediate' | 'open' | 'elite'
  status: 'upcoming' | 'registration-open' | 'ongoing' | 'completed'
  image_url?: string
  created_at: string
}

// ── TOUR ──────────────────────────────────────────────
export interface Tour {
  id: string
  team_name: string
  contact_name: string
  contact_email: string
  contact_phone: string
  direction: TourDirection
  origin_country?: string     // for inbound tours
  destination_country?: string // for outbound tours
  emirate_preference?: Emirate // for inbound
  travel_dates_from: string
  travel_dates_to: string
  team_size: number
  format_preference: string[]
  matches_wanted: number
  accommodation_needed: boolean
  logistics_needed: boolean
  notes?: string
  status: 'pending' | 'matched' | 'confirmed' | 'completed'
  matched_with?: string       // ID of matched team
  created_at: string
}

// ── NOTICE ────────────────────────────────────────────
export interface Notice {
  id: string
  title: string
  body?: string
  type: NoticeType
  organisation: string
  emirate?: Emirate
  location?: string
  contact?: string
  link?: string
  posted_by: string
  is_pinned: boolean
  expires_at?: string
  created_at: string
}

// ── NEWS ──────────────────────────────────────────────
export interface NewsPost {
  id: string
  title: string
  slug: string
  excerpt: string
  content: string
  category: 'uae-cricket' | 'international' | 'tournaments' | 'academy-news' | 'opinion'
  tags: string[]
  image_url?: string
  author: string
  is_featured: boolean
  published_at: string
  created_at: string
}

// ── JOB ───────────────────────────────────────────────
export interface Job {
  id: string
  title: string
  organisation: string
  emirate: Emirate
  job_type: 'full-time' | 'part-time' | 'contract' | 'volunteer'
  category: 'coaching' | 'umpiring' | 'administration' | 'ground-staff' | 'other'
  description: string
  requirements?: string
  salary_range?: string
  contact_email: string
  contact_phone?: string
  deadline?: string
  is_featured: boolean
  status: 'open' | 'closed'
  created_at: string
}

// ── REVIEW ────────────────────────────────────────────
export interface Review {
  id: string
  entity_type: 'facility' | 'coach' | 'umpire' | 'shop'
  entity_id: string
  reviewer_id: string
  reviewer_name: string
  rating: number              // 1–5
  comment?: string
  created_at: string
}

// ── GOVERNING BODY ────────────────────────────────────
export interface GoverningBody {
  id: string
  name: string
  short_name: string
  description: string
  scope: 'local' | 'national' | 'regional' | 'international'
  website?: string
  email?: string
  phone?: string
  address?: string
  logo_url?: string
  emirate?: Emirate
}

// ── SHOP TYPES ────────────────────────────────────────────

export type VendorStatus = 'pending' | 'active' | 'suspended'
export type ProductStatus = 'draft' | 'active' | 'out_of_stock' | 'archived'
export type OrderStatus = 'pending' | 'confirmed' | 'processing' | 'shipped' | 'delivered' | 'cancelled' | 'refunded'

export interface Vendor {
  id: string
  user_id: string
  shop_name: string
  slug: string
  description?: string
  logo_url?: string
  banner_url?: string
  emirate?: Emirate
  address?: string
  phone?: string
  email?: string
  whatsapp?: string
  website?: string
  commission_pct: number
  is_featured: boolean
  status: VendorStatus
  rating?: number
  review_count: number
  total_sales: number
  created_at: string
}

export interface ProductCategory {
  id: string
  name: string
  slug: string
  icon: string
  description?: string
  parent_id?: string
  sort_order: number
}

export interface Product {
  id: string
  vendor_id: string
  vendor?: Vendor
  category_id: string
  category?: ProductCategory
  name: string
  slug: string
  description?: string
  short_desc?: string
  brand?: string
  sku?: string
  price: number
  compare_price?: number
  currency: 'AED'
  stock_qty: number
  low_stock_threshold: number
  images: string[]
  tags: string[]
  specs: Record<string, string>
  variants?: ProductVariant[]
  is_featured: boolean
  is_customisable: boolean
  status: ProductStatus
  rating?: number
  review_count: number
  sales_count: number
  weight_grams?: number
  created_at: string
  updated_at: string
}

export interface ProductVariant {
  id: string
  product_id: string
  name: string
  option1_name?: string
  option1_value?: string
  option2_name?: string
  option2_value?: string
  price_modifier: number
  stock_qty: number
  sku?: string
  image_url?: string
}

export interface CartItem {
  id: string
  user_id?: string
  session_id?: string
  product_id: string
  product?: Product
  variant_id?: string
  variant?: ProductVariant
  quantity: number
  customisation_notes?: string
  added_at: string
}

export interface ShippingAddress {
  full_name: string
  phone: string
  email: string
  line1: string
  line2?: string
  city: string
  emirate: string
  country: string
}

export interface Order {
  id: string
  order_number: string
  customer_id?: string
  customer_email: string
  customer_name: string
  customer_phone?: string
  shipping_address: ShippingAddress
  subtotal: number
  shipping_fee: number
  discount: number
  total: number
  currency: 'AED'
  status: OrderStatus
  payment_method?: string
  payment_ref?: string
  notes?: string
  items?: OrderItem[]
  created_at: string
  updated_at: string
}

export interface OrderItem {
  id: string
  order_id: string
  vendor_id: string
  product_id: string
  variant_id?: string
  product_name: string
  variant_name?: string
  quantity: number
  unit_price: number
  total_price: number
  customisation_notes?: string
  vendor_status: string
  tracking_number?: string
}

export interface ProductReview {
  id: string
  product_id: string
  reviewer_id: string
  reviewer_name: string
  rating: number
  title?: string
  comment?: string
  verified_purchase: boolean
  created_at: string
}
