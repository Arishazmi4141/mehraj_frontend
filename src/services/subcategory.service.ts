import { requestAPI } from "@/src/lib/api-client";
import { SubCategory } from "@/src/types/product";

export const subCategoryService = {
  getAllSubCategories: async (): Promise<SubCategory[]> => {
    try {
      return await requestAPI<SubCategory[]>("/subcategories/getAllSubCategories");
    } catch (err) {
      console.error("SubCategory fetch failed", err);
      return [];
    }
  },

  getSubCategoriesByCategory: async (categoryId: number): Promise<SubCategory[]> => {
    try {
      return await requestAPI<SubCategory[]>(`/subcategories/byCategory/${categoryId}`);
    } catch (err) {
      console.error("SubCategory by category fetch failed", err);
      return [];
    }
  },
};