"use server";
import api from "@/lib/api";
import { Login } from "@/models/login.interface";
import { RegisterData } from "@/models/register.interface";
import { cookies } from "next/headers";

export async function signIn({ email, password }: Login) {
  const cookieStore = await cookies();
  try {
    const response = await api.post("/auth/login", {
      email,
      password,
    });
    console.log(`Response status: ${response.status}`);
    if (response.status === 500) {
      throw new Error("Internal Server Error");
    } else if (response.status !== 200) {
      throw new Error("Login failed. Check your credentials and try again.");
    }
    console.log("Login successful:", response.data);

    const { access_token } = response.data;

    cookieStore.set("access_token", access_token, {
      path: "/",
      maxAge: 60 * 60 * 24, // 1 day
    });

    return response.data;
  } catch (error) {
    console.error("Login failed:", error);
    throw error;
  }
}

export async function signOut() {
  const cookieStore = await cookies();
  cookieStore.delete("access_token");
}

export async function fetchUserData(token: string) {
  const response = await api.get("/auth/profile", {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return response.data;
}

export async function createAccount({ name, email, password }: RegisterData) {
  try {
    await api.post("/auth/register", {
      name,
      email,
      password,
    });
  } catch (error) {
    console.error("Registration failed:", error);
    throw error;
  }
}

export async function getCookies() {
  console.log("Fetching cookies...");
  const cookieStore = await cookies();
  const token = cookieStore.get("access_token")?.value;
  if (token) {
    console.log("Token found:", token);
  } else {
    console.log("No token found.");
  }
  return token;
}
