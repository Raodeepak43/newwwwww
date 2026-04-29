import { redirect } from "next/navigation";
import { createServerSupabaseClient } from "@/lib/supabase-server";

const plans = [
  {
    name: "Free",
    nameHi: "मुफ़्त",
    price: "₹0",
    period: "/month",
    features: [
      "100 AI replies / month",
      "1 WhatsApp number",
      "Basic analytics",
      "Community support",
    ],
    current: true,
  },
  {
    name: "Premium",
    nameHi: "प्रीमियम",
    price: "₹999",
    period: "/month",
    features: [
      "Unlimited AI replies",
      "5 WhatsApp numbers",
      "Advanced analytics",
      "Priority support",
      "Custom AI training",
      "API access",
    ],
    current: false,
  },
];

export default async function UpgradePage() {
  const supabase = createServerSupabaseClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) redirect("/login");

  const { data: profile } = await supabase
    .from("users")
    .select("plan")
    .eq("id", user.id)
    .single();

  const currentPlan = profile?.plan || "free";

  return (
    <div>
      <div className="mb-8">
        <h1 className="text-2xl sm:text-3xl font-bold text-white mb-1">
          Upgrade / अपग्रेड
        </h1>
        <p className="text-gray-500 text-sm">
          अपने प्लान को अपग्रेड करें — Upgrade your plan for more features
        </p>
      </div>

      <div className="grid md:grid-cols-2 gap-6 max-w-3xl">
        {plans.map((plan, i) => {
          const isCurrentPlan =
            (currentPlan === "free" && plan.name === "Free") ||
            (currentPlan === "premium" && plan.name === "Premium");
          const isPremiumCard = plan.name === "Premium";

          return (
            <div
              key={i}
              className={`relative p-6 rounded-2xl border transition-all ${
                isPremiumCard
                  ? "bg-gradient-to-b from-green-500/10 to-transparent border-green-500/30"
                  : "bg-white/[0.03] border-white/10"
              }`}
            >
              {isPremiumCard && (
                <div className="absolute -top-3 left-1/2 -translate-x-1/2 px-3 py-0.5 rounded-full bg-gradient-to-r from-green-500 to-emerald-600 text-white text-xs font-semibold">
                  RECOMMENDED
                </div>
              )}

              <h3 className="text-lg font-semibold text-white mb-1">
                {plan.nameHi}{" "}
                <span className="text-gray-500">/ {plan.name}</span>
              </h3>

              <div className="mb-6">
                <span className="text-4xl font-extrabold text-white">
                  {plan.price}
                </span>
                <span className="text-gray-500">{plan.period}</span>
              </div>

              <ul className="space-y-2.5 mb-6">
                {plan.features.map((f, j) => (
                  <li key={j} className="flex items-center gap-2.5">
                    <svg
                      className={`w-4 h-4 flex-shrink-0 ${
                        isPremiumCard ? "text-green-400" : "text-gray-500"
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
                    <span className="text-sm text-gray-400">{f}</span>
                  </li>
                ))}
              </ul>

              {isCurrentPlan ? (
                <div className="w-full py-2.5 text-center rounded-full border border-white/10 text-sm text-gray-500">
                  Current Plan / वर्तमान प्लान
                </div>
              ) : (
                <button
                  className={`w-full py-2.5 rounded-full font-semibold text-sm transition-all ${
                    isPremiumCard
                      ? "bg-gradient-to-r from-green-500 to-emerald-600 text-white hover:from-green-400 hover:to-emerald-500 shadow-lg shadow-green-500/25"
                      : "border border-white/20 text-white hover:bg-white/5"
                  }`}
                >
                  {isPremiumCard
                    ? "Upgrade to Premium / प्रीमियम लें"
                    : "Downgrade / डाउनग्रेड"}
                </button>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}
