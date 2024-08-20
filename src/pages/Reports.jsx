import Layout from '../components/Layout'
import TopBar from '../components/commoncomponents/TopBar'
import CustomTable from '../components/commoncomponents/Table'
import MonthPicker from '../components/commoncomponents/MonthPicker'
import YearPicker from '../components/commoncomponents/YearPicker'

const Reports = () => {
    const columns = [
        { id: 'name', label: 'Name' },
        {
          id: 'location',
          label: 'Location',
          align: 'left',
          format: (value) => value.toLocaleString('en-US'),
        },
        {
          id: 'uploaded',
        //   label: 'Size\u00a0(km\u00b2)',
          label: 'uploaded',
          align: 'right',
          format: (value) => value.toLocaleString('en-US'),
        }
      ];
      
      function createData(name, location, uploaded) {
        return { name, location, uploaded };
      }
      
      const rows = [
        createData('India', 1324171354, 3287263),
        createData('China', 1403500365, 9596961),
        createData('Italy', 60483973, 301340),
        createData('United States', 327167434, 9833520),
        createData('Canada', 37602103, 9984670),
        createData('Australia', 25475400, 7692024),
        createData('Germany', 83019200, 357578),
        createData('Ireland', 4857000, 70273),
        createData('Mexico', 126577691, 1972550),
        createData('Japan', 126317000, 377973),
        createData('France', 67022000, 640679),
        createData('United Kingdom', 67545757, 242495),
        createData('Russia', 146793744, 17098246),
        createData('Nigeria', 200962417, 923768),
        createData('Brazil', 210147125, 8515767),
      ];
  return (
    <Layout>
    <div className='w-full flex flex-col'>
      <TopBar title="Reports"/>
      <div className='h-[calc(100vh-65px)] overflow-y-auto'>
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
    </div>
    </Layout>
  )
}

export default Reports