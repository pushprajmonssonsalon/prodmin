import * as React from 'react';
// import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import { InputLabel } from '@mui/material';

export default function YearPicker() {
    const years = [
          "2000", "2001", "2002", "2003", "2004", "2005", "2006", "2007", "2008", "2009",
          "2010", "2011", "2012", "2013", "2014", "2015", "2016", "2017", "2018", "2019",
          "2020", "2021", "2022", "2023", "2024", "2025", "2026", "2027", "2028", "2029",
          "2030", "2031", "2032", "2033", "2034", "2035", "2036", "2037", "2038", "2039",
          "2040", "2041", "2042", "2043", "2044", "2045", "2046", "2047", "2048", "2049", "2050"
      ];
    const currentYear = new Date().getFullYear();
  const [date, setDate] = React.useState(currentYear.toString());

  const handleChange = (event) => {
    setDate(event.target.value)
  };

  return (
    <div>
      <FormControl variant="standard" sx={{ m: 1, minWidth: 200 }}>
        <InputLabel id="demo-simple-select-standard-label">Years</InputLabel>
        <Select
          labelId="demo-simple-select-standard-label"
          id="demo-simple-select-standard"
          value={date}
          onChange={handleChange}
          label="Filter"
        >
        {
        years.map((year,index)=>(
          <MenuItem value={`${year}`}>{year}</MenuItem>
        ))
        }
    
        </Select>
      </FormControl>
    </div>
  );
}
