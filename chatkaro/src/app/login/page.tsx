"use client";

import Link from "next/link";
import { useState } from "react";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    // Supabase auth will be wired here
    console.log("Login attempt:", email);
  };

  return (
    <div className="min-h-screen flex items-center justify-center px-4 relative">
      {/* Background Glow */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-1/3 left-1/2 -translate-x-1/2 w-96 h-96 bg-green-500/10 rounded-full blur-3xl" />
      </div>

      <div className="relative w-full max-w-md">
        {/* Logo */}
        <div className="text-center mb-8">
          <Link href="/" className="inline-flex items-center gap-2">
            <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-green-400 to-emerald-600 flex items-center justify-center text-white font-bold text-xl">
              C
            </div>
            <span className="text-2xl font-bold bg-gradient-to-r from-green-400 to-emerald-400 bg-clip-text text-transparent">
              ChatKaro
            </span>
          </Link>
          <p className="text-gray-500 text-sm mt-3">
            अपने अकाउंट में लॉगिन करें — Login to your account
          </p>
        </div>

        {/* Login Form */}
        <form
          onSubmit={handleLogin}
          className="bg-white/[0.03] border border-white/10 rounded-2xl p-8 space-y-5"
        >
          <div>
            <label className="block text-sm text-gray-400 mb-1.5">
              Email
            </label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="you@example.com"
              className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white placeholder-gray-600 focus:outline-none focus:border-green-500/50 focus:ring-1 focus:ring-green-500/50 transition-all text-sm"
              required
            />
          </div>

          <div>
            <label className="block text-sm text-gray-400 mb-1.5">
              Password / पासवर्ड
            </label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="••••••••"
              className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white placeholder-gray-600 focus:outline-none focus:border-green-500/50 focus:ring-1 focus:ring-green-500/50 transition-all text-sm"
              required
            />
          </div>

          <button
            type="submit"
            className="w-full py-3 rounded-full bg-gradient-to-r from-green-500 to-emerald-600 text-white font-semibold hover:from-green-400 hover:to-emerald-500 transition-all shadow-lg shadow-green-500/25 text-sm"
          >
            Login / लॉगिन
          </button>

          <p className="text-center text-sm text-gray-500">
            अकाउंट नहीं है?{" "}
            <Link
              href="/"
              className="text-green-400 hover:text-green-300 transition-colors"
            >
              साइन अप करें
            </Link>
          </p>
        </form>
      </div>
    </div>
  );
}
