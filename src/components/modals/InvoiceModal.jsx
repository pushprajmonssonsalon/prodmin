import { useEffect, useState } from "react";
import Modal from "../modal/Modal";
import MonthPicker from "../commoncomponents/MonthPicker";
import YearPicker from "../commoncomponents/YearPicker";
import { DELETE_FILE, DELETE_ROYALITY_FILE, PARLOUR_UPLOADSPDF, SINGLE_PARLOUR_DETAILS } from "../../services/crm/user.service";
import { FaLink } from "react-icons/fa";
import formatDateToFull from "../../services/utils/formatDate";
import { Link } from "react-router-dom";
import toast from "react-hot-toast";
import { MdDeleteForever } from "react-icons/md";
import ConfirmationModal from "./ConfirmationModal";

const InvoiceModal = ({ show, setShow, onSubmit, salonId }) => {
    return (
        <>
            {" "}
            <Modal show={show} setShow={setShow}>
                <ChildComponent onSubmit={onSubmit} show={show} salonId={salonId} />
            </Modal>
        </>
    );
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
const ChildComponent = ({ closeModal, salonId, show }) => {
    const currentYear = new Date().getFullYear();
    const currentMonth = new Date().getMonth();
    const [month, setMonth] = useState(months[currentMonth]);
    const [year, setYear] = useState(currentYear.toString());
    const [showConfirmation, setShowConfirmation] = useState(false);
    const [selectedFile, setSelectedFile] = useState(null);
    const [selectedParlorDetail, setSelectedParlorDetail] = useState([]);
    const fetchApi = async () => {
        if (salonId && month && year && show) {
            const updatingDate = new Date(Date.UTC(year, months.indexOf(month)));
            const selectedDate = updatingDate;
            const singleParlourDetails = await SINGLE_PARLOUR_DETAILS({ salonId, selectedDate });
            if (singleParlourDetails) {
                setSelectedParlorDetail(singleParlourDetails)
            }
        }
    }
    const deleteFileApiCall = async () => {
        if (selectedFile) {
            try {
                const isDeleted = await DELETE_ROYALITY_FILE({ file: selectedFile });
                if (isDeleted) {
                    toast.success("File Deleted");
                    fetchApi()
                } else {
                    toast.error("File not deleted, Please try again!");
                }

            } catch (error) {
                toast.error("File not deleted, Please try again!");
            }
        }
        else {
            toast.error("File not deleted, Please try again!");
        }
        setShowConfirmation(false)
        setSelectedFile(null)

    }
    const handleDeleteFile= async(file)=>{
        if(file){
            setSelectedFile(file)
            setShowConfirmation(true)
        }
        else{
            toast.error('File Already Deleted')
        }

    }
    const uploadFileApiCall = async (formData) => {
        const uploadPDF = await PARLOUR_UPLOADSPDF(formData);
        if (uploadPDF) {
            toast.success("File Uploaded");
            fetchApi()
        } else {
            toast.error("File not uploaded, Please try again!");
        }
    };
    const handleFileUpload = async (file) => {
        if (file && salonId) {
            try {
                const formData = new FormData();
                formData.append("royaltypdf", file);
                formData.append("salonId", salonId);
                const selectedDate = new Date(Date.UTC(year, months.indexOf(month)));
                formData.append("uploadedDate", selectedDate.toISOString());

                // Replace with your file upload API call
                await uploadFileApiCall(formData);

                // Reset file input

                // Refresh the data or update UI accordingly
            } catch (error) {
                console.error("File upload failed", error);
            }
        }
    };
    const cols = [
        {
            name: "S.No",
            id: 'index'

        },
        {
            name: "FileName",
            id: 'fileName'

        },
        {
            name: 'File',
            id: 'invoiceUrl'
        },
        {
            name: "Uploaded At",
            id: "createdAt",
        },
        {
            name: "Actions",
            id: "actions",
        }
    ]

    const handleFileChange = (event) => {
        const file = event.target.files[0];
        handleFileUpload(file);
    };
    useEffect(() => {

        fetchApi()
    }, [month, year, show])

    return (
        <>
        <div className="relative top-[10%] bottom-[20%] m-auto p-4 w-full h-full my-auto max-w-[60vw] max-h-full">
            {/* Modal content */}
            <div className="relative h-fit  my-auto bg-white rounded-lg shadow ">
                {/* Modal header */}
                <div className="flex items-center justify-between p-4 md:p-5 border-b rounded-t ">
                    <h3 className="text-lg font-semibold text-gray-900 ">Invoices</h3>
                    <button
                        onClick={closeModal}
                        type="button"
                        className="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm h-8 w-8 ms-auto inline-flex justify-center items-center  "
                        data-modal-toggle="select-modal"
                    >
                        <svg
                            className="w-3 h-3"
                            aria-hidden="true"
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 14 14"
                        >
                            <path
                                stroke="currentColor"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={2}
                                d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"
                            />
                        </svg>
                        <span className="sr-only">Close modal</span>
                    </button>
                </div>
                {/* Modal body */}
                <div className="p-4 h-full  md:p-5">
                    <div className=' flex flex-col md:flex-row gap-3 mb-4 w-1/2'>
                        <MonthPicker months={months} month={month} setMonth={setMonth} />
                        <YearPicker years={years} year={year} setYear={setYear} />
                    </div>
                    <p className="text-gray-500  mb-4">Invoices:</p>

                    {selectedParlorDetail?.length > 0 ?
                        <div className="max-h-[200px] overflow-y-auto w-full  ">

                            <table className="w-full border-collapse  mb-4">
                                <thead>
                                    <tr>
                                        {cols?.map((elm, index) => {
                                            return (
                                                <th key={index} className="text-left text-sm font-medium p-2 text-black">{elm.name}</th>
                                            )
                                        })}
                                    </tr>
                                </thead>
                                <tbody>
                                    {selectedParlorDetail?.map((elm, index) => {
                                        return (
                                            <tr>
                                                {cols?.map((col, idx) => {
                                                    return (
                                                        <td key={idx} className="text-gray-500 p-2">{
                                                            col.id === 'index' ? index + 1
                                                                : col.id === "invoiceUrl"
                                                                    ? <Link to={elm[col?.id]} target="_blank">
                                                                        <FaLink className="cursor-pointer text-blue-600 text-lg" />
                                                                    </Link>
                                                                    : col.id === "createdAt"
                                                                        ? formatDateToFull(elm[col.id])
                                                                        : col.id === "actions" ? <button onClick={()=>handleDeleteFile(elm)} className="text-rose-600 text-xl"><MdDeleteForever />
                                                                        </button> :
                                                                            elm[col.id]}</td>
                                                    )
                                                })}

                                            </tr>
                                        )
                                    })}
                                </tbody>
                            </table>

                        </div> : <div className="text-center py-5 text-gray-500">
                            <span>No Invoices Found</span>
                        </div>}
                    <div
                        className="mt-3"
                    >
                        <label className="block mb-2 text-sm font-medium text-gray-900" htmlFor="file_input">
                            Upload File
                        </label>
                        <input
                            type="file"
                            id="file_input"
                            onChange={handleFileChange}
                            className="block w-full text-sm text-gray-900 border border-gray-300 rounded-lg cursor-pointer bg-gray-50
    file:bg-blue-600 file:text-white file:border-0 file:py-2 file:px-4 file:rounded file:cursor-pointer"
                        />

                    </div>
                </div>

            </div>
            
        </div>
        <ConfirmationModal
                show={showConfirmation}
                setShow={setShowConfirmation}
                onSubmit={deleteFileApiCall}
                text={"Are you sure you want to delete this file?"}
            />
        </>
    );
};
export default InvoiceModal;
