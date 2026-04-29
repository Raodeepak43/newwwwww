"use client";

import { useState } from "react";
import Link from "next/link";

export default function Navbar() {
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-[#0a0a0a]/80 backdrop-blur-md border-b border-white/10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2">
            <div className="w-9 h-9 rounded-lg bg-gradient-to-br from-green-400 to-emerald-600 flex items-center justify-center text-white font-bold text-lg">
              C
            </div>
            <span className="text-xl font-bold bg-gradient-to-r from-green-400 to-emerald-400 bg-clip-text text-transparent">
              ChatKaro
            </span>
          </Link>

          {/* Desktop Nav Links */}
          <div className="hidden md:flex items-center gap-8">
            <a
              href="#features"
              className="text-sm text-gray-400 hover:text-white transition-colors"
            >
              Features
            </a>
            <a
              href="#pricing"
              className="text-sm text-gray-400 hover:text-white transition-colors"
            >
              Pricing
            </a>
            <a
              href="#faq"
              className="text-sm text-gray-400 hover:text-white transition-colors"
            >
              FAQ
            </a>
            <a
              href="#contact"
              className="text-sm text-gray-400 hover:text-white transition-colors"
            >
              Contact
            </a>
            <Link
              href="/login"
              className="px-5 py-2 text-sm font-medium text-gray-400 hover:text-white transition-colors"
            >
              Login
            </Link>
            <Link
              href="/signup"
              className="px-5 py-2 text-sm font-medium rounded-full bg-gradient-to-r from-green-500 to-emerald-600 text-white hover:from-green-400 hover:to-emerald-500 transition-all shadow-lg shadow-green-500/25"
            >
              Sign Up
            </Link>
          </div>

          {/* Mobile Hamburger */}
          <button
            onClick={() => setMobileOpen(!mobileOpen)}
            className="md:hidden text-gray-400 hover:text-white"
            aria-label="Toggle menu"
          >
            <svg
              className="w-6 h-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              {mobileOpen ? (
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M6 18L18 6M6 6l12 12"
                />
              ) : (
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M4 6h16M4 12h16M4 18h16"
                />
              )}
            </svg>
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {mobileOpen && (
        <div className="md:hidden bg-[#0a0a0a]/95 backdrop-blur-md border-b border-white/10 px-4 pb-4 space-y-3">
          <a
            href="#features"
            onClick={() => setMobileOpen(false)}
            className="block text-sm text-gray-400 hover:text-white transition-colors py-2"
          >
            Features
          </a>
          <a
            href="#pricing"
            onClick={() => setMobileOpen(false)}
            className="block text-sm text-gray-400 hover:text-white transition-colors py-2"
          >
            Pricing
          </a>
          <a
            href="#faq"
            onClick={() => setMobileOpen(false)}
            className="block text-sm text-gray-400 hover:text-white transition-colors py-2"
          >
            FAQ
          </a>
          <a
            href="#contact"
            onClick={() => setMobileOpen(false)}
            className="block text-sm text-gray-400 hover:text-white transition-colors py-2"
          >
            Contact
          </a>
          <Link
            href="/login"
            className="block text-center px-5 py-2 text-sm font-medium text-gray-400 hover:text-white transition-colors"
          >
            Login
          </Link>
          <Link
            href="/signup"
            className="block text-center px-5 py-2 text-sm font-medium rounded-full bg-gradient-to-r from-green-500 to-emerald-600 text-white"
          >
            Sign Up
          </Link>
        </div>
      )}
    </nav>
  );
}
