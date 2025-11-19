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
      <div className="flex flex-col items-center justify-centers dark:bg-black">
        {isLoading && <p>Loading...</p>}
        <ItemList />
      </div>
    </div>
  );
}
