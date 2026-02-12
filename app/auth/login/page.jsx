"use client";

import React, { use, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import GlassCard from "@/components/auth/GlassCard";
import { useAuth } from "@/components/context/AuthContext";
const LoginPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("APPLICANT");
  const [error, setError] = useState("");

  const router = useRouter();
  const { login } = useAuth();
  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    console.log("Logging in with:", { email, password });

    const url = `${process.env.NEXT_PUBLIC_API_URL}/auth/login`;

    const res = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email, password }),
    });
    if (res.ok) {
      const data = await res.json();
      console.log("Login response:", data);
      login(data);
      if (data.user.role === "RECRUITER") {
        router.push("/recruiter");
      } else {
        router.push("/applicant");
      }
    } else {
      const data = await res.json();
      console.log("Login response:", data);
      setError("Invalid credentials");
    }
  };

  return (
    <div className="min-h-[80vh] flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
      <div className="w-full max-w-md space-y-8">
        <div className="text-center">
          <div className="w-16 h-16 bg-blue-600 rounded-2xl flex items-center justify-center mx-auto mb-6 shadow-xl shadow-blue-500/20 rotate-3">
            <span className="text-2xl font-bold text-white">R</span>
          </div>
          <h2 className="text-3xl font-extrabold text-white tracking-tight">
            Welcome back
          </h2>
          <p className="mt-2 text-slate-400">
            Sign in to access your ResumeAI dashboard
          </p>
        </div>

        <GlassCard className="mt-8">
          <form className="space-y-6" onSubmit={handleSubmit}>
            <div className="space-y-4">
              <div>
                <label
                  htmlFor="email-address"
                  className="block text-sm font-medium text-slate-400 mb-1"
                >
                  Email address
                </label>
                <input
                  id="email-address"
                  name="email"
                  type="email"
                  autoComplete="email"
                  required
                  className="block w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500 transition-all sm:text-sm"
                  placeholder="name@company.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>
              <div>
                <label
                  htmlFor="password"
                  className="block text-sm font-medium text-slate-400 mb-1"
                >
                  Password
                </label>
                <input
                  id="password"
                  name="password"
                  type="password"
                  autoComplete="current-password"
                  required
                  className="block w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500 transition-all sm:text-sm"
                  placeholder="••••••••"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
              </div>
            </div>

            <div className="flex items-center justify-between">
              <div className="flex items-center">
                <input
                  id="remember-me"
                  name="remember-me"
                  type="checkbox"
                  className="h-4 w-4 bg-white/5 border-white/10 rounded text-blue-600 focus:ring-blue-500/50"
                />
                <label
                  htmlFor="remember-me"
                  className="ml-2 block text-sm text-slate-400"
                >
                  Remember me
                </label>
              </div>

              <div className="text-sm">
                <a
                  href="#"
                  className="font-medium text-blue-400 hover:text-blue-300"
                >
                  Forgot password?
                </a>
              </div>
            </div>

            {error && (
              <div className="text-red-400 text-sm text-center">{error}</div>
            )}

            <button
              type="submit"
              className="group relative w-full flex justify-center py-3 px-4 border border-transparent text-sm font-bold rounded-xl text-white bg-blue-600 hover:bg-blue-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-all shadow-lg shadow-blue-500/20 active:scale-95"
            >
              Sign in
            </button>
          </form>
        </GlassCard>

        <p className="mt-4 text-center text-sm text-slate-400">
          Don't have an account?{" "}
          <Link
            href="/auth/signup"
            className="font-medium text-blue-400 hover:text-blue-300"
          >
            Start your 14-day free trial
          </Link>
        </p>
      </div>
    </div>
  );
};

export default LoginPage;
