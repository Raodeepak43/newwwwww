"use client";

import { useState } from "react";

const LANGUAGES = ["Hindi", "English", "Punjabi", "Auto"];

interface Props {
  initialWhatsapp: string;
  initialDescription: string;
  initialLanguage: string;
}

export default function SettingsForm({
  initialWhatsapp,
  initialDescription,
  initialLanguage,
}: Props) {
  const [whatsapp, setWhatsapp] = useState(initialWhatsapp);
  const [description, setDescription] = useState(initialDescription);
  const [language, setLanguage] = useState(initialLanguage);
  const [saving, setSaving] = useState(false);
  const [status, setStatus] = useState<"idle" | "success" | "error">("idle");
  const [errorMsg, setErrorMsg] = useState("");

  const handleSave = async () => {
    setSaving(true);
    setStatus("idle");
    setErrorMsg("");

    try {
      const res = await fetch("/api/settings", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          whatsapp_number: whatsapp || null,
          business_description: description,
          language,
        }),
      });

      if (!res.ok) {
        const data = await res.json();
        throw new Error(data.error || "Failed to save settings");
      }

      setStatus("success");
    } catch (err) {
      setStatus("error");
      setErrorMsg(err instanceof Error ? err.message : "Something went wrong");
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="max-w-2xl space-y-8">
      {/* WhatsApp Number */}
      <div className="p-6 rounded-2xl bg-white/[0.03] border border-white/10">
        <h2 className="text-white font-semibold mb-1">
          WhatsApp Number / व्हाट्सएप नंबर
        </h2>
        <p className="text-xs text-gray-500 mb-4">
          अपना Twilio WhatsApp नंबर डालें (जैसे whatsapp:+919876543210) — Enter
          your Twilio WhatsApp number
        </p>
        <input
          type="text"
          value={whatsapp}
          onChange={(e) => setWhatsapp(e.target.value)}
          placeholder="whatsapp:+919876543210"
          className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white placeholder-gray-600 focus:outline-none focus:border-green-500/50 focus:ring-1 focus:ring-green-500/50 transition-all text-sm"
        />
      </div>

      {/* Business Description */}
      <div className="p-6 rounded-2xl bg-white/[0.03] border border-white/10">
        <h2 className="text-white font-semibold mb-1">
          Business Description / बिज़नेस विवरण
        </h2>
        <p className="text-xs text-gray-500 mb-4">
          AI को आपके बिज़नेस के बारे में बताएं ताकि बेहतर जवाब मिलें — Describe
          your business so AI can give more relevant replies
        </p>
        <textarea
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          placeholder="We sell organic spices online. We deliver across India within 3-5 days. Our popular products are turmeric, cumin, and chili powder."
          rows={4}
          className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white placeholder-gray-600 focus:outline-none focus:border-green-500/50 focus:ring-1 focus:ring-green-500/50 transition-all text-sm resize-none"
        />
      </div>

      {/* Language Selection */}
      <div className="p-6 rounded-2xl bg-white/[0.03] border border-white/10">
        <h2 className="text-white font-semibold mb-1">
          Reply Language / जवाब की भाषा
        </h2>
        <p className="text-xs text-gray-500 mb-4">
          AI किस भाषा में जवाब दे — Choose the language for AI replies
        </p>
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
          {LANGUAGES.map((lang) => (
            <button
              key={lang}
              onClick={() => setLanguage(lang)}
              className={`px-4 py-3 rounded-xl text-sm font-medium transition-all ${
                language === lang
                  ? "bg-green-500/15 border border-green-500/40 text-green-400"
                  : "bg-white/[0.03] border border-white/10 text-gray-400 hover:bg-white/5 hover:text-white"
              }`}
            >
              {lang}
            </button>
          ))}
        </div>
      </div>

      {/* Status Messages */}
      {status === "success" && (
        <div className="px-4 py-3 rounded-xl bg-green-500/10 border border-green-500/20 text-green-400 text-sm">
          सेटिंग्स सेव हो गईं — Settings saved successfully!
        </div>
      )}
      {status === "error" && (
        <div className="px-4 py-3 rounded-xl bg-red-500/10 border border-red-500/20 text-red-400 text-sm">
          {errorMsg}
        </div>
      )}

      {/* Save Button */}
      <button
        onClick={handleSave}
        disabled={saving}
        className="px-8 py-3 rounded-full bg-gradient-to-r from-green-500 to-emerald-600 text-white font-semibold text-sm hover:from-green-400 hover:to-emerald-500 transition-all shadow-lg shadow-green-500/25 disabled:opacity-50 disabled:cursor-not-allowed"
      >
        {saving ? "सेव हो रहा है..." : "Save Settings / सेव करें"}
      </button>
    </div>
  );
}
