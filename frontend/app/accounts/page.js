"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { getBalance } from "@/lib/api";

export default function AccountsPage() {
    const [accountNumber, setAccountNumber] = useState("");
    const [accountHolder, setAccountHolder] = useState("");
    const [balance, setBalance] = useState(null);

    useEffect(() => {
        const storedAccountNumber =
            localStorage.getItem("accountNumber");

        const storedAccountHolder =
            localStorage.getItem("accountHolder");

        if (!storedAccountNumber) {
            window.location.href = "/login";
            return;
        }

        setAccountNumber(storedAccountNumber);
        setAccountHolder(storedAccountHolder || "");

        async function fetchBalance() {
            try {
                const balanceData =
                    await getBalance(storedAccountNumber);

                setBalance(balanceData.data);
            } catch (error) {
                console.error(
                    "Failed to fetch account balance:",
                    error
                );
            }
        }

        fetchBalance();
    }, []);

    return (
        <main className="min-h-screen bg-[#faf5e6] text-[#29261f]">

            {/* Header */}
            <header className="border-b border-[#ded4b8]">
                <div className="mx-auto flex h-20 max-w-7xl items-center justify-between px-6 lg:px-10">

                    {/* Logo */}
                    <Link href="/" className="flex items-center gap-3">
                        <div className="flex h-10 w-10 items-center justify-center rounded-full bg-[#d4af37] text-xl font-bold text-white">
                            A
                        </div>

                        <div>
                            <h1 className="text-lg font-bold leading-none">
                                APEX
                            </h1>

                            <p className="text-[10px] tracking-[0.3em] text-[#a17d1d]">
                                TRUST
                            </p>
                        </div>
                    </Link>

                    {/* Navigation */}
                    <nav className="hidden items-center gap-8 md:flex">

                        <Link
                            href="/dashboard"
                            className="text-sm text-[#625b4e] hover:text-[#a17d1d]"
                        >
                            Dashboard
                        </Link>

                        <Link
                            href="/accounts"
                            className="text-sm font-semibold text-[#a17d1d]"
                        >
                            Accounts
                        </Link>

                        <Link
                            href="/transfer"
                            className="text-sm text-[#625b4e] hover:text-[#a17d1d]"
                        >
                            Transfer
                        </Link>

                        <Link
                            href="/settings"
                            className="text-sm text-[#625b4e] hover:text-[#a17d1d]"
                        >
                            Settings
                        </Link>

                        <Link
                            href="/login"
                            className="text-sm text-[#625b4e] hover:text-red-600"
                        >
                            Logout
                        </Link>

                    </nav>

                    <button className="rounded-lg border border-[#ded4b8] px-3 py-2 text-sm md:hidden">
                        Menu
                    </button>

                </div>
            </header>

            {/* Main */}
            <div className="mx-auto max-w-7xl px-6 py-10 lg:px-10">

                {/* Heading */}
                <div className="mb-10">

                    <p className="text-sm font-medium uppercase tracking-[0.2em] text-[#a17d1d]">
                        Accounts
                    </p>

                    <h1 className="mt-2 text-4xl font-bold">
                        My Account
                    </h1>

                    <p className="mt-2 text-[#77705f]">
                        Manage and view your account information.
                    </p>

                </div>

                {/* Account Card */}
                <div className="overflow-hidden rounded-2xl bg-[#29261f] text-white shadow-sm">

                    <div className="p-8 lg:p-10">

                        <div className="flex flex-col justify-between gap-8 sm:flex-row">

                            <div>
                                <p className="text-sm text-white/50">
                                    Available Balance
                                </p>

                                <h2 className="mt-3 text-5xl font-bold">
                                    {balance !== null
                                        ? `₹${Number(balance).toLocaleString(
                                              "en-IN",
                                              {
                                                  minimumFractionDigits: 2,
                                                  maximumFractionDigits: 2,
                                              }
                                          )}`
                                        : "Loading..."}
                                </h2>
                            </div>

                            <div className="flex h-14 w-14 items-center justify-center rounded-full bg-[#d4af37] text-xl font-bold">
                                ₹
                            </div>

                        </div>

                        <div className="mt-10 grid gap-6 border-t border-white/10 pt-7 sm:grid-cols-3">

                            <div>
                                <p className="text-xs text-white/40">
                                    Account Number
                                </p>

                                <p className="mt-2 font-medium">
                                    {accountNumber}
                                </p>
                            </div>

                            <div>
                                <p className="text-xs text-white/40">
                                    Account Holder
                                </p>

                                <p className="mt-2 font-medium">
                                    {accountHolder || "User"}
                                </p>
                            </div>

                            <div>
                                <p className="text-xs text-white/40">
                                    Status
                                </p>

                                <p className="mt-2 font-medium text-[#d4af37]">
                                    ● Active
                                </p>
                            </div>

                        </div>
                    </div>
                </div>

                {/* Details */}
                <section className="mt-10">

                    <h2 className="text-xl font-semibold">
                        Account Details
                    </h2>

                    <div className="mt-5 grid gap-5 md:grid-cols-2">

                        <div className="rounded-2xl border border-[#ded4b8] bg-white p-6">
                            <p className="text-sm text-[#8b8575]">
                                Account Type
                            </p>

                            <p className="mt-2 font-semibold">
                                Savings Account
                            </p>
                        </div>

                        <div className="rounded-2xl border border-[#ded4b8] bg-white p-6">
                            <p className="text-sm text-[#8b8575]">
                                Account Status
                            </p>

                            <p className="mt-2 font-semibold text-green-700">
                                Active
                            </p>
                        </div>

                        <div className="rounded-2xl border border-[#ded4b8] bg-white p-6">
                            <p className="text-sm text-[#8b8575]">
                                Account Created
                            </p>

                            <p className="mt-2 font-semibold">
                                Account information available
                            </p>
                        </div>

                        <div className="rounded-2xl border border-[#ded4b8] bg-white p-6">
                            <p className="text-sm text-[#8b8575]">
                                Currency
                            </p>

                            <p className="mt-2 font-semibold">
                                Indian Rupee (₹)
                            </p>
                        </div>

                    </div>
                </section>

                {/* Actions */}
                <section className="mt-10">

                    <h2 className="text-xl font-semibold">
                        Account Actions
                    </h2>

                    <div className="mt-5 flex flex-wrap gap-4">

                        <Link
                            href="/transfer"
                            className="rounded-full bg-[#d4af37] px-7 py-3 text-sm font-semibold text-white transition hover:bg-[#b99525]"
                        >
                            Transfer Money
                        </Link>

                        <Link
                            href="/dashboard"
                            className="rounded-full border border-[#d4af37] px-7 py-3 text-sm font-semibold text-[#8b7632] transition hover:bg-[#f5edcf]"
                        >
                            Back to Dashboard
                        </Link>

                    </div>

                </section>

                {/* Footer */}
                <footer className="mt-16 border-t border-[#ded4b8] py-6">
                    <p className="text-sm text-[#8b8575]">
                        © 2026 Apex Trust. All rights reserved.
                    </p>
                </footer>

            </div>
        </main>
    );
}