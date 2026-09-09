"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { PasswordInput } from "@/components/ui/password-input";
import { login } from "@/lib/api";

export default function LoginPage() {
  const router = useRouter();

  const [accountNumber, setAccountNumber] = useState("");
  const [password, setPassword] = useState("");

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  async function handleSubmit(e) {
    e.preventDefault();

    const trimmedAccountNumber = accountNumber.trim();

    if (!trimmedAccountNumber || !password) {
      setError("Enter your account number and password to continue.");
      return;
    }

    setLoading(true);
    setError("");

    try {
      const data = await login(trimmedAccountNumber, password);

      // JWT token save
      localStorage.setItem("token", data.token);

      // Account information bhi save kar lete hain
      localStorage.setItem("accountNumber", data.accountNumber);
      localStorage.setItem("accountHolder", data.accountHolder);

      // Dashboard par redirect
      router.push("/dashboard");
    } catch (err) {
      setError(err.message || "Unable to sign in. Please try again.");
    } finally {
      setLoading(false);
    }
  }

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
              Welcome back to
              <span className="block text-[#d4af37]">smarter banking.</span>
            </h2>

            <p className="mt-6 leading-7 text-white/60">
              Securely access your accounts, manage your money and keep track of
              your financial journey.
            </p>
          </div>
        </div>

        {/* Right Side */}
        <div className="flex items-center justify-center px-4 py-10 sm:px-6 sm:py-12">
          <div className="glass-surface w-full max-w-md rounded-3xl p-6 sm:p-8">
            <Link href="/" className="text-sm text-[#8b7632] hover:underline">
              ← Back to home
            </Link>

            <div className="mt-10">
              <h1 className="text-3xl font-bold text-[#29261f] sm:text-4xl">
                Welcome Back
              </h1>

              <p className="mt-2 text-[#77705f]">
                Login to access your banking dashboard.
              </p>
            </div>

            <form onSubmit={handleSubmit} className="mt-8 space-y-5">
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
                  type="text"
                  value={accountNumber}
                  onChange={(e) => setAccountNumber(e.target.value)}
                  placeholder="Enter your account number"
                  autoComplete="username"
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
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Enter your password"
                  autoComplete="current-password"
                  required
                  className="h-12 border-[#ded4b8] bg-white"
                />
              </div>

              {/* Error */}
              {error && (
                <div
                  role="alert"
                  className="rounded-xl border border-red-200 bg-red-50 p-3 text-sm text-red-600"
                >
                  {error}
                </div>
              )}

              {/* Login Button */}
              <Button
                type="submit"
                disabled={loading}
                className="h-12 w-full rounded-full bg-[#d4af37] text-base font-semibold text-white hover:bg-[#b99525]"
              >
                {loading ? "Logging in..." : "Secure Login"}
              </Button>
            </form>

            <p className="mt-8 text-center text-sm text-[#77705f]">
              Don't have an account?{" "}
              <Link
                href="/signup"
                className="font-semibold text-[#a17d1d] hover:underline"
              >
                Create one
              </Link>
            </p>
          </div>
        </div>
      </div>
    </main>
  );
}
