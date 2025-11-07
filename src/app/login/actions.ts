"use server";

import { redirect } from "next/navigation";

export async function login(formData: FormData) {
  const email = formData.get("email");
  const password = formData.get("password");

  // Perform input validation (consider a library like Zod).
  if (!email || !password) {
    return { error: "Email and password are required." };
  }

  try {
    console.log(email, password);

    const response = await fetch(`${process.env.BACKEND_API_URL}/auth/login`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email, password }),
    });

    if (!response.ok) {
      const errorData = await response.json();
      return { error: errorData.message || "Login failed." };
    }

    // Backend successfully set the HttpOnly cookie.

    // Redirect the user.
    redirect("/");
  } catch (error) {
    console.error("API call failed:", error);
    return { error: "An unexpected error occurred." };
  }
}
