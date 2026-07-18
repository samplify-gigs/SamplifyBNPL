import { ApplicationStatus } from "@/lib/types";

const statusConfig: Record<ApplicationStatus, { label: string; className: string }> = {
  approved: { label: "Approved", className: "bg-emerald-500/15 text-emerald-400 border-emerald-500/20" },
  pending: { label: "Pending", className: "bg-amber-500/15 text-amber-400 border-amber-500/20" },
  declined: { label: "Declined", className: "bg-red-500/15 text-red-400 border-red-500/20" },
};

export default function StatusBadge({ status }: { status: ApplicationStatus }) {
  const config = statusConfig[status];
  return (
    <span
      className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full border text-xs font-medium ${config.className}`}
    >
      <span className="w-1.5 h-1.5 rounded-full bg-current" />
      {config.label}
    </span>
  );
}
