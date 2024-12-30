import React, { useEffect, useState } from "react";
import Layout from "../components/Layout";
import TopBar from "../components/commoncomponents/TopBar";
import MonthPicker from "../components/commoncomponents/MonthPicker";
import YearPicker from "../components/commoncomponents/YearPicker";
import CustomTable from "../components/commoncomponents/Table";
import { FaFileUpload } from "react-icons/fa";
import {
    PARLOUR_DETAILS,
    PARLOUR_UPLOADSPDF,
} from "../services/crm/user.service";
import toast from "react-hot-toast";
import TransitionsModal from "../components/commoncomponents/Modal";
import { useAppContext } from "../services/context/AppContext";
import Wrapper from "../components/commoncomponents/Wrapper";
import SelectInput from "../components/commoncomponents/inputs/SelectInput";
import { salonTypes } from "../services/utils/roles";
const ProDashboard = () => {
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
  const { expanded } = useAppContext();
  const [salonType, setSalonType] = useState("");

  const currentYear = new Date().getFullYear();
  const currentMonth = new Date().getMonth();
  const [salonsDetails, setSalonsDetails] = useState([]);
  const [selectedFile, setSelectedFile] = useState(null);
  const [uploadSalonId, setUploadSalonId] = useState(null);
  const [month, setMonth] = useState(months[currentMonth]);
  const [year, setYear] = useState(currentYear.toString());
  const [open, setOpen] = React.useState(false);
  const [selectedSalonId, setSelectedSalonId] = useState(null);
  const [newUpload, setNewUpload] = useState(false);
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(10);
  const [totalSalons, setTotalSalons] = useState(0);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const columns = [
    { id: "salonId", label: "salonId" },
    { id: "name", label: "Name" },
    { id: "location", label: "Location" },
    { id: "address", label: "Address" },
    { id: "tradeName", label: "tradeName" },

    {
      id: "invoice",
      //   label: 'Size\u00a0(km\u00b2)',
      label: "Invoice",
      align: "right",
      format: (value) => value.toLocaleString("en-US"),
    },
  ];

  useEffect(() => {
    const fetchApi = async () => {
      const payload = { page: page, limit: rowsPerPage, salonType };
      const parlors = await PARLOUR_DETAILS(payload);
      if (parlors) {
        
        setSalonsDetails(parlors?.data);
        setTotalSalons(parlors?.total);
      } else {
        
      }
    };
    fetchApi();
  }, [page, rowsPerPage,salonType]);
  const handleRowClick = (salonId) => {
    
    setSelectedSalonId(salonId);
  };
  const handleFileUploadClick = (salonId) => {
    setUploadSalonId(salonId);
    document.getElementById(`fileInput-${salonId}`).click();
  };

  const handleFileChange = (event, salonId) => {
    const file = event.target.files[0];
    setSelectedFile(file);
    setUploadSalonId(salonId);
    handleFileUpload(file, salonId);
  };

  const handleFileUpload = async (file, salonId) => {
    if (file && salonId) {
      try {
        const formData = new FormData();
        formData.append("royaltypdf", file);
        formData.append("salonId", salonId);
        const selectedDate = new Date(Date.UTC(year, months.indexOf(month)));
        formData.append("uploadedDate", selectedDate.toISOString());

        // Replace with your file upload API call
        await uploadFileApiCall(formData, salonId);

        // Reset file input
        setSelectedFile(null);
        setUploadSalonId(null);

        // Refresh the data or update UI accordingly
      } catch (error) {
        console.error("File upload failed", error);
      }
    }
  };

  function createData(salonId, name, location, address, tradeName, invoice) {
    // 
    return { salonId, name, location, address, tradeName, invoice };
  }

  const rows = salonsDetails.map((salon) =>
    createData(
      salon._id,
      salon.name,
      salon?.address2,
      salon?.address,
      salon?.trade,
      <>
        <FaFileUpload
          className="text-xl font-bold text-right cursor-pointer"
          onClick={() => handleFileUploadClick(salon._id)}
        />
        <input
          type="file"
          id={`fileInput-${salon._id}`}
          style={{ display: "none" }}
          onChange={(e) => handleFileChange(e, salon._id)}
        />
      </>,
      salon._id
    )
  );
  
  const uploadFileApiCall = async (formData, salonId) => {
    const uploadPDF = await PARLOUR_UPLOADSPDF(formData);
    if (uploadPDF) {
      toast.success("File Uploaded");
      setNewUpload(!newUpload);
    } else {
      toast.error("File not uploaded, Please try again!");
    }
  };

  
  
  return (
    <Layout>
      <div className="w-full flex flex-col">
        <TopBar title="Dashboard" />
      </div>
      <Wrapper>
        <div className=" flex gap-6 flex-wrap justify-between items-center">
          <div className="flex flex-wrap items-center gap-x-3">
            <MonthPicker months={months} month={month} setMonth={setMonth} />
            <YearPicker years={years} year={year} setYear={setYear} />
          </div>
          <div className="max-w-sm w-full">
            <SelectInput
              name="salon Type"
              value={salonType}
              options={Object.values(salonTypes)}
              handleChange={(e) => setSalonType(e.target.value)}
            />
          </div>
        </div>
        <div className="w-full">
          <CustomTable
            headings={columns}
            rows={rows}
            page={page}
            setPage={setPage}
            rowsPerPage={rowsPerPage}
            setRowsPerPage={setRowsPerPage}
            totalOrders={totalSalons}
            handleRowClick={handleRowClick}
            handleOpen={handleOpen}
          />
        </div>
      </Wrapper>

      <TransitionsModal
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

export default ProDashboard;
