import * as React from 'react';
// import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';

export default function DatePicker() {
  const [date, setDate] = React.useState('Today');

  const handleChange = (event) => {
    setDate(event.target.value)
  };

  return (
    <div>
      <FormControl variant="standard" sx={{ m: 1, minWidth: 200 }}>
        {/* <InputLabel id="demo-simple-select-standard-label">Filter</InputLabel> */}
        <Select
          labelId="demo-simple-select-standard-label"
          id="demo-simple-select-standard"
          value={date}
          onChange={handleChange}
          label="Filter"
        >
          <MenuItem value={"Today"}>Today</MenuItem>
          <MenuItem value={"Yesterday"}>Yesterday</MenuItem>
          <MenuItem value={"last7days"}>Last 7 days</MenuItem>
          <MenuItem value={"last30days"}>Last 30 days</MenuItem>
          <MenuItem value={"thismonth"}>This Month</MenuItem>
          <MenuItem value={"lastmonth"}>Last Month</MenuItem>
          {/* <MenuItem value={"custom"}>Custom</MenuItem> */}
        </Select>
      </FormControl>
    </div>
  );
}
