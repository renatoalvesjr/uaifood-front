// src/contexts/cart.context.tsx

"use client";

import React, {
  createContext,
  useContext,
  useState,
  ReactNode,
  useEffect,
  useCallback,
} from "react";
import { Item } from "@/models/item.interface";
import { CartItem, CartContextType } from "@/models/cart.interface";
import {
  getCartData,
  changeItemQuantityApi,
  addItemToCart,
  toPaymentCartApi,
  completeOrderApi,
  cancelOrderApi,
} from "@/services/cart.service";
import { useAuth } from "./auth.context";

const CartContext = createContext<CartContextType | undefined>(undefined);

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
  const [orderId, setOrderId] = useState<number | null>(null);
  const [totalValue, setTotalValue] = useState<number>(0);
  const [isLoading, setIsLoading] = useState(true);

  const { isAuthenticated } = useAuth();

  const syncCart = useCallback(async () => {
    if (!isAuthenticated) {
      setCart([]);
      setOrderId(null);
      setTotalValue(0);
      setIsLoading(false);
      return;
    }

    setIsLoading(true);
    try {
      const cartData = await getCartData();

      if (cartData && Array.isArray(cartData.items)) {
        setTotalValue(cartData.total || 0);

        if (cartData.items.length > 0) {
          const orderIdFromApi = cartData.items[0].orderId;
          setOrderId(orderIdFromApi);

          const frontEndCart: CartItem[] = cartData.items.map((apiItem) => ({
            ...apiItem.item,
            orderItemId: apiItem.id, // ID do OrderItem
            orderId: apiItem.orderId,
            quantity: apiItem.quantity,
            name:
              apiItem.item.description ||
              apiItem.item.description ||
              "Item sem nome",
          }));

          setCart(frontEndCart);
        } else {
          setCart([]);
          setOrderId(null);
        }
      } else {
        setCart([]);
        setOrderId(null);
        setTotalValue(0);
      }
    } catch (error) {
      console.error("Erro ao sincronizar carrinho:", error);
      setCart([]);
      setOrderId(null);
      setTotalValue(0);
    } finally {
      setIsLoading(false);
    }
  }, [isAuthenticated]);

  useEffect(() => {
    syncCart();
  }, [syncCart]);

  const addToCart = async (item: Item, quantity: number = 1) => {
    if (!isAuthenticated) return;
    await addItemToCart(item.id);
    await syncCart();
  };

  const removeFromCart = async (itemId: number) => {
    if (!isAuthenticated) return;
    await changeItemQuantityApi(itemId, 0);
    await syncCart();
  };

  const updateQuantity = async (itemId: number, quantity: number) => {
    if (!isAuthenticated || quantity < 0) return;
    await changeItemQuantityApi(itemId, quantity);
    await syncCart();
  };

  const clearCart = async () => {
    if (!isAuthenticated) return;
    await Promise.all(cart.map((item) => changeItemQuantityApi(item.id, 0)));
    await syncCart();
  };

  const toPaymentCart = async (currentOrderId: number): Promise<any> => {
    if (!isAuthenticated || !currentOrderId) return null;

    setIsLoading(true);
    try {
      const confirmedOrder = await toPaymentCartApi(currentOrderId);
      await syncCart();
      return confirmedOrder;
    } catch (error) {
      console.error("Erro na confirmação da compra:", error);
      return null;
    } finally {
      setIsLoading(false);
    }
  };

  const completeOrder = async (currentOrderId: number): Promise<any> => {
    if (!isAuthenticated || !currentOrderId) return null;

    setIsLoading(true);
    try {
      const updatedOrder = await completeOrderApi(currentOrderId);
      await syncCart();
      return updatedOrder;
    } catch (error) {
      console.error("Erro ao atualizar o status da compra:", error);
      return null;
    } finally {
      setIsLoading(false);
    }
  };

  const cancelOrder = async (currentOrderId: number): Promise<any> => {
    if (!isAuthenticated || !currentOrderId) return null;

    setIsLoading(true);
    try {
      const updatedOrder = await cancelOrderApi(currentOrderId);
      await syncCart();
      return updatedOrder;
    } catch (error) {
      console.error("Erro ao atualizar o status da compra:", error);
      return null;
    } finally {
      setIsLoading(false);
    }
  };

  const contextValue: CartContextType = {
    cart,
    orderId,
    totalValue,
    isLoading,
    addToCart,
    removeFromCart,
    updateQuantity,
    clearCart,
    toPaymentCart,
    completeOrder,
    cancelOrder,
  };

  return (
    <CartContext.Provider value={contextValue}>{children}</CartContext.Provider>
  );
};
