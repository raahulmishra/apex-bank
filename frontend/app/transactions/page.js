"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import AuthenticatedNavbar from "@/components/AuthenticatedNavbar";
import { getTransactions } from "@/lib/api";

export default function TransactionsPage() {
  const [transactions, setTransactions] = useState([]);
  const [accountNumber, setAccountNumber] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [search, setSearch] = useState("");
  const [page, setPage] = useState(1);
  const pageSize = 8;

  useEffect(() => {
    const token = localStorage.getItem("token");
    const storedAccountNumber = localStorage.getItem("accountNumber");

    if (!token || !storedAccountNumber) {
      window.location.href = "/login";
      return;
    }

    setAccountNumber(storedAccountNumber);

    async function fetchTransactions() {
      try {
        const data = await getTransactions(storedAccountNumber);

        setTransactions(data.data || []);
      } catch (err) {
        setError(err.message || "Failed to load transactions");
      } finally {
        setLoading(false);
      }
    }

    fetchTransactions();
  }, []);

  const filteredTransactions = transactions.filter((transaction) => {
    const query = search.trim().toLowerCase();

    if (!query) return true;

    return [
      transaction.description,
      transaction.id,
      transaction.type,
      transaction.amount,
    ].some((value) =>
      String(value ?? "")
        .toLowerCase()
        .includes(query),
    );
  });

  const totalPages = Math.max(
    1,
    Math.ceil(filteredTransactions.length / pageSize),
  );
  const visibleTransactions = filteredTransactions.slice(
    (page - 1) * pageSize,
    page * pageSize,
  );

  function handleSearchChange(event) {
    setSearch(event.target.value);
    setPage(1);
  }

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("accountNumber");
    localStorage.removeItem("accountHolder");

    window.location.href = "/login";
  };

  return (
    <main className="min-h-screen bg-[#faf5e6] text-[#29261f]">
      <AuthenticatedNavbar active="/transactions" />

      {/* Main */}
      <div className="mx-auto max-w-7xl px-6 py-10 lg:px-10">
        {/* Heading */}
        <div className="mb-10">
          <p className="text-sm font-medium uppercase tracking-[0.2em] text-[#a17d1d]">
            Account Activity
          </p>

          <h1 className="mt-2 text-3xl font-bold tracking-tight sm:text-4xl">
            Transaction History
          </h1>

          <p className="mt-2 text-[#77705f]">
            View all transactions associated with your account.
          </p>
        </div>

        {/* Account Info */}
        <div className="mb-6 rounded-2xl border border-[#ded4b8] bg-white p-6">
          <p className="text-xs uppercase tracking-wider text-[#999181]">
            Account Number
          </p>

          <p className="mt-2 text-lg font-semibold">{accountNumber}</p>
        </div>

        {/* Error */}
        {error && (
          <div className="mb-6 rounded-xl border border-red-200 bg-red-50 px-5 py-4">
            <p className="text-sm font-medium text-red-600">{error}</p>
          </div>
        )}

        {/* Transactions */}
        <div className="overflow-hidden rounded-2xl border border-[#ded4b8] bg-white">
          <div className="flex flex-col gap-3 border-b border-[#eee7d7] px-6 py-4 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <p className="text-sm font-semibold text-(--bank-text)">
                {filteredTransactions.length} transaction
                {filteredTransactions.length === 1 ? "" : "s"}
              </p>
              <p className="text-xs text-(--bank-muted)">
                Search by description, type, amount, or ID.
              </p>
            </div>
            <input
              type="search"
              value={search}
              onChange={handleSearchChange}
              placeholder="Search transactions"
              aria-label="Search transactions"
              className="h-10 w-full rounded-lg border border-(--bank-border) bg-(--bank-soft) px-3 text-sm outline-none transition focus:border-(--bank-gold) focus:ring-2 focus:ring-(--bank-gold)/20 sm:max-w-xs"
            />
          </div>

          {/* Table Header */}
          <div className="hidden grid-cols-4 border-b border-[#eee7d7] bg-[#faf8f1] px-6 py-4 text-xs font-medium uppercase tracking-wider text-[#8b8575] sm:grid">
            <span>Transaction</span>
            <span>Date</span>
            <span>Amount</span>
            <span>Status</span>
          </div>

          {loading ? (
            <div className="px-6 py-14 text-center">
              <p className="font-medium text-[#403c32]">
                Loading transactions...
              </p>
            </div>
          ) : transactions.length === 0 ? (
            <div className="px-6 py-14 text-center">
              <p className="font-medium text-[#403c32]">No transactions yet</p>

              <p className="mt-1 text-sm text-[#999181]">
                Your transactions will appear here after you make a transfer.
              </p>

              <Link href="/transfer">
                <Button className="mt-5 rounded-full bg-[#d4af37] px-6 text-white hover:bg-[#b99525]">
                  Make a Transfer
                </Button>
              </Link>
            </div>
          ) : visibleTransactions.length === 0 ? (
            <div className="px-6 py-14 text-center">
              <p className="font-medium text-(--bank-text)">
                No matching transactions
              </p>
              <p className="mt-1 text-sm text-(--bank-muted)">
                Try a different search term.
              </p>
            </div>
          ) : (
            visibleTransactions.map((transaction, index) => (
              <div
                key={transaction.id || index}
                className="grid gap-3 border-b border-[#eee7d7] px-6 py-5 sm:grid-cols-4 sm:items-center"
              >
                {/* Transaction */}
                <div>
                  <p className="font-medium text-[#29261f]">
                    {transaction.description || "Money Transfer"}
                  </p>

                  <p className="text-xs text-[#999181]">
                    Transaction #
                    {transaction.id || (page - 1) * pageSize + index + 1}
                  </p>
                </div>

                {/* Date */}
                <p className="text-sm text-[#77705f]">
                  {transaction.transactionTime
                    ? new Date(transaction.transactionTime).toLocaleDateString(
                        "en-IN",
                      )
                    : "-"}
                </p>

                {/* Amount */}
                <p className="font-semibold text-[#29261f]">
                  ₹
                  {Number(transaction.amount).toLocaleString("en-IN", {
                    minimumFractionDigits: 2,
                    maximumFractionDigits: 2,
                  })}
                </p>

                {/* Status */}
                <span className="w-fit rounded-full bg-green-50 px-3 py-1 text-xs font-medium text-green-700">
                  Completed
                </span>
              </div>
            ))
          )}
        </div>

        {!loading && totalPages > 1 && (
          <div className="mt-4 flex items-center justify-between gap-3">
            <p className="text-sm text-(--bank-muted)">
              Page {page} of {totalPages}
            </p>
            <div className="flex gap-2">
              <Button
                type="button"
                variant="outline"
                disabled={page === 1}
                onClick={() => setPage((currentPage) => currentPage - 1)}
              >
                Previous
              </Button>
              <Button
                type="button"
                variant="outline"
                disabled={page === totalPages}
                onClick={() => setPage((currentPage) => currentPage + 1)}
              >
                Next
              </Button>
            </div>
          </div>
        )}

        {/* Back */}
        <div className="mt-6">
          <Link href="/dashboard">
            <Button
              variant="outline"
              className="rounded-full border-[#d4af37] text-[#8b7632] hover:bg-[#f5edcf]"
            >
              ← Back to Dashboard
            </Button>
          </Link>
        </div>
      </div>

      {/* Footer */}
      <footer className="mt-16 border-t border-[#ded4b8] py-6">
        <p className="text-center text-sm text-[#8b8575]">
          © 2026 Apex Trust. Secure. Simple. Modern Banking.
        </p>
      </footer>
    </main>
  );
}
