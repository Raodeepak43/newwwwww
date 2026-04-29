"use client";

import Link from "next/link";
import AnimateOnScroll from "./AnimateOnScroll";

export default function Hero() {
  return (
    <section className="relative min-h-screen flex items-center justify-center pt-16 overflow-hidden">
      {/* Background Glow Effects */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-1/4 left-1/4 w-[500px] h-[500px] bg-green-500/8 rounded-full blur-[120px] animate-float" />
        <div className="absolute bottom-1/4 right-1/4 w-[400px] h-[400px] bg-emerald-500/8 rounded-full blur-[100px] animate-float" style={{ animationDelay: "3s" }} />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-green-500/5 rounded-full blur-[150px]" />
      </div>

      <div className="relative max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        {/* Badge */}
        <AnimateOnScroll animation="fade-in">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-green-500/30 bg-green-500/10 text-green-400 text-sm mb-8">
            <span className="w-2 h-2 rounded-full bg-green-400 animate-pulse" />
            AI-Powered WhatsApp Automation
          </div>
        </AnimateOnScroll>

        {/* Main Heading (Hindi) */}
        <AnimateOnScroll animation="fade-up" delay={0.1}>
          <h1 className="text-4xl sm:text-5xl md:text-7xl font-extrabold leading-tight mb-6">
            <span className="bg-gradient-to-r from-white via-gray-200 to-gray-400 bg-clip-text text-transparent">
              अपने WhatsApp को
            </span>
            <br />
            <span className="bg-gradient-to-r from-green-400 to-emerald-400 bg-clip-text text-transparent">
              AI से जोड़ो
            </span>
          </h1>
        </AnimateOnScroll>

        {/* Subheading (English) */}
        <AnimateOnScroll animation="fade-up" delay={0.2}>
          <p className="text-lg sm:text-xl text-gray-400 max-w-2xl mx-auto mb-10 leading-relaxed">
            Connect your WhatsApp with powerful AI. Automate replies, generate
            smart responses, and handle customer queries 24/7 — all in one
            platform.
          </p>
        </AnimateOnScroll>

        {/* CTA Buttons */}
        <AnimateOnScroll animation="fade-up" delay={0.3}>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link
              href="/signup"
              className="px-8 py-3.5 rounded-full bg-gradient-to-r from-green-500 to-emerald-600 text-white font-semibold text-lg hover:from-green-400 hover:to-emerald-500 transition-all shadow-xl shadow-green-500/25 hover:shadow-green-500/40 hover:scale-105 active:scale-100"
            >
              30 दिन मुफ़्त — Try Free for 30 Days
            </Link>
            <a
              href="#demo"
              className="px-8 py-3.5 rounded-full border border-white/20 text-white font-semibold text-lg hover:bg-white/5 transition-all hover:border-white/30"
            >
              डेमो देखें — Watch Demo
            </a>
          </div>
          <p className="text-xs text-gray-600 mt-4">
            कोई क्रेडिट कार्ड नहीं चाहिए — No credit card required
          </p>
        </AnimateOnScroll>

        {/* Stats */}
        <AnimateOnScroll animation="fade-up" delay={0.4}>
          <div className="mt-16 grid grid-cols-3 gap-8 max-w-lg mx-auto">
            <div>
              <div className="text-2xl sm:text-3xl font-bold text-white">
                10K+
              </div>
              <div className="text-sm text-gray-500 mt-1">Users</div>
            </div>
            <div>
              <div className="text-2xl sm:text-3xl font-bold text-white">
                1M+
              </div>
              <div className="text-sm text-gray-500 mt-1">Messages</div>
            </div>
            <div>
              <div className="text-2xl sm:text-3xl font-bold text-white">
                99.9%
              </div>
              <div className="text-sm text-gray-500 mt-1">Uptime</div>
            </div>
          </div>
        </AnimateOnScroll>
      </div>
    </section>
  );
}
