"use server";
import api from "@/lib/api";
import { CartApiResponse } from "@/models/cart.interface";

export async function getCartData(): Promise<CartApiResponse | null> {
  try {
    const response = await api.get<CartApiResponse>("/cart");
    return response.data;
  } catch (error) {
    console.error("Erro ao buscar dados do carrinho:", error);
    return null;
  }
}

export async function changeItemQuantityApi(itemId: number, quantity: number) {
  await api.post("/cart/change-quantity", { itemId, quantity });
}

export async function addItemToCart(itemId: number) {
  const response = await api.post(`/cart/add-item/${itemId}`);
  return response.data;
}

export async function toPaymentCartApi(orderId: number): Promise<any> {
  const response = await api.post(`/cart/to-payment/${orderId}`);
  return response.data;
}

export async function completeOrderApi(orderId: number): Promise<any> {
  const response = await api.post(`/cart/complete-order/${orderId}`);
  return response.data;
}

export async function cancelOrderApi(orderId: number): Promise<any> {
  const response = await api.post(`/cart/cancel-order/${orderId}`);
  return response.data;
}

export async function getFinalizedOrders() {
  const response = await api.get("/cart/finalized-orders");
  return response.data;
}
