"use client";
import { useAuth } from "@/contexts/auth.context";

export default function ProfilePage() {
  const { user } = useAuth();

  return (
    <div className="flex justify-center p-4">
      <div className="border-4 bg-cyan-100 shadow-md shadow-yellow-900 border-black p-4">
        <h1 className="text-4xl">
          {user && (
            <>
              <p>Welcome, {user?.name}</p>
            </>
          )}
        </h1>
      </div>
    </div>
  );
}
