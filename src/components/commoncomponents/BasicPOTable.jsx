import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";

export default function BasicPOTable({ headings, rows }) {
  console.log('rowscoming',rows)
  function capitalizeFirstLetter(str) {
    return str
      .toLowerCase()
      .replace(/^\w|\s\w/g, function(match) {
        return match.toUpperCase();
      });
  }
  return (
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 350 }} aria-label="simple table">
        <TableHead>
          <TableRow>
            {headings.map((heading) => (
              <TableCell sx={{ fontWeight: 600,textTransform: 'uppercase' }}>{heading}</TableCell>
            ))}
          </TableRow>
        </TableHead>
        <TableBody>
          {rows?.map((row) => (
            <TableRow
              key={row.name}
              sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
            >
              <TableCell component="th" scope="row" >
                {capitalizeFirstLetter(row.name)}
              </TableCell>
              <TableCell align="">{row.brand}</TableCell>
              <TableCell align="">{row.mrp}</TableCell>
              <TableCell align="">{row.type}</TableCell>
              <TableCell align="center">{row.orderedQuantity}</TableCell>
              <TableCell align="center">{row?.receivedQuantity}</TableCell>
              <TableCell align="center">{row?.subtotal}</TableCell>
              <TableCell align="center">{row?.discount} %</TableCell>
              <TableCell align="center">{row?.total}</TableCell>
              {/* <TableCell align="center">{row.orderedQuantity }{"%"}</TableCell> */}
              {/* <TableCell align="center">{row.mrp*row.orderedQuantity-10}</TableCell> */}
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
