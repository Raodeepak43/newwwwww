import { redirect } from "next/navigation";
import { createServerSupabaseClient } from "@/lib/supabase-server";

interface Message {
  id: string;
  from_number: string;
  to_number: string;
  customer_message: string;
  ai_reply: string;
  created_at: string;
}

function formatTime(iso: string) {
  const d = new Date(iso);
  const now = new Date();
  const diffMs = now.getTime() - d.getTime();
  const diffMin = Math.floor(diffMs / 60000);
  const diffHr = Math.floor(diffMin / 60);
  const diffDay = Math.floor(diffHr / 24);

  if (diffMin < 1) return "Just now";
  if (diffMin < 60) return `${diffMin}m ago`;
  if (diffHr < 24) return `${diffHr}h ago`;
  if (diffDay < 7) return `${diffDay}d ago`;
  return d.toLocaleDateString("en-IN", {
    day: "numeric",
    month: "short",
    year: "numeric",
  });
}

function maskNumber(num: string) {
  if (num.length <= 6) return num;
  return num.slice(0, -4).replace(/./g, "*") + num.slice(-4);
}

export default async function MessagesPage() {
  const supabase = createServerSupabaseClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) redirect("/login");

  const { data: messages } = await supabase
    .from("messages")
    .select("*")
    .eq("user_id", user.id)
    .order("created_at", { ascending: false })
    .limit(200);

  const list: Message[] = messages ?? [];

  return (
    <div>
      <div className="mb-8">
        <h1 className="text-2xl sm:text-3xl font-bold text-white mb-1">
          Messages / मैसेज
        </h1>
        <p className="text-gray-500 text-sm">
          सभी कस्टमर बातचीत — All customer conversations
        </p>
      </div>

      {list.length === 0 ? (
        <div className="text-center py-20">
          <div className="w-16 h-16 rounded-full bg-white/5 flex items-center justify-center mx-auto mb-4">
            <svg
              className="w-8 h-8 text-gray-600"
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
          </div>
          <h3 className="text-white font-semibold mb-1">कोई मैसेज नहीं</h3>
          <p className="text-sm text-gray-500">
            No messages yet. Connect your WhatsApp to start receiving messages.
          </p>
        </div>
      ) : (
        <div className="space-y-3">
          {list.map((msg) => (
            <div
              key={msg.id}
              className="p-5 rounded-2xl bg-white/[0.03] border border-white/10 hover:border-white/15 transition-colors"
            >
              {/* Header row */}
              <div className="flex items-center justify-between mb-3">
                <div className="flex items-center gap-2">
                  <div className="w-8 h-8 rounded-full bg-green-500/10 flex items-center justify-center">
                    <svg
                      className="w-4 h-4 text-green-400"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
                      />
                    </svg>
                  </div>
                  <span className="text-sm font-medium text-white">
                    {maskNumber(msg.from_number)}
                  </span>
                </div>
                <span className="text-xs text-gray-600">
                  {formatTime(msg.created_at)}
                </span>
              </div>

              {/* Customer message */}
              <div className="mb-3">
                <div className="text-[11px] uppercase tracking-wider text-gray-600 mb-1">
                  Customer
                </div>
                <p className="text-sm text-gray-300 leading-relaxed bg-white/[0.02] rounded-xl px-4 py-3">
                  {msg.customer_message}
                </p>
              </div>

              {/* AI reply */}
              <div>
                <div className="text-[11px] uppercase tracking-wider text-green-600 mb-1">
                  AI Reply
                </div>
                <p className="text-sm text-gray-300 leading-relaxed bg-green-500/[0.04] border border-green-500/10 rounded-xl px-4 py-3">
                  {msg.ai_reply}
                </p>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
