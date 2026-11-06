# 🌿 Purpose Clinic

> A compassionate, step-by-step sanctuary designed to help individuals who feel confused or overwhelmed about what their life is all about to systematically unpack their experiences, excavate their core values, synthesize their Ikigai, and track daily purpose alignment.

---

## ✨ Features & Discovery Journey

### 🧭 The 6-Stage Clinic Path
1. **Stage 1: The Life Audit (Unpacking)**
   - 8-dimension life audit (Career, Health, Relationships, Growth, Creativity, Finances, Environment, Inner Calm).
   - Rating sliders (1–10) with live balance diagnosis and energy leak identification.
2. **Stage 2: Core Values Excavation (The North Star)**
   - 48 curated core human values across 6 domains (Wisdom, Heart, Courage, Impact, Joy, Integrity).
   - Selection and rank-ordering of top 5 non-negotiables with custom personal definitions and action tests.
3. **Stage 3: Superpowers & Flow States (The Ignition)**
   - Natural gifts audit, effortless flow triggers, childhood curiosity revival (ages 7–12), and energy givers vs. drainers.
4. **Stage 4: The Ikigai Matrix (The Sweet Spot)**
   - Japanese framework integrating:
     - What you **Love** (Passion)
     - What you are **Good At** (Vocation)
     - What the **World Needs** (Mission)
     - What you can get **Paid For** (Profession)
5. **Stage 5: The Purpose Manifesto (The Sacred Calling)**
   - Guided sentence builder creating a North Star headline, target audience, transformation, and daily declaration.
   - Generates a verified, downloadable, and printable Purpose Card with confetti celebration.
6. **Stage 6: Action Blueprint & Habit Anchors (The Walk)**
   - 30-Day quick wins, 90-Day momentum milestones, and 1-Year North Star commitments.

---

### 📈 Daily Purpose & Life Tracker
- Morning intention setting ("What 1 action will honor my purpose today?").
- Evening clarity reflection & gratitude entry.
- Alignment score (1–10), energy level, and mood monitoring.
- Historical progress log to witness clarity growth over time.

### 🛡️ Emergency Clarity Sanctuary (SOS Kit)
- Instant modal for existential overwhelm.
- 4-4-4-4 box breathing visual guide.
- 3 Grounding Anchors for uncertainty.
- Brain Dump canvas to quickly reduce mental friction.

---

## 🛠️ Technology Stack

- **Framework**: [Next.js](https://nextjs.org/) (App Router, React 19, TypeScript)
- **Database & Auth**: [Supabase](https://supabase.com/) (PostgreSQL & Auth)
- **ORM**: [Prisma](https://www.prisma.io/) (Data modeling, type safety, migrations)
- **Styling**: [Tailwind CSS](https://tailwindcss.com/) & Lucide Icons
- **Deployment**: [Vercel](https://vercel.com/) ready with optimized build scripts

---

## 🚀 Getting Started

### 1. Clone & Install
```bash
git clone https://github.com/eteowouduakobong-dev/Purpose-Clinic.git
cd Purpose-Clinic
npm install
```

### 2. Configure Environment Variables
Copy the `.env.example` file to `.env.local`:
```bash
cp .env.example .env.local
```

Fill in your Supabase credentials:
```env
NEXT_PUBLIC_SUPABASE_URL=https://your-project.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-supabase-anon-key
DATABASE_URL="postgresql://postgres.[ref]:[password]@aws-0-[region].pooler.supabase.com:6543/postgres?pgbouncer=true"
DIRECT_URL="postgresql://postgres.[ref]:[password]@aws-0-[region].pooler.supabase.com:5432/postgres"
```

### 3. Generate Prisma Client & Migrate
```bash
npx prisma generate
npx prisma db push
```

### 4. Run Development Server
```bash
npm run dev
```
Open [http://localhost:3000](http://localhost:3000) in your browser.

---

## ☁️ Deploying to Vercel

1. Push your repository to GitHub (`git push -u origin main`).
2. Import the project in your [Vercel Dashboard](https://vercel.com/dashboard).
3. Under **Environment Variables**, add:
   - `NEXT_PUBLIC_SUPABASE_URL`
   - `NEXT_PUBLIC_SUPABASE_ANON_KEY`
   - `DATABASE_URL`
   - `DIRECT_URL`
4. Deploy! Vercel will automatically run `prisma generate && next build`.

---

## 📄 License
MIT License. Crafted with empathy for anyone searching for their reason for being.
