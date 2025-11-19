"use server";
import { Item } from "@/models/item.interface";
import { Category } from "@/models/category.interface";
import api from "@/lib/api";

export interface CreateItemPayload {
  name: string;
  description: string;
  price: number;
  categoryId: number;
}

export const createItem = async (payload: CreateItemPayload): Promise<Item> => {
  const response = await api.post<Item>("/items", payload);
  return response.data;
};

export const getCategories = async (): Promise<Category[]> => {
  const response = await api.get<Category[]>("/categories");
  return response.data;
};
