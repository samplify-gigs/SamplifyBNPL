// ── components/Feedback.tsx ──

import { useEffect} from "react";

/* ───────────────────────────────
   1. GLOBAL ERROR — banner style, sits at top of form
   ─────────────────────────────── */
export function ErrorBanner({ message, light = false }: { message: string; light?: boolean }) {
  if (!message) return null;

  return (
    <div
      className={`flex items-start gap-3 rounded-2xl border px-4 py-3 motion-safe:animate-in motion-safe:fade-in motion-safe:slide-in-from-top-1 duration-200 text-red-400 ${
        light ? "bg-red-50 border-red-200 " : "bg-red-500/10 border-red-400/20 backdrop-blur-sm"
      }`}
    >
       <svg
        className={`w-5 h-5 flex-shrink-0 mt-0.5 ${light ? "text-red-500" : "text-red-400"}`}
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
        strokeWidth={2}
      >
        <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v3.75m-9.303 3.376c-.866 1.5.217 3.374 1.948 3.374h14.71c1.73 0 2.813-1.874 1.948-3.374L13.949 3.378c-.866-1.5-3.032-1.5-3.898 0L2.697 16.126ZM12 15.75h.007v.008H12v-.008Z" />
      </svg>
      <p className={`text-sm leading-relaxed ${light ? "text-red-700" : "text-red-300"}`}>
        {message}
      </p>
    
    </div>
  );
}

/* ───────────────────────────────
   2. INPUT ERROR — small inline text under a field
   ─────────────────────────────── */
export function FieldError({ message }: { message?: string }) {
  if (!message) return null;

  return (
    <p className="flex items-center gap-1.5 text-red-400 text-xs mt-1.5 animate-in fade-in duration-200">
      <svg className="w-3.5 h-3.5 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
        <path
          fillRule="evenodd"
          d="M18 10A8 8 0 11 2 10a8 8 0 0116 0Zm-7 4a1 1 0 11-2 0 1 1 0 012 0Zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1Z"
          clipRule="evenodd"
        />
      </svg>
      {message}
    </p>
  );
}

/* ───────────────────────────────
   3. SUCCESS — toast that auto-dismisses, floats top-right
   ─────────────────────────────── */
export function SuccessToast({ message, onDismiss }: { message: string; onDismiss: () => void }) {
  useEffect(() => {
    if (!message) return;
    const timer = setTimeout(onDismiss, 4000);
    return () => clearTimeout(timer);
  }, [message, onDismiss]);

  if (!message) return null;

  return (
    <div className="fixed top-6 right-6 z-[100] animate-in fade-in slide-in-from-top-2 duration-300">
      <div
        className="flex items-center gap-3 rounded-2xl border border-emerald-400/20 px-5 py-3.5 shadow-[0_8px_32px_rgba(16,185,129,0.2)]"
        style={{
          background: "rgba(16, 185, 129, 0.12)",
          backdropFilter: "blur(20px)",
          WebkitBackdropFilter: "blur(20px)",
        }}
      >
        <div className="w-6 h-6 rounded-full bg-emerald-400/20 flex items-center justify-center flex-shrink-0">
          <svg className="w-3.5 h-3.5 text-emerald-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" />
          </svg>
        </div>
        <p className="text-emerald-200 text-sm font-medium pr-2">{message}</p>
        <button
          onClick={onDismiss}
          className="text-emerald-400/60 hover:text-emerald-300 transition-colors ml-1"
        >
          <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>
      </div>
    </div>
  );
}