export default function Pagination({
  startIndex,
  paginatedData,
  datas,
  handleItemsPerPageChange,
  itemsPerPage,
  handlePageChange,
  currentPage,
}) {
  return (
    <nav
      className="bg-white px-4 py-3 mt-4 flex items-center justify-between border-t border-gray-200 sm:px-6"
      aria-label="Pagination"
    >
      <div className="hidden sm:block">
        <p className="text-sm text-gray-700">
          Showing{" "}
          <span className="font-medium">
            {datas.length < 1 ? 0 : startIndex + 1}
          </span>{" "}
          to{" "}
          <span className="font-medium">
            {startIndex + paginatedData.length}
          </span>{" "}
          of <span className="font-medium">{datas.length}</span> results
        </p>
      </div>
      <div className="flex-1 flex justify-between sm:justify-end">
        <div className="flex items-center space-x-2 mr-7">
          <label htmlFor="limit" className="text-sm">
            Limit
          </label>
          <select
            id="limit"
            onChange={handleItemsPerPageChange}
            value={itemsPerPage}
            className="relative inline-flex items-center px-4 pr-9 py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white "
          >
            <option value={5}>5</option>
            <option value={10}>10</option>
            <option value={25}>25</option>
            <option value={50}>50</option>
          </select>
        </div>
        <button
          onClick={() => handlePageChange(currentPage - 1)}
          disabled={currentPage === 1}
          className={`relative inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md bg-white ${
            currentPage === 1
              ? "cursor-not-allowed text-gray-400"
              : "text-gray-700 hover:bg-gray-50"
          }`}
        >
          Previous
        </button>
        <button
          onClick={() => handlePageChange(currentPage + 1)}
          disabled={currentPage * itemsPerPage >= datas.length}
          className={`ml-3 relative inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md  bg-white ${
            currentPage * itemsPerPage >= datas.length
              ? "cursor-not-allowed text-gray-400"
              : "text-gray-700 hover:bg-gray-50"
          }`}
        >
          Next
        </button>
      </div>
    </nav>
  );
}
