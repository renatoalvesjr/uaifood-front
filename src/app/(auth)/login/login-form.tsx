"use client";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/contexts/auth.context";
import { signIn } from "@/services/auth.service";

export const LoginForm = () => {
  const { isAuthenticated, isLoading, checkAuthStatus } = useAuth();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [state, setState] = useState<{ error?: string }>({});

  const router = useRouter();

  useEffect(() => {
    if (isAuthenticated && !isLoading) {
      router.push("/");
    }
  }, [isAuthenticated, isLoading, router]);

  const handleSubmit = async () => {
    try {
      await signIn({ email, password });
      await checkAuthStatus();
      router.push("/");
    } catch (error: Error | unknown) {
      setState(
        error instanceof Error
          ? { error: error.message }
          : { error: "An unexpected error occurred" }
      );
    }
  };

  return (
    <form action={handleSubmit} className="flex flex-col gap-4">
      <h2 className="text-2xl font-bold">Sign In</h2>
      <div>
        <label
          htmlFor="email"
          className="block text-sm font-medium text-gray-700"
        >
          Email
        </label>
        <input
          id="email"
          type="email"
          name="email"
          onChange={(e) => {
            setEmail(e.target.value);
          }}
          required
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
        />
      </div>
      <div>
        <label
          htmlFor="password"
          className="block text-sm font-medium text-gray-700"
        >
          Password
        </label>
        <input
          id="password"
          type="password"
          name="password"
          onChange={(e) => {
            setPassword(e.target.value);
          }}
          required
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
        />
      </div>
      {state?.error && <p className="text-red-500">{state.error}</p>}
      <button
        type="submit"
        disabled={isLoading}
        className="mt-4 rounded-md bg-indigo-600 px-4 py-2 text-white font-medium hover:bg-indigo-700"
      >
        {isLoading ? "Logging in..." : "Log In"}
      </button>
    </form>
  );
};
