import React from 'react'
import Layout from '../components/Layout'
import TopBar from '../components/commoncomponents/TopBar'
import CustomTable from '../components/commoncomponents/Table'

const columns = [
  { id: 'name', label: 'Name' },
  { id: 'code', label: 'ISO\u00a0Code'},
  {
    id: 'population',
    label: 'Population',
    align: 'left',
    format: (value) => value.toLocaleString('en-US'),
  },
  {
    id: 'size',
    label: 'Size\u00a0(km\u00b2)',
    align: 'left',
    format: (value) => value.toLocaleString('en-US'),
  }
];

function createData(name, code, population, size) {
  return { name, code, population, size };
}

const rows = [
  createData('India', 'IN', 1324171354, 3287263),
  createData('China', 'CN', 1403500365, 9596961),
  createData('Italy', 'IT', 60483973, 301340),
  createData('United States', 'US', 327167434, 9833520),
  createData('Canada', 'CA', 37602103, 9984670),
  createData('Australia', 'AU', 25475400, 7692024),
  createData('Germany', 'DE', 83019200, 357578),
  createData('Ireland', 'IE', 4857000, 70273),
  createData('Mexico', 'MX', 126577691, 1972550),
  createData('Japan', 'JP', 126317000, 377973),
  createData('France', 'FR', 67022000, 640679),
  createData('United Kingdom', 'GB', 67545757, 242495),
  createData('Russia', 'RU', 146793744, 17098246),
  createData('Nigeria', 'NG', 200962417, 923768),
  createData('Brazil', 'BR', 210147125, 8515767),
];

const Orders = () => {
  return (
    <Layout>
    <div className='w-full flex flex-col'>
      <TopBar title="Orders"/>
      <div className='w-[90%] mx-auto'>
        <CustomTable headings={columns} rows={rows} />
      </div>
    </div>
    </Layout>
  )
}

export default Orders