// src/types/magazine.ts

// NOTE: exact MagazineRequest/Magazine fields weren't given beyond the
// controller signature, so this assumes a reasonable shape — adjust if
// your actual DTO/entity differs.

export interface MagazineRequest {
  title: string;
  year: number;
}


export interface Magazine {
  id: number;
  title: string;
  year: number;
  pdfUrl: string;
  createdAt: string;
  dtOfOps?: number;
  deleted?: boolean;
}

export interface PageableInfo {
  pageNumber: number;
  pageSize: number;
  offset: number;
  paged: boolean;
  unpaged: boolean;
}


export interface SortInfo {
  empty: boolean;
  sorted: boolean;
  unsorted: boolean;
}

export interface MagazinePage {
  content: Magazine[];
  pageable: PageableInfo;
  last: boolean;
  totalPages: number;
  totalElements: number;
  size: number;
  number: number;
  first: boolean;
  numberOfElements: number;
  sort: SortInfo;
  empty: boolean;
}