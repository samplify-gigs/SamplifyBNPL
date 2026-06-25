import SettingsForm from "@/components/Merchant/dashboard/settings-form/settings-form";

export default function SettingsPage() {
  return (
    <div className="flex flex-col gap-5 pt-2">
      <div className="flex flex-col gap-1">
        <h1 className="text-white text-xl lg:text-2xl font-bold">Settings</h1>
        <p className="text-white/40 text-sm">Manage your business details and account security.</p>
      </div>

      <SettingsForm />
    </div>
  );
}
