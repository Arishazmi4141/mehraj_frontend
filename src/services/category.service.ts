// src/services/category.service.ts
import { requestAPI } from "@/src/lib/api-client";

export interface Category {
  id: number;
  name: string;
  description?: string;
  imageUrl?: string;
}

export const categoryService = {
  getCategories: async (): Promise<Category[]> => {
    try {
      return await requestAPI<Category[]>("/categories/getAllCategories");
    } catch (err) {
      console.error("Category fetch failed", err);
      return [];
    }
  },
};