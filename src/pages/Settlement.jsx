import React, { useEffect, useState } from "react";
import Layout from "../components/Layout";
import { MdCancel } from "react-icons/md";
import TopBar from "../components/commoncomponents/TopBar";
import MonthPicker from "../components/commoncomponents/MonthPicker";
import YearPicker from "../components/commoncomponents/YearPicker";
import CustomTable from "../components/commoncomponents/Table";
import { FaFileUpload } from "react-icons/fa";
import { MdEditSquare } from "react-icons/md";
import {
  PARLOUR_DETAILS,
  PARLOUR_UPLOADSPDF,
  POORDERS_FILTER,
  POORDERS_TABLE,
} from "../services/crm/user.service";
import toast from "react-hot-toast";
import SettelmentModal from "../components/commoncomponents/SettelmentModal";
import PickDate from "../components/commoncomponents/PickDate";
import { Button, TextField } from "@mui/material";
import EndDate from "../components/commoncomponents/EndDate";
import EditStatusModal from "../components/commoncomponents/EditStatusModal";
import SalonSelect from "../components/commoncomponents/SalonSelect";
import StatusSelect from "../components/commoncomponents/StatusSelect";
import axios from "axios";
const Settelment = () => {
  const months = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];
  const years = [
    "2000",
    "2001",
    "2002",
    "2003",
    "2004",
    "2005",
    "2006",
    "2007",
    "2008",
    "2009",
    "2010",
    "2011",
    "2012",
    "2013",
    "2014",
    "2015",
    "2016",
    "2017",
    "2018",
    "2019",
    "2020",
    "2021",
    "2022",
    "2023",
    "2024",
    "2025",
    "2026",
    "2027",
    "2028",
    "2029",
    "2030",
    "2031",
    "2032",
    "2033",
    "2034",
    "2035",
    "2036",
    "2037",
    "2038",
    "2039",
    "2040",
    "2041",
    "2042",
    "2043",
    "2044",
    "2045",
    "2046",
    "2047",
    "2048",
    "2049",
    "2050",
  ];
  const currentYear = new Date().getFullYear();
  const currentMonth = new Date().getMonth();
  const [salonsDetails, setSalonsDetails] = useState([]);
  const defaultStartDate = new Date();
  const [startDate, setStartDate] = useState(defaultStartDate);
  const [endDate, setEndDate] = useState(defaultStartDate);
  const [open, setOpen] = React.useState(false);
  const [selectedSalonId, setSelectedSalonId] = useState(null);
  const [newUpload, setNewUpload] = useState(false);
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(10);
  const [totalPO, setTotalPO] = useState(0);
  const [status, setStatus] = useState("");
  const [salonType, setSalonType] = useState("");
  const [uploadSalonId, setUploadSalonId] = useState(null);
  const [selectedFile, setSelectedFile] = useState(null);
  const [images, setImages] = React.useState("");
  console.log("salonsDetails", salonsDetails);
  const [parlorDetails, setParlorDetails] = React.useState([]);
  const [search, setSearch] = useState("");
  const [imagefile, setImageFile] = useState([]);
  const [fileId, setfileId] = useState("");
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const columns = [
    { id: "poId", label: "PO Number" },
    { id: "trade", label: "Trade Name" },
    { id: "salonid", label: "salonid" },
    { id: "name", label: "Category" },
    { id: "location", label: "Location" },
    { id: "address", label: "Address" },
    { id: "contactNum", label: "Phone Number" },
    { id: "status", label: "Status" },
    { id: "createdAt", label: "Ordered Date" },
    { id: "receivedAt", label: "Received Date" },
    // {id:'pod',label:"pod"},
    { id: "pod", label: "pod" },
    { id: "downInvoice", lable: "downInvoice" },
  ];

  const authString = localStorage.getItem("crmtoken");
  function createData(
    poId,
    trade,
    salonid,
    name,
    location,
    contactNum,
    address,
    status,
    createdAt,
    receivedAt,
    id,
    pod
  ) {
    return {
      poId,
      trade,
      salonid,
      name,
      location,
      contactNum,
      address,
      status: getStatus(status),
      createdAt,
      receivedAt,
      id,
      pod,
    };
  }
  useEffect(() => {
    const fetchApi = async () => {
      const parlors = await POORDERS_FILTER({
        search,
        salonType,
        status,
        startDate,
        endDate,
        page,
        rowsPerPage,
      });
      setSalonsDetails(parlors?.data);
      setTotalPO(parlors?.total);
    };
    fetchApi();
  }, [
    page,
    rowsPerPage,
    startDate,
    endDate,
    open,
    search,
    salonType,
    status,
    imagefile,
  ]);
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
  const handleFileUploadClick = (poId) => {
    setUploadSalonId(poId);
    document.getElementById(`fileInput-${poId}`).click();
  };
  const handleCancelImages = async (id) => {
    const data = {
      id: id,
    };
    const response = await axios.post(
      "https://crm.smartsalon.in/finance/deletePOtrackimg",
      data,
      {
        headers: {
          Authorization: `Bearer ${authString}`,
        },
      }
    );
  };

  const handleFileChange = async (e) => {
    setImageFile(e.target.files[0]);
    console.log(e.target.files[0]);
    let imageData = e.target.files[0];
    const formData = new FormData();
    formData.append("image", imageData);
    formData.append("fileId", fileId);
    console.log("imageData------", imageData);

    try {
      // const response = await fetch('http://192.168.2.19:4002/upload', {
      //   method: 'POST',
      //   body: formData,
      // });

      // if (response.ok) {
      //   console.log("images link", response.data)
      //   // alert('Image uploaded successfully');
      //   setImageKey(imageData.name);
      // } else {
      //   alert('Failed to upload image');
      // }
      // http://192.168.2.19:4002
      // https://crm.smartsalon.in
      const response = await axios.post(
        'https://crm.smartsalon.in/uploadPO',
        formData,
        {
          headers: {
            Authorization: `Bearer ${authString}`,
          },
        }
      );

      if (response) {
        console.log("resp------->", response.data.data);
        setImages(response.data.data);
        const fetchApi = async () => {
          const parlors = await POORDERS_FILTER({
            search,
            salonType,
            status,
            startDate,
            endDate,
            page,
            rowsPerPage,
          });
          setSalonsDetails(parlors?.data);
          setTotalPO(parlors?.total);
        };
        fetchApi();
      }
    } catch (error) {
      console.error("Error uploading image:", error);
    }
  };
  const uploadFileApiCall = async (formData, poId) => {
    const uploadPDF = await PARLOUR_UPLOADSPDF(formData);
    if (uploadPDF) {
      toast.success("File Uploaded");
      setNewUpload(!newUpload);
    } else {
      toast.error("File not uploaded, Please try again!");
    }
  };
  const handleFileUpload = async (file, poId) => {
    if (file && poId) {
      try {
        const formData = new FormData();
        formData.append("royaltypdf", file);
        formData.append("salonId", poId);
        // const selectedDate = new Date(Date.UTC(year, months.indexOf(month)));
        // formData.append('uploadedDate', selectedDate.toISOString());

        // Replace with your file upload API call
        await uploadFileApiCall(formData, poId);

        // Reset file input
        setSelectedFile(null);
        setUploadSalonId(null);

        // Refresh the data or update UI accordingly
      } catch (error) {
        console.error("File upload failed", error);
      }
    }
  };

  function formatDateToFull(dateString) {
    const date = new Date(dateString);
    return date.toLocaleDateString("en-US", {
      day: "numeric",
      month: "short", // 'short' will give abbreviated month names like 'May', 'Jun'
      year: "numeric",
    });
  }

  // salon?.trade
  console.log("selected id", selectedSalonId);
  //  const rows = salonsDetails?.map((salon)=> createData(salon?.poId,salon?.trade,salon?._id,salon?.name,salon?.address2,salon?.contactNum,salon?.address,salon?.status,formatDateToFull(salon?.createdAt),salon?.receivedAt,salon?._id)
  // );
  const rows = salonsDetails?.map((salon) =>
    createData(
      salon?.poId,
      salon?.trade,
      salon?.salonId,
      salon?.name,
      salon?.address2,
      salon?.contactNum,
      salon?.address,
      salon?.status,
      formatDateToFull(salon?.createdAt),
      salon?.receivedAt,
      salon?._id,

      // salon?.trackImg
      <>
        <div
          onClick={() => {
            setfileId(salon?._id);
          }}
        >
          <input
            type="file"
            id="image"
            accept="image/*"
            onChange={handleFileChange}
            // className="w-full px-3 py-2 border rounded-md"
          />

          {salonsDetails?.map((image, index) => {
            console.log("imagescoming", image);
            return (
              salon?._id === image._id && (
                <div
                  key={salon._id}
                  style={{
                    position: "relative",
                    background:'whitsmoke',
                     height: "120px", width: "120px" 
                  }}
                >
                  {
                    <img
                      src={salon.trackImg}
                      alt="img"
                      style={{height: "120px", width: "120px" }}
                    />
                  }
                     <MdCancel
                    className="absolute text-2xl text-black top-0 right-0 cursor-pointer"
                    onClick={() => handleCancelImages(salon._id)}
                  />

               
                </div>
              )
            );
          })}
        </div>
      </>,
      salon._id
    )
  );

  const handleStatusChange = (event) => {
    setStatus(event.target.value);
  };
  const handleSalonTypeChange = (event) => {
    setSalonType(event.target.value);
  };
  // const handleFileChange = (event, poId) => {
  //   const file = event.target.files[0];
  //   setSelectedFile(file);
  //   setUploadSalonId(poId);
  //   handleFileUpload(file, poId);
  // };

  console.log("rows", rows);
  console.log("dates", startDate, endDate);
  return (
    <Layout>
      <div className="w-full flex flex-col">
        <TopBar title="PO Orders" />
        <div className="w-[80%] mx-auto flex justify-center items-center gap-4 mt-4 absolute z-20 top-20">
          <div className="flex flex-col">
            <label className="text-black  text-lg font-medium font-serif">
              Start Date :
            </label>
            <PickDate datte={startDate} setDatte={setStartDate} />
          </div>
          <div className="flex flex-col">
            <label className="text-black  text-lg font-medium font-serif">
              End Date :
            </label>
            <EndDate
              datte={endDate}
              setDatte={setEndDate}
              startDate={startDate}
            />
          </div>
          {/* <Button variant="contained" className='mt-8'>Search</Button> */}
        </div>
        <div className="w-[90%] mx-auto flex justify-between items-center mt-32">
          <TextField
            id="outlined-basic"
            label="search..."
            variant="outlined"
            className="w-[350px]"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
          <SalonSelect
            value={salonType}
            setValue={setSalonType}
            handleChange={handleSalonTypeChange}
          />
          <StatusSelect
            value={status}
            setValue={setStatus}
            handleChange={handleStatusChange}
          />
        </div>
        <div className="w-[90%] mx-auto">
          <CustomTable
            headings={columns}
            rows={rows}
            page={page}
            setPage={setPage}
            rowsPerPage={rowsPerPage}
            setRowsPerPage={setRowsPerPage}
            totalOrders={totalPO}
            handleRowClick={handleRowClick}
            handleOpen={handleOpen}
          />
        </div>
      </div>

      {/* <EditStatusModal open={editOpen} setOpen={setEditOpen} handleClose={handleEditClose} salonId={selectedSalonId}/> */}
      <SettelmentModal
        open={open}
        setOpen={setOpen}
        handleOpen={handleOpen}
        handleClose={handleClose}
        newUpload={newUpload}
        salonId={selectedSalonId}
      />
    </Layout>
  );
};

export default Settelment;
