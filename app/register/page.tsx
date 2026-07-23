"use client";

import React, { useState } from "react";
import z, { email } from "zod";

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

// TODO 2 (optional but good practice): Define a type for form errors
// Hint: not all fields are required to have an error at once — think about which utility type fits

export default function RegisterPage() {
  // TODO 3: Type the useState below using your RegisterFormData interface
  const [formData, setFormData] = useState<RegisterFormData>(
    /* fill generic type here */ {
      name: "",
      email: "",
      password: "",
      confirmPassword: "",
    },
  );

  // TODO 4: Type the errors state properly
  const [errors, setErrors] = useState<Partial<RegisterFormData>>({});

  const [isSubmitting, setIsSubmitting] = useState(false); // this one's fine as-is, TS infers boolean

  // TODO 5: Type the event parameter `e` correctly
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  // TODO 6: Add a proper return type to this function
  const validate = (): Partial<RegisterFormData> => {
    const newErrors: Partial<RegisterFormData> = {};

    // TODO: name should not be empty
    if (!formData.name.trim()) {
      newErrors.name = "Enter your Name";
    }
    // TODO: email should include "@"
    if (!formData.email.includes("@")) {
      newErrors.email = "Enter a valid email";
    }
    // TODO: password length >= 6
    if (formData.password.length < 6) {
      newErrors.password = "Password must be at least 6 characters";
    }
    // TODO: confirmPassword should match password
    if (formData.confirmPassword !== formData.password) {
      newErrors.confirmPassword = "Password Doest Match";
    }
    return newErrors;
  };

  // TODO 7: Type the event parameter `e` correctly (different event type than handleChange!)
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>): void => {
    e.preventDefault();
    const validationErrors = validate();
    setErrors(validationErrors);

    if (Object.keys(validationErrors).length === 0) {
      setIsSubmitting(true);
      console.log("Registering:", formData);
      setIsSubmitting(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="max-w-sm mx-auto mt-20 space-y-4">
      <h1 className="text-xl font-bold">Register</h1>

      <div>
        <input
          type="text"
          name="name"
          value={formData.name}
          onChange={handleChange}
          placeholder="Name"
          className="w-full border p-2 rounded"
        />
        {/* TODO 8: show error if exists */}
        {errors.name && <p className="text-red-500 text-sm">{errors.name}</p>}
      </div>

      <div>
        <input
          type="email"
          name="email"
          value={formData.email}
          onChange={handleChange}
          placeholder="Email"
          className="w-full border p-2 rounded"
        />
        {/* error here */}
        {errors.email && <p className="text-red-500 text-sm">{errors.email}</p>}
      </div>

      <div>
        <input
          type="password"
          name="password"
          value={formData.password}
          onChange={handleChange}
          placeholder="Password"
          className="w-full border p-2 rounded"
        />
        {/* error here */}
        {errors.password && (
          <p className="text-red-500 text-sm">{errors.password}</p>
        )}
      </div>

      <div>
        <input
          type="password"
          name="confirmPassword"
          value={formData.confirmPassword}
          onChange={handleChange}
          placeholder="Confirm Password"
          className="w-full border p-2 rounded"
        />
        {/* error here */}
        {errors.confirmPassword && (
          <p className="text-red-500 text-sm">{errors.confirmPassword}</p>
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
