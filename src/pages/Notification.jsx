import { useState } from "react";
import Layout from "../components/Layout";
import TopBar from "../components/commoncomponents/TopBar";
import Wrapper from "../components/commoncomponents/Wrapper";
import toast from "react-hot-toast";
import { SEND_NOTIFICATION } from "../services/crm/user.service";

const Notification = () => {
  const [formValues, setFormValues] = useState({
    title: "",
    body: "",
    image: "",
    url: "",
  });
  const [loading, setLoading] = useState(false);
  const labelFields = {
    title: "Title",
    body: "Text",
    image: "Image",
    url: "Url",
  };
  const urls = ["image"];
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormValues((prev) => ({
      ...prev,
      [name]: value,
    }));
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    const { url, ...requiredFields } = formValues;
    const isAllFilled = Object.values(requiredFields).every(
      (elm) => elm !== ""
    );
    if (isAllFilled) {
      setLoading(true);
      SEND_NOTIFICATION(formValues)
        .then((res) => {
          toast.success("notificaiton sent");
          setLoading(false);
          setFormValues({
            title: "",
            body: "",
            image: "",
            url: "",
          });
        })
        .catch(() => {
          setLoading(false);
        });
    } else {
      return toast.error("Enter all Fields");
    }
  };
  return (
    <>
      {" "}
      <Layout>
        <div className="w-full flex flex-col">
          <TopBar title="Push Notifications" />
        </div>
        <Wrapper>
          <form onSubmit={handleSubmit} className="w-full">
            <div className="grid grid-cols-1  gap-4">
              {Object.keys(formValues).map((key, index) => (
                <div key={index} className="flex flex-col my-0">
                  <label
                    htmlFor={key}
                    className="mb-2 font-medium text-gray-700"
                  >
                    {labelFields[key]}
                  </label>
                  {key === "body" ? (
                    <textarea
                      id={key}
                      name={key}
                      rows={4}
                      value={formValues.body}
                      className="border-2 outline-none order-gray-300 focus:ring-2 boutline-none p-2 rounded-md"
                      onChange={handleChange}
                      placeholder="Write description here..."
                      defaultValue={""}
                    />
                  ) : (
                    <input
                      type={urls.includes(key) ? "url" : "text"}
                      id={key}
                      name={key}
                      className="border-2 outline-none order-gray-300 focus:ring-2 boutline-none p-2 rounded-md"
                      value={formValues[key]}
                      onChange={handleChange}
                    />
                  )}
                </div>
              ))}
            </div>

            {!loading ? (
              <button
                type="submit"
                className="bg-blue-500 text-white py-3 my-6  px-6 rounded-md text-lg hover:bg-blue-600"
              >
                Submit
              </button>
            ) : (
              <button
                type="button"
                className="bg-blue-500 text-white py-3 my-6 flex items-center justify-center  px-6 rounded-md text-lg hover:bg-blue-600"
              >
                <div role="status">
                  <svg
                    aria-hidden="true"
                    className="w-8 h-8 text-gray-200 animate-spin fill-blue-600"
                    viewBox="0 0 100 101"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
                      fill="currentColor"
                    />
                    <path
                      d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
                      fill="currentFill"
                    />
                  </svg>
                  <span className="sr-only">Loading...</span>
                </div>
              </button>
            )}
          </form>
        </Wrapper>
      </Layout>
    </>
  );
};

export default Notification;
