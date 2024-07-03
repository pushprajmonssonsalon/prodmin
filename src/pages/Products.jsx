import React, { useEffect, useState } from "react";
import Layout from "../components/Layout";
import TopBar from "../components/commoncomponents/TopBar";
import InputTextArea from "../components/commoncomponents/InputTextArea";
import { SEARCH_PRODUCT } from "../services/pro/user.service";
import { useNavigate } from "react-router-dom";

const Products = () => {
  const navigate = useNavigate();
  const [name, setName] = useState("");
  const [product, setProduct] = useState([]);
  const [selectedProduct, setSelectedProduct] = useState({});
  console.log("name", name);
  useEffect(() => {
    async function fetchApi() {
      const product = await SEARCH_PRODUCT({ name });
      setProduct(product);
    }
    fetchApi();
  }, [name]);
  const handleProducts = (item) => {
    setName("");
    // setSelectedProduct(item);
    navigate(`/product/${item}`)
  };
  console.log("products", selectedProduct);

  return (
    <Layout>
      <div className="w-full flex flex-col">
        <TopBar title="Products" />
      </div>
      <div className="w-[50%] my-4 mx-auto relative">
        <InputTextArea
          placeholder="Enter Product..."
          label="Enter product name ..."
          value={name}
          setProperty={setName}
        />
        {name && (
          <div className="bg-white absolute top-16 w-full h-[150px] shadow-2xl overflow-auto">
            {product?.map((item) => (
              <h1
                className="w-full px-4 py-3 hover:bg-gray-200 cursor-pointer transition-all duration-200 ease-in-out text-sm font-sans font-semibold"
                onClick={()=>handleProducts(item?.shortUrl)}
              >
                {item?.name}
              </h1>
            ))}
          </div>
        )}
      </div>
    </Layout>
  );
};

export default Products;
