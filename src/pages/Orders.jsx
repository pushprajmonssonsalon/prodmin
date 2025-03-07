import React, { useEffect, useState } from 'react';
import Layout from '../components/Layout';
import TopBar from '../components/commoncomponents/TopBar';
import CustomTable from '../components/commoncomponents/Table';
import DatePicker from '../components/commoncomponents/DatePicker';
import { Button } from '@mui/material';
import { ORDERS_DETAILS, ORDERS_DETAILS_FOR_EXCEL, SINGLE_ORDERS_DETAILS } from '../services/pro/user.service';
import { subDays, startOfMonth, endOfMonth } from 'date-fns';
import Wrapper from '../components/commoncomponents/Wrapper';
import exportToExcel from '../services/utils/exportToExcel';
import formatDateToFull from '../services/utils/formatDate';
import OrderModal from '../components/modals/OrderModal';

const columns = [
  { id: 'shipId', label: 'ShipRocketID' },
  {
    id: 'customerDetails',
    label: 'Customer Details',
    align: 'left',
    format: (value) => value.toLocaleString('en-US'),
  },
  {
    id: 'productsDetails',
    label: 'Products Details',
    align: 'left',
    format: (value) => value.toLocaleString('en-US'),
  },
  {
    id: 'address',
    label: 'Address',
    align: 'left',
  },
  {
    id: 'createdAt',
    label: 'Date',
    align: 'left',
  },
  {
    id: 'amount',
    label: 'Amount',
    align: 'left',
  },
  {
    id: 'status',
    label: 'Status'
  }
];

function createData(shipId, customerDetails, productsDetails, status, id,createdAt,address,amount) {
  return { shipId, customerDetails, productsDetails, status, id ,createdAt,address,amount};
}


let startDate, endDate;
const Orders = () => {
  const [ordersDetails, setOrdersDetails] = useState([])

  const [singleOrdersDetails, setSingleOrdersDetails] = useState([])
  const [date, setDate] = React.useState('Today');
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(10);
  const [totalOrders, setTotalOrders] = useState(0);
  const [showOrderModal, setShowOrderModal] = React.useState(false);
  const [orderId, setOrderId] = React.useState('');
  const handleOpen = () => {
    setShowOrderModal(true)
  };
  const handleViewProducts=(item)=>{
   setSingleOrdersDetails(item)
   setShowOrderModal(true)
  }
  const getStartAndEndDate = (dateRange) => {
    const today = new Date();
    switch (dateRange) {
      case 'Today':
        startDate = today;
        endDate = today;
        break;
      case 'Yesterday':
        startDate = subDays(today, 1);
        endDate = subDays(today, 1);
        break;
      case 'last7days':
        startDate = subDays(today, 7);
        endDate = today;
        break;
      case 'last30days':
        startDate = subDays(today, 30);
        endDate = today;
        break;
      case 'thismonth':
        startDate = startOfMonth(today);
        endDate = today;
        break;
      case 'lastmonth':
        startDate = startOfMonth(subDays(startOfMonth(today), 1));
        endDate = endOfMonth(subDays(startOfMonth(today), 1));
        break;
      default:
        startDate = today;
        endDate = today;
    }
    return { startDate, endDate };
  }
  useEffect(() => {
    const fetchApi = async () => {
      const { startDate, endDate } = getStartAndEndDate(date);
      const orders = await ORDERS_DETAILS({ startDate, endDate, page: page, limit: rowsPerPage });
      if (orders) {

        setOrdersDetails(orders.orders)
        setTotalOrders(orders.totalOrders)
      } else {

      }
    }
    fetchApi()
  }, [date, page, rowsPerPage])

  const mapStatus = (status) => {
    switch (status) {
      case 1:
        return 'Placed';
      case 2:
        return 'Cancelled';
      case 3:
        return 'Received';
      case 4:
        return 'RTO';
      case 7:
        return 'Shipped';
      default:
        return 'Not Placed';
    }
  };
  const rows = ordersDetails?.map(order => createData(
    order.numericOrderId,
    `${order.customerName} (${order.customerPhoneNumber})`,
    <button onClick={()=>handleViewProducts(order)} className='bg-blue-600 text-white font-medium rounded-sm text-lg w-[60px] h-[30px] flex items-center justify-center'>view</button>,

    mapStatus(order.status),
     order._id,
    formatDateToFull(order?.createdAt),
    order?.addresses?.address +
     " "+order?.addresses?.address2+
     " "+order?.addresses?.pincode +" " 
     +order?.addresses?.city+" "+order?.addresses?.state,
     `Rs ${order?.totalPayableAmount||order?.totalAmount}`
  ));
  const handleRowClick = (id) => {
    setOrderId(id);
  };
  useEffect(() => {
    async function fetchApi() {
      const singleOrderDetail = await SINGLE_ORDERS_DETAILS({ id: orderId });

      setSingleOrdersDetails(singleOrderDetail)
    }
    fetchApi()
  }, [orderId])


  const handleExportExcel = async () => {
    const excel = await ORDERS_DETAILS_FOR_EXCEL({ startDate, endDate });

    const transformedOrders = excel.orders.map(order => {
      return {
        ...order,
        products: order.products.map(product => product.name).join(', '),
        addresses: order.addresses.address
      };
    });

    exportToExcel(transformedOrders, "Orders", "orders.xlsx");


  }
  return (
    <Layout>
      <div className='w-full flex flex-col'>
        <TopBar title="Orders" />
      </div>
      <Wrapper>
        <div className='w-[90%] mx-auto flex justify-between items-center'>
          <div className='flex items-center gap-x-3'>
            <DatePicker date={date} setDate={setDate} />
            {/* <Drawers />  */}
          </div>
          <Button variant='contained' onClick={handleExportExcel}>Export to Excel</Button>
        </div>
        <div className='w-[90%] mx-auto'>
          <CustomTable headings={columns} rows={rows} page={page} setPage={setPage} rowsPerPage={rowsPerPage} setRowsPerPage={setRowsPerPage} totalOrders={totalOrders} handleRowClick={handleRowClick} handleOpen={handleOpen} />
        </div>
      </Wrapper>
        <OrderModal 
         show={showOrderModal} 
         setShow={setShowOrderModal}
         data={singleOrdersDetails?.products}

         />

    </Layout>
  )
}

export default Orders