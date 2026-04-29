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

### 3. Run the development server

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) to see the app.

## Project Structure

```
chatkaro/
├── src/
│   ├── app/
│   │   ├── fonts/          # Local fonts (Geist)
│   │   ├── login/
│   │   │   └── page.tsx    # Login page
│   │   ├── globals.css     # Global styles
│   │   ├── layout.tsx      # Root layout
│   │   └── page.tsx        # Landing page
│   ├── components/
│   │   ├── Navbar.tsx      # Navigation bar
│   │   ├── Hero.tsx        # Hero section
│   │   ├── Features.tsx    # Features section
│   │   ├── Pricing.tsx     # Pricing section
│   │   └── Footer.tsx      # Footer with contact info
│   └── lib/
│       └── supabase.ts     # Supabase client
├── .env.example            # Environment variables template
├── tailwind.config.ts      # Tailwind configuration
├── tsconfig.json           # TypeScript configuration
└── package.json
```

## Features

- Dark themed, bilingual (Hindi + English) landing page
- Responsive navbar with mobile menu
- Hero section with gradient text and CTAs
- 3 feature cards: Smart Auto-Reply, Analytics Dashboard, Fully Secure
- Pricing section: Free (₹0/month) and Premium (₹999/month)
- Footer with contact info
- Login page with email/password form
- Supabase integration ready for authentication
