import Paper from '@mui/material/Paper';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TablePagination from '@mui/material/TablePagination';
import TableRow from '@mui/material/TableRow';
import { isValidElement } from 'react';
import { useAppContext } from '../../services/context/AppContext';

export default function CustomTable({orders=false,distributer=false,headings,rows,handleRowClick,handleOpen,page,setPage,rowsPerPage, setRowsPerPage,totalOrders,settelment=false}) {
  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };
  const {expanded} = useAppContext();


  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };
  const handleDoubleFunction=(row,col)=>{

    if(distributer){
    
      handleRowClick(row);
      if(allowedcols.includes(col.id))handleOpen();
    }
    else{
      const id = row?.salonId||row?.id;
    
      // 
      handleRowClick(id);
      //  handleOpen();
    }
    

  }

  return (
    <Paper  sx={{width:"97%",overflow:"auto" ,margin:"20px auto" }} className='overflow-hidden mt-10 '>
      <TableContainer sx={{ maxHeight:900}} >
        <Table stickyHeader aria-label="sticky table">
          <TableHead>
            <TableRow>
              {headings.map((column) => (
                <TableCell
                  key={column.id}
                  align={column.align}
                  style={{ minWidth: column.minWidth }}
                  sx={{textTransform:"uppercase",fontWeight:700}}
                >
                  {column.label}
                </TableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            {rows
              ?.map((row) => {
                
                return (
                  <TableRow hover role="checkbox" tabIndex={-1} key={row?.code}>
                    {headings.map((column) => {
                      const value = row[column.id];
                      console.log(orders,row["status"],"orders")
                      return (
                        <TableCell key={column.id} align={column.align} sx={{cursor:"pointer",backgroundColor:(orders&&row["status"])==="Cancelled"?"#FF7070":""}}  onClick={()=>handleDoubleFunction(row,column)}>
                          {isValidElement(value) 
                            ? <div style={{ display: 'flex', justifyContent: column.align === 'right' ? 'flex-end' : 'flex-start' }}>
                                {value}
                              </div> 
                            : (column.format && typeof value === 'number')
                              ? column.format(value)
                              : value}
                        </TableCell>
                      );
                    })}
                  </TableRow>
                );
          
              })}
          </TableBody>
        </Table>
      </TableContainer>
      <TablePagination
        
        rowsPerPageOptions={[10, 25, 50,100,200]}
        component="div"
        count={totalOrders}
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
      />
    </Paper>
  );
}

const allowedcols =["poId","trade","salonId","name","salonid"]
