import React, { useEffect, useState } from 'react';
import * as XLSX from 'xlsx';
import Layout from '../components/Layout';
import TopBar from '../components/commoncomponents/TopBar';
import MonthPicker from '../components/commoncomponents/MonthPicker';
import YearPicker from '../components/commoncomponents/YearPicker';
import { Button } from '@mui/material';
import SettelmentTable from '../components/commoncomponents/SettelmentTable';
import { CREATE_TABLE, GET_TABLE } from '../services/crm/user.service';

const Json = () => {
  const months = [
    "January", "February", "March", "April", "May", "June",
    "July", "August", "September", "October", "November", "December"
  ];
  const years = [
    "2000", "2001", "2002", "2003", "2004", "2005", "2006", "2007", "2008", "2009",
    "2010", "2011", "2012", "2013", "2014", "2015", "2016", "2017", "2018", "2019",
    "2020", "2021", "2022", "2023", "2024", "2025", "2026", "2027", "2028", "2029",
    "2030", "2031", "2032", "2033", "2034", "2035", "2036", "2037", "2038", "2039",
    "2040", "2041", "2042", "2043", "2044", "2045", "2046", "2047", "2048", "2049", "2050"
  ];
  const currentYear = new Date().getFullYear();
  const currentMonth = new Date().getMonth();
  const [month, setMonth] = useState(months[currentMonth]);
  const [generatedTable,setGeneratedTable] = useState([]);
  const [year, setYear] = useState(currentYear.toString());
  // const [rows, setRows] = useState([]);
  const columns = [
    { id: 'id', label: 'Salon ID', minWidth: 170 },
    { id: 'name', label: 'Name of Salon', minWidth: 130 },
    {
      id: 'status',
      label: 'Status',
      minWidth: 170,
      align: 'right',
      format: (value) => value.toLocaleString('en-US'),
    },
    {
      id: 'category',
      label: 'Category',
      minWidth: 170,
      align: 'right',
      format: (value) => value.toLocaleString('en-US'),
    },
    {
      id: 'month',
      label: 'Month',
      minWidth: 170,
      align: 'right',
      format: (value) => value.toFixed(2),
    },
    {
      id: 'monthlyroyality',
      label: 'Monthly Royalty (+)',
      minWidth: 170,
      align: 'right',
      format: (value) => value.toFixed(2),
    },
    {
      id: 'productSale',
      label: 'Product Sale (+)',
      minWidth: 170,
      align: 'right',
      format: (value) => value.toFixed(2),
    },
    {
      id: 'signupconstruction',
      label: 'Signup/Construction (+)',
      minWidth: 170,
      align: 'right',
      format: (value) => value.toFixed(2),
    },
    {
      id: 'others',
      label: 'Others (+)',
      minWidth: 170,
      align: 'right',
      format: (value) => value.toFixed(2),
    },
    {
      id: 'totalReceivable',
      label: 'Total Receivable',
      minWidth: 170,
      align: 'right',
      format: (value) => value.toFixed(2),
    },
    {
      id: 'discountonloreal',
      label: "Discount Reimburse on L'Oreal (-)",
      minWidth: 170,
      align: 'right',
      format: (value) => value.toFixed(2),
    },
    {
      id: 'discountreimburse',
      label: "Discount Reimburse on Own Brand (-)",
      minWidth: 170,
      align: 'right',
      format: (value) => value.toFixed(2),
    },
    {
      id: 'bonuspoint',
      label: "Bonus Points (-)",
      minWidth: 170,
      align: 'right',
      format: (value) => value.toFixed(2),
    },
    {
      id: 'totalPayables',
      label: "Total Payables",
      minWidth: 170,
      align: 'right',
      format: (value) => value.toFixed(2),
    },
    {
      id: 'gstPayonRoyalty',
      label: "GST Payable on Royalty (+)",
      minWidth: 170,
      align: 'right',
      format: (value) => value.toFixed(2),
    },
    {
      id: 'gstPayonProduct',
      label: "GST Payable on Product (+)",
      minWidth: 170,
      align: 'right',
      format: (value) => value.toFixed(2),
    },
    {
      id: 'gstPayonOther',
      label: "GST Payable on Others (+)",
      minWidth: 170,
      align: 'right',
      format: (value) => value.toFixed(2),
    },
    {
      id: 'gstReceiveDiscount',
      label: "GST Receivable on Discount Reimburse (-)",
      minWidth: 170,
      align: 'right',
      format: (value) => value.toFixed(2),
    },
    {
      id: 'tdsReceivable',
      label: "TDS Receivable (-)",
      minWidth: 170,
      align: 'right',
      format: (value) => value.toFixed(2),
    },
    {
      id: 'totalTaxRecoverable',
      label: "Total Tax Recoverable (-/+)",
      minWidth: 170,
      align: 'right',
      format: (value) => value.toFixed(2),
    },
    {
      id: 'netecoverable',
      label: "Net Recoverable",
      minWidth: 170,
      align: 'right',
      format: (value) => value.toFixed(2),
    },
    {
      id: 'payment',
      label: "Payment (+)",
      minWidth: 170,
      align: 'right',
      format: (value) => value.toFixed(2),
    },
    {
      id: 'receipt',
      label: "Receipt (-)",
      minWidth: 170,
      align: 'right',
      format: (value) => value.toFixed(2),
    },
    {
      id: 'netTransactionAmount',
      label: "Net Transaction Amount",
      minWidth: 170,
      align: 'right',
      format: (value) => value.toFixed(2),
    },
    {
      id: 'gstPaidRoyality',
      label: "GST Paid on Royalty (+)",
      minWidth: 170,
      align: 'right',
      format: (value) => value.toFixed(2),
    },
    {
      id: 'gstPaidProduct',
      label: "GST Paid on Product (+)",
      minWidth: 170,
      align: 'right',
      format: (value) => value.toFixed(2),
    },
    {
      id: 'gstPaidOthers',
      label: "GST Paid on Others (+)",
      minWidth: 170,
      align: 'right',
      format: (value) => value.toFixed(2),
    },
    {
      id: 'gstReceivedDiscount',
      label: "GST Received on Discount (-)",
      minWidth: 170,
      align: 'right',
      format: (value) => value.toFixed(2),
    },
    {
      id: 'tdsReceivedRoyalty',
      label: "TDS Received  on Royalty/ Signup (-)",
      minWidth: 170,
      align: 'right',
      format: (value) => value.toFixed(2),
    },
    {
      id: 'nettaxRecoverable',
      label: "Net Tax Recoverable",
      minWidth: 170,
      align: 'right',
      format: (value) => value.toFixed(2),
    },
    {
      id: 'perDayClosingBalance',
      label: "Per Day Closing Balance",
      minWidth: 170,
      align: 'right',
      format: (value) => value.toFixed(2),
    },
    {
      id: 'cumulativeClosingBalance',
      label: "Cumulative Closing Balance",
      minWidth: 170,
      align: 'right',
      format: (value) => value.toFixed(2),
    },
  ];

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    const reader = new FileReader();
    reader.onload = (event) => {
      const data = new Uint8Array(event.target.result);
      const workbook = XLSX.read(data, { type: 'array' });
      const sheetName = workbook.SheetNames[0];
      const worksheet = workbook.Sheets[sheetName];
      const jsonData = XLSX.utils.sheet_to_json(worksheet);
      // setRows(jsonData);
    };
    reader.readAsArrayBuffer(file);
  };
  const handleCreateApiTable=async()=>{
    const createTable = await CREATE_TABLE({month:months.indexOf(month)+1,year:+year});
    console.log("createTable",createTable)
  }
  useEffect(()=>{
    async function fetchGetApi(){
      const table = await GET_TABLE({month:months.indexOf(month)+1,year:+year});
      setGeneratedTable(table)
      
    }
    fetchGetApi()
  },[month,year])
  function createData(id,name) {
    return{ id,name };
  }
  // console.log("rowss",rows)
  console.log("table",generatedTable)
  const rows = generatedTable?.map((salon)=> createData(salon.salonId,salon.name))

  return (
    <Layout>
      <div className='w-full flex flex-col'>
        <TopBar title="Settelment"/>
        <div className='w-[90%] mx-auto flex justify-between items-center'>
          <div className='flex items-center gap-x-3'>
            <MonthPicker months={months} month={month} setMonth={setMonth}/>
            <YearPicker years={years} year={year} setYear={setYear}/>
            <input
              accept=".xlsx, .xls"
              style={{ display: 'none' }}
              id="contained-button-file"
              type="file"
              onChange={handleFileChange}
            />
            <Button variant='contained' component="span" onClick={handleCreateApiTable}>Create Table</Button>
            <Button variant='contained'>Export Excel File</Button>
            <label htmlFor="contained-button-file">
              <Button variant='contained' component="span">Upload Excel File</Button>
            </label>
          </div>
        </div>
        <div className='mt-10 w-[90%] mx-auto'>
          <SettelmentTable headings={columns} rows={rows}/>
        </div>
      </div>
    </Layout>
  );
}

export default Json;
