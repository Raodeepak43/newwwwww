import { NextRequest, NextResponse } from "next/server";
import { createAdminClient } from "@/lib/supabase-admin";
import { sendDailySummary } from "@/lib/email";

export async function POST(request: NextRequest) {
  try {
    const authHeader = request.headers.get("authorization");
    if (authHeader !== `Bearer ${process.env.CRON_SECRET}`) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const supabase = createAdminClient();

    const { data: users } = await supabase
      .from("users")
      .select("id, email, business_name")
      .not("email", "is", null);

    if (!users || users.length === 0) {
      return NextResponse.json({ message: "No users to process" });
    }

    const now = new Date();
    const todayStart = new Date(
      now.getFullYear(),
      now.getMonth(),
      now.getDate()
    ).toISOString();
    const dateStr = now.toLocaleDateString("en-IN", {
      day: "numeric",
      month: "long",
      year: "numeric",
    });

    let sent = 0;
    let failed = 0;

    for (const user of users) {
      try {
        const { data: messages } = await supabase
          .from("messages")
          .select("customer_message")
          .eq("user_id", user.id)
          .gte("created_at", todayStart)
          .order("created_at", { ascending: false })
          .limit(50);

        const totalMessages = messages?.length ?? 0;

        if (totalMessages === 0) continue;

        const topQuestions = messages!
          .map((m) => m.customer_message)
          .slice(0, 5);

        await sendDailySummary({
          businessName: user.business_name || "Business Owner",
          toEmail: user.email,
          totalMessages,
          topQuestions,
          date: dateStr,
        });

        sent++;
      } catch (err) {
        console.error(`Failed to send summary to ${user.email}:`, err);
        failed++;
      }
    }

    return NextResponse.json({
      success: true,
      sent,
      failed,
      total: users.length,
    });
  } catch (error) {
    console.error("Daily summary cron error:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
