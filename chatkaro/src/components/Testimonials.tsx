import AnimateOnScroll from "./AnimateOnScroll";

const testimonials = [
  {
    name: "Priya Sharma",
    nameHi: "प्रिया शर्मा",
    business: "Sharma Spices, Jaipur",
    avatar: "PS",
    color: "from-pink-500 to-rose-600",
    quoteHi:
      "ChatKaro ने हमारे बिज़नेस को बदल दिया। अब हमारे कस्टमर्स को रात 2 बजे भी तुरंत जवाब मिलता है।",
    quoteEn:
      "ChatKaro transformed our business. Our customers get instant replies even at 2 AM. Sales have increased by 40%!",
    rating: 5,
  },
  {
    name: "Rajesh Patel",
    nameHi: "राजेश पटेल",
    business: "Patel Electronics, Ahmedabad",
    avatar: "RP",
    color: "from-blue-500 to-cyan-600",
    quoteHi:
      "पहले हम दिन में 200+ मैसेज मैन्युअली हैंडल करते थे। अब AI सब संभालता है और हम बिज़नेस ग्रो करने पर फोकस करते हैं।",
    quoteEn:
      "We used to manually handle 200+ messages daily. Now AI handles everything and we focus on growing the business.",
    rating: 5,
  },
  {
    name: "Anita Verma",
    nameHi: "अनीता वर्मा",
    business: "Verma Boutique, Delhi",
    avatar: "AV",
    color: "from-purple-500 to-violet-600",
    quoteHi:
      "सबसे अच्छी बात यह है कि AI हमारे प्रोडक्ट्स के बारे में सही जानकारी देता है। कस्टमर्स को लगता है कि हम खुद रिप्लाई कर रहे हैं!",
    quoteEn:
      "The best part is the AI gives accurate info about our products. Customers think we're replying personally!",
    rating: 5,
  },
];

export default function Testimonials() {
  return (
    <section className="py-24 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <AnimateOnScroll className="text-center mb-16">
          <h2 className="text-3xl sm:text-4xl font-bold mb-4">
            <span className="bg-gradient-to-r from-white to-gray-400 bg-clip-text text-transparent">
              हमारे खुश ग्राहक —{" "}
            </span>
            <span className="bg-gradient-to-r from-green-400 to-emerald-400 bg-clip-text text-transparent">
              Happy Customers
            </span>
          </h2>
          <p className="text-gray-500 max-w-xl mx-auto">
            देखें हज़ारों बिज़नेस ओनर्स क्या कहते हैं ChatKaro के बारे में
          </p>
        </AnimateOnScroll>

        <div className="grid md:grid-cols-3 gap-8">
          {testimonials.map((t, i) => (
            <AnimateOnScroll key={i} animation="fade-up" delay={i * 0.15}>
              <div className="p-6 rounded-2xl bg-white/[0.03] border border-white/10 hover:border-white/15 transition-all h-full flex flex-col">
                {/* Stars */}
                <div className="flex gap-1 mb-4">
                  {Array.from({ length: t.rating }).map((_, j) => (
                    <svg
                      key={j}
                      className="w-4 h-4 text-yellow-500"
                      fill="currentColor"
                      viewBox="0 0 20 20"
                    >
                      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                    </svg>
                  ))}
                </div>

                {/* Hindi Quote */}
                <p className="text-gray-300 text-sm leading-relaxed mb-2 flex-1">
                  &ldquo;{t.quoteHi}&rdquo;
                </p>
                <p className="text-gray-500 text-xs leading-relaxed mb-5">
                  &ldquo;{t.quoteEn}&rdquo;
                </p>

                {/* Author */}
                <div className="flex items-center gap-3 pt-4 border-t border-white/5">
                  <div
                    className={`w-10 h-10 rounded-full bg-gradient-to-br ${t.color} flex items-center justify-center text-white text-sm font-bold flex-shrink-0`}
                  >
                    {t.avatar}
                  </div>
                  <div>
                    <div className="text-sm font-medium text-white">
                      {t.nameHi}{" "}
                      <span className="text-gray-500 font-normal">
                        / {t.name}
                      </span>
                    </div>
                    <div className="text-xs text-gray-600">{t.business}</div>
                  </div>
                </div>
              </div>
            </AnimateOnScroll>
          ))}
        </div>
      </div>
    </section>
  );
}
