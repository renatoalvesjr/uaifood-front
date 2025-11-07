"use client";
import { login } from "./actions";

export const LoginForm = () => {
  return (
    <form action={login} className="flex flex-col gap-4">
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
          required
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
        />
      </div>
      <button
        type="submit"
        className="mt-4 rounded-md bg-indigo-600 px-4 py-2 text-white font-medium hover:bg-indigo-700"
      >
        Log In
      </button>
    </form>
  );
};
