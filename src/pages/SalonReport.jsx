import { useEffect, useMemo, useRef, useState } from "react";
import Layout from "../components/Layout";
import TopBar from "../components/commoncomponents/TopBar";
import Wrapper from "../components/commoncomponents/Wrapper";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { usePDF } from "react-to-pdf";
import "../styles/SalonReport.css";
import { GET_SALES_REPORT, GET_SALONS } from "../services/crm/user.service";
import { ImCheckboxChecked } from "react-icons/im";
import toast from "react-hot-toast";
import ModularTable from "../components/table/ModularTable";
const SalonReport = () => {
  const defaultStartDate = new Date();
  const [filters, setFilters] = useState({
    startDate: defaultStartDate,
    endDate: defaultStartDate,
    type: "Monsoon Salon",
    salonId: "",
    searchWord: "",
    salonAddress: "",
    salonAddress2: "",
  });
  const {
    startDate,
    endDate,
    type,
    salonId,
    searchWord,
    salonAddress,
    salonAddress2,
  } = filters;

  const [membershipSale, setMemberShipSale] = useState([]);
  const [salons, setSalons] = useState([]);
  const [filteredSalon, setFilteredSalon] = useState([]);
  const [paymentMethodReport, setPaymentMethodReport] = useState([]);
  const [appointmentStatus, setAppointmentStatus] = useState([]);
  const [serviceDistribution, setServiceDistribution] = useState([]);
  const [staffDistribution, setStaffDistribution] = useState([]);
  const [dataResponse, setDataResponse] = useState([]);
  const [categoryWiseDistrubution, setCategoryWiseDistrubution] = useState([]);
  const [productDistribution, setProductDistribution] = useState([]);
  const [membershipCredit, setMembershipCredit] = useState([]);
  const [showDropdown, setShowDropdown] = useState(true);
  const dropdownRef = useRef(null); // Reference to the dropdown

  // Handle clicks outside the dropdown

  const { toPDF, targetRef } = usePDF({ filename: "page.pdf" });
  const tableHeaders = [
    "EMPLLOYEE NAME",
    "HAIR",
    "SPA",
    "BEAUTY",
    "NAIL",
    "HAND & FEET",
    "MAKEUP",
  ];

  const handleChange = (name) => (e) => {
    if (e?.target) {
      if (name === "salonId") {
        const [id, address, address2] = e.target.value.split("-");

        setFilters((prev) => ({
          ...prev,
          salonId: id,
          salonAddress: address,
          salonAddress2: address2,
        }));
      } else if (name === "searchWord") {
        setFilters((prev) => ({
          ...prev,
          [name]: e.target.value,
        }));
        if (!showDropdown) setShowDropdown(!showDropdown);
      } else
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

  const findTotalById = (reportArray, id) => {
    const report = reportArray.find((item) => item._id === id);
    return report ? report.total : 0;
  };
  const serviceDistributionTotal = useMemo(() => {
    if (serviceDistribution) {
      const total = serviceDistribution.reduce(
        (acc, curr) => acc + curr?.totalRevenue,
        0
      );
      return total.toFixed(2 || 0);
    }
    return 0;
  }, [serviceDistribution]);

  const productDistributionTotal = useMemo(() => {
    if (productDistribution) {
      const total = productDistribution.reduce(
        (acc, curr) => acc + curr?.totalRevenue,
        0
      );
      return total.toFixed(2 || 0);
    }
    return 0;
  }, [productDistribution]);

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
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setShowDropdown(false); // Hide dropdown when clicked outside
      }
    };

    // Add event listener to listen for clicks outside
    document.addEventListener("mousedown", handleClickOutside);

    // Cleanup event listener
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);
  const submitClick = () => {
    const data = {
      startDate: startDate,
      endDate: endDate,
      id: salonId,
    };
    if (Object.values(data).some((elm) => !elm))
      return toast.error("Please fill all fields");
    GET_SALES_REPORT(data)
      .then((resp) => {
        setAppointmentStatus(resp.appointmentStatus);
        setServiceDistribution(resp.serviceCategoryWiseRevenue);
        setStaffDistribution(resp.staffRevenueDistribution);
        setCategoryWiseDistrubution(resp.staffCategoryWiseRevenue);
        setProductDistribution(resp.productRevenueDistribution);
        setMemberShipSale(resp.membershipSale);
        setMembershipCredit(resp.membershipCreditUsed);
        setDataResponse(resp);
        const paymentMethods = ["Card", "Upi", "Cash"];

        let paymentReport = paymentMethods.map((method) => ({
          _id: method,
          total:
            findTotalById(resp.appointmentPaymentMethodReport, method) +
            findTotalById(resp.subscriptionPaymentMethodReport, method),
        }));
        setPaymentMethodReport(paymentReport);
      })
      .catch(() => {});
  };

  const credits = membershipCredit[0]?.membershipCreditUsed;

  const totalPayment = paymentMethodReport.reduce(
    (acc, payment) => acc + payment.total,
    0
  );

  useEffect(() => {
    console.log(searchWord, "searchWord");
    if (searchWord && searchWord?.trim() && salons?.length > 0) {
      setFilteredSalon(
        salons?.filter((salon) => {
          const salonAddress1 = salon?.address
            ?.split(" ")
            ?.join("")
            ?.toLowerCase();
          const salonAddress2 = salon?.address2
            ?.split(" ")
            ?.join("")
            ?.toLowerCase();
          const name = searchWord?.split(" ")?.join("")?.toLowerCase();

          return salonAddress1.includes(name) || salonAddress2.includes(name);
        })
      );
    }
  }, [searchWord, salons]);
  const salonTypes = ["Monsoon Salon", "Smart Salon", "Monsoon Salon Pro"];

  //   useEffect(()=>{
  //     const data = {
  //       startDate:startDate,
  //       endDate: endDate
  //     }
  //     GET_SALES_REPORT()
  //     postApiData("reports/getSalesReportOfCustomers",data,
  //       (resp)=>{
  //         const result = resp.reduce((acc, item) => {
  //           acc[item._id] = {
  //             ...item,
  //             totalRevenue: (item.total - item.discount).toFixed(2)
  //           };
  //           return acc;
  //         }, {});
  //         setWholeCustomerRevenue(result?.old?.totalRevenue)
  //         setNewCustomerRevenue(result?.new?.totalRevenue)
  //         console.log("new customer result",result)
  //       },(error)=>{
  //         console.log(error)
  //       }
  //     )
  //   },[startDate,endDate])
  const totalSum =categoryWiseDistrubution?.map((elm)=>({categories:elm.categories,name:elm.name}))
console.log(totalSum,"categories")
  const sections = [
    {
      title: "COLLECTION",
      data: paymentMethodReport,
      columns: [
        { header: "MODE", valueKey: "_id" },
        { header: "AMOUNT", valueKey: "total" },
      ],
      footer: [
        { label: "Membership Credit Used", value: credits },
        { label: "Total", value: totalPayment },
      ],
    },
    {
      title: "APPOINTMENT STATUS",
      data: appointmentStatus,
      columns: [
        {
          header: "STATUS",
          valueKey: "_id",
          transform: (id) =>
            id === 3 ? "Completed" : id === 2 ? "Cancelled" : "",
        },
        { header: "VALUE", valueKey: "total" },
      ],
    },
    {
      title: "MEMBERSHIP STATUS",
      data: membershipSale,
      columns: [
        { header: "MEMBERSHIP REVENUE", valueKey: "membershipRevenue" },
        { header: "MEMBERSHIP COUNT", valueKey: "membershipCount" },
      ],
    },
    {
      title: "SERVICE DISTRIBUTION",
      data: serviceDistribution,
      columns: [
        { header: "SERVICE", valueKey: "_id" },
        { header: "TOTAL REVENUE", valueKey: "totalRevenue" },
      ],
      footer: [{ label: "Total", value: serviceDistributionTotal }],
    },
    {
      title: "PRODUCT DISTRIBUTION",
      data: productDistribution,
      columns: [
        { header: "PRODUCT", valueKey: "name" },
        { header: "TOTAL REVENUE", valueKey: "totalRevenue" },
      ],
      footer: [{ label: "Total", value: productDistributionTotal }],
    },
    {
      title: "EMPLOYEE SERVICE DISTRIBUTION",
      data: categoryWiseDistrubution,
      columns: [
        { header: "EMPLOYEE NAME", valueKey: "name" },
        { header: "HAIR", valueKey:"Hair" ,child:true},
        { header: "SPA", valueKey: "Spa" ,child:true},
        { header: "BEAUTY", valueKey: "Beauty" ,child:true},
        { header: "NAIL", valueKey: 'Nail' ,child:true},
        { header: "HAND & FEET", valueKey: "Hand & Feet" ,child:true},
        { header: "MAKEUP", valueKey: "Makeup" ,child:true},
        { header: "TOTAL", valueKey: "totalSum" ,child:true}, // Total calculation for each employee
      ],
    },
  ];

  return (
    <Layout>
      <div className="w-full flex flex-col">
        <TopBar title="Salon Reports" />
      </div>
      <Wrapper>
        <div className="w-full">
          <div className="w-full">
            <div>
              <button
                className="bg-green-500 text-white rounded-sm w-[150px] h-[45px] flex items-center justify-center font-bold "
                onClick={() => toPDF()}
              >
                Download PDF
              </button>
            </div>

            <div className="text-center my-6">
              <span className="text-4xl font-bold text-green-600 ">
                REPORTS
              </span>
            </div>
            <div className="flex flex-wrap gap-3 items-center justify-center">
              <div className="flex items-center flex-col mb-5">
                <label className="font-medium text-md mb-2">Salon Type</label>
                <select
                  name="type"
                  value={type}
                  className="p-2 border border-gray-200"
                  onChange={handleChange("type")}
                >
                  <option>Choose Type</option>
                  {salonTypes.map((type, idx) => {
                    return (
                      <option value={type} key={idx}>
                        {type}
                      </option>
                    );
                  })}
                </select>
              </div>
              <div className="flex items-center flex-col relative mb-5">
                <label className="font-medium text-md mb-2">Salon Name</label>
                <input
                  type="text"
                  className="p-2 border border-gray-200"
                  value={searchWord}
                  onChange={handleChange("searchWord")}
                />

                {filteredSalon?.length > 0 && showDropdown && (
                  <div
                    ref={dropdownRef}
                    className="absolute right-0 w-[250px] z-[100] -bottom-[380px] bg-white shadow-md p-3"
                  >
                    <div className=" h-[350px] overflow-y-auto overflow-x-hidden">
                      {/* Map over the address objects array to create radio inputs */}
                      {filteredSalon.map((option) => (
                        <label
                          htmlFor={option._id}
                          key={option._id}
                          className="mb-2 flex cursor-pointer hover:bg-gray-50 border p-2 shadow-sm rounded-sm"
                        >
                          <input
                            type="radio"
                            id={option._id}
                            name="salonId"
                            value={`${option._id}-${option.address}-${option.address2}`}
                            onChange={handleChange("salonId")} // Handle the selected address
                            className="mr-2 cursor-pointer"
                          />
                          <div className="text-sm cursor-pointer">
                            <div>
                              <h2 className="font-medium"> {option?.name}</h2>
                              <h2> {option.address}</h2>
                              <h2> {option.address2}</h2>
                            </div>
                          </div>
                        </label>
                      ))}
                    </div>
                  </div>
                )}
                {salonId && !showDropdown && (
                  <div className="absolute -bottom-[30px]  left-0  bg-green-600 p-1  flex items-center justify-center gap-1">
                    <span className="text-xs text-white">
                      <ImCheckboxChecked />
                    </span>{" "}
                    <span className="text-xs text-white font-medium line-clamp-1 overflow-hidden text-ellipsis">
                      {salonAddress}
                    </span>
                  </div>
                )}
              </div>

              <div className="flex items-center flex-col mb-5">
                <label className="font-medium text-md mb-2">Start Date</label>

                <DatePicker
                  selectsStart
                  selected={startDate}
                  onChange={handleChange("startDate")}
                  startDate={startDate}
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

            <div ref={targetRef}>
              {sections.map((section, idx) => (
                <ModularTable key={idx} section={section} />
              ))}

              {/* <table>
        <thead>
          <tr>
            <th>EMPLLOYEE NAME</th>
            <th>HAIR</th>
            <th>SPA</th>
            <th>BEAUTY</th>
            <th>NAIL</th>
            <th>HAND & FEET</th>
            <th>MAKEUP</th>
          </tr>
        </thead>
        <tbody style={{ height: "80px" }}>
          {categoryWiseDistrubution?.map((item, index) => {
            return (
              <>
                <tr>
                  <td>{item.name}</td>
                  <td>{item?.categories?.sumTotal || 0}</td>
                  <td></td>
                  <td></td>
                  <td></td>
                  <td></td>
                  <td></td>
                </tr>
              </>
            );
          })}
        </tbody>
      </table> */}
            </div>
          </div>
        </div>
      </Wrapper>
    </Layout>
  );
};

export default SalonReport;
