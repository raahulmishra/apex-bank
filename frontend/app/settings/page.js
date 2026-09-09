"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { PasswordInput } from "@/components/ui/password-input";
import AuthenticatedNavbar from "@/components/AuthenticatedNavbar";
import { changePassword } from "@/lib/api";

export default function SettingsPage() {
  const [accountNumber, setAccountNumber] = useState("");
  const [accountHolder, setAccountHolder] = useState("");

  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  // Check login
  useEffect(() => {
    const token = localStorage.getItem("token");
    const storedAccountNumber = localStorage.getItem("accountNumber");

    const storedAccountHolder = localStorage.getItem("accountHolder");

    if (!token || !storedAccountNumber) {
      window.location.href = "/login";
      return;
    }

    setAccountNumber(storedAccountNumber);
    setAccountHolder(storedAccountHolder || "");
  }, []);

  // Logout
  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("accountNumber");
    localStorage.removeItem("accountHolder");

    window.location.href = "/login";
  };

  // Change Password
  const handleChangePassword = async (e) => {
    e.preventDefault();

    setError("");
    setMessage("");

    // Check new password length
    if (newPassword.length < 6) {
      setError("New password must be at least 6 characters");
      return;
    }

    // Check password confirmation
    if (newPassword !== confirmPassword) {
      setError("New password and confirm password do not match");
      return;
    }

    try {
      setLoading(true);

      await changePassword(currentPassword, newPassword);

      setMessage("Password updated successfully. Please login again.");

      setCurrentPassword("");
      setNewPassword("");
      setConfirmPassword("");

      // Password change ke baad logout
      setTimeout(() => {
        localStorage.removeItem("token");
        localStorage.removeItem("accountNumber");
        localStorage.removeItem("accountHolder");

        window.location.href = "/login";
      }, 1500);
    } catch (err) {
      setError(err.message || "Failed to update password");
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="min-h-screen bg-[#faf5e6]">
      <AuthenticatedNavbar active="/settings" />

      {/* Main */}
      <div className="mx-auto max-w-4xl px-6 py-12">
        {/* Heading */}
        <div className="mb-10">
          <p className="text-sm font-semibold uppercase tracking-[0.2em] text-[#a17d1d]">
            Account
          </p>

          <h1 className="mt-2 text-3xl font-bold text-[#29261f] sm:text-4xl">
            Settings
          </h1>

          <p className="mt-3 text-[#77705f]">
            Manage your account preferences and security.
          </p>
        </div>

        <div className="space-y-6">
          {/* Profile */}
          <section className="rounded-2xl border border-[#e5dcc5] bg-white p-8 shadow-sm">
            <h2 className="text-xl font-bold text-[#29261f]">
              Profile Information
            </h2>

            <p className="mt-1 text-sm text-[#77705f]">
              Update your personal information.
            </p>

            <div className="mt-6 space-y-5">
              <div>
                <label className="mb-2 block text-sm font-medium text-[#403c32]">
                  Full Name
                </label>

                <Input
                  type="text"
                  value={accountHolder}
                  readOnly
                  className="h-12 border-[#ded4b8] bg-white"
                />
              </div>

              <div>
                <label className="mb-2 block text-sm font-medium text-[#403c32]">
                  Account Number
                </label>

                <Input
                  type="text"
                  value={accountNumber}
                  disabled
                  className="h-12 border-[#ded4b8] bg-[#f5f0e3]"
                />

                <p className="mt-1 text-xs text-[#8b8575]">
                  Account number cannot be changed.
                </p>
              </div>

              <p className="text-sm text-(--bank-muted)">
                Profile details are managed by Apex Trust support.
              </p>
            </div>
          </section>

          {/* Security */}
          <section className="rounded-2xl border border-[#e5dcc5] bg-white p-8 shadow-sm">
            <h2 className="text-xl font-bold text-[#29261f]">Security</h2>

            <p className="mt-1 text-sm text-[#77705f]">
              Keep your account secure by updating your password.
            </p>

            <form onSubmit={handleChangePassword} className="mt-6 space-y-5">
              <div>
                <label className="mb-2 block text-sm font-medium text-[#403c32]">
                  Current Password
                </label>

                <PasswordInput
                  placeholder="Enter current password"
                  value={currentPassword}
                  onChange={(e) => setCurrentPassword(e.target.value)}
                  className="h-12 border-[#ded4b8] bg-white"
                />
              </div>

              <div>
                <label className="mb-2 block text-sm font-medium text-[#403c32]">
                  New Password
                </label>

                <PasswordInput
                  placeholder="Enter new password"
                  value={newPassword}
                  onChange={(e) => setNewPassword(e.target.value)}
                  className="h-12 border-[#ded4b8] bg-white"
                />
              </div>

              <div>
                <label className="mb-2 block text-sm font-medium text-[#403c32]">
                  Confirm New Password
                </label>

                <PasswordInput
                  placeholder="Confirm new password"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  className="h-12 border-[#ded4b8] bg-white"
                />
              </div>

              {/* Error */}
              {error && (
                <p className="text-sm font-medium text-red-600">{error}</p>
              )}

              {/* Success */}
              {message && (
                <p className="text-sm font-medium text-green-700">{message}</p>
              )}

              <Button
                type="submit"
                disabled={loading}
                variant="outline"
                className="rounded-full border-[#d4af37] text-[#8b6d18] hover:bg-[#f5eedc]"
              >
                {loading ? "Updating..." : "Update Password"}
              </Button>
            </form>
          </section>

          {/* Danger Zone */}
          <section className="rounded-2xl border border-red-100 bg-white p-8 shadow-sm">
            <h2 className="text-xl font-bold text-[#29261f]">
              Account Actions
            </h2>

            <p className="mt-1 text-sm text-[#77705f]">
              Manage your session and account access.
            </p>

            <div className="mt-6">
              <Button
                type="button"
                onClick={handleLogout}
                variant="outline"
                className="rounded-full border-red-200 text-red-600 hover:bg-red-50"
              >
                Logout
              </Button>
            </div>
          </section>
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
