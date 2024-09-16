import { useEffect, useRef, useState } from "react";

const initialData = {
  title: "",
  description: "",
  duration: 0,
  type: "",
  brand: "",
  url: "",

  thumbnailUrl: "",
};
const SingleVideo = ({ video, brands, onUpdate }) => {
  const videoRef = useRef(null);

  const [videoData, setVideoData] = useState(initialData);
  const labelFields = {
    title: "Video Title",
    brand: "Brand Name",
    description: "Description",
    duration: "Vedio Duration",
    type: "Vedio Type",
    thumbnailUrl: "Thumbnail Url",
    url: "Vedio Url",
  };

  const handleChange = (e) => {
    const { name, value } = e.target;

    setVideoData({
      ...videoData,
      [name]: e.target.type === "number" ? parseFloat(value) : value,
    });
  };
  // / Function to handle loaded metadata (video duration)
  const handleLoadedMetadata = () => {
    const videoDuration = videoRef.current.duration;
    setVideoData((prev)=>({
      ...prev,
      duration:videoDuration.toFixed(2)
    }))
    console.log("duration", videoDuration);
  };

  // Function to handle time update (current video time)
  const handleTimeUpdate = () => {
    const currentVideoTime = videoRef.current.currentTime;
    console.log("duration", currentVideoTime);
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    onUpdate(videoData);
  };
  useEffect(() => {
    setVideoData(video);
  }, [video]);
  return (
    <>
      <form onSubmit={handleSubmit} className="w-full">
        <div className="grid grid-cols-1  gap-4">
          {Object.keys(initialData).map((key, index) => (
            <div key={index} className="flex flex-col my-0">
              <label htmlFor={key} className="mb-2 font-medium text-gray-700">
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
                  type={typeof videoData[key] === "number" ? "number" : "text"}
                  id={key}
                  name={key}
                  className="border-2 outline-none order-gray-300 focus:ring-2 boutline-none p-2 rounded-md"
                  value={videoData[key]}
                  onChange={handleChange}
                />
              )}
            </div>
          ))}
        </div>
        {videoData.url && (
          <video
            ref={videoRef}
            
            className="my-6 h-[300px] w-[300px]"
            controls
            onLoadedMetadata={handleLoadedMetadata}
            onTimeUpdate={handleTimeUpdate}
          >
            <source src={videoData.url} type="video/mp4" />
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
    </>
  );
};

export default SingleVideo;
