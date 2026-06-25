import ApplicationsTable from "@/components/Merchant/dashboard/applicationsTable/application-table";

export default function ApplicationsPage() {
  return (
    <div className="flex flex-col gap-5 pt-2">
      <div className="flex flex-col gap-1">
        <h1 className="text-white text-xl lg:text-2xl font-bold">Applications</h1>
        <p className="text-white/40 text-sm">Track and manage every financing application from your customers.</p>
      </div>

      <ApplicationsTable />
    </div>
  );
}
