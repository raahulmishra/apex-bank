"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import AuthenticatedNavbar from "@/components/AuthenticatedNavbar";
import { getBalance, transferMoney } from "@/lib/api";

export default function TransferPage() {
  const [formData, setFormData] = useState({
    fromAccountNumber: "",
    toAccountNumber: "",
    amount: "",
    description: "",
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [balance, setBalance] = useState(null);

  // Logged-in account automatically set as From Account
  useEffect(() => {
    const accountNumber = localStorage.getItem("accountNumber");

    if (!accountNumber) {
      window.location.href = "/login";
      return;
    }

    setFormData((prev) => ({
      ...prev,
      fromAccountNumber: accountNumber,
    }));

    async function fetchBalance() {
      try {
        const data = await getBalance(accountNumber);
        setBalance(data);
      } catch (error) {
        setError("Unable to fetch account balance.");
      }
    }

    fetchBalance();
  }, []);

  function handleChange(e) {
    const { name, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  }

  async function handleSubmit(e) {
    e.preventDefault();

    const fromAccountNumber = formData.fromAccountNumber.trim();
    const toAccountNumber = formData.toAccountNumber.trim();
    const amount = Number(formData.amount);
    const availableBalance = Number(
      balance?.data?.balance ?? balance?.data ?? balance,
    );

    if (!fromAccountNumber || !toAccountNumber || !Number.isFinite(amount)) {
      setError("Enter a recipient account and a valid amount.");
      return;
    }

    if (fromAccountNumber === toAccountNumber) {
      setError("From and To account numbers cannot be the same.");
      return;
    }

    if (amount <= 0) {
      setError("Please enter a valid amount greater than zero.");
      return;
    }

    if (Number.isFinite(availableBalance) && amount > availableBalance) {
      setError("The transfer amount exceeds your available balance.");
      return;
    }

    const confirmed = window.confirm(
      `Confirm transfer of ₹${amount.toLocaleString("en-IN", {
        minimumFractionDigits: 2,
      })} to ${toAccountNumber}?`,
    );

    if (!confirmed) return;

    setLoading(true);
    setError("");
    setSuccess("");

    try {
      const result = await transferMoney({
        fromAccountNumber,

        toAccountNumber,

        amount,

        description: formData.description,
      });

      console.log("Transfer successful:", result);

      setSuccess("Transfer completed successfully!");

      setFormData((prev) => ({
        ...prev,
        toAccountNumber: "",
        amount: "",
        description: "",
      }));
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }

  return (
    <main className="min-h-screen bg-[#faf5e6]">
      <AuthenticatedNavbar active="/transfer" />

      {/* Main */}
      <div className="mx-auto max-w-4xl px-6 py-12">
        {/* Heading */}
        <div className="mb-10">
          <p className="text-sm font-semibold uppercase tracking-[0.2em] text-[#a17d1d]">
            Payments
          </p>

          <h1 className="mt-2 text-3xl font-bold text-[#29261f] sm:text-4xl">
            Transfer Money
          </h1>

          <p className="mt-3 text-[#77705f]">
            Send money securely to another Apex Trust account.
          </p>
        </div>

        {/* Transfer Card */}
        <div className="rounded-2xl border border-[#e5dcc5] bg-white p-8 shadow-sm">
          <div className="mb-6 rounded-xl bg-[#29261f] p-5 text-white">
            <p className="text-sm text-white/60">Available Balance</p>

            <p className="mt-2 text-2xl font-bold">
              {balance !== null
                ? `₹${Number(balance.data).toLocaleString("en-IN", {
                    minimumFractionDigits: 2,
                  })}`
                : "Loading..."}
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            {/* From Account */}
            <div>
              <label className="mb-2 block text-sm font-medium text-[#403c32]">
                From Account
              </label>

              <Input
                name="fromAccountNumber"
                value={formData.fromAccountNumber}
                onChange={handleChange}
                type="text"
                placeholder="ACC001"
                required
                readOnly
                className="h-12 border-[#ded4b8] bg-[#f5f0e3]"
              />

              <p className="mt-1 text-xs text-[#8b8575]">
                Your logged-in account.
              </p>
            </div>

            {/* To Account */}
            <div>
              <label className="mb-2 block text-sm font-medium text-[#403c32]">
                To Account
              </label>

              <Input
                name="toAccountNumber"
                value={formData.toAccountNumber}
                onChange={handleChange}
                type="text"
                placeholder="ACC002"
                required
                className="h-12 border-[#ded4b8] bg-white"
              />

              <p className="mt-1 text-xs text-[#8b8575]">
                Enter the recipient's account number.
              </p>
            </div>

            {/* Amount */}
            <div>
              <label className="mb-2 block text-sm font-medium text-[#403c32]">
                Amount
              </label>

              <div className="relative">
                <span className="absolute left-4 top-1/2 -translate-y-1/2 text-[#77705f]">
                  ₹
                </span>

                <Input
                  name="amount"
                  value={formData.amount}
                  onChange={handleChange}
                  type="number"
                  placeholder="5000"
                  min="1"
                  required
                  className="h-12 border-[#ded4b8] bg-white pl-9"
                />
              </div>
            </div>

            {/* Description */}
            <div>
              <label className="mb-2 block text-sm font-medium text-[#403c32]">
                Description
              </label>

              <Input
                name="description"
                value={formData.description}
                onChange={handleChange}
                type="text"
                placeholder="Payment for services"
                className="h-12 border-[#ded4b8] bg-white"
              />

              <p className="mt-1 text-xs text-[#8b8575]">
                Optional note for this transaction.
              </p>
            </div>

            {/* Error */}
            {error && (
              <div className="rounded-lg bg-red-50 p-3 text-sm text-red-600">
                {error}
              </div>
            )}

            {/* Success */}
            {success && (
              <div className="rounded-lg bg-green-50 p-3 text-sm text-green-700">
                {success}
              </div>
            )}

            {/* Button */}
            <Button
              type="submit"
              disabled={loading}
              className="h-12 w-full rounded-full bg-[#d4af37] text-base font-semibold text-white hover:bg-[#b99525]"
            >
              {loading ? "Processing..." : "Transfer Money"}
            </Button>
          </form>
        </div>

        {/* Security Note */}
        <div className="mt-6 rounded-xl border border-[#e5dcc5] bg-[#f5eedc] p-5">
          <p className="text-sm font-semibold text-[#403c32]">
            Secure Transfer
          </p>

          <p className="mt-1 text-sm leading-6 text-[#77705f]">
            Your transfer details are handled securely. Always verify the
            recipient's account number before sending money.
          </p>
        </div>
      </div>

      {/* Footer */}
      <footer className="border-t border-[#e5dcc5] py-6">
        <p className="text-center text-sm text-[#8b8575]">
          © 2026 Apex Trust. Secure. Simple. Modern.
        </p>
      </footer>
    </main>
  );
}
