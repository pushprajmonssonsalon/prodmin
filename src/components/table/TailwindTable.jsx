import { useEffect, useState } from "react";

const TailwindTable = ({ cols, rows, onUpdate,isProduct=true ,isEditable=true}) => {
  const [isEdit, setIsEdit] = useState(Array(rows?.length).fill(false));
  
  const [selectedProduct, setSelectedProduct] = useState({});

  const handleEdit = (idx, id) => {
    const product = rows?.find((elm) => elm?._id === id);

    if(isProduct){
      setSelectedProduct(product);
      setIsEdit((prev) =>
        prev.map((item, i) => (i === idx && product ? !item : false))
      );
    }
    else{
      onUpdate(product)
    }
    
  };

  const handleSave = (idx, id) => {
    if (selectedProduct?._id === id) {
      const resp = onUpdate(selectedProduct);
      if(resp){
        setIsEdit((prev) => prev.map((item, i) => (i === idx ? !item : false)));
         
      }
    }
  };

  const handleChange = (e) => {
    const { value, name } = e.target;
    setSelectedProduct((prev) => ({
      ...prev,
      [name]: value,
    }));
  };
  useEffect(()=>{
   setIsEdit(Array(rows?.length).fill(false))
  },[rows])
  return (
    <>
      <div className="relative max-w-full shadow-md sm:rounded-lg mx-auto max-h-[80vh] overflow-y-auto overflow-x-auto my-2 ">
        <table className="w-full   mx-auto text-sm text-left rtl:text-right text-gray-500 ">
          <thead className="text-xs sticky top-0 text-gray-700 uppercase bg-gray-50  ">
            <tr>
              {cols?.map((col, index) => (
                <th key={index} scope="col" className="px-6 py-3">
                  {col?.label}
                </th>
              ))}

{isEditable&&              <th scope="col" className="p-4"></th>
}            </tr>
          </thead>
          <tbody className="">
            {rows?.map((row, index) => {
              return (
                <tr
                  key={index}
                  className="bg-white border-b   hover:bg-gray-50 "
                >
                  {cols?.map((col, i) => {
                    const value = row[col?.id];
                    const inputValue = selectedProduct[col?.id];

                    if (col.id === "name") {
                      return (
                        <th
                          scope="row"
                          className="px-6 py-4 max-w-[380px] overflow-hidden text-ellipsis  font-medium min-w-[180px] text-gray-900 whitespace-nowrap "
                        >
                          {isEdit[index] &&
                          row?._id === selectedProduct?._id && isProduct? (
                            <input
                              name={col?.id}
                              type={
                                typeof inputValue === "number"
                                  ? "number"
                                  : "text"
                              }
                              value={inputValue}
                              onChange={(e) => handleChange(e, index)}
                              className="border w-full border-gray-300 focus:ring-2 outline-none p-2 rounded-md text-sm text-gray-900   focus:ring-blue-400  "
                            />
                          ) : (
                            value
                          )}
                        </th>
                      );
                    } else {
                      return (
                        <td className="px-6 py-4 min-w-[180px]">
                          {isEdit[index] &&
                          row?._id === selectedProduct?._id && isProduct ? (
                            <input
                              name={col?.id}
                              type={
                                typeof inputValue === "number"
                                  ? "number"
                                  : "text"
                              }
                              onChange={(e) => handleChange(e, index)}
                              value={inputValue}
                              className="border w-full border-gray-300 focus:ring-2 outline-none p-2 rounded-md  text-sm text-gray-900   focus:ring-blue-400  "
                            />
                          ) : (
                            value
                          )}
                        </td>
                      );
                    }
                  })}

               {isEditable &&   <td className="px-6 py-4">
                    {isEdit[index] && row?._id === selectedProduct?._id && isProduct? (
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
                  </td>}
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </>
  );
};

export default TailwindTable;
