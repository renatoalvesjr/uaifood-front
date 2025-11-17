"use client";
import { useAuth } from "@/contexts/auth.context";
import { Button } from "./ui/button";
import { useRouter } from "next/navigation";
import { UserDropdown } from "./user-dropdown";
import Link from "next/link";

export function TopMenu() {
  const { isAuthenticated, isLoading } = useAuth();
  const router = useRouter();

  const handleLogin = () => {
    router.push("/login");
  };

  const handleRegister = () => {
    router.push("/register");
  };

  return (
    <header className="flex w-full items-center justify-between p-4 dark:bg-black/90 shadow-md border-b">
      <Link href="/" className="flex text-red-500 font-bold text-xl border p-2">
        UaiFood
      </Link>
      <div className="flex gap-4">
        {isLoading && <p>Loading...</p>}
        {!isAuthenticated && (
          <>
            <Button onClick={handleLogin}>Login</Button>
            <Button onClick={handleRegister}>Registro</Button>
          </>
        )}
        {isAuthenticated && !isLoading && (
          <>
            <UserDropdown />
          </>
        )}
      </div>
    </header>
  );
}
