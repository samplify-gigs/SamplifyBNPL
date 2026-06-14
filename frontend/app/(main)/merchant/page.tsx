export default function Merchant() {
  return (
    <main className="min-h-screen lg:bg-[#9D4EDD]/5 flex items-center justify-center p-4 py-24 lg:py-12 ">

      {/* ── Mobile/Tab: single glassy card ── */}
      <div className="lg:hidden w-full max-w-lg ">
        <div
          className="w-full rounded-3xl border border-white/20 p-8 flex flex-col gap-5 bg-[image:var(--bg-gradient)]"
          style={{
            backdropFilter: "blur(24px)",
            WebkitBackdropFilter: "blur(24px)",
            boxShadow: "0 8px 48px rgba(90,24,154,0.3), inset 0 1px 0 rgba(255,255,255,0.08)",
          }}
        >
          {/* Header */}
          <div className="flex flex-col gap-1">
            <span className="text-purple-300 text-xs font-semibold uppercase tracking-widest">Samplify for Business</span>
            <h1 className="text-white text-2xl font-bold leading-tight">Get started as a Merchant</h1>
            <p className="text-white/50 text-sm">List your products and reach customers who pay on flexible plans.</p>
          </div>

          <FormFields />

          <button className="w-full py-3.5 rounded-2xl bg-gradient-to-r from-[#7B2FBE] to-[#9D4EDD] text-white font-semibold text-sm shadow-[0_0_24px_rgba(157,78,221,0.4)] hover:shadow-[0_0_36px_rgba(157,78,221,0.6)] hover:scale-[1.01] transition-all duration-200">
            Register with Samplify
          </button>

          <p className="text-center text-white/40 text-xs">
            Already have an account?{" "}
            <span className="text-purple-300 hover:text-purple-200 cursor-pointer transition-colors">Sign in</span>
          </p>
        </div>
      </div>

      {/* ── Desktop: split card ── */}
      <div className="hidden lg:flex w-full max-w-5xl rounded-3xl overflow-hidden shadow-[0_16px_80px_rgba(90,24,154,0.25)] border border-purple-500/15">

        {/* LEFT — gradient panel */}
        <div
          className="w-[42%] flex-shrink-0 relative flex flex-col justify-between p-10"
          style={{
            background: "radial-gradient(circle 500px at 30% 30%, #7B2FBE 0%, transparent 65%), radial-gradient(circle 400px at 80% 80%, #C77DFF 0%, transparent 60%), linear-gradient(160deg, #10002B 0%, #240046 60%, #3C096C 100%)",
          }}
        >
          {/* Decorative orb blur */}
          <div className="absolute top-12 right-0 w-40 h-40 rounded-full bg-purple-400/20 blur-3xl pointer-events-none" />

          {/* Top mark */}
          <div className="w-10 h-10 rounded-xl bg-white/10 border border-white/20 flex items-center justify-center">
            <span className="text-white font-bold text-lg leading-none">✦</span>
          </div>

          {/* Bottom copy */}
          <div className="flex flex-col gap-4">
            <div className="flex flex-col gap-1">
              <span className="text-purple-300/70 text-xs font-medium uppercase tracking-widest">For merchants</span>
              <h2 className="text-white text-3xl font-bold leading-snug">
                Sell more.<br />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#C77DFF] to-[#E0AAFF]">Get paid faster.</span>
              </h2>
            </div>
            <p className="text-white/50 text-sm leading-relaxed">
              Join thousands of vendors offering flexible payment plans. Reach customers who are ready to buy — on terms that work for everyone.
            </p>

            {/* Mini stats */}
            <div className="flex gap-6 pt-2">
              <div>
                <p className="text-white font-bold text-xl">3.2K<span className="text-purple-400">+</span></p>
                <p className="text-white/40 text-xs">Merchants onboard</p>
              </div>
              <div>
                <p className="text-white font-bold text-xl">1.5M<span className="text-purple-400">+</span></p>
                <p className="text-white/40 text-xs">Active customers</p>
              </div>
            </div>
          </div>
        </div>

        {/* RIGHT — form panel */}
        <div className="flex-1 bg-white flex flex-col justify-center px-10 py-12 gap-6">
          <div className="flex flex-col gap-1">
            <span className="text-[#7B2FBE] text-xs font-semibold uppercase tracking-widest">New merchant</span>
            <h1 className="text-[#10002B] text-2xl font-bold">Create your store</h1>
            <p className="text-gray-400 text-sm">Fill in your business details to get listed on Samplify.</p>
          </div>

          <FormFields light />

          <button className="w-full py-3.5 rounded-2xl bg-gradient-to-r from-[#7B2FBE] to-[#9D4EDD] text-white font-semibold text-sm shadow-[0_4px_20px_rgba(123,47,190,0.35)] hover:shadow-[0_4px_32px_rgba(123,47,190,0.5)] hover:scale-[1.01] transition-all duration-200">
            Register with Samplify
          </button>

          <p className="text-center text-gray-400 text-xs">
            Already have an account?{" "}
            <span className="text-[#7B2FBE] hover:text-[#9D4EDD] cursor-pointer font-medium transition-colors">Sign in</span>
          </p>
        </div>
      </div>
    </main>
  );
}

// Shared form fields — dark=glass mode, light=white bg mode
function FormFields({ light = false }: { light?: boolean }) {
  const input = light
    ? "w-full px-4 py-2.5 rounded-xl border border-gray-200 bg-gray-50 text-gray-800 placeholder:text-gray-400 text-sm focus:outline-none focus:ring-2 focus:ring-[#9D4EDD]/40 focus:border-[#9D4EDD]/60 transition-all"
    : "w-full px-4 py-2.5 rounded-xl border border-white/10 bg-white/[0.07] text-white placeholder:text-white/30 text-sm focus:outline-none focus:ring-2 focus:ring-purple-400/30 focus:border-purple-400/30 transition-all backdrop-blur-sm";

  const label = light ? "text-gray-700 text-xs font-medium mb-1 block" : "text-white/60 text-xs font-medium mb-1 block";
  const select = light
    ? "w-full px-4 py-2.5 rounded-xl border border-gray-200 bg-gray-50 text-gray-800 text-sm focus:outline-none focus:ring-2 focus:ring-[#9D4EDD]/40 focus:border-[#9D4EDD]/60 transition-all appearance-none"
    : "w-full px-4 py-2.5 rounded-xl border border-white/10 bg-white/[0.07] text-white text-sm focus:outline-none focus:ring-2 focus:ring-purple-400/30 transition-all appearance-none backdrop-blur-sm";

  return (
    <div className="flex flex-col gap-4">
      {/* Row 1 */}
      <div className="grid grid-cols-2 gap-3">
        <div>
          <label className={label}>Business name</label>
          <input className={input} placeholder="e.g. TechZone Stores" type="text" />
        </div>
        <div>
          <label className={label}>Email address</label>
          <input className={input} placeholder="you@business.com" type="email" />
        </div>
      </div>

      {/* Row 2 */}
      <div className="grid grid-cols-2 gap-3">
        <div>
          <label className={label}>Product category</label>
          <select className={select}>
            <option value="">Select category</option>
            <option>Furniture</option>
            <option>Fashion</option>
            <option>Gadgets</option>
            <option>Electronics</option>
          </select>
        </div>
        <div>
          <label className={label}>Location</label>
          <select className={select}>
            <option value="">Select state</option>
            <option>Lagos</option>
            <option>Abuja</option>
            <option>Ogun</option>
            <option>Port Harcourt</option>
            <option>Calabar</option>
          </select>
        </div>
      </div>

      {/* Full address */}
      <div>
        <label className={label}>Full address</label>
        <textarea
          rows={2}
          placeholder="Shop address, street, city"
          className={`${input} resize-none`}
        />
      </div>

      {/* Row 3 — phones */}
      <div className="grid grid-cols-2 gap-3">
        <div>
          <label className={label}>WhatsApp / Primary</label>
          <input className={input} placeholder="+234 800 000 0000" type="tel" />
        </div>
        <div>
          <label className={label}>Secondary line</label>
          <input className={input} placeholder="+234 800 000 0001" type="tel" />
        </div>
      </div>
    </div>
  );
}