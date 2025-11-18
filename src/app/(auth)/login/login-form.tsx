"use client";
import { useEffect, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { useAuth } from "@/contexts/auth.context";
import { signIn } from "@/services/auth.service";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import Link from "next/link";

export const LoginForm = () => {
  const { isAuthenticated, isLoading, checkAuthStatus } = useAuth();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [state, setState] = useState<{ error?: string }>({});
  const searchParams = useSearchParams();

  const router = useRouter();

  useEffect(() => {
    if (isAuthenticated && !isLoading) {
      router.push("/profile");
    }
  }, [isAuthenticated, isLoading, router]);

  const handleSubmit = async () => {
    try {
      const redirectTo = searchParams.get("redirect") || "/profile";
      console.log("Redirecting to:", redirectTo);
      await signIn({ email, password });
      await checkAuthStatus();
      router.push(redirectTo);
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
      <Link href="/" className="text-red-500 text-4xl font-bold text-center">
        UaiFood
      </Link>
      <h2 className="text-2xl font-bold">Sign In</h2>
      <p className="text-gray-700 text-sm">Or <Link href="/register" className="text-blue-500 underline">create an account</Link> now!</p>

      <div>
        <label
          htmlFor="email"
          className="block text-sm font-medium text-gray-700"
        >
          Email
        </label>
        <Input
          id="email"
          type="email"
          name="email"
          onChange={(e) => {
            setEmail(e.target.value);
          }}
          required
        />
      </div>
      <div>
        <label
          htmlFor="password"
          className="block text-sm font-medium text-gray-700"
        >
          Password
        </label>
        <Input
          id="password"
          type="password"
          name="password"
          onChange={(e) => {
            setPassword(e.target.value);
          }}
          required
        />
      </div>
      {state?.error && <p className="text-red-500">{state.error}</p>}
      <Button
        type="submit"
        disabled={isLoading}
        className="bg-red-700 hover:bg-red-800 text-white border-2 border-black"
      >
        {isLoading ? "Logging in..." : "Log In"}
      </Button>
    </form>
  );
};
