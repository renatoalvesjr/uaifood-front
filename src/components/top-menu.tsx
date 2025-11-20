"use client";
import { useAuth } from "@/contexts/auth.context";
import { Button } from "./ui/button";
import { useRouter } from "next/navigation";
import { UserDropdown } from "./user-dropdown";
import Link from "next/link";
import CartButton from "./cart-button";

export function TopMenu() {
  const { isAuthenticated, isLoading, user } = useAuth();
  const router = useRouter();

  const handleLogin = () => {
    router.push("/login");
  };

  const handleRegister = () => {
    router.push("/register");
  };

  const routes = [
    { name: "Home", path: "/" },
    { name: "Carrinho", path: "/cart" },
    { name: "Pedidos", path: "/orders" },
  ];

  return (
    <header className="flex w-full items-center justify-between p-4 bg-red-500 shadow-md border-b-4 border-black">
      <Link href="/" className="flex text-black hover:text-yellow-300 transition-colors font-bold text-xl p-2">
        UaiFood
      </Link>
      {isAuthenticated && (
        <div className="flex gap-4 text-black *:hover:text-yellow-300 p-2 *:transition-colors">
          {routes.map((route) => (
            <Link key={route.path} href={route.path} className="px-2">
              {route.name}
            </Link>
          ))}
        </div>
      )}

      <div className="flex gap-4">
        {isLoading && <p>Loading...</p>}
        {!isAuthenticated && (
          <>
            <Button onClick={handleLogin}>Login</Button>
            <Button onClick={handleRegister}>Registro</Button>
          </>
        )}
        {isAuthenticated && !isLoading && (
          <div className="flex items-center gap-4">
            <CartButton />
            <UserDropdown />
          </div>
        )}
      </div>
    </header>
  );
}
