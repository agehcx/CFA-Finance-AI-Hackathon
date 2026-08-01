"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { clsx } from "clsx";
import {
  Home,
  Search,
  Briefcase,
  Database,
  BookOpen,
  ChevronDown,
} from "lucide-react";

const NAV_ITEMS = [
  { href: "/", label: "Today", icon: Home },
  { href: "/investigations", label: "Investigations", icon: Search },
  { href: "/portfolio", label: "Portfolio & Themes", icon: Briefcase },
  { href: "/memory", label: "Decision Memory", icon: Database },
  { href: "/library", label: "Library", icon: BookOpen },
];

export function Sidebar() {
  const pathname = usePathname();

  return (
    <aside className="sticky top-0 flex h-screen w-64 shrink-0 flex-col border-r border-border bg-white px-4 py-6">
      <div className="mb-8 px-2">
        <div className="flex items-center gap-2 text-blue-600 mb-1">
          <img src="/logo.png" alt="InvestiGraph Logo" className="w-8 h-8 object-contain" />
          <span className="font-bold text-xl tracking-tight text-[#1a2547]">InvestiGraph</span>
        </div>
        <div className="text-[10px] font-semibold text-muted uppercase tracking-wider pl-10">
          Graph-based Portfolio Intelligence
        </div>
      </div>

      <nav className="flex flex-col gap-1.5">
        {NAV_ITEMS.map(({ href, label, icon: Icon }) => {
          const isActive =
            href === "/" ? pathname === "/" : pathname.startsWith(href);
          return (
            <Link
              key={href}
              href={href}
              className={clsx(
                "flex items-center gap-3.5 rounded-xl px-4 py-3 text-[14px] font-medium transition-colors",
                isActive
                  ? "bg-[#e9eefb] text-[#1e2a5a]"
                  : "text-[#3b4256] hover:bg-canvas hover:text-ink"
              )}
            >
              <Icon size={19} strokeWidth={1.8} />
              {label}
            </Link>
          );
        })}
      </nav>

      <div className="mt-auto flex cursor-pointer items-center gap-3 rounded-xl px-2 py-2 transition-colors hover:bg-canvas">
        <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-[#e9eefb] text-[12px] font-bold text-[#1e2a5a]">
          AV
        </div>
        <div className="min-w-0 flex-1">
          <p className="text-[13px] font-semibold text-ink">Alex V.</p>
          <p className="text-[12px] text-muted">Analyst</p>
        </div>
        <ChevronDown size={16} className="text-muted" />
      </div>
    </aside>
  );
}
