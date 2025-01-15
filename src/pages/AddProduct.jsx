import { useState } from "react";
import Layout from "../components/Layout";
import TopBar from "../components/commoncomponents/TopBar";
import { CREATE_PRODUCT } from "../services/pro/user.service";
import toast from "react-hot-toast";
import Wrapper from "../components/commoncomponents/Wrapper";
import { productOptions } from "../services/utils/roles";

const AddProduct = () => {
  const [formData, setFormData] = useState({
    name: "",
    eancode: "",
    description: "",
    price: 0,
    mrp: 0,
    bestSeller: false,
    newArrival: false,
    brand: "",
    category: "",
    subCategory: "",
    hsncode: "",
    skucode: "",
    ingredients: "",
    itemform: "",
    liquidvolume: "",
    length: 0,
    breadth: 0,
    height: 0,
    weight: 0,
    isActive: false,
    active: false,
    type: "product",
    productbenefit: "",
    stockQuantity: 0,
    shortUrl: "",
    benefitdesc: "",
    rating: 0,
    keywords: "",

  });
  const inputLabels = {
    name: "Product Name",
    eancode: "EAN Code",
    description: "Description",
    price: "Price",
    mrp: "MRP",
    bestSeller: "Best Seller",
    newArrival: "New Arrival",
    brand: "Brand",
    category: "Category",
    subCategory: "Sub Category",
    hsncode: "HSN Code",
    skucode: "SKU Code",
    ingredients: "Ingredients",
    itemform: "Item Form",
    liquidvolume: "Liquid Volume",
    length: "Length",
    breadth: "Breadth",
    height: "Height",
    weight: "Weight",
    isActive: "Is Active",
    active: "Active",
    type: "Type",

    productbenefit: "Product Benefit",
    stockQuantity: "Stock Quantity",
    shortUrl: "Short URL",
    benefitdesc: "Benefit Description",
    rating: "Rating",
    keywords: "Keywords",

  };
  const otherfields = [
    "description",
    "ingredients",
    "productbenefit",
    "benefitdesc",
    "keywords",
  ];
  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    
    setFormData({
      ...formData,
      [name]:
        type === "checkbox"
          ? checked
          : type === "radio"
          ? name === "type"
            ? value
            : value === "true"
          : value,
    });
  };


  
  const handleSubmit = (e) => {

    e.preventDefault();
    const isEveryEmpty = Object.keys(formData).every((key) => formData[key] === "" || formData[key] === 0)
    if (isEveryEmpty) return toast.error("Please fill all the fields");
    (async () => {
      try {
      const res =  await CREATE_PRODUCT(formData);
      if(res){
        setFormData((prev) => {
          const newFormData = { ...prev };
          Object.keys(newFormData).forEach((key) => {
            if (typeof newFormData[key] === "number") {
              newFormData[key] = 0;
            } else {
              newFormData[key] = "";
            }
          });
          return newFormData;
        });
        toast.success("Successfully created!")
      }
       

      } catch (error) {

      }
    })();
  };
  return (
    <>
      <Layout>
        <div className="w-full flex flex-col ">
          <TopBar title="Add Product" />
        </div>
        <Wrapper>
          <form
            onSubmit={handleSubmit}
            className="w-full"
          >
            <div className="grid grid-cols-1 md:grid-cols-2  gap-4 capitalize">
              {Object.keys(formData).map((key) =>
                otherfields.includes(key) ? (
                  <div key={key} className="flex flex-col">
                    <label
                      htmlFor={key}
                      className="mb-2 font-medium text-gray-700"
                    >
                      {inputLabels[key]}
                    </label>
                    <textarea
                      cols="50"
                      rows="4"
                      id={key}
                      name={key}
                      value={formData[key]}
                      onChange={handleChange}
                      className="border border-gray-300 outline-none focus:ring-2 p-2 rounded-md"
                    />
                  </div>
                ) : typeof formData[key] === "boolean" || key === "type" ? (
                <div key={key} className="flex flex-col mb-4">
                  <div className="mb-2 font-medium text-gray-700">
                    {inputLabels[key]}
                  </div>
                  <div className="flex gap-4 items-center">
                    {key === "type" ? (
                      <>
                        <div className="flex items-center">
                          <input
                            type="radio"
                            value="product"
                            name={key}
                            checked={formData[key] === "product"}
                            className="w-6 h-6 text-blue-600 bg-gray-100 border-gray-300"
                            onChange={handleChange}
                          />
                          <label
                            htmlFor={key}
                            className="ml-2 text-sm font-medium text-gray-900 "
                          >
                            Product
                          </label>
                        </div>
                        <div className="flex items-center">
                          <input
                            type="radio"
                            value="combo"
                            name={key}
                            checked={formData[key] === "combo"}
                            className="w-6 h-6 text-blue-600 bg-gray-100 border-gray-300"
                            onChange={handleChange}
                          />
                          <label
                            htmlFor={key}
                            className="ml-2 text-sm font-medium text-gray-900 "
                          >
                            Combo
                          </label>
                        </div>
                      </>
                    ) : (
                      <>
                        <div className="flex items-center">
                          <input
                            type="radio"
                            value="true"
                            name={key}
                            checked={formData[key] === true}
                            className="w-6 h-6 text-blue-600 bg-gray-100 border-gray-300"
                            onChange={handleChange}
                          />
                          <label
                            htmlFor={key}
                            className="ml-2 text-sm font-medium text-gray-900 "
                          >
                            Yes
                          </label>
                        </div>
                        <div className="flex items-center">
                          <input
                            type="radio"
                            value="false"
                            name={key}
                            checked={formData[key] === false}
                            className="w-6 h-6 text-blue-600 bg-gray-100 border-gray-300"
                            onChange={handleChange}
                          />
                          <label
                            htmlFor={key}
                            className="ml-2 text-sm font-medium text-gray-900 "
                          >
                            No
                          </label>
                        </div>
                      </>
                    )}
                  </div>
                </div>

                ) : key === "brand" || key === "category" || key === "subCategory" ?
                  <div key={key} className="flex flex-col">
                    <div
                      htmlFor={key}
                      className="mb-2 font-medium text-gray-700"
                    >
                      {inputLabels[key]}
                    </div>
                    <select
                      id={key}
                      name={key}
                      value={formData[key]}

                      className="border border-gray-300 focus:ring-2 outline-none p-2 rounded-md"
                      onChange={handleChange}
                    >
                      <option value="">Select {key}</option>
                      {productOptions[key].map((option) => (
                        <option key={option} value={option}>{option}</option>
                      ))

                      }
                    </select>

                  </div>

                  : (
                    <div key={key} className="flex flex-col">
                      <label
                        htmlFor={key}
                        className="mb-2 font-medium text-gray-700"
                      >
                        {inputLabels[key]}
                      </label>
                      <input
                        type={
                          typeof formData[key] === "number"
                            ? "number"
                            : "text"
                        }
                        id={key}
                        name={key}
                        value={formData[key]}
                        onChange={handleChange}
                        className="border border-gray-300 focus:ring-2 outline-none p-2 rounded-md"
                      />
                    </div>
                  )
              )}
            </div>
            <button
              type="submit"
              className="bg-blue-500 mt-5 text-white py-3  px-6 rounded-md text-lg hover:bg-blue-600"
            >
              Submit
            </button>
          </form>
        </Wrapper>
      </Layout>
    </>
  );
};

export default AddProduct;
