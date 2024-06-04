import * as React from 'react';
import { styled } from '@mui/material/styles';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import InputBase from '@mui/material/InputBase';

const BootstrapInput = styled(InputBase)(({ theme }) => ({
  'label + &': {
    marginTop: theme.spacing(3),
  },
  '& .MuiInputBase-input': {
    borderRadius: 4,
    position: 'relative',
    backgroundColor: theme.palette.background.paper,
    border: '1px solid #ced4da',
    fontSize: 16,
    padding: '10px 26px 10px 12px',
    transition: theme.transitions.create(['border-color', 'box-shadow']),
    // Use the system font instead of the default Roboto font.
    fontFamily: [
      '-apple-system',
      'BlinkMacSystemFont',
      '"Segoe UI"',
      'Roboto',
      '"Helvetica Neue"',
      'Arial',
      'sans-serif',
      '"Apple Color Emoji"',
      '"Segoe UI Emoji"',
      '"Segoe UI Symbol"',
    ].join(','),
    '&:focus': {
      borderRadius: 4,
      borderColor: '#80bdff',
      boxShadow: '0 0 0 0.2rem rgba(0,123,255,.25)',
    },
  },
}));

export default function CustomSelect() {
  const [month,setMonth] = React.useState('')
  const [date,setDate] = React.useState('');
  const [year, setYear] = React.useState('')
  
  const handleMonth = (event) => {
    setMonth(event.target.value);
  };
  const handleDate = (event) => {
    setDate(event.target.value);
  };
  const handleYear = (event) => {
    setYear(event.target.value);
  };
  return (
    <div>
      <FormControl sx={{ m: 1 }} variant="standard">
        <InputLabel id="demo-customized-select-label">Date</InputLabel>
        <Select
          labelId="demo-customized-select-label"
          id="demo-customized-select"
          value={date}
          onChange={handleDate}
          input={<BootstrapInput />}
        >
        {
            [
    "1", "2", "3", "4", "5", "6", "7", "8", "9", "10", 
    "11", "12", "13", "14", "15", "16", "17", "18", "19", "20", 
    "21", "22", "23", "24", "25", "26", "27", "28", "29", "30", "31"
].map((date)=>(
    <MenuItem value={date}>{date}</MenuItem>
))
        }
        </Select>
      </FormControl>
      <FormControl sx={{ m: 1 }} variant="standard">
        <InputLabel id="demo-customized-select-label">Months</InputLabel>
        <Select
          labelId="demo-customized-select-label"
          id="demo-customized-select"
          value={month}
          onChange={handleMonth}
          input={<BootstrapInput />}
        >
          {
            [
                "January", "February", "March", "April", "May", "June", 
    "July", "August", "September", "October", "November", "December"
].map((month)=>(
    <MenuItem value={month}>{month}</MenuItem>
))
        }
        </Select>
      </FormControl>
      <FormControl sx={{ m: 1 }} variant="standard">
        <InputLabel htmlFor="demo-customized-select-native">Year</InputLabel>
        <Select
          id="demo-customized-select-native"
          value={year}
          onChange={handleYear}
          input={<BootstrapInput />}
        >
          {
            [
    "2000", "2001", "2002", "2003", "2004", "2005", "2006", "2007", "2008", "2009",
    "2010", "2011", "2012", "2013", "2014", "2015", "2016", "2017", "2018", "2019",
    "2020", "2021", "2022", "2023", "2024", "2025", "2026", "2027", "2028", "2029",
    "2030", "2031", "2032", "2033", "2034", "2035", "2036", "2037", "2038", "2039",
    "2040", "2041", "2042", "2043", "2044", "2045", "2046", "2047", "2048", "2049", "2050"
].map((year)=>(
    <MenuItem value={year}>{year}</MenuItem>
))
        }
        </Select>
      </FormControl>
    </div>
  );
}
