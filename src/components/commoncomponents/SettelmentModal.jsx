import * as React from "react";
import Backdrop from "@mui/material/Backdrop";
import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import Fade from "@mui/material/Fade";
import * as XLSX from "xlsx";

import Button from "@mui/material/Button";
import {
    CHANGE_PO_STATUS,
    SINGLE_POORDER,
} from "../../services/crm/user.service";
import BasicPOTable from "./BasicPOTable";
import EditStatusModal from "./EditStatusModal";
import toast from "react-hot-toast";
import { useMemo } from "react";
import { useState } from "react";
import { useEffect } from "react";

const statusValue = {
  1: "Placed",
  2: "Received/Delivered",
  3: "Canceled",
  4: "Accepted",
  5: "Pacakging",
  6: "Dispatch",
  7: "Waiting for Payment",
};
const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: "60%",
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
  height: "500px",
  overflow: "auto",
};

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
export default function SettelmentModal({
  open,
  setOpen,
  handleOpen,
  handleClose,
  newUpload,
  salonId,
}) {
  const headings = [
    "name",
    "brand",
    "mrp",
    "type",
    "Ordered Quantity",
    "Recieved Quantity",
    "Total Amount",
    "Discount % per product",
    "Order Value",
  ];
  const currentYear = new Date().getFullYear();
  const currentMonth = new Date().getMonth();
  
  const [month, setMonth] = useState();
  const [year, setYear] = useState();
  const [selectedParlorDetail, setSelectedParlorDetail] = useState({});
  const [status, setStatus] = useState("");
  const handleChange = (event) => {
    setStatus(event.target.value);
  };
  

  useEffect(() => {
    setMonth(months[currentMonth]);
    setYear(currentYear.toString());
  }, [open]);
  
  useEffect(() => {
    const fetchApi = async () => {
      const updatingDate = new Date(Date.UTC(year, months.indexOf(month)));
      const selectedDate = updatingDate;
      const singleParlourDetails = await SINGLE_POORDER({ id: salonId });
      
      setSelectedParlorDetail(singleParlourDetails);

      if (singleParlourDetails) {
      }
    };
    fetchApi();
  }, [open]);

  function createData(
    name,
    brand,
    orderedQuantity,
    mrp,
    type,
    receivedQuantity,
    subtotal,
    discount,
    total
  ) {
    return {
      name,
      brand,
      orderedQuantity,
      mrp,
      type,
      receivedQuantity,
      subtotal,
      discount,
      total,
    };
  }
  const rows = useMemo(() => {
    return selectedParlorDetail?.products?.map((item) =>
      createData(
        item.name,
        item.brand,
        item.orderedQuantity,
        item.mrp,
        item.type,
        item?.receivedQuantity,
        item?.mrp * item?.orderedQuantity,
        item.discount,
        item?.total
      )
    );
  }, [selectedParlorDetail]);

  const handleApplyStatus = async () => {
    const changestatus = await CHANGE_PO_STATUS({
      status: +status,
      id: salonId,
    });
    if (changestatus) {
      toast.success("Status Changed Successfully!");
      setStatus("");
    }
  };
  const orderTotal = rows
    ?.reduce((acc, item) => acc + item?.total, 0)
    ?.toFixed(2);

  const handleExportExcel = async () => {
    const { products, ...rest } = selectedParlorDetail;

    const otherData = {
      ...rest,
      status: statusValue[rest.status],
      invoiceImg:
        rest?.invoiceImg?.length > 0 ? rest?.invoiceImg.join(", ") : "",
    };
    const worksheet = XLSX.utils.json_to_sheet([otherData]);
    const blankRow = [[""], [""]]; // create a blank row
    XLSX.utils.sheet_add_aoa(worksheet, blankRow, { origin: -1 });
    XLSX.utils.sheet_add_json(worksheet, products, {
      origin: -1,
      skipHeader: false,
    });

    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, "OrderDetails");
    XLSX.writeFile(workbook, "orderdetails.xlsx");
    // exportToExcel(data, "OrderDetails", "orderdetails.xlsx");
  };
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
            <div className="w-full flex flex-wrap mb-10 gap-3 justify-evenly items-center">
              <EditStatusModal
                status={status}
                setStatus={setStatus}
                handleChange={handleChange}
              />
              <Button variant="contained" onClick={handleApplyStatus}>
                Apply
              </Button>
              <Button variant="contained" onClick={handleExportExcel}>
                Export
              </Button>
            </div>
            <BasicPOTable headings={headings} rows={rows} />
            <div className="flex gap-5 mt-4 justify-end">
              <div className="font-bold ">Order Total</div>
              <div className="font-medium">₹ {orderTotal}</div>
            </div>
          </Box>
        </Fade>
      </Modal>
    </div>
  );
}
