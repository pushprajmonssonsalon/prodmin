import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";

export default function BasicTable({ headings, rows }) {
  function formatDateToFull(dateString) {
    if (dateString) {
      const [year, month, day] = dateString?.split("T")[0].split("-");
      console.log(year, month, day, "datestr");
      // Convert month from "08" to "Aug" or any other short form
      const monthNames = [
        "Jan",
        "Feb",
        "Mar",
        "Apr",
        "May",
        "Jun",
        "Jul",
        "Aug",
        "Sep",
        "Oct",
        "Nov",
        "Dec",
      ];
      const monthShort = monthNames[parseInt(month, 10) - 1];

      // Format the date as "7 Aug 2024"
      const formattedDate = `${parseInt(day, 10)} ${monthShort} ${year}`;
      return formattedDate;
    }
    return dateString;
  }
  return (
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 350 }} aria-label="simple table">
        <TableHead>
          <TableRow>
            {headings.map((heading) => (
              <TableCell sx={{ fontWeight: 600 }}>{heading}</TableCell>
            ))}
          </TableRow>
        </TableHead>
        <TableBody>
          {rows.map((row) => (
            <TableRow
              key={row.name}
              sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
            >
              <TableCell component="th" scope="row">
                {row.name}
              </TableCell>
              <TableCell align="right">{row.url}</TableCell>
              <TableCell align="">{formatDateToFull(row.date)}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
