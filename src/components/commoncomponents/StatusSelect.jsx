import Box from '@mui/material/Box';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';

export default function StatusSelect({value,setValue,handleChange}) {
  
//   console.log(status)

  return (
    <Box sx={{ minWidth: '200px' }}>
      <FormControl fullWidth>
        <InputLabel id="demo-simple-select-label">Select Status...</InputLabel>
        <Select
          labelId="demo-simple-select-label"
          id="demo-simple-select"
          value={value}
          label="Status"
          onChange={handleChange}
        >
          
          <MenuItem value={1}>Placed</MenuItem>
          <MenuItem value={2}>Received/Delivered</MenuItem>
          <MenuItem value={3}>Canceled</MenuItem>
          <MenuItem value={4}>Accepted</MenuItem>
          <MenuItem value={5}>Pacakging</MenuItem>
          <MenuItem value={6}>Dispatch</MenuItem>
        </Select>
      </FormControl>
    </Box>
  );
}
