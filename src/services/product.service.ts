// src/lib/services/product.service.ts
import { requestAPI } from '../lib/api-client';
import { Product, ProductPage, ProductFilterParams } from '@/src/types/product';

export const productService = {
  // 1. Trending Services & hardware assets
  getTrendingProducts: (): Promise<Product[]> => {
    return requestAPI<Product[]>('/product/trending');
  },

  // 2. Recent arrivals
  getRecentProducts: (): Promise<Product[]> => {
    return requestAPI<Product[]>('/product/latest');
  },

  // 3. Dynamic search matrices & filters
  filterProducts: (filters: ProductFilterParams = {}): Promise<ProductPage> => {
    const query = new URLSearchParams();
    if (filters.keyword?.trim()) query.set('keyword', filters.keyword.trim());
    if (filters.category?.trim()) query.set('category', filters.category.trim());
    if (filters.minPrice != null) query.set('minPrice', filters.minPrice.toString());
    if (filters.maxPrice != null) query.set('maxPrice', filters.maxPrice.toString());
    query.set('page', (filters.page ?? 0).toString());
    query.set('size', (filters.size ?? 10).toString());

    return requestAPI<ProductPage>(`/product/getallproducts?${query.toString()}`);
  },

  // 4. Detailed operations view
  getProductById: (id: number): Promise<Product> => {
    return requestAPI<Product>(`/product/getProductById/${id}`);
  },

  // 5. Related categories items mapping
  getProductsByCategory: (categoryId: number): Promise<Product[]> => {
    return requestAPI<Product[]>(`/product/by-category/${categoryId}`);
  },

  // 6. Review submissions
  submitReview: (payload: {
    productId: number;
    reviewerName: string;
    reviewMsg: string;
    rating: number;
  }): Promise<string> => {
    return requestAPI<string>('/review/post-review', {
      method: 'POST',
      body: JSON.stringify(payload)
    }, true);
  }
};