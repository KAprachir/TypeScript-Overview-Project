"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { useState } from "react";
import z from "zod";

const registerSchema = z
  .object({
    name: z.string().min(1, "Enter a Valid Name"),
    email: z.string().email("Enter a valid email"),
    password: z.string().min(6, "Password must be at least 6 characters"),
    confirmPassword: z.string(),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords do not match",
    path: ["confirmPassword"],
  });

type RegisterFormData = z.infer<typeof registerSchema>;

// Step A: backend এর apiResponse shape এর সাথে match করে frontend type বানাও
interface ApiResponse<T> {
  success: boolean;
  data: T;
  message?: string;
}

interface RegisteredUser {
  _id: string;
  name: string;
  email: string;
  createdAt: string;
}

export default function RegisterPage() {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<RegisterFormData>({
    resolver: zodResolver(registerSchema),
  });

  // Step B: server error message দেখানোর জন্য আলাদা state
  const [serverError, setServerError] = useState<string | null>(null);
  const [successMsg, setSuccessMsg] = useState<string | null>(null);

  const onSubmit = async (data: RegisterFormData) => {
    setServerError(null);
    setSuccessMsg(null);

    const res = await fetch("/api/auth/register", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    });

    // Step C: response টাকে generic type দিয়ে type করো
    const result: ApiResponse<RegisteredUser | null> = await res.json();

    if (result.success) {
      setSuccessMsg("Account created successfully!");
      // পরে এইখানে redirect করবা login page এ
    } else {
      setServerError(result.message || "Something went wrong");
    }
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="max-w-sm mx-auto mt-20 space-y-4"
    >
      <h1 className="text-xl font-bold">Register</h1>

      {serverError && (
        <p className="text-red-500 text-sm bg-red-50 p-2 rounded">
          {serverError}
        </p>
      )}
      {successMsg && (
        <p className="text-green-600 text-sm bg-green-50 p-2 rounded">
          {successMsg}
        </p>
      )}

      <div>
        <input
          {...register("name")}
          placeholder="Name"
          className="w-full border p-2 rounded"
        />
        {errors.name && (
          <p className="text-red-500 text-sm">{errors.name.message}</p>
        )}
      </div>

      <div>
        <input
          {...register("email")}
          placeholder="Email"
          className="w-full border p-2 rounded"
        />
        {errors.email && (
          <p className="text-red-500 text-sm">{errors.email.message}</p>
        )}
      </div>

      <div>
        <input
          {...register("password")}
          type="password"
          placeholder="Password"
          className="w-full border p-2 rounded"
        />
        {errors.password && (
          <p className="text-red-500 text-sm">{errors.password.message}</p>
        )}
      </div>

      <div>
        <input
          {...register("confirmPassword")}
          type="password"
          placeholder="Confirm Password"
          className="w-full border p-2 rounded"
        />
        {errors.confirmPassword && (
          <p className="text-red-500 text-sm">
            {errors.confirmPassword.message}
          </p>
        )}
      </div>

      <button
        type="submit"
        disabled={isSubmitting}
        className="w-full bg-black text-white p-2 rounded"
      >
        {isSubmitting ? "Registering..." : "Register"}
      </button>
    </form>
  );
}
