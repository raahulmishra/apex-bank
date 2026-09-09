"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";

export default function Navbar() {
  return (
    <header className="sticky top-0 z-50 border-b border-[#e8dfc7] bg-[#fffdf7]/95 backdrop-blur">
      <div className="mx-auto flex h-20 max-w-7xl items-center justify-between px-6 lg:px-8">
        
        {/* Logo */}
        <Link href="/" className="flex items-center gap-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-full bg-[#d4af37] text-xl font-bold text-white">
            A
          </div>

          <div className="leading-tight">
            <h1 className="text-lg font-bold tracking-wide text-[#24221d]">
              APEX
            </h1>
            <p className="text-xs tracking-[0.25em] text-[#8b7632]">
              TRUST
            </p>
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
        <div className="flex items-center gap-3">
          <Link href="/login">
            <Button
              variant="outline"
              className="rounded-full border-[#d4af37] bg-transparent px-5 text-[#403c32] hover:bg-[#f7efd5]"
            >
              Login
            </Button>
          </Link>

          <Link href="/signup">
            <Button className="rounded-full bg-[#d4af37] px-5 text-white hover:bg-[#b99525]">
              Create an Account
            </Button>
          </Link>
        </div>
      </div>
    </header>
  );
}