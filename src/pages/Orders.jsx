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
import CustomDatePicker from '../components/commoncomponents/inputs/CustomDatePicker';
import { useSearchParams } from 'react-router-dom';

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
    id: 'paymentMethod',
    label: 'Payment Method',
    align: 'left',
  },
  {
    id: 'isCaptured',
    label: 'Payment Captured',
    align: 'left',
  },
  {
    id: 'status',
    label: 'Status'
  }
];

function createData(shipId, customerDetails, productsDetails, status, id, createdAt, address, amount, paymentMethod, isCaptured) {
  return { shipId, customerDetails, productsDetails, status, id, createdAt, address, amount, paymentMethod, isCaptured };
}


const Orders = () => {
  const [ordersDetails, setOrdersDetails] = useState([])

  const [singleOrdersDetails, setSingleOrdersDetails] = useState([])
  const [date, setDate] = useState('Today');
  const [searchParams] = useSearchParams();
  const sd = searchParams.get('start')
  const ed = searchParams.get('end')
  const [startDate, setStartDate] = useState(sd ? new Date(sd) : new Date())
  const [endDate, setEndDate] = useState(ed ? new Date(ed) : new Date())

  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [totalOrders, setTotalOrders] = useState(0);
  const [showOrderModal, setShowOrderModal] = useState(false);
  const [orderId, setOrderId] = React.useState('');
  const handleOpen = () => {
    setShowOrderModal(true)
  };
  const handleViewProducts = (item) => {
    setSingleOrdersDetails(item)
    setShowOrderModal(true)
  }
  const getStartAndEndDate = (dateRange) => {
    let today = new Date();
    let startDate = new Date()
    let endDate = new Date();
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
  const onSubmit = async (sd, ed) => {

    const res = await ORDERS_DETAILS({ startDate: sd ? sd : startDate, endDate: ed ? ed : endDate, page: page, limit: rowsPerPage });
    if (res) {
      setOrdersDetails(res?.orders)
      setTotalOrders(res?.totalOrders)
    }
  };


  useEffect(() => {
    const { startDate, endDate } = getStartAndEndDate(date);
    setStartDate(startDate);
    setEndDate(endDate);

  }, [date])

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
    <button onClick={() => handleViewProducts(order)} className='bg-blue-600 text-white font-medium rounded-sm text-lg w-[60px] h-[30px] flex items-center justify-center'>view</button>,

    mapStatus(order.status),
    order._id,
    formatDateToFull(order?.createdAt),
    order?.addresses?.address +
    " " + order?.addresses?.address2 +
    " " + order?.addresses?.pincode + " "
    + order?.addresses?.city + " " + order?.addresses?.state,
    `Rs ${order?.totalPayableAmount || order?.totalAmount}`,
    order?.paymentMethod === 1 ? "COD" : "PREPAID",
    order?.isCaptured ? "YES" : "NO"
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
  const onDateSelect = (date) => {
    const { startDate, endDate } = getStartAndEndDate(date);
    onSubmit(startDate, endDate);

  }
  useEffect(() => {

    onSubmit()

  }, [page, rowsPerPage])
  return (
    <Layout>
      <div className='w-full flex flex-col'>
        <TopBar title="Orders" />
      </div>
      <Wrapper>
        <div className='w-[90%] mx-auto flex justify-between items-center'>
          <div className='flex items-center gap-x-3'>
            <DatePicker date={date} setDate={setDate} onSubmit={onDateSelect} />
            {/* <Drawers />  */}
          </div>

          <Button variant='contained' onClick={handleExportExcel}>Export to Excel</Button>
        </div>
        <div>
          <div className='flex items-center justify-center my-5'>
            <CustomDatePicker
              onSubmit={onSubmit}
              startDate={startDate}
              endDate={endDate}
              setStartDate={setStartDate}
              setEndDate={setEndDate}
            />
          </div>
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