"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { getBalance, getTransactions } from "@/lib/api";

export default function DashboardPage() {
  const [transactions, setTransactions] = useState([]);
  const [balance, setBalance] = useState(null);
  const [accountNumber, setAccountNumber] = useState("");
  const [accountHolder, setAccountHolder] = useState("");

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("accountNumber");
    localStorage.removeItem("accountHolder");

    window.location.href = "/login";
  };

  useEffect(() => {
    const storedToken = localStorage.getItem("token");

    const storedAccountNumber = localStorage.getItem("accountNumber");

    const storedAccountHolder = localStorage.getItem("accountHolder");

    if (!storedToken || !storedAccountNumber) {
      window.location.href = "/login";
      return;
    }

    setAccountNumber(storedAccountNumber);
    setAccountHolder(storedAccountHolder || "");

    async function fetchDashboardData() {
      try {
        const balanceData = await getBalance(storedAccountNumber);

        setBalance(balanceData.data);

        const transactionData = await getTransactions(storedAccountNumber);

        setTransactions(transactionData.data || []);
      } catch (error) {
        console.error("Failed to fetch dashboard data:", error);
      }
    }

    fetchDashboardData();
  }, []);

  return (
    <main className="min-h-screen bg-[#faf5e6] text-[#29261f]">
      {/* ================= HEADER ================= */}
      <header className="border-b border-[#ded4b8] bg-[#faf5e6]">
        <div className="mx-auto flex h-20 max-w-7xl items-center justify-between px-6 lg:px-10">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-full bg-[#d4af37] text-xl font-bold text-white">
              A
            </div>

            <div>
              <h1 className="text-lg font-bold leading-none">APEX</h1>

              <p className="text-[10px] tracking-[0.3em] text-[#a17d1d]">
                TRUST
              </p>
            </div>
          </Link>

          {/* Navigation */}
          <nav className="hidden items-center gap-8 md:flex">
            <Link
              href="/dashboard"
              className="text-sm font-semibold text-[#a17d1d]"
            >
              Dashboard
            </Link>

            <Link
              href="/accounts"
              className="text-sm text-[#625b4e] hover:text-[#a17d1d]"
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

            <button
              onClick={handleLogout}
              className="text-sm text-[#625b4e] hover:text-red-600"
            >
              Logout
            </button>
          </nav>

          {/* Mobile menu */}
          <button className="rounded-lg border border-[#ded4b8] px-3 py-2 text-sm md:hidden">
            Menu
          </button>
        </div>
      </header>

      {/* ================= MAIN ================= */}
      <div className="mx-auto max-w-7xl px-6 py-10 lg:px-10">
        {/* Welcome */}
        <div className="mb-10">
          <p className="text-sm font-medium uppercase tracking-[0.2em] text-[#a17d1d]">
            Dashboard
          </p>

          <h1 className="mt-2 text-4xl font-bold tracking-tight">
            Welcome back, {accountHolder || "User"}.
          </h1>

          <p className="mt-2 text-[#77705f]">
            Here's an overview of your finances.
          </p>
        </div>

        {/* ================= BALANCE CARDS ================= */}
        <div className="grid gap-6 lg:grid-cols-3">
          {/* Main Balance */}
          <div className="rounded-2xl bg-[#29261f] p-7 text-white shadow-sm lg:col-span-2">
            <div className="flex items-start justify-between">
              <div>
                <p className="text-sm text-white/60">Total Balance</p>

                <h2 className="mt-3 text-4xl font-bold">
                  {balance !== null
                    ? `₹${Number(balance).toLocaleString("en-IN", {
                        minimumFractionDigits: 2,
                        maximumFractionDigits: 2,
                      })}`
                    : "Loading..."}
                </h2>

                <p className="mt-2 text-sm text-white/50">Available balance</p>
              </div>

              <div className="flex h-12 w-12 items-center justify-center rounded-full bg-[#d4af37] text-xl font-bold">
                ₹
              </div>
            </div>

            <div className="mt-8 flex items-center justify-between border-t border-white/10 pt-5">
              <div>
                <p className="text-xs text-white/40">Account Number</p>

                <p className="mt-1 font-medium">{accountNumber}</p>
              </div>

              <div>
                <p className="text-right text-xs text-white/40">
                  Account Status
                </p>

                <p className="mt-1 text-right font-medium text-[#d4af37]">
                  Active
                </p>
              </div>
            </div>
          </div>

          {/* Account Info */}
          <div className="rounded-2xl border border-[#ded4b8] bg-white p-7">
            <p className="text-sm text-[#77705f]">Account Information</p>

            <h3 className="mt-5 text-xl font-semibold">
              {accountHolder || "User"}
            </h3>

            <div className="mt-6 space-y-4">
              <div>
                <p className="text-xs text-[#999181]">Account Number</p>

                <p className="mt-1 text-sm font-medium">{accountNumber}</p>
              </div>

              <div>
                <p className="text-xs text-[#999181]">Account Type</p>

                <p className="mt-1 text-sm font-medium">Savings Account</p>
              </div>

              <div>
                <p className="text-xs text-[#999181]">Status</p>

                <p className="mt-1 text-sm font-medium text-green-700">
                  ● Active
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* ================= QUICK ACTIONS ================= */}
        <section className="mt-10">
          <h2 className="text-xl font-semibold">Quick Actions</h2>

          <div className="mt-5 grid gap-4 sm:grid-cols-3">
            <Link href="/transfer">
              <div className="group rounded-2xl border border-[#ded4b8] bg-white p-6 transition hover:-translate-y-1 hover:border-[#d4af37] hover:shadow-md">
                <div className="flex h-11 w-11 items-center justify-center rounded-full bg-[#f5edcf] text-[#a17d1d]">
                  →
                </div>

                <h3 className="mt-5 font-semibold">Transfer Money</h3>

                <p className="mt-1 text-sm text-[#77705f]">
                  Send money to another account.
                </p>
              </div>
            </Link>

            <Link href="/accounts">
              <div className="group rounded-2xl border border-[#ded4b8] bg-white p-6 transition hover:-translate-y-1 hover:border-[#d4af37] hover:shadow-md">
                <div className="flex h-11 w-11 items-center justify-center rounded-full bg-[#f5edcf] text-[#a17d1d]">
                  ◉
                </div>

                <h3 className="mt-5 font-semibold">My Account</h3>

                <p className="mt-1 text-sm text-[#77705f]">
                  View your account details.
                </p>
              </div>
            </Link>

            <div className="group cursor-pointer rounded-2xl border border-[#ded4b8] bg-white p-6 transition hover:-translate-y-1 hover:border-[#d4af37] hover:shadow-md">
              <div className="flex h-11 w-11 items-center justify-center rounded-full bg-[#f5edcf] text-[#a17d1d]">
                ↗
              </div>

              <h3 className="mt-5 font-semibold">Transaction History</h3>

              <p className="mt-1 text-sm text-[#77705f]">
                View your recent transactions.
              </p>
            </div>
          </div>
        </section>

        {/* ================= RECENT TRANSACTIONS ================= */}
        <section className="mt-10">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-xl font-semibold">Recent Transactions</h2>

              <p className="mt-1 text-sm text-[#77705f]">
                Your latest account activity.
              </p>
            </div>

            <Link href="/transactions">
              <Button
                variant="outline"
                className="border-[#d4af37] text-[#8b7632] hover:bg-[#f5edcf]"
              >
                View All
              </Button>
            </Link>
          </div>

          <div className="mt-5 overflow-hidden rounded-2xl border border-[#ded4b8] bg-white">
            {/* Table Header */}
            <div className="hidden grid-cols-4 border-b border-[#eee7d7] bg-[#faf8f1] px-6 py-4 text-xs font-medium uppercase tracking-wider text-[#8b8575] sm:grid">
              <span>Transaction</span>
              <span>Date</span>
              <span>Amount</span>
              <span>Status</span>
            </div>

            {transactions.length === 0 ? (
              <div className="px-6 py-12 text-center">
                <p className="font-medium text-[#403c32]">
                  No transactions yet
                </p>

                <p className="mt-1 text-sm text-[#999181]">
                  Your recent transactions will appear here.
                </p>
              </div>
            ) : (
              transactions.map((transaction, index) => (
                <div
                  key={transaction.id || index}
                  className="grid gap-3 border-b border-[#eee7d7] px-6 py-5 sm:grid-cols-4 sm:items-center"
                >
                  <div>
                    <p className="font-medium text-[#29261f]">
                      {transaction.description || "Money Transfer"}
                    </p>

                    <p className="text-xs text-[#999181]">
                      Transaction #{transaction.id || index + 1}
                    </p>
                  </div>

                  <p className="text-sm text-[#77705f]">
                    {transaction.transactionTime
                      ? new Date(
                          transaction.transactionTime,
                        ).toLocaleDateString("en-IN")
                      : "-"}
                  </p>

                  <p className="font-semibold text-[#29261f]">
                    ₹
                    {Number(transaction.amount).toLocaleString("en-IN", {
                      minimumFractionDigits: 2,
                    })}
                  </p>

                  <span className="w-fit rounded-full bg-green-50 px-3 py-1 text-xs font-medium text-green-700">
                    Completed
                  </span>
                </div>
              ))
            )}
          </div>
        </section>

        {/* ================= FOOTER ================= */}
        <footer className="mt-16 border-t border-[#ded4b8] pt-6 pb-8">
          <div className="flex flex-col justify-between gap-3 text-sm text-[#8b8575] sm:flex-row">
            <p>© 2026 Apex Trust. All rights reserved.</p>

            <p>Secure. Simple. Modern Banking.</p>
          </div>
        </footer>
      </div>
    </main>
  );
}
