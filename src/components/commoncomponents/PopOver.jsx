import * as React from 'react';
import Popover from '@mui/material/Popover';
import { BsThreeDotsVertical } from 'react-icons/bs';
import { Button } from '@mui/material';

export default function CustomPopover() {
  const [anchorEl, setAnchorEl] = React.useState(null);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const open = Boolean(anchorEl);
  const id = open ? 'simple-popover' : undefined;

  return (
    <div>
      <BsThreeDotsVertical size={20} onClick={handleClick} className='cursor-pointer'/>
      <Popover
        id={id}
        open={open}
        anchorEl={anchorEl}
        onClose={handleClose}
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'left',
        }}
      >
        <Button sx={{ p: 2 }}>Logout</Button>
      </Popover>
    </div>
  );
}
