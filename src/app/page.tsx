"use client";
import { ItemList } from "@/components/item-list";
import { TopMenu } from "@/components/top-menu";
import { useAuth } from "@/contexts/auth.context";

export default function Home() {
  const { isAuthenticated, user, isLoading } = useAuth();

  if (isLoading) {
    return <div>Loading...</div>;
  }
  return (
    <div>
      <TopMenu />
      <div className="flex flex-col border items-center justify-center bg-zinc-50 font-sans dark:bg-black">
        <div>UAIFood</div>
        {isLoading && <p>Loading...</p>}
        {isAuthenticated && !isLoading && <p>Welcome, {user?.name}!</p>}
        <ItemList />
      </div>
    </div>
  );
}
