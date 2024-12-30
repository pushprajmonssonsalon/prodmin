import { useState } from "react";
import Layout from "../components/Layout";
import TopBar from "../components/commoncomponents/TopBar";
import { CREATE_PRODUCT } from "../services/pro/user.service";
import toast from "react-hot-toast";
import Wrapper from "../components/commoncomponents/Wrapper";

const AddProduct = () => {
  const [formData, setFormData] = useState({
    name: "",
    price: 0,

    eancode: "",
    quantity: 0,
    mrp: 0,
  
    brand: "",
    category: "",
    subCategory: "",
    hsncode: "",
    skucode: "",
    
    uniqueId: 0,
    
    itemForm: "",
    description: "",
    ingredients: "",
    liquidVolume: "",
    length: 10,
    breadth: 10,
    height: 10,
    weight: 10,
  
    type: "",
    stockQuantity: 10,
    productUrl: "",
    shortUrl: "",
    
    keywords: "",
    benefitDesc: "",
    productBenefit: "",
   
  });
  const inputLabels = {
    name: "product name",
    price: "price",
    eancode: "ean code",
    quantity: "quantity",
    mrp: "mrp",
    brand: "brand",
    category: "category",
    subCategory: "sub category",
    hsncode: "hsn code",
    skucode: "sku code",
    mpn: "mpn",
    uniqueId: "unique id",
    description: "description",
    ingredients: "ingredients",
    itemForm: "item form",
    liquidVolume: "liquid volume",
    length: "length",
    breadth: "breadth",
    height: "height",
    weight: "weight",

   
    type: "type",
    productBenefit: "product benefit",
    stockQuantity: "stock quantity",

    productUrl: "product url",
    shortUrl: "short url",
    benefitDesc: "benefit description",
    rating: "rating",
    keywords: "keywords",
    
  };
  const otherfields = [
    "description",
    "ingredients",
    "productBenefit",
    "benefitDesc",
    "keywords",
  ];
  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    
    setFormData({
      ...formData,
      [name]:
       type === "number"
          ? parseFloat(value)
          : value,
    });
  };

  const handleSubmit = (e) => {
   
    e.preventDefault();
    const isEveryEmpty =Object.keys(formData).every((key)=>formData[key]===""||formData[key]===0)
    if(isEveryEmpty) return toast.error("Please fill all the fields");
    (async () => {
      try {
        await CREATE_PRODUCT(formData);
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
              )  : key === "type" ? (
                <div key={key} className="flex flex-col">
                  <div
                    htmlFor={key}
                    className="mb-2 font-medium text-gray-700"
                  >
                    {inputLabels[key]}
                  </div>
                  <div className="flex gap-4 items-center"
                >

            
        
                  <div className="flex items-center ">
                    <input
                      id="product"
                      type="radio"
                      value="product"
                      name="type"
                      checked={formData[key] === "product"}
                      className="w-6 h-6 text-blue-600 bg-gray-100 border-gray-300 "
                      onChange={handleChange}
                    />
               
                    <label
                      htmlFor="product"
                      className="ms-2 text-sm font-medium text-gray-900 dark:text-gray-300"
                    >
                     Product
                    </label>
                    </div>
                  <div className="flex items-center">
                    <input
                      defaultChecked=""
                      id="combo"
                      type="radio"
                      value="combo"
                      name="type"
                      checked={formData[key] === "combo"}
                      className="w-6 h-6 text-blue-600 bg-gray-100 border-gray-300"
                      onChange={handleChange}
                    />
                    <label
                      htmlFor="combo"
                      className="ms-2 text-sm font-medium text-gray-900 dark:text-gray-300"
                    >
                      Combo
                    </label>
                  </div>
                  </div>
                </div>
              ) : (
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
            className="bg-blue-500 text-white py-3  px-6 rounded-md text-lg hover:bg-blue-600"
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
