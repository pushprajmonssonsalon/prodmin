import { useEffect, useState } from 'react';
import Layout from '../components/Layout';
import TopBar from '../components/commoncomponents/TopBar';
import CustomTable from '../components/commoncomponents/Table';
import { Button } from '@mui/material';
import { ORDERS_DETAILS_FOR_EXCEL } from '../services/pro/user.service';
import Wrapper from '../components/commoncomponents/Wrapper';
import exportToExcel from '../services/utils/exportToExcel';
import formatDateToFull, { formatDate } from '../services/utils/formatDate';
import OrderModal from '../components/modals/OrderModal';
import CustomDatePicker from '../components/commoncomponents/inputs/CustomDatePicker';
import { useSearchParams } from 'react-router-dom';
import { APP_ORDERS_DETAILS } from '../services/crm/user.service';

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


const AppOrder = () => {
  const [ordersDetails, setOrdersDetails] = useState([])

  const [singleOrdersDetails, setSingleOrdersDetails] = useState([])
  const [searchParams] = useSearchParams();
  const sd = searchParams.get('start')
  const ed = searchParams.get('end')
      const defaultStartDate = formatDate(new Date());
  
 const [startDate, setStartDate] = useState(sd ? sd : defaultStartDate);
   const [endDate, setEndDate] = useState(ed ? ed: defaultStartDate);

  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [totalOrders, setTotalOrders] = useState(0);
  const [showOrderModal, setShowOrderModal] = useState(false);
  const handleOpen = () => {
    setShowOrderModal(true)
  };
  const handleViewProducts = (item) => {
    setSingleOrdersDetails(item)
    setShowOrderModal(true)
  }
 
  const onSubmit = async (sd, ed) => {

    const res = await APP_ORDERS_DETAILS({ startDate: sd ? sd : startDate, endDate: ed ? ed : endDate, page: page, limit: rowsPerPage });
    if (res) {
      setOrdersDetails(res?.orders)
      setTotalOrders(res?.totalOrders)
    }
  };


  
 //0-In Cart, 1-Placed, 2-cancelled, 3-delivered, 4-rto, 5,-pending, 6-Undelivered/Attempted, 7- shipped
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
      case 5:
        return 'Pending';
      case 6:
        return "Undelivered/Attempted"
      case 7:
        return 'Shipped';
      default:
        return 'Not Placed';
    }
  };
  const rows = ordersDetails?.map(order => createData(
    order.numericOrderId,
    `${order?.addresses?.name||""} (${order?.addresses?.phoneNumber})`,
    <button onClick={() => handleViewProducts(order)} className='bg-blue-600 text-white font-medium rounded-sm text-lg w-[60px] h-[30px] flex items-center justify-center'>view</button>,

    mapStatus(order.status),
    order._id,
    formatDateToFull(order?.createdAt),
    order?.addresses?.address1 +
    " " + order?.addresses?.address2 +
    " " + order?.addresses?.pincode + " "
    + order?.addresses?.city + " " + order?.addresses?.state,
    `Rs ${order?.totalPayableAmount || order?.totalAmount}`,
    order?.paymentMethod === 1 ? "COD" :order?.paymentMethod===2? "PREPAID":"NA",
    order?.isCaptured ? "YES" : "NO"
  ));
  const handleRowClick = (id) => {
    // setOrderId(id);
  };
  

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
 
  useEffect(() => {

    onSubmit()

  }, [page, rowsPerPage])
  return (
    <Layout>
      <div className='w-full flex flex-col'>
        <TopBar title="Smart Salon App Orders" />
      </div>
      <Wrapper>
        <div className='w-[90%] mx-auto flex justify-between items-center'>
         

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
          <CustomTable  headings={columns} rows={rows} page={page} setPage={setPage} rowsPerPage={rowsPerPage} setRowsPerPage={setRowsPerPage} totalOrders={totalOrders} handleRowClick={handleRowClick} handleOpen={handleOpen} />
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

export default AppOrder