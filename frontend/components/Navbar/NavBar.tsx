const navLinks = [
  {
    title: "About us",
    className: "hover:text-white transition-colors duration-200 cursor-pointer",
  },
  {
    title: "Login",
    className: "hover:text-white transition-colors duration-200 cursor-pointer",
  },
  {
    title: "Sign up",
    className: "hover:text-white transition-colors duration-200 cursor-pointer",
  },
];

export default function NavBar() {
  return (
    <div className="fixed top-4 left-0 right-0 z-50 flex justify-center px-4">
      <nav className="w-full max-w-5xl md:w-[90%] flex items-center justify-between px-6 py-3 rounded-full border border-white/10 bg-white/[0.06] backdrop-blur-lg backdrop-saturate-120 shadow-[0_4px_32px_rgba(90,24,154,0.25),inset_0_1px_0_rgba(255,255,255,0.08)]">
        {/* Logo */}
        <span className="font-semibold text-lg tracking-wide text-white/90">
          Samplify
        </span>

        {/* Nav links */}
        <div className="flex items-center gap-6 text-sm text-white/70">
          {navLinks.map((nav) => {
            return (
              <span key={nav.title} className={nav.className}>
                {nav.title}
              </span>
            );
          })}
        </div>
      </nav>
    </div>
  );
}
