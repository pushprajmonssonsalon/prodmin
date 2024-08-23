const Pagination = ({ totalItems, itemsPerPage, currentPage, onPageChange }) => {
  const totalPages = Math.ceil(totalItems / itemsPerPage);
  const generatePageNumbers = () => {
    
    const pageNumbers = [];
    const maxPageNumbersToDisplay = 5; // Adjust as needed
    let start = Math.max(1, currentPage - Math.floor(maxPageNumbersToDisplay / 2));
    let end = Math.min(totalPages, currentPage + Math.floor(maxPageNumbersToDisplay / 2));
  
    // If total pages are less than maxPageNumbersToDisplay
    if (totalPages <= maxPageNumbersToDisplay) {
      start = 1;
      end = totalPages;
    } else {
      if (start === 1) {
        end = maxPageNumbersToDisplay;
      }
      if (end === totalPages) {
        start = totalPages - maxPageNumbersToDisplay + 1;
      }
    }
  
    for (let i = start; i <= end; i++) {
      pageNumbers.push(i);
    }
  
    if (start > 1) {
      pageNumbers.unshift('...');
      pageNumbers.unshift(1);
    }
    if (end < totalPages) {
      pageNumbers.push('...');
      pageNumbers.push(totalPages);
    }
  
    return pageNumbers;
  };
  
  // Example usage
  console.log(generatePageNumbers());
  // Output: [1, "...", 4, 5, 6, "...", 
  
  
  

  return (
    <nav
    className="w-[95%] mx-auto flex items-center flex-column flex-wrap md:flex-row justify-between pt-4"
    aria-label="Table navigation"
  >
    <span className="text-sm font-normal text-gray-500  mb-4 md:mb-0 block w-full md:inline md:w-auto">
      Showing{" "}
      <span className="font-semibold text-gray-900 ">
        {/* Replace with your actual item calculations */}
        {(currentPage - 1) * itemsPerPage + 1}-
        {Math.min(currentPage * itemsPerPage, totalItems)}
      </span>{" "}
      of{" "}
      <span className="font-semibold text-gray-900 ">
      {totalItems}
      </span>
    </span>
    <ul className="inline-flex -space-x-px rtl:space-x-reverse text-sm h-8">
      <li>
        <button
          onClick={() => onPageChange(currentPage - 1)}
          disabled={currentPage === 1}
          className="flex items-center justify-center px-3 h-8 ms-0 leading-tight text-gray-500 bg-white border border-gray-300 rounded-s-lg hover:bg-gray-100 hover:text-gray-700 "
        >
          Previous
        </button>
      </li>
      {totalItems >0&& generatePageNumbers().map((page, index) => (
        <li key={index}>
          {page === "..." ? (
            <span className="flex items-center justify-center px-3 h-8 leading-tight text-gray-500 bg-white border border-gray-300  ">
              ...
            </span>
          ) : (
            <button
              onClick={() => onPageChange(page)}
              className={`flex items-center justify-center px-3 h-8 leading-tight ${
                page === currentPage
                  ? "text-blue-600 border border-gray-300 bg-blue-50 hover:bg-blue-100 hover:text-blue-700  "
                  : "text-gray-500 bg-white border border-gray-300 hover:bg-gray-100 hover:text-gray-700 "
              }`}
            >
              {page}
            </button>
          )}
        </li>
      ))}
      <li>
        <button
          onClick={() => onPageChange(currentPage + 1)}
          disabled={currentPage === totalPages}
          className="flex items-center justify-center px-3 h-8 leading-tight text-gray-500 bg-white border border-gray-300 rounded-e-lg hover:bg-gray-100 hover:text-gray-700 "
        >
          Next
        </button>
      </li>
    </ul>
  </nav>
  );
};

export default Pagination;
