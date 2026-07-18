
// ─── Shared card shell ────────────────────────────────────────────────────────

export function MobileCard({ children }: { children: React.ReactNode }) {
  return (
    <div
      className="w-full rounded-3xl border max-h-[95vh] overflow-y-auto border-white/20 p-8 flex flex-col bg-[image:var(--bg-gradient)]"
      style={{
        backdropFilter: "blur(24px)",
        WebkitBackdropFilter: "blur(24px)",
        boxShadow:
          "0 8px 48px rgba(90,24,154,0.3), inset 0 1px 0 rgba(255,255,255,0.08)",
      }}
    >
      {children}
    </div>
  );
}

export function DesktopLeft() {
  return (
    <div
      className="w-[42%] flex-shrink-0 relative flex flex-col justify-between p-10"
      style={{
        background:
          "radial-gradient(circle 500px at 30% 30%, #7B2FBE 0%, transparent 65%), radial-gradient(circle 400px at 80% 80%, #C77DFF 0%, transparent 60%), linear-gradient(160deg, #10002B 0%, #240046 60%, #3C096C 100%)",
      }}
    >
      <div className="absolute top-12 right-0 w-40 h-40 rounded-full bg-purple-400/20 blur-3xl pointer-events-none" />

      <div className="w-10 h-10 rounded-xl bg-white/10 border border-white/20 flex items-center justify-center">
        <span className="text-white font-bold text-lg leading-none">✦</span>
      </div>

      <div className="flex flex-col gap-4">
        <div className="flex flex-col gap-1">
          <span className="text-purple-300/70 text-xs font-medium uppercase tracking-widest">
            Buy now, pay later
          </span>
          <h2 className="text-white text-3xl font-bold leading-snug">
            Get what you
            <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#C77DFF] to-[#E0AAFF]">
              want, on your terms.
            </span>
          </h2>
        </div>
        <p className="text-white/50 text-sm leading-relaxed">
          Samplify lets you split payments for the things you love — from
          electronics to furniture — with zero stress.
        </p>

        <div className="flex gap-6 pt-2">
          <div>
            <p className="text-white font-bold text-xl">
              1.5M<span className="text-purple-400">+</span>
            </p>
            <p className="text-white/40 text-xs">Active customers</p>
          </div>
          <div>
            <p className="text-white font-bold text-xl">
              3.2K<span className="text-purple-400">+</span>
            </p>
            <p className="text-white/40 text-xs">Trusted merchants</p>
          </div>
        </div>
      </div>
    </div>
  );
}