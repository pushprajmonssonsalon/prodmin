import { useEffect, useState } from "react";
import * as XLSX from "xlsx";
import Layout from "../components/Layout";
import TopBar from "../components/commoncomponents/TopBar";
import MonthPicker from "../components/commoncomponents/MonthPicker";
import YearPicker from "../components/commoncomponents/YearPicker";
import { Button } from "@mui/material";
import SettelmentTable from "../components/commoncomponents/SettelmentTable";
import {
  CREATE_TABLE,
  GET_TABLE,
  UPDATE_EXCEL_FILE,
} from "../services/crm/user.service";
import toast from "react-hot-toast";
import { useAppContext } from "../services/context/AppContext";

const Json = () => {
  const months = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];
  const years = [
    "2000",
    "2001",
    "2002",
    "2003",
    "2004",
    "2005",
    "2006",
    "2007",
    "2008",
    "2009",
    "2010",
    "2011",
    "2012",
    "2013",
    "2014",
    "2015",
    "2016",
    "2017",
    "2018",
    "2019",
    "2020",
    "2021",
    "2022",
    "2023",
    "2024",
    "2025",
    "2026",
    "2027",
    "2028",
    "2029",
    "2030",
    "2031",
    "2032",
    "2033",
    "2034",
    "2035",
    "2036",
    "2037",
    "2038",
    "2039",
    "2040",
    "2041",
    "2042",
    "2043",
    "2044",
    "2045",
    "2046",
    "2047",
    "2048",
    "2049",
    "2050",
  ];
  const currentYear = new Date().getFullYear();

  const currentMonth = new Date().getMonth();
  const { expanded } = useAppContext();
  const [month, setMonth] = useState(months[currentMonth]);
  const [generatedTable, setGeneratedTable] = useState([]);
  const [year, setYear] = useState(currentYear.toString());
  const [loading, setLoading] = useState(false);
  const [creating, setCreating] = useState(false);
  const [updatedBool, setUpdatedBool] = useState(false);
  const [createdBool, setCreatedBool] = useState(false);
  // const [rows, setRows] = useState([]);
  const [updatedRows, setUpdatedRows] = useState([]);
  const columns = [
    { id: "salonId", label: "Salon ID", minWidth: 170 },
    { id: "name", label: "Category", minWidth: 170 },
    { id: "address", label: "Address", minWidth: 170 },
    { id: "address2", label: "Address 2", minWidth: 170 },
    {
      id: "month",
      label: "Month",
      minWidth: 130,
      align: "right",
      format: (value) => value.toFixed(2),
    },
    {
      id: "A",
      label: "Monthly Royalty (+)",
      minWidth: 200,
      align: "right",
      format: (value) => value.toFixed(2),
    },
    {
      id: "B",
      label: "Product Sale (+)",
      minWidth: 170,
      align: "right",
      format: (value) => value.toFixed(2),
    },
    {
      id: "C",
      label: "Signup/Construction (+)",
      minWidth: 240,
      align: "right",
      format: (value) => value.toFixed(2),
    },
    {
      id: "D",
      label: "Others (+)",
      minWidth: 150,
      align: "right",
      format: (value) => value.toFixed(2),
    },
    {
      id: "totalReceivable",
      label: "Total Receivable",
      minWidth: 170,
      align: "right",
      format: (value) => value.toFixed(2),
    },
    {
      id: "E",
      label: "Discount Reimburse on L'Oreal (-)",
      minWidth: 170,
      align: "right",
      format: (value) => value.toFixed(2),
    },
    {
      id: "F",
      label: "Discount Reimburse on Own Brand (-)",
      minWidth: 170,
      align: "right",
      format: (value) => value.toFixed(2),
    },
    {
      id: "G",
      label: "Bonus Points (-)",
      minWidth: 170,
      align: "right",
      format: (value) => value.toFixed(2),
    },
    {
      id: "totalPayables",
      label: "Total Payables",
      minWidth: 170,
      align: "right",
      format: (value) => value.toFixed(2),
    },
    {
      id: "J",
      label: "GST Payable on Royalty (+)",
      minWidth: 170,
      align: "right",
      format: (value) => value.toFixed(2),
    },
    {
      id: "K",
      label: "GST Payable on Product (+)",
      minWidth: 170,
      align: "right",
      format: (value) => value.toFixed(2),
    },
    {
      id: "L",
      label: "GST Payable on Others (+)",
      minWidth: 170,
      align: "right",
      format: (value) => value.toFixed(2),
    },
    {
      id: "M",
      label: "GST Receivable on Discount Reimburse (-)",
      minWidth: 170,
      align: "right",
      format: (value) => value.toFixed(2),
    },
    {
      id: "N",
      label: "TDS Receivable (-)",
      minWidth: 200,
      align: "right",
      format: (value) => value.toFixed(2),
    },
    {
      id: "totalTaxRecoverable",
      label: "Total Tax Recoverable (-/+)",
      minWidth: 170,
      align: "right",
      format: (value) => value.toFixed(2),
    },
    {
      id: "netRecoverable",
      label: "Net Recoverable",
      minWidth: 170,
      align: "right",
      format: (value) => value.toFixed(2),
    },
    {
      id: "O",
      label: "Payment (+)",
      minWidth: 170,
      align: "right",
      format: (value) => value.toFixed(2),
    },
    {
      id: "P",
      label: "Receipt (-)",
      minWidth: 170,
      align: "right",
      format: (value) => value.toFixed(2),
    },
    {
      id: "netTransactionAmount",
      label: "Net Transaction Amount",
      minWidth: 170,
      align: "right",
      format: (value) => value.toFixed(2),
    },
    {
      id: "Q",
      label: "GST Paid on Royalty (+)",
      minWidth: 170,
      align: "right",
      format: (value) => value.toFixed(2),
    },
    {
      id: "R",
      label: "GST Paid on Product (+)",
      minWidth: 170,
      align: "right",
      format: (value) => value.toFixed(2),
    },
    {
      id: "S",
      label: "GST Paid on Others (+)",
      minWidth: 170,
      align: "right",
      format: (value) => value.toFixed(2),
    },
    {
      id: "T",
      label: "GST Received on Discount (-)",
      minWidth: 170,
      align: "right",
      format: (value) => value.toFixed(2),
    },
    {
      id: "U",
      label: "TDS Received  on Royalty/ Signup (-)",
      minWidth: 200,
      align: "right",
      format: (value) => value.toFixed(2),
    },
    {
      id: "nettax",
      label: "Net Tax Recoverable",
      minWidth: 170,
      align: "right",
      format: (value) => value.toFixed(2),
    },
    {
      id: "total",
      label: "Cumulative Closing Balance",
      minWidth: 170,
      align: "right",
      format: (value) => value.toFixed(2),
    },
  ];

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    const reader = new FileReader();
    reader.onload = (event) => {
      const data = new Uint8Array(event.target.result);
      const workbook = XLSX.read(data, { type: "array" });
      const sheetName = workbook.SheetNames[0];
      const worksheet = workbook.Sheets[sheetName];
      const jsonData = XLSX.utils.sheet_to_json(worksheet, { header: 1 });

      const headers = jsonData[1];
      const dataRows = jsonData.slice(2);
      const mappedData = dataRows.map((row) => {
        const mappedRow = {};
        headers.forEach((header, index) => {
          mappedRow[header] = row[index];
        });
        return mappedRow;
      });

      console.log("mappedData", mappedData);
      // setUpdatedRows(mappedData)
      setLoading(true);
      async function UseUpdateApi() {
        const updatedData = await UPDATE_EXCEL_FILE({
          salonData: mappedData,
          month: month.slice(0, 3),
          year: year,
        });
        if (updatedData) {
          toast.success("Updated Successffuly");
          setLoading(false);
          setUpdatedBool(!updatedBool);
        } else {
          toast.error("something went wrong");
          setLoading(false);
        }
      }
      UseUpdateApi();
    };
    reader.readAsArrayBuffer(file);
  };
  const handleCreateApiTable = async () => {
    setCreating(true);
    const createTable = await CREATE_TABLE({
      month: month.slice(0, 3),
      year: +year,
    });
    if (createTable) {
      setCreatedBool(!createdBool);
      setCreating(false);
      toast.success("Table is created");
    } else {
      toast.error("Table is already created for this month!");
      setCreating(false);
    }
    console.log("createTable", createTable);
  };
  useEffect(() => {
    async function fetchGetApi() {
      const table = await GET_TABLE({ month: month.slice(0, 3), year: +year });
      setGeneratedTable(table);
    }
    fetchGetApi();
  }, [month, year, updatedBool, createdBool]);
  function createData(
    salonId,
    name,
    address,
    address2,
    month,
    A,
    B,
    C,
    D,
    totalReceivable,
    E,
    F,
    G,
    totalPayables,
    J,
    K,
    L,
    M,
    N,
    totalTaxRecoverable,
    netRecoverable,
    O,
    P,
    netTransactionAmount,
    Q,
    R,
    S,
    T,
    U,
    nettax,
    total
  ) {
    return {
      salonId,
      name,
      address,
      address2,
      month,
      A,
      B,
      C,
      D,
      totalReceivable,
      E,
      F,
      G,
      totalPayables,
      J,
      K,
      L,
      M,
      N,
      totalTaxRecoverable,
      netRecoverable,
      O,
      P,
      netTransactionAmount,
      Q,
      R,
      S,
      T,
      U,
      nettax,
      total,
    };
  }
  console.log("table", generatedTable);
  const rows = generatedTable?.map((salon) =>
    createData(
      salon.salonId,
      salon.name,
      salon.address,
      salon.address2,
      salon.month,
      salon.A,
      salon.B,
      salon.C,
      salon.D,
      salon["1"],
      salon.E,
      salon.F,
      salon.G,
      salon["2"],
      salon.J,
      salon.K,
      salon.L,
      salon.M,
      salon.N,
      salon["3"],
      salon["4"],
      salon.O,
      salon.P,
      salon["5"],
      salon.Q,
      salon.R,
      salon.S,
      salon.T,
      salon.U,
      salon["6"],
      salon.total
    )
  );
  console.log("rowss", rows);

  const handleExport = () => {
    const formattedData = [columns.map((column) => column.label)];

    generatedTable.forEach((row) => {
      const formattedRow = columns.map((column) => {
        if (column.label === "Total Receivable") {
          return row["1"];
        } else if (column.label === "Total Payables") {
          return row["2"];
        } else if (column.label === "Total Tax Recoverable (-/+)") {
          return row["3"];
        } else if (column.label === "Net Recoverable") {
          return row["4"];
        } else if (column.label === "Net Transaction Amount") {
          return row["5"];
        } else if (column.label === "Net Tax Recoverable") {
          return row["6"];
        } else {
          return row[column.id];
        }
      });
      formattedData.push(formattedRow);
    });

    const worksheet = XLSX.utils.aoa_to_sheet(formattedData);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, "Sheet1");
    XLSX.writeFile(workbook, `SettlementData-${month}-${year}.xlsx`);
  };

  return (
    <Layout>
      <div className="w-full flex flex-col">
        <TopBar title="Settelment" />
        <div
          style={{
            maxWidth: expanded ? "calc(100vw - 289px)" : "calc(100vw - 69px)",
          }}
          className="w-full h-[calc(100vh-65px)] p-8 md:p-16 overflow-y-auto"
        >
          <div className="w-full flex justify-between items-center">
            <div className="flex flex-wrap items-center gap-6">
              <div className="flex gap-2 flex-wrap">
                <MonthPicker
                  months={months}
                  month={month}
                  setMonth={setMonth}
                />
                <YearPicker years={years} year={year} setYear={setYear} />
              </div>
              <div className="flex flex-wrap gap-3">
                <input
                  className="grow"
                  accept=".xlsx, .xls"
                  style={{ display: "none" }}
                  id="contained-button-file"
                  type="file"
                  onChange={handleFileChange}
                />
                <Button
                  style={{ flexGrow: 1 }}
                  variant="contained"
                  component="span"
                  onClick={handleCreateApiTable}
                >
                  {creating ? "Creating..." : "Create Table"}
                </Button>
                <Button
                  style={{ flexGrow: 1 }}
                  variant="contained"
                  onClick={handleExport}
                >
                  Export Excel File
                </Button>
                <label style={{ flexGrow: 1 }} htmlFor="contained-button-file">
                  <Button style={{ width:"100%" }} variant="contained" component="span">
                    {loading ? "Loading..." : "Upload Excel File"}
                  </Button>
                </label>
              </div>
            </div>
          </div>
          <div className="w-full mt-10 mx-auto">
            <SettelmentTable headings={columns} rows={rows} />
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Json;
