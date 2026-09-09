"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { getTransactions } from "@/lib/api";

export default function TransactionsPage() {
    const [transactions, setTransactions] = useState([]);
    const [accountNumber, setAccountNumber] = useState("");
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");

    useEffect(() => {
        const token = localStorage.getItem("token");
        const storedAccountNumber =
            localStorage.getItem("accountNumber");

        if (!token || !storedAccountNumber) {
            window.location.href = "/login";
            return;
        }

        setAccountNumber(storedAccountNumber);

        async function fetchTransactions() {
            try {
                const data =
                    await getTransactions(storedAccountNumber);

                setTransactions(data.data || []);
            } catch (err) {
                setError(
                    err.message || "Failed to load transactions"
                );
            } finally {
                setLoading(false);
            }
        }

        fetchTransactions();
    }, []);

    const handleLogout = () => {
        localStorage.removeItem("token");
        localStorage.removeItem("accountNumber");
        localStorage.removeItem("accountHolder");

        window.location.href = "/login";
    };

    return (
        <main className="min-h-screen bg-[#faf5e6] text-[#29261f]">

            {/* Header */}
            <header className="border-b border-[#ded4b8] bg-[#faf5e6]">
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
                            href="/transactions"
                            className="text-sm font-semibold text-[#a17d1d]"
                        >
                            Transactions
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

                </div>
            </header>

            {/* Main */}
            <div className="mx-auto max-w-7xl px-6 py-10 lg:px-10">

                {/* Heading */}
                <div className="mb-10">
                    <p className="text-sm font-medium uppercase tracking-[0.2em] text-[#a17d1d]">
                        Account Activity
                    </p>

                    <h1 className="mt-2 text-4xl font-bold tracking-tight">
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

                    <p className="mt-2 text-lg font-semibold">
                        {accountNumber}
                    </p>
                </div>

                {/* Error */}
                {error && (
                    <div className="mb-6 rounded-xl border border-red-200 bg-red-50 px-5 py-4">
                        <p className="text-sm font-medium text-red-600">
                            {error}
                        </p>
                    </div>
                )}

                {/* Transactions */}
                <div className="overflow-hidden rounded-2xl border border-[#ded4b8] bg-white">

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
                            <p className="font-medium text-[#403c32]">
                                No transactions yet
                            </p>

                            <p className="mt-1 text-sm text-[#999181]">
                                Your transactions will appear here after you make a transfer.
                            </p>

                            <Link href="/transfer">
                                <Button
                                    className="mt-5 rounded-full bg-[#d4af37] px-6 text-white hover:bg-[#b99525]"
                                >
                                    Make a Transfer
                                </Button>
                            </Link>
                        </div>

                    ) : (

                        transactions.map((transaction, index) => (

                            <div
                                key={transaction.id || index}
                                className="grid gap-3 border-b border-[#eee7d7] px-6 py-5 sm:grid-cols-4 sm:items-center"
                            >

                                {/* Transaction */}
                                <div>
                                    <p className="font-medium text-[#29261f]">
                                        {transaction.description ||
                                            "Money Transfer"}
                                    </p>

                                    <p className="text-xs text-[#999181]">
                                        Transaction #
                                        {transaction.id || index + 1}
                                    </p>
                                </div>

                                {/* Date */}
                                <p className="text-sm text-[#77705f]">
                                    {transaction.transactionTime
                                        ? new Date(
                                            transaction.transactionTime
                                        ).toLocaleDateString("en-IN")
                                        : "-"}
                                </p>

                                {/* Amount */}
                                <p className="font-semibold text-[#29261f]">
                                    ₹
                                    {Number(
                                        transaction.amount
                                    ).toLocaleString("en-IN", {
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