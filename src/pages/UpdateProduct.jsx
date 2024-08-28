import { useEffect, useState } from "react";
import TopBar from "../components/commoncomponents/TopBar";
import Layout from "../components/Layout";
import { EDIT_INVENTORY, GET_ALL_PRODUCTS, GET_BRANDS } from "../services/crm/user.service";
import TailwindTable from "../components/table/TailwindTable";
import { MdOutlineSearch } from "react-icons/md";
import Pagination from "../components/pagination/Pagination";
import GridRows from "../components/pagination/GridRows";
import toast from "react-hot-toast";
import Wrapper from "../components/commoncomponents/Wrapper";

const inputs = {
  name: "",
  brand: "",
  type: "",
};
const initialData = {
  page: 0,
  limit: 10,
  ...inputs,
};
const types =[ "Retail" , "Professional"]
// Generator function to create random product data


// Generate 10 random products

const UpdateProduct = () => {
  const numProducts = 100;

  const [products, setProducts] = useState([]);
  const [totalCount, setTotalCount] = useState(0);
  const [brands, setBrands] = useState([]);
  const [formData, setFormData] = useState(initialData);
  const [itemsPerPage, setItemsPerPage] = useState(10);

  const [currentPage, setCurrentPage] = useState(1);
// Calculate the product rows for the current page


  const onPageChange = (page) => {
    setCurrentPage(page);
  }; 

  const cols = [
    { id: "name", label: "Name" },
    { id: "brand", label: "Brand" },
    { id: "mrp", label: "Mrp" },
    { id: "type", label: "Type" },
    { id: "size", label: "Size" },
    { id: "unit", label: "Unit" },
  ];

  const handleChange = (e) => {
    const { value, name } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };
  
  const handleRowschange=(e)=>{
    const {value}  = e.target;
    setItemsPerPage(+value)

  } 
  const handleUpdate=(item)=>{
   EDIT_INVENTORY({products:[item]}).then((res)=>{
      if(res){
        toast.success("product updated")
        setProducts((prev)=>prev.map((elm)=>{
          if(elm._id===item._id){
            return item
          }
          else{
            return elm
          }
        }))
        return true
      }
       return false
    }).catch(()=>{
      toast.error("error updating")
       return false
    });
   
  }
  
  useEffect(() => {
    (async () => {
      try {
        const res = await GET_BRANDS();
        console.log(res);
        if (res) {
          setBrands(res);
        }
      } catch (error) {
        console.log("Error fetching brands");
      }
    })();
  }, []);
  useEffect(() => {
    // Debounce function for API call
    let timeoutId;
    const debouncedFetchData = () => {
      timeoutId = setTimeout(() => {
        fetchProducts(); // Function to fetch data from API
      }, 500); // 500ms debounce delay
    };

    // Call debouncedFetchData whenever formData or currentPage changes
    debouncedFetchData();

    // Cleanup function to clear timeout on component unmount
    return () => clearTimeout(timeoutId);
  }, [formData, currentPage,itemsPerPage]); // Add formData as dependency

  const fetchProducts = async () => {
    try {
      const data = {
        page: currentPage,
        limit: itemsPerPage,
        ...formData, // Include formData in API request
      };
      const resp = await GET_ALL_PRODUCTS(data, itemsPerPage, currentPage);
      setProducts(resp?.products);
      setTotalCount(resp?.total);
    } catch (error) {
      console.error("Error fetching products:", error);
    }
  };

  console.log(formData, "products");
  return (
    <Layout>
      <div className="w-full flex flex-col">
        <TopBar title="Edit Product" />
      </div>
     <Wrapper>
        <div className=" grid grid-cols-1  sm:grid-cols-3 gap-5">
          {Object.keys(inputs).map((key) =>
            key !== "name" ? (
              <select
                id={key}
                className="border w-sm border-gray-300 focus:ring-2 outline-none p-2 rounded-md  text-sm text-gray-900   focus:ring-blue-400  "
                name={key}
                value={formData[key]}
                onChange={handleChange}
              >
                <option value="">{`Choose a ${key}`}</option>
                {key==="brand"? brands?.length > 0 &&
                  brands?.map((brand, index) => (
                    <option key={index} value={brand}>
                      {brand}
                    </option>
                  )):brands?.length > 0 &&
                  types?.map((brand, index) => (
                    <option key={index} value={brand}>
                      {brand}
                    </option>
                  ))}
              </select>
            ) : (
              <div className="relative flex items-center">
                <MdOutlineSearch
                  size={20}
                  className="absolute text-gray-400 translate-x-[70%]"
                />

                <input
                  type="text"
                  id={key}
                  name={key}
                  className="border w-full border-gray-300 focus:ring-2 outline-none p-2 rounded-md ps-10 text-sm text-gray-900   focus:ring-blue-400  "
                  placeholder={`Product ${key}`}
                  value={formData[key]}
                  onChange={handleChange}
                />
              </div>
            )
          )}
        </div>
        
        <GridRows itemsPerPage={itemsPerPage} handleRowschange={handleRowschange}/>
        <TailwindTable
          cols={cols}
          rows={products}
          onUpdate={handleUpdate}
        />
         {totalCount>0&&  <Pagination
        totalItems={totalCount}
        itemsPerPage={itemsPerPage}
        currentPage={currentPage}
        onPageChange={onPageChange}
      />}
      </Wrapper>
          </Layout>
  );
};

export default UpdateProduct;
