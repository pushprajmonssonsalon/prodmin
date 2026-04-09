import { useSearchParams } from "react-router-dom";

const CustomDatePicker = ({
    setEndDate,
    onSubmit,
    setStartDate,

    startDate,
    endDate,
}) => {
  const [searchParams, setSearchParams] = useSearchParams();

   
    
    const handleDateChange = (e) => {
        const {id,value} = e.target
        if(id==="startDate"){
            setStartDate(value)
        }else{
            setEndDate(value)
        }

    }
  const onSubmitClick = () => {

   
     const updatedParams = new URLSearchParams(searchParams);
    updatedParams.set('start', startDate);
    updatedParams.set('end', endDate);
    setSearchParams(updatedParams);

    onSubmit();
  };
    return (
       

            <div  className="flex items-center gap-4">
                <div className="flex flex-col gap-2">
                    <label id="startDate" className="text-gray-500 font-medium">Start Date</label>
                    <input
                        id="startDate"
                        value={startDate}
                        onChange={handleDateChange}
                        name="start"
                        type="date"
                        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full  p-2.5"
                        placeholder="Select date start"
                    />
                </div>
                <span className="h-full mx-4 mt-3 text-gray-500">to</span>
                <div className="flex flex-col gap-2">
                    <label  id="endDate" className="text-gray-500 font-medium">End Date</label>
                    <input
                       value={endDate}
                        onChange={handleDateChange}
                        id="endDate"
                        name="end"
                        type="date"
                        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full  p-2.5"
                        placeholder="Select date end"
                    />
                </div>
                <button onClick={onSubmitClick} className='bg-blue-500 font-medium text-white px-4 py-2 rounded-md ml-4 mt-6'>Submit</button>
            </div>


       
    )
}

export default CustomDatePicker