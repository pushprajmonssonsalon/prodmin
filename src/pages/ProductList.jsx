import React, { useEffect, useState, useRef } from "react";
import ReactPaginate from "react-paginate";
import Layout from "../components/Layout";
import TopBar from "../components/commoncomponents/TopBar";
import Wrapper from "../components/commoncomponents/Wrapper";
import { GET_PRODUCT_LIST } from "../services/pro/user.service";

const ProductList = () => {
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(true);
    const [currentPage, setCurrentPage] = useState(0);
    const [totalRows, setTotalRows] = useState(0);
    const [brand, setBrand] = useState("All");
    const [isActive, setIsActive] = useState("All");
    const [brandDropdownOpen, setBrandDropdownOpen] = useState(false);
    const [activeDropdownOpen, setActiveDropdownOpen] = useState(false);

    const brandRef = useRef(null);
    const activeRef = useRef(null);

    const rowsPerPage = 10;

    useEffect(() => {
        setLoading(true);

        let params = `?page=${currentPage + 1}&limit=${rowsPerPage}`;

        if (isActive !== "All") {
            params += `&isActive=${isActive}`;
        }

        if (brand && brand !== "All") {
            params += `&brand=${encodeURIComponent(brand)}`;
        }

        GET_PRODUCT_LIST(params)
            .then((res) => {
                setData(res?.data || []);
                setTotalRows(res?.total || 0);
            })
            .catch((err) => console.error("API Error:", err))
            .finally(() => setLoading(false));

    }, [currentPage, brand, isActive]);



    useEffect(() => {
        setCurrentPage(0);
    }, [brand, isActive]);

    useEffect(() => {
        const handleClickOutside = (event) => {
            if (brandRef.current && !brandRef.current.contains(event.target)) {
                setBrandDropdownOpen(false);
            }

            if (activeRef.current && !activeRef.current.contains(event.target)) {
                setActiveDropdownOpen(false);
            }
        };

        document.addEventListener("mousedown", handleClickOutside);

        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, []);


    const columns = data.length > 0
        ? [
            "skucode",
            ...Object.keys(data[0]).filter(
                (key) => key !== "_id" && key !== "skucode"
            ),
        ]
        : [];

    const pageCount = Math.ceil(totalRows / rowsPerPage);

    const handleExport = () => {
        if (data.length === 0) return;

        // const csvHeaders = columns.join(",") + "\n";
        // const csvRows = data
        //     .map(row =>
        //         columns.map(col => `"${row[col] ?? ""}"`).join(",")
        //     )
        //     .join("\n");

        // const blob = new Blob([csvHeaders + csvRows], {
        //     type: "text/csv;charset=utf-8;"
        // });

        // const link = document.createElement("a");
        // link.href = URL.createObjectURL(blob);
        // link.download = "products.csv";
        // link.click();
    };

    const handlePageChange = ({ selected }) => {
        setCurrentPage(selected);
    };

    return (
        <Layout>
            <TopBar title="Product List" />

            <Wrapper>
                {loading && (
                    <div className="h-[80vh] flex items-center justify-center text-gray-500">
                        Loading data...
                    </div>
                )}

                <div className="flex flex-wrap items-center justify-between gap-4 p-4 border-b">

                    <div className="flex flex-wrap items-center gap-4">

                        <div className="flex items-center gap-2 relative" ref={brandRef}>
                            <label className="text-sm font-medium text-gray-600">Brand</label>

                            <div className="relative w-[180px]">
                                <button
                                    onClick={() => {
                                        setBrandDropdownOpen(!brandDropdownOpen);
                                        setActiveDropdownOpen(false);
                                    }}
                                    className="w-full flex justify-between items-center border rounded-md px-3 py-2 text-sm bg-white hover:border-blue-500"
                                >
                                    <span className={`truncate ${!brand ? "text-gray-400" : ""}`}>
                                        {brand}
                                    </span>
                                    <svg
                                        className={`w-4 h-4 transition-transform duration-200 ${brandDropdownOpen ? "rotate-180" : ""}`}
                                        fill="none"
                                        stroke="currentColor"
                                        strokeWidth="2"
                                        viewBox="0 0 24 24"
                                    >
                                        <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
                                    </svg>
                                </button>

                                {brandDropdownOpen && (
                                    <div className="absolute left-0 right-0 mt-2 bg-white border rounded-md shadow-lg z-50 max-h-52 overflow-auto">
                                        {["All", "Spring H2O", "Loreal", "Skinconyc", "Argatin"].map((b) => (
                                            <div
                                                key={b}
                                                onClick={() => {
                                                    setBrand(b);
                                                    setBrandDropdownOpen(false);
                                                }}
                                                className={`px-4 py-2 text-sm cursor-pointer hover:bg-blue-50
                        ${brand === b ? "bg-blue-100 font-medium" : ""}`}
                                            >
                                                {b === "all" ? "All Brands" : b}
                                            </div>
                                        ))}
                                    </div>
                                )}
                            </div>
                        </div>

                        <div className="flex items-center gap-2 relative" ref={activeRef}>
                            <label className="text-sm font-medium text-gray-600">Is Active</label>

                            <div className="relative w-[140px]">
                                <button
                                    onClick={() => {
                                        setActiveDropdownOpen(!activeDropdownOpen);
                                        setBrandDropdownOpen(false);
                                    }}
                                    className="w-full flex justify-between items-center border rounded-md px-3 py-2 text-sm bg-white hover:border-blue-500"
                                >
                                    <span className="capitalize truncate">
                                        {isActive === "All" ? "All" : isActive}
                                    </span>

                                    <svg
                                        className={`w-4 h-4 transition-transform duration-200 ${activeDropdownOpen ? "rotate-180" : ""
                                            }`}
                                        fill="none"
                                        stroke="currentColor"
                                        strokeWidth="2"
                                        viewBox="0 0 24 24"
                                    >
                                        <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
                                    </svg>
                                </button>

                                {activeDropdownOpen && (
                                    <div className="absolute left-0 right-0 mt-2 bg-white border rounded-md shadow-lg z-50">
                                        {["All", "true", "false"].map((val) => (
                                            <div
                                                key={val}
                                                onClick={() => {
                                                    setIsActive(val);
                                                    setActiveDropdownOpen(false);
                                                }}
                                                className={`px-4 py-2 text-sm cursor-pointer hover:bg-blue-50
                        ${isActive === val ? "bg-blue-100 font-medium" : ""}`}
                                            >
                                                {val}
                                            </div>
                                        ))}
                                    </div>
                                )}
                            </div>
                        </div>

                        <button
                            onClick={handleExport}
                            className="bg-blue-600 text-white px-5 py-2 rounded-md hover:bg-blue-500 text-sm font-medium"
                        >
                            Export
                        </button>
                    </div>

                    {!loading && data.length > 0 && (
                        <>
                            <div className="w-full bg-white rounded-lg shadow">
                                <div className="max-h-[80vh] overflow-auto relative">
                                    <table className="min-w-full text-sm border-collapse">
                                        <thead>
                                            <tr>
                                                {columns.map((col, index) => (
                                                    <th
                                                        key={col}
                                                        className={`relative px-4 py-3 text-left font-semibold capitalize
                                                        text-gray-600 bg-gray-100 sticky top-0 z-30
                                                        ${index === 0
                                                                ? "sticky left-0 z-40 bg-gray-100 after:absolute after:top-0 after:right-0 after:h-full after:w-[1px] after:bg-gray-300 after:content-['']"
                                                                : "border-r"
                                                            }`}
                                                    >
                                                        {col.replace(/_/g, " ")}
                                                    </th>
                                                ))}
                                            </tr>
                                        </thead>

                                        <tbody>
                                            {data.map((row, rowIndex) => (
                                                <tr key={rowIndex} className="border-b hover:bg-gray-50">
                                                    {columns.map((col, index) => (
                                                        <td
                                                            key={col}
                                                            className={`relative px-4 py-3 whitespace-nowrap bg-white
                                                        ${index === 0
                                                                    ? "sticky left-0 z-20 bg-white after:absolute after:top-0 after:right-0 after:h-full after:w-[1px] after:bg-gray-300 after:content-['']"
                                                                    : "border-r"
                                                                }`}
                                                        >
                                                            {String(row[col])}
                                                        </td>
                                                    ))}
                                                </tr>
                                            ))}
                                        </tbody>
                                    </table>
                                </div>
                            </div>

                            <div className="flex items-center justify-between mt-4 px-2">
                                <p className="text-sm text-gray-600">
                                    Page {currentPage + 1} of {pageCount}
                                </p>

                                <ReactPaginate
                                    pageCount={pageCount}
                                    onPageChange={handlePageChange}
                                    forcePage={currentPage}
                                    previousLabel="Prev"
                                    nextLabel="Next"
                                    pageRangeDisplayed={3}
                                    marginPagesDisplayed={0}
                                    breakLabel="..."
                                    containerClassName="flex gap-2"
                                    pageClassName="border rounded"
                                    pageLinkClassName="px-3 py-1 text-sm"
                                    activeClassName="bg-blue-600 text-white"
                                    previousClassName="border rounded"
                                    previousLinkClassName="px-3 py-1 text-sm"
                                    nextClassName="border rounded"
                                    nextLinkClassName="px-3 py-1 text-sm"
                                    disabledClassName="opacity-40"
                                />
                            </div>
                        </>
                    )}
                </div>
            </Wrapper>
        </Layout>
    );
};

export default ProductList;