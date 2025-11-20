// src/models/cart.interface.ts

import { Item } from "./item.interface";

export interface CartApiResponse {
    items: CartItemApi[];
    total: number;

}
export interface CartItemApi {
    id: number; 
    orderId: number;
    itemId: number;
    quantity: number;
    item: Item;
    createdAt: string;
    updatedAt: string;
}

export interface CartItem extends Item {
  orderItemId: number;
  orderId: number; 
  quantity: number;
}

export interface CartContextType {
  cart: CartItem[];
  orderId: number | null;
  totalValue: number;
  isLoading: boolean;
  addToCart: (item: Item, quantity: number) => Promise<void>;
  removeFromCart: (itemId: number) => Promise<void>;
  updateQuantity: (itemId: number, quantity: number) => Promise<void>;
  clearCart: () => Promise<void>;
  toPaymentCart: (orderId: number) => Promise<any>;
  completeOrder: (orderId: number) => Promise<any>;
  cancelOrder: (orderId: number) => Promise<any>;
}