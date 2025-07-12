const Pagination = ({ currentPage, totalPages, onPageChange }) => {
  const generatePages = () => {
    const pages = [];
    const visiblePages = 5;

    const start = Math.max(1, currentPage - 2);
    const end = Math.min(totalPages, start + visiblePages - 1);

    for (let i = start; i <= end; i++) {
      pages.push(i);
    }

    return pages;
  };

  return (
    <div className="flex items-center gap-2 mt-6">
      {/* Previous */}
      <button
        onClick={() => onPageChange(currentPage - 1)}
        disabled={currentPage === 1}
        className="px-2 py-1 text-gray-500 disabled:text-gray-300"
      >
        &lsaquo;
      </button>

      {/* Page Numbers */}
      {generatePages().map((page) => (
        <button
          key={page}
          onClick={() => onPageChange(page)}
          className={`w-8 h-8 rounded-full text-sm font-medium ${
            page === currentPage
              ? "bg-orange-500 text-white"
              : "text-gray-700 hover:bg-gray-200"
          }`}
        >
          {page}
        </button>
      ))}

      {/* Next */}
      <button
        onClick={() => onPageChange(currentPage + 1)}
        disabled={currentPage === totalPages}
        className="px-2 py-1 text-gray-500 disabled:text-gray-300"
      >
        &rsaquo;
      </button>
    </div>
  );
};
