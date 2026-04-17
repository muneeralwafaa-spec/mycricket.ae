-- ================================================================
-- MyCricket.ae v2 Schema — Multi-vendor + Booking Platform
-- Run this AFTER the original schema.sql
-- ================================================================

-- ── VENDOR PROFILES ──────────────────────────────────────────────
CREATE TABLE IF NOT EXISTS vendor_profiles (
  id            UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id       UUID NOT NULL REFERENCES profiles(id) ON DELETE CASCADE,
  vendor_type   TEXT NOT NULL CHECK (vendor_type IN ('facility','coach','academy','shop','umpire','tour')),
  business_name TEXT NOT NULL,
  description   TEXT,
  phone         TEXT,
  whatsapp      TEXT,
  email         TEXT,
  website       TEXT,
  address       TEXT,
  emirate       TEXT NOT NULL DEFAULT 'Dubai',
  area          TEXT,
  lat           DECIMAL(10,8),
  lng           DECIMAL(11,8),
  logo_url      TEXT,
  cover_url     TEXT,
  is_verified   BOOLEAN DEFAULT false,
  is_active     BOOLEAN DEFAULT true,
  rating        DECIMAL(3,2) DEFAULT 0,
  total_reviews INT DEFAULT 0,
  total_bookings INT DEFAULT 0,
  bank_name     TEXT,
  bank_iban     TEXT,
  bank_account_name TEXT,
  created_at    TIMESTAMPTZ DEFAULT NOW(),
  updated_at    TIMESTAMPTZ DEFAULT NOW()
);

-- ── SUBSCRIPTION PLANS ───────────────────────────────────────────
CREATE TABLE IF NOT EXISTS subscription_plans (
  id          UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name        TEXT NOT NULL,  -- 'free', 'starter', 'pro'
  price_aed   DECIMAL(10,2) NOT NULL DEFAULT 0,
  max_listings INT DEFAULT 5,
  max_products INT DEFAULT 5,
  max_slots    INT DEFAULT 20,
  featured     BOOLEAN DEFAULT false,
  analytics    BOOLEAN DEFAULT false,
  whatsapp_alerts BOOLEAN DEFAULT false,
  calendar_sync   BOOLEAN DEFAULT false,
  commission_pct  DECIMAL(5,2) DEFAULT 10.00,
  created_at  TIMESTAMPTZ DEFAULT NOW()
);

INSERT INTO subscription_plans (name, price_aed, max_listings, max_products, max_slots, featured, analytics, whatsapp_alerts, calendar_sync, commission_pct) VALUES
  ('free',    0,   5,   5,   20,  false, false, false, false, 10.00),
  ('starter', 99,  50,  50,  100, true,  true,  false, false, 8.00),
  ('pro',     299, 999, 999, 999, true,  true,  true,  true,  5.00)
ON CONFLICT DO NOTHING;

CREATE TABLE IF NOT EXISTS vendor_subscriptions (
  id            UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  vendor_id     UUID NOT NULL REFERENCES vendor_profiles(id) ON DELETE CASCADE,
  plan_name     TEXT NOT NULL DEFAULT 'free',
  price_aed     DECIMAL(10,2) DEFAULT 0,
  starts_at     TIMESTAMPTZ DEFAULT NOW(),
  ends_at       TIMESTAMPTZ,
  is_active     BOOLEAN DEFAULT true,
  payment_ref   TEXT,
  created_at    TIMESTAMPTZ DEFAULT NOW()
);

-- ── FACILITIES (Nets, Grounds, Indoor Centres) ───────────────────
CREATE TABLE IF NOT EXISTS facilities (
  id            UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  vendor_id     UUID NOT NULL REFERENCES vendor_profiles(id) ON DELETE CASCADE,
  name          TEXT NOT NULL,
  type          TEXT NOT NULL CHECK (type IN ('nets','ground','indoor','academy','multi')),
  description   TEXT,
  emirate       TEXT NOT NULL DEFAULT 'Dubai',
  area          TEXT,
  address       TEXT,
  lat           DECIMAL(10,8),
  lng           DECIMAL(11,8),
  images        TEXT[] DEFAULT '{}',
  amenities     TEXT[] DEFAULT '{}',
  rules         TEXT,
  min_booking_hrs DECIMAL(3,1) DEFAULT 1,
  max_booking_hrs DECIMAL(3,1) DEFAULT 4,
  advance_booking_days INT DEFAULT 30,
  cancellation_hrs INT DEFAULT 24,
  is_active     BOOLEAN DEFAULT true,
  rating        DECIMAL(3,2) DEFAULT 0,
  total_reviews INT DEFAULT 0,
  created_at    TIMESTAMPTZ DEFAULT NOW(),
  updated_at    TIMESTAMPTZ DEFAULT NOW()
);

-- ── FACILITY SLOTS (Pricing + Availability) ──────────────────────
CREATE TABLE IF NOT EXISTS facility_slots (
  id            UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  facility_id   UUID NOT NULL REFERENCES facilities(id) ON DELETE CASCADE,
  name          TEXT NOT NULL,  -- 'Lane 1', 'Main Ground', 'Indoor Net A'
  slot_type     TEXT DEFAULT 'hourly', -- 'hourly', 'session', 'half_day', 'full_day'
  price_aed     DECIMAL(10,2) NOT NULL,
  duration_mins INT DEFAULT 60,
  -- Availability: days of week (0=Sun, 1=Mon... 6=Sat)
  available_days INT[] DEFAULT '{0,1,2,3,4,5,6}',
  open_time     TIME DEFAULT '06:00',
  close_time    TIME DEFAULT '23:00',
  is_active     BOOLEAN DEFAULT true,
  created_at    TIMESTAMPTZ DEFAULT NOW()
);

-- ── COACH SERVICES ───────────────────────────────────────────────
CREATE TABLE IF NOT EXISTS coach_services (
  id            UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  vendor_id     UUID NOT NULL REFERENCES vendor_profiles(id) ON DELETE CASCADE,
  name          TEXT NOT NULL,  -- '1-on-1 Batting Session', 'Group Bowling (4 players)'
  description   TEXT,
  service_type  TEXT DEFAULT 'session', -- 'session', 'package', 'camp'
  price_aed     DECIMAL(10,2) NOT NULL,
  duration_mins INT DEFAULT 60,
  max_players   INT DEFAULT 1,
  includes      TEXT[] DEFAULT '{}',
  level         TEXT DEFAULT 'all', -- 'beginner', 'intermediate', 'advanced', 'all'
  age_group     TEXT DEFAULT 'all',
  available_days INT[] DEFAULT '{0,1,2,3,4,5,6}',
  open_time     TIME DEFAULT '07:00',
  close_time    TIME DEFAULT '21:00',
  is_active     BOOLEAN DEFAULT true,
  created_at    TIMESTAMPTZ DEFAULT NOW()
);

-- ── BOOKINGS (Master table for ALL booking types) ─────────────────
CREATE TABLE IF NOT EXISTS bookings (
  id              UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  booking_ref     TEXT UNIQUE NOT NULL,
  customer_id     UUID NOT NULL REFERENCES profiles(id),
  vendor_id       UUID NOT NULL REFERENCES vendor_profiles(id),
  booking_type    TEXT NOT NULL CHECK (booking_type IN ('facility','coach','academy','tour','umpire')),
  -- Reference to the specific item booked
  facility_id     UUID REFERENCES facilities(id),
  slot_id         UUID REFERENCES facility_slots(id),
  coach_service_id UUID REFERENCES coach_services(id),
  -- Booking details
  booking_date    DATE NOT NULL,
  start_time      TIME NOT NULL,
  end_time        TIME NOT NULL,
  duration_mins   INT NOT NULL,
  num_players     INT DEFAULT 1,
  notes           TEXT,
  -- Pricing
  subtotal_aed    DECIMAL(10,2) NOT NULL,
  commission_aed  DECIMAL(10,2) DEFAULT 0,
  total_aed       DECIMAL(10,2) NOT NULL,
  -- Status
  status          TEXT DEFAULT 'pending' CHECK (status IN ('pending','confirmed','cancelled','completed','no_show')),
  confirmed_at    TIMESTAMPTZ,
  cancelled_at    TIMESTAMPTZ,
  cancel_reason   TEXT,
  -- Payment
  payment_method  TEXT, -- 'telr', 'stripe', 'cash'
  payment_status  TEXT DEFAULT 'pending' CHECK (payment_status IN ('pending','paid','refunded','failed')),
  payment_ref     TEXT,
  -- Notifications
  customer_notified BOOLEAN DEFAULT false,
  vendor_notified   BOOLEAN DEFAULT false,
  -- Review
  review_id       UUID,
  created_at      TIMESTAMPTZ DEFAULT NOW(),
  updated_at      TIMESTAMPTZ DEFAULT NOW()
);

-- Auto-generate booking reference
CREATE OR REPLACE FUNCTION generate_booking_ref()
RETURNS TRIGGER AS $$
BEGIN
  NEW.booking_ref = 'MCK-' || TO_CHAR(NOW(), 'YYYYMMDD') || '-' || UPPER(SUBSTRING(NEW.id::TEXT, 1, 6));
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER set_booking_ref
  BEFORE INSERT ON bookings
  FOR EACH ROW EXECUTE FUNCTION generate_booking_ref();

-- ── BLOCKED DATES (Vendor unavailability) ────────────────────────
CREATE TABLE IF NOT EXISTS blocked_dates (
  id          UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  vendor_id   UUID NOT NULL REFERENCES vendor_profiles(id) ON DELETE CASCADE,
  facility_id UUID REFERENCES facilities(id) ON DELETE CASCADE,
  slot_id     UUID REFERENCES facility_slots(id) ON DELETE CASCADE,
  block_date  DATE NOT NULL,
  block_from  TIME,
  block_to    TIME,
  reason      TEXT,
  created_at  TIMESTAMPTZ DEFAULT NOW()
);

-- ── REVIEWS ──────────────────────────────────────────────────────
CREATE TABLE IF NOT EXISTS booking_reviews (
  id          UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  booking_id  UUID NOT NULL REFERENCES bookings(id) ON DELETE CASCADE,
  customer_id UUID NOT NULL REFERENCES profiles(id),
  vendor_id   UUID NOT NULL REFERENCES vendor_profiles(id),
  rating      INT NOT NULL CHECK (rating BETWEEN 1 AND 5),
  title       TEXT,
  body        TEXT,
  is_approved BOOLEAN DEFAULT true,
  created_at  TIMESTAMPTZ DEFAULT NOW()
);

-- ── PAYOUTS ──────────────────────────────────────────────────────
CREATE TABLE IF NOT EXISTS payouts (
  id              UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  vendor_id       UUID NOT NULL REFERENCES vendor_profiles(id),
  period_start    DATE NOT NULL,
  period_end      DATE NOT NULL,
  gross_aed       DECIMAL(10,2) NOT NULL DEFAULT 0,
  commission_aed  DECIMAL(10,2) NOT NULL DEFAULT 0,
  net_aed         DECIMAL(10,2) NOT NULL DEFAULT 0,
  booking_count   INT DEFAULT 0,
  status          TEXT DEFAULT 'pending' CHECK (status IN ('pending','processing','paid','failed')),
  bank_name       TEXT,
  bank_iban       TEXT,
  transfer_ref    TEXT,
  paid_at         TIMESTAMPTZ,
  notes           TEXT,
  created_at      TIMESTAMPTZ DEFAULT NOW()
);

-- ── WHATSAPP NOTIFICATIONS LOG ───────────────────────────────────
CREATE TABLE IF NOT EXISTS whatsapp_log (
  id          UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  booking_id  UUID REFERENCES bookings(id),
  recipient   TEXT NOT NULL, -- phone number
  template    TEXT NOT NULL,
  message     TEXT NOT NULL,
  status      TEXT DEFAULT 'sent',
  sent_at     TIMESTAMPTZ DEFAULT NOW()
);

-- ── ACADEMY PROGRAMMES ───────────────────────────────────────────
CREATE TABLE IF NOT EXISTS academy_programmes (
  id            UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  vendor_id     UUID NOT NULL REFERENCES vendor_profiles(id) ON DELETE CASCADE,
  name          TEXT NOT NULL,
  description   TEXT,
  level         TEXT DEFAULT 'all',
  age_min       INT DEFAULT 5,
  age_max       INT DEFAULT 99,
  price_aed     DECIMAL(10,2) NOT NULL,
  price_period  TEXT DEFAULT 'monthly', -- 'session', 'monthly', 'term', 'annual'
  duration_weeks INT,
  sessions_per_week INT DEFAULT 2,
  session_hrs   DECIMAL(3,1) DEFAULT 2,
  max_students  INT DEFAULT 20,
  enrolled      INT DEFAULT 0,
  start_date    DATE,
  schedule      TEXT, -- e.g. "Tue & Thu 6pm–8pm"
  includes      TEXT[] DEFAULT '{}',
  is_active     BOOLEAN DEFAULT true,
  created_at    TIMESTAMPTZ DEFAULT NOW()
);

-- ── ENROLMENTS ───────────────────────────────────────────────────
CREATE TABLE IF NOT EXISTS enrolments (
  id              UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  programme_id    UUID NOT NULL REFERENCES academy_programmes(id),
  customer_id     UUID NOT NULL REFERENCES profiles(id),
  vendor_id       UUID NOT NULL REFERENCES vendor_profiles(id),
  student_name    TEXT NOT NULL,
  student_age     INT,
  status          TEXT DEFAULT 'pending' CHECK (status IN ('pending','active','completed','cancelled')),
  payment_status  TEXT DEFAULT 'pending',
  payment_ref     TEXT,
  total_aed       DECIMAL(10,2),
  starts_at       DATE,
  ends_at         DATE,
  notes           TEXT,
  created_at      TIMESTAMPTZ DEFAULT NOW()
);

-- ── SHOP ENHANCEMENT (Add vendor_id to products) ─────────────────
ALTER TABLE products ADD COLUMN IF NOT EXISTS vendor_profile_id UUID REFERENCES vendor_profiles(id);
ALTER TABLE products ADD COLUMN IF NOT EXISTS sku TEXT;
ALTER TABLE products ADD COLUMN IF NOT EXISTS weight_kg DECIMAL(5,2);
ALTER TABLE products ADD COLUMN IF NOT EXISTS brand TEXT;
ALTER TABLE products ADD COLUMN IF NOT EXISTS condition TEXT DEFAULT 'new';

-- ── MESSAGES (Vendor ↔ Customer chat) ────────────────────────────
CREATE TABLE IF NOT EXISTS messages (
  id          UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  booking_id  UUID REFERENCES bookings(id),
  from_id     UUID NOT NULL REFERENCES profiles(id),
  to_id       UUID NOT NULL REFERENCES profiles(id),
  body        TEXT NOT NULL,
  is_read     BOOLEAN DEFAULT false,
  created_at  TIMESTAMPTZ DEFAULT NOW()
);

-- ── RLS POLICIES ────────────────────────────────────────────────

ALTER TABLE vendor_profiles ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Public can view active vendors" ON vendor_profiles FOR SELECT USING (is_active = true);
CREATE POLICY "Vendors manage own profile" ON vendor_profiles FOR ALL USING (auth.uid() = user_id);

ALTER TABLE facilities ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Public view active facilities" ON facilities FOR SELECT USING (is_active = true);
CREATE POLICY "Vendors manage own facilities" ON facilities FOR ALL
  USING (vendor_id IN (SELECT id FROM vendor_profiles WHERE user_id = auth.uid()));

ALTER TABLE facility_slots ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Public view active slots" ON facility_slots FOR SELECT USING (is_active = true);
CREATE POLICY "Vendors manage own slots" ON facility_slots FOR ALL
  USING (facility_id IN (SELECT id FROM facilities WHERE vendor_id IN (SELECT id FROM vendor_profiles WHERE user_id = auth.uid())));

ALTER TABLE coach_services ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Public view active services" ON coach_services FOR SELECT USING (is_active = true);
CREATE POLICY "Coaches manage own services" ON coach_services FOR ALL
  USING (vendor_id IN (SELECT id FROM vendor_profiles WHERE user_id = auth.uid()));

ALTER TABLE bookings ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Customers see own bookings" ON bookings FOR SELECT USING (customer_id = auth.uid());
CREATE POLICY "Vendors see their bookings" ON bookings FOR SELECT
  USING (vendor_id IN (SELECT id FROM vendor_profiles WHERE user_id = auth.uid()));
CREATE POLICY "Customers create bookings" ON bookings FOR INSERT WITH CHECK (customer_id = auth.uid());
CREATE POLICY "Vendors update booking status" ON bookings FOR UPDATE
  USING (vendor_id IN (SELECT id FROM vendor_profiles WHERE user_id = auth.uid()));

ALTER TABLE academy_programmes ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Public view active programmes" ON academy_programmes FOR SELECT USING (is_active = true);
CREATE POLICY "Vendors manage own programmes" ON academy_programmes FOR ALL
  USING (vendor_id IN (SELECT id FROM vendor_profiles WHERE user_id = auth.uid()));

ALTER TABLE enrolments ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Customers see own enrolments" ON enrolments FOR SELECT USING (customer_id = auth.uid());
CREATE POLICY "Vendors see their enrolments" ON enrolments FOR SELECT
  USING (vendor_id IN (SELECT id FROM vendor_profiles WHERE user_id = auth.uid()));

ALTER TABLE booking_reviews ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Public view reviews" ON booking_reviews FOR SELECT USING (is_approved = true);
CREATE POLICY "Customers manage own reviews" ON booking_reviews FOR ALL USING (customer_id = auth.uid());

ALTER TABLE messages ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Users see own messages" ON messages FOR SELECT USING (from_id = auth.uid() OR to_id = auth.uid());
CREATE POLICY "Users send messages" ON messages FOR INSERT WITH CHECK (from_id = auth.uid());

ALTER TABLE payouts ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Vendors see own payouts" ON payouts FOR SELECT
  USING (vendor_id IN (SELECT id FROM vendor_profiles WHERE user_id = auth.uid()));

-- ── INDEXES FOR PERFORMANCE ──────────────────────────────────────
CREATE INDEX IF NOT EXISTS idx_bookings_customer ON bookings(customer_id);
CREATE INDEX IF NOT EXISTS idx_bookings_vendor ON bookings(vendor_id);
CREATE INDEX IF NOT EXISTS idx_bookings_date ON bookings(booking_date);
CREATE INDEX IF NOT EXISTS idx_bookings_status ON bookings(status);
CREATE INDEX IF NOT EXISTS idx_facilities_emirate ON facilities(emirate);
CREATE INDEX IF NOT EXISTS idx_facilities_type ON facilities(type);
CREATE INDEX IF NOT EXISTS idx_vendor_profiles_type ON vendor_profiles(vendor_type);
CREATE INDEX IF NOT EXISTS idx_vendor_profiles_emirate ON vendor_profiles(emirate);

-- ── UPDATE TRIGGER ───────────────────────────────────────────────
CREATE OR REPLACE FUNCTION update_updated_at()
RETURNS TRIGGER AS $$
BEGIN NEW.updated_at = NOW(); RETURN NEW; END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER update_vendor_profiles_updated_at BEFORE UPDATE ON vendor_profiles FOR EACH ROW EXECUTE FUNCTION update_updated_at();
CREATE TRIGGER update_facilities_updated_at BEFORE UPDATE ON facilities FOR EACH ROW EXECUTE FUNCTION update_updated_at();
CREATE TRIGGER update_bookings_updated_at BEFORE UPDATE ON bookings FOR EACH ROW EXECUTE FUNCTION update_updated_at();

-- ── UPDATE VENDOR RATING AFTER REVIEW ───────────────────────────
CREATE OR REPLACE FUNCTION update_vendor_rating()
RETURNS TRIGGER AS $$
BEGIN
  UPDATE vendor_profiles SET
    rating = (SELECT AVG(rating) FROM booking_reviews WHERE vendor_id = NEW.vendor_id AND is_approved = true),
    total_reviews = (SELECT COUNT(*) FROM booking_reviews WHERE vendor_id = NEW.vendor_id AND is_approved = true)
  WHERE id = NEW.vendor_id;
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER after_review_insert AFTER INSERT ON booking_reviews FOR EACH ROW EXECUTE FUNCTION update_vendor_rating();
