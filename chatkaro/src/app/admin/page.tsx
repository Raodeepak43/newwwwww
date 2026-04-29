import { redirect } from "next/navigation";
import { createServerSupabaseClient } from "@/lib/supabase-server";
import { createAdminClient } from "@/lib/supabase-admin";
import Link from "next/link";

const ADMIN_EMAIL = process.env.ADMIN_EMAIL || "admin@chatkaro.in";

interface UserRow {
  id: string;
  email: string;
  business_name: string;
  plan: string;
  whatsapp_number: string | null;
  created_at: string;
}

export default async function AdminPage() {
  const supabase = createServerSupabaseClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) redirect("/login");
  if (user.email !== ADMIN_EMAIL) redirect("/dashboard");

  const adminDb = createAdminClient();

  const { count: totalUsers } = await adminDb
    .from("users")
    .select("*", { count: "exact", head: true });

  const now = new Date();
  const todayStart = new Date(
    now.getFullYear(),
    now.getMonth(),
    now.getDate()
  ).toISOString();

  const { count: messagesToday } = await adminDb
    .from("messages")
    .select("*", { count: "exact", head: true })
    .gte("created_at", todayStart);

  const { count: premiumUsers } = await adminDb
    .from("users")
    .select("*", { count: "exact", head: true })
    .eq("plan", "premium");

  const revenueThisMonth = (premiumUsers ?? 0) * 999;

  const { data: allUsers } = await adminDb
    .from("users")
    .select("id, email, business_name, plan, whatsapp_number, created_at")
    .order("created_at", { ascending: false })
    .limit(200);

  const users: UserRow[] = allUsers ?? [];

  const stats = [
    {
      label: "Total Users",
      value: String(totalUsers ?? 0),
      color: "text-blue-400",
      bg: "bg-blue-500/10",
      icon: (
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={1.5}
          d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0z"
        />
      ),
    },
    {
      label: "Messages Today",
      value: String(messagesToday ?? 0),
      color: "text-green-400",
      bg: "bg-green-500/10",
      icon: (
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={1.5}
          d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z"
        />
      ),
    },
    {
      label: "Revenue This Month",
      value: `₹${revenueThisMonth.toLocaleString("en-IN")}`,
      color: "text-emerald-400",
      bg: "bg-emerald-500/10",
      icon: (
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={1.5}
          d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
        />
      ),
    },
    {
      label: "Premium Users",
      value: String(premiumUsers ?? 0),
      color: "text-yellow-400",
      bg: "bg-yellow-500/10",
      icon: (
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={1.5}
          d="M13 10V3L4 14h7v7l9-11h-7z"
        />
      ),
    },
  ];

  return (
    <div className="min-h-screen bg-[#0a0a0a]">
      {/* Top bar */}
      <nav className="border-b border-white/10 bg-[#0a0a0a]/80 backdrop-blur-md">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center gap-3">
              <Link href="/" className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-green-400 to-emerald-600 flex items-center justify-center text-white font-bold text-sm">
                  C
                </div>
                <span className="text-lg font-bold bg-gradient-to-r from-green-400 to-emerald-400 bg-clip-text text-transparent">
                  ChatKaro
                </span>
              </Link>
              <span className="px-2 py-0.5 rounded-md bg-red-500/10 border border-red-500/20 text-red-400 text-xs font-semibold">
                ADMIN
              </span>
            </div>
            <Link
              href="/dashboard"
              className="text-sm text-gray-400 hover:text-white transition-colors"
            >
              Dashboard &rarr;
            </Link>
          </div>
        </div>
      </nav>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        <div className="mb-8">
          <h1 className="text-2xl sm:text-3xl font-bold text-white mb-1">
            Admin Panel
          </h1>
          <p className="text-gray-500 text-sm">
            Platform overview and user management
          </p>
        </div>

        {/* Stats Grid */}
        <div className="grid sm:grid-cols-2 xl:grid-cols-4 gap-5 mb-10">
          {stats.map((stat, i) => (
            <div
              key={i}
              className="p-5 rounded-2xl bg-white/[0.03] border border-white/10"
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
              <div className="text-xl font-bold text-white mb-1">
                {stat.value}
              </div>
              <div className="text-xs text-gray-500">{stat.label}</div>
            </div>
          ))}
        </div>

        {/* Users Table */}
        <div className="rounded-2xl bg-white/[0.03] border border-white/10 overflow-hidden">
          <div className="px-6 py-4 border-b border-white/5">
            <h2 className="text-white font-semibold">
              All Users ({totalUsers ?? 0})
            </h2>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-white/5">
                  <th className="text-left text-xs text-gray-500 font-medium px-6 py-3 uppercase tracking-wider">
                    Business
                  </th>
                  <th className="text-left text-xs text-gray-500 font-medium px-6 py-3 uppercase tracking-wider">
                    Email
                  </th>
                  <th className="text-left text-xs text-gray-500 font-medium px-6 py-3 uppercase tracking-wider">
                    Plan
                  </th>
                  <th className="text-left text-xs text-gray-500 font-medium px-6 py-3 uppercase tracking-wider">
                    WhatsApp
                  </th>
                  <th className="text-left text-xs text-gray-500 font-medium px-6 py-3 uppercase tracking-wider">
                    Joined
                  </th>
                </tr>
              </thead>
              <tbody>
                {users.map((u) => (
                  <tr
                    key={u.id}
                    className="border-b border-white/5 hover:bg-white/[0.02] transition-colors"
                  >
                    <td className="px-6 py-4">
                      <span className="text-sm text-white font-medium">
                        {u.business_name || "—"}
                      </span>
                    </td>
                    <td className="px-6 py-4">
                      <span className="text-sm text-gray-400">{u.email}</span>
                    </td>
                    <td className="px-6 py-4">
                      <span
                        className={`inline-flex px-2.5 py-0.5 rounded-full text-xs font-semibold ${
                          u.plan === "premium"
                            ? "bg-green-500/10 text-green-400 border border-green-500/20"
                            : "bg-white/5 text-gray-400 border border-white/10"
                        }`}
                      >
                        {u.plan === "premium" ? "Premium" : "Free"}
                      </span>
                    </td>
                    <td className="px-6 py-4">
                      <span className="text-sm text-gray-500">
                        {u.whatsapp_number || "Not set"}
                      </span>
                    </td>
                    <td className="px-6 py-4">
                      <span className="text-sm text-gray-600">
                        {new Date(u.created_at).toLocaleDateString("en-IN", {
                          day: "numeric",
                          month: "short",
                          year: "numeric",
                        })}
                      </span>
                    </td>
                  </tr>
                ))}
                {users.length === 0 && (
                  <tr>
                    <td
                      colSpan={5}
                      className="px-6 py-12 text-center text-gray-500 text-sm"
                    >
                      No users yet
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      </main>
    </div>
  );
}
