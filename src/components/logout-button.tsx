import { signOut } from "@/services/auth.service";
import { Button } from "./ui/button";
import { useRouter } from "next/navigation";
import { useAuth } from "@/contexts/auth.context";

export function LogoutButton() {
  const { checkAuthStatus } = useAuth();
  const router = useRouter();
  const handleLogout = async () => {
    try {
      signOut();
      await checkAuthStatus();
      router.push("/login");
    } catch (error) {
      console.error("Logout failed:", error);
    }
  };
  return <Button onClick={handleLogout}> Logout</Button>;
}
