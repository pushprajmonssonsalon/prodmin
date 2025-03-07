import Modal from "../modal/Modal";

const OrderModal = ({ show, setShow, onSubmit,data }) => {
  return (
    <>
      {" "}
      <Modal show={show} setShow={setShow}>
        <ChildComponent onSubmit={onSubmit} data={data} />
      </Modal>
    </>
  );
};

const ChildComponent = ({ closeModal,data }) => {

  return (
    <div className="relative top-[10%] bottom-[20%] m-auto p-4 w-full h-full my-auto max-w-[60vw] max-h-full">
      {/* Modal content */}
      <div className="relative h-fit max-h-full  my-auto bg-white rounded-lg shadow ">
        {/* Modal header */}
        <div className="flex items-center justify-between p-4 md:p-5 border-b rounded-t ">
          <h3 className="text-lg font-semibold text-gray-900 ">Products</h3>
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
        <div className="p-4 max-h-[60vh] overflow-y-auto w-full md:p-5">
         <table className="w-full border border-collapse ">
            <thead>
                <tr>
                    <th className="p-2 font-medium uppercase border ">S.NO</th>
                    <th className="p-2 font-medium uppercase border ">Product</th>
                    <th className="p-2 font-medium uppercase border ">Quantity</th>
                    <th className="p-2 font-medium uppercase border ">Price</th>
                </tr>
            </thead>
            <tbody>
                {data?.length>0&&data?.map((elm,idx)=>(
                    <tr key={idx}>
                        <td className="p-2  border">{idx+1}</td>
                        <td className="p-2  border">{elm?.name}</td>
                        <td className="p-2  border">{elm?.quantity}</td>
                        <td className="p-2  border">{elm?.price}</td>
                    </tr>
                ))}
            </tbody>
         </table>
           
        
        </div>
      </div>
    </div>
  );
};
export default OrderModal;
