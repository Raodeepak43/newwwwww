import { NextRequest, NextResponse } from "next/server";
import twilio from "twilio";
import Anthropic from "@anthropic-ai/sdk";
import { createAdminClient } from "@/lib/supabase-admin";

const twilioClient = twilio(
  process.env.TWILIO_ACCOUNT_SID!,
  process.env.TWILIO_AUTH_TOKEN!
);

const anthropic = new Anthropic({
  apiKey: process.env.ANTHROPIC_API_KEY!,
});

export async function POST(request: NextRequest) {
  try {
    const formData = await request.formData();

    const customerMessage = formData.get("Body") as string | null;
    const fromNumber = formData.get("From") as string | null;
    const toNumber = formData.get("To") as string | null;

    if (!customerMessage || !fromNumber || !toNumber) {
      return NextResponse.json(
        { error: "Missing required fields: Body, From, or To" },
        { status: 400 }
      );
    }

    const supabase = createAdminClient();

    const { data: user, error: userError } = await supabase
      .from("users")
      .select("id, business_name, language")
      .eq("whatsapp_number", toNumber)
      .single();

    if (userError || !user) {
      console.error("User lookup failed:", userError?.message);
      return twimlResponse(
        "Sorry, this number is not registered with ChatKaro."
      );
    }

    const businessName = user.business_name || "our business";
    const language = user.language || "Hindi";

    const systemPrompt = [
      `You are a helpful assistant for ${businessName}.`,
      `Reply in ${language} language selected by the user.`,
      `Be friendly, short and helpful.`,
    ].join("\n");

    const aiResponse = await anthropic.messages.create({
      model: "claude-sonnet-4-20250514",
      max_tokens: 300,
      system: systemPrompt,
      messages: [{ role: "user", content: customerMessage }],
    });

    const aiReply =
      aiResponse.content[0].type === "text"
        ? aiResponse.content[0].text
        : "Sorry, I could not generate a response.";

    await twilioClient.messages.create({
      body: aiReply,
      from: toNumber,
      to: fromNumber,
    });

    await supabase.from("messages").insert({
      user_id: user.id,
      from_number: fromNumber,
      to_number: toNumber,
      customer_message: customerMessage,
      ai_reply: aiReply,
    });

    return twimlResponse(aiReply);
  } catch (error) {
    console.error("Webhook error:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}

function twimlResponse(message: string) {
  const twiml = `<?xml version="1.0" encoding="UTF-8"?><Response><Message>${escapeXml(message)}</Message></Response>`;
  return new NextResponse(twiml, {
    status: 200,
    headers: { "Content-Type": "text/xml" },
  });
}

function escapeXml(str: string): string {
  return str
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&apos;");
}
