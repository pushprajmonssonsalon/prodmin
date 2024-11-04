import { useState } from "react";
import Layout from "../components/Layout";
import TopBar from "../components/commoncomponents/TopBar";
import FileInput from "../components/commoncomponents/FileInput";
import { EDIT_INVENTORY } from "../services/crm/user.service";
import toast from "react-hot-toast";
import Wrapper from "../components/commoncomponents/Wrapper";
import csvToJson from "../services/utils/csvToJson";

const UpdateProducts = () => {
  

  const [data, setData] = useState([
    {
      _id: "",
      mrp: "",

      name: "",
    },
    { _id: "", mrp: "", name: "" },
  ]);

  const generateCSV = (data) => {
    const header = Object.keys(data[0]).join(",");
    const rows = data.map((row) => Object.values(row).join(",")).join("\n");
    return `${header}\n${rows}`;
  };

  const handleDownload = () => {
    const csv = generateCSV(data);
    const blob = new Blob([csv], { type: "text/csv" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "data.csv";
    a.click();
    URL.revokeObjectURL(url);
  };
  

  const handleUpload = async (e) => {
    try {
      const { files, name } = e.target;
      const file = files[0];

      if (file) {
        // Use FileReader to read the file
        const reader = new FileReader();
        reader.readAsText(file);

        reader.onload = async () => {
          // Get the file content
          const text = reader.result;

          // Convert CSV to JSON
          const jsonData = csvToJson(text);
          const res = await EDIT_INVENTORY({ products: jsonData });
          if (res) {
            toast.success("File uploaded");
          }
          console.log("Converted JSON Data:", jsonData);

          // You can set this data to your state or perform other actions
        };

        reader.onerror = (error) => {
          console.error("Error reading file:", error.message);
        };
      }

      // Send JSON to backend
      //   await axios.post('/your-backend-endpoint', json);
      // alert("Data sent to backend successfully!");
    } catch (error) {
      console.error("Error uploading file", error);
    }
  };

  // const csvToJson = (csv) => {
  //   const lines = csv.split("\n");
  //   const headers = lines[0].split(",");
  //   const result = [];

  //   for (let i = 1; i < lines.length; i++) {
  //     const obj = {};
  //     const currentline = lines[i].split(",");

  //     for (let j = 0; j < headers.length; j++) {
  //       obj[headers[j]] = currentline[j];
  //     }

  //     result.push(obj);
  //   }

  //   return result;
  // };
  return (
    <>
      <Layout>
        <div className="w-full flex flex-col">
          <TopBar title="Edit Product in Bulk" />
        </div>
        <Wrapper>
          <button
            onClick={handleDownload}
            className="bg-blue-500 hover:bg-blue-400 text-white py-3 px-6 rounded-md"
          >
            Download CSV
          </button>
          <div>
            <div className="flex flex-col my-7">
              <label htmlFor="file" className="mb-2 font-medium text-gray-700">
                Csv File
              </label>
              <FileInput name="file" handleUpload={handleUpload} type="csv" />
            </div>
          </div>
        </Wrapper>
      </Layout>
    </>
  );
};

export default UpdateProducts;
