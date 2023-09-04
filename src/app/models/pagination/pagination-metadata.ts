import { Pagination } from './pagination';

export interface PaginationMetadata extends Pagination {
  totalPages: number;
  totalCount: number;
  hasPrevious: boolean;
  hasNext: boolean;
}
