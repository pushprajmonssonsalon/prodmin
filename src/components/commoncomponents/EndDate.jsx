
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

export default function EndDate({datte,setDatte}) {
    
  
  return (
          <DatePicker
            selectsStart
            selected={datte}
            onChange={(date) => setDatte(date)}
            startDate={datte}
            className='py-2 px-3 grow outline-none rounded-lg border '
          />
  )
}
