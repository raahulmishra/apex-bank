"use client";

import { useState } from "react";
import Link from "next/link";
import { createAccount } from "@/lib/api";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { PasswordInput } from "@/components/ui/password-input";

export default function SignupPage() {
  const [formData, setFormData] = useState({
    accountHolder: "",
    accountNumber: "",
    balance: "",
    password: "",
    confirmPassword: "",
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  function handleChange(e) {
    const { name, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  }

  async function handleSubmit(e) {
    e.preventDefault();

    setLoading(true);
    setError("");
    setSuccess("");

    const accountHolder = formData.accountHolder.trim();
    const accountNumber = formData.accountNumber.trim();
    const balance = Number(formData.balance);

    if (!accountHolder || !accountNumber) {
      setError("Enter your full name and account number.");
      setLoading(false);
      return;
    }

    if (!Number.isFinite(balance) || balance < 0) {
      setError("Enter a valid non-negative initial deposit.");
      setLoading(false);
      return;
    }

    // Password validation
    if (formData.password.length < 6) {
      setError("Password must be at least 6 characters.");
      setLoading(false);
      return;
    }

    if (formData.password !== formData.confirmPassword) {
      setError("Passwords do not match.");
      setLoading(false);
      return;
    }

    try {
      const result = await createAccount({
        accountHolder,
        accountNumber,
        balance,
        password: formData.password,
      });

      console.log("Account created:", result);

      setSuccess("Account created successfully!");

      setFormData({
        accountHolder: "",
        accountNumber: "",
        balance: "",
        password: "",
        confirmPassword: "",
      });
    } catch (err) {
      setError(err.message || "Unable to create your account.");
    } finally {
      setLoading(false);
    }
  }

  const passwordChecks = [
    formData.password.length >= 6,
    /[A-Z]/.test(formData.password),
    /[0-9]/.test(formData.password),
  ];
  const passwordStrength = passwordChecks.filter(Boolean).length;

  return (
    <main className="min-h-screen bg-transparent">
      <div className="grid min-h-screen lg:grid-cols-2">
        {/* Left Side */}
        <div className="glass-dark hidden items-center justify-center rounded-br-[3rem] rounded-tr-[3rem] p-12 lg:flex">
          <div className="max-w-lg text-white">
            <div className="mb-8 flex items-center gap-3">
              <div className="flex h-12 w-12 items-center justify-center rounded-full bg-[#d4af37] text-2xl font-bold">
                A
              </div>

              <div>
                <h1 className="text-xl font-bold">APEX</h1>

                <p className="text-xs tracking-[0.3em] text-[#d4af37]">TRUST</p>
              </div>
            </div>

            <h2 className="text-4xl font-bold leading-tight xl:text-5xl">
              Your financial
              <span className="block text-[#d4af37]">future starts here.</span>
            </h2>

            <p className="mt-6 leading-7 text-white/60">
              Create your account and experience simple, secure and modern
              banking.
            </p>
          </div>
        </div>

        {/* Form */}
        <div className="flex items-center justify-center px-4 py-10 sm:px-6 sm:py-12">
          <div className="glass-surface w-full max-w-md rounded-3xl p-6 sm:p-8">
            <Link href="/" className="text-sm text-[#8b7632] hover:underline">
              ← Back to home
            </Link>

            <div className="mt-8">
              <h1 className="text-3xl font-bold text-[#29261f] sm:text-4xl">
                Create Account
              </h1>

              <p className="mt-2 text-[#77705f]">
                Open your Apex Trust account in a few steps.
              </p>
            </div>

            <form onSubmit={handleSubmit} className="mt-8 space-y-4" noValidate>
              {/* Full Name */}
              <div>
                <label
                  htmlFor="accountHolder"
                  className="mb-2 block text-sm font-medium text-[#403c32]"
                >
                  Full Name
                </label>

                <Input
                  id="accountHolder"
                  name="accountHolder"
                  value={formData.accountHolder}
                  onChange={handleChange}
                  type="text"
                  placeholder="Rahul Mishra"
                  autoComplete="name"
                  required
                  className="h-12 border-[#ded4b8] bg-white"
                />
              </div>

              {/* Account Number */}
              <div>
                <label
                  htmlFor="accountNumber"
                  className="mb-2 block text-sm font-medium text-[#403c32]"
                >
                  Account Number
                </label>

                <Input
                  id="accountNumber"
                  name="accountNumber"
                  value={formData.accountNumber}
                  onChange={handleChange}
                  type="text"
                  placeholder="ACC001"
                  autoComplete="username"
                  required
                  className="h-12 border-[#ded4b8] bg-white"
                />

                <p className="mt-1 text-xs text-[#8b8575]">
                  Choose a unique account number.
                </p>
              </div>

              {/* Initial Deposit */}
              <div>
                <label
                  htmlFor="balance"
                  className="mb-2 block text-sm font-medium text-[#403c32]"
                >
                  Initial Deposit
                </label>

                <Input
                  id="balance"
                  name="balance"
                  value={formData.balance}
                  onChange={handleChange}
                  type="number"
                  placeholder="10000"
                  min="0"
                  step="0.01"
                  required
                  className="h-12 border-[#ded4b8] bg-white"
                />
              </div>

              {/* Password */}
              <div>
                <label
                  htmlFor="password"
                  className="mb-2 block text-sm font-medium text-[#403c32]"
                >
                  Password
                </label>

                <PasswordInput
                  id="password"
                  name="password"
                  value={formData.password}
                  onChange={handleChange}
                  placeholder="Create a password"
                  minLength={6}
                  autoComplete="new-password"
                  required
                  className="h-12 border-[#ded4b8] bg-white"
                />

                <div className="mt-2" aria-live="polite">
                  <div className="flex gap-1" aria-hidden="true">
                    {[1, 2, 3].map((level) => (
                      <span
                        key={level}
                        className={`h-1.5 flex-1 rounded-full ${
                          level <= passwordStrength
                            ? passwordStrength === 3
                              ? "bg-green-500"
                              : "bg-(--bank-gold)"
                            : "bg-(--bank-soft)"
                        }`}
                      />
                    ))}
                  </div>
                  <p className="mt-1 text-xs text-(--bank-muted)">
                    Use 6+ characters with an uppercase letter and a number.
                  </p>
                </div>
              </div>

              {/* Confirm Password */}
              <div>
                <label
                  htmlFor="confirmPassword"
                  className="mb-2 block text-sm font-medium text-[#403c32]"
                >
                  Confirm Password
                </label>

                <PasswordInput
                  id="confirmPassword"
                  name="confirmPassword"
                  value={formData.confirmPassword}
                  onChange={handleChange}
                  placeholder="Confirm your password"
                  minLength={6}
                  autoComplete="new-password"
                  required
                  className="h-12 border-[#ded4b8] bg-white"
                />
              </div>

              {/* Error Message */}
              {error && (
                <div
                  role="alert"
                  className="rounded-xl border border-red-200 bg-red-50 p-3 text-sm text-red-600"
                >
                  {error}
                </div>
              )}

              {/* Success Message */}
              {success && (
                <div
                  role="status"
                  className="rounded-xl border border-green-200 bg-green-50 p-3 text-sm text-green-700"
                >
                  {success}
                </div>
              )}

              {/* Submit Button */}
              <Button
                type="submit"
                disabled={loading}
                className="mt-3 h-12 w-full rounded-full bg-[#d4af37] text-base font-semibold text-white hover:bg-[#b99525]"
              >
                {loading ? "Creating Account..." : "Create Account"}
              </Button>
            </form>

            <p className="mt-7 text-center text-sm text-[#77705f]">
              Already have an account?{" "}
              <Link
                href="/login"
                className="font-semibold text-[#a17d1d] hover:underline"
              >
                Login
              </Link>
            </p>
          </div>
        </div>
      </div>
    </main>
  );
}
