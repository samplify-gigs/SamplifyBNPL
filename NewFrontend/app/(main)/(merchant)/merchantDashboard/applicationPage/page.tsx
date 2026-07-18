import ApplicationsTable from "@/components/Merchant/dashboard/applicationsTable/application-table";

export default function ApplicationsPage() {
  return (
    <div className="flex flex-col gap-5 pt-4 px-3 mt-4  md:p-8 rounded-3xl bg-[image:var(--bg-gradient)] backdrop-blur-2xl border border-purple-500/15 shadow-[0_8px_64px_rgba(90,24,154,0.35),inset_0_1px_0_rgba(255,255,255,0.06)] relative overflow-hidden">
      <div className="flex flex-col gap-1">
        <h1 className=" text-xl lg:text-2xl font-bold mt-2 text-transparent bg-clip-text bg-gradient-to-r from-[#C77DFF] to-[#9D4EDD]">Applications</h1>
        <p className="text-white/40 text-sm">Track and manage every financing application from your customers.</p>
      </div>

      <ApplicationsTable />
    </div>
  );
}
