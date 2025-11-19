import { Item } from "./item.interface";

export interface CartItem extends Item {
  quantity: number;
}

export interface CartContextType {
  cart: CartItem[];
  addToCart: (item: Item, quantity: number) => void;
  removeFromCart: (itemId: number) => void;
  updateQuantity: (itemId: number, quantity: number) => void;
  clearCart: () => void;
}
