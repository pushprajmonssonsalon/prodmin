import * as React from 'react';
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';

const style = {
  position: 'absolute' ,
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  p: 4,
};

export default function OrderModal({data,open,setOpen,handleOpen,handleClose}) {

  return (
    <div>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <h4 className='text-xl font-serif text-black font-bold'>Name: {data?.customerName}</h4>
          <h6 className='text-lg font-semibold font-mono'>Phone Number: {data?.customerPhoneNumber}</h6>
          <div>
            {data?.products?.map((product, index) => (
              <li key={index} className='text-sm'>{product?.name}</li>
            ))}
          </div>
        </Box>
      </Modal>
    </div>
  );
}
