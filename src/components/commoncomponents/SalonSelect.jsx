import Box from '@mui/material/Box';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';

export default function SalonSelect({value,setValue,handleChange}) {
  
//   console.log(status)

  return (
    <Box sx={{ minWidth: '200px' ,flexGrow:1}}>
      <FormControl fullWidth>
        <InputLabel id="demo-simple-select-label">Select Salon type...</InputLabel>
        <Select
          labelId="demo-simple-select-label"
          id="demo-simple-select"
          value={value}
          label="slaon type"
          onChange={handleChange}
        >
          
          <MenuItem value={'Smart Salon'}>Smart Salon</MenuItem>
          <MenuItem value={'Monsoon Salon'}>Monsoon Salon</MenuItem>
          <MenuItem value={'Monsoon Salon Pro'}>Monsoon Salon Pro</MenuItem>
        </Select>
      </FormControl>
    </Box>
  );
}
