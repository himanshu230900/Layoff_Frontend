import { useState, useMemo } from 'react';

interface PaginationOptions {
  initialPage?: number;
  initialPageSize?: number;
  totalItems?: number;
}

interface UsePaginationReturn {
  currentPage: number;
  pageSize: number;
  totalPages: number;
  hasNextPage: boolean;
  hasPreviousPage: boolean;
  startIndex: number;
  endIndex: number;
  goToPage: (page: number) => void;
  nextPage: () => void;
  previousPage: () => void;
  setPageSize: (size: number) => void;
  setTotalItems: (total: number) => void;
}

function usePagination(options: PaginationOptions = {}): UsePaginationReturn {
  const {
    initialPage = 1,
    initialPageSize = 10,
    totalItems: initialTotalItems = 0,
  } = options;

  const [currentPage, setCurrentPage] = useState(initialPage);
  const [pageSize, setPageSize] = useState(initialPageSize);
  const [totalItems, setTotalItems] = useState(initialTotalItems);

  const paginationData = useMemo(() => {
    const totalPages = Math.ceil(totalItems / pageSize);
    const hasNextPage = currentPage < totalPages;
    const hasPreviousPage = currentPage > 1;
    const startIndex = (currentPage - 1) * pageSize;
    const endIndex = Math.min(startIndex + pageSize, totalItems);

    return {
      totalPages,
      hasNextPage,
      hasPreviousPage,
      startIndex,
      endIndex,
    };
  }, [currentPage, pageSize, totalItems]);

  const goToPage = (page: number) => {
    const maxPage = Math.ceil(totalItems / pageSize);
    if (page >= 1 && page <= maxPage) {
      setCurrentPage(page);
    }
  };

  const nextPage = () => {
    if (paginationData.hasNextPage) {
      setCurrentPage(prev => prev + 1);
    }
  };

  const previousPage = () => {
    if (paginationData.hasPreviousPage) {
      setCurrentPage(prev => prev - 1);
    }
  };

  const handleSetPageSize = (size: number) => {
    setPageSize(size);
    setCurrentPage(1); // Reset to first page when changing page size
  };

  return {
    currentPage,
    pageSize,
    totalPages: paginationData.totalPages,
    hasNextPage: paginationData.hasNextPage,
    hasPreviousPage: paginationData.hasPreviousPage,
    startIndex: paginationData.startIndex,
    endIndex: paginationData.endIndex,
    goToPage,
    nextPage,
    previousPage,
    setPageSize: handleSetPageSize,
    setTotalItems,
  };
}

export default usePagination; 