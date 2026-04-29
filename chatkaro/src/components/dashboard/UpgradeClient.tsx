"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Script from "next/script";

interface Props {
  currentPlan: string;
}

declare global {
  interface Window {
    Razorpay: new (options: RazorpayOptions) => RazorpayInstance;
  }
}

interface RazorpayOptions {
  key: string;
  amount: number;
  currency: string;
  name: string;
  description: string;
  order_id: string;
  prefill: { email: string; name: string };
  theme: { color: string };
  handler: (response: RazorpayResponse) => void;
  modal?: { ondismiss?: () => void };
}

interface RazorpayInstance {
  open: () => void;
}

interface RazorpayResponse {
  razorpay_order_id: string;
  razorpay_payment_id: string;
  razorpay_signature: string;
}

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
  },
];

export default function UpgradeClient({ currentPlan }: Props) {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [status, setStatus] = useState<"idle" | "success" | "error">("idle");
  const [errorMsg, setErrorMsg] = useState("");

  const handleUpgrade = async () => {
    setLoading(true);
    setStatus("idle");
    setErrorMsg("");

    try {
      const res = await fetch("/api/payment/create", { method: "POST" });
      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.error || "Failed to create order");
      }

      const options: RazorpayOptions = {
        key: data.key_id,
        amount: data.amount,
        currency: data.currency,
        name: "ChatKaro",
        description: "Premium Plan — ₹999/month",
        order_id: data.order_id,
        prefill: {
          email: data.user_email,
          name: data.business_name,
        },
        theme: { color: "#22c55e" },
        handler: async (response: RazorpayResponse) => {
          try {
            const verifyRes = await fetch("/api/payment/verify", {
              method: "POST",
              headers: { "Content-Type": "application/json" },
              body: JSON.stringify({
                razorpay_order_id: response.razorpay_order_id,
                razorpay_payment_id: response.razorpay_payment_id,
                razorpay_signature: response.razorpay_signature,
              }),
            });

            const verifyData = await verifyRes.json();

            if (!verifyRes.ok) {
              throw new Error(verifyData.error || "Verification failed");
            }

            setStatus("success");
            router.refresh();
          } catch (err) {
            setStatus("error");
            setErrorMsg(
              err instanceof Error ? err.message : "Payment verification failed"
            );
          }
        },
        modal: {
          ondismiss: () => {
            setLoading(false);
          },
        },
      };

      const rzp = new window.Razorpay(options);
      rzp.open();
    } catch (err) {
      setStatus("error");
      setErrorMsg(
        err instanceof Error ? err.message : "Something went wrong"
      );
      setLoading(false);
    }
  };

  return (
    <div>
      <Script src="https://checkout.razorpay.com/v1/checkout.js" />

      <div className="mb-8">
        <h1 className="text-2xl sm:text-3xl font-bold text-white mb-1">
          Upgrade / अपग्रेड
        </h1>
        <p className="text-gray-500 text-sm">
          अपने प्लान को अपग्रेड करें — Upgrade your plan for more features
        </p>
      </div>

      {/* Success Banner */}
      {status === "success" && (
        <div className="mb-6 px-5 py-4 rounded-2xl bg-green-500/10 border border-green-500/20">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-green-500/20 flex items-center justify-center flex-shrink-0">
              <svg
                className="w-5 h-5 text-green-400"
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
            </div>
            <div>
              <h3 className="text-green-400 font-semibold text-sm">
                Premium Plan Activated!
              </h3>
              <p className="text-green-400/70 text-xs">
                बधाई हो! आपका प्लान अपग्रेड हो गया है। अब unlimited AI replies
                का आनंद लें। — Congratulations! Enjoy unlimited AI replies.
              </p>
            </div>
          </div>
        </div>
      )}

      {/* Error Banner */}
      {status === "error" && (
        <div className="mb-6 px-5 py-4 rounded-2xl bg-red-500/10 border border-red-500/20">
          <p className="text-red-400 text-sm">{errorMsg}</p>
        </div>
      )}

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
              {isPremiumCard && !isCurrentPlan && (
                <div className="absolute -top-3 left-1/2 -translate-x-1/2 px-3 py-0.5 rounded-full bg-gradient-to-r from-green-500 to-emerald-600 text-white text-xs font-semibold">
                  RECOMMENDED
                </div>
              )}
              {isCurrentPlan && (
                <div className="absolute -top-3 left-1/2 -translate-x-1/2 px-3 py-0.5 rounded-full bg-white/10 text-white text-xs font-semibold">
                  CURRENT PLAN
                </div>
              )}

              <h3 className="text-lg font-semibold text-white mb-1 mt-2">
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
                  वर्तमान प्लान — Current Plan
                </div>
              ) : isPremiumCard ? (
                <button
                  onClick={handleUpgrade}
                  disabled={loading || status === "success"}
                  className="w-full py-2.5 rounded-full font-semibold text-sm bg-gradient-to-r from-green-500 to-emerald-600 text-white hover:from-green-400 hover:to-emerald-500 shadow-lg shadow-green-500/25 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {loading
                    ? "Processing..."
                    : "Pay ₹999 — Premium लें"}
                </button>
              ) : (
                <div className="w-full py-2.5 text-center rounded-full border border-white/10 text-sm text-gray-500">
                  Free Plan
                </div>
              )}
            </div>
          );
        })}
      </div>

      {/* Payment security note */}
      <div className="mt-8 flex items-center gap-2 text-xs text-gray-600 max-w-3xl">
        <svg
          className="w-4 h-4 flex-shrink-0"
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
        <span>
          Payments are securely processed by Razorpay. We never store your card
          details. — भुगतान Razorpay द्वारा सुरक्षित रूप से संसाधित होते हैं।
        </span>
      </div>
    </div>
  );
}
