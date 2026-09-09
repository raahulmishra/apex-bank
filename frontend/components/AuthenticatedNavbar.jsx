"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import ThemeToggle from "@/app/components/ThemeToggle";

const navigation = [
  { href: "/dashboard", label: "Dashboard" },
  { href: "/accounts", label: "Accounts" },
  { href: "/transfer", label: "Transfer" },
  { href: "/transactions", label: "Transactions" },
  { href: "/settings", label: "Settings" },
];

export default function AuthenticatedNavbar({ active }) {
  const pathname = usePathname();
  const [menuOpen, setMenuOpen] = useState(false);
  const activePath = active || pathname;

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("accountNumber");
    localStorage.removeItem("accountHolder");
    window.location.href = "/login";
  };

  return (
    <header className="glass-surface sticky top-0 z-40 rounded-none border-x-0 border-t-0">
      <div className="mx-auto flex min-h-20 max-w-7xl items-center justify-between gap-3 px-4 py-3 sm:px-6 lg:px-10">
        <Link
          href="/"
          className="flex items-center gap-3"
          onClick={() => setMenuOpen(false)}
        >
          <div className="flex h-10 w-10 items-center justify-center rounded-full bg-[#d4af37] text-xl font-bold text-white">
            A
          </div>
          <div>
            <h1 className="text-lg font-bold leading-none">APEX</h1>
            <p className="text-[10px] tracking-[0.3em] text-(--bank-gold-dark)">
              TRUST
            </p>
          </div>
        </Link>

        <nav className="hidden items-center gap-6 md:flex lg:gap-8">
          {navigation.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className={`text-sm transition ${
                activePath === item.href
                  ? "font-semibold text-(--bank-gold-dark)"
                  : "text-(--bank-subtle) hover:text-(--bank-gold-dark)"
              }`}
            >
              {item.label}
            </Link>
          ))}
          <button
            type="button"
            onClick={handleLogout}
            className="text-sm text-(--bank-subtle) hover:text-red-600"
          >
            Logout
          </button>
        </nav>

        <div className="flex items-center gap-2">
          <ThemeToggle inline />
          <button
            type="button"
            onClick={() => setMenuOpen((open) => !open)}
            className="rounded-lg border border-(--bank-border) px-3 py-2 text-sm md:hidden"
            aria-expanded={menuOpen}
            aria-controls="authenticated-mobile-nav"
          >
            {menuOpen ? "Close" : "Menu"}
          </button>
        </div>
      </div>

      {menuOpen && (
        <nav
          id="authenticated-mobile-nav"
          className="border-t border-(--bank-border) px-4 py-4 md:hidden"
        >
          <div className="mx-auto flex max-w-7xl flex-col gap-3 sm:px-2">
            {navigation.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                onClick={() => setMenuOpen(false)}
                className={`rounded-lg px-3 py-2 text-sm ${
                  activePath === item.href
                    ? "bg-(--bank-soft) font-semibold text-(--bank-gold-dark)"
                    : "text-(--bank-subtle)"
                }`}
              >
                {item.label}
              </Link>
            ))}
            <button
              type="button"
              onClick={handleLogout}
              className="px-3 py-2 text-left text-sm text-(--bank-subtle) hover:text-red-600"
            >
              Logout
            </button>
          </div>
        </nav>
      )}
    </header>
  );
}
