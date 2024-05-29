import * as React from 'react';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';

export default function CustomCard({icon,title,price,bg}) {

  return (
    <Card sx={{ display: 'flex',backgroundColor: bg  }} className={`w-[22%] justify-between items-center box-border`}>
      <Box sx={{ display: 'flex', flexDirection: 'column' }}>
        <CardContent sx={{ flex: '1 0 auto' }}>
          <h1 className=' text-white font-semibold text-lg'>
            {title}
          </h1>
          <h1 className='text-white text-3xl font-medium'>
            {price}
          </h1>
        </CardContent>
      </Box>
      <Box className="cursor-pointer text-[50px] text-white px-2">
        {icon}
      </Box>
    </Card>
  );
}
