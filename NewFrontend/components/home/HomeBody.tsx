"use client";

import Link from "next/link";

export default function HomeBody() {
  return (
    <main className="min-h-screen flex items-center justify-center px-4 pt-28 pb-16">
      <div className="w-full max-w-6xl mx-autol bg-[image:var(--bg-gradient)] rounded-3xl backdrop-blur-2xl border border-purple-500/20 shadow-[0_8px_64px_rgba(90,24,154,0.35)] p-8 md:p-12">
        {/* Hero grid */}
        <div className="grid grid-cols-1 lg:grid-cols-[1fr_auto_1fr] gap-10 lg:gap-6 items-center">
          {/* LEFT — copy */}
          <div className="flex flex-col gap-6">
            {/* Pill badge */}
            <div className="inline-flex w-fit items-center gap-2 px-3 py-1.5 rounded-full border border-purple-400/20 bg-purple-500/10 text-[#E0AAFF] text-sm font-medium tracking-wide">
              <span className="w-1.5 h-1.5 rounded-full bg-purple-400 animate-pulse" />
              Flexible financing on your terms
            </div>

            {/* Headline */}
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-white  leading-[1.1] tracking-tight mb-5 mt-3">
              Shop now,{" "}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#C77DFF] to-[#9D4EDD]">
                pay later.
              </span>
              <br />
              your way.
            </h1>

            {/* Body */}
            <p className="text-white/80 text-base sm:text-lg leading-relaxed max-w-md">
              Get flexible financing for electronics, appliances, and furniture
              from trusted vendors. Find a payment plan that fits your budget no
              stress, no compromise.
            </p>

            {/* CTA row */}
            <div className="flex flex-col sm:flex-row gap-3 pt-2">
              <Link
                href="/MerchantSignup"
                className="px-6 py-3 cursor-pointer rounded-full bg-gradient-to-r from-[#7B2FBE] to-[#9D4EDD] text-white font-semibold text-sm shadow-[0_0_24px_rgba(157,78,221,0.4)] 
                hover:shadow-[0_0_32px_rgba(157,78,221,0.6)] hover:scale-[1.02] transition-all duration-200"
              >
                <button>Get started</button>
              </Link>

              <div className="flex gap-2">
                <Link
                  href="/merchantlogin"
                  className="flex-1 object-center flex sm:flex-none cursor-pointer px-6 py-3 rounded-full border border-white/15 bg-white/[0.06] backdrop-blur-sm text-white/80 text-sm font-medium hover:bg-white/10 transition-all duration-200"
                >
                  <button>Merchant Login</button>
                </Link>

                <Link
                  href="/customer"
                  className="flex-1 object-center flex sm:flex-none cursor-pointer px-6 py-3 rounded-full border border-white/15 bg-white/[0.06] backdrop-blur-sm text-white/80 text-sm font-medium hover:bg-white/10 transition-all duration-200"
                >
                  <button>Customer Login</button>
                </Link>
              </div>
            </div>

            {/* Trust row */}
            <div className="flex items-center gap-3 pt-2">
              <div className="flex -space-x-2">
                {[
                  "bg-purple-400",
                  "bg-violet-500",
                  "bg-fuchsia-400",
                  "bg-purple-600",
                ].map((c, i) => (
                  <div
                    key={i}
                    className={`w-7 h-7 rounded-full ${c} border-2 border-[#240046] flex items-center justify-center text-white text-[10px] font-bold`}
                  >
                    {["A", "B", "C", "D"][i]}
                  </div>
                ))}
              </div>
              <p className="text-white/50 text-xs">
                <span className="text-white/80 font-semibold">2,400+</span>{" "}
                customers already financing
              </p>
            </div>
          </div>

          {/* CENTER — credit card visual (lg only) */}
          <div className="hidden lg:flex items-center justify-center">
            <div className="relative w-[220px] h-[340px]">
              {/* Glow behind card */}
              <div className="absolute inset-0 rounded-3xl bg-gradient-to-br from-[#7B2FBE] to-[#C77DFF] blur-3xl opacity-30 scale-110" />

              {/* Card */}
              <div className="relative w-full h-full rounded-3xl bg-gradient-to-br from-[#3C096C] via-[#240046] to-[#10002B] border border-purple-400/20 shadow-2xl flex flex-col justify-between p-6 rotate-[6deg] hover:rotate-[3deg] transition-transform duration-500">
                {/* Top row */}
                <div className="flex justify-between items-start">
                  <div className="w-8 h-8 rounded-full bg-gradient-to-br from-[#C77DFF] to-[#9D4EDD] opacity-90" />
                  <svg
                    className="w-10 h-6 text-white/40"
                    viewBox="0 0 50 20"
                    fill="none"
                  >
                    <rect width="22" height="20" rx="10" fill="currentColor" />
                    <rect
                      x="28"
                      width="22"
                      height="20"
                      rx="10"
                      fill="currentColor"
                      opacity="0.6"
                    />
                  </svg>
                </div>

                {/* Chip */}
                <div className="w-10 h-7 rounded-md bg-gradient-to-br from-yellow-300/60 to-yellow-500/40 border border-yellow-300/20" />

                {/* Number */}
                <div className="text-white/70 text-sm tracking-[0.2em] font-mono">
                  4025 •••• •••• 7890
                </div>

                {/* Bottom row */}
                <div className="flex justify-between items-end">
                  <div>
                    <p className="text-white/30 text-[10px] uppercase tracking-widest">
                      Card Holder
                    </p>
                    <p className="text-white/80 text-sm font-medium">
                      Samplify User
                    </p>
                  </div>
                  <div className="text-right">
                    <p className="text-white/30 text-[10px] uppercase tracking-widest">
                      Expires
                    </p>
                    <p className="text-white/80 text-sm font-medium">08/28</p>
                  </div>
                </div>
              </div>

              {/* Second card peek behind */}
              <div className="absolute inset-0 rounded-3xl bg-gradient-to-br from-[#5A189A] to-[#240046] border border-purple-500/10 -z-10 rotate-[14deg] translate-y-2 opacity-50" />
            </div>
          </div>

          {/* RIGHT — stat cards */}
          <div className="flex flex-row lg:flex-col gap-3 overflow-x-auto lg:overflow-visible pb-2 lg:pb-0 no-scrollbar">
            {/* Stat 1 */}
            <div className="flex-shrink-0 w-52 lg:w-auto rounded-2xl border border-white/10 bg-white/[0.06] backdrop-blur-md p-4 flex flex-col gap-1">
              <p className="text-purple-300 text-xs font-medium uppercase tracking-widest">
                Active Users
              </p>
              <p className="text-white text-3xl font-bold">
                1.5M<span className="text-purple-400 text-lg">+</span>
              </p>
              <p className="text-white/40 text-xs">
                Customers trusting Samplify
              </p>
            </div>

            {/* Stat 2 */}
            <div className="flex-shrink-0 w-52 lg:w-auto rounded-2xl border border-white/10 bg-white/[0.06] backdrop-blur-md p-4 flex flex-col gap-1">
              <p className="text-purple-300 text-xs font-medium uppercase tracking-widest">
                Vendors Onboard
              </p>
              <p className="text-white text-3xl font-bold">
                3.2K<span className="text-purple-400 text-lg">+</span>
              </p>
              <p className="text-white/40 text-xs">
                Trusted stores across categories
              </p>
            </div>

            {/* Stat 3 — review */}
            <div className="flex-shrink-0 w-52 lg:w-auto rounded-2xl border border-purple-500/20 bg-purple-500/10 backdrop-blur-md p-4 flex flex-col gap-2">
              <div className="flex gap-0.5">
                {[...Array(5)].map((_, i) => (
                  <svg
                    key={i}
                    className="w-3.5 h-3.5 text-purple-300"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                  </svg>
                ))}
              </div>
              <p className="text-white/70 text-xs leading-relaxed">
                &quot; Got my laptop on a plan that actually made sense. Zero
                stress &quot;
              </p>
              <p className="text-white/40 text-[10px]">
                — Rated 4.9 from 400k+ reviews
              </p>
            </div>
          </div>
        </div>

        {/* Trusted by strip */}
        <div className="mt-14 pt-8 border-t border-white/[0.07]">
          <p className="text-white/30 text-xs uppercase tracking-widest text-center mb-5">
            Trusted by leading brands
          </p>
          <div className="flex flex-wrap justify-center items-center gap-8">
            {["Jumia", "Slot", "Konga", "Samsung", "LG"].map((brand) => (
              <span
                key={brand}
                className="text-white/25 font-semibold text-sm tracking-wide hover:text-white/50 transition-colors duration-200 cursor-pointer"
              >
                {brand}
              </span>
            ))}
          </div>
        </div>
      </div>
    </main>
  );
}
