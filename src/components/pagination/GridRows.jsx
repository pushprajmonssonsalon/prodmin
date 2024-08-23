const GridRows = ({itemsPerPage,handleRowschange}) => {
  return (
    <>
          <div className="flex justify-end w-[95%] mx-auto mt-2  gap-3 items-center">
            <div className="text-sm text-gray-700">Rows per page</div>
            <select
                
                className=" max-w-md bg-transparent outline-none  p-2 rounded-md  text-sm text-gray-900    "
                name="limit"
                value={itemsPerPage}
                onChange={handleRowschange}
              >
                <option ></option>
               {
                  [5,10,50,100]?.map((item, index) => (
                    <option key={index} value={item}>
                      {item}
                    </option>
                  ))}
              </select>
            </div>
    </>
  )
}

export default GridRows