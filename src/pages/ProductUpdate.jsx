import { useState } from "react";
import Layout from "../components/Layout";
import TopBar from "../components/commoncomponents/TopBar";
import Wrapper from "../components/commoncomponents/Wrapper";
import { BsUpload } from "react-icons/bs";
import toast from "react-hot-toast";
import Papa from "papaparse";
import { BULK_PRODUCT_UPDATE } from "../services/pro/user.service";

const ProductUpdate = () => {
    const [csvFile, setCsvFile] = useState(null);
    const [jsonData, setJsonData] = useState([]);
    const [loading, setLoading] = useState(false);
    const [summary, setSummary] = useState(null);

    const handleFileChange = (e) => {
        const file = e.target.files[0];
        if (!file) return;

        if (!file.name.endsWith(".csv")) {
            toast.error("Please upload a CSV file only");
            e.target.value = "";
            return;
        }

        setCsvFile(file);
        toast.success("CSV file selected");

        Papa.parse(file, {
            header: true,
            skipEmptyLines: true,
            transformHeader: (header) =>
                header
                    .trim()
                    .toLowerCase()
                    .replace(/\s+(\w)/g, (_, c) => c.toUpperCase())
                    .replace(/\s+/g, ""),
            complete: (result) => {
                const data = result.data;

                if (!data.length) {
                    toast.error("CSV is empty");
                    return;
                }

                const firstTwoKeys = Object.keys(data[0]).slice(0, 2);

                const filteredData = data.map((row) => {
                    const obj = {};
                    firstTwoKeys.forEach((key) => {
                        obj[key] = row[key];
                    });
                    return obj;
                });

                setJsonData(filteredData);
                console.log("Auto Converted JSON:", filteredData);
            },
            error: () => {
                toast.error("Failed to read CSV");
            },
        });
    };

    // 🔹 Upload JSON to Backend
    const handleUpload = async () => {
        if (!jsonData.length) {
            toast.error("No data to upload");
            return;
        }

        setLoading(true);
        try {
            const payload = { items: jsonData };
            const res = await BULK_PRODUCT_UPDATE(payload);

            const updated = res?.modified || res?.updated || 0;
            const total = jsonData.length;
            const notUpdated = total - updated;

            setSummary({
                updated,
                notUpdated
            });

            if (updated > 0) {
                toast.success(`${updated} products updated successfully`);
            } else {
                toast.error("No products were updated");
            }

        } catch (err) {
            console.error(err);
            toast.error("Upload failed");
        } finally {
            setLoading(false);
        }
    };

    return (
        <Layout>
            <div className="w-full flex flex-col">
                <TopBar title="Product Update" />
            </div>

            <Wrapper>
                <div className="w-full flex flex-col items-center justify-center h-[60vh] gap-6">

                    <label className="flex flex-col items-center justify-center w-[320px] 
            h-[160px] border-2 border-dashed border-gray-300 rounded-lg 
            cursor-pointer hover:border-blue-500 transition">

                        <BsUpload size={40} className="text-gray-500 mb-2" />
                        <span className="text-gray-600 font-medium">
                            Click to upload CSV
                        </span>

                        <input
                            type="file"
                            accept=".csv"
                            onChange={handleFileChange}
                            className="hidden"
                        />
                    </label>

                    {csvFile && (
                        <p className="text-sm text-gray-700">
                            Selected File: <b>{csvFile.name}</b>
                        </p>
                    )}

                    <button
                        onClick={handleUpload}
                        className="flex items-center gap-3 bg-blue-600 text-white 
            px-8 py-3 rounded-lg text-lg font-semibold
            hover:bg-blue-500 hover:ring-2 hover:ring-blue-300
            active:scale-105 transition-all duration-150"
                    >
                        <BsUpload size={20} />
                        Upload to Backend
                    </button>

                    {summary && (
                        <div className="w-[320px] bg-gray-50 border rounded-lg p-4 mt-4 text-sm">
                            <p className="flex justify-between text-green-600">
                                <span>Updated</span>
                                <b>{summary.updated}</b>
                            </p>

                            <p className="flex justify-between text-red-600">
                                <span>Not Updated</span>
                                <b>{summary.notUpdated}</b>
                            </p>
                        </div>
                    )}


                </div>
            </Wrapper>
        </Layout>
    );
};

export default ProductUpdate;
