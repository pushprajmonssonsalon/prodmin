import { useEffect, useState } from "react";
import Layout from "../components/Layout";
import TopBar from "../components/commoncomponents/TopBar";
import Wrapper from "../components/commoncomponents/Wrapper";
import SelectInput from "../components/commoncomponents/inputs/SelectInput";
import TailwindTable from "../components/table/TailwindTable";
import { GET_ALL_VEDIOS, UPDATE_VEDIO } from "../services/crm/user.service";
import SingleVideo from "../components/commoncomponents/SingleVideo";
import toast from "react-hot-toast";
import { FaExternalLinkAlt } from "react-icons/fa";



const EditVedio = () => {
  const [videos, setVideos] = useState([]);
  const [selectedVideo, setSelectedVideo] = useState(null);

  const [videoData, setVideoData] = useState({
    type: "",
    brand: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setVideoData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };
  const videoOptions = ["short", "video"];
  const brandsOptions = ["Argatin", "Skinco", "Spring"];
  // Example usage
  const numRows = 10; // Number of rows you want to generate
  const cols = [
    { id: "title", label: "Video Title" },
    { id: "brand", label: "Brand Name" },
    { id: "type", label: "Vedio Type" },
    { id: "duration", label: "Vedio Duration" },
    { id: "description", label: "Vedio Description" },

    { id: "url", label: "Vedio Url" },
    { id: "thumbnailUrl", label: "Thumbnail" },
  ];

  const handleSelect = (item) => {
    console.log(item);
    const selectedVideo =videos.find((elm)=>elm._id ===item._id)
    setSelectedVideo(selectedVideo);
  };

  const handleUpdate = (video) => {
    (() => {
      UPDATE_VEDIO(video)
        .then((res) => {
          if (res) {
            toast.success("Vedio Updated");
            setVideos((prev) =>
              prev.map((item) => {
                if (item._id === video._id) {
                  return video;
                }
                return item;
              })
            );
            setSelectedVideo(null);
          }
        })
        .catch(() => {
          toast.error("error updating");
        });
    })();
  };

  useEffect(() => {
    (() => {
      GET_ALL_VEDIOS(videoData.brand, videoData.type)
        .then((res) => {
       
          setVideos(res);
        })
        .catch(() => {
          console.log("error fetching videos");
        });
    })();
  }, [videoData]);
  const rows =videos.map((elm)=>({
    ...elm,
    url:<a href={`${elm.url}`} target="_blank"><FaExternalLinkAlt /></a>,
    thumbnailUrl:<a href={`${elm.thumbnailUrl}`} target="_blank"><img className="h-[80px] w-[80px]" src={elm.thumbnailUrl}/></a>,


  }))
  return (
    <>
      <Layout>
        <div className="w-full flex flex-col">
          <TopBar title="Edit Video" />
        </div>
        <Wrapper>
          {selectedVideo ? (
            <SingleVideo
              video={selectedVideo}
              brands={brandsOptions}
              onUpdate={handleUpdate}
            />
          ) : (
            <>
              <div className="w-full mb-6 flex gap-5 flex-wrap justify-between">
                <SelectInput
                  name="type"
                  value={videoData?.type}
                  options={videoOptions}
                  handleChange={handleChange}
                />
                <SelectInput
                  name="brand"
                  value={videoData?.brand}
                  options={brandsOptions}
                  handleChange={handleChange}
                />
              </div>

              <TailwindTable
                cols={cols}
                rows={rows}
                onUpdate={handleSelect}
                isProduct={false}
              />
            </>
          )}
        </Wrapper>
      </Layout>
    </>
  );
};

export default EditVedio;
