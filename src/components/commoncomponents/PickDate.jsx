
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

export default function PickDate({datte,setDatte}) {
    
  
  return (
          <DatePicker
            selectsStart
            selected={datte}
            onChange={(date) => setDatte(date)}
            startDate={datte}
            className='py-2 grow outline-none px-3 rounded-lg border'
          />
  )
}
