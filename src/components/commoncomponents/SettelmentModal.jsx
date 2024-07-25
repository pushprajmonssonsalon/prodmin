import * as React from 'react';
import Backdrop from '@mui/material/Backdrop';
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import Fade from '@mui/material/Fade';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import { CHANGE_PO_STATUS, SINGLE_PARLOUR_DETAILS, SINGLE_POORDER, SINGLE_SALON_DETAILS } from '../../services/crm/user.service';
import MonthPicker from './MonthPicker';
import YearPicker from './YearPicker';
import { FaFileUpload } from 'react-icons/fa';
import { Height } from '@mui/icons-material';
import { height } from '@mui/system';
import BasicTable from './BasicTable';
import BasicPOTable from './BasicPOTable';
import EditStatusModal from './EditStatusModal';
import toast from 'react-hot-toast';

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: '60%',
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  p: 4,
  height: "500px",
  overflow: "auto"
};

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
export default function SettelmentModal({open,setOpen,handleOpen,handleClose,newUpload,salonId}) {
    const headings = ["name", "brand","mrp","type","Ordered Quantity","Recieved Quantity","Total Amount","Discount % per product","Order Value"]
      const currentYear = new Date().getFullYear();
      const currentMonth = new Date().getMonth();
      console.log("current month", currentMonth)
      const [month, setMonth] = React.useState();
      const [year, setYear] = React.useState();
      const [selectedParlorDetail,setSelectedParlorDetail] =React.useState([]);
      const [status, setStatus] = React.useState('');

  const handleChange = (event) => {
    setStatus(event.target.value);
  };
    console.log("salon_id",salonId);
    React.useEffect(()=>{
        setMonth(months[currentMonth])
        setYear(currentYear.toString())
    },[open])
    React.useEffect(()=>{
        const fetchApi=async()=>{
            const updatingDate = new Date(Date.UTC(year, months.indexOf(month)));
            const selectedDate = updatingDate;
            const singleParlourDetails = await SINGLE_POORDER({id:salonId});
            if(singleParlourDetails){
                setSelectedParlorDetail(singleParlourDetails.products)
            }
        }
        fetchApi()
    },[open])
    
    function createData(name, brand, orderedQuantity, mrp, type,receivedQuantity) {
        return { name, brand, orderedQuantity, mrp, type, receivedQuantity };
      }
      const rows = selectedParlorDetail?.map((item)=>createData(item.name,item.brand,item.orderedQuantity,item.mrp,item.type,item?.receivedQuantity,))
    console.log("single parlour", selectedParlorDetail)
    const handleApplyStatus =async()=>{
      const changestatus = await CHANGE_PO_STATUS({status:+status,id:salonId});
      if(changestatus){
        toast.success("Status Changed Successfully!")
        setStatus('')
      }
    }
  return (
    <div>
      {/* <Button onClick={handleOpen}>Open modal</Button> */}
      <Modal
        aria-labelledby="transition-modal-title"
        aria-describedby="transition-modal-description"
        open={open}
        onClose={handleClose}
        closeAfterTransition
        slots={{ backdrop: Backdrop }}
        slotProps={{
          backdrop: {
            timeout: 500,
          },
        }}
      >
        <Fade in={open}>
          <Box sx={style}>
          <div className='w-full flex mb-10 justify-evenly items-center'>
          <EditStatusModal status={status} setStatus={setStatus} handleChange={handleChange}/>
          <Button variant='contained' onClick={handleApplyStatus}>Apply</Button>
          </div>
           <BasicPOTable headings={headings} rows={rows}/>
            
          </Box>
        </Fade>
      </Modal>
    </div>
  );
}
