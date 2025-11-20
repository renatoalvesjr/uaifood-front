"use client";

import { useState } from "react";
import { Input } from "@/components/ui/input";
import { createAccount } from "@/services/auth.service";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { useRouter } from "next/navigation";

export default function SignupForm() {
  const [error, setError] = useState<string | null>(null);
  const [Loading, setLoading] = useState(false);
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const router = useRouter();

  const handleSubmit = async () => {
    try {
      setLoading(true);
      if (password !== confirmPassword) {
        setError("Passwords do not match");
        setLoading(false);
        return;
      }
      await createAccount({
        name: `${firstName} ${lastName}`,
        email,
        password,
      });
      router.push("/login");
    } catch (error) {
      setError((error as Error).message);
      setLoading(false);
    }
  };

  return (
    <form
      action={handleSubmit}
      className="flex flex-col gap-4 border-2 border-black shadow-[8px_8px_0_0_#000] bg-cyan-50 p-8 "
    >
      <Link href="/" className="text-red-500 text-4xl font-bold text-center">
        UaiFood
      </Link>
      <h2 className="text-2xl font-bold">Sign up</h2>
      <p className="text-gray-700 text-sm">
        Already have an account?{" "}
        <Link href="/login" className="text-blue-500 underline">
          Log in
        </Link>{" "}
        now!
      </p>

      <div className="flex gap-4">
        <div>
          <label htmlFor="first-name">First Name</label>
          <Input
            type="text"
            id="first-name"
            name="firstName"
            placeholder="First Name"
            onChange={(e) => {
              setFirstName(e.target.value);
            }}
          />
        </div>
        <div>
          <label htmlFor="last-name">Last Name</label>
          <Input
            type="text"
            id="last-name"
            name="lastName"
            placeholder="Last Name"
            onChange={(e) => {
              setLastName(e.target.value);
            }}
          />
        </div>
      </div>
      <div>
        <label htmlFor="email">Email</label>
        <Input
          type="email"
          id="email"
          name="email"
          placeholder="Email"
          onChange={(e) => {
            setEmail(e.target.value);
          }}
        />
      </div>
      <div>
        <label htmlFor="password">Password</label>
        <Input
          type="password"
          id="password"
          name="password"
          placeholder="Password"
          onChange={(e) => {
            setPassword(e.target.value);
          }}
        />
      </div>
      <div>
        <label htmlFor="confirm-password">Confirm Password</label>
        <Input
          type="password"
          id="confirm-password"
          name="confirmPassword"
          placeholder="Confirm Password"
          onChange={(e) => {
            setConfirmPassword(e.target.value);
          }}
        />
      </div>
      {error && <p className="text-red-500">{error}</p>}
      <Button
        disabled={Loading}
        type="submit"
        className="bg-red-700 hover:bg-red-800 text-white border-2 border-black"
      >
        {Loading ? "Signing up..." : "Sign Up"}
      </Button>
    </form>
  );
}
