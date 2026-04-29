import { redirect } from "next/navigation";
import { createServerSupabaseClient } from "@/lib/supabase-server";
import DashboardShell from "@/components/dashboard/DashboardShell";

export default async function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const supabase = createServerSupabaseClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    redirect("/login");
  }

  const { data: profile } = await supabase
    .from("users")
    .select("business_name, email")
    .eq("id", user.id)
    .single();

  const email = user.email ?? "";
  const businessName = profile?.business_name || user.user_metadata?.business_name || "Your Business";

  return (
    <DashboardShell email={email} businessName={businessName}>
      {children}
    </DashboardShell>
  );
}
