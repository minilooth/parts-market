export interface Entity {
  id: number;
  createdAt: Date;
  updatedAt?: Date;
}

export interface Page<T> {
  content: Array<T>;
  pageable: Pageable;
  last: boolean;
  totalPages: number;
  totalElements: number;
  size: number;
  number: number;
  first: boolean;
  numberOfElements: number;
  empty: boolean;
}

export interface Pageable {
  page: number;
  size: number;
}