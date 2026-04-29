import { NextResponse } from "next/server";
import { createServerClient } from "@supabase/ssr";
import { cookies } from "next/headers";
import Razorpay from "razorpay";

function getRazorpay() {
  return new Razorpay({
    key_id: process.env.RAZORPAY_KEY_ID!,
    key_secret: process.env.RAZORPAY_KEY_SECRET!,
  });
}

function getSupabase() {
  const cookieStore = cookies();
  return createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        getAll() {
          return cookieStore.getAll();
        },
        setAll(cookiesToSet) {
          try {
            cookiesToSet.forEach(({ name, value, options }) =>
              cookieStore.set(name, value, options)
            );
          } catch {
            // Ignored
          }
        },
      },
    }
  );
}

export async function POST() {
  try {
    const supabase = getSupabase();

    const {
      data: { user },
    } = await supabase.auth.getUser();

    if (!user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const { data: profile } = await supabase
      .from("users")
      .select("plan, email, business_name")
      .eq("id", user.id)
      .single();

    if (profile?.plan === "premium") {
      return NextResponse.json(
        { error: "Already on premium plan" },
        { status: 400 }
      );
    }

    const razorpay = getRazorpay();
    const order = await razorpay.orders.create({
      amount: 99900, // ₹999 in paise
      currency: "INR",
      receipt: `chatkaro_${user.id}_${Date.now()}`,
      notes: {
        user_id: user.id,
        email: user.email || "",
        plan: "premium",
      },
    });

    return NextResponse.json({
      order_id: order.id,
      amount: order.amount,
      currency: order.currency,
      key_id: process.env.RAZORPAY_KEY_ID!,
      user_email: user.email || "",
      business_name: profile?.business_name || "",
    });
  } catch (error) {
    console.error("Payment create error:", error);
    return NextResponse.json(
      { error: "Failed to create payment order" },
      { status: 500 }
    );
  }
}
