"use server";
import api from "@/lib/api";
import { Category } from "@/models/category.interface";

export const createCategory = async (description: string): Promise<Category> => {
  const response = await api.post<Category>("/category", { description });
  console.log(response.data);
  return response.data;
};
