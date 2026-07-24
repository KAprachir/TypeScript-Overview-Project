import Link from "next/link";

interface FeatureItem {
  label: string;
  href: string;
  badge: string;
  description: string;
  icon: string;
}

const navItems: FeatureItem[] = [
  {
    label: "User Sign In",
    href: "/login",
    badge: "POST /api/auth/login",
    description: "Authenticate registered users using Zod schema validation & bcrypt hash verification.",
    icon: "M11 16l-4-4m0 0l4-4m-4 4h14m-5 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h7a3 3 0 013 3v1",
  },
  {
    label: "Account Registration",
    href: "/register",
    badge: "POST /api/auth/register",
    description: "Create new user profiles with automatic email case-normalization & MongoDB storage.",
    icon: "M18 9v3m0 0v3m0-3h3m-3 0h-3m-2-5a4 4 4 0 11-8 0 4 4 0 018 0zM3 20a6 6 0 0112 0v1H3v-1z",
  },
];

export default function Home() {
  return (
    <div className="min-h-screen flex flex-col justify-center items-center px-4 py-16 bg-gradient-to-br from-zinc-900 via-zinc-950 to-black text-zinc-100 font-sans">
      <div className="max-w-xl w-full text-center space-y-8">
        
        {/* Header Hero */}
        <div className="space-y-4">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-500/10 border border-blue-500/20 text-blue-400 text-xs font-semibold uppercase tracking-wider">
            <span>Next.js 16 + TypeScript 5</span>
          </div>
          <h1 className="text-4xl sm:text-5xl font-extrabold tracking-tight bg-clip-text text-transparent bg-gradient-to-r from-white via-zinc-200 to-zinc-400">
            TS Auth Lab
          </h1>
          <p className="text-base text-zinc-400 max-w-md mx-auto leading-relaxed">
            Full-stack authentication system built with Next.js App Router, Zod validation, MongoDB, and bcryptjs.
          </p>
        </div>

        {/* Action Cards */}
        <div className="grid gap-4">
          {navItems.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="group relative block bg-zinc-900/60 hover:bg-zinc-900/90 border border-zinc-800/80 hover:border-blue-500/50 p-6 rounded-2xl text-left transition-all duration-300 shadow-lg hover:shadow-blue-500/5 backdrop-blur-xl"
            >
              <div className="flex items-start justify-between gap-4">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-xl bg-zinc-800/80 group-hover:bg-blue-600/20 text-zinc-300 group-hover:text-blue-400 flex items-center justify-center border border-zinc-700/50 group-hover:border-blue-500/30 transition-colors">
                    <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8} d={item.icon} />
                    </svg>
                  </div>
                  <div>
                    <h2 className="text-lg font-bold text-white group-hover:text-blue-400 transition-colors">
                      {item.label}
                    </h2>
                    <span className="inline-block text-[11px] font-mono text-zinc-500 bg-zinc-950 px-2 py-0.5 rounded border border-zinc-800/80 mt-1">
                      {item.badge}
                    </span>
                  </div>
                </div>
                <div className="text-zinc-600 group-hover:text-blue-400 group-hover:translate-x-1 transition-all">
                  <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </div>
              </div>
              <p className="text-xs text-zinc-400 mt-4 leading-relaxed">
                {item.description}
              </p>
            </Link>
          ))}
        </div>

        {/* Footer info */}
        <div className="pt-6 border-t border-zinc-800/60 text-xs text-zinc-500 flex flex-wrap items-center justify-center gap-4">
          <span>🔒 Password Hashing</span>
          <span>•</span>
          <span>🛡️ Zod Validation</span>
          <span>•</span>
          <span>⚡ MongoDB Atlas</span>
        </div>

      </div>
    </div>
  );
}
