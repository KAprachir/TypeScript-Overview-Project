import Link from "next/link";

// TS practice: define a type for each nav item instead of just writing raw JSX
interface NavItem {
  label: string;
  href: string;
  description: string;
}

const navItems: NavItem[] = [
  {
    label: "Login",
    href: "/login",
    description: "Typed form state, event handlers, validation",
  },
  {
    label: "Register",
    href: "/register",
    description: "Interfaces, Partial<>, form event typing",
  },
];

export default function Home() {
  return (
    <div className="flex flex-col flex-1 items-center justify-center bg-zinc-50 dark:bg-black font-sans px-4">
      <div className="max-w-md w-full text-center space-y-8">
        <div>
          <h1 className="text-2xl font-bold text-zinc-900 dark:text-white">
            TS Auth Lab
          </h1>
          <p className="text-sm text-zinc-500 dark:text-zinc-400 mt-1">
            Learning TypeScript with Next.js — Phase 1: Forms
          </p>
        </div>

        <ul className="space-y-3">
          {navItems.map((item) => (
            <li key={item.href}>
              <Link
                href={item.href}
                className="block border border-zinc-200 dark:border-zinc-800 rounded-lg p-4 text-left hover:border-zinc-400 dark:hover:border-zinc-600 transition-colors"
              >
                <span className="font-medium text-zinc-900 dark:text-white">
                  {item.label}
                </span>
                <p className="text-xs text-zinc-500 dark:text-zinc-400 mt-1">
                  {item.description}
                </p>
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
