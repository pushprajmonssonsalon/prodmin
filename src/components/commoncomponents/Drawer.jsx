import * as React from 'react';
import Drawer from '@mui/material/Drawer';
import Button from '@mui/material/Button';
import CustomSelect from './CustomSelect';



export default function AnchorTemporaryDrawer() {
  const [state, setState] = React.useState({right: false});

  const toggleDrawer = (anchor, open) => (event) => {
    if (event.type === 'keydown' && (event.key === 'Tab' || event.key === 'Shift')) {
      return;
    }

    setState({ ...state, [anchor]: open });
  };


  return (
    <div>
      {['right'].map((anchor) => (
        <React.Fragment key={anchor}>
          <Button onClick={toggleDrawer(anchor, true)} variant='outlined'>more filter</Button>
          <Drawer
            anchor={anchor}
            open={state[anchor]}
            onClose={toggleDrawer(anchor, false)}
            sx={{paddingLeft: 2,paddingRight:2}}
          >
          <h1 className='text-xl font-serif px-2 my-2'>Select Start Date</h1>
           <CustomSelect />
           <h1 className='text-xl font-serif px-2 my-2'>Select End Date</h1>
           <CustomSelect />
           <Button onClick={()=>{}} variant='outlined' sx={{marginTop: 2}}>Apply Filter</Button>
          </Drawer>
        </React.Fragment>
      ))}
    </div>
  );
}
