import React, { useEffect, useRef, useState } from "react";
import Layout from "../components/Layout";
import { MdCancel } from "react-icons/md";
import TopBar from "../components/commoncomponents/TopBar";
import CustomTable from "../components/commoncomponents/Table";
import { POORDERS_FILTER } from "../services/crm/user.service";
import SettelmentModal from "../components/commoncomponents/SettelmentModal";
import PickDate from "../components/commoncomponents/PickDate";
import { TextField } from "@mui/material";
import EndDate from "../components/commoncomponents/EndDate";
import SalonSelect from "../components/commoncomponents/SalonSelect";
import StatusSelect from "../components/commoncomponents/StatusSelect";
import axios from "axios";
import { BsFileEarmarkImage } from "react-icons/bs";
import { useAppContext } from "../services/context/AppContext";
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
  const fileInputRef = useRef(null);
 const {expanded}=useAppContext();
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
    { id: "pod", label: "pod" },
    // { id: "downInvoice", lable: "downInvoice" },
    { id: "downInvoice", label: "downInvoice" },
  ];
  console.log("salondetails");

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
    pod,
    invoiceImg
  ) {
    // console.log(invoiceImg,"invoiceImg",pod)
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
      downInvoice: invoiceImg,
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

  const download = async (imageUrl) => {
    // Create a new anchor element
    const link = document.createElement("a");
    link.href = imageUrl;
    link.target = "_blank";

    // Set the download attribute with a filename
    link.download = "Invoice.jpg";

    // Append the anchor to the document body
    document.body.appendChild(link);

    // Programmatically click the anchor to trigger the download
    link.click();

    // Remove the anchor from the document body
    document.body.removeChild(link);
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
      case 7:
        return "Waiting For Payment";
      default:
        return "Unknown Status";
    }
  }

  const handleCancelImages = async (id) => {
    const data = {
      id: id,
    };
    try {
      const response = await axios.post(
        "https://crm.smartsalon.in/finance/deletePOtrackimg",
        data,
        {
          headers: {
            Authorization: `Bearer ${authString}`,
          },
        }
      );
      setImageFile(null);
      if (fileInputRef.current) {
        fileInputRef.current.value = "";
      }
    } catch {}
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
      const response = await axios.post(
        "https://crm.smartsalon.in/uploadPO",
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
          // setSalonsDetails(parlors?.data);
          setTotalPO(parlors?.total);
        };
        fetchApi();
      }
    } catch (error) {
      console.error("Error uploading image:", error);
    }
  };

  function formatDateToFull(dateString) {
    // Split the date part from the time part
    if(dateString){

    
    const [year, month, day] = dateString?.split("T")[0].split("-");
    console.log(year,month,day,"datestr")
    // Convert month from "08" to "Aug" or any other short form
    const monthNames = [
      "Jan",
      "Feb",
      "Mar",
      "Apr",
      "May",
      "Jun",
      "Jul",
      "Aug",
      "Sep",
      "Oct",
      "Nov",
      "Dec",
    ];
    const monthShort = monthNames[parseInt(month, 10) - 1];

    // Format the date as "7 Aug 2024"
    const formattedDate = `${parseInt(day, 10)} ${monthShort} ${year}`;
    return formattedDate;
  }
  return dateString;
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
      formatDateToFull(salon?.receivedDate),
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
            className="mb-2"
            ref={fileInputRef} // Add the ref here
            onChange={handleFileChange}
            // className="w-full px-3 py-2 border rounded-md"
          />

          {salonsDetails?.map((image, index) => {
            console.log("imagescoming", image);
            return (
              salon?._id === image._id &&
              salon?.trackImg && (
                <div
                  key={salon._id}
                  style={{
                    position: "relative",
                    background: "whitsmoke",
                    height: "120px",
                    width: "120px",
                  }}
                >
                  {
                    <img
                      src={salon.trackImg}
                      alt="img"
                      style={{ height: "100px", width: "100px" }}
                    />
                  }
                  <MdCancel
                    className="absolute text-2xl text-black -top-1 -right-2 cursor-pointer"
                    onClick={() => handleCancelImages(salon._id)}
                  />
                </div>
              )
            );
          })}
        </div>
      </>,

      <>
        <div
          onClick={() => {
            setfileId(salon?._id);
          }}
        >
          {salonsDetails?.map((item, index) => {
            {
              /* console.log("imagescoming", item.invoiceImg); */
            }
            return (
              salon?._id === item?._id &&
              item?.invoiceImg?.length > 0 && (
                <div
                  className="flex gap-2 flex-wrap"
                  key={index}
                  style={{
                    position: "relative",
                    background: "whitsmoke",
                    height: "120px",
                    width: "180px",
                    overflowY: "auto",
                  }}
                >
                  {item?.invoiceImg?.map((image, index) => {
                    return (
                      <BsFileEarmarkImage
                        style={{ height: "40%", width: "fit-content" }}
                        className=""
                        onClick={() => download(image)}
                      />
                    );
                  })}
                </div>
              )
            );
          })}
        </div>
      </>
    )
  );

  const handleStatusChange = (event) => {
    setStatus(event.target.value);
  };
  const handleSalonTypeChange = (event) => {
    setSalonType(event.target.value);
  };

  console.log("rows", rows);
  console.log("dates", startDate, endDate);
  console.log(imagefile, "file");
  return (
    <Layout>
      <div className="w-full flex flex-col">
        <TopBar title="PO Orders" />
        <div style={{
          maxWidth: expanded ? "calc(100vw - 289px)" : "calc(100vw - 69px)",
        }} className="p-8 md:p-16 h-[calc(100vh-65px)] overflow-y-auto">
          <div className="w-[100%] mx-auto">
          <div className="w-[97%] mx-auto">
            <div className=" mx-auto flex flex-wrap items-center justify-center  gap-4 mt-4 ">
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
            <div className="mt-6 mx-auto flex flex-wrap justify-center gap-5 items-center ">
              <TextField
                id="outlined-basic"
                label="search..."
                variant="outlined"
                className="w-[350px] grow"
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
            </div>
            <div className=" mx-auto">
              <CustomTable
                settelment={true}
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
        </div>
      </div>
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
