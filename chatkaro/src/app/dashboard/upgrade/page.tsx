import { redirect } from "next/navigation";
import { createServerSupabaseClient } from "@/lib/supabase-server";
import UpgradeClient from "@/components/dashboard/UpgradeClient";

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

  return <UpgradeClient currentPlan={currentPlan} />;
}
