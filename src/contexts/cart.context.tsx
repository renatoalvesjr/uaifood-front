// src/contexts/cart.context.tsx

"use client";

import React, {
  createContext,
  useContext,
  useState,
  ReactNode,
  useEffect,
} from "react";
import { Item } from "@/models/item.interface";
import { CartItem, CartContextType } from "@/models/cart.interface";

const CartContext = createContext<CartContextType | undefined>(undefined);
const CART_STORAGE_KEY = "uaifood-cart";

export function useCart() {
  const context = useContext(CartContext);
  if (context === undefined) {
    throw new Error(
      "useCart must be used within a CartProvider. Did you forget to wrap your component in <CartProvider>?"
    );
  }
  return context;
}

interface CartProviderProps {
  children: ReactNode;
}

export const CartProvider: React.FC<CartProviderProps> = ({ children }) => {
  const [cart, setCart] = useState<CartItem[]>([]);
  const [isClient, setIsClient] = useState(false); // Novo estado para controlar a montagem no cliente

  // Efeito 1: Carrega o carrinho do localStorage (roda apenas no cliente)
  useEffect(() => {
    setIsClient(true);
    if (typeof window !== "undefined") {
      const storedCart = localStorage.getItem(CART_STORAGE_KEY);
      if (storedCart) {
        try {
          setCart(JSON.parse(storedCart) as CartItem[]);
        } catch (e) {
          console.error("Failed to parse cart from localStorage:", e);
          localStorage.removeItem(CART_STORAGE_KEY);
          setCart([]);
        }
      }
    }
  }, []);

  // Efeito 2: Salva o carrinho no localStorage sempre que o estado 'cart' mudar (e estiver no cliente)
  useEffect(() => {
    if (isClient && typeof window !== "undefined") {
      if (cart.length > 0) {
        localStorage.setItem(CART_STORAGE_KEY, JSON.stringify(cart));
      } else {
        localStorage.removeItem(CART_STORAGE_KEY);
      }
    }
  }, [cart, isClient]);

  const addToCart = (item: Item, quantity: number) => {
    setCart((currentCart) => {
      const existingItem = currentCart.find((ci) => ci.id === item.id);

      if (existingItem) {
        return currentCart.map((ci) =>
          ci.id === item.id ? { ...ci, quantity: ci.quantity + quantity } : ci
        );
      } else {
        const newCartItem: CartItem = {
          ...item,
          quantity: Math.max(1, quantity),
        };
        return [...currentCart, newCartItem];
      }
    });
  };

  const removeFromCart = (itemId: number) => {
    setCart((currentCart) => currentCart.filter((ci) => ci.id !== itemId));
  };

  const updateQuantity = (itemId: number, quantity: number) => {
    setCart((currentCart) =>
      currentCart.map((ci) =>
        ci.id === itemId ? { ...ci, quantity: Math.max(1, quantity) } : ci
      )
    );
  };

  const clearCart = () => {
    setCart([]);
  };

  const contextValue: CartContextType = {
    cart,
    addToCart,
    removeFromCart,
    updateQuantity,
    clearCart,
  };

  return (
    <CartContext.Provider value={contextValue}>{children}</CartContext.Provider>
  );
};
