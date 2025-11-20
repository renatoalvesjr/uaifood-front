"use client";

import { useAuth } from "@/contexts/auth.context";
import { UserType } from "@/models/enums";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

interface AdminLayoutProps {
  children: React.ReactNode;
}

export default function AdminLayout({ children }: AdminLayoutProps) {
  const { user, isAuthenticated, isLoading } = useAuth();
  const router = useRouter();
  const [hasPermission, setHasPermission] = useState(false);

  useEffect(() => {
    if (isLoading) {
      return;
    }
    if (!isAuthenticated) {
      router.push("/login");
      return;
    }

    if (!isAuthenticated || !user || user.type !== UserType.ADMIN) {
      router.push("/");
      return;
    }

    if(user.type === UserType.ADMIN) {
      setHasPermission(true);
    }
  }, [isAuthenticated, isLoading, router, user]);

  if (isLoading || !hasPermission) {
    return (
      <div className="flex justify-center items-center h-screen text-lg">
        Verificando permissões...
      </div>
    );
  }

  return <>{children}</>;
}
