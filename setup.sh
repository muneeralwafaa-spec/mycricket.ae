#!/bin/bash
# ================================================================
# MyCricket.ae — Full Deployment Setup Script
# Run this on your local machine (Mac/Linux/WSL)
# ================================================================

set -e  # Exit on any error

GREEN='\033[0;32m'
GOLD='\033[0;33m'
RED='\033[0;31m'
NC='\033[0m' # No Color

echo ""
echo "🏏 MyCricket.ae — Deployment Setup"
echo "======================================"
echo ""

# ── STEP 1: CHECK PREREQUISITES ──────────────────────────────
echo -e "${GOLD}Checking prerequisites...${NC}"

check_cmd() {
  if ! command -v $1 &> /dev/null; then
    echo -e "${RED}✗ $1 not found. Please install it first.${NC}"
    exit 1
  else
    echo -e "${GREEN}✓ $1 found${NC}"
  fi
}

check_cmd git
check_cmd node
check_cmd npm

# Check Node version
NODE_VER=$(node -v | cut -d'v' -f2 | cut -d'.' -f1)
if [ "$NODE_VER" -lt "18" ]; then
  echo -e "${RED}✗ Node.js 18+ required. Current: $(node -v)${NC}"
  exit 1
fi

echo ""

# ── STEP 2: INSTALL DEPENDENCIES ─────────────────────────────
echo -e "${GOLD}Installing dependencies...${NC}"
npm install
echo -e "${GREEN}✓ Dependencies installed${NC}"
echo ""

# ── STEP 3: VERCEL CLI ────────────────────────────────────────
echo -e "${GOLD}Setting up Vercel CLI...${NC}"
if ! command -v vercel &> /dev/null; then
  npm install -g vercel@latest
  echo -e "${GREEN}✓ Vercel CLI installed${NC}"
else
  echo -e "${GREEN}✓ Vercel CLI already installed${NC}"
fi
echo ""

# ── STEP 4: ENVIRONMENT SETUP ─────────────────────────────────
echo -e "${GOLD}Setting up environment variables...${NC}"

if [ ! -f ".env.local" ]; then
  cp .env.local.example .env.local
  echo -e "${GOLD}⚠  .env.local created from template.${NC}"
  echo -e "${GOLD}   You MUST fill in these values before running:${NC}"
  echo ""
  echo "   NEXT_PUBLIC_SUPABASE_URL=       (from supabase.com → Settings → API)"
  echo "   NEXT_PUBLIC_SUPABASE_ANON_KEY=  (from supabase.com → Settings → API)"
  echo "   SUPABASE_SERVICE_ROLE_KEY=      (from supabase.com → Settings → API)"
  echo "   NEXT_PUBLIC_SITE_URL=https://mycricket.ae"
  echo "   RESEND_API_KEY=                 (from resend.com)"
  echo "   EMAIL_FROM=MyCricket.ae <hello@mycricket.ae>"
  echo "   ADMIN_EMAIL=your@email.com"
  echo "   TELR_STORE_ID=                  (from Telr merchant dashboard)"
  echo "   TELR_AUTH_KEY=                  (from Telr merchant dashboard)"
  echo "   CRICAPI_KEY=                    (from cricapi.com — optional)"
  echo ""
  read -p "Press Enter after filling in .env.local to continue..."
else
  echo -e "${GREEN}✓ .env.local already exists${NC}"
fi
echo ""

# ── STEP 5: BUILD TEST ────────────────────────────────────────
echo -e "${GOLD}Running build test...${NC}"
npm run build
echo -e "${GREEN}✓ Build successful${NC}"
echo ""

# ── STEP 6: GITHUB SETUP ─────────────────────────────────────
echo -e "${GOLD}GitHub repository setup...${NC}"
echo ""
echo "Please create a new GitHub repository:"
echo "  1. Go to https://github.com/new"
echo "  2. Name: mycricket-ae"
echo "  3. Private repository (recommended)"
echo "  4. Do NOT add README/gitignore (we already have them)"
echo "  5. Copy the repository URL"
echo ""
read -p "Enter your GitHub repo URL (e.g. https://github.com/username/mycricket-ae): " GITHUB_URL

if [ -n "$GITHUB_URL" ]; then
  git remote add origin "$GITHUB_URL" 2>/dev/null || git remote set-url origin "$GITHUB_URL"
  git push -u origin main
  echo -e "${GREEN}✓ Code pushed to GitHub${NC}"
else
  echo -e "${GOLD}⚠  Skipping GitHub push${NC}"
fi
echo ""

# ── STEP 7: VERCEL DEPLOY ─────────────────────────────────────
echo -e "${GOLD}Deploying to Vercel...${NC}"
echo ""
echo "This will:"
echo "  - Link to your Vercel account"
echo "  - Create the mycricket-ae project"
echo "  - Deploy to production"
echo ""

vercel --prod

echo ""
echo -e "${GREEN}✓ Deployed to Vercel!${NC}"
echo ""

# ── STEP 8: ENV VARS ON VERCEL ───────────────────────────────
echo -e "${GOLD}Adding environment variables to Vercel...${NC}"
echo ""
echo "Adding all required environment variables..."

# Read from .env.local and push to Vercel
while IFS= read -r line; do
  # Skip comments and empty lines
  [[ "$line" =~ ^#.*$ ]] && continue
  [[ -z "$line" ]] && continue
  
  KEY=$(echo "$line" | cut -d'=' -f1)
  VALUE=$(echo "$line" | cut -d'=' -f2-)
  
  if [ -n "$KEY" ] && [ -n "$VALUE" ]; then
    vercel env add "$KEY" production <<< "$VALUE" 2>/dev/null && \
      echo -e "  ${GREEN}✓${NC} $KEY" || \
      echo -e "  ${GOLD}⚠${NC}  $KEY (may already exist)"
  fi
done < .env.local

echo ""
echo -e "${GOLD}Redeploying with environment variables...${NC}"
vercel --prod

echo ""
echo -e "${GREEN}════════════════════════════════════════${NC}"
echo -e "${GREEN}🏏 MyCricket.ae is LIVE!${NC}"
echo -e "${GREEN}════════════════════════════════════════${NC}"
echo ""
echo "Next steps:"
echo "  1. Go to Vercel dashboard → Domains → Add mycricket.ae"
echo "  2. Update Cloudflare DNS (CNAME @ → cname.vercel-dns.com)"
echo "  3. Set Cloudflare SSL to 'Full (strict)'"
echo "  4. Add GitHub secrets for CI/CD:"
echo "     VERCEL_TOKEN, NEXT_PUBLIC_SUPABASE_URL, NEXT_PUBLIC_SUPABASE_ANON_KEY"
echo ""
echo "  Supabase:"
echo "  1. Run lib/schema.sql in Supabase SQL editor"
echo "  2. Create storage buckets: facilities, coaches, classifieds, shops, news, products"
echo "  3. Configure Auth → Redirect URLs → https://mycricket.ae/api/auth/callback"
echo ""
echo -e "${GOLD}See DIPANKAR_SETUP.md for full details.${NC}"
