"use server";

import { redirect } from "next/navigation";

export async function signup(formData: FormData) {
  const email = formData.get("email");
  const password = formData.get("password");

  // Perform input validation (consider using a library like Zod).
  if (!email || !password) {
    return { error: "Email and password are required." };
  }

  try {
    const response = await fetch(`${process.env.BACKEND_API_URL}/auth/signup`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email, password }),
    });

    if (!response.ok) {
      const errorData = await response.json();
      return { error: errorData.message || "Sign up failed." };
    }

    // Backend successfully created the user and set the HttpOnly cookie.
    // Redirect the user to a protected page.
    redirect("/dashboard");
  } catch (error) {
    console.error("API call failed:", error);
    return { error: "An unexpected error occurred." };
  }
}
