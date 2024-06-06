import React from 'react'
import Layout from '../components/Layout'
import TopBar from '../components/commoncomponents/TopBar'
import MonthPicker from '../components/commoncomponents/MonthPicker';
import YearPicker from '../components/commoncomponents/YearPicker';
import CustomTable from '../components/commoncomponents/Table';
import { FaFileUpload } from "react-icons/fa";
const ProDashboard = () => {
  const columns = [
    { id: 'name', label: 'Name' },
    {
      id: 'invoice',
    //   label: 'Size\u00a0(km\u00b2)',
      label: 'Invoice',
      align: 'right',
      format: (value) => value.toLocaleString('en-US'),
    }
  ];
  
  function createData(name, invoice) {
    return { name, invoice };
  }
  
  const rows = [
    createData('India', <FaFileUpload className='text-xl font-bold text-right cursor-pointer'/>),
    createData('China', <FaFileUpload className='text-xl font-bold text-right cursor-pointer'/>),
    createData('Italy', <FaFileUpload className='text-xl font-bold text-right cursor-pointer'/>),
    createData('United States', <FaFileUpload className='text-xl font-bold text-right cursor-pointer'/>),
    createData('Canada', <FaFileUpload className='text-xl font-bold text-right cursor-pointer'/>),
    createData('Australia', <FaFileUpload className='text-xl font-bold text-right cursor-pointer'/>),
    createData('Germany', <FaFileUpload className='text-xl font-bold text-right cursor-pointer'/>),
    createData('Ireland', <FaFileUpload className='text-xl font-bold text-right cursor-pointer'/>),
    createData('Mexico', <FaFileUpload className='text-xl font-bold text-right cursor-pointer'/>),
    createData('Japan', <FaFileUpload className='text-xl font-bold text-right cursor-pointer'/>),
    createData('France', <FaFileUpload className='text-xl font-bold text-right cursor-pointer'/>),
    createData('United Kingdom', <FaFileUpload className='text-xl font-bold text-right cursor-pointer'/>),
    createData('Russia', <FaFileUpload className='text-xl font-bold text-right cursor-pointer'/>),
    createData('Nigeria', <FaFileUpload className='text-xl font-bold text-right cursor-pointer'/>),
    createData('Brazil', <FaFileUpload className='text-xl font-bold text-right cursor-pointer'/>),
  ];
  return (
    <Layout>
    <div className='w-full flex flex-col'>
      <TopBar title="Dashboard"/>
      <div className='w-[90%] mx-auto flex justify-between items-center'>
        <div className='flex items-center gap-x-3'>
          <MonthPicker />
          <YearPicker />
          </div>
       </div>   
      <div className='w-[90%] mx-auto '>
      <CustomTable headings={columns} rows={rows} />
      </div>
    </div>
    </Layout>
  )
}

export default ProDashboard