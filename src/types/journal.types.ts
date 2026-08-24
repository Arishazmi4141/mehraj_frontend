// src/types/journal.types.ts
export interface JournalImage {
  id: number;
  imageUrl: string;
}

export interface Journal {
  id: number;
  title: string;
  content: string;
  createdAt: string;
  dtOfOps: number;
  deleted: boolean;
  journalImages: JournalImage[];
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

export interface JournalPage {
  content: Journal[];
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

// Matches backend's JournalRequest DTO — sent as the "journal" JSON part.
export interface JournalRequest {
  title: string;
  content: string;
}

// Payload used by the admin form.
export interface JournalPayload {
  title: string;
  content: string;
  images?: File[];
  // Only relevant on update — ids of existing journalImages to delete.
  deleteImageIds?: number[];
}