import React, { useEffect, useState } from 'react'
import Layout from '../components/Layout'
import TopBar from '../components/commoncomponents/TopBar'
import MonthPicker from '../components/commoncomponents/MonthPicker';
import YearPicker from '../components/commoncomponents/YearPicker';
import CustomTable from '../components/commoncomponents/Table';
import { FaFileUpload } from "react-icons/fa";
import { MdEditSquare } from "react-icons/md";
import { PARLOUR_DETAILS, PARLOUR_UPLOADSPDF, POORDERS_FILTER, POORDERS_TABLE } from '../services/crm/user.service';
import toast from 'react-hot-toast';
import SettelmentModal from '../components/commoncomponents/SettelmentModal';
import PickDate from '../components/commoncomponents/PickDate';
import { Button, TextField } from '@mui/material';
import EndDate from '../components/commoncomponents/EndDate';
import EditStatusModal from '../components/commoncomponents/EditStatusModal';
import SalonSelect from '../components/commoncomponents/SalonSelect';
import StatusSelect from '../components/commoncomponents/StatusSelect';
const Settelment = () => {
  const months = [
    "January", "February", "March", "April", "May", "June", 
"July", "August", "September", "October", "November", "December"
];
const years = [
  "2000", "2001", "2002", "2003", "2004", "2005", "2006", "2007", "2008", "2009",
  "2010", "2011", "2012", "2013", "2014", "2015", "2016", "2017", "2018", "2019",
  "2020", "2021", "2022", "2023", "2024", "2025", "2026", "2027", "2028", "2029",
  "2030", "2031", "2032", "2033", "2034", "2035", "2036", "2037", "2038", "2039",
  "2040", "2041", "2042", "2043", "2044", "2045", "2046", "2047", "2048", "2049", "2050"
];
  const currentYear = new Date().getFullYear();
  const currentMonth = new Date().getMonth();
  const [salonsDetails, setSalonsDetails] = useState([]);
  const defaultStartDate = new Date();
  const [startDate, setStartDate] = useState(defaultStartDate);
  const [endDate, setEndDate] = useState(defaultStartDate);
  const [open, setOpen] = React.useState(false);
  const [selectedSalonId, setSelectedSalonId] = useState(null);
  const [newUpload,setNewUpload] = useState(false)
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(10);
  const [totalPO, setTotalPO] = useState(0);
  const [status,setStatus] = useState("")
  const [salonType,setSalonType] = useState("")
  const [search,setSearch] = useState("")
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const columns = [
    { id: 'poId', label: 'PO Number' },
    { id: 'trade', label: 'Trade Name' },
    { id: 'salonid', label: 'salonid' },
    { id: 'name', label: 'Category' },
    { id: 'location', label: 'Location' },
    { id: 'address', label: 'Address' },
    { id: 'contactNum', label: 'Phone Number' },
    { id: 'status', label: 'Status' },
    { id: 'createdAt', label: 'Ordered Date' },
    { id: 'receivedAt', label: 'Received Date' },
  
  ];
  console.log("salonsDetails",salonsDetails)
  function createData(poId,trade,salonid,name,location,contactNum,address,status,createdAt,receivedAt,id) {
    return { poId,trade,salonid,name,location,contactNum,address,status:getStatus(status),createdAt,receivedAt,id };
  }
  useEffect(()=>{
    const fetchApi=async()=>{
      const parlors = await POORDERS_FILTER ({search,salonType,status,startDate,endDate,page,rowsPerPage});
      console.log("parlors",parlors.data)
        setSalonsDetails(parlors?.data)
        setTotalPO(parlors?.total)
        
  
    }
    fetchApi()
  },[page,rowsPerPage,startDate,endDate,open,search,salonType,status])
  const handleRowClick = (salonId) => {
    setSelectedSalonId(salonId);
  };
  function getStatus(statusCode) {
    switch (statusCode) {
      case 1:
        return "Placed";
      case 2:
        return "Received/Delivered";
      case 3:
        return "Canceled";
      case 4:
        return "Accepted";
      case 5:
        return "Packaging";
      case 6:
        return "Dispatch";
      default:
        return "Unknown Status";
    }
  }
  function formatDateToFull(dateString) {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      day: 'numeric',
      month: 'short', // 'short' will give abbreviated month names like 'May', 'Jun'
      year: 'numeric'
    });
    
  }
  // salon?.trade
  console.log("selected id",selectedSalonId)
   const rows = salonsDetails?.map((salon)=> createData(salon?.poId,salon?.trade,salon?._id,salon?.name,salon?.address2,salon?.contactNum,salon?.address,salon?.status,formatDateToFull(salon?.createdAt),salon?.receivedAt,salon?._id));
   const handleStatusChange = (event) => {
    setStatus(event.target.value);
  };
   const handleSalonTypeChange = (event) => {
    setSalonType(event.target.value);
  };

  console.log("rows",rows)
  console.log("dates",startDate,endDate)
  return (
    <Layout>
    <div className='w-full flex flex-col'>
      <TopBar title="PO Orders"/>
      <div className='w-[80%] mx-auto flex justify-center items-center gap-4 mt-4 absolute z-20 top-20'>
          <div className='flex flex-col'>
            <label className='text-black  text-lg font-medium font-serif'>Start Date :</label>
          <PickDate datte={startDate}
              setDatte={setStartDate} />
          </div>
          <div className='flex flex-col'>
            <label className='text-black  text-lg font-medium font-serif'>End Date :</label>
          <EndDate datte={endDate}
              setDatte={setEndDate} startDate={startDate} />
          </div>
              {/* <Button variant="contained" className='mt-8'>Search</Button> */}
       </div>
       <div className="w-[90%] mx-auto flex justify-between items-center mt-32">
       <TextField id="outlined-basic" label="search..." variant="outlined" className='w-[350px]'value={search} onChange={(e)=>setSearch(e.target.value)} />
        <SalonSelect value={salonType} setValue={setSalonType} handleChange={handleSalonTypeChange}/>
        <StatusSelect value={status} setValue={setStatus} handleChange={handleStatusChange}/>
      </div>   
      <div className='w-[90%] mx-auto'>
      <CustomTable headings={columns} rows={rows} page={page} setPage={setPage} rowsPerPage={rowsPerPage} setRowsPerPage={setRowsPerPage} totalOrders={totalPO} handleRowClick={handleRowClick} handleOpen={handleOpen}/>
      
      </div>
    </div>
    {/* <EditStatusModal open={editOpen} setOpen={setEditOpen} handleClose={handleEditClose} salonId={selectedSalonId}/> */}
    <SettelmentModal open={open} setOpen={setOpen} handleOpen={handleOpen} handleClose={handleClose} newUpload={newUpload} salonId={selectedSalonId}/>
    </Layout>
  )
}

export default Settelment