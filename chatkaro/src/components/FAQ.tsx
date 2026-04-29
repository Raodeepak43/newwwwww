"use client";

import { useState } from "react";
import AnimateOnScroll from "./AnimateOnScroll";

const faqs = [
  {
    questionHi: "ChatKaro क्या है?",
    questionEn: "What is ChatKaro?",
    answerHi:
      "ChatKaro एक AI-powered प्लेटफ़ॉर्म है जो आपके WhatsApp बिज़नेस नंबर को Claude AI से जोड़ता है। यह आपके कस्टमर्स के मैसेज का ऑटोमैटिक जवाब देता है — 24/7।",
    answerEn:
      "ChatKaro is an AI-powered platform that connects your WhatsApp business number with Claude AI. It automatically replies to your customer messages — 24/7, without any manual effort.",
  },
  {
    questionHi: "क्या मुझे WhatsApp Business API चाहिए?",
    questionEn: "Do I need a WhatsApp Business API?",
    answerHi:
      "हम Twilio के ज़रिए WhatsApp से कनेक्ट होते हैं। आपको बस एक Twilio अकाउंट बनाना होगा और अपना WhatsApp नंबर रजिस्टर करना होगा। बाकी सब ChatKaro संभालता है।",
    answerEn:
      "We connect via Twilio's WhatsApp API. You just need to create a Twilio account and register your WhatsApp number. ChatKaro handles the rest.",
  },
  {
    questionHi: "Free plan में क्या-क्या मिलता है?",
    questionEn: "What's included in the Free plan?",
    answerHi:
      "Free plan में आपको हर महीने 100 AI replies, 1 WhatsApp नंबर, बेसिक एनालिटिक्स और कम्युनिटी सपोर्ट मिलता है। शुरुआत के लिए बिल्कुल सही!",
    answerEn:
      "The Free plan includes 100 AI replies/month, 1 WhatsApp number, basic analytics, and community support. Perfect for getting started!",
  },
  {
    questionHi: "AI किन भाषाओं में जवाब दे सकता है?",
    questionEn: "Which languages does the AI support?",
    answerHi:
      "ChatKaro का AI हिंदी, English, पंजाबी और Auto-detect मोड में जवाब दे सकता है। Auto मोड में AI कस्टमर की भाषा पहचानकर उसी में जवाब देता है।",
    answerEn:
      "ChatKaro's AI can reply in Hindi, English, Punjabi, and Auto-detect mode. In Auto mode, the AI detects the customer's language and replies in the same language.",
  },
  {
    questionHi: "क्या मेरा डेटा सुरक्षित है?",
    questionEn: "Is my data secure?",
    answerHi:
      "बिल्कुल! हम Supabase पर Row Level Security, एंड-टू-एंड एन्क्रिप्शन और सिक्योर API keys इस्तेमाल करते हैं। आपका डेटा सिर्फ़ आपका है।",
    answerEn:
      "Absolutely! We use Supabase Row Level Security, end-to-end encryption, and secure API keys. Your data belongs only to you.",
  },
];

export default function FAQ() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  return (
    <section id="faq" className="py-24 relative">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        <AnimateOnScroll className="text-center mb-16">
          <h2 className="text-3xl sm:text-4xl font-bold mb-4">
            <span className="bg-gradient-to-r from-white to-gray-400 bg-clip-text text-transparent">
              अक्सर पूछे जाने वाले सवाल —{" "}
            </span>
            <span className="bg-gradient-to-r from-green-400 to-emerald-400 bg-clip-text text-transparent">
              FAQ
            </span>
          </h2>
          <p className="text-gray-500 max-w-xl mx-auto">
            आपके सवालों के जवाब — Answers to your questions
          </p>
        </AnimateOnScroll>

        <div className="space-y-3">
          {faqs.map((faq, i) => {
            const isOpen = openIndex === i;
            return (
              <AnimateOnScroll key={i} animation="fade-up" delay={i * 0.08}>
                <div
                  className={`rounded-2xl border transition-all duration-300 ${
                    isOpen
                      ? "bg-white/[0.04] border-green-500/20"
                      : "bg-white/[0.02] border-white/10 hover:border-white/15"
                  }`}
                >
                  <button
                    onClick={() => setOpenIndex(isOpen ? null : i)}
                    className="w-full text-left px-6 py-5 flex items-center justify-between gap-4"
                  >
                    <div>
                      <span className="text-sm font-semibold text-white block">
                        {faq.questionHi}
                      </span>
                      <span className="text-xs text-gray-500">
                        {faq.questionEn}
                      </span>
                    </div>
                    <svg
                      className={`w-5 h-5 text-gray-500 flex-shrink-0 transition-transform duration-300 ${
                        isOpen ? "rotate-180" : ""
                      }`}
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M19 9l-7 7-7-7"
                      />
                    </svg>
                  </button>

                  <div
                    className={`overflow-hidden transition-all duration-300 ${
                      isOpen ? "max-h-60 opacity-100" : "max-h-0 opacity-0"
                    }`}
                  >
                    <div className="px-6 pb-5 pt-0">
                      <p className="text-sm text-gray-300 leading-relaxed mb-2">
                        {faq.answerHi}
                      </p>
                      <p className="text-xs text-gray-500 leading-relaxed">
                        {faq.answerEn}
                      </p>
                    </div>
                  </div>
                </div>
              </AnimateOnScroll>
            );
          })}
        </div>
      </div>
    </section>
  );
}
