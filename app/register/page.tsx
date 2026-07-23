"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import z from "zod";

// TODO 1: Define an interface `RegisterFormData` with fields:
// name (string), email (string), password (string), confirmPassword (string)
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
// TODO 2 (optional but good practice): Define a type for form errors
// Hint: not all fields are required to have an error at once — think about which utility type fits

export default function RegisterPage() {
  // TODO 3: Type the useState below using your RegisterFormData interface

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<RegisterFormData>({
    resolver: zodResolver(registerSchema),
  });

  const onSubmit = async (data: RegisterFormData) => {
    console.log("Submitting", data);
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="max-w-sm mx-auto mt-20 space-y-4"
    >
      <h1 className="text-xl font-bold">Register</h1>

      <div>
        <input
          {...register("name")}
          placeholder="Name"
          className="w-full border p-2 rounded"
        />
        {/* TODO 8: show error if exists */}
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
        {/* error here */}
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
        {/* error here */}
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
        {/* error here */}
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
