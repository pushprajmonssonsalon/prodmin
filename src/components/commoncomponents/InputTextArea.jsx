import * as React from 'react';
import TextField from '@mui/material/TextField';

export default function InputTextArea({placeholder,label,setProperty,value}) {
  return (
    <div className='w-full'>
      <TextField  label={label} className='w-full ' 
      value={value}
      onChange={(e)=>setProperty(e.target.value)}
      />
    </div>
  );
}
