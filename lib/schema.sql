-- ============================================================
-- MyCricket.ae — Complete Supabase Database Schema
-- Run this in your Supabase SQL editor
-- ============================================================

-- Enable UUID extension
create extension if not exists "uuid-ossp";

-- ── ENUMS ──────────────────────────────────────────────────
create type emirate_type as enum (
  'dubai', 'abu-dhabi', 'sharjah', 'ajman',
  'ras-al-khaimah', 'fujairah', 'umm-al-quwain'
);

create type listing_status as enum ('pending', 'active', 'suspended', 'expired');
create type user_role as enum ('user', 'vendor', 'admin');
create type classified_condition as enum ('new', 'used', 'refurbished');
create type tour_direction as enum ('uae-outbound', 'uae-inbound');
create type notice_type as enum ('tryout', 'announcement', 'urgent', 'tournament', 'job');
create type tour_status as enum ('pending', 'matched', 'confirmed', 'completed');

-- ── PROFILES ───────────────────────────────────────────────
create table profiles (
  id uuid references auth.users on delete cascade primary key,
  email text unique not null,
  full_name text,
  phone text,
  emirate emirate_type,
  role user_role default 'user',
  avatar_url text,
  created_at timestamptz default now(),
  updated_at timestamptz default now()
);
alter table profiles enable row level security;
create policy "Public profiles are viewable" on profiles for select using (true);
create policy "Users can update own profile" on profiles for update using (auth.uid() = id);

-- ── FACILITIES ─────────────────────────────────────────────
create table facilities (
  id uuid default uuid_generate_v4() primary key,
  name text not null,
  slug text unique not null,
  type text not null check (type in ('academy','nets','ground','indoor-centre','sports-complex')),
  description text,
  emirate emirate_type not null,
  area text,
  address text,
  lat numeric(10,7),
  lng numeric(10,7),
  phone text,
  email text,
  website text,
  whatsapp text,
  images text[] default '{}',
  facilities text[] default '{}',
  age_groups text[] default '{}',
  price_from numeric,
  price_currency text default 'AED',
  coaches_count int default 0,
  is_featured boolean default false,
  is_verified boolean default false,
  status listing_status default 'pending',
  owner_id uuid references profiles(id),
  rating numeric(3,2),
  review_count int default 0,
  created_at timestamptz default now(),
  updated_at timestamptz default now()
);
alter table facilities enable row level security;
create policy "Active facilities are viewable" on facilities for select using (status = 'active');
create policy "Owners can manage their facilities" on facilities for all using (auth.uid() = owner_id);
create index on facilities(emirate);
create index on facilities(type);
create index on facilities(is_featured);

-- ── COACHES ────────────────────────────────────────────────
create table coaches (
  id uuid default uuid_generate_v4() primary key,
  user_id uuid references profiles(id),
  full_name text not null,
  slug text unique not null,
  specialisation text[] default '{}',
  bio text,
  emirate emirate_type not null,
  area text,
  phone text,
  email text,
  whatsapp text,
  photo_url text,
  certifications text[] default '{}',
  experience_years int default 0,
  nationality text,
  languages text[] default '{}',
  age_groups text[] default '{}',
  hourly_rate numeric,
  price_currency text default 'AED',
  facility_id uuid references facilities(id),
  is_featured boolean default false,
  is_verified boolean default false,
  status listing_status default 'pending',
  rating numeric(3,2),
  review_count int default 0,
  created_at timestamptz default now()
);
alter table coaches enable row level security;
create policy "Active coaches are viewable" on coaches for select using (status = 'active');
create index on coaches(emirate);
create index on coaches(is_featured);

-- ── UMPIRES ────────────────────────────────────────────────
create table umpires (
  id uuid default uuid_generate_v4() primary key,
  user_id uuid references profiles(id),
  full_name text not null,
  slug text unique not null,
  bio text,
  emirate emirate_type not null,
  phone text,
  email text,
  whatsapp text,
  photo_url text,
  certifications text[] default '{}',
  experience_years int default 0,
  formats text[] default '{}',
  availability text,
  is_featured boolean default false,
  is_verified boolean default false,
  status listing_status default 'pending',
  rating numeric(3,2),
  review_count int default 0,
  created_at timestamptz default now()
);
alter table umpires enable row level security;
create policy "Active umpires are viewable" on umpires for select using (status = 'active');

-- ── SHOPS ──────────────────────────────────────────────────
create table shops (
  id uuid default uuid_generate_v4() primary key,
  name text not null,
  slug text unique not null,
  description text,
  emirate emirate_type not null,
  area text,
  address text,
  phone text,
  email text,
  website text,
  whatsapp text,
  images text[] default '{}',
  shop_type text check (shop_type in ('physical','online','both')),
  brands text[] default '{}',
  is_featured boolean default false,
  is_verified boolean default false,
  status listing_status default 'pending',
  owner_id uuid references profiles(id),
  rating numeric(3,2),
  review_count int default 0,
  created_at timestamptz default now()
);
alter table shops enable row level security;
create policy "Active shops are viewable" on shops for select using (status = 'active');

-- ── CLASSIFIEDS ────────────────────────────────────────────
create table classifieds (
  id uuid default uuid_generate_v4() primary key,
  title text not null,
  description text,
  category text not null,
  condition classified_condition not null,
  price numeric not null,
  price_currency text default 'AED',
  is_negotiable boolean default false,
  emirate emirate_type not null,
  area text,
  images text[] default '{}',
  seller_id uuid references profiles(id),
  seller_name text not null,
  seller_phone text,
  seller_whatsapp text,
  is_featured boolean default false,
  is_sold boolean default false,
  views int default 0,
  expires_at timestamptz default (now() + interval '60 days'),
  created_at timestamptz default now()
);
alter table classifieds enable row level security;
create policy "Active classifieds are viewable" on classifieds for select using (is_sold = false);
create policy "Sellers can manage their ads" on classifieds for all using (auth.uid() = seller_id);
create index on classifieds(emirate);
create index on classifieds(category);
create index on classifieds(is_sold);

-- ── TOURNAMENTS ────────────────────────────────────────────
create table tournaments (
  id uuid default uuid_generate_v4() primary key,
  name text not null,
  slug text unique not null,
  description text,
  format text check (format in ('T20','ODI','Test','T10','Other')),
  emirate emirate_type not null,
  venue text,
  organiser text not null,
  organiser_contact text,
  start_date date not null,
  end_date date,
  registration_deadline date,
  max_teams int,
  fee numeric,
  prize_pool text,
  age_group text,
  level text check (level in ('beginner','intermediate','open','elite')),
  status text check (status in ('upcoming','registration-open','ongoing','completed')) default 'upcoming',
  image_url text,
  created_at timestamptz default now()
);
alter table tournaments enable row level security;
create policy "All tournaments are viewable" on tournaments for select using (true);

-- ── TOURS ──────────────────────────────────────────────────
create table tours (
  id uuid default uuid_generate_v4() primary key,
  team_name text not null,
  contact_name text not null,
  contact_email text not null,
  contact_phone text not null,
  direction tour_direction not null,
  origin_country text,
  destination_country text,
  emirate_preference emirate_type,
  travel_dates_from date not null,
  travel_dates_to date not null,
  team_size int not null,
  format_preference text[] default '{}',
  matches_wanted int default 1,
  accommodation_needed boolean default false,
  logistics_needed boolean default false,
  notes text,
  status tour_status default 'pending',
  matched_with uuid,
  created_at timestamptz default now()
);
alter table tours enable row level security;
create policy "Tours visible to admins" on tours for select using (auth.uid() in (select id from profiles where role = 'admin'));
create policy "Anyone can register a tour" on tours for insert with check (true);

-- ── NOTICES ────────────────────────────────────────────────
create table notices (
  id uuid default uuid_generate_v4() primary key,
  title text not null,
  body text,
  type notice_type not null,
  organisation text not null,
  emirate emirate_type,
  location text,
  contact text,
  link text,
  posted_by uuid references profiles(id),
  is_pinned boolean default false,
  expires_at timestamptz,
  created_at timestamptz default now()
);
alter table notices enable row level security;
create policy "Active notices are viewable" on notices for select using (expires_at is null or expires_at > now());
create policy "Authenticated users can post notices" on notices for insert with check (auth.uid() = posted_by);

-- ── NEWS ───────────────────────────────────────────────────
create table news_posts (
  id uuid default uuid_generate_v4() primary key,
  title text not null,
  slug text unique not null,
  excerpt text,
  content text,
  category text check (category in ('uae-cricket','international','tournaments','academy-news','opinion')),
  tags text[] default '{}',
  image_url text,
  author text not null,
  is_featured boolean default false,
  published_at timestamptz default now(),
  created_at timestamptz default now()
);
alter table news_posts enable row level security;
create policy "All news is viewable" on news_posts for select using (true);

-- ── JOBS ───────────────────────────────────────────────────
create table jobs (
  id uuid default uuid_generate_v4() primary key,
  title text not null,
  organisation text not null,
  emirate emirate_type not null,
  job_type text check (job_type in ('full-time','part-time','contract','volunteer')),
  category text check (category in ('coaching','umpiring','administration','ground-staff','other')),
  description text,
  requirements text,
  salary_range text,
  contact_email text not null,
  contact_phone text,
  deadline date,
  is_featured boolean default false,
  status text check (status in ('open','closed')) default 'open',
  created_at timestamptz default now()
);
alter table jobs enable row level security;
create policy "Open jobs are viewable" on jobs for select using (status = 'open');

-- ── REVIEWS ────────────────────────────────────────────────
create table reviews (
  id uuid default uuid_generate_v4() primary key,
  entity_type text check (entity_type in ('facility','coach','umpire','shop')),
  entity_id uuid not null,
  reviewer_id uuid references profiles(id),
  reviewer_name text not null,
  rating int check (rating between 1 and 5),
  comment text,
  created_at timestamptz default now()
);
alter table reviews enable row level security;
create policy "Reviews are viewable" on reviews for select using (true);
create policy "Authenticated users can review" on reviews for insert with check (auth.uid() = reviewer_id);

-- ── GOVERNING BODIES ───────────────────────────────────────
create table governing_bodies (
  id text primary key,
  name text not null,
  short_name text,
  description text,
  scope text check (scope in ('local','national','regional','international')),
  website text,
  email text,
  phone text,
  address text,
  logo_url text,
  emirate emirate_type
);
alter table governing_bodies enable row level security;
create policy "All governing bodies viewable" on governing_bodies for select using (true);

-- ── FEATURED LISTINGS ──────────────────────────────────────
create table featured_listings (
  id uuid default uuid_generate_v4() primary key,
  entity_type text not null,
  entity_id uuid not null,
  plan text check (plan in ('basic','standard','premium')),
  amount_paid numeric,
  starts_at timestamptz default now(),
  expires_at timestamptz not null,
  created_at timestamptz default now()
);

-- ── TRIGGERS: updated_at ───────────────────────────────────
create or replace function update_updated_at()
returns trigger as $$
begin new.updated_at = now(); return new; end;
$$ language plpgsql;

create trigger set_updated_at before update on facilities
  for each row execute function update_updated_at();

create trigger set_updated_at before update on profiles
  for each row execute function update_updated_at();

-- ── AUTO-CREATE PROFILE ON SIGNUP ─────────────────────────
create or replace function handle_new_user()
returns trigger as $$
begin
  insert into public.profiles (id, email, full_name)
  values (new.id, new.email, new.raw_user_meta_data->>'full_name');
  return new;
end;
$$ language plpgsql security definer;

create trigger on_auth_user_created
  after insert on auth.users
  for each row execute function handle_new_user();

-- ── STORAGE BUCKETS ────────────────────────────────────────
-- Run these separately in Supabase dashboard > Storage
-- insert into storage.buckets (id, name, public) values ('facilities', 'facilities', true);
-- insert into storage.buckets (id, name, public) values ('coaches', 'coaches', true);
-- insert into storage.buckets (id, name, public) values ('classifieds', 'classifieds', true);
-- insert into storage.buckets (id, name, public) values ('shops', 'shops', true);
-- insert into storage.buckets (id, name, public) values ('news', 'news', true);

-- ============================================================
-- SHOP MODULE — Multi-vendor ecommerce
-- ============================================================

create type order_status as enum ('pending','confirmed','processing','shipped','delivered','cancelled','refunded');
create type vendor_status as enum ('pending','active','suspended');
create type product_status as enum ('draft','active','out_of_stock','archived');

-- ── VENDORS ────────────────────────────────────────────────
create table vendors (
  id uuid default uuid_generate_v4() primary key,
  user_id uuid references profiles(id) on delete cascade,
  shop_name text not null,
  slug text unique not null,
  description text,
  logo_url text,
  banner_url text,
  emirate emirate_type,
  address text,
  phone text,
  email text,
  whatsapp text,
  website text,
  commission_pct numeric(4,2) default 8.0,
  is_featured boolean default false,
  status vendor_status default 'pending',
  rating numeric(3,2),
  review_count int default 0,
  total_sales int default 0,
  created_at timestamptz default now()
);
alter table vendors enable row level security;
create policy "Active vendors viewable" on vendors for select using (status = 'active');
create policy "Vendors manage own shop" on vendors for all using (auth.uid() = user_id);

-- ── PRODUCT CATEGORIES ─────────────────────────────────────
create table product_categories (
  id text primary key,
  name text not null,
  slug text unique not null,
  icon text,
  description text,
  parent_id text references product_categories(id),
  sort_order int default 0
);
alter table product_categories enable row level security;
create policy "Categories viewable" on product_categories for select using (true);

-- seed categories
insert into product_categories (id,name,slug,icon,sort_order) values
  ('bats','Bats','bats','🏏',1),
  ('pads','Batting Pads','pads','🦺',2),
  ('gloves','Gloves','gloves','🥊',3),
  ('helmets','Helmets','helmets','⛑️',4),
  ('balls','Balls','balls','⚾',5),
  ('shoes','Shoes','shoes','👟',6),
  ('jerseys','Jerseys & Kits','jerseys','🎽',7),
  ('clothing','Clothing','clothing','👕',8),
  ('accessories','Accessories','accessories','🎒',9),
  ('bundles','Bundles & Sets','bundles','📦',10),
  ('custom','Custom Printing','custom','🏷️',11);

-- ── PRODUCTS ───────────────────────────────────────────────
create table products (
  id uuid default uuid_generate_v4() primary key,
  vendor_id uuid references vendors(id) on delete cascade,
  category_id text references product_categories(id),
  name text not null,
  slug text unique not null,
  description text,
  short_desc text,
  brand text,
  sku text,
  price numeric not null,
  compare_price numeric,
  currency text default 'AED',
  stock_qty int default 0,
  low_stock_threshold int default 5,
  images text[] default '{}',
  tags text[] default '{}',
  specs jsonb default '{}',
  is_featured boolean default false,
  is_customisable boolean default false,
  status product_status default 'draft',
  rating numeric(3,2),
  review_count int default 0,
  sales_count int default 0,
  weight_grams int,
  created_at timestamptz default now(),
  updated_at timestamptz default now()
);
alter table products enable row level security;
create policy "Active products viewable" on products for select using (status = 'active');
create policy "Vendors manage own products" on products for all
  using (vendor_id in (select id from vendors where user_id = auth.uid()));
create index on products(category_id);
create index on products(is_featured);
create index on products(status);
create index on products(vendor_id);

-- ── PRODUCT VARIANTS ───────────────────────────────────────
create table product_variants (
  id uuid default uuid_generate_v4() primary key,
  product_id uuid references products(id) on delete cascade,
  name text not null,           -- e.g. "Size: XL / Color: Red"
  option1_name text,            -- e.g. "Size"
  option1_value text,           -- e.g. "XL"
  option2_name text,            -- e.g. "Color"
  option2_value text,           -- e.g. "Red"
  price_modifier numeric default 0,
  stock_qty int default 0,
  sku text,
  image_url text
);
alter table product_variants enable row level security;
create policy "Variants viewable" on product_variants for select using (true);

-- ── CART ───────────────────────────────────────────────────
create table cart_items (
  id uuid default uuid_generate_v4() primary key,
  user_id uuid references profiles(id) on delete cascade,
  session_id text,              -- for guest carts
  product_id uuid references products(id) on delete cascade,
  variant_id uuid references product_variants(id),
  quantity int not null default 1,
  customisation_notes text,
  added_at timestamptz default now()
);
alter table cart_items enable row level security;
create policy "Users manage own cart" on cart_items for all using (
  auth.uid() = user_id or session_id is not null
);

-- ── ORDERS ─────────────────────────────────────────────────
create table orders (
  id uuid default uuid_generate_v4() primary key,
  order_number text unique not null,
  customer_id uuid references profiles(id),
  customer_email text not null,
  customer_name text not null,
  customer_phone text,
  shipping_address jsonb not null,
  subtotal numeric not null,
  shipping_fee numeric default 0,
  discount numeric default 0,
  total numeric not null,
  currency text default 'AED',
  status order_status default 'pending',
  payment_method text,
  payment_ref text,
  notes text,
  created_at timestamptz default now(),
  updated_at timestamptz default now()
);
alter table orders enable row level security;
create policy "Customers view own orders" on orders for select using (auth.uid() = customer_id);
create policy "Anyone can create order" on orders for insert with check (true);
create index on orders(customer_id);
create index on orders(status);

-- ── ORDER ITEMS ────────────────────────────────────────────
create table order_items (
  id uuid default uuid_generate_v4() primary key,
  order_id uuid references orders(id) on delete cascade,
  vendor_id uuid references vendors(id),
  product_id uuid references products(id),
  variant_id uuid references product_variants(id),
  product_name text not null,
  variant_name text,
  quantity int not null,
  unit_price numeric not null,
  total_price numeric not null,
  customisation_notes text,
  vendor_status text default 'pending',   -- vendor-specific fulfillment status
  tracking_number text
);
alter table order_items enable row level security;
create policy "Customers view own items" on order_items for select
  using (order_id in (select id from orders where customer_id = auth.uid()));
create policy "Vendors view their items" on order_items for select
  using (vendor_id in (select id from vendors where user_id = auth.uid()));

-- ── VENDOR PAYOUTS ─────────────────────────────────────────
create table vendor_payouts (
  id uuid default uuid_generate_v4() primary key,
  vendor_id uuid references vendors(id),
  period_start date,
  period_end date,
  gross_sales numeric default 0,
  commission_amount numeric default 0,
  net_payout numeric default 0,
  status text check (status in ('pending','processing','paid')) default 'pending',
  paid_at timestamptz,
  notes text,
  created_at timestamptz default now()
);
alter table vendor_payouts enable row level security;
create policy "Vendors view own payouts" on vendor_payouts for select
  using (vendor_id in (select id from vendors where user_id = auth.uid()));

-- ── WISHLIST ───────────────────────────────────────────────
create table wishlist (
  id uuid default uuid_generate_v4() primary key,
  user_id uuid references profiles(id) on delete cascade,
  product_id uuid references products(id) on delete cascade,
  added_at timestamptz default now(),
  unique(user_id, product_id)
);
alter table wishlist enable row level security;
create policy "Users manage own wishlist" on wishlist for all using (auth.uid() = user_id);

-- ── PRODUCT REVIEWS ────────────────────────────────────────
create table product_reviews (
  id uuid default uuid_generate_v4() primary key,
  product_id uuid references products(id) on delete cascade,
  reviewer_id uuid references profiles(id),
  reviewer_name text not null,
  rating int check (rating between 1 and 5),
  title text,
  comment text,
  verified_purchase boolean default false,
  created_at timestamptz default now()
);
alter table product_reviews enable row level security;
create policy "Reviews viewable" on product_reviews for select using (true);
create policy "Authenticated can review" on product_reviews for insert with check (auth.uid() = reviewer_id);

-- trigger updated_at on products
create trigger set_products_updated_at before update on products
  for each row execute function update_updated_at();

create trigger set_orders_updated_at before update on orders
  for each row execute function update_updated_at();

-- generate order number function
create or replace function generate_order_number()
returns text as $$
begin
  return 'MCK-' || to_char(now(), 'YYYYMMDD') || '-' || lpad(floor(random()*9000+1000)::text, 4, '0');
end;
$$ language plpgsql;
