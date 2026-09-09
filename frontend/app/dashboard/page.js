"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import AuthenticatedNavbar from "@/components/AuthenticatedNavbar";
import { getBalance, getTransactions } from "@/lib/api";

export default function DashboardPage() {
  const [transactions, setTransactions] = useState([]);
  const [balance, setBalance] = useState(null);
  const [accountNumber, setAccountNumber] = useState("");
  const [accountHolder, setAccountHolder] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  useEffect(() => {
    let isMounted = true;
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
        if (isMounted) {
          setLoading(true);
          setError("");
        }

        const balanceData = await getBalance(storedAccountNumber);
        const transactionData = await getTransactions(storedAccountNumber);

        if (!isMounted) return;

        const balanceValue = balanceData?.data;
        setBalance(
          typeof balanceValue === "object" && balanceValue !== null
            ? (balanceValue.balance ?? balanceValue.amount ?? 0)
            : (balanceValue ?? 0),
        );

        const transactionValue = transactionData?.data;
        setTransactions(
          Array.isArray(transactionValue)
            ? transactionValue
            : transactionValue?.transactions || [],
        );
      } catch (error) {
        console.error("Failed to fetch dashboard data:", error);
        if (isMounted) {
          setError(
            "Unable to load your account information. Please try again.",
          );
        }
      } finally {
        if (isMounted) setLoading(false);
      }
    }

    fetchDashboardData();

    return () => {
      isMounted = false;
    };
  }, []);

  const formatAmount = (amount) => {
    return Number(amount || 0).toLocaleString("en-IN", {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    });
  };

  const formatDate = (date) => {
    if (!date) return "-";

    const parsedDate = new Date(date);

    if (Number.isNaN(parsedDate.getTime())) return "-";

    return parsedDate.toLocaleDateString("en-IN", {
      day: "2-digit",
      month: "short",
      year: "numeric",
    });
  };

  return (
    <main className="min-h-screen bg-transparent text-(--bank-text)">
      <AuthenticatedNavbar active="/dashboard" />

      {/* ================= MAIN ================= */}
      <div className="mx-auto max-w-7xl px-6 py-10 lg:px-10">
        {/* Welcome */}
        <div className="glass-surface mb-8 rounded-2xl p-6 sm:p-8">
          <p className="text-sm font-medium uppercase tracking-[0.2em] text-(--bank-gold-dark)">
            Dashboard
          </p>

          <h1 className="mt-2 text-3xl font-bold tracking-tight sm:text-4xl">
            Welcome back, {accountHolder || "User"}.
          </h1>

          <p className="mt-2 text-(--bank-muted)">
            Here&apos;s an overview of your finances.
          </p>
        </div>

        {/* ================= ERROR ================= */}
        {error && (
          <div className="mb-6 rounded-2xl border border-red-200 bg-red-50 px-5 py-4 dark:border-red-900/50 dark:bg-red-950/30">
            <p className="text-sm font-medium text-red-700 dark:text-red-300">
              {error}
            </p>
          </div>
        )}

        {/* ================= BALANCE CARDS ================= */}
        <div className="grid gap-6 lg:grid-cols-3">
          {/* Main Balance */}
          <div className="glass-dark rounded-2xl p-7 text-white lg:col-span-2">
            <div className="flex items-start justify-between">
              <div>
                <p className="text-sm text-white/60">Total Balance</p>

                <h2 className="mt-3 text-3xl font-bold sm:text-4xl">
                  {loading ? (
                    <span className="inline-block h-10 w-40 animate-pulse rounded bg-white/10" />
                  ) : balance !== null ? (
                    `₹${formatAmount(balance)}`
                  ) : (
                    "₹0.00"
                  )}
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

                <p className="mt-1 font-medium">
                  {accountNumber || "Loading..."}
                </p>
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
          <div className="glass-surface rounded-2xl p-7">
            <p className="text-sm text-(--bank-muted)">Account Information</p>

            <h3 className="mt-5 text-xl font-semibold">
              {accountHolder || "User"}
            </h3>

            <div className="mt-6 space-y-4">
              <div>
                <p className="text-xs text-(--bank-muted)">Account Number</p>

                <p className="mt-1 text-sm font-medium">
                  {accountNumber || "-"}
                </p>
              </div>

              <div>
                <p className="text-xs text-(--bank-muted)">Account Type</p>

                <p className="mt-1 text-sm font-medium">Savings Account</p>
              </div>

              <div>
                <p className="text-xs text-(--bank-muted)">Status</p>

                <p className="mt-1 text-sm font-medium text-green-700 dark:text-green-400">
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
            <Link
              href="/transfer"
              className="glass-surface group block rounded-2xl p-6 transition hover:-translate-y-1 hover:border-[#d4af37] hover:shadow-md"
            >
              <div className="flex h-11 w-11 items-center justify-center rounded-full bg-(--bank-soft) text-(--bank-gold-dark)">
                →
              </div>

              <h3 className="mt-5 font-semibold">Transfer Money</h3>

              <p className="mt-1 text-sm text-(--bank-muted)">
                Send money to another account.
              </p>
            </Link>

            <Link href="/accounts">
              <div className="glass-surface group rounded-2xl p-6 transition hover:-translate-y-1 hover:border-[#d4af37] hover:shadow-md">
                <div className="flex h-11 w-11 items-center justify-center rounded-full bg-(--bank-soft) text-(--bank-gold-dark)">
                  ◉
                </div>

                <h3 className="mt-5 font-semibold">My Account</h3>

                <p className="mt-1 text-sm text-(--bank-muted)">
                  View your account details.
                </p>
              </div>
            </Link>

            <Link href="/transactions">
              <div className="glass-surface group rounded-2xl p-6 transition hover:-translate-y-1 hover:border-[#d4af37] hover:shadow-md">
                <div className="flex h-11 w-11 items-center justify-center rounded-full bg-(--bank-soft) text-(--bank-gold-dark)">
                  ↗
                </div>

                <h3 className="mt-5 font-semibold">Transaction History</h3>

                <p className="mt-1 text-sm text-(--bank-muted)">
                  View your recent transactions.
                </p>
              </div>
            </Link>
          </div>
        </section>

        {/* ================= RECENT TRANSACTIONS ================= */}
        <section className="glass-surface mt-10 rounded-2xl p-6 sm:p-8">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-xl font-semibold">Recent Transactions</h2>

              <p className="mt-1 text-sm text-(--bank-muted)">
                Your latest account activity.
              </p>
            </div>

            <Link href="/transactions">
              <Button
                variant="outline"
                className="border-(--bank-gold) text-(--bank-gold-dark) hover:bg-(--bank-soft)"
              >
                View All
              </Button>
            </Link>
          </div>

          <div className="mt-5 overflow-hidden rounded-2xl border border-(--bank-border)">
            {/* Table Header */}
            <div className="hidden grid-cols-4 border-b border-(--bank-table-border) bg-(--bank-table) px-6 py-4 text-xs font-medium uppercase tracking-wider text-(--bank-muted) sm:grid">
              <span>Transaction</span>
              <span>Date</span>
              <span>Amount</span>
              <span>Status</span>
            </div>

            {/* Loading */}
            {loading ? (
              <div className="space-y-4 px-6 py-6">
                {[1, 2, 3].map((item) => (
                  <div
                    key={item}
                    className="grid gap-3 border-b border-(--bank-table-border) pb-5 last:border-0 sm:grid-cols-4"
                  >
                    <div className="h-5 w-32 animate-pulse rounded bg-(--bank-soft)" />
                    <div className="h-5 w-24 animate-pulse rounded bg-(--bank-soft)" />
                    <div className="h-5 w-24 animate-pulse rounded bg-(--bank-soft)" />
                    <div className="h-6 w-20 animate-pulse rounded-full bg-(--bank-soft)" />
                  </div>
                ))}
              </div>
            ) : transactions.length === 0 ? (
              /* Empty State */
              <div className="px-6 py-12 text-center">
                <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-(--bank-soft) text-(--bank-gold-dark)">
                  ₹
                </div>

                <p className="mt-4 font-medium text-(--bank-text)">
                  No transactions yet
                </p>

                <p className="mt-1 text-sm text-(--bank-muted)">
                  Your recent transactions will appear here.
                </p>

                <Link href="/transfer">
                  <Button
                    variant="outline"
                    className="mt-5 border-(--bank-gold) text-(--bank-gold-dark) hover:bg-(--bank-soft)"
                  >
                    Make a Transfer
                  </Button>
                </Link>
              </div>
            ) : (
              transactions.slice(0, 5).map((transaction, index) => {
                const isDebit =
                  transaction.type?.toLowerCase() === "debit" ||
                  transaction.fromAccount?.accountNumber === accountNumber;

                return (
                  <div
                    key={
                      transaction.id ??
                      `${transaction.transactionTime}-${index}`
                    }
                    className="grid gap-3 border-b border-(--bank-table-border) px-6 py-5 last:border-0 sm:grid-cols-4 sm:items-center"
                  >
                    <div>
                      <p className="font-medium text-(--bank-text)">
                        {transaction.description || "Money Transfer"}
                      </p>

                      <p className="text-xs text-(--bank-muted)">
                        Transaction #{transaction.id || index + 1}
                      </p>
                    </div>

                    <p className="text-sm text-(--bank-muted)">
                      {formatDate(transaction.transactionTime)}
                    </p>

                    <p
                      className={`font-semibold ${
                        isDebit
                          ? "text-red-700 dark:text-red-400"
                          : "text-green-700 dark:text-green-400"
                      }`}
                    >
                      {isDebit ? "- " : "+ "}₹{formatAmount(transaction.amount)}
                    </p>

                    <span className="w-fit rounded-full bg-green-50 px-3 py-1 text-xs font-medium text-green-700 dark:bg-green-950/40 dark:text-green-400">
                      Completed
                    </span>
                  </div>
                );
              })
            )}
          </div>
        </section>

        {/* ================= FOOTER ================= */}
        <footer className="mt-16 border-t border-(--bank-border) pt-6 pb-8">
          <div className="flex flex-col justify-between gap-3 text-sm text-(--bank-muted) sm:flex-row">
            <p>© 2026 Apex Trust. All rights reserved.</p>

            <p>Secure. Simple. Modern Banking.</p>
          </div>
        </footer>
      </div>
    </main>
  );
}
