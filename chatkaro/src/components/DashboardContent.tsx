"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { createClient } from "@/lib/supabase";

interface DashboardContentProps {
  email: string;
  businessName: string;
}

export default function DashboardContent({
  email,
  businessName,
}: DashboardContentProps) {
  const router = useRouter();

  const handleLogout = async () => {
    const supabase = createClient();
    await supabase.auth.signOut();
    router.push("/");
    router.refresh();
  };

  return (
    <div className="min-h-screen bg-[#0a0a0a]">
      {/* Dashboard Navbar */}
      <nav className="border-b border-white/10 bg-[#0a0a0a]/80 backdrop-blur-md">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <Link href="/dashboard" className="flex items-center gap-2">
              <div className="w-9 h-9 rounded-lg bg-gradient-to-br from-green-400 to-emerald-600 flex items-center justify-center text-white font-bold text-lg">
                C
              </div>
              <span className="text-xl font-bold bg-gradient-to-r from-green-400 to-emerald-400 bg-clip-text text-transparent">
                ChatKaro
              </span>
            </Link>

            <div className="flex items-center gap-4">
              <span className="hidden sm:inline text-sm text-gray-400">
                {email}
              </span>
              <button
                onClick={handleLogout}
                className="px-4 py-2 text-sm font-medium rounded-full border border-red-500/30 text-red-400 hover:bg-red-500/10 transition-all"
              >
                Logout
              </button>
            </div>
          </div>
        </div>
      </nav>

      {/* Dashboard Body */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="mb-10">
          <h1 className="text-3xl sm:text-4xl font-bold text-white mb-2">
            नमस्ते, {businessName}!
          </h1>
          <p className="text-gray-500">
            आपका ChatKaro डैशबोर्ड — Your ChatKaro Dashboard
          </p>
        </div>

        {/* Stats Grid */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
          {[
            {
              label: "Total Messages / कुल मैसेज",
              value: "0",
              icon: (
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={1.5}
                  d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z"
                />
              ),
            },
            {
              label: "AI Replies / AI जवाब",
              value: "0",
              icon: (
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={1.5}
                  d="M13 10V3L4 14h7v7l9-11h-7z"
                />
              ),
            },
            {
              label: "Active Chats / एक्टिव चैट्स",
              value: "0",
              icon: (
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={1.5}
                  d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0z"
                />
              ),
            },
            {
              label: "Response Rate / रिस्पॉन्स रेट",
              value: "—",
              icon: (
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={1.5}
                  d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"
                />
              ),
            },
          ].map((stat, i) => (
            <div
              key={i}
              className="p-6 rounded-2xl bg-white/[0.03] border border-white/10"
            >
              <div className="w-10 h-10 rounded-xl bg-green-500/10 flex items-center justify-center text-green-400 mb-4">
                <svg
                  className="w-5 h-5"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  {stat.icon}
                </svg>
              </div>
              <div className="text-2xl font-bold text-white mb-1">
                {stat.value}
              </div>
              <div className="text-xs text-gray-500">{stat.label}</div>
            </div>
          ))}
        </div>

        {/* Quick Actions */}
        <div className="p-8 rounded-2xl bg-white/[0.03] border border-white/10">
          <h2 className="text-xl font-semibold text-white mb-2">
            शुरू करें — Get Started
          </h2>
          <p className="text-gray-500 text-sm mb-6">
            अपना WhatsApp नंबर कनेक्ट करें और AI ऑटोमेशन चालू करें — Connect
            your WhatsApp number and enable AI automation.
          </p>
          <button className="px-6 py-3 rounded-full bg-gradient-to-r from-green-500 to-emerald-600 text-white font-semibold text-sm hover:from-green-400 hover:to-emerald-500 transition-all shadow-lg shadow-green-500/25">
            WhatsApp कनेक्ट करें — Connect WhatsApp
          </button>
        </div>
      </main>
    </div>
  );
}
