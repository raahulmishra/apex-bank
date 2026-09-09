"use client";

import { useState } from "react";
import Link from "next/link";
import { createAccount } from "@/lib/api";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

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
                accountHolder: formData.accountHolder,
                accountNumber: formData.accountNumber,
                balance: Number(formData.balance),
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
            setError(err.message);
        } finally {
            setLoading(false);
        }
    }

    return (
        <main className="min-h-screen bg-[#faf5e6]">
            <div className="grid min-h-screen lg:grid-cols-2">

                {/* Left Side */}
                <div className="hidden items-center justify-center bg-[#29261f] p-12 lg:flex">
                    <div className="max-w-lg text-white">

                        <div className="mb-8 flex items-center gap-3">
                            <div className="flex h-12 w-12 items-center justify-center rounded-full bg-[#d4af37] text-2xl font-bold">
                                A
                            </div>

                            <div>
                                <h1 className="text-xl font-bold">
                                    APEX
                                </h1>

                                <p className="text-xs tracking-[0.3em] text-[#d4af37]">
                                    TRUST
                                </p>
                            </div>
                        </div>

                        <h2 className="text-5xl font-bold leading-tight">
                            Your financial
                            <span className="block text-[#d4af37]">
                                future starts here.
                            </span>
                        </h2>

                        <p className="mt-6 leading-7 text-white/60">
                            Create your account and experience simple,
                            secure and modern banking.
                        </p>

                    </div>
                </div>

                {/* Form */}
                <div className="flex items-center justify-center px-6 py-12">
                    <div className="w-full max-w-md">

                        <Link
                            href="/"
                            className="text-sm text-[#8b7632] hover:underline"
                        >
                            ← Back to home
                        </Link>

                        <div className="mt-8">
                            <h1 className="text-4xl font-bold text-[#29261f]">
                                Create Account
                            </h1>

                            <p className="mt-2 text-[#77705f]">
                                Open your Apex Trust account in a few steps.
                            </p>
                        </div>

                        <form
                            onSubmit={handleSubmit}
                            className="mt-8 space-y-4"
                        >

                            {/* Full Name */}
                            <div>
                                <label className="mb-2 block text-sm font-medium text-[#403c32]">
                                    Full Name
                                </label>

                                <Input
                                    name="accountHolder"
                                    value={formData.accountHolder}
                                    onChange={handleChange}
                                    type="text"
                                    placeholder="Rahul Mishra"
                                    required
                                    className="h-12 border-[#ded4b8] bg-white"
                                />
                            </div>

                            {/* Account Number */}
                            <div>
                                <label className="mb-2 block text-sm font-medium text-[#403c32]">
                                    Account Number
                                </label>

                                <Input
                                    name="accountNumber"
                                    value={formData.accountNumber}
                                    onChange={handleChange}
                                    type="text"
                                    placeholder="ACC001"
                                    required
                                    className="h-12 border-[#ded4b8] bg-white"
                                />

                                <p className="mt-1 text-xs text-[#8b8575]">
                                    Choose a unique account number.
                                </p>
                            </div>

                            {/* Initial Deposit */}
                            <div>
                                <label className="mb-2 block text-sm font-medium text-[#403c32]">
                                    Initial Deposit
                                </label>

                                <Input
                                    name="balance"
                                    value={formData.balance}
                                    onChange={handleChange}
                                    type="number"
                                    placeholder="10000"
                                    min="0"
                                    required
                                    className="h-12 border-[#ded4b8] bg-white"
                                />
                            </div>

                            {/* Password */}
                            <div>
                                <label className="mb-2 block text-sm font-medium text-[#403c32]">
                                    Password
                                </label>

                                <Input
                                    name="password"
                                    value={formData.password}
                                    onChange={handleChange}
                                    type="password"
                                    placeholder="Create a password"
                                    minLength={6}
                                    required
                                    className="h-12 border-[#ded4b8] bg-white"
                                />
                            </div>

                            {/* Confirm Password */}
                            <div>
                                <label className="mb-2 block text-sm font-medium text-[#403c32]">
                                    Confirm Password
                                </label>

                                <Input
                                    name="confirmPassword"
                                    value={formData.confirmPassword}
                                    onChange={handleChange}
                                    type="password"
                                    placeholder="Confirm your password"
                                    minLength={6}
                                    required
                                    className="h-12 border-[#ded4b8] bg-white"
                                />
                            </div>

                            {/* Error Message */}
                            {error && (
                                <div className="rounded-lg bg-red-50 p-3 text-sm text-red-600">
                                    {error}
                                </div>
                            )}

                            {/* Success Message */}
                            {success && (
                                <div className="rounded-lg bg-green-50 p-3 text-sm text-green-700">
                                    {success}
                                </div>
                            )}

                            {/* Submit Button */}
                            <Button
                                type="submit"
                                disabled={loading}
                                className="mt-3 h-12 w-full rounded-full bg-[#d4af37] text-base font-semibold text-white hover:bg-[#b99525]"
                            >
                                {loading
                                    ? "Creating Account..."
                                    : "Create Account"}
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