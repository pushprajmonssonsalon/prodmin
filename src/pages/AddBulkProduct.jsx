import { useEffect, useState } from "react";
import Layout from "../components/Layout";
import TopBar from "../components/commoncomponents/TopBar";
import { MdDelete } from "react-icons/md";
import { CREATE_BULK_PRODUCT, GET_BRANDS } from "../services/crm/user.service";
import Wrapper from "../components/commoncomponents/Wrapper";
import FileInput from "../components/commoncomponents/FileInput";
import csvToJson from "../services/utils/csvToJson";
import toast from "react-hot-toast";
const initialData = {
  brand: "",
  type: "",
  products: [
    {
      name: "",
      size: 0,
      unit: "",
      stock: 0,

      mrp: 0,
    },
  ],
};
const AddBulkProduct = () => {
  const [productData, setProductData] = useState(initialData);
  const [brands, setBrands] = useState([]);
  const [isBulkProduct, setIsBulkProduct] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (
      productData.brand === "" ||
      productData.type === "" ||
      productData?.products?.length === 0
    )
      return toast.error("select all fields");

    const someProdEmpty = productData?.products?.some((product) => {
      return Object.values(product).some((elm) => !elm);
    });
    if (someProdEmpty) {
      return toast.error("select all fields");
    }
    (async () => {
      try {
        await CREATE_BULK_PRODUCT(productData);
        setProductData(initialData);
        toast.success("product created")
      } catch (error) {
        
      }
    })();
  };
  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    
    setProductData({
      ...productData,
      [name]: type === "number" ? parseFloat(value) : value,
    });
  };
  const addNewProduct = () => {
    setProductData({
      ...productData,
      products: [
        ...productData.products,
        {
          name: "",
          size: 0,
          unit: "",
          stock: 0,

          mrp: 0,
        },
      ],
    });
  };
  const handleProdValueChange = (e, index) => {
    const {
      name,
      value,
      type,
      attributes: { labelhead },
    } = e.target;
    const key = labelhead.value;
    const updatedArray = [...productData[key]];
    updatedArray[index][name] = type === "number" ? parseFloat(value) : value;

    setProductData((prev) => ({
      ...prev,
      [key]: updatedArray,
    }));
  };
  const csvData = [
    {
      name: "",
      mrp: "",
      stockQuantity: "",
      price: "",

      skucode: "",
      unit: "",
      size: "",
    },
  ];
  const generateCSV = () => {
    const header = Object.keys(csvData[0]).join(",");
    const rows = csvData.map((row) => Object.values(row).join(",")).join("\n");
    return `${header}\n${rows}`;
  };
  const handleDownload = () => {
    const csv = generateCSV();
    const blob = new Blob([csv], { type: "text/csv" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "data.csv";
    a.click();
    URL.revokeObjectURL(url);
  };
  const handleBulkProduct = () => {
    setIsBulkProduct(true);
    if (productData?.products?.length > 0) {
      setProductData((prev) => ({ ...prev, products: [] }));
    }
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

          setProductData((prev) => ({ ...prev, products: jsonData }));

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

  useEffect(() => {
    (async () => {
      try {
        const res = await GET_BRANDS();
        
        if (res) {
          setBrands(res);
        }
      } catch (error) {
        
      }
    })();
  }, []);
  return (
    <>
      <Layout>
        <div className="w-full flex flex-col ">
          <TopBar title="Add Product" />
        </div>
        <Wrapper>
          <div className=" mb-9 flex flex-wrap gap-5 justify-between border-b border-gray-400 pb-5">
            <button
              onClick={handleDownload}
              className="bg-blue-500 w-[170px] h-[45px]  rounded-md  text-white font-medium text-md"
            >
              Download csv
            </button>
            <button
              onClick={handleBulkProduct}
              className="bg-blue-600 w-[170px] h-[45px]  rounded-md  text-white font-medium text-md"
            >
              Add Bulk Product
            </button>
          </div>
          <form className="w-full" onSubmit={handleSubmit}>
            <div className="grid grid-cols-1 md:grid-cols-2  gap-4 capitalize">
              <div className="flex flex-col">
                <label
                  htmlFor="brand"
                  className="mb-2 font-medium text-gray-700"
                >
                  Select brand
                </label>
                <select
                  id="brand"
                  className="border border-gray-300 p-2 rounded-md outline-none focus:ring-2"
                  name="brand"
                  value={productData?.brand}
                  onChange={handleChange}
                >
                  <option selected="">Choose a brand</option>
                  {brands?.length > 0 &&
                    brands?.map((brand, index) => (
                      <option key={index} value={brand}>
                        {brand}
                      </option>
                    ))}
                </select>
              </div>
              <div className="flex flex-col">
                <label
                  htmlFor="type"
                  className="mb-2 font-medium text-gray-700"
                >
                  Select type
                </label>
                <select
                  id="type"
                  name="type"
                  className="border border-gray-300 p-2 rounded-md outline-none focus:ring-2"
                  value={productData?.type}
                  onChange={handleChange}
                >
                  <option selected="">Choose a type</option>
                  <option value="Retail">Retail</option>
                  <option value="Professional">Professional</option>
                </select>
              </div>
            </div>
            {!isBulkProduct ? (
              <div className="my-6">
                <div className="flex items-center justify-between ">
                  <h2 className="mb-2 font-medium text-gray-700">
                    Products ({productData?.products?.length})
                  </h2>
                  <button
                    type="button"
                    onClick={addNewProduct}
                    className="mb-2 text-sm  py-1 px-6 rounded-[25px] bg-blue-500  text-white font-medium active:scale-105 transition-all ease-in duration-100"
                  >
                    Add New
                  </button>
                </div>

                {productData?.products?.length > 0 &&
                  productData?.products?.map((product, index) => (
                    <div
                      key={index}
                      className="relative flex border w-full   p-2   border-gray-400 rounded mb-5 last:mb-0"
                    >
                      <div className="w-full flex flex-wrap xl:flex-nowrap py-3 gap-4 capitalize">
                        {Object.keys(product).map((key) => (
                          <div
                            className={`${
                              key === "name"
                                ? `w-[calc(100%/2)] min-w-full md:min-w-[200px]`
                                : "w-[calc(100%/2/4)]  grow"
                            }  flex flex-col`}
                          >
                            <label
                              htmlFor={key}
                              className="mb-2 font-medium text-gray-700"
                            >
                              {key}
                            </label>
                            <input
                              type={
                                typeof product[key] === "number"
                                  ? "number"
                                  : "text"
                              }
                              id={key}
                              labelhead="products"
                              name={key}
                              value={product[key]}
                              onChange={(e) => handleProdValueChange(e, index)}
                              className="border border-gray-300 focus:ring-2 outline-none p-2 rounded-md"
                            />
                          </div>
                        ))}
                      </div>

                      {index !== 0 && (
                        <button
                          type="button"
                          className=" top-0 hover:text-rose-600 hover:scale-105 transition-transform ease-in duration-100 right-0 absolute flex mx-auto items-center"
                          onClick={() =>
                            setProductData((prev) => ({
                              ...prev,
                              products: prev.products.filter(
                                (elm, idx) => index !== idx
                              ),
                            }))
                          }
                        >
                          <MdDelete size={40} />
                        </button>
                      )}
                    </div>
                  ))}
              </div>
            ) : (
              <div className="my-6">
                <div className="flex flex-col my-7">
                  <label
                    htmlFor="file"
                    className="mb-2 font-medium text-gray-700"
                  >
                    Csv File
                  </label>
                  <FileInput
                    name="file"
                    handleUpload={handleUpload}
                    type="csv"
                  />
                </div>
              </div>
            )}
            <button
              type="submit"
              className="bg-blue-500 text-white py-3  px-6 rounded-md text-lg hover:bg-blue-600"
            >
              Submit
            </button>{" "}
          </form>
        </Wrapper>
      </Layout>
    </>
  );
};

const beautyBrands = [
  "L'Oréal",
  "Estée Lauder",
  "Clinique",
  "Lancôme",
  "MAC Cosmetics",
  "NARS",
  "Sephora",
  "Urban Decay",
  "Maybelline",
  "Dior",
  "Chanel",
  "Bobbi Brown",
  "NYX",
  "Smashbox",
  "Benefit Cosmetics",
  "Too Faced",
  "Tarte",
  "Fenty Beauty",
  "Glossier",
  "Anastasia Beverly Hills",
];
export default AddBulkProduct;
