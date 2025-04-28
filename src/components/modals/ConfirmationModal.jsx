import Modal from "../modal/Modal";

const ConfirmationModal = ({ show, setShow, onSubmit,text }) => {
    return (
        <>
            {" "}
            <Modal show={show} setShow={setShow}>
                <ChildComponent onSubmit={onSubmit} show={show}  text={text} />
            </Modal>
        </>
    );
};


const ChildComponent = ({ closeModal, onSubmit,text}) => {

    return (
        <div className="relative top-[10%] bottom-[20%] m-auto p-4 w-full h-full my-auto max-w-[60vw] max-h-full">
            {/* Modal content */}
            <div className="relative h-fit  my-auto bg-white rounded-lg shadow ">
                {/* Modal header */}
                <div className="flex items-center justify-between p-4 md:p-5 border-b rounded-t ">
                    <h3 className="text-lg font-semibold text-gray-900 ">Confirmation</h3>
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
                  <h2 className="">{text}</h2>
                  <div className="flex justify-end gap-4 mt-4">
                    <button
                        type="button"
                        className="text-gray-500 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm px-4 py-2"
                        onClick={closeModal}
                    >
                        Cancel
                    </button>
                    <button
                        type="button"
                        className="text-white bg-blue-600 hover:bg-blue-700 rounded-lg text-sm px-4 py-2"
                        onClick={onSubmit}
                    >
                        Confirm
                    </button>
                  </div>
                </div>

            </div>
        </div>
    );
};
export default ConfirmationModal;
