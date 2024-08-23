import { useEffect, useState } from "react";
import Layout from "../components/Layout";
import TopBar from "../components/commoncomponents/TopBar";

const AddSalon = () => {
  const [salon, setSalon] = useState({
    name: "",
    address: "",
    address2: "",
    // geoLocation: [{ long: 0, lat: 0 }],
    active: false,
    rating: 0,
    phoneNumber: "",
    contactNumber: "",
    stateName: "",
    landmark: "",
    latitude: 0,
    longitude: 0,
    live: "",
    trade: "",
    email: "",
    owner: "",
    gstNumber: "",
    uniqueCode: "",
  });
  const labelFields = {
    name: "Name",
    address: "Address 1",
    address2: "Address 2",
    // geoLocation: "Geo Location",
    active: "Active",
    rating: "Rating",
    phoneNumber: "Phone Number",
    contactNumber: "Contact Number",
    stateName: "State",
    landmark: "LandMark",
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
    console.log(labelhead, "head");

    setSalon({
      ...salon,
      [name]:
        type === "number"
          ? parseFloat(value)
          : type === "radio"
          ? value === "true"
          : value,
    });
  };
 
  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle form submission logic here
  };
 
  useEffect(() => {
    console.log(salon, salon.geoLocation);
  }, [salon]);
  return (
    <>
      <Layout>
        <div className="w-full flex flex-col">
          <TopBar title="Add Salon" />
        </div>
        <form
          onSubmit={handleSubmit}
          className="p-8 md:p-16 h-[calc(100vh-65px)] overflow-y-auto "
        >
          <div className="grid grid-cols-1 md:grid-cols-2  gap-4">
            {Object.keys(salon).map((key) => {
              return typeof salon[key] === "boolean" ? (
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
                  </div>
                </div>
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
      </Layout>
    </>
  );
};

export default AddSalon;
