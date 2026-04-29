import { redirect } from "next/navigation";
import { createServerSupabaseClient } from "@/lib/supabase-server";
import DashboardContent from "@/components/DashboardContent";

export default async function DashboardPage() {
  const supabase = createServerSupabaseClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    redirect("/login");
  }

  const businessName =
    user.user_metadata?.business_name || "Your Business";

  let profileBusinessName = businessName;
  const { data: profile } = await supabase
    .from("users")
    .select("business_name")
    .eq("id", user.id)
    .single();

  if (profile?.business_name) {
    profileBusinessName = profile.business_name;
  }

  return (
    <DashboardContent
      email={user.email ?? ""}
      businessName={profileBusinessName}
    />
  );
}
