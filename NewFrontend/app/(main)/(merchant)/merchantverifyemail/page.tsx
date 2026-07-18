export default async function EmailVerificationPage() {
  return (
    <main className="min-h-screen flex items-center bg-[image:var(--bg-gradient)] justify-center p-4">
      {/* Card */}
      <div className="w-full max-w-md rounded-3xl bg-white px-8 py-10 flex flex-col items-center gap-6 shadow-[0_24px_80px_rgba(90,24,154,0.35)]">
        {/* Icon */}
        <div className="relative flex items-center justify-center w-20 h-20">
          <div className="w-16 h-16 rounded-2xl border-2 border-[#240046] flex items-center justify-center">
            <svg
              className="w-8 h-8 text-[#240046]"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={1.8}
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M21.75 6.75v10.5a2.25 2.25 0 01-2.25 2.25h-15a2.25 2.25 0 01-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25m19.5 0v.243a2.25 2.25 0 01-1.07 1.916l-7.5 4.615a2.25 2.25 0 01-2.36 0L3.32 8.91a2.25 2.25 0 01-1.07-1.916V6.75"
              />
            </svg>
          </div>
          {/* Sparkles */}
          <span className="absolute -top-1 -right-1 text-yellow-400 text-xl leading-none">
            ✦
          </span>
          <span className="absolute top-2 right-4 text-yellow-300 text-xs leading-none">
            ✦
          </span>
        </div>

        {/* Heading */}
        <div className="flex flex-col items-center gap-2 text-center">
          <h1 className="text-[#10002B] text-2xl font-bold tracking-tight">
            Verify your email
          </h1>
          <p className="text-gray-500 text-sm leading-relaxed max-w-xs">
            We've sent a verification link to{" "}
            <span className="font-semibold text-[#240046]">
              your registered email
            </span>
            . Click the link in your inbox to activate your Samplify merchant
            account.
          </p>
        </div>

        {/* Checklist */}
        <div className="w-full flex flex-col gap-2.5">
          {[
            "Check your inbox for an email from Samplify",
            "Not seeing it? Check your spam or junk folder",
            "Still having issues? Reach out to our support team",
          ].map((tip, i) => (
            <div
              key={i}
              className="flex items-start gap-3 bg-[#9D4EDD]/5 rounded-2xl px-4 py-3"
            >
              <div className="w-5 h-5 rounded-full bg-[#9D4EDD]/15 flex items-center justify-center flex-shrink-0 mt-0.5">
                <svg
                  className="w-3 h-3 text-[#7B2FBE]"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth={2.5}
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M4.5 12.75l6 6 9-13.5"
                  />
                </svg>
              </div>
              <p className="text-gray-600 text-sm leading-relaxed">{tip}</p>
            </div>
          ))}
        </div>

        {/* Divider */}
        <div className="w-full h-px bg-gray-100" />

        {/* Actions */}
        <div className="w-full flex flex-col gap-3">
          <button className="w-full py-3.5 rounded-2xl bg-gradient-to-r from-[#7B2FBE] to-[#9D4EDD] text-white font-semibold text-sm shadow-[0_4px_20px_rgba(123,47,190,0.35)] hover:shadow-[0_4px_32px_rgba(123,47,190,0.55)] hover:scale-[1.01] transition-all duration-200">
            Open my inbox
          </button>
          <button className="w-full py-3 rounded-2xl border border-[#9D4EDD]/25 text-[#7B2FBE] text-sm font-medium hover:bg-[#9D4EDD]/5 transition-all duration-200">
            Resend verification email
          </button>
        </div>

        {/* Footer links */}
        <div className="flex flex-col items-center gap-1.5">
          <p className="text-gray-400 text-xs">
            Wrong email?{" "}
            <span className="text-[#7B2FBE] font-medium hover:text-[#9D4EDD] cursor-pointer transition-colors">
              Go back and change it
            </span>
          </p>
          <p className="text-gray-400 text-xs">
            Already verified?{" "}
            <span className="text-[#7B2FBE] font-medium hover:text-[#9D4EDD] cursor-pointer transition-colors">
              Sign in
            </span>
          </p>
        </div>
      </div>
    </main>
  );
}
