import React, { useEffect, useState } from "react";
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
    const [showExportModal, setShowExportModal] = useState(false);
    const [exportType, setExportType] = useState("current");

    const rowsPerPage = 10;

    useEffect(() => {
        setLoading(true);

        GET_PRODUCT_LIST({
            page: currentPage + 1,
            limit: rowsPerPage,
            isActive: true,
        })
            .then((res) => {
                setData(res?.data || []);
                setTotalRows(res?.total || 0);
            })
            .catch((err) => console.error("API Error:", err))
            .finally(() => setLoading(false));
    }, [currentPage]);

    const columns = data.length > 0 ? Object.keys(data[0]) : [];
    const pageCount = Math.ceil(totalRows / rowsPerPage);

    const handleExport = () => {
        if (data.length === 0) return;

        const csvHeaders = columns.join(",") + "\n";
        const csvRows = data
            .map((row) =>
                columns.map((col) => `"${row[col] ?? ""}"`).join(",")
            )
            .join("\n");

        const blob = new Blob([csvHeaders + csvRows], {
            type: "text/csv;charset=utf-8;",
        });

        const link = document.createElement("a");
        link.href = URL.createObjectURL(blob);
        link.download = "products.csv";
        link.click();
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

                {!loading && data.length > 0 && (
                    <>
                        <div className="w-full bg-white rounded-lg shadow">
                            <div className="flex justify-end p-4">
                                <button
                                    onClick={() => setShowExportModal(true)}
                                    className="bg-blue-600 text-white px-5 py-2 rounded-md hover:bg-blue-500 text-sm font-medium"
                                >
                                    Export
                                </button>
                            </div>

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

                {showExportModal && (
                    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40">
                        <div className="bg-white rounded-lg w-[360px] shadow-xl">
                            <div className="px-5 py-4 border-b font-semibold">
                                Export Products
                            </div>

                            <div className="p-5 space-y-3">
                                <label className="flex items-center gap-2 cursor-pointer">
                                    <input
                                        type="radio"
                                        checked
                                        readOnly
                                    />
                                    Export current page
                                </label>
                            </div>

                            <div className="flex justify-end gap-3 px-5 py-4 border-t">
                                <button
                                    onClick={() => setShowExportModal(false)}
                                    className="px-4 py-2 text-sm rounded border"
                                >
                                    Cancel
                                </button>

                                <button
                                    onClick={() => {
                                        handleExport();
                                        setShowExportModal(false);
                                    }}
                                    className="px-4 py-2 text-sm rounded bg-blue-600 text-white"
                                >
                                    Export
                                </button>
                            </div>
                        </div>
                    </div>
                )}
            </Wrapper>
        </Layout>
    );
};

export default ProductList;
