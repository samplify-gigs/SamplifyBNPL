"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  LayoutGrid,
  FileText,
  Link2,
  Users,
  Settings,
} from "lucide-react";

const navItems = [
  { label: "Overview", href: "/dashboard", icon: LayoutGrid },
  { label: "Applications", href: "/dashboard/applications", icon: FileText },
  { label: "Payment Links", href: "/dashboard/payment-links", icon: Link2 },
  { label: "Customers", href: "/dashboard/customers", icon: Users },
  { label: "Settings", href: "/dashboard/settings", icon: Settings },
];

export default function Sidebar() {
  const pathname = usePathname();

  return (
    <>
      {/* ── Desktop fixed sidebar ── */}
      <aside className="hidden lg:flex flex-col fixed left-0 top-0 h-screen w-64 px-5 py-7 border-r border-white/10 bg-[#10002B]/60 backdrop-blur-2xl z-40">
        {/* Logo */}
        <div className="flex items-center gap-2 px-2 mb-10">
          <div className="w-8 h-8 rounded-xl bg-gradient-to-br from-[#7B2FBE] to-[#9D4EDD] flex items-center justify-center">
            <span className="text-white font-bold text-sm">S</span>
          </div>
          <span className="text-white font-semibold text-lg tracking-wide">Samplify</span>
        </div>

        {/* Nav items */}
        <nav className="flex flex-col gap-1.5">
          {navItems.map((item) => {
            const isActive = pathname === item.href;
            const Icon = item.icon;
            return (
              <Link
                key={item.href}
                href={item.href}
                className={`group flex items-center gap-3 px-3.5 py-2.5 rounded-xl text-sm font-medium transition-all duration-200 ${
                  isActive
                    ? "bg-gradient-to-r from-[#7B2FBE]/30 to-[#9D4EDD]/15 text-white border border-purple-400/20"
                    : "text-white/50 hover:text-white hover:bg-white/[0.05]"
                }`}
              >
                <Icon
                  size={18}
                  className={`transition-colors ${isActive ? "text-purple-300" : "text-white/40 group-hover:text-white/70"}`}
                />
                {item.label}
              </Link>
            );
          })}
        </nav>

        {/* Bottom helper card */}
        <div className="mt-auto rounded-2xl border border-white/10 bg-white/[0.04] p-4 flex flex-col gap-1">
          <p className="text-white/70 text-xs font-medium">Need help?</p>
          <p className="text-white/40 text-xs leading-relaxed">Reach our merchant support team anytime.</p>
          <button className="mt-2 text-purple-300 text-xs font-semibold hover:text-purple-200 transition-colors text-left">
            Contact support →
          </button>
        </div>
      </aside>

      {/* ── Mobile bottom nav ── */}
      <nav className="lg:hidden fixed bottom-0 left-0 right-0 z-50 px-3 pb-3">
        <div
          className="flex items-center justify-between rounded-3xl border border-white/10 bg-[#10002B]/90 backdrop-blur-2xl px-2 py-2 shadow-[0_8px_32px_rgba(90,24,154,0.35)]"
        >
          {navItems.map((item) => {
            const isActive = pathname === item.href;
            const Icon = item.icon;
            return (
              <Link
                key={item.href}
                href={item.href}
                className={`flex flex-col items-center gap-1 px-3 py-2 rounded-2xl transition-all duration-200 ${
                  isActive ? "bg-purple-500/20" : ""
                }`}
              >
                <Icon size={20} className={isActive ? "text-purple-300" : "text-white/40"} />
                <span className={`text-[10px] font-medium ${isActive ? "text-white" : "text-white/40"}`}>
                  {item.label.split(" ")[0]}
                </span>
              </Link>
            );
          })}
        </div>
      </nav>
    </>
  );
}
