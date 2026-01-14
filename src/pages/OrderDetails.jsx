import { useState } from 'react'
import TopBar from '../components/commoncomponents/TopBar'
import Wrapper from '../components/commoncomponents/Wrapper'
import Layout from '../components/Layout'
import SearchInput from '../components/commoncomponents/inputs/SearchInput'
import { CREATE_IN_EASYCOM, FETCH_SINGLE_ORDER } from '../services/pro/user.service'
import formatDateToFull from '../services/utils/formatDate'
import toast from 'react-hot-toast'
import useDebouncer from '../services/utils/hooks/useDebouncer'

const statusOptions = [
  { value: "1", label: "Placed" },
  { value: "7", label: "Shipped" },
  { value: "3", label: "Delivered" },
  { value: "2", label: "Canceled" },
  { value: "4", label: "RTO" },
  { value: "6", label: "Undelivered/Attempted" },
];
export const orderStatusMap = {
  1: "Placed",
  7: "Shipped",
  3: "Delivered",
  2: "Canceled",
  4: "RTO",
  6: "Undelivered/Attempted",
};


const OrderDetails = () => {
    const [search,setSearch]=useState("");
  const [order, setOrder] = useState(null);
  const [loading,setLoading]=useState(false);
  const [status, setStatus] = useState("");
  const [remarks, setRemarks] = useState("");
  const [location, setLocation] = useState("");
  const {debouncedFunction}= useDebouncer()
   const getOrderStatus=(order)=>{

   }

  const handleUpdate = async () => {
 setLoading(true);
    if(!order?.numericOrderId)return toast.error("invalid order")
    try {
       const data={
        orderId:order?.numericOrderId
       }
      const res =await CREATE_IN_EASYCOM(data);
      if(!res){
        setLoading(false)
        throw new Error("order is already fetched or invalid order")
      }
      else{
                setLoading(false)

        toast.success(order?.numericOrderId+ "fetched in easycom")
      }

      
    } catch (error) {
              setLoading(false)

       toast.error(error.message)
    }
  }
  const handleOrder=async()=>{
    debouncedFunction(handleUpdate,500)
  }
  
    const handleSearch=(e)=>{
        setSearch(e.target.value)
    }
    const fetchOrder=async()=>{
 try {
        const res = await FETCH_SINGLE_ORDER(search)
        if(res){
          setOrder(res);
  setStatus(res.status);

        }else{
           toast.error("order not fetched")
        }
     } catch (error) {
      setOrder(null)
     }
    }
    const handleSearchOrder=()=>{
     debouncedFunction(fetchOrder,500)
    }
  return (
    <>
         <Layout>
        <div className="w-full flex flex-col">
          <TopBar title="Order Details" />
        </div>
        <Wrapper>
          <div className="w-full mb-6 ">
            <div className="flex justify-between w-full  mb-8">
            <div className='flex items-center gap-3'>
                        <SearchInput
                name="search"
                placeholder="Order id"
                value={search}
                onChange={handleSearch}
              />
            <button className='bg-blue-500 rounded-md text-white px-6 py-2' onClick={handleSearchOrder}>Search</button>
            </div>
 

            </div>
           <div>
          
                  {order&&    <div className="p-6 space-y-6">
      <h2 className="text-2xl font-semibold text-gray-800">Order Details</h2>
       <div className='flex items-center justify-end'>
               <button
               disabled={loading}
            onClick={handleOrder}
            className="bg-blue-500 hover:bg-blue-600 text-white px-5 py-2 rounded-lg transition"
          >
            Update In Easycom
          </button>
           </div>
      {/* Order Info */}
      <div className="bg-white shadow rounded-xl p-5 border border-gray-200">
        <h3 className="text-lg font-semibold mb-3 text-gray-700">
          Basic Information
        </h3>
        <div className="grid md:grid-cols-2 gap-3 text-gray-700">
          <p><strong>Order ID:</strong> {order?.numericOrderId}</p>
          <p><strong>Status:</strong> {orderStatusMap[order?.status]}</p>
          <p><strong>Total Payable:</strong> ₹{order?.totalPayableAmount?.toFixed(2)}</p>
          <p><strong>Payment Method:</strong> {order?.paymentMethod === 1 ? "Cash" : "Online/UPI"}</p>
          <p><strong>Created At:</strong> {formatDateToFull(order?.createdAt)}</p>
        </div>
      </div>

      {/* Address */}
      <div className="bg-white shadow rounded-xl p-5 border border-gray-200">
        <h3 className="text-lg font-semibold mb-3 text-gray-700">Shipping Address</h3>
        <div className="text-gray-700 space-y-1">
          <p><strong>Name:</strong> {order?.addresses?.name}</p>
          <p><strong>Phone:</strong> {order?.addresses?.phoneNumber}</p>
          <p><strong>Address:</strong> {order?.addresses?.address}</p>
          <p><strong>City:</strong> {order?.addresses?.city}</p>
          <p><strong>Pincode:</strong> {order?.addresses?.pincode}</p>
          <p><strong>State:</strong> {order?.addresses?.state}</p>
        </div>
      </div>

      {/* Products */}
      <div className="bg-white shadow rounded-xl p-5 border border-gray-200">
        <h3 className="text-lg font-semibold mb-3 text-gray-700">Products</h3>
        <div className="divide-y">
          {order?.products.map((p, i) => (
            <div key={i} className="py-2 flex justify-between items-center text-gray-700">
              <div>
                <p className="font-medium">{p.name}</p>
                <p className="text-sm text-gray-500">Qty: {p.quantity}</p>
              </div>
              <p>₹{p.price}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Update Order Section */}
      <div className="bg-white shadow rounded-xl p-5 border border-gray-200">
        <h3 className="text-lg font-semibold mb-3 text-gray-700">Update Order</h3>

        <div className="space-y-4">
          <div>
            <label className="block mb-1 font-medium text-gray-600">Status</label>
            <select
              value={status}
              onChange={(e) => setStatus(e.target.value)}
              className="w-full border rounded-lg p-2 focus:ring-2 focus:ring-indigo-500 focus:outline-none"
            >
              <option value="">Select Status</option>
              {statusOptions.map((opt) => (
                <option key={opt.value} value={opt.value}>
                  {opt.label}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="block mb-1 font-medium text-gray-600">Remarks</label>
            <textarea
              value={remarks}
              onChange={(e) => setRemarks(e.target.value)}
              placeholder="Enter remarks..."
              className="w-full border rounded-lg p-2 h-20 focus:ring-2 focus:ring-indigo-500 focus:outline-none"
            ></textarea>
          </div>

          <div>
            <label className="block mb-1 font-medium text-gray-600">Location</label>
            <input
              type="text"
              value={location}
              onChange={(e) => setLocation(e.target.value)}
              placeholder="Enter location"
              className="w-full border rounded-lg p-2 focus:ring-2 focus:ring-indigo-500 focus:outline-none"
            />
          </div>

          {/* <button
            onClick={handleUpdate}
            className="bg-indigo-600 hover:bg-indigo-700 text-white px-5 py-2 rounded-lg transition"
          >
            Update / Ship Order
          </button> */}
        </div>
      </div>

    
    </div>}
           </div>
          </div>
         
        </Wrapper>
      </Layout>
          </>
  )
}

export default OrderDetails