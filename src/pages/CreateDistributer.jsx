import { useState } from 'react';
import Layout from '../components/Layout';
import TopBar from '../components/commoncomponents/TopBar';
import toast from 'react-hot-toast';
import Wrapper from '../components/commoncomponents/Wrapper';
import { CREATE_DISTRIBUTER } from '../services/crm/user.service';

const CreateDistributer = () => {
  const [distributer, setDistributer] = useState({
    name: "",
    phoneNumber: "",
    contactNumber: "",
    email: "",
    gender: "",
    role: "",
    address1: "",
    state: "",
    city: "",
    pincode: "",
    active: false,
    trade: "",
    gstNumber: "",
  })
  const labelFields = {
    name: "Name",
    phoneNumber: "Phone Number",
    contactNumber: "Contact Number",
    email: "Email",
    gender: "Gender",
    role: "Role",
    address1: "Address 1",
    state: "State",
    pincode: "Pincode",
    city: "City",
    active: "Active",
    trade: "Trade",
    gstNumber: "GST Number",
  };
  const handleChange = (e) => {
    const {
      name,
      value,
      type,
      checked,
      attributes: { labelhead },
    } = e.target;

    setDistributer({
      ...distributer,
      [name]: (() => {
        if (name === "phoneNumber" || name === "contactNumber") {
          const phoneValue = value.toString().slice(0, 10); // Limit to 10 digits
          return phoneValue; // Convert back to a number
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
    const isSomeEmpty = Object.values(distributer).some(
      (elm) => elm === "" || elm === undefined || elm === null
    );
    if (isSomeEmpty) return toast.error("fill all the fields");
     const payload = {
      distributer
     }
    const res = await CREATE_DISTRIBUTER(payload);
    if (res) {
      toast.success("Distributer Created Successfully");
      setDistributer({
        name: "",
        phoneNumber: "",
        contactNumber: "",
        email: "",
        gender: "",
        role: "",
        address1: "",
        state: "",
        city: "",
        pincode: "",
        active: false,
        trade: "",
        gstNumber: "",
      });
    }
  };

  const distributerTypes = [
    { name: "Distributer", value: "1" },
    { name: "Super Stocker", value: "2" }
  ]
  return (
    <Layout>
      <div className="w-full flex flex-col">
        <TopBar title="ADD DISTRIBUTER" />
      </div>
      <Wrapper>
        <div>
          <form onSubmit={handleSubmit} className="w-full">
            <div className="grid grid-cols-1 xl:grid-cols-2  gap-4">
              {Object.keys(labelFields).map((key) => {
                return key === "role" ? (
                  <div key={key} className="flex items-center gap-2 my-0">
                    <label
                      htmlFor={key}
                      className="mb-2 w-1/5 font-medium text-gray-700 text-xs md:text-sm"
                    >
                      Distributer Type
                    </label>
                    <select
                      name="role"
                      value={distributer[key]}
                      className="border-2 w-full outline-none order-gray-300 focus:ring-2 boutline-none p-2 rounded-md"
                      onChange={handleChange}
                    >
                      <option value="">Choose Type</option>
                      {distributerTypes.map((type, idx) => {
                        return (
                          <option value={type?.value} key={idx}>
                            {type.name}
                          </option>
                        );
                      })}
                    </select>
                  </div>
                ) : key === "gender" ? (
                  <div key={key} className="flex items-center gap-2 mb-4">
                    <div className="mb-2 w-1/5 font-medium text-gray-700 text-xs md:text-sm">
                      {labelFields[key]}
                    </div>
                    <div className="flex w-full  gap-4 items-center">
                      <div className="flex items-center">
                        <input
                          type="radio"
                          value="M"
                          name="gender"
                          checked={distributer[key] === "M"}
                          className="w-6 h-6 text-blue-600 bg-gray-100 border-gray-300 "
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
                          value="F"
                          name="gender"
                          checked={distributer[key] === "F"}
                          className="w-6 h-6 text-blue-600 bg-gray-100 border-gray-300 "
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
                ) : key === "active" ? (
                  <>
                    <div key={key} className="flex items-center gap-2 mb-4">
                      <div className="mb-2 w-1/5 font-medium text-gray-700 text-xs md:text-sm">
                        {labelFields[key]}
                      </div>
                      <div className="flex w-full gap-4 items-center">
                        <div className="flex items-center">
                          <input
                            type="radio"
                            value="true"
                            name={key}
                            checked={distributer[key] === true}
                            className="w-6 h-6 text-blue-600 bg-gray-100 border-gray-300 "
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
                            className="w-6 h-6 text-blue-600 bg-gray-100 border-gray-300 "
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
                  <div key={key} className="flex items-center gap-2 my-0">
                    <label
                      htmlFor={key}
                      className="mb-2 w-1/5 font-medium text-gray-700 text-xs md:text-sm"
                    >
                      {labelFields[key]}
                    </label>
                    <input
                      type={
                        typeof distributer[key] === "number"
                          ? "number"
                          : key === "email"
                            ? "mail"
                            : "text"
                      }
                      id={key}
                      min={0}
                      name={key}
                      className="border-2 outline-none order-gray-300 w-full focus:ring-2 boutline-none p-2 rounded-md"
                      value={distributer[key]}
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
        </div>
      </Wrapper>


    </Layout>
  )
}

export default CreateDistributer