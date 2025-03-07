import { useState } from "react";
import Modal from "../modal/Modal";

const ChooseVideo = ({ show, setShow, onSubmit, videos }) => {
  return (
    <>
      {" "}
      <Modal show={show} setShow={setShow}>
        <ChildComponent onSubmit={onSubmit} videos={videos} />
      </Modal>
    </>
  );
};

const ChildComponent = ({ closeModal, onSubmit, videos }) => {
  const [checked, setChecked] = useState(null);
  const handleSubmit = () => {
    if(checked!==null){
        onSubmit(checked);

    }
  };

  return (
    <div className="relative top-[10%] bottom-[20%] m-auto p-4 w-full h-full my-auto max-w-[60vw] max-h-full">
      {/* Modal content */}
      <div className="relative h-fit max-h-full  my-auto bg-white rounded-lg shadow ">
        {/* Modal header */}
        <div className="flex items-center justify-between p-4 md:p-5 border-b rounded-t ">
          <h3 className="text-lg font-semibold text-gray-900 ">Add Video</h3>
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
        <div className="p-4 max-h-[60vh] overflow-y-auto md:p-5">
          <p className="text-gray-500  mb-4">Select your desired video:</p>
          <ul className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-3 mb-4">
            {videos?.map((elm, idx) => (
              <li key={idx}>
                <input
                  type="radio"
                  id={`video-${idx}`}
                  name="video"
                  value={checked}
                  checked={checked === idx} // Set the radio as checked when index matches
                  onChange={() => setChecked(idx)} // Update state when a radio is clicked
                  className="hidden peer"
                  required=""
                />
                <label
                  htmlFor={`video-${idx}`}
                  className={`inline-flex h-full  items-center justify-between w-full p-3  text-gray-900 bg-white border-2  rounded-lg cursor-pointer ${
                    checked === idx
                      ? "text-blue-600 border-blue-600"
                      : "border-gray-200"
                  } hover:text-gray-900 hover:bg-gray-100`}
                  onClick={() => setChecked(idx)}
                >
                  <div className="w-full mb-auto">
                    <div className="w-full text-lg font-semibold">
                      <a
                        href={`${elm.url}`}
                        target="_blank"
                        className=""
                        rel="noopener noreferrer"
                      >
                        <img
                          className="h-[100px] w-full border border-gray-200"
                          src={elm.thumbnailUrl}
                          alt={elm.name}
                        />
                      </a>
                    </div>
                    <div className="w-full my-2 text-gray-500">{elm.title}</div>
                  </div>
                </label>
              </li>
            ))}
          </ul>
          <button
            onClick={handleSubmit}
            className="text-white mt-5 inline-flex w-full justify-center bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center "
          >
            Next step
          </button>
        </div>
      </div>
    </div>
  );
};
export default ChooseVideo;
