import { LucideIcon } from "lucide-react";

type StatCardProps = {
  label: string;
  value: string;
  icon: LucideIcon;
  trend?: string;
  trendDirection?: "up" | "down";
  accent?: "purple" | "green" | "yellow" | "red";
};

const accentMap = {
  purple: "from-[#7B2FBE] to-[#9D4EDD] text-purple-300",
  green: "from-emerald-500 to-emerald-400 text-emerald-300",
  yellow: "from-amber-500 to-amber-400 text-amber-300",
  red: "from-red-500 to-red-400 text-red-300",
};

export default function StatCard({
  label,
  value,
  icon: Icon,
  trend,
  trendDirection = "up",
  accent = "purple",
}: StatCardProps) {
  return (
    <div className="relative rounded border border-white/10 bg-white/[0.05] backdrop-blur-xl p-5 overflow-hidden">
      {/* Ambient glow */}
      <div
        className={`absolute -top-8 -right-8 w-28 h-28 rounded-full bg-gradient-to-br ${accentMap[accent].split(" text-")[0]} opacity-15 blur-2xl pointer-events-none`}
      />

      <div className="relative flex items-start justify-between">
        <div className="flex flex-col gap-1">
          <span className="text-white/40 text-xs font-medium uppercase tracking-wide">{label}</span>
          <span className="text-white text-2xl font-bold tracking-tight">{value}</span>
          {trend && (
            <span className={`text-xs font-medium ${trendDirection === "up" ? "text-emerald-400" : "text-red-400"}`}>
              {trendDirection === "up" ? "↑" : "↓"} {trend}
            </span>
          )}
        </div>

        <div
          className={`w-10 h-10 rounded-2xl bg-gradient-to-br ${accentMap[accent].split(" text-")[0]} bg-opacity-20 flex items-center justify-center flex-shrink-0`}
          style={{ background: "rgba(255,255,255,0.06)" }}
        >
          <Icon size={18} className={accentMap[accent].split(" ").pop()} />
        </div>
      </div>
    </div>
  );
}
