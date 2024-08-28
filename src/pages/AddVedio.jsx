import { useState } from "react";
import TopBar from "../components/commoncomponents/TopBar";
import Layout from "../components/Layout";
import FileInput from "../components/commoncomponents/FileInput";
import { CREATE_VEDIO, UPLOAD_THUMBNAIL, UPLOAD_VIDEO } from "../services/crm/user.service";
import toast from "react-hot-toast";
import Wrapper from "../components/commoncomponents/Wrapper";

const initialData={
  title: "",
  description: "",
  brand: "",
  url: "https://d16a6xzchwrohg.cloudfront.net/thumbnail/Function.png",
  id: "2883jjdfhffhfhfuf9",
  
  thumbnail: null,
}
const AddVedio = () => {
  const [videoData, setVideoData] = useState(initialData);
  const brands = ["Argatin", "Loreal","Skinco","Spring"];

  const [videoUrl, setVideoUrl] = useState("");

  const labelFields = {
    title: "Video Title",
    brand: "Brand Name",
    description: "Description",
    id:"Product Id",
    thumbnail: "Thumbnail",
    url: "Vedio",
  };
  const handleChange = (e) => {
    const { name, value } = e.target;

    setVideoData({
      ...videoData,
      [name]: value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    CREATE_VEDIO(videoData).then(()=>{
      setVideoData(initialData)
      toast.success("Vedio Saved")
    }).catch(()=>{
      toast.error("Error Uploading")
    })

    // Handle form submission logic here
  };
  const handleFileChange = (event) => {
    const { files, name } = event.target;
    const file = files[0];
    const formData = new FormData();

    if (file) {
      if (file.type.includes("video")) {
        formData.append("video", file);

        UPLOAD_VIDEO(formData)
          .then((res) => {
            if (res) {
              console.log(res);
              setVideoData((prev) => ({ ...prev, url: res }));
            }
          })
          .catch(() => {
            console.log("error uploading file");
          });
      } else {
        formData.append("thumbnail", file);

        UPLOAD_THUMBNAIL(formData)
          .then((res) => {
            if (res) {
              setVideoData((prev) => ({
                ...prev,
                thumbnail: res,
              }));
            }
          })
          .catch(() => {
            console.log("error uploading file");
          });
      }

      // Create a temporary video element to get video metadata
    } else {
      alert("Please upload a valid video file");
    }
  };

  console.log(videoData, "videoData");

  return (
    <>
      <Layout>
        <div className="w-full flex flex-col">
          <TopBar title="Add Vedio" />
        </div>
        <Wrapper>
        <form
          onSubmit={handleSubmit}
          className="w-full"
        >
          <div className="grid grid-cols-1  gap-4">
            {Object.keys(videoData)
              .filter((item) => item !== "url" && item !== "thumbnail")
              .map((key, index) => (
                <div key={index} className="flex flex-col my-0">
                  <label
                    htmlFor={key}
                    className="mb-2 font-medium text-gray-700"
                  >
                    {labelFields[key]}
                  </label>
                  {key === "description" ? (
                    <textarea
                      id={key}
                      name={key}
                      rows={4}
                      value={videoData.description}
                      className="border-2 outline-none order-gray-300 focus:ring-2 boutline-none p-2 rounded-md"
                      onChange={handleChange}
                      placeholder="Write description here..."
                      defaultValue={""}
                    />
                  ) : key === "brand" ? (
                    <select
                      id={key}
                      className="border border-gray-300 p-2 rounded-md outline-none focus:ring-2"
                      name={key}
                      value={videoData?.brand}
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
                  ) : (
                    <input
                      type="text"
                      id={key}
                      name={key}
                      className="border-2 outline-none order-gray-300 focus:ring-2 boutline-none p-2 rounded-md"
                      value={videoData[key]}
                      onChange={handleChange}
                    />
                  )}
                </div>
              ))}

            <div className="flex flex-col my-0">
              <label htmlFor="video" className="mb-2 font-medium text-gray-700">
                Vedio
              </label>
              <FileInput
                name="video"
                handleUpload={handleFileChange}
                type="mp4"
              />
            </div>
            <div className="flex flex-col my-0">
              <label
                htmlFor="thumbnail"
                className="mb-2 font-medium text-gray-700"
              >
                Thumbnail
              </label>
              <FileInput
                name="thumbnail"
                handleUpload={handleFileChange}
                type="SVG, PNG, JPG"
              />
            </div>
          </div>

          {videoData?.thumbnail && (
            <div className="h-[100px] mt-4 w-[100px] ">
              <img
                src={videoData?.thumbnail}
                className="object-cover h-full w-full "
              />
            </div>
          )}
          {videoUrl && (
            <video width="100%" controls>
              <source src={videoUrl} type="video/mp4" />
              Your browser does not support the video tag.
            </video>
          )}
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

export default AddVedio;
