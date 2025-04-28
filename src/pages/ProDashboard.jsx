import React, { useEffect, useState } from "react";
import Layout from "../components/Layout";
import TopBar from "../components/commoncomponents/TopBar";
import CustomTable from "../components/commoncomponents/Table";
import { PARLOUR_DETAILS } from "../services/crm/user.service";
import Wrapper from "../components/commoncomponents/Wrapper";
import SelectInput from "../components/commoncomponents/inputs/SelectInput";
import { salonTypes } from "../services/utils/roles";
import { IoMdEye } from "react-icons/io";
import InvoiceModal from "../components/modals/InvoiceModal";
import KycModal from "../components/modals/KycModal";
const ProDashboard = () => {
  
  const [salonType, setSalonType] = useState("");

 
  const [salonsDetails, setSalonsDetails] = useState([]);
  const [showInvoiceModal,setShowInvoiceModal] = useState(false);
  const [showKycModal,setShowKycModal] = useState(false);
  
  const [selectedSalonId, setSelectedSalonId] = useState(null);
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(10);
  const [totalSalons, setTotalSalons] = useState(0);
  const handleOpen = () => setShowInvoiceModal(true);
  const handleOpenKyc = () => setShowKycModal(true);
  const columns = [
    { id: "salonId", label: "salonId" },
    { id: "name", label: "Name" },
    { id: "location", label: "Location" },
    { id: "invoice", label: "Invoice" },
    { id: "kyc", label: "Kyc" },
    { id: "address", label: "Address" },
    { id: "tradeName", label: "tradeName" },

    // {
    //   id: "invoice",
    //   //   label: 'Size\u00a0(km\u00b2)',
    //   label: "Invoice",
    //   align: "right",
    //   format: (value) => value.toLocaleString("en-US"),
    // },
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
 

  

  function createData(salonId, name, location, address, tradeName, invoice,kyc) {
    // 
    return { salonId, name, location, address, tradeName, invoice,kyc};
  }

  const rows = salonsDetails.map((salon) =>
    createData(
      salon._id,
      salon.name,
      salon?.address2,
      salon?.address,
      salon?.trade,
      <>
      <div className="flex items-center justify-center w-full gap-4">
      <button onClick={handleOpen} className="flex items-center justify-center bg-blue-500 text-white text-xl p-2 rounded-md cursor-pointer">
      <IoMdEye className=" " />
      </button>
      </div>
      
      </>,
      <>
      <div className="flex items-center justify-center w-full gap-4">
      <button onClick={handleOpenKyc} className="flex items-center justify-center bg-green-500 text-white text-xl p-2 rounded-md cursor-pointer">
      <IoMdEye className=" " />
      </button>
      </div>
      
      </>
    )
  );
  


  
  
  return (
    <Layout>
      <div className="w-full flex flex-col">
        <TopBar title="Dashboard" />
      </div>
      <Wrapper>
        <div className="">
          
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

    
      <InvoiceModal
      show={showInvoiceModal}
      setShow={setShowInvoiceModal}
      salonId={selectedSalonId} 
      />
      <KycModal
      show={showKycModal}
      setShow={setShowKycModal}
      salonId={selectedSalonId} 
      />
    </Layout>
  );
};

export default ProDashboard;
