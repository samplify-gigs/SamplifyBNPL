import SettingsForm from "@/components/Merchant/dashboard/settings-form/settings-form";

export default function SettingsPage() {
  return (
    <div className="flex flex-col gap-5  pt-4 px-3 mt-4 pb-2 md:p-8 rounded-3xl bg-[image:var(--bg-gradient)] backdrop-blur-2xl border border-purple-500/15 shadow-[0_8px_64px_rgba(90,24,154,0.35),inset_0_1px_0_rgba(255,255,255,0.06)] relative overflow-hidden">
      <div className="flex flex-col gap-1">
        <h1 className=" text-xl lg:text-2xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-[#C77DFF] to-[#9D4EDD]">Settings</h1>
        <p className="text-white/40 text-sm">Manage your business details and account security.</p>
      </div>

      <SettingsForm />
    </div>
  );
}
