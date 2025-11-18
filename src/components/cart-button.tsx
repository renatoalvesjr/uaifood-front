import { ShoppingCartIcon } from "lucide-react";
import { Badge } from "./ui/badge";
import { DropdownMenu } from "@radix-ui/react-dropdown-menu";

export default function CartButton() {
  return (
    <DropdownMenu>
    <div className="flex items-center gap-2 p-1 border-2 border-black text-white hover:text-gray-100 rounded-md hover:bg-gray-200 cursor-pointer">
      <ShoppingCartIcon size={24} color="black"/>
      <div className="">
        <Badge className="">0</Badge>
      </div>
    </div>
    </DropdownMenu>
  );
}
