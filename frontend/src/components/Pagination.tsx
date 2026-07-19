import type { PaginationMeta } from '../types';

interface PaginationProps {
  meta: PaginationMeta;
  onPageChange: (page: number) => void;
}

const Pagination = ({ meta, onPageChange }: PaginationProps) => {
  return (
    <div className="flex flex-col gap-3 border-t border-gray-200 px-4 py-3 dark:border-gray-700 sm:flex-row sm:items-center sm:justify-between">
      <p className="text-center text-sm text-gray-600 dark:text-gray-400 sm:text-left">
        <span className="hidden xs:inline">Page </span>
        {meta.page} of {meta.totalPages} <span className="hidden xs:inline">·</span>
        <span className="block xs:inline xs:ml-1">
          {meta.total} employee{meta.total !== 1 ? 's' : ''}
        </span>
      </p>
      <div className="flex justify-center gap-2 sm:justify-end">
        <button
          onClick={() => onPageChange(meta.page - 1)}
          disabled={!meta.hasPrevPage}
          className="min-h-[44px] min-w-[44px] rounded-md border border-gray-300 px-3 py-2 text-sm text-gray-700 transition hover:bg-gray-50 disabled:cursor-not-allowed disabled:opacity-40 dark:border-gray-600 dark:text-gray-200 dark:hover:bg-gray-700 sm:min-h-[auto] sm:min-w-[auto] sm:px-3 sm:py-1"
          aria-label="Previous page"
        >
          <span className="hidden sm:inline">Previous</span>
          <span className="sm:hidden">←</span>
        </button>
        <button
          onClick={() => onPageChange(meta.page + 1)}
          disabled={!meta.hasNextPage}
          className="min-h-[44px] min-w-[44px] rounded-md border border-gray-300 px-3 py-2 text-sm text-gray-700 transition hover:bg-gray-50 disabled:cursor-not-allowed disabled:opacity-40 dark:border-gray-600 dark:text-gray-200 dark:hover:bg-gray-700 sm:min-h-[auto] sm:min-w-[auto] sm:px-3 sm:py-1"
          aria-label="Next page"
        >
          <span className="hidden sm:inline">Next</span>
          <span className="sm:hidden">→</span>
        </button>
      </div>
    </div>
  );
};

export default Pagination;