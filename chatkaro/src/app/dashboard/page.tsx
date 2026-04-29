import { redirect } from "next/navigation";
import { createServerSupabaseClient } from "@/lib/supabase-server";

export default async function OverviewPage() {
  const supabase = createServerSupabaseClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) redirect("/login");

  const { data: profile } = await supabase
    .from("users")
    .select("business_name, whatsapp_number, plan, language")
    .eq("id", user.id)
    .single();

  const now = new Date();
  const monthStart = new Date(now.getFullYear(), now.getMonth(), 1).toISOString();

  const { count: monthMessages } = await supabase
    .from("messages")
    .select("*", { count: "exact", head: true })
    .eq("user_id", user.id)
    .gte("created_at", monthStart);

  const plan = profile?.plan || "free";
  const limit = plan === "premium" ? Infinity : 100;
  const used = monthMessages ?? 0;
  const remaining = plan === "premium" ? "Unlimited" : Math.max(0, limit - used);
  const whatsappNumber = profile?.whatsapp_number || "Not connected";
  const businessName = profile?.business_name || "Your Business";

  const stats = [
    {
      label: "Messages This Month / इस महीने मैसेज",
      value: String(used),
      icon: (
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={1.5}
          d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z"
        />
      ),
      color: "text-green-400",
      bg: "bg-green-500/10",
    },
    {
      label: "Remaining / बाकी मैसेज",
      value: String(remaining),
      icon: (
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={1.5}
          d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4"
        />
      ),
      color: remaining === "Unlimited" || remaining === 0 ? "text-amber-400" : "text-blue-400",
      bg: remaining === "Unlimited" || remaining === 0 ? "bg-amber-500/10" : "bg-blue-500/10",
    },
    {
      label: "WhatsApp Number / व्हाट्सएप नंबर",
      value: whatsappNumber,
      icon: (
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={1.5}
          d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"
        />
      ),
      color: whatsappNumber === "Not connected" ? "text-gray-400" : "text-green-400",
      bg: "bg-green-500/10",
    },
    {
      label: "Current Plan / वर्तमान प्लान",
      value: plan === "premium" ? "Premium ₹999/mo" : "Free ₹0/mo",
      icon: (
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={1.5}
          d="M13 10V3L4 14h7v7l9-11h-7z"
        />
      ),
      color: plan === "premium" ? "text-emerald-400" : "text-gray-400",
      bg: plan === "premium" ? "bg-emerald-500/10" : "bg-white/5",
    },
  ];

  return (
    <div>
      <div className="mb-8">
        <h1 className="text-2xl sm:text-3xl font-bold text-white mb-1">
          नमस्ते, {businessName}!
        </h1>
        <p className="text-gray-500 text-sm">
          आपका ChatKaro डैशबोर्ड — Your ChatKaro Dashboard
        </p>
      </div>

      {/* Stats Grid */}
      <div className="grid sm:grid-cols-2 xl:grid-cols-4 gap-5 mb-10">
        {stats.map((stat, i) => (
          <div
            key={i}
            className="p-5 rounded-2xl bg-white/[0.03] border border-white/10 hover:border-white/15 transition-colors"
          >
            <div
              className={`w-10 h-10 rounded-xl ${stat.bg} flex items-center justify-center ${stat.color} mb-4`}
            >
              <svg
                className="w-5 h-5"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                {stat.icon}
              </svg>
            </div>
            <div className="text-xl font-bold text-white mb-1 truncate">
              {stat.value}
            </div>
            <div className="text-xs text-gray-500">{stat.label}</div>
          </div>
        ))}
      </div>

      {/* Limit Warning Banner (80+ messages on free plan) */}
      {plan !== "premium" && used >= 80 && (
        <div
          className={`mb-6 p-5 rounded-2xl border flex flex-col sm:flex-row sm:items-center gap-4 ${
            used >= 100
              ? "bg-red-500/10 border-red-500/20"
              : "bg-amber-500/10 border-amber-500/20"
          }`}
        >
          <div className="flex items-center gap-3 flex-1">
            <div
              className={`w-10 h-10 rounded-full flex items-center justify-center flex-shrink-0 ${
                used >= 100 ? "bg-red-500/20" : "bg-amber-500/20"
              }`}
            >
              <svg
                className={`w-5 h-5 ${
                  used >= 100 ? "text-red-400" : "text-amber-400"
                }`}
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4.5c-.77-.833-2.694-.833-3.464 0L3.34 16.5c-.77.833.192 2.5 1.732 2.5z"
                />
              </svg>
            </div>
            <div>
              <h3
                className={`font-semibold text-sm ${
                  used >= 100 ? "text-red-400" : "text-amber-400"
                }`}
              >
                {used >= 100
                  ? "मैसेज लिमिट खत्म! — Message limit reached!"
                  : `${100 - used} मैसेज बाकी — Only ${100 - used} messages remaining!`}
              </h3>
              <p
                className={`text-xs mt-0.5 ${
                  used >= 100 ? "text-red-400/70" : "text-amber-400/70"
                }`}
              >
                {used >= 100
                  ? "अपने कस्टमर्स को जवाब जारी रखने के लिए Premium में अपग्रेड करें।"
                  : "Premium में अपग्रेड करें और unlimited AI replies पाएं।"}
              </p>
            </div>
          </div>
          <a
            href="/dashboard/upgrade"
            className="px-5 py-2 rounded-full bg-gradient-to-r from-green-500 to-emerald-600 text-white font-semibold text-sm hover:from-green-400 hover:to-emerald-500 transition-all shadow-lg shadow-green-500/25 text-center flex-shrink-0"
          >
            Upgrade — ₹999/mo
          </a>
        </div>
      )}

      {/* Usage Bar (free plan only) */}
      {plan !== "premium" && (
        <div className="p-6 rounded-2xl bg-white/[0.03] border border-white/10 mb-8">
          <div className="flex items-center justify-between mb-3">
            <h2 className="text-sm font-semibold text-white">
              Monthly Usage / मासिक उपयोग
            </h2>
            <span className="text-xs text-gray-500">{used} / 100</span>
          </div>
          <div className="w-full h-2.5 rounded-full bg-white/5">
            <div
              className={`h-full rounded-full transition-all ${
                used >= 90 ? "bg-red-500" : used >= 70 ? "bg-amber-500" : "bg-green-500"
              }`}
              style={{ width: `${Math.min(100, used)}%` }}
            />
          </div>
          {used >= 90 && (
            <p className="text-xs text-amber-400 mt-2">
              आपकी लिमिट लगभग खत्म हो गई है — You&apos;re almost at your limit.
              Consider upgrading.
            </p>
          )}
        </div>
      )}

      {/* Quick Actions */}
      <div className="grid sm:grid-cols-2 gap-5">
        {whatsappNumber === "Not connected" && (
          <a
            href="/dashboard/settings"
            className="p-6 rounded-2xl bg-white/[0.03] border border-white/10 hover:border-green-500/30 transition-all group"
          >
            <h3 className="text-white font-semibold mb-1 group-hover:text-green-400 transition-colors">
              WhatsApp कनेक्ट करें — Connect WhatsApp
            </h3>
            <p className="text-xs text-gray-500">
              Settings में जाकर अपना WhatsApp नंबर जोड़ें
            </p>
          </a>
        )}
        {plan === "free" && (
          <a
            href="/dashboard/upgrade"
            className="p-6 rounded-2xl bg-gradient-to-br from-green-500/5 to-emerald-500/5 border border-green-500/20 hover:border-green-500/40 transition-all group"
          >
            <h3 className="text-white font-semibold mb-1 group-hover:text-green-400 transition-colors">
              Premium में अपग्रेड करें — Upgrade to Premium
            </h3>
            <p className="text-xs text-gray-500">
              Unlimited AI replies, 5 WhatsApp numbers, और बहुत कुछ
            </p>
          </a>
        )}
      </div>
    </div>
  );
}
