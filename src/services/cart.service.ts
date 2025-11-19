"use server";
import api from "@/lib/api";

export async function getCart() {
    console.log('Getting cart')
  return await api.get("/cart");
}
