-- ================================================================
-- MyCricket.ae Schema V3 — Vendor Operating System
-- Run after schema-v2-clean.sql
-- ================================================================

-- ── STUDENTS (Academy student profiles) ─────────────────────────
CREATE TABLE IF NOT EXISTS students (
  id              UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  vendor_id       UUID NOT NULL REFERENCES vendor_profiles(id) ON DELETE CASCADE,
  full_name       TEXT NOT NULL,
  dob             DATE,
  age             INT,
  gender          TEXT CHECK (gender IN ('male','female','other')),
  nationality     TEXT,
  phone           TEXT,
  email           TEXT,
  -- Parent/Guardian
  parent_name     TEXT,
  parent_phone    TEXT NOT NULL,
  parent_email    TEXT,
  parent_whatsapp TEXT,
  -- Academic
  school          TEXT,
  skill_level     TEXT DEFAULT 'beginner' CHECK (skill_level IN ('beginner','intermediate','advanced','elite')),
  batting_style   TEXT CHECK (batting_style IN ('right','left')),
  bowling_style   TEXT,
  -- Status
  status          TEXT DEFAULT 'active' CHECK (status IN ('active','inactive','graduated','suspended')),
  join_date       DATE DEFAULT CURRENT_DATE,
  notes           TEXT,
  photo_url       TEXT,
  created_at      TIMESTAMPTZ DEFAULT NOW(),
  updated_at      TIMESTAMPTZ DEFAULT NOW()
);

-- ── BATCHES (Academy training groups) ───────────────────────────
CREATE TABLE IF NOT EXISTS batches (
  id                UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  vendor_id         UUID NOT NULL REFERENCES vendor_profiles(id) ON DELETE CASCADE,
  name              TEXT NOT NULL,  -- 'Morning Batch A', 'U14 Boys', 'Senior Ladies'
  description       TEXT,
  coach_id          UUID REFERENCES vendor_profiles(id),
  level             TEXT DEFAULT 'beginner',
  age_min           INT,
  age_max           INT,
  max_students      INT DEFAULT 20,
  current_students  INT DEFAULT 0,
  -- Schedule
  days              TEXT[] DEFAULT '{}',  -- ['Monday','Wednesday','Friday']
  start_time        TIME,
  end_time          TIME,
  venue             TEXT,
  -- Fees
  monthly_fee       DECIMAL(10,2) DEFAULT 0,
  registration_fee  DECIMAL(10,2) DEFAULT 0,
  -- Dates
  start_date        DATE,
  end_date          DATE,
  is_active         BOOLEAN DEFAULT true,
  created_at        TIMESTAMPTZ DEFAULT NOW()
);

-- ── BATCH ENROLMENTS (Student → Batch) ──────────────────────────
CREATE TABLE IF NOT EXISTS batch_enrolments (
  id              UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  batch_id        UUID NOT NULL REFERENCES batches(id) ON DELETE CASCADE,
  student_id      UUID NOT NULL REFERENCES students(id) ON DELETE CASCADE,
  vendor_id       UUID NOT NULL REFERENCES vendor_profiles(id),
  enrolled_date   DATE DEFAULT CURRENT_DATE,
  status          TEXT DEFAULT 'active' CHECK (status IN ('active','paused','left')),
  -- Fee tracking
  fee_amount      DECIMAL(10,2),
  fee_due_day     INT DEFAULT 1,  -- day of month fee is due
  UNIQUE(batch_id, student_id)
);

-- ── ATTENDANCE ───────────────────────────────────────────────────
CREATE TABLE IF NOT EXISTS attendance (
  id          UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  vendor_id   UUID NOT NULL REFERENCES vendor_profiles(id),
  batch_id    UUID NOT NULL REFERENCES batches(id),
  student_id  UUID NOT NULL REFERENCES students(id),
  date        DATE NOT NULL,
  status      TEXT DEFAULT 'present' CHECK (status IN ('present','absent','late','excused')),
  notes       TEXT,
  marked_by   UUID REFERENCES profiles(id),
  created_at  TIMESTAMPTZ DEFAULT NOW(),
  UNIQUE(batch_id, student_id, date)
);

-- ── FEE PAYMENTS ─────────────────────────────────────────────────
CREATE TABLE IF NOT EXISTS fee_payments (
  id              UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  vendor_id       UUID NOT NULL REFERENCES vendor_profiles(id),
  student_id      UUID NOT NULL REFERENCES students(id),
  batch_id        UUID REFERENCES batches(id),
  amount          DECIMAL(10,2) NOT NULL,
  fee_type        TEXT DEFAULT 'monthly' CHECK (fee_type IN ('monthly','registration','trial','camp','other')),
  period_month    INT,  -- 1-12
  period_year     INT,
  payment_method  TEXT DEFAULT 'cash' CHECK (payment_method IN ('cash','bank_transfer','card','online')),
  payment_ref     TEXT,
  status          TEXT DEFAULT 'paid' CHECK (status IN ('paid','pending','overdue','waived')),
  due_date        DATE,
  paid_date       DATE,
  notes           TEXT,
  created_at      TIMESTAMPTZ DEFAULT NOW()
);

-- ── COACH SESSION PACKAGES ───────────────────────────────────────
CREATE TABLE IF NOT EXISTS session_packages (
  id              UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  vendor_id       UUID NOT NULL REFERENCES vendor_profiles(id),
  customer_id     UUID REFERENCES profiles(id),
  student_name    TEXT NOT NULL,
  student_phone   TEXT,
  package_name    TEXT NOT NULL,  -- '10 Sessions', '20 Sessions'
  total_sessions  INT NOT NULL,
  used_sessions   INT DEFAULT 0,
  price_aed       DECIMAL(10,2) NOT NULL,
  payment_status  TEXT DEFAULT 'pending',
  payment_ref     TEXT,
  purchased_date  DATE DEFAULT CURRENT_DATE,
  expiry_date     DATE,
  notes           TEXT,
  is_active       BOOLEAN DEFAULT true,
  created_at      TIMESTAMPTZ DEFAULT NOW()
);

-- ── COACH SESSION LOG ────────────────────────────────────────────
CREATE TABLE IF NOT EXISTS session_logs (
  id              UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  vendor_id       UUID NOT NULL REFERENCES vendor_profiles(id),
  package_id      UUID REFERENCES session_packages(id),
  booking_id      UUID REFERENCES bookings(id),
  student_name    TEXT NOT NULL,
  session_date    DATE NOT NULL,
  duration_mins   INT DEFAULT 60,
  focus_area      TEXT,  -- 'Batting technique', 'Bowling run-up', etc
  coach_notes     TEXT,
  rating          INT CHECK (rating BETWEEN 1 AND 5),
  created_at      TIMESTAMPTZ DEFAULT NOW()
);

-- ── WALK-IN BOOKINGS (Vendor books on behalf of customer) ────────
CREATE TABLE IF NOT EXISTS walkin_bookings (
  id              UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  vendor_id       UUID NOT NULL REFERENCES vendor_profiles(id),
  facility_id     UUID REFERENCES facility_listings(id),
  slot_id         UUID REFERENCES facility_slots(id),
  customer_name   TEXT NOT NULL,
  customer_phone  TEXT NOT NULL,
  booking_date    DATE NOT NULL,
  start_time      TIME NOT NULL,
  end_time        TIME NOT NULL,
  num_players     INT DEFAULT 1,
  amount_aed      DECIMAL(10,2),
  payment_method  TEXT DEFAULT 'cash',
  status          TEXT DEFAULT 'confirmed',
  notes           TEXT,
  created_at      TIMESTAMPTZ DEFAULT NOW()
);

-- ── SHOP ORDERS ──────────────────────────────────────────────────
CREATE TABLE IF NOT EXISTS shop_orders (
  id              UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  order_ref       TEXT UNIQUE,
  vendor_id       UUID REFERENCES vendor_profiles(id),
  customer_id     UUID REFERENCES profiles(id),
  customer_name   TEXT NOT NULL,
  customer_phone  TEXT NOT NULL,
  customer_email  TEXT,
  delivery_address TEXT NOT NULL,
  emirate         TEXT NOT NULL,
  items           JSONB NOT NULL,  -- [{product_id, name, qty, price}]
  subtotal_aed    DECIMAL(10,2) NOT NULL,
  discount_aed    DECIMAL(10,2) DEFAULT 0,
  delivery_aed    DECIMAL(10,2) DEFAULT 0,
  total_aed       DECIMAL(10,2) NOT NULL,
  commission_aed  DECIMAL(10,2) DEFAULT 0,
  payment_method  TEXT DEFAULT 'cod',
  payment_status  TEXT DEFAULT 'pending',
  payment_ref     TEXT,
  status          TEXT DEFAULT 'pending' CHECK (status IN ('pending','confirmed','processing','shipped','delivered','cancelled','returned')),
  tracking_number TEXT,
  notes           TEXT,
  confirmed_at    TIMESTAMPTZ,
  shipped_at      TIMESTAMPTZ,
  delivered_at    TIMESTAMPTZ,
  created_at      TIMESTAMPTZ DEFAULT NOW(),
  updated_at      TIMESTAMPTZ DEFAULT NOW()
);

-- Auto order reference
CREATE OR REPLACE FUNCTION generate_order_ref()
RETURNS TRIGGER AS $$
BEGIN
  NEW.order_ref = 'MCK-ORD-' || TO_CHAR(NOW(), 'YYYYMMDD') || '-' || UPPER(SUBSTRING(NEW.id::TEXT, 1, 6));
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

DROP TRIGGER IF EXISTS set_order_ref ON shop_orders;
CREATE TRIGGER set_order_ref
  BEFORE INSERT ON shop_orders
  FOR EACH ROW EXECUTE FUNCTION generate_order_ref();

-- ── VENDOR NOTIFICATIONS LOG ─────────────────────────────────────
CREATE TABLE IF NOT EXISTS vendor_notifications (
  id          UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  vendor_id   UUID NOT NULL REFERENCES vendor_profiles(id),
  type        TEXT NOT NULL,  -- 'new_booking','new_order','payment_received','student_enrolled'
  title       TEXT NOT NULL,
  body        TEXT,
  link        TEXT,
  is_read     BOOLEAN DEFAULT false,
  created_at  TIMESTAMPTZ DEFAULT NOW()
);

-- ── STUDENT PROGRESS NOTES ───────────────────────────────────────
CREATE TABLE IF NOT EXISTS student_progress (
  id          UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  vendor_id   UUID NOT NULL REFERENCES vendor_profiles(id),
  student_id  UUID NOT NULL REFERENCES students(id),
  coach_id    UUID REFERENCES vendor_profiles(id),
  date        DATE DEFAULT CURRENT_DATE,
  category    TEXT DEFAULT 'general',  -- 'batting','bowling','fielding','fitness','general'
  notes       TEXT NOT NULL,
  rating      INT CHECK (rating BETWEEN 1 AND 5),
  created_at  TIMESTAMPTZ DEFAULT NOW()
);

-- ── RLS POLICIES ─────────────────────────────────────────────────

ALTER TABLE students ENABLE ROW LEVEL SECURITY;
DROP POLICY IF EXISTS "Vendors manage own students" ON students;
CREATE POLICY "Vendors manage own students" ON students FOR ALL
  USING (vendor_id IN (SELECT id FROM vendor_profiles WHERE user_id = auth.uid()));

ALTER TABLE batches ENABLE ROW LEVEL SECURITY;
DROP POLICY IF EXISTS "Vendors manage own batches" ON batches;
CREATE POLICY "Vendors manage own batches" ON batches FOR ALL
  USING (vendor_id IN (SELECT id FROM vendor_profiles WHERE user_id = auth.uid()));

ALTER TABLE batch_enrolments ENABLE ROW LEVEL SECURITY;
DROP POLICY IF EXISTS "Vendors manage own enrolments" ON batch_enrolments;
CREATE POLICY "Vendors manage own enrolments" ON batch_enrolments FOR ALL
  USING (vendor_id IN (SELECT id FROM vendor_profiles WHERE user_id = auth.uid()));

ALTER TABLE attendance ENABLE ROW LEVEL SECURITY;
DROP POLICY IF EXISTS "Vendors manage attendance" ON attendance;
CREATE POLICY "Vendors manage attendance" ON attendance FOR ALL
  USING (vendor_id IN (SELECT id FROM vendor_profiles WHERE user_id = auth.uid()));

ALTER TABLE fee_payments ENABLE ROW LEVEL SECURITY;
DROP POLICY IF EXISTS "Vendors manage fee payments" ON fee_payments;
CREATE POLICY "Vendors manage fee payments" ON fee_payments FOR ALL
  USING (vendor_id IN (SELECT id FROM vendor_profiles WHERE user_id = auth.uid()));

ALTER TABLE session_packages ENABLE ROW LEVEL SECURITY;
DROP POLICY IF EXISTS "Vendors manage session packages" ON session_packages;
CREATE POLICY "Vendors manage session packages" ON session_packages FOR ALL
  USING (vendor_id IN (SELECT id FROM vendor_profiles WHERE user_id = auth.uid()));

ALTER TABLE session_logs ENABLE ROW LEVEL SECURITY;
DROP POLICY IF EXISTS "Vendors manage session logs" ON session_logs;
CREATE POLICY "Vendors manage session logs" ON session_logs FOR ALL
  USING (vendor_id IN (SELECT id FROM vendor_profiles WHERE user_id = auth.uid()));

ALTER TABLE walkin_bookings ENABLE ROW LEVEL SECURITY;
DROP POLICY IF EXISTS "Vendors manage walkin bookings" ON walkin_bookings;
CREATE POLICY "Vendors manage walkin bookings" ON walkin_bookings FOR ALL
  USING (vendor_id IN (SELECT id FROM vendor_profiles WHERE user_id = auth.uid()));

ALTER TABLE shop_orders ENABLE ROW LEVEL SECURITY;
DROP POLICY IF EXISTS "Vendors manage own orders" ON shop_orders;
CREATE POLICY "Vendors manage own orders" ON shop_orders FOR ALL
  USING (vendor_id IN (SELECT id FROM vendor_profiles WHERE user_id = auth.uid()));

ALTER TABLE vendor_notifications ENABLE ROW LEVEL SECURITY;
DROP POLICY IF EXISTS "Vendors see own notifications" ON vendor_notifications;
CREATE POLICY "Vendors see own notifications" ON vendor_notifications FOR ALL
  USING (vendor_id IN (SELECT id FROM vendor_profiles WHERE user_id = auth.uid()));

ALTER TABLE student_progress ENABLE ROW LEVEL SECURITY;
DROP POLICY IF EXISTS "Vendors manage student progress" ON student_progress;
CREATE POLICY "Vendors manage student progress" ON student_progress FOR ALL
  USING (vendor_id IN (SELECT id FROM vendor_profiles WHERE user_id = auth.uid()));

-- ── INDEXES ──────────────────────────────────────────────────────
CREATE INDEX IF NOT EXISTS idx_students_vendor     ON students(vendor_id);
CREATE INDEX IF NOT EXISTS idx_students_status     ON students(status);
CREATE INDEX IF NOT EXISTS idx_batches_vendor      ON batches(vendor_id);
CREATE INDEX IF NOT EXISTS idx_attendance_date     ON attendance(date);
CREATE INDEX IF NOT EXISTS idx_attendance_student  ON attendance(student_id);
CREATE INDEX IF NOT EXISTS idx_fee_payments_vendor ON fee_payments(vendor_id);
CREATE INDEX IF NOT EXISTS idx_fee_payments_status ON fee_payments(status);
CREATE INDEX IF NOT EXISTS idx_shop_orders_vendor  ON shop_orders(vendor_id);
CREATE INDEX IF NOT EXISTS idx_shop_orders_status  ON shop_orders(status);

-- ── VERIFY ───────────────────────────────────────────────────────
SELECT table_name FROM information_schema.tables
WHERE table_schema = 'public'
AND table_name IN (
  'students','batches','batch_enrolments','attendance',
  'fee_payments','session_packages','session_logs',
  'walkin_bookings','shop_orders','vendor_notifications','student_progress'
)
ORDER BY table_name;
