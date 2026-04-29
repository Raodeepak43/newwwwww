import Link from "next/link";
import AnimateOnScroll from "./AnimateOnScroll";

const plans = [
  {
    name: "Free",
    nameHi: "मुफ़्त",
    price: "₹0",
    period: "/month",
    description: "शुरुआत के लिए बिल्कुल सही — Perfect to get started",
    features: [
      "100 AI replies / month — 100 AI जवाब प्रति माह",
      "1 WhatsApp number — 1 व्हाट्सएप नंबर",
      "Basic analytics — बेसिक एनालिटिक्स",
      "Community support — कम्युनिटी सपोर्ट",
    ],
    cta: "30 दिन मुफ़्त — Try Free for 30 Days",
    highlighted: false,
  },
  {
    name: "Premium",
    nameHi: "प्रीमियम",
    price: "₹999",
    period: "/month",
    description: "बिज़नेस के लिए बेस्ट — Best for growing businesses",
    features: [
      "Unlimited AI replies — अनलिमिटेड AI जवाब",
      "5 WhatsApp numbers — 5 व्हाट्सएप नंबर",
      "Advanced analytics — एडवांस्ड एनालिटिक्स",
      "Priority support — प्रायोरिटी सपोर्ट",
      "Custom AI training — कस्टम AI ट्रेनिंग",
      "API access — API एक्सेस",
    ],
    cta: "Premium लें — Go Premium",
    highlighted: true,
  },
];

export default function Pricing() {
  return (
    <section id="pricing" className="py-24 relative">
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-green-500/5 rounded-full blur-[120px]" />
      </div>

      <div className="relative max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <AnimateOnScroll className="text-center mb-16">
          <h2 className="text-3xl sm:text-4xl font-bold mb-4">
            <span className="bg-gradient-to-r from-white to-gray-400 bg-clip-text text-transparent">
              प्लान चुनें —{" "}
            </span>
            <span className="bg-gradient-to-r from-green-400 to-emerald-400 bg-clip-text text-transparent">
              Choose Your Plan
            </span>
          </h2>
          <p className="text-gray-500 max-w-xl mx-auto">
            अपनी ज़रूरत के हिसाब से सही प्लान चुनें — Pick the plan that fits
            your needs
          </p>
        </AnimateOnScroll>

        <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
          {plans.map((plan, i) => (
            <AnimateOnScroll key={i} animation="fade-up" delay={i * 0.15}>
              <div
                className={`relative p-8 rounded-2xl border transition-all duration-300 h-full ${
                  plan.highlighted
                    ? "bg-gradient-to-b from-green-500/10 to-transparent border-green-500/30 shadow-xl shadow-green-500/10"
                    : "bg-white/[0.03] border-white/10 hover:border-white/20"
                }`}
              >
                {plan.highlighted && (
                  <div className="absolute -top-3 left-1/2 -translate-x-1/2 px-4 py-1 rounded-full bg-gradient-to-r from-green-500 to-emerald-600 text-white text-xs font-semibold">
                    POPULAR — लोकप्रिय
                  </div>
                )}

                <div className="mb-6">
                  <h3 className="text-lg font-semibold text-white">
                    {plan.nameHi}{" "}
                    <span className="text-gray-500">/ {plan.name}</span>
                  </h3>
                  <p className="text-sm text-gray-500 mt-1">
                    {plan.description}
                  </p>
                </div>

                <div className="mb-8">
                  <span className="text-5xl font-extrabold text-white">
                    {plan.price}
                  </span>
                  <span className="text-gray-500 text-lg">{plan.period}</span>
                </div>

                <ul className="space-y-3 mb-8">
                  {plan.features.map((feature, j) => (
                    <li key={j} className="flex items-start gap-3">
                      <svg
                        className={`w-5 h-5 mt-0.5 flex-shrink-0 ${
                          plan.highlighted ? "text-green-400" : "text-gray-500"
                        }`}
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M5 13l4 4L19 7"
                        />
                      </svg>
                      <span className="text-sm text-gray-400">{feature}</span>
                    </li>
                  ))}
                </ul>

                <Link
                  href="/signup"
                  className={`block w-full py-3 rounded-full font-semibold text-sm text-center transition-all ${
                    plan.highlighted
                      ? "bg-gradient-to-r from-green-500 to-emerald-600 text-white hover:from-green-400 hover:to-emerald-500 shadow-lg shadow-green-500/25 hover:shadow-green-500/40"
                      : "border border-white/20 text-white hover:bg-white/5"
                  }`}
                >
                  {plan.cta}
                </Link>
              </div>
            </AnimateOnScroll>
          ))}
        </div>
      </div>
    </section>
  );
}
