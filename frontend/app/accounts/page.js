"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import AuthenticatedNavbar from "@/components/AuthenticatedNavbar";
import { getBalance } from "@/lib/api";

export default function AccountsPage() {
  const [accountNumber, setAccountNumber] = useState("");
  const [accountHolder, setAccountHolder] = useState("");
  const [balance, setBalance] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const storedAccountNumber = localStorage.getItem("accountNumber");

    const storedAccountHolder = localStorage.getItem("accountHolder");

    if (!storedAccountNumber) {
      window.location.href = "/login";
      return;
    }

    setAccountNumber(storedAccountNumber);
    setAccountHolder(storedAccountHolder || "");

    async function fetchBalance() {
      try {
        const balanceData = await getBalance(storedAccountNumber);

        setBalance(balanceData.data);
      } catch (error) {
        setError(error.message || "Unable to load your account balance.");
      } finally {
        setLoading(false);
      }
    }

    fetchBalance();
  }, []);

  return (
    <main className="min-h-screen bg-[#faf5e6] text-[#29261f]">
      <AuthenticatedNavbar active="/accounts" />

      {/* Main */}
      <div className="mx-auto max-w-7xl px-6 py-10 lg:px-10">
        {/* Heading */}
        <div className="mb-10">
          <p className="text-sm font-medium uppercase tracking-[0.2em] text-[#a17d1d]">
            Accounts
          </p>

          <h1 className="mt-2 text-3xl font-bold sm:text-4xl">My Account</h1>

          <p className="mt-2 text-[#77705f]">
            Manage and view your account information.
          </p>
        </div>

        {/* Account Card */}
        {error && (
          <div
            role="alert"
            className="mb-6 rounded-xl border border-red-200 bg-red-50 px-5 py-4 text-sm text-red-600"
          >
            {error}
          </div>
        )}

        <div className="overflow-hidden rounded-2xl bg-[#29261f] text-white shadow-sm">
          <div className="p-8 lg:p-10">
            <div className="flex flex-col justify-between gap-8 sm:flex-row">
              <div>
                <p className="text-sm text-white/50">Available Balance</p>

                <h2 className="mt-3 text-4xl font-bold sm:text-5xl">
                  {loading
                    ? "Loading..."
                    : balance !== null
                      ? `₹${Number(balance).toLocaleString("en-IN", {
                          minimumFractionDigits: 2,
                          maximumFractionDigits: 2,
                        })}`
                      : "₹0.00"}
                </h2>
              </div>

              <div className="flex h-14 w-14 items-center justify-center rounded-full bg-[#d4af37] text-xl font-bold">
                ₹
              </div>
            </div>

            <div className="mt-10 grid gap-6 border-t border-white/10 pt-7 sm:grid-cols-3">
              <div>
                <p className="text-xs text-white/40">Account Number</p>

                <p className="mt-2 font-medium">{accountNumber}</p>
              </div>

              <div>
                <p className="text-xs text-white/40">Account Holder</p>

                <p className="mt-2 font-medium">{accountHolder || "User"}</p>
              </div>

              <div>
                <p className="text-xs text-white/40">Status</p>

                <p className="mt-2 font-medium text-[#d4af37]">● Active</p>
              </div>
            </div>
          </div>
        </div>

        {/* Details */}
        <section className="mt-10">
          <h2 className="text-xl font-semibold">Account Details</h2>

          <div className="mt-5 grid gap-5 md:grid-cols-2">
            <div className="rounded-2xl border border-[#ded4b8] bg-white p-6">
              <p className="text-sm text-[#8b8575]">Account Type</p>

              <p className="mt-2 font-semibold">Savings Account</p>
            </div>

            <div className="rounded-2xl border border-[#ded4b8] bg-white p-6">
              <p className="text-sm text-[#8b8575]">Account Status</p>

              <p className="mt-2 font-semibold text-green-700">Active</p>
            </div>

            <div className="rounded-2xl border border-[#ded4b8] bg-white p-6">
              <p className="text-sm text-[#8b8575]">Account Created</p>

              <p className="mt-2 font-semibold">
                Account information available
              </p>
            </div>

            <div className="rounded-2xl border border-[#ded4b8] bg-white p-6">
              <p className="text-sm text-[#8b8575]">Currency</p>

              <p className="mt-2 font-semibold">Indian Rupee (₹)</p>
            </div>
          </div>
        </section>

        {/* Actions */}
        <section className="mt-10">
          <h2 className="text-xl font-semibold">Account Actions</h2>

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
