import { useState } from "react";
import Layout from "../components/Layout";
import TopBar from "../components/commoncomponents/TopBar";
import Wrapper from "../components/commoncomponents/Wrapper";
import { CREATE_SALON } from "../services/crm/user.service";
import toast from "react-hot-toast";
import { salonTypes } from "../services/utils/roles";
const initialData = {
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
  live: "",
  trade: "",
  email: "",
  owner: "",
  gender: "",

  // Additional Fields
  gstNumber: "",
  uniqueCode: "",
};
const AddSalon = () => {
  const [salon, setSalon] = useState({ ...initialData });
  const labelFields = {
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
    live: "Live",
    trade: "Trade",
    email: "Email",
    owner: "Owner",
    gstNumber: "Gst Number",
    uniqueCode: "Unique code",
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

  const handleSubmit = (e) => {
    e.preventDefault();
    const isSomeEmpty = Object.values(salon).some(
      (elm) => elm === "" || elm === undefined || elm === null
    );
    if (isSomeEmpty) return toast.error("fill all the fields");
    const data = {
      salon,
    };
    CREATE_SALON(data)
      .then((res) => {
        
        if (res) {
          toast.success("salon created");
          setSalon({ ...initialData });
        }
      })
      .catch(() => {
        toast.error("salon not created");
      });
  };

  return (
    <>
      <Layout>
        <div className="w-full flex flex-col">
          <TopBar title="Add Salon" />
        </div>
        <Wrapper>
          <form onSubmit={handleSubmit} className="w-full">
            <div className="grid grid-cols-1 md:grid-cols-2  gap-4">
              {Object.keys(salon).map((key) => {
                return key === "name" ? (
                  <div key={key} className="flex flex-col my-0">
                    <label
                      htmlFor={key}
                      className="mb-2 font-medium text-gray-700"
                    >
                      Salon Type
                    </label>
                    <select
                      name="name"
                      value={salon[key]}
                      className="border-2 outline-none order-gray-300 focus:ring-2 boutline-none p-2 rounded-md"
                      onChange={handleChange}
                    >
                      <option value="">Choose Type</option>
                      {Object.keys(salonTypes).map((type, idx) => {
                        return (
                          <option value={type} key={idx}>
                            {type}
                          </option>
                        );
                      })}
                    </select>
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
    </>
  );
};

export default AddSalon;
