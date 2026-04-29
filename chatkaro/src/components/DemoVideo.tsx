import AnimateOnScroll from "./AnimateOnScroll";

export default function DemoVideo() {
  return (
    <section id="demo" className="py-24 relative">
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[400px] bg-green-500/5 rounded-full blur-[120px]" />
      </div>

      <div className="relative max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <AnimateOnScroll className="text-center mb-12">
          <h2 className="text-3xl sm:text-4xl font-bold mb-4">
            <span className="bg-gradient-to-r from-white to-gray-400 bg-clip-text text-transparent">
              देखें कैसे काम करता है —{" "}
            </span>
            <span className="bg-gradient-to-r from-green-400 to-emerald-400 bg-clip-text text-transparent">
              See How It Works
            </span>
          </h2>
          <p className="text-gray-500 max-w-xl mx-auto">
            2 मिनट में समझें ChatKaro कैसे आपके बिज़नेस को बदल सकता है
          </p>
        </AnimateOnScroll>

        <AnimateOnScroll animation="scale-in" delay={0.15}>
          <div className="relative rounded-2xl overflow-hidden border border-white/10 bg-white/[0.02] aspect-video max-w-4xl mx-auto group cursor-pointer">
            {/* Placeholder gradient background */}
            <div className="absolute inset-0 bg-gradient-to-br from-[#0f1a0f] via-[#0a0f0a] to-[#0a0a0a]" />

            {/* Decorative chat bubbles */}
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="relative w-full max-w-md px-8">
                <div className="flex gap-3 mb-4 justify-start">
                  <div className="px-4 py-2.5 rounded-2xl rounded-bl-md bg-white/5 border border-white/10 text-sm text-gray-400 max-w-[240px]">
                    Hi, I want to order 2kg turmeric powder
                  </div>
                </div>
                <div className="flex gap-3 justify-end">
                  <div className="px-4 py-2.5 rounded-2xl rounded-br-md bg-green-500/10 border border-green-500/20 text-sm text-green-400 max-w-[280px]">
                    नमस्ते! 2kg हल्दी पाउडर ₹450 में उपलब्ध है। ऑर्डर करें? 🙏
                  </div>
                </div>
                <div className="flex justify-end mt-1">
                  <span className="text-[10px] text-green-600 flex items-center gap-1">
                    <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                    </svg>
                    AI-generated reply
                  </span>
                </div>
              </div>
            </div>

            {/* Play button overlay */}
            <div className="absolute inset-0 flex items-center justify-center z-10">
              <div className="w-20 h-20 rounded-full bg-green-500/20 border-2 border-green-400/50 flex items-center justify-center group-hover:bg-green-500/30 group-hover:scale-110 transition-all duration-300 backdrop-blur-sm">
                <svg
                  className="w-8 h-8 text-green-400 ml-1"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path d="M8 5v14l11-7z" />
                </svg>
              </div>
            </div>

            {/* "Demo coming soon" label */}
            <div className="absolute bottom-4 left-1/2 -translate-x-1/2 px-4 py-1.5 rounded-full bg-black/60 border border-white/10 text-xs text-gray-400 backdrop-blur-sm z-10">
              Demo video coming soon — डेमो वीडियो जल्द आ रहा है
            </div>
          </div>
        </AnimateOnScroll>
      </div>
    </section>
  );
}
