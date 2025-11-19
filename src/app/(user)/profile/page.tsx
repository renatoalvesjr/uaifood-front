"use client";
import { useAuth } from "@/contexts/auth.context";

export default function ProfilePage() {
  const { user } = useAuth();

  return (
    <div className="flex justify-center p-4">
      <div className="border-4 bg-cyan-100 shadow-[8px_8px_0_0_#000] hover:shadow-[5px_5px_0_0_#000] border-black p-4 transition-shadow">
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
