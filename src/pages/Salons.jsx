import React, { useEffect, useState } from 'react';
import Layout from '../components/Layout';
import TopBar from '../components/commoncomponents/TopBar';
import CustomTable from '../components/commoncomponents/Table';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { useAppContext } from '../services/context/AppContext';
import Wrapper from '../components/commoncomponents/Wrapper';

const Salons = () => {
    const navigate = useNavigate();
    const {expanded}=useAppContext();
    const [page, setPage] = useState(0);
    const [open, setOpen] = React.useState(false);
    const [rowsPerPage, setRowsPerPage] = useState(10);
    const [totalPO, setTotalPO] = useState(0);
    const [selectedSalonId, setSelectedSalonId] = useState(null);
    const [totalSalons, setTotalSalons] = useState(0);
    const [salonsDetails, setSalonsDetails] = useState([]);
    const handleOpen = () => setOpen(true);

    const columns = [
    { id: 'name', label: 'Name' },
    { id: 'location', label: 'Location' },
    { id: 'address', label: 'Address' }]

    //   const rows = salonsDetails?.map((salon)=> createData(salon?.poId,salon?.name,salon?.address2,salon?.contactNum,salon?.address,salon?.status,formatDateToFull(salon?.createdAt),salon?.receivedAt,salon?._id));
    function createData(name,location,address,id) {
        return { name,location,address,id };
    }

    
    useEffect(()=>{
        const fetchApi=async()=>{
          // const parlors = await PARLOUR_DETAILS({page:page, limit:rowsPerPage});
          let  data ={
         page:page, 
         limit:rowsPerPage
          }
         const parlors= await axios.post('https://smartsalon.in/api/suggestionForParlors',data)
         console.log("parlors---------",parlors)
          if(parlors){
            console.log("parlors",parlors)
            setSalonsDetails(parlors?.data?.data?.data)
            setTotalSalons(parlors?.data?.data?.total)
          }else{
            console.log("parlor errors")
          }
        }
        fetchApi()
    },[page,rowsPerPage])
    
    const handleRowClick = (salonId) => {
        console.log("mysalonId",salonId)
        setSelectedSalonId(salonId)
        navigate(`/salon/${salonId}`)
    };

    const rows = salonsDetails.map((salon)=> createData(salon.name,salon?.address2,salon?.address,salon?._id))
  return (
    <Layout>
    <div className='w-full flex flex-col'>
      <TopBar title="Salons"/>
      </div>
      <Wrapper>
      <div className='flex justify-between items-center'>
        <div className='flex items-center gap-x-3'>
          {/* <Drawers />  */}
        </div>
    </div>
      <div className=''>
        <CustomTable headings={columns} rows={rows} page={page} setPage={setPage} rowsPerPage={rowsPerPage} setRowsPerPage={setRowsPerPage} totalOrders={totalSalons} handleRowClick={handleRowClick} handleOpen={handleOpen}/>
        {/* rows={rows} page={page} setPage={setPage} rowsPerPage={rowsPerPage} setRowsPerPage={setRowsPerPage} totalOrders={totalOrders} handleRowClick={handleRowClick}/> */}
      </div>
      </Wrapper>
    
    </Layout>
  )
}

export default Salons