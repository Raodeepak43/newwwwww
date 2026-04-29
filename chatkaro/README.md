# ChatKaro — अपने WhatsApp को AI से जोड़ो

ChatKaro is an AI-powered WhatsApp automation platform that helps businesses automate customer conversations, generate smart replies, and track engagement analytics.

## Tech Stack

- **Next.js 14** with App Router
- **TypeScript**
- **Tailwind CSS** for styling
- **Supabase** for database & authentication

## Getting Started

### 1. Install dependencies

```bash
cd chatkaro
npm install
```

### 2. Set up environment variables

Copy the example env file and fill in your Supabase credentials:

```bash
cp .env.example .env.local
```

Edit `.env.local` with your Supabase project URL and anon key:

```
NEXT_PUBLIC_SUPABASE_URL=https://your-project.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-anon-key
```

### 3. Set up the database

Run the SQL migration in your Supabase dashboard (SQL Editor) to create the `users` table:

```bash
supabase/migrations/001_create_users_table.sql
```

This creates:
- `public.users` table with `id`, `email`, `business_name`, timestamps
- Row Level Security policies (users can only access their own data)
- A trigger that auto-creates a profile row when a new auth user signs up

### 4. Run the development server

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) to see the app.

## Project Structure

```
chatkaro/
├── src/
│   ├── app/
│   │   ├── auth/callback/
│   │   │   └── route.ts       # OAuth callback handler
│   │   ├── dashboard/
│   │   │   └── page.tsx       # Protected dashboard (server component)
│   │   ├── login/
│   │   │   └── page.tsx       # Login page with Supabase auth
│   │   ├── signup/
│   │   │   └── page.tsx       # Signup page (email, password, business name)
│   │   ├── fonts/             # Local fonts (Geist)
│   │   ├── globals.css        # Global styles
│   │   ├── layout.tsx         # Root layout
│   │   └── page.tsx           # Landing page
│   ├── components/
│   │   ├── DashboardContent.tsx  # Dashboard UI with logout button
│   │   ├── Navbar.tsx         # Navigation bar
│   │   ├── Hero.tsx           # Hero section
│   │   ├── Features.tsx       # Features section
│   │   ├── Pricing.tsx        # Pricing section
│   │   └── Footer.tsx         # Footer with contact info
│   ├── lib/
│   │   ├── supabase.ts        # Browser Supabase client
│   │   └── supabase-server.ts # Server Supabase client
│   └── middleware.ts          # Route protection middleware
├── supabase/
│   └── migrations/
│       └── 001_create_users_table.sql  # Users table + RLS + trigger
├── .env.example               # Environment variables template
├── tailwind.config.ts         # Tailwind configuration
├── tsconfig.json              # TypeScript configuration
└── package.json
```

## Authentication Flow

1. **Sign Up** (`/signup`) — User provides email, password, and business name. Account is created via Supabase Auth and business name is stored in both `auth.users` metadata and the `public.users` table.
2. **Login** (`/login`) — User signs in with email and password. On success, redirected to `/dashboard`.
3. **Dashboard** (`/dashboard`) — Protected route. Middleware checks auth session; unauthenticated users are redirected to `/login`. Already-authenticated users visiting `/login` or `/signup` are redirected to `/dashboard`.
4. **Logout** — Logout button in the dashboard navbar signs out and redirects to the landing page.

## Features

- Dark themed, bilingual (Hindi + English) landing page
- Responsive navbar with mobile menu, Login & Sign Up links
- Hero section with gradient text and CTAs
- 3 feature cards: Smart Auto-Reply, Analytics Dashboard, Fully Secure
- Pricing section: Free (₹0/month) and Premium (₹999/month)
- Footer with contact info
- Full authentication: signup, login, logout with Supabase Auth
- Protected dashboard with stats cards and business name greeting
- Middleware-based route protection
- Users table with Row Level Security
