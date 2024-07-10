import React, { useEffect, useState } from 'react'
import Layout from '../components/Layout'
import TopBar from '../components/commoncomponents/TopBar'
import MonthPicker from '../components/commoncomponents/MonthPicker';
import YearPicker from '../components/commoncomponents/YearPicker';
import CustomTable from '../components/commoncomponents/Table';
import { FaFileUpload } from "react-icons/fa";
import { PARLOUR_DETAILS, PARLOUR_UPLOADSPDF, POORDERS_TABLE } from '../services/crm/user.service';
import toast from 'react-hot-toast';
import SettelmentModal from '../components/commoncomponents/SettelmentModal';
import PickDate from '../components/commoncomponents/PickDate';
import { Button } from '@mui/material';
import EndDate from '../components/commoncomponents/EndDate';
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
  const [totalSalons, setTotalSalons] = useState(0);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const columns = [
    { id: 'name', label: 'Name' },
    { id: 'location', label: 'Location' },
    { id: 'address', label: 'Address' },
    { id: 'contactNum', label: 'Phone Number' },
    { id: 'status', label: 'Status' },
  ];
  
  function createData(name,location,contactNum,address,status,id) {
    return { name,location,contactNum,address,status,id };
  }
  useEffect(()=>{
    const fetchApi=async()=>{
      const parlors = await POORDERS_TABLE({page:page, limit:rowsPerPage,data:{startDate,endDate}});
      console.log("parlors",parlors)
        setSalonsDetails(parlors)
  
    }
    fetchApi()
  },[page,rowsPerPage,startDate,endDate])
  const handleRowClick = (salonId) => {
    setSelectedSalonId(salonId);
  };
  console.log("selected id",selectedSalonId)
   const rows = salonsDetails?.map((salon)=> createData(salon?.name,salon?.address2,salon?.contactNum,salon?.address,salon?.status,salon?._id));
  //  const searchClick=()=>{

  //  }
  console.log("dates",startDate,endDate)
  return (
    <Layout>
    <div className='w-full flex flex-col'>
      <TopBar title="Settelment"/>
      <div className='w-[90%] mx-auto flex justify-center items-center gap-4 mt-4 absolute z-20 top-20'>
          <div className='flex flex-col'>
            <label>Start Date :</label>
          <PickDate datte={startDate}
              setDatte={setStartDate} />
          </div>
          <div className='flex flex-col'>
            <label>End Date :</label>
          <EndDate datte={endDate}
              setDatte={setEndDate} startDate={startDate} />
          </div>
              {/* <Button variant="contained" className='mt-8'>Search</Button> */}
       </div>   
      <div className='w-[90%] mx-auto mt-24'>
      <CustomTable headings={columns} rows={rows} page={page} setPage={setPage} rowsPerPage={rowsPerPage} setRowsPerPage={setRowsPerPage} totalOrders={totalSalons} handleRowClick={handleRowClick} handleOpen={handleOpen}/>
      </div>
    </div>
    <SettelmentModal open={open} setOpen={setOpen} handleOpen={handleOpen} handleClose={handleClose} newUpload={newUpload} salonId={selectedSalonId}/>
    </Layout>
  )
}

export default Settelment