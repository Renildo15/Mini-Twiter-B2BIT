'use client';
interface PaginationProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
}

export default function Pagination({ currentPage, totalPages, onPageChange }: PaginationProps) {
  const goToNextPage = () => {
    if (currentPage < totalPages) {
      onPageChange(currentPage + 1);
    }
  };

  const goToPrevPage = () => {
    if (currentPage > 1) {
      onPageChange(currentPage - 1);
    }
  };

  if (totalPages <= 1) return null;

  const getPageNumbers = () => {
    const delta = 2;
    const range = [];
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const rangeWithDots: any[] = [];
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    let l: any;

    for (let i = 1; i <= totalPages; i++) {
      if (i === 1 || i === totalPages || (i >= currentPage - delta && i <= currentPage + delta)) {
        range.push(i);
      }
    }

    range.forEach((i) => {
      if (l) {
        if (i - l === 2) {
          rangeWithDots.push(l + 1);
        } else if (i - l !== 1) {
          rangeWithDots.push('ellipsis');
        }
      }
      rangeWithDots.push(i);
      l = i;
    });

    return rangeWithDots;
  };

  const pageNumbers = getPageNumbers();

  return (
    <div className="flex justify-center items-center gap-2">
      <button
        onClick={goToPrevPage}
        disabled={currentPage === 1}
        className="w-9 h-9 flex justify-center items-center disabled:opacity-30 disabled:cursor-not-allowed hover:opacity-70 transition-opacity cursor-pointer"
      >
        <svg width="7" height="10" viewBox="0 0 7 10" fill="none">
          <path d="M5 10L0 5L5 0L6.16667 1.16667L2.33333 5L6.16667 8.83333L5 10Z" fill="#6E767D" />
        </svg>
      </button>

      {pageNumbers.map((item, index) => {
        if (item === 'ellipsis') {
          return (
            <span
              key={`ellipsis-${index}`}
              className="w-9 h-9 flex items-center justify-center text-[#6E767D]"
            >
              ...
            </span>
          );
        }

        const page = item as number;
        const isActive = page === currentPage;

        return (
          <button
            key={`page-${page}`}
            onClick={() => onPageChange(page)}
            className={`
                          w-9 h-9 rounded-full flex items-center justify-center cursor-pointer
                          transition-all duration-200
                          ${
                            isActive
                              ? 'bg-[#0D93F2] text-white shadow-[0_6px_14px_rgba(13,147,242,0.45)]'
                              : 'bg-transparent text-[#62748E] hover:bg-[#E2E8F0]'
                          }
                      `}
          >
            {page}
          </button>
        );
      })}

      <button
        onClick={goToNextPage}
        disabled={currentPage === totalPages}
        className="cursor-pointer w-9 h-9 flex justify-center items-center disabled:opacity-30 disabled:cursor-not-allowed hover:opacity-70 transition-opacity"
      >
        <svg width="7" height="10" viewBox="0 0 7 10" fill="none">
          <path
            d="M3.83333 5L0 1.16667L1.16667 0L6.16667 5L1.16667 10L0 8.83333L3.83333 5Z"
            fill="#6E767D"
          />
        </svg>
      </button>
    </div>
  );
}
