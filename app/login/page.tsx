"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { useState } from "react";
import { z } from "zod";
import Link from "next/link";
import { useRouter } from "next/navigation";

const loginSchema = z.object({
  email: z.string().trim().email("Enter a valid email address"),
  password: z.string().min(1, "Password is required"),
});

type LoginFormData = z.infer<typeof loginSchema>;

interface ApiResponse<T> {
  success: boolean;
  data: T;
  message?: string;
}

interface UserData {
  _id?: string;
  name: string;
  email: string;
  createdAt?: string;
}

export default function LoginPage() {
  const router = useRouter();
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<LoginFormData>({
    resolver: zodResolver(loginSchema),
  });

  const [serverError, setServerError] = useState<string | null>(null);
  const [successMsg, setSuccessMsg] = useState<string | null>(null);
  const [showPassword, setShowPassword] = useState(false);

  const onSubmit = async (data: LoginFormData) => {
    setServerError(null);
    setSuccessMsg(null);

    try {
      const res = await fetch("/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });

      const result: ApiResponse<UserData | null> = await res.json();

      if (result.success && result.data) {
        setSuccessMsg(`Welcome back, ${result.data.name}! Redirecting...`);
        setTimeout(() => {
          router.push("/");
        }, 1500);
      } else {
        setServerError(result.message || "Invalid credentials");
      }
    } catch {
      setServerError("Network error. Please check your connection and try again.");
    }
  };

  return (
    <div className="min-h-screen flex flex-col justify-center items-center px-4 py-12 bg-gradient-to-br from-zinc-900 via-zinc-950 to-black text-zinc-100">
      <div className="w-full max-w-md bg-zinc-900/80 backdrop-blur-xl border border-zinc-800/80 p-8 rounded-2xl shadow-2xl space-y-6 transition-all duration-300">
        
        {/* Header */}
        <div className="text-center space-y-2">
          <div className="inline-flex items-center justify-center w-12 h-12 rounded-xl bg-blue-600/10 text-blue-400 mb-2 border border-blue-500/20">
            <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 16l-4-4m0 0l4-4m-4 4h14m-5 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h7a3 3 0 013 3v1" />
            </svg>
          </div>
          <h1 className="text-2xl font-bold tracking-tight text-white">Welcome Back</h1>
          <p className="text-sm text-zinc-400">Sign in to your account</p>
        </div>

        {/* Banners */}
        {serverError && (
          <div className="flex items-center gap-3 p-3.5 text-sm text-red-300 bg-red-950/50 border border-red-800/50 rounded-xl">
            <svg className="w-5 h-5 flex-shrink-0 text-red-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            <span>{serverError}</span>
          </div>
        )}

        {successMsg && (
          <div className="flex items-center gap-3 p-3.5 text-sm text-emerald-300 bg-emerald-950/50 border border-emerald-800/50 rounded-xl">
            <svg className="w-5 h-5 flex-shrink-0 text-emerald-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
            </svg>
            <span>{successMsg}</span>
          </div>
        )}

        {/* Form */}
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <div>
            <label className="block text-xs font-medium text-zinc-300 mb-1.5">Email Address</label>
            <input
              {...register("email")}
              type="email"
              placeholder="user@example.com"
              className="w-full bg-zinc-950/70 border border-zinc-800 text-zinc-100 placeholder-zinc-500 text-sm px-3.5 py-2.5 rounded-xl focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition"
            />
            {errors.email && (
              <p className="text-red-400 text-xs mt-1">{errors.email.message}</p>
            )}
          </div>

          <div>
            <label className="block text-xs font-medium text-zinc-300 mb-1.5">Password</label>
            <div className="relative">
              <input
                {...register("password")}
                type={showPassword ? "text" : "password"}
                placeholder="••••••••"
                className="w-full bg-zinc-950/70 border border-zinc-800 text-zinc-100 placeholder-zinc-500 text-sm px-3.5 py-2.5 rounded-xl focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition pr-10"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-zinc-400 hover:text-zinc-200 text-xs font-medium"
              >
                {showPassword ? "Hide" : "Show"}
              </button>
            </div>
            {errors.password && (
              <p className="text-red-400 text-xs mt-1">{errors.password.message}</p>
            )}
          </div>

          <button
            type="submit"
            disabled={isSubmitting}
            className="w-full bg-blue-600 hover:bg-blue-500 active:bg-blue-700 text-white font-medium py-2.5 px-4 rounded-xl shadow-lg shadow-blue-600/20 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2 mt-2"
          >
            {isSubmitting ? (
              <>
                <svg className="animate-spin h-4 w-4 text-white" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                </svg>
                <span>Authenticating...</span>
              </>
            ) : (
              "Sign In"
            )}
          </button>
        </form>

        {/* Footer */}
        <div className="pt-2 border-t border-zinc-800/80 text-center text-xs text-zinc-400 space-y-2">
          <p>
            Don&apos;t have an account?{" "}
            <Link href="/register" className="text-blue-400 hover:text-blue-300 font-medium underline-offset-4 hover:underline">
              Create one now
            </Link>
          </p>
          <p>
            <Link href="/" className="text-zinc-500 hover:text-zinc-300">
              ← Back to Home
            </Link>
          </p>
        </div>

      </div>
    </div>
  );
}
