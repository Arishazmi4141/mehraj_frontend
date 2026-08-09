// src/components/types/product.ts

export interface ProductImage {
  id: number;
  imageUrl: string;
}

export interface Category {
  id: number;
  name: string;
  description?: string;
  imageUrl?: string;
}

export interface ProductVariant {
  id: number;
  size: string;
  price: number;
  stock: number;
}

export interface Product {
  id: number;
  name: string;
  description: string;
  isActive: boolean;
  trending: 'YES' | 'NO';
  createdAt: string;
  category: Category;
  productImages: ProductImage[];
  variants: ProductVariant[];
  image?: string[]; // Frontend computed array
}

export interface ProductPage {
  content: Product[];
  totalElements: number;
  totalPages: number;
  number: number;
  size: number;
  last?: boolean;
}

export interface ProductFilterParams {
  keyword?: string | null;
  category?: string | null;
  minPrice?: number | null;
  maxPrice?: number | null;
  page?: number;
  size?: number;
}

export interface CartItem {
  cartItemId: number;
  productId: number;
  variantId: number;
  productName: string;
  imageUrl: string;
  size: string;
  quantity: number;
  stockAvailable: number;
  currentPrice: number;
}