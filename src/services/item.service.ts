"use server";
import api from "@/lib/api";
import { Item } from "@/models/item.interface";
import { PaginationMeta } from "@/models/pagination-meta.interface";

interface PaginatedItems {
  data: Item[];
  meta: PaginationMeta;
}
const ITEM_ENDPOINT = "/item";

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
