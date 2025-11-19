import { Category } from "./category.interface";

export interface Item {
  id: number;
  description: string;
  unitPrice: number;
  categoryId: number;
  category: Category;
  createdAt: Date;
  updatedAt: Date;
}
