import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { dateFilters } from "../../services/utils/roles";
import { FaFileExcel } from "react-icons/fa";
const TableComponent = ({ rows, loading, cols, exportoExcel, currentPage, handleSubmit, totalItems, setCurrentPage, itemsPerPage, setItemsPerPage, selectedFilter, handleFilterChange, setDropdownOpen, isDropdownOpen, startDate, endDate, handleDateChange }) => {
    const totalPages = Math.ceil(totalItems / itemsPerPage);

    // Function to generate page numbers for pagination
    const generatePageNumbers = () => {
        let startPage = Math.max(1, currentPage - 2); // Start at currentPage - 2
        let endPage = Math.min(totalPages, currentPage + 2); // End at currentPage + 2

        // Adjust the range if we're near the beginning or end
        if (currentPage <= 3) {
            endPage = Math.min(5, totalPages);
        }
        if (currentPage >= totalPages - 2) {
            startPage = Math.max(totalPages - 4, 1);
        }

        let pages = [];
        for (let i = startPage; i <= endPage; i++) {
            pages.push(i);
        }

        return pages;
    };

    // Handle page click
    const handlePageClick = (page) => {
        setCurrentPage(page);
    };

    // Handle next page click
    const handleNextClick = () => {
        if (currentPage < totalPages) {
            setCurrentPage(currentPage + 1);
        }
    };


    // Handle previous page click
    const handlePrevClick = () => {
        if (currentPage > 1) {
            setCurrentPage(currentPage - 1);
        }
    };

    // Handle items per page change
    const handleItemsPerPageChange = (event) => {
        setItemsPerPage(Number(event.target.value));
        setCurrentPage(1); // Reset to the first page when items per page change
    };


    const pageNumbers = generatePageNumbers();
    return (
        <>
            <div className=" w-full   ">
                <div className="pb-5 relative w-full">
                    <div className="flex flex-col gap-y-5 md:flex-row justify-between">
                        <button
                            id="dropdownRadioButton"
                            onClick={() => setDropdownOpen(!isDropdownOpen)}
                            className="inline-flex min-w-[200px] items-center text-gray-500 bg-white border border-gray-300 focus:outline-none hover:bg-gray-100 focus:ring-4 focus:ring-gray-100 font-medium rounded-lg text-sm px-3 py-1.5"
                            type="button"
                        >
                            <svg
                                className="w-3 h-3 text-gray-500 me-3"
                                aria-hidden="true"
                                xmlns="http://www.w3.org/2000/svg"
                                fill="currentColor"
                                viewBox="0 0 20 20"
                            >
                                <path d="M10 0a10 10 0 1 0 10 10A10.011 10.011 0 0 0 10 0Zm3.982 13.982a1 1 0 0 1-1.414 0l-3.274-3.274A1.012 1.012 0 0 1 9 10V6a1 1 0 0 1 2 0v3.586l2.982 2.982a1 1 0 0 1 0 1.414Z" />
                            </svg>
                            {selectedFilter}
                            <svg
                                className="w-2.5 h-2.5 ml-auto"
                                aria-hidden="true"
                                xmlns="http://www.w3.org/2000/svg"
                                fill="none"
                                viewBox="0 0 10 6"
                            >
                                <path
                                    stroke="currentColor"
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth={2}
                                    d="m1 1 4 4 4-4"
                                />
                            </svg>
                        </button>
                        <button onClick={exportoExcel} className="text-md font-medium mb-4 md:mb-0 px-6 ml-auto text-white bg-green-600 rounded-md  flex gap-1 items-center py-2"><span>Export</span><span><FaFileExcel /></span>
                        </button>
                    </div>
                    {/* Dropdown menu */}
                    {isDropdownOpen && (
                        <div
                            id="dropdownRadio"
                            className="z-10 w-48 bg-white divide-y divide-gray-100 rounded-lg shadow absolute mt-2"
                        >
                            <ul className="p-3 space-y-1 text-sm text-gray-700">
                                {Object.values(dateFilters).map(
                                    (filter) => (
                                        <li key={filter}>
                                            <div
                                                className="flex items-center p-2 rounded hover:bg-gray-100 cursor-pointer"
                                                onClick={() => handleFilterChange(filter)}
                                            >
                                                <input
                                                    id={`filter-radio-${filter}`}
                                                    type="radio"
                                                    name="filter-radio"
                                                    className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 focus:ring-2"
                                                    checked={selectedFilter === filter}
                                                    readOnly
                                                />
                                                <label
                                                    htmlFor={`filter-radio-${filter}`}
                                                    className="w-full ms-2 text-sm font-medium text-gray-900"
                                                >
                                                    {filter}
                                                </label>
                                            </div>
                                        </li>
                                    )
                                )}
                            </ul>
                        </div>
                    )}

                    <form onSubmit={handleSubmit} className="flex mt-3 flex-col md:flex-row items-center gap-5 justify-center w-full">
                        <div className=" flex items-center flex-col ">
                            <label className="font-medium text-md text-gray-800 mb-2">Start Date</label>

                            <DatePicker
                                selectsStart
                                selected={startDate}
                                onChange={handleDateChange("startDate")}
                                startDate={startDate}
                                className="w-full border border-gray-300 focus:outline-none hover:bg-gray-100 focus:ring-4 focus:ring-gray-100 font-medium rounded-lg text-sm px-3 py-1.5"
                            />
                        </div>

                        <div className=" flex items-center flex-col">
                            <label className="font-medium text-md text-gray-800 mb-2">End Date</label>
                            <DatePicker
                                selectsEnd
                                selected={endDate}
                                onChange={handleDateChange("endDate")}
                                endDate={endDate}
                                startDate={startDate}
                                minDate={startDate}
                                className=" border border-gray-300 focus:outline-none hover:bg-gray-100 focus:ring-4 focus:ring-gray-100 font-medium rounded-lg text-sm px-3 py-1.5"
                            />
                        </div>
                        <button type="submit" disabled={loading} className="bg-black w-[150px] flex items-center justify-center h-[35px] md:w-[100px] mt-auto text-white focus:outline-none  focus:ring-4 focus:ring-gray-100 font-medium rounded-lg text-sm px-3 py-1.5">{loading ? <>
                            <div className="flex flex-row gap-2">
                                <div className="w-2 h-2 rounded-full bg-white animate-bounce" />
                                <div className="w-2 h-2 rounded-full bg-white animate-bounce [animation-delay:-.3s]" />
                                <div className="w-2 h-2 rounded-full bg-white animate-bounce [animation-delay:-.5s]" />
                            </div>
                        </>
                            : "Submit"}</button>
                    </form>
                </div>

                {loading ?



                    <div role="status" className="w-full animate-pulse">
                        <div className="h-10 bg-gray-300/80 border-b mx-auto"></div>
                        {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((elm) => {
                            return (
                                <div className="h-10 mx-auto mb-[1px] bg-gray-200 "></div>
                            )
                        })}

                        <span className="sr-only">Loading...</span>
                    </div>
                    :


                    <>

                        <div className="w-[calc(100vw-60px)] md:w-[calc(100vw-90px)] overflow-x-auto mx-auto ">


                            <table className="w-full border  mx-auto text-sm text-left rtl:text-right text-gray-500 ">
                                <thead className="text-xs sticky top-0  text-gray-700 uppercase bg-gray-200  ">
                                    <tr className="">

                                        {cols?.map((col, index) => (
                                            <th key={index} scope="col" className="px-2 py-3">
                                                {col?.name}
                                            </th>
                                        ))}
                                    </tr>
                                </thead>
                                <tbody className="">
                                    {rows?.map((row, index) => {
                                        return (
                                            <tr
                                                key={index}
                                                className="bg-white border-b   hover:bg-gray-50 "
                                            >
                                            
                                                {cols?.map((col, i) => {
                                                    const value = row[col?.id];

                                                    return (
                                                        <td className="px-2 py-4 max-w-[200px] break-words whitespace-normal">
                                                            {value}
                                                        </td>

                                                    );
                                                })}


                                            </tr>
                                        );
                                    })}
                                </tbody>
                            </table>
                        </div>


                        {/* Pagination Controls */}
                        <nav className="flex items-center flex-col gap-3 md:flex-row w-full pt-3  justify-between " aria-label="Table navigation">
                            <div className="flex w-full flex-col md:flex-row md:w-auto items-center md:gap-6">
                                <span className="text-sm font-normal text-gray-500 mb-4 md:mb-0 block w-full md:inline md:w-auto">
                                    Showing <span className="font-semibold text-gray-900">{(currentPage - 1) * itemsPerPage + 1}</span> to{" "}
                                    <span className="font-semibold text-gray-900">
                                        {Math.min(currentPage * itemsPerPage, totalItems)}
                                    </span>{" "}
                                    of <span className="font-semibold text-gray-900">{totalItems}</span>
                                </span>
                                <div className="flex items-center justify-center">
                                    <label htmlFor="items-per-page" className="text-sm whitespace-nowrap font-normal text-gray-500">
                                        Items per page:
                                    </label>
                                    <select
                                        id="items-per-page"
                                        value={itemsPerPage}
                                        onChange={handleItemsPerPageChange}
                                        className="ml-2 px-2 bg-white border outline-none  border-gray-300 rounded-md"
                                    >
                                        <option value={10}>10</option>
                                        <option value={20}>20</option>
                                        <option value={30}>30</option>
                                        <option value={50}>50</option>
                                    </select>
                                </div>
                            </div>
                            <ul className="flex -space-x-px rtl:space-x-reverse text-sm h-8">
                                <li>
                                    <a
                                        href="#"
                                        onClick={handlePrevClick}
                                        className="flex items-center justify-center px-3 h-8 ms-0 leading-tight text-gray-500 bg-white border border-gray-300 rounded-s-lg hover:bg-gray-100 hover:text-gray-700"
                                    >
                                        Previous
                                    </a>
                                </li>

                                {/* Display page numbers */}
                                {pageNumbers.map((page) => (
                                    <li key={page}>
                                        <a
                                            href="#"
                                            onClick={() => handlePageClick(page)}
                                            className={`flex items-center justify-center px-3 h-8 leading-tight ${page === currentPage
                                                ? "text-blue-600 bg-blue-50 border border-gray-300"
                                                : "text-gray-500 bg-white border border-gray-300 hover:bg-gray-100 hover:text-gray-700"
                                                }`}
                                        >
                                            {page}
                                        </a>
                                    </li>
                                ))}

                                <li>
                                    <a
                                        href="#"
                                        onClick={handleNextClick}
                                        className="flex items-center justify-center px-3 h-8 leading-tight text-gray-500 bg-white border border-gray-300 rounded-e-lg hover:bg-gray-100 hover:text-gray-700"
                                    >
                                        Next
                                    </a>
                                </li>
                            </ul>
                        </nav>

                    </>
                }
            </div>

        </>
    )
}

export default TableComponent