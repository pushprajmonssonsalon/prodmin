import { useEffect, useState } from "react";
import Layout from "../components/Layout";
import TopBar from "../components/commoncomponents/TopBar";
import {
  EDIT_PRODUCT_DETAILS,
  SINGLE_PRODUCT_DETAILS,
  UPLOAD_IMAGE,
} from "../services/pro/user.service";
import { useParams } from "react-router-dom";
import { ImCross } from "react-icons/im";
import toast from "react-hot-toast";
import useImageUploader from "../services/utils/useImageUploader";
import Wrapper from "../components/commoncomponents/Wrapper";

const SingleProduct = () => {
  const params = useParams();
  const [stockQuantity, setStockQuantity] = useState(null);
  const { compressFile } = useImageUploader();
  const [productDetails, setProductDetails] = useState({
    name: "",
    price: 0,
    eancode: "",
    quantity: 0,
    mrp: 0,
    bestSeller: false,
    newArrival: false,

    brand: "",
    category: "",
    subCategory: "",
    hsncode: "",
    skucode: "",
    mpn: "",

    uniqueId: 0,

    itemForm: "",
    description: "",
    ingredients: "",
    liquidVolume: "",
    length: 10,
    breadth: 10,
    height: 10,
    weight: 10,

    isActive: false,
    active: false,
    srno: 0,
    rating: 0,
    ratingCount: 0,
    ratingTotal: 0,

    type: "product",
    stockQuantity: 10,
    productUrl: "",
    shortUrl: "",

    keywords: "",
    benefitDesc: "",
    productBenefit: "",
  });
  const [editDetails, setEditDetails] = useState({});
  const inputLabels = {
    name: "product name",
    price: "price",
    eancode: "ean code",
    quantity: "quantity",
    mrp: "mrp",
    bestSeller: "best seller",
    newArrival: "new arrival",

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
    isActive: "isActive",
    active: "active",
    srno: "sr no",
    rating: "rating",
    ratingCount: "rating count",
    ratingTotal: "rating total",
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
  const [newImages, setNewImages] = useState(productDetails?.images || []);
  const [newDesImages, setNewDesImages] = useState(
    productDetails?.desImages || []
  );

  useEffect(() => {
    async function fetchApi() {
      const product = await SINGLE_PRODUCT_DETAILS({
        shortUrl: params.shortUrl,
      });
      setProductDetails(product);
      setNewImages(product?.images);
      setNewDesImages(product?.desImages);
    }
    fetchApi();
  }, [params.shortUrl]);

  const handleImageUpload = async (event) => {
    const file = event.target.files[0];

    const newFile = await compressFile(file);
    
    if (newFile) {
      const formData = new FormData();
      formData.append("image", newFile);
      formData.append("productId", productDetails?._id);
      try {
        const uploadImage = await UPLOAD_IMAGE(formData);
        if (uploadImage) {
          
          setNewImages((prevImages) => [...prevImages, uploadImage]);
          toast.success("Successfully updated!");
        }
      } catch (error) {
        console.error("Failed to upload images:", error);
      }
    }
  };

  const handleDesImageUpload = async (event) => {
    const files = event.target.files[0];
    const newFile = await compressFile(files);
    if (newFile) {
      const formData = new FormData();
      formData.append("image", newFile);
      formData.append("productId", productDetails?._id);
      try {
        const uploadImage = await UPLOAD_IMAGE(formData);
        if (uploadImage) {
          
          setNewDesImages((prevImages) => [...prevImages, uploadImage]);
          toast.success("Successfully updated!");
        }
      } catch (error) {
        console.error("Failed to upload images:", error);
      }
    }
  };

  const handleRemoveImage = (index, type) => {
    if (type === "images") {
      setNewImages((prevImages) => prevImages.filter((_, i) => i !== index));
    } else if (type === "desImages") {
      setNewDesImages((prevImages) => prevImages.filter((_, i) => i !== index));
    }
  };
  

  const handleSubmitDetails = async (e) => {
    e.preventDefault();

    
    const allDetails = await EDIT_PRODUCT_DETAILS({
      obj: {
        images: newImages,
        desImages: newDesImages,
        ...editDetails,
      },
      id: productDetails?._id,
    });
    
    if (allDetails) {
      setEditDetails({});
      toast.success("Successfully Updated!");
    }
  };
  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setEditDetails({
      ...editDetails,
      [name]:
        type === "checkbox"
          ? checked
          : type === "radio"
          ? name === "type"
            ? value
            : value === "true"
          : value,
    });

    setProductDetails((prevDetails) => ({
      ...prevDetails,
      [name]:
        type === "checkbox"
          ? checked
          : type === "radio"
          ? name === "type"
            ? value
            : value === "true"
          : value,
    }));
  };

  useEffect(() => {
    
    
  }, []);

  return (
    <Layout>
      <div className="w-full flex flex-col ">
        <TopBar title={productDetails?.name} />
      </div>
      <Wrapper>
        <form onSubmit={handleSubmitDetails} className="w-full">
          <div className="grid grid-cols-1 md:grid-cols-2  gap-4 capitalize">
            {Object.keys(inputLabels).map((key) =>
              otherfields.includes(key) ? (
                <div key={key} className="flex flex-col mb-4">
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
                    value={productDetails[key]}
                    onChange={handleChange}
                    className="border border-gray-300 p-2 rounded-md focus:ring-2 ring-blue-500 outline-none"
                  />
                </div>
              ) : typeof productDetails[key] === "boolean" || key === "type" ? (
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
                            checked={productDetails[key] === "product"}
                            className="w-6 h-6 text-blue-600 bg-gray-100 border-gray-300"
                            onChange={handleChange}
                          />
                          <label
                            htmlFor={key}
                            className="ml-2 text-sm font-medium text-gray-900 dark:text-gray-300"
                          >
                            Product
                          </label>
                        </div>
                        <div className="flex items-center">
                          <input
                            type="radio"
                            value="combo"
                            name={key}
                            checked={productDetails[key] === "combo"}
                            className="w-6 h-6 text-blue-600 bg-gray-100 border-gray-300"
                            onChange={handleChange}
                          />
                          <label
                            htmlFor={key}
                            className="ml-2 text-sm font-medium text-gray-900 dark:text-gray-300"
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
                            checked={productDetails[key] === true}
                            className="w-6 h-6 text-blue-600 bg-gray-100 border-gray-300"
                            onChange={handleChange}
                          />
                          <label
                            htmlFor={key}
                            className="ml-2 text-sm font-medium text-gray-900 dark:text-gray-300"
                          >
                            Yes
                          </label>
                        </div>
                        <div className="flex items-center">
                          <input
                            type="radio"
                            value="false"
                            name={key}
                            checked={productDetails[key] === false}
                            className="w-6 h-6 text-blue-600 bg-gray-100 border-gray-300"
                            onChange={handleChange}
                          />
                          <label
                            htmlFor={key}
                            className="ml-2 text-sm font-medium text-gray-900 dark:text-gray-300"
                          >
                            No
                          </label>
                        </div>
                      </>
                    )}
                  </div>
                </div>
              ) : (
                <div key={key} className="flex flex-col mb-4">
                  <label
                    htmlFor={key}
                    className="mb-2 font-medium text-gray-700"
                  >
                    {inputLabels[key]}
                  </label>
                  <input
                    type={
                      typeof productDetails[key] === "number"
                        ? "number"
                        : "text"
                    }
                    id={key}
                    name={key}
                    value={productDetails[key]}
                    onChange={handleChange}
                    className="border border-gray-300 focus:ring-2 outline-none p-2 rounded-md"
                  />
                </div>
              )
            )}

            <div className="col-span-full">
              <div className="flex flex-col w-full mb-5">
                <label className="mb-2 font-medium text-gray-700">images</label>
                {newImages.length > 0 && (
                  <div className="w-full flex justify-between items-center my-6 gap-5 flex-wrap ">
                    {newImages?.map((img, index) => (
                      <div className="relative" key={index}>
                        <img
                          src={img}
                          alt={`new-${index}`}
                          className="w-[100px] h-[100px] object-cover "
                        />
                        <ImCross
                          className="absolute top-0 -right-7 cursor-pointer"
                          onClick={() => handleRemoveImage(index, "images")}
                        />
                      </div>
                    ))}
                  </div>
                )}
                <input
                  type="file"
                  multiple
                  onChange={handleImageUpload}
                  className="border border-gray-300 focus:ring-2 outline-none p-2 rounded-md"
                />
              </div>
              <div className="flex flex-col justify-between w-full mb-5">
                <label className="mb-2 font-medium text-gray-700">
                  Description Images
                </label>
                {newDesImages?.length > 0 && (
                  <div className="w-full flex justify-between my-6 items-center gap-5 flex-wrap ">
                    {newDesImages?.map((img, index) => (
                      <div className="relative shadow-lg" key={index}>
                        <img
                          src={img}
                          alt={`new-des-${index}`}
                          className="w-[100px] h-[100px] object-cover "
                        />
                        <ImCross
                          className="absolute top-0 right-0 cursor-pointer text-sm "
                          onClick={() => handleRemoveImage(index, "desImages")}
                        />
                      </div>
                    ))}
                  </div>
                )}
                <input
                  type="file"
                  multiple
                  onChange={handleDesImageUpload}
                  className="border border-gray-300 focus:ring-2 outline-none p-2 rounded-md"
                />
              </div>
            </div>
          </div>
          <button
            type="submit"
            className="bg-blue-500 text-white py-3 my-6  px-6 rounded-md text-lg hover:bg-blue-600"
          >
            Submit
          </button>
        </form>
      </Wrapper>
    </Layout>
  );
};

export default SingleProduct;
