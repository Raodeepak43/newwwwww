import Link from "next/link";
import AnimateOnScroll from "./AnimateOnScroll";

export default function CTABanner() {
  return (
    <section className="py-24 relative">
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[400px] bg-green-500/8 rounded-full blur-[150px]" />
      </div>

      <div className="relative max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <AnimateOnScroll animation="scale-in">
          <div className="text-center p-10 sm:p-14 rounded-3xl bg-gradient-to-br from-green-500/10 via-emerald-500/5 to-transparent border border-green-500/20">
            <h2 className="text-3xl sm:text-4xl font-bold text-white mb-4">
              आज ही शुरू करें!
            </h2>
            <p className="text-gray-400 max-w-lg mx-auto mb-8">
              30 दिन का फ्री ट्रायल — कोई क्रेडिट कार्ड नहीं चाहिए।
              <br />
              <span className="text-gray-500">
                Start your 30-day free trial — no credit card required.
              </span>
            </p>
            <Link
              href="/signup"
              className="inline-block px-10 py-4 rounded-full bg-gradient-to-r from-green-500 to-emerald-600 text-white font-semibold text-lg hover:from-green-400 hover:to-emerald-500 transition-all shadow-xl shadow-green-500/25 hover:shadow-green-500/40 hover:scale-105 active:scale-100"
            >
              30 दिन मुफ़्त — Try Free for 30 Days
            </Link>
          </div>
        </AnimateOnScroll>
      </div>
    </section>
  );
}
