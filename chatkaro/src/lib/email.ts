import { Resend } from "resend";

let resendInstance: Resend | null = null;

function getResend() {
  if (!resendInstance) {
    resendInstance = new Resend(process.env.RESEND_API_KEY!);
  }
  return resendInstance;
}

interface DailySummaryData {
  businessName: string;
  toEmail: string;
  totalMessages: number;
  topQuestions: string[];
  date: string;
}

export async function sendDailySummary(data: DailySummaryData) {
  const resend = getResend();
  const fromEmail = process.env.RESEND_FROM_EMAIL || "ChatKaro <noreply@chatkaro.in>";

  const topQuestionsHtml = data.topQuestions.length > 0
    ? data.topQuestions
        .map((q, i) => `<li style="margin-bottom:6px;color:#d1d5db;">${i + 1}. ${q}</li>`)
        .join("")
    : '<li style="color:#6b7280;">No messages received today</li>';

  const html = `
    <div style="background-color:#0a0a0a;padding:40px 20px;font-family:'Noto Sans',Arial,sans-serif;">
      <div style="max-width:560px;margin:0 auto;background-color:#111;border:1px solid rgba(255,255,255,0.1);border-radius:16px;padding:32px;">
        <div style="text-align:center;margin-bottom:24px;">
          <span style="color:#22c55e;font-size:24px;font-weight:bold;">ChatKaro</span>
          <p style="color:#6b7280;font-size:12px;margin-top:4px;">Daily Summary — दैनिक सारांश</p>
        </div>

        <h2 style="color:#fff;font-size:18px;margin-bottom:4px;">नमस्ते, ${data.businessName}!</h2>
        <p style="color:#9ca3af;font-size:13px;margin-bottom:24px;">Here's your ChatKaro summary for ${data.date}:</p>

        <div style="background-color:rgba(34,197,94,0.1);border:1px solid rgba(34,197,94,0.2);border-radius:12px;padding:20px;text-align:center;margin-bottom:24px;">
          <div style="color:#22c55e;font-size:36px;font-weight:bold;">${data.totalMessages}</div>
          <div style="color:#6b7280;font-size:12px;">Messages Today / आज के मैसेज</div>
        </div>

        <h3 style="color:#fff;font-size:14px;margin-bottom:12px;">Top Customer Questions / मुख्य सवाल:</h3>
        <ul style="list-style:none;padding:0;margin:0 0 24px 0;font-size:13px;">
          ${topQuestionsHtml}
        </ul>

        <div style="text-align:center;margin-top:24px;">
          <a href="${process.env.NEXT_PUBLIC_APP_URL || "https://chatkaro.in"}/dashboard"
             style="display:inline-block;padding:10px 28px;background:linear-gradient(135deg,#22c55e,#059669);color:#fff;text-decoration:none;border-radius:999px;font-size:13px;font-weight:600;">
            View Dashboard — डैशबोर्ड देखें
          </a>
        </div>

        <p style="color:#374151;font-size:11px;text-align:center;margin-top:32px;">
          &copy; ChatKaro. All rights reserved.
        </p>
      </div>
    </div>
  `;

  return resend.emails.send({
    from: fromEmail,
    to: data.toEmail,
    subject: `ChatKaro Daily: ${data.totalMessages} messages on ${data.date}`,
    html,
  });
}

export async function sendTrialExpiredNotice(
  toEmail: string,
  businessName: string
) {
  const resend = getResend();
  const fromEmail = process.env.RESEND_FROM_EMAIL || "ChatKaro <noreply@chatkaro.in>";

  const html = `
    <div style="background-color:#0a0a0a;padding:40px 20px;font-family:'Noto Sans',Arial,sans-serif;">
      <div style="max-width:560px;margin:0 auto;background-color:#111;border:1px solid rgba(255,255,255,0.1);border-radius:16px;padding:32px;">
        <div style="text-align:center;margin-bottom:24px;">
          <span style="color:#22c55e;font-size:24px;font-weight:bold;">ChatKaro</span>
        </div>

        <h2 style="color:#fff;font-size:18px;margin-bottom:8px;">आपका फ्री ट्रायल खत्म हो गया है</h2>
        <p style="color:#9ca3af;font-size:13px;margin-bottom:24px;">
          ${businessName}, your free trial has ended. Upgrade to Premium to keep AI running on your WhatsApp.
        </p>

        <div style="text-align:center;">
          <a href="${process.env.NEXT_PUBLIC_APP_URL || "https://chatkaro.in"}/dashboard/upgrade"
             style="display:inline-block;padding:12px 32px;background:linear-gradient(135deg,#22c55e,#059669);color:#fff;text-decoration:none;border-radius:999px;font-size:14px;font-weight:600;">
            Upgrade to Premium — ₹999/mo
          </a>
        </div>

        <p style="color:#374151;font-size:11px;text-align:center;margin-top:32px;">
          &copy; ChatKaro. All rights reserved.
        </p>
      </div>
    </div>
  `;

  return resend.emails.send({
    from: fromEmail,
    to: toEmail,
    subject: "ChatKaro: Your free trial has ended — अपग्रेड करें",
    html,
  });
}
