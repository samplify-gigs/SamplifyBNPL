"use client";

import { Bell, Search } from "lucide-react";

export default function Topbar() {
  return (
    <div className="sticky top-0 z-30 px-4 lg:px-8 pt-4 pb-3 lg:pt-6 lg:pb-4">
      <div
        className="flex items-center justify-between gap-4 px-5 py-3 rounded-3xl border border-white/10 bg-white/[0.05] backdrop-blur-xl shadow-[0_4px_32px_rgba(90,24,154,0.2),inset_0_1px_0_rgba(255,255,255,0.06)]"
      >
        {/* Greeting */}
        <div className="flex flex-col">
          <span className="text-white font-semibold text-sm leading-tight">Welcome back, TechZone</span>
          <span className="text-white/40 text-xs">Here's what's happening with your store</span>
        </div>

        {/* Search + actions */}
        <div className="flex items-center gap-3">
          <div className="hidden md:flex items-center gap-2 px-3.5 py-2 rounded-full border border-white/10 bg-white/[0.04] text-white/40 text-sm w-56">
            <Search size={15} />
            <input
              placeholder="Search applications, customers..."
              className="bg-transparent outline-none placeholder:text-white/30 text-white text-xs w-full"
            />
          </div>

          <button className="relative w-9 h-9 rounded-full border border-white/10 bg-white/[0.04] flex items-center justify-center text-white/60 hover:text-white hover:bg-white/[0.08] transition-all duration-200">
            <Bell size={16} />
            <span className="absolute top-1.5 right-2 w-1.5 h-1.5 rounded-full bg-[#9D4EDD]" />
          </button>

          <div className="w-9 h-9 rounded-full bg-gradient-to-br from-[#7B2FBE] to-[#9D4EDD] flex items-center justify-center text-white text-xs font-bold">
            TZ
          </div>
        </div>
      </div>
    </div>
  );
}
