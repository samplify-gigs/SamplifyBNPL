"use client";

import { useState } from "react";
import { Eye, EyeOff } from "lucide-react";

export default function SettingsForm() {
  const [showCurrent, setShowCurrent] = useState(false);
  const [showNew, setShowNew] = useState(false);

  const inputClass =
    "w-full px-4 py-2.5 rounded-xl border border-white/10 bg-white/[0.06] text-white placeholder:text-white/30 text-sm outline-none focus:ring-2 focus:ring-purple-400/30 focus:border-purple-400/30 transition-all backdrop-blur-sm";
  const labelClass = "text-white/60 text-xs font-medium mb-1.5 block";

  return (
    <div className="flex flex-col gap-6">
      {/* Business information */}
      <div className="rounded-3xl border border-white/10 bg-white/[0.05] backdrop-blur-xl p-5 lg:p-6">
        <h2 className="text-white font-semibold text-base mb-1">Business information</h2>
        <p className="text-white/40 text-xs mb-5">This is how customers and Samplify identify your store.</p>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
          <div>
            <label className={labelClass}>Business name</label>
            <input defaultValue="TechZone Stores" className={inputClass} />
          </div>
          <div>
            <label className={labelClass}>Email address</label>
            <input defaultValue="contact@techzone.ng" type="email" className={inputClass} />
          </div>
          <div>
            <label className={labelClass}>Phone number</label>
            <input defaultValue="+234 801 234 5678" type="tel" className={inputClass} />
          </div>
          <div>
            <label className={labelClass}>Secondary line</label>
            <input defaultValue="+234 809 876 5432" type="tel" className={inputClass} />
          </div>
          <div className="lg:col-span-2">
            <label className={labelClass}>Address</label>
            <textarea
              defaultValue="14 Adeola Odeku Street, Victoria Island, Lagos"
              rows={2}
              className={`${inputClass} resize-none`}
            />
          </div>
        </div>

        <button className="mt-5 px-6 py-2.5 rounded-xl bg-gradient-to-r from-[#7B2FBE] to-[#9D4EDD] text-white text-sm font-semibold shadow-[0_0_20px_rgba(157,78,221,0.35)] hover:shadow-[0_0_28px_rgba(157,78,221,0.5)] hover:scale-[1.02] transition-all duration-200">
          Save changes
        </button>
      </div>

      {/* Change password */}
      <div className="rounded-3xl border border-white/10 bg-white/[0.05] backdrop-blur-xl p-5 lg:p-6">
        <h2 className="text-white font-semibold text-base mb-1">Change password</h2>
        <p className="text-white/40 text-xs mb-5">Use a strong password you don't use anywhere else.</p>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
          <div className="lg:col-span-2">
            <label className={labelClass}>Current password</label>
            <div className="relative">
              <input type={showCurrent ? "text" : "password"} placeholder="Enter current password" className={`${inputClass} pr-11`} />
              <button
                type="button"
                onClick={() => setShowCurrent((p) => !p)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-white/40 hover:text-white/70 transition-colors"
              >
                {showCurrent ? <EyeOff size={16} /> : <Eye size={16} />}
              </button>
            </div>
          </div>

          <div>
            <label className={labelClass}>New password</label>
            <div className="relative">
              <input type={showNew ? "text" : "password"} placeholder="Create a new password" className={`${inputClass} pr-11`} />
              <button
                type="button"
                onClick={() => setShowNew((p) => !p)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-white/40 hover:text-white/70 transition-colors"
              >
                {showNew ? <EyeOff size={16} /> : <Eye size={16} />}
              </button>
            </div>
          </div>

          <div>
            <label className={labelClass}>Confirm new password</label>
            <input type="password" placeholder="Re-enter new password" className={inputClass} />
          </div>
        </div>

        <button className="mt-5 px-6 py-2.5 rounded-xl border border-white/15 bg-white/[0.06] text-white text-sm font-semibold hover:bg-white/[0.12] transition-all duration-200">
          Update password
        </button>
      </div>
    </div>
  );
}
