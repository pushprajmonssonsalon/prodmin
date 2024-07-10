
import { Button } from '@mui/material';
import React from 'react'
import { useState } from 'react'
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

export default function PickDate({datte,setDatte}) {
    
  
  return (
          <DatePicker
            selectsStart
            selected={datte}
            onChange={(date) => setDatte(date)}
            startDate={datte}
            
          />
  )
}
