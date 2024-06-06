import * as React from 'react';
// import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import { InputLabel } from '@mui/material';

export default function MonthPicker() {
    const months = [
      "January", "February", "March", "April", "May", "June", 
  "July", "August", "September", "October", "November", "December"
  ];
    const currentMonth = new Date().getMonth();
  const [date, setDate] = React.useState(months[currentMonth]);

  const handleChange = (event) => {
    setDate(event.target.value)
  };

  return (
    <div>
      <FormControl variant="standard" sx={{ m: 1, minWidth: 200 }}>
        <InputLabel id="demo-simple-select-standard-label">Months</InputLabel>
        <Select
          labelId="demo-simple-select-standard-label"
          id="demo-simple-select-standard"
          value={date}
          onChange={handleChange}
          label="Filter"
        >
        {
        months.map((month,index)=>(
          <MenuItem value={`${month}`}>{month}</MenuItem>
        ))
        }
    
        </Select>
      </FormControl>
    </div>
  );
}
