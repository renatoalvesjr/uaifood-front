
"use server";
import api from "@/lib/api";
import { Order } from "@/models/order.interface";

export async function getOrders(): Promise<Order[] | null> {
  try {
    const response = await api.get<Order[]>("/orders");
    return response.data;
  } catch (error) {
    console.error("Erro ao buscar dados do carrinho:", error);
    return null;
  }
}
