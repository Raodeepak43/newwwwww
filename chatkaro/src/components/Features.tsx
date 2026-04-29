const features = [
  {
    icon: (
      <svg
        className="w-8 h-8"
        fill="none"
        stroke="currentColor"
        viewBox="0 0 24 24"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={1.5}
          d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z"
        />
      </svg>
    ),
    titleHi: "स्मार्ट ऑटो-रिप्लाई",
    titleEn: "Smart Auto-Reply",
    descHi:
      "AI आपके कस्टमर्स को तुरंत जवाब देता है — दिन हो या रात।",
    descEn:
      "AI replies to your customers instantly — day or night, 24/7 without any manual effort.",
  },
  {
    icon: (
      <svg
        className="w-8 h-8"
        fill="none"
        stroke="currentColor"
        viewBox="0 0 24 24"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={1.5}
          d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"
        />
      </svg>
    ),
    titleHi: "एनालिटिक्स डैशबोर्ड",
    titleEn: "Analytics Dashboard",
    descHi:
      "हर मैसेज, रिस्पॉन्स टाइम और कस्टमर डेटा को ट्रैक करें।",
    descEn:
      "Track every message, response time, and customer engagement data in a powerful real-time dashboard.",
  },
  {
    icon: (
      <svg
        className="w-8 h-8"
        fill="none"
        stroke="currentColor"
        viewBox="0 0 24 24"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={1.5}
          d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"
        />
      </svg>
    ),
    titleHi: "पूरी तरह सुरक्षित",
    titleEn: "Fully Secure",
    descHi:
      "एंड-टू-एंड एन्क्रिप्शन के साथ आपका डेटा पूरी तरह सुरक्षित रहता है।",
    descEn:
      "Your data stays fully protected with end-to-end encryption and enterprise-grade security protocols.",
  },
];

export default function Features() {
  return (
    <section id="features" className="py-24 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-16">
          <h2 className="text-3xl sm:text-4xl font-bold mb-4">
            <span className="bg-gradient-to-r from-white to-gray-400 bg-clip-text text-transparent">
              हमारी खासियतें —{" "}
            </span>
            <span className="bg-gradient-to-r from-green-400 to-emerald-400 bg-clip-text text-transparent">
              Our Features
            </span>
          </h2>
          <p className="text-gray-500 max-w-xl mx-auto">
            ChatKaro के साथ अपने बिज़नेस को अगले लेवल पर ले जाएं
          </p>
        </div>

        {/* Feature Cards */}
        <div className="grid md:grid-cols-3 gap-8">
          {features.map((f, i) => (
            <div
              key={i}
              className="group relative p-8 rounded-2xl bg-white/[0.03] border border-white/10 hover:border-green-500/30 transition-all duration-300 hover:bg-white/[0.05]"
            >
              <div className="w-14 h-14 rounded-xl bg-gradient-to-br from-green-500/20 to-emerald-500/20 flex items-center justify-center text-green-400 mb-6 group-hover:from-green-500/30 group-hover:to-emerald-500/30 transition-all">
                {f.icon}
              </div>
              <h3 className="text-xl font-semibold text-white mb-1">
                {f.titleHi}
              </h3>
              <p className="text-sm text-green-400 font-medium mb-3">
                {f.titleEn}
              </p>
              <p className="text-gray-400 text-sm leading-relaxed mb-1">
                {f.descHi}
              </p>
              <p className="text-gray-500 text-sm leading-relaxed">
                {f.descEn}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
