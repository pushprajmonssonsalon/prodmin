import { useEffect, useState } from "react";
import Layout from "../components/Layout";
import TopBar from "../components/commoncomponents/TopBar";
import Wrapper from "../components/commoncomponents/Wrapper";
import { SALONCART_PRODUCTS } from "../services/pro/user.service";
import TailwindTable from "../components/table/TailwindTable";
import SearchInput from "../components/commoncomponents/inputs/SearchInput";
import useDebouncer from "../services/utils/hooks/useDebouncer";
import SelectInput from "../components/commoncomponents/inputs/SelectInput";

const ProductsQrcodes = () => {
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
    { id: "image", label: "Qr Code" },
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
  const rows = fileredProducts.map((elm) => ({
    ...elm,
    images: (
      <a href={`${elm.images[0]}`} target="_blank">
        <img className="h-[80px] w-[80px]" src={elm.images[0]} />
      </a>
    ),
    image: elm.qrcode ? (
      <a href={`${elm.images[0]}`} target="_blank">
        <img className="h-[80px] w-[80px]" src={elm.images[0]} />
      </a>
    ) : (
      <button className="bg-green-600 text-white font-medium rounded hover:ring-2 hover:bg-green-500 active:scale-105 transition-all ease-in duration-100 py-2 px-6">
        {" "}
        Generate
      </button>
    ),
  }));
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
        </Wrapper>
      </Layout>
    </>
  );
};

export default ProductsQrcodes;
