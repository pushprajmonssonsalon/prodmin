import { useEffect, useState } from "react";
import Modal from "../modal/Modal";
import { DELETE_FILE, PARLOUR_UPLOADSKYC, SINGLE_PARLOUR_KYC } from "../../services/crm/user.service";
import { Link } from "react-router-dom";
import toast from "react-hot-toast";
import ConfirmationModal from "./ConfirmationModal";
import { FaLink } from "react-icons/fa";
import { MdDeleteForever } from "react-icons/md";
import formatDateToFull from "../../services/utils/formatDate";

const KycModal = ({ show, setShow, onSubmit, salonId }) => {
    return (
        <>
            {" "}
            <Modal show={show} setShow={setShow}>
                <ChildComponent onSubmit={onSubmit} show={show} salonId={salonId} />
            </Modal>
        </>
    );
};

const ChildComponent = ({ closeModal, show, salonId }) => {


    const [selectedParlorDetail, setSelectedParlorDetail] = useState([]);
    const [showConfirmation, setShowConfirmation] = useState(false);
    const [selectedFile, setSelectedFile] = useState(null);
    const fetchApi = async () => {
        if (show && salonId) {
            const singleParlourDetails = await SINGLE_PARLOUR_KYC({ salonId });
            if (singleParlourDetails) {
                setSelectedParlorDetail(singleParlourDetails)
            }
            else {
                setSelectedParlorDetail([])
            }
        }
    }
    const uploadFileApiCall = async (formData) => {
        const uploadPDF = await PARLOUR_UPLOADSKYC(formData);
        if (uploadPDF) {
            toast.success("File Uploaded");
            fetchApi()
        } else {
            toast.error("File name already exists");
        }
    };
    const handleFileUpload = async (file) => {
        if (file) {
            try {
                const formData = new FormData();
                formData.append("kycPdf", file);
                formData.append("salonId", salonId);
                // Replace with your file upload API call
                await uploadFileApiCall(formData);

                // Reset file input

                // Refresh the data or update UI accordingly
            } catch (error) {
                console.error("File upload failed", error);
            }
        }
    };
    const deleteFileApiCall = async () => {
        if (selectedFile) {
            try {
                const isDeleted = await DELETE_FILE({ file: selectedFile, salonId });
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
    const handleFileDelete = async (file) => {
        setShowConfirmation(true)
        setSelectedFile(file)



    }

    const handleFileChange = (event) => {
        const file = event.target.files[0];
        handleFileUpload(file);
    };

    useEffect(() => {
        fetchApi()
    }, [show])
    const cols = [
        {
            name: "S.No",
            id: 'index'

        },
        {
            name: "FileName",
            id: 'name'

        },
        {
            name: 'File',
            id: 'url'
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
    return (
        <>
            <div className="relative top-[10%] bottom-[20%] m-auto p-4 w-full h-full my-auto max-w-[60vw] max-h-full">
                {/* Modal content */}
                <div className="relative h-fit  my-auto bg-white rounded-lg shadow ">
                    {/* Modal header */}
                    <div className="flex items-center justify-between p-4 md:p-5 border-b rounded-t ">
                        <h3 className="text-lg font-semibold text-gray-900 ">Kyc Documents</h3>
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

                        <p className="text-gray-500  mb-4">Kyc Docs:</p>

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
                                                        let {id}=col
                                                        let val =elm[id];

                                                        return (
                                                            <td key={idx} className="text-gray-500 p-2">{
                                                                col.id === 'index' ? index + 1
                                                                    : col.id === "url"
                                                                        ? <Link to={val} target="_blank">
                                                                            <FaLink className="cursor-pointer text-blue-600 text-lg" />
                                                                        </Link>
                                                                        : col.id === "createdAt"
                                                                            ? formatDateToFull(val)
                                                                            : col.id === "actions" ? <button onClick={()=>handleFileDelete(elm)} className="text-rose-600 text-xl"><MdDeleteForever />
                                                                            </button> :
                                                                                val}</td>
                                                        )
                                                    })}

                                                </tr>
                                            )
                                        })}
                                    </tbody>
                                </table>

                            </div> : <div className="text-center py-5 text-gray-500">
                                <span>No Docs Found</span>
                            </div>}
                        <div
                            className=""
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
export default KycModal;
