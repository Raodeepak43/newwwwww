import { redirect } from "next/navigation";
import { createServerSupabaseClient } from "@/lib/supabase-server";
import SettingsForm from "@/components/dashboard/SettingsForm";

export default async function SettingsPage() {
  const supabase = createServerSupabaseClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) redirect("/login");

  const { data: profile } = await supabase
    .from("users")
    .select("whatsapp_number, business_description, language")
    .eq("id", user.id)
    .single();

  return (
    <div>
      <div className="mb-8">
        <h1 className="text-2xl sm:text-3xl font-bold text-white mb-1">
          Settings / सेटिंग्स
        </h1>
        <p className="text-gray-500 text-sm">
          अपनी प्रोफ़ाइल और AI सेटिंग्स अपडेट करें — Update your profile and AI settings
        </p>
      </div>

      <SettingsForm
        initialWhatsapp={profile?.whatsapp_number ?? ""}
        initialDescription={profile?.business_description ?? ""}
        initialLanguage={profile?.language ?? "Hindi"}
      />
    </div>
  );
}
