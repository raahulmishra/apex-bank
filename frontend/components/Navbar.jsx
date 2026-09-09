"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import ThemeToggle from "@/app/components/ThemeToggle";

export default function Navbar() {
  return (
    <header className="glass-surface sticky top-0 z-50 rounded-none border-x-0 border-t-0">
      <div className="mx-auto flex min-h-20 max-w-7xl flex-wrap items-center justify-between gap-3 px-4 py-3 sm:px-6 lg:px-8">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-full bg-[#d4af37] text-xl font-bold text-white">
            A
          </div>

          <div className="leading-tight">
            <h1 className="text-lg font-bold tracking-wide text-[#24221d]">
              APEX
            </h1>
            <p className="text-xs tracking-[0.25em] text-[#8b7632]">TRUST</p>
          </div>
        </Link>

        {/* Navigation */}
        <nav className="hidden items-center gap-8 md:flex">
          <Link
            href="/"
            className="text-sm font-medium text-[#403c32] transition hover:text-[#b08d24]"
          >
            Home
          </Link>

          <a
            href="#about"
            className="text-sm font-medium text-[#403c32] transition hover:text-[#b08d24]"
          >
            About Us
          </a>

          <a
            href="#services"
            className="text-sm font-medium text-[#403c32] transition hover:text-[#b08d24]"
          >
            Services
          </a>

          <a
            href="#contact"
            className="text-sm font-medium text-[#403c32] transition hover:text-[#b08d24]"
          >
            Contact
          </a>
        </nav>

        {/* Auth buttons */}
        <div className="flex items-center gap-2 sm:gap-3">
          <ThemeToggle inline />

          <Link href="/login">
            <Button
              variant="outline"
              className="rounded-full border-[#d4af37] bg-transparent px-3 text-xs text-[#403c32] hover:bg-[#f7efd5] sm:px-5 sm:text-sm"
            >
              Login
            </Button>
          </Link>

          <Link href="/signup">
            <Button className="rounded-full bg-[#d4af37] px-3 text-xs text-white hover:bg-[#b99525] sm:px-5 sm:text-sm">
              Create an Account
            </Button>
          </Link>
        </div>
      </div>
    </header>
  );
}
