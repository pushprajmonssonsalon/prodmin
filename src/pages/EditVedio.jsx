import { useEffect, useState } from "react";
import Layout from "../components/Layout";
import TopBar from "../components/commoncomponents/TopBar";
import Wrapper from "../components/commoncomponents/Wrapper";
import SelectInput from "../components/commoncomponents/inputs/SelectInput";
import TailwindTable from "../components/table/TailwindTable";
import { GET_ALL_VEDIOS, UPDATE_VEDIO } from "../services/crm/user.service";
import SingleVideo from "../components/commoncomponents/SingleVideo";
import toast from "react-hot-toast";

const generateRandomData = (numRows) => {
  const data = [];
  for (let i = 0; i < numRows; i++) {
    data.push({
      title: `Video Title ${i + 1}`,
      brand: `Brand ${Math.floor(Math.random() * 100)}`,
      id: `P${Math.floor(Math.random() * 100000)}`,
      url: `https://example.com/video${i + 1}`,
      thumbnail: `https://via.placeholder.com/150?text=Thumbnail+${i + 1}`,
    });
  }
  return data;
};

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
  const rows = generateRandomData(numRows);
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
    setSelectedVideo(item);
  };
  
  const handleUpdate=(video)=>{
    (()=>{
         UPDATE_VEDIO(video).then((res)=>{
            if(res){
              toast.success("Vedio Updated")
              setVideos((prev)=>prev.map((item)=>{
                 if(item._id===video._id){
                    return video
                 }
                 return item
              }))
              setSelectedVideo(null)
            }

         }).catch(()=>{
            toast.error("error updating")
            
         })
    })()

  }

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
  return (
    <>
      <Layout>
        <div className="w-full flex flex-col">
          <TopBar title="Edit Video" />
        </div>
        <Wrapper>
          {selectedVideo ? (
            <SingleVideo video={selectedVideo} brands={brandsOptions} onUpdate={handleUpdate}/>
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
                rows={videos}
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
