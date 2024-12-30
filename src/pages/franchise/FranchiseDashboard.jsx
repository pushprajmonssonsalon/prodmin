import { useEffect, useState } from "react";
import apiRequest from "../../services/franchise/user.services";
import TableComponent from "../../components/table/TableComponent";
import { subDays, startOfMonth, endOfMonth } from 'date-fns';
import { dateFilters } from "../../services/utils/roles";
import exportToExcel from "../../services/utils/exportToExcel";
import toast from "react-hot-toast";

const FranchiseDashboard = () => {
    const defaultStartDate = new Date();
    const defaultEndDate = new Date();
 const [loading,setLoading]=useState(false);
    const [leads, setLeads] = useState([])

    const [currentPage, setCurrentPage] = useState(1)
    const [itemsPerPage, setItemPerPage] = useState(10)
    const [startDate, setStartDate] = useState(defaultStartDate)
    const [endDate, setEndDate] = useState(defaultEndDate)
    const [totalItems, setTotalItems] = useState(0)
    const [isDropdownOpen, setDropdownOpen] = useState(false);
    const [selectedFilter, setSelectedFilter] = useState("Today");


    const getStartAndEndDate = (dateRange) => {
        let startDate = new Date();
        let endDate = new Date();
        let today = new Date();
        switch (dateRange) {
            case dateFilters.TODAY:
                startDate = today;
                endDate = today;
                break;
            case dateFilters.YESTERDAY:
                startDate = subDays(today, 1);
                endDate = subDays(today, 1);
                break;
            case dateFilters.LAST_7_DAYS:
                startDate = subDays(today, 7);
                endDate = today;
                break;

            case dateFilters.CURRENT_MONTH:
                startDate = startOfMonth(today);
                endDate = today;
                break;
            case dateFilters.PAST_MONTH:
                startDate = startOfMonth(subDays(startOfMonth(today), 1));
                endDate = endOfMonth(subDays(startOfMonth(today), 1));
                break;
            default:
                startDate = today;
                endDate = today;
        }
        return { startDate, endDate };
    }
    const handleFilterChange = (filter) => {
        setSelectedFilter(filter);
        setDropdownOpen(false);
        const { startDate, endDate } = getStartAndEndDate(filter);
        setStartDate(startDate)
        setEndDate(endDate)
        fetchLeads(startDate, endDate);
    };
    const handleDateChange = name => (val) => {
        if (name === "startDate") setStartDate(val)
        else setEndDate(val)


    }
    const fetchLeads = async (stDate, enDate) => {
        const data = {
            currentPage,
            itemsPerPage
        }
        try {
            setLoading(true)

            const query = `page=${currentPage}&limit=${itemsPerPage}&startDate=${stDate ? stDate : startDate}&endDate=${enDate ? enDate : endDate}`
            const result = await apiRequest("post", `getAllLeads?${query}`, {})
            setLeads(result?.data);
            setLoading(false)
            setTotalItems(result?.totalLeads)
        } catch (err) {
            setLoading(false)
            toast.error("no result")

            console.error("Error submitting form:", err);
        }
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        setCurrentPage(1)
        fetchLeads();
    }
    const cols = [
        {
            name: "Name", id: "name"
        },

        {
            name: "Phone Number", id: "phoneNumber"
        },
        {
            name: "Email", id: "email"
        },
        {
            name: "City", id: "city"
        },
        {
            name: "State", id: "state"
        },
        {
            name: "Message", id: "description"
        },
        {
            name: "Salon Type", id: "salonType"
        },
        {
            name: "Budget", id: "salonBudget"
        },

    ]
    const handleExport=()=>{
        const {_id,__v,updatedAt,createdAt,...rest}=leads;
          const arr =leads.map(({_id,__v,updatedAt,createdAt,...rest})=>({...rest}))
        exportToExcel(arr  ,"Leads","Leads.xlsx")

    }

    useEffect(() => {
        fetchLeads();
    }, [currentPage, itemsPerPage])


    return (
        <>
            <div className="w-full">
                <h2 className="text-gray-500 text-[3rem] font-medium my-3">Leads</h2>
              
                <div className={`border shadow-md mx-auto  p-4 mb-5`}>
                    <TableComponent loading={loading} exportoExcel={handleExport} rows={leads} handleSubmit={handleSubmit} startDate={startDate} endDate={endDate} handleDateChange={handleDateChange}  selectedFilter={selectedFilter} setDropdownOpen={setDropdownOpen} isDropdownOpen={isDropdownOpen} handleFilterChange={handleFilterChange} cols={cols} currentPage={currentPage} itemsPerPage={itemsPerPage} setItemsPerPage={setItemPerPage} setCurrentPage={setCurrentPage} totalItems={totalItems} />
                </div>
            </div>





        </>
    );
};


export default FranchiseDashboard