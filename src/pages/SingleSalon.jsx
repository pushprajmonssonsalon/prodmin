import { useEffect, useState } from "react";
import Layout from "../components/Layout";
import TopBar from "../components/commoncomponents/TopBar";
import { useLocation, useParams } from "react-router-dom";
import toast from "react-hot-toast";
import useImageUploader from "../services/utils/useImageUploader";
import Wrapper from "../components/commoncomponents/Wrapper";
import { GET_SALON, UPDATE_SALON, UPLOAD_SALON_IMAGES } from "../services/crm/user.service";
import { ImCross } from "react-icons/im";
const obj1 = {
  // General Fields
  name: "",
  address: "",
  address2: "",
  city: "",
  pincode: "",
  landmark:"",

  // geoLocation: [{ long: 0, lat: 0 }],
  active: false,
  rating: 0, // Default rating to 0
  phoneNumber: 0,
  contactNumber: 0,
  stateName: "",
  latitude: 0,
  longitude: 0,

  // Specific Fields
};
const obj2 = {
  name: "Name",
  address: "Address 1",
  address2: "Address 2",
  city: "City",
  pincode: "Pincode",
  landmark:"Landmark",

  // geoLocation: "Geo Location",
  active: "Active",
  rating: "Rating",
  phoneNumber: "Phone Number",
  contactNumber: "Contact Number",
  stateName: "State",
  latitude: "Latitude",
  longitude: "Longitude",
  images: "Images",
};
const otherData = {
  trade: "",
  email: "",
  gender: "",

  // Additional Fields
  gstNumber: "",
};
const otherFields = {
  live: "Live",
  trade: "Trade",
  gstNumber: "Gst Number",
};
const SingleSalon = () => {
  const params = useParams();
  const { compressFile } = useImageUploader();
  const [initialData, setInititalData] = useState(obj1);
  const [labelFields, setLabelFields] = useState(obj2);
  const { pathname } = useLocation();
  const path = pathname?.split("/")[1];

  useEffect(() => {
    if (path === "saloncrm") {
      setLabelFields({ ...labelFields, ...otherFields });
      setInititalData({ ...initialData, ...otherData });
    } else {
      setLabelFields({ ...obj2 });
      setInititalData({ ...obj1 });
    }
  }, [path]);
  const [salon, setSalon] = useState(initialData);

  useEffect(() => {
    async function fetchApi() {
      let salonId = params.shortUrl;
      GET_SALON(path, salonId)
        .then((res) => {
          if (res) {
            const pn = res?.address2.split("-")[1];

            const obj = {
              _id: res?._id,
              name: res?.name || "",
              address: res?.address || "",
              address2: res?.address2 || "",
              ...(pn && { pincode: pn }),
              city: res?.city || "",
              active: res?.active || "",
              rating: res?.rating || "",
              phoneNumber: res?.phoneNumber || "",
              contactNumber: res?.contactNumber || "",
              stateName: res?.stateName || "",
              latitude: res?.latitude || "",
              longitude: res?.longitude || "",
              landmark: res?.landmark || "",
              images: res?.images || [],
              // geoLocation: res?.data?.data?.geoLocation || [],
              // uniqueCode:res?.data?.data?.uniqueCode
            };
            if (path === "saloncrm") {
              // Add any default values if necessary
              const newObj = {
                trade: res?.trade,
                email: res?.email,
                live: res?.live,
                gstNumber: res?.gstNumber,
              };
              Object.assign(obj, newObj);
            }
            setSalon(obj);
          }
        })
        .catch(() => {});
    }
    fetchApi();
  }, [params.shortUrl]);

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      compressFile(file)
        .then(async (res) => {
          const formData = new FormData();
          formData.append("image", res);
          formData.append("productId", salon?._id);

          try {
            const uploadImage = await UPLOAD_SALON_IMAGES(formData,salon?._id);
            if (uploadImage) {
              setSalon((prev) => ({
                ...prev,
                images: [...prev.images, uploadImage],
              }));
              toast.success("Successfully updated!");
            }
          } catch (error) {
            console.error("Failed to upload images:", error);
          }
        })
        .catch(() => {
          console.error("Failed to upload images:");
        });
    }
  };

  // const handleImageUpload = async () => {
  //   const newFile = await handleFileChange(file);
  // };
  const handleRemoveImage = (index, type) => {
    if (type === "images") {
      setSalon((prev) => ({
        ...prev,
        images: prev.images.filter((_, i) => i !== index),
      }));
    }
  };

  const handleChange = (e) => {
    const {
      name,
      value,
      type,
      checked,
      attributes: { labelhead },
    } = e.target;

    setSalon({
      ...salon,
      [name]: (() => {
        if (type === "number") {
          if (name === "rating") {
            return Math.min(parseFloat(value), 5);
          } else if (name === "phoneNumber" || name === "contactNumber") {
            const phoneValue = value.toString().slice(0, 10); // Limit to 10 digits
            return Number(phoneValue); // Convert back to a number
          }
          return value;
        } else if (type === "radio") {
          if (name === "gender") {
            return value;
          }
          return value === "true";
        }
        return value;
      })(),
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    UPDATE_SALON(salon, path)
      .then((res) => {
        if (res) toast.success("salon updated");
      })
      .catch(() => {});
  };

  return (
    <Layout>
      <div className="w-full flex flex-col">
        <TopBar title={salon?.name} />
      </div>

      <Wrapper>
        <form onSubmit={handleSubmit} className="w-full">
          <div className="grid grid-cols-1 md:grid-cols-2  gap-4">
            {Object.keys(labelFields).map((key) => {
              return key === "images" ? (
                <div key={key} className="flex flex-col mb-4">
                  <div>
                    <label className="block  font-medium text-gray-700">
                      Images:
                    </label>
                    {path !== "salonsmart" && (
                      <input
                        type="file"
                        onChange={handleFileChange}
                        className="mt-1"
                      />
                    )}{" "}
                    {/* <Button onClick={handleImageUpload}>Upload Image</Button> */}
                  </div>
                  <div className="mt-4 flex flex-wrap gap-9">
                    {salon[key]?.length > 0 &&
                      salon[key]?.map((img, index) => (
                        <div key={index} className="flex  items-center">
                          <img
                            src={img}
                            alt="salon"
                            className="w-16 h-16 rounded mr-2"
                          />
                          {path !== "salonsmart" && (
                            <ImCross
                              onClick={() => handleRemoveImage(index, "images")}
                              className="cursor-pointer text-red-500"
                            />
                          )}
                        </div>
                      ))}
                  </div>
                </div>
              ) : key === "gender" ? (
                <div key={key} className="flex flex-col mb-4">
                  <div className="mb-2 font-medium text-gray-700">
                    {labelFields[key]}
                  </div>
                  <div className="flex  gap-4 items-center">
                    <div className="flex items-center">
                      <input
                        type="radio"
                        value="Male"
                        name="gender"
                        checked={salon[key] === "Male"}
                        className="w-6 h-6 text-blue-600 bg-gray-100 border-gray-300"
                        onChange={handleChange}
                      />
                      <label
                        htmlFor={key}
                        className="ml-2 text-sm font-medium text-gray-900 "
                      >
                        Male
                      </label>
                    </div>
                    <div className="flex items-center">
                      <input
                        type="radio"
                        value="Female"
                        name="gender"
                        checked={salon[key] === "Female"}
                        className="w-6 h-6 text-blue-600 bg-gray-100 border-gray-300"
                        onChange={handleChange}
                      />
                      <label
                        htmlFor={key}
                        className="ml-2 text-sm font-medium text-gray-900 "
                      >
                        Female
                      </label>
                    </div>
                  </div>
                </div>
              ) : typeof salon[key] === "boolean" ? (
                <>
                  <div key={key} className="flex flex-col mb-4">
                    <div className="mb-2 font-medium text-gray-700">
                      {labelFields[key]}
                    </div>
                    <div className="flex  gap-4 items-center">
                      <div className="flex items-center">
                        <input
                          type="radio"
                          value="true"
                          name={key}
                          checked={salon[key] === true}
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
                    </div>
                  </div>
                </>
              ) : (
                <div key={key} className="flex flex-col my-0">
                  <label
                    htmlFor={key}
                    className="mb-2 font-medium text-gray-700"
                  >
                    {labelFields[key]}
                  </label>
                  <input
                    type={
                      typeof salon[key] === "number"
                        ? "number"
                        : key === "email"
                        ? "mail"
                        : "text"
                    }
                    id={key}
                    min={0}
                    name={key}
                    readOnly={key === "name"}
                    className="border-2 outline-none order-gray-300 focus:ring-2 boutline-none p-2 rounded-md"
                    value={salon[key]}
                    onChange={handleChange}
                  />
                </div>
              );
            })}
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

export default SingleSalon;
