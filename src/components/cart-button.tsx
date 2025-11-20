"use client";

import { ShoppingCartIcon, Loader2 } from "lucide-react";
import { Badge } from "./ui/badge";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "./ui/dropdown-menu"; 
import { useCart } from "@/contexts/cart.context"; 
import { useAuth } from "@/contexts/auth.context"; 
import Link from "next/link";
import { formatCurrency } from "@/lib/utils";

export default function CartButton() {
  const { isAuthenticated } = useAuth();
  // Utiliza totalValue do contexto
  const { cart, isLoading, totalValue } = useCart(); 

  const cartItems = Array.isArray(cart) ? cart : [];
  
  const totalItems = cartItems.reduce((sum, item) => sum + item.quantity, 0); 

  // Determina se o botão deve ser desativado ou exibir loader
  const isSyncing = isLoading || !isAuthenticated;

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild disabled={isSyncing}>
        <div className="flex items-center gap-2 p-1 border-2 border-black text-black hover:text-gray-100 rounded-md hover:bg-gray-200 cursor-pointer transition relative">
          
          {isSyncing && isAuthenticated ? (
            <Loader2 size={24} color="black" className="animate-spin" />
          ) : (
            <ShoppingCartIcon size={24} color="black" />
          )}

          {/* Badge de Contagem */}
          <div className="absolute top-0 right-0 transform translate-x-1/2 -translate-y-1/2">
             <Badge className="bg-red-500 hover:bg-red-500/80 text-white rounded-full h-5 w-5 flex items-center justify-center p-0">
               {totalItems}
             </Badge>
          </div>
        </div>
      </DropdownMenuTrigger>

      {/* Conteúdo do Dropdown */}
      <DropdownMenuContent className="w-80" align="end">
        <div className="p-2 font-bold text-lg flex justify-between items-center">
            <span>Seu Carrinho</span>
        </div>
        <DropdownMenuSeparator />

        {!isAuthenticated ? (
            <DropdownMenuItem className="text-red-500 justify-center cursor-default">
                Faça login para ver o carrinho.
            </DropdownMenuItem>
        ) : cartItems.length > 0 ? (
          <>
            {/* Lista de Itens no Carrinho (Limitado a 5) */}
            {cartItems.slice(0, 5).map((item) => ( 
              <DropdownMenuItem key={item.id} className="flex justify-between items-center cursor-default h-auto py-2">
                <div className="flex flex-col">
                    <span className="font-medium truncate max-w-[150px]">{item.description}</span>
                    <span className="text-xs text-gray-500">{formatCurrency(item.unitPrice)}/un</span>
                </div>
                <span className="ml-2 text-sm font-semibold text-gray-800">
                  {item.quantity} x
                </span>
              </DropdownMenuItem>
            ))}

            {cartItems.length > 5 && (
                 <DropdownMenuItem className="text-center text-xs text-gray-500 justify-center cursor-default">
                    ...e mais {cartItems.length - 5} item(s)
                </DropdownMenuItem>
            )}

            <DropdownMenuSeparator />
            
            <div className="flex justify-between items-center px-2 py-1 text-sm font-bold">
                <span>Total ({totalItems} itens):</span>
                {/* Usa totalValue do contexto */}
                <span>{formatCurrency(totalValue)}</span> 
            </div>

            <DropdownMenuSeparator />

            {/* Link para a página completa do carrinho */}
            <DropdownMenuItem asChild className="cursor-pointer bg-red-600 hover:bg-red-700 text-white font-bold justify-center">
              <Link href="/cart">
                Ver Carrinho Completo ({totalItems})
              </Link>
            </DropdownMenuItem>
          </>
        ) : (
          <DropdownMenuItem className="text-gray-500 justify-center cursor-default">
            Carrinho Vazio
          </DropdownMenuItem>
        )}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}