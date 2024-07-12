import * as React from 'react';
import Box from '@mui/material/Box';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';

export default function EditStatusModal({status,setStatus,handleChange}) {
  
//   console.log(status)

  return (
    <Box sx={{ minWidth: '70%' }}>
      <FormControl fullWidth>
        <InputLabel id="demo-simple-select-label">Select Status...</InputLabel>
        <Select
          labelId="demo-simple-select-label"
          id="demo-simple-select"
          value={status}
          label="Status"
          onChange={handleChange}
        >
          
          <MenuItem value={4}>Accepted</MenuItem>
          <MenuItem value={5}>Pacakging</MenuItem>
          <MenuItem value={6}>Dispatch</MenuItem>
        </Select>
      </FormControl>
    </Box>
  );
}
