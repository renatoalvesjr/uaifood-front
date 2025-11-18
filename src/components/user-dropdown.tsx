"use client";
import { useAuth } from "@/contexts/auth.context";
import { Button } from "./ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "./ui/dropdown-menu";
import { useRouter } from "next/navigation";

export function UserDropdown(this: never) {
  const { user, logout } = useAuth();
  const router = useRouter();
  const handleMenuItemClick = (route: string) => {
    router.push(route);
  };

  const handleMenuItemFunction = (func: () => unknown) => {
    func();
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button className="">{user?.name}</Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="start">
        <DropdownMenuGroup>
          <DropdownMenuItem
            onClick={handleMenuItemClick.bind(this, "/profile")}
          >
            Profile
          </DropdownMenuItem>
          <DropdownMenuItem onClick={handleMenuItemFunction.bind(this, logout)}>
            Logout
          </DropdownMenuItem>
        </DropdownMenuGroup>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
