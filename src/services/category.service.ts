"use server";
import api from "@/lib/api";
import { Category } from "@/models/category.interface";

export const createCategory = async (name: string): Promise<Category> => {
  const response = await api.post<Category>("/categories", { name });
  return response.data;
};
