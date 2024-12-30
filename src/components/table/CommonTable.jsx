import { useEffect, useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import formatDateToFull from "../../services/utils/formatDate";

const CommonTable = ({ rows, cols, onUpdate }) => {
  const [isEdit, setIsEdit] = useState(Array(rows?.length).fill(false));

  const [selectedProduct, setSelectedProduct] = useState({});

  const handleEdit = (idx, id) => {
    const product = rows?.find((elm) => elm?._id === id);

    setSelectedProduct(product);
    setIsEdit((prev) =>
      prev.map((item, i) => (i === idx && product ? !item : false))
    );
  };

  const handleSave = (idx, id) => {
    if (selectedProduct?._id === id) {
      const { _id, creditsLeft,validTo } = selectedProduct;
      const payload = {
        membershipId:_id,
        creditsLeft,
        validTo,
      };
      onUpdate(payload)
        .then((res) => {
          if (res) {
            setIsEdit((prev) =>
              prev.map((item, i) => (i === idx ? !item : false))
            );
          }
        })
        .catch(() => {});
    }
  };

  const handleChange = (e, name) => {
    if (e?.target) {
      const { value, name } = e.target;
      setSelectedProduct((prev) => ({
        ...prev,
        [name]: e?.target?.type === "number" ? +value : value,
      }));
    } else {
      setSelectedProduct((prev) => ({
        ...prev,
        [name]: e,
      }));
    }
  };
  
  useEffect(() => {
    setIsEdit(Array(rows?.length).fill(false));
  }, [rows]);
  return (
    <>
      <div className="relative  shadow-md sm:rounded-lg mx-auto my-2 ">
        <table className="w-full   mx-auto text-sm text-left rtl:text-right text-gray-500 ">
          <thead className="text-xs sticky top-0  text-gray-700 uppercase bg-gray-50  ">
            <tr className="">
              {cols?.map((col, index) => (
                <th key={index} scope="col" className="px-6 py-3">
                  {col?.label}
                </th>
              ))}
              <th scope="col" className="p-4"></th>
            </tr>
          </thead>
          <tbody className="">
            { rows?.length>0&&rows?.map((row, index) => {
              return (
                <tr
                  key={index}
                  className="bg-white border-b   hover:bg-gray-50 "
                >
                  {cols?.map((col, i) => {
                    const value = row[col?.id];
                    const inputValue = selectedProduct[col?.id];
                    const { isEditable, date } = col;

                    return (
                      <td className="px-6 py-4 min-w-[180px]">
                        {isEdit[index] &&
                        row?._id === selectedProduct?._id &&
                        isEditable ? (
                          date ? (
                            <DatePicker
                              name={col.id}
                              selectsStart
                              selected={inputValue}
                              onChange={(e) => handleChange(e, col?.id)}
                              className="p-2 border border-gray-200"
                            />
                          ) : (
                            <input
                              name={col?.id}
                              type={
                                typeof inputValue === "number"
                                  ? "number"
                                  : "text"
                              }
                              onChange={(e) => handleChange(e)}
                              value={inputValue}
                              className="border w-full border-gray-300 focus:ring-2 outline-none p-2 rounded-md  text-sm text-gray-900   focus:ring-blue-400  "
                            />
                          )
                        ) : date ? (
                          formatDateToFull(value, false)
                        ) : (
                          value
                        )}
                      </td>
                    );
                  })}

                  <td className="px-6 py-4">
                    {isEdit[index] && row?._id === selectedProduct?._id ? (
                      <button
                        className="font-medium text-blue-600  hover:underline"
                        onClick={() => handleSave(index, row?._id)}
                      >
                        Save
                      </button>
                    ) : (
                      <button
                        className="font-medium text-blue-600  hover:underline"
                        onClick={() => handleEdit(index, row?._id)}
                      >
                        Edit
                      </button>
                    )}
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </>
  );
};

export default CommonTable;
