// hooks/usePagination.ts
import { useMemo } from 'react';

export interface PaginationConfig {
  currentPage: number;
  pageSize: number;
  totalItems: number;
}

export const usePagination = <T>(data: T[], config: PaginationConfig) => {
  const { currentPage, pageSize, totalItems } = config;

  const paginationData = useMemo(() => {
    const totalPages = Math.ceil(totalItems / pageSize);
    const startIndex = (currentPage - 1) * pageSize;
    const endIndex = startIndex + pageSize;
    const currentData = data.slice(startIndex, endIndex);

    const hasNextPage = currentPage < totalPages;
    const hasPrevPage = currentPage > 1;

    return {
      currentData,
      totalPages,
      startIndex,
      endIndex: Math.min(endIndex, totalItems),
      hasNextPage,
      hasPrevPage,
      totalItems
    };
  }, [data, currentPage, pageSize, totalItems]);

  return paginationData;
};
