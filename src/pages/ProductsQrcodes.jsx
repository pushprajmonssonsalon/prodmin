import { useEffect, useMemo, useState } from "react";
import Layout from "../components/Layout";
import TopBar from "../components/commoncomponents/TopBar";
import Wrapper from "../components/commoncomponents/Wrapper";
import {
  ADD_QR_TO_PRODUCT,
  ADD_VIDEO_TO_PRODUCT,
  SALONCART_PRODUCTS,
} from "../services/pro/user.service";
import TailwindTable from "../components/table/TailwindTable";
import SearchInput from "../components/commoncomponents/inputs/SearchInput";
import useDebouncer from "../services/utils/hooks/useDebouncer";
import SelectInput from "../components/commoncomponents/inputs/SelectInput";
import ChooseVideo from "../components/modals/ChooseVideo";
import toast from "react-hot-toast";
import { GET_ALL_VEDIOS } from "../services/crm/user.service";

const ProductsQrcodes = () => {
  const [showVideoModal, setShowVideoModal] = useState(false);
  const [videos, setVideos] = useState([]);
  const [selectedProductId, setSelectedProductId] = useState(null);
  const [products, setProducts] = useState([]);
  const [fileredProducts, setFilteredProducts] = useState(products);
  const [search, setSearch] = useState("");
  const [brand, setBrand] = useState("");
  const inputs = {
    name: "",
    brand: "",
    type: "",
  };
  const brands = ["Loreal", "Skinconyc", "Argatin", "Spring H2O"];
  const { debouncedFunction } = useDebouncer();
  const cols = [
    { id: "name", label: "Product Name" },
    { id: "mrp", label: "Mrp" },
    { id: "price", label: "Price" },
    { id: "images", label: "Image" },
    { id: "qrcode", label: "Qr Code" },
    { id: "video", label: "Video" },
  ];
  useEffect(() => {
    (async () => {
      const data = {
        brands: {
          ...(brand && { [brand]: true }),
        },
      };
      SALONCART_PRODUCTS(data)
        .then((res) => {
          setProducts(res);
        })
        .catch(() => {});
    })();
  }, [brand]);
  const handleSearch = (e) => {
    const { value } = e.target;
    setSearch(value);
  };

  const func = () => {
    setFilteredProducts(
      products.filter((elm) =>
        elm.name.toLowerCase().includes(search?.toLowerCase().trim())
      )
    );
  };

  useEffect(() => {
    if (search) {
      console.log("inside if");
      debouncedFunction(func, 300);
    } else {
      console.log("inside else");

      setFilteredProducts(products);
    }
  }, [search, products]);

  const getVideo = (id) => {
    const selectedVideo = videos?.find((elm) => elm._id === id);
    return selectedVideo;
  };

  const handleAddVideo = (id) => {
    setSelectedProductId(id);
    setShowVideoModal(true);
  };
  const handleAddQrcode = (id) => {
    ADD_QR_TO_PRODUCT(id)
      .then((res) => {
        if (res) {
          setProducts((prev) =>
            prev.map((elm) => (elm._id === id ? { ...elm, qrcode: res } : elm))
          );
          toast.success("Qr Added");
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };
  const handleSubmit = (index) => {
    const payload = {
      productId: selectedProductId,
      videoId: videos[index]?._id,
    };
    if (!selectedProductId || !videos[index]?._id) {
      toast.error("select a video");
      return;
    }
    ADD_VIDEO_TO_PRODUCT(payload)
      .then((res) => {
        console.log(res, "res");
        if (res) {
          setProducts((prev) =>
            prev.map((elm) =>
              elm._id === selectedProductId
                ? { ...elm, video: videos[index]?._id }
                : elm
            )
          );
          setShowVideoModal(false);
          toast.success("Video Added");
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };
  const rows = useMemo(() => {
    return fileredProducts.map((elm) => {
      const videoDetails = getVideo(elm?.video);

      return {
        ...elm,
        images: (
          <a
            href={`${elm?.images[0]}`}
            target="_blank"
            rel="noopener noreferrer"
          >
            <img
              loading="lazy"
              className="h-[80px] w-[80px]"
              src={elm?.images[0]}
              alt="product"
            />
          </a>
        ),
        video: elm?.video ? (
          <a
            href={`${videoDetails?.url}`}
            target="_blank"
            rel="noopener noreferrer"
          >
            <img
              className="h-[100px] w-full border border-gray-200"
              loading="lazy"
              src={videoDetails?.thumbnailUrl}
              alt="video thumbnail"
            />
          </a>
        ) : (
          <button
            onClick={() => handleAddVideo(elm?._id)}
            className="bg-green-600 text-white font-medium rounded hover:ring-2 hover:bg-green-500 active:scale-105 transition-all ease-in duration-100 py-2 px-6"
          >
            Add video
          </button>
        ),
        qrcode: elm?.qrcode ? (
          <a
            href={elm.qrcode} // Ensure correct Base64 format
            target="_blank"
            rel="noopener noreferrer"
          >
            <img
              loading="lazy"
              className="h-[80px] w-[80px]"
              src={elm?.qrcode}
              alt="QR code"
            />
          </a>
        ) : (
          <button
            onClick={() => handleAddQrcode(elm?._id)}
            className="bg-green-600 text-white font-medium rounded hover:ring-2 hover:bg-green-500 active:scale-105 transition-all ease-in duration-100 py-2 px-6"
          >
            Generate
          </button>
        ),
      };
    });
  }, [fileredProducts, videos]);

  useEffect(() => {
    (() => {
      GET_ALL_VEDIOS("", "video")
        .then((res) => {
          setVideos(res);
        })
        .catch(() => {
          console.log("error fetching videos");
        });
    })();
  }, []);
  return (
    <>
      <Layout>
        <div className="w-full flex flex-col">
          <TopBar title="Product QrCodes" />
        </div>
        <Wrapper>
          <div className="w-full mb-6 ">
            <div className="flex justify-between w-full  mb-8">
              <SearchInput
                name="search"
                placeholder="Product Name"
                value={search}
                onChange={handleSearch}
              />

              <SelectInput
                name="brand"
                value={brand}
                options={brands}
                handleChange={(e) => setBrand(e.target.value)}
              />
            </div>
            <TailwindTable
              cols={cols}
              rows={rows}
              isEditable={false}
              onUpdate={() => {}}
              isProduct={false}
            />
          </div>
          <ChooseVideo
            videos={videos}
            onSubmit={handleSubmit}
            show={showVideoModal}
            setShow={setShowVideoModal}
          />
        </Wrapper>
      </Layout>
    </>
  );
};

export default ProductsQrcodes;
