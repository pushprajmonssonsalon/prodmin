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

export default function CustomTable({headings,rows,handleRowClick,handleOpen,page,setPage,rowsPerPage, setRowsPerPage,totalOrders,settelment=false}) {
  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };
  const {expanded} = useAppContext();


  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };
  const handleDoubleFunction=(id,col)=>{
    console.log(col,"column")
    // console.log("id---------",id)
    handleRowClick(id);
    if(allowedcols.includes(col.id))handleOpen();

  }

  return (
    <Paper  sx={!settelment?{width:"100%",maxWidth:expanded?'calc(100vw - 380px)':'calc(100vw- 220px)',overflow:"auto" ,margin:"20px auto" }:{
      maxWidth: expanded?'calc(100vw - 470px)':'calc(100vw - 220px)', // calculate width on large screens
  
      overflow: 'hidden',
      margin:"20px auto"
    }} className='overflow-hidden mt-10 '>
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
                console.log(rows,"rows")
                return (
                  <TableRow hover role="checkbox" tabIndex={-1} key={row?.code}>
                    {headings.map((column) => {
                      const value = row[column.id];
                      return (
                        <TableCell key={column.id} align={column.align} sx={{cursor:"pointer"}}  onClick={()=>handleDoubleFunction(row?.id,column)}>
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

const allowedcols =["poId","trade"]
