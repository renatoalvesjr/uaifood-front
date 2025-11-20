"use server";
import { Item } from "@/models/item.interface";
import { Category } from "@/models/category.interface";
import api from "@/lib/api";
import { PaginationMeta } from "@/models/pagination-meta.interface";

export interface CreateItemPayload {
  description: string;
  unitPrice: number;
  categoryId: number;
}

interface PaginatedItems {
  data: Item[];
  meta: PaginationMeta;
}
const ITEM_ENDPOINT = "/item";


export const createItem = async (payload: CreateItemPayload): Promise<Item> => {
  const response = await api.post<Item>("/item", payload);
  return response.data;
};

export const getCategories = async (): Promise<Category[]> => {
  const response = await api.get<Category[]>("/category");
  console.log("Getting categories");
  console.log(response.data)
  return response.data;
};


export async function getItems(
  page: number = 1,
  limit: number = 20
): Promise<Item[]> {
  try {
    const response = await api.get<PaginatedItems>(
      `${ITEM_ENDPOINT}?page=${page}&limit=${limit}`
    );
    return response.data.data;
  } catch (error) {
    console.error("Error fetching items:", error);
    throw error;
  }
}