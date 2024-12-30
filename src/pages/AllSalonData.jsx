import { useEffect, useState } from "react";
import TopBar from "../components/commoncomponents/TopBar";
import Wrapper from "../components/commoncomponents/Wrapper";
import Layout from "../components/Layout";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import {
  GET_ALL_SALONS_REPORT,
  GET_SALONS,
} from "../services/crm/user.service";
import toast from "react-hot-toast";
import TailwindTable from "../components/table/TailwindTable";
import exportToExcel from "../services/utils/exportToExcel";
import { salonTypes } from "../services/utils/roles";

const AllSalonData = () => {
  const defaultStartDate = new Date();

  const [filters, setFilters] = useState({
    startDate: defaultStartDate,
    endDate: defaultStartDate,
    type: "Monsoon Salon",
  });
  const [salons, setSalons] = useState([]);
  const [salonDetails, setSalonDetails] = useState([]);
  const { startDate, endDate, type } = filters;

  const handleChange = (name) => (e) => {
    if (e?.target) {
      setFilters((prev) => ({
        ...prev,
        [name]: e.target.value,
      }));
    } else {
      setFilters((prev) => ({
        ...prev,
        [name]: e,
      }));
    }
  };
  const submitClick = () => {
    const data = {
      startDate: startDate,
      endDate: endDate,
    };
    if (Object.values(data).some((elm) => !elm))
      return toast.error("Please fill all fields");
    GET_ALL_SALONS_REPORT(data)
      .then((resp) => {
        setSalonDetails(resp);
      })
      .catch(() => {});
  };
  const cols = [
    {
      label: "Salon",
      id: "name",
    },
    {
      label: "Address",
      id: "address",
    },
    {
      label: "Service Total",
      id: "service",
    },
    {
      label: "Product Total",
      id: "product",
    },
    {
      label: "Discount Total",
      id: "discount",
    },
    {
      label: "Total",
      id: "total",
    },
  ];
  const rows = [
    ...salons?.map((elm) => {
      const matchedSalon = salonDetails?.find((salon) => salon._id === elm._id);

      return {
        ...elm,
        address: (
          <p className="max-w-[300px]  ">{elm.address + " " + elm.address2}</p>
        ),
        service: (
          <span className="font-medium">
            <span> ₹</span>
            <span> {matchedSalon?.serviceTotal?.toFixed(2) || 0}</span>
          </span>
        ),
        product: (
          <span className="font-medium">
            <span> ₹</span>
            <span> {matchedSalon?.productTotal?.toFixed(2) || 0}</span>
          </span>
        ),
        discount: (
          <span className="font-medium">
            <span> ₹</span>
            <span> {matchedSalon?.discountTotal?.toFixed(2) || 0}</span>
          </span>
        ),
        total: (
          <span className="font-medium">
            <span> ₹</span>
            <span>
              {" "}
              {(
                (matchedSalon?.serviceTotal + matchedSalon?.productTotal)||0
              )?.toFixed(2) || 0}
            </span>
          </span>
        ),
      };
    }),
  ];
  const handleExport=()=>{
   const data =[ ...salons?.map((elm) => {
      const matchedSalon = salonDetails?.find((salon) => salon._id === elm._id);

      return{
        name: elm.name,
        address: elm.address + " " + elm.address2,
        service: matchedSalon?.serviceTotal?.toFixed(2) || 0,
        product: matchedSalon?.productTotal?.toFixed(2) || 0,
        discount: matchedSalon?.discountTotal?.toFixed(2) || 0,
        total: ((matchedSalon?.serviceTotal + matchedSalon?.productTotal) || 0).toFixed(2) || 0,
      }
      
    })]
    exportToExcel(data,"SalonReports","SalonReport.xlsx")
  }

  useEffect(() => {
    const data = {
      salonType: type,
      searchWord: "",
    };
    GET_SALONS(data)
      .then((res) => {
        setSalons(res);
      })
      .catch(() => {});
  }, [type]);

  return (
    <>
      <Layout>
        <div className="w-full flex flex-col">
          <TopBar title="All Salon Report" />
        </div>
        <Wrapper>
          <div className="">
          <div>
            <button onClick={handleExport} className="w-[150px] py-2 bg-green-600 text-white font-medium rounded-md ">Export </button>
          </div>
            <div className="flex flex-wrap items-center justify-center gap-3">
              <div className="flex items-center flex-col mb-5">
                <label className="font-medium text-md mb-2">Salon Type</label>
                <select
                  name="type"
                  value={type}
                  className="p-2 border border-gray-200"
                  onChange={handleChange("type")}
                >
                  <option>Choose Type</option>
                  {Object.values(salonTypes).map((type, idx) => {
                    return (
                      <option value={type} key={idx}>
                        {type}
                      </option>
                    );
                  })}
                </select>
              </div>
              <div className="flex items-center flex-col mb-5">
                <label className="font-medium text-md mb-2">Start Date</label>

                <DatePicker
                  selectsStart
                  selected={startDate}
                  onChange={handleChange("startDate")}
                  startDate={startDate}
                  endDate={endDate}
                  className="p-2 border border-gray-200"
                />
              </div>

              <div className="flex items-center flex-col mb-5">
                <label className="font-medium text-md mb-2">End Date</label>
                <DatePicker
                  selectsEnd
                  selected={endDate}
                  onChange={handleChange("endDate")}
                  endDate={endDate}
                  startDate={startDate}
                  minDate={startDate}
                  className="p-2 border border-gray-200"
                />
              </div>
              <button
                className="flex  items-center w-[150px] h-[42px] mt-auto bg-black text-white font-medium rounded-sm justify-center mb-5"
                onClick={submitClick}
              >
                Submit
              </button>
            </div>
            <div>
              <TailwindTable
                cols={cols}
                rows={rows}
                isEditable={false}
                isProduct={false}
              />
            </div>
          </div>
        </Wrapper>
      </Layout>
    </>
  );
};

export default AllSalonData;
