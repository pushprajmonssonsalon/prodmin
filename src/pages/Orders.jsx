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

const ORDER_STATUS_MAP = {
  0: 'In Cart',
  1: 'Placed',
  2: 'Cancelled',
  3: 'Delivered',
  4: 'RTO',
  5: 'Pending',
  6: 'Undelivered/Attempted',
  7: 'Shipped',
};

const STATUS_FILTERS = [
  { label: 'All', value: 'all' },
  { label: 'In Cart', value: '0' },
  { label: 'Placed', value: '1' },
  { label: 'Cancelled', value: '2' },
  { label: 'Delivered', value: '3' },
  { label: 'RTO', value: '4' },
  { label: 'Pending', value: '5' },
  { label: 'Undelivered', value: '6' },
  { label: 'Shipped', value: '7' },
];

const columns = [
  { id: 'shipId', label: 'Order ID' },
  {
    id: 'customerDetails',
    label: 'Customer Details',
    align: 'left',
    format: (value) => value.toLocaleString('en-US'),
  },
  {
    id: 'productsDetails',
    label: 'Products',
    align: 'left',
    format: (value) => value.toLocaleString('en-US'),
  },
  {
    id: 'source',
    label: 'Source',
    align: 'left',
  },
  {
    id: 'medium',
    label: 'Medium',
    align: 'left',
  },
  {
    id: 'couponApplied',
    label: 'Coupon Applied',
    align: 'left',
  },
  {
    id: 'coupon',
    label: 'Coupon',
    align: 'left',
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
    label: 'Status',
    align: 'left',
  }
];

function createData(shipId, customerDetails, productsDetails, source, medium, couponApplied, coupon, status, id, createdAt, address, amount, paymentMethod, isCaptured) {
  return {
    shipId,
    customerDetails,
    productsDetails,
    source,
    medium,
    couponApplied,
    coupon,
    status,
    id,
    createdAt,
    address,
    amount,
    paymentMethod,
    isCaptured,
  };
}

const normalizeStatus = (status) => {
  const numericStatus = Number(status);
  return Number.isNaN(numericStatus) ? -1 : numericStatus;
};

const mapStatus = (status) => ORDER_STATUS_MAP[normalizeStatus(status)] || 'Unknown';

const formatAddress = (addresses = {}) => {
  return [
    addresses?.address,
    addresses?.address2,
    addresses?.city,
    addresses?.state,
    addresses?.pincode,
  ]
    .filter(Boolean)
    .join(', ');
};

const getPaymentMethod = (paymentMethod) => {
  if (paymentMethod === 1) return 'COD';
  if (paymentMethod === 2) return 'PREPAID';
  return 'NA';
};

const Orders = () => {
  const [ordersDetails, setOrdersDetails] = useState([]);
  const [singleOrdersDetails, setSingleOrdersDetails] = useState([]);
  const [date, setDate] = useState('Today');
  const [searchParams] = useSearchParams();
  const sd = searchParams.get('start');
  const ed = searchParams.get('end');
  const [startDate, setStartDate] = useState(sd ? new Date(sd) : new Date());
  const [endDate, setEndDate] = useState(ed ? new Date(ed) : new Date());
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [totalOrders, setTotalOrders] = useState(0);
  const [showOrderModal, setShowOrderModal] = useState(false);
  const [orderId, setOrderId] = React.useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [searchText, setSearchText] = useState('');
  const [couponFilter, setCouponFilter] = useState('all');

  const handleOpen = () => {
    setShowOrderModal(true);
  };

  const handleViewProducts = (item) => {
    setSingleOrdersDetails(item);
    setShowOrderModal(true);
  };

  const getStartAndEndDate = (dateRange) => {
    let today = new Date();
    let startDate = new Date();
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
  };

  const onSubmit = async (sdValue, edValue) => {
    const res = await ORDERS_DETAILS({
      startDate: sdValue ? sdValue : startDate,
      endDate: edValue ? edValue : endDate,
      page,
      limit: rowsPerPage,
    });

    if (res) {
      setOrdersDetails(res?.orders || []);
      setTotalOrders(res?.totalOrders || 0);
    }
  };

  useEffect(() => {
    const { startDate: nextStartDate, endDate: nextEndDate } = getStartAndEndDate(date);
    setStartDate(nextStartDate);
    setEndDate(nextEndDate);
  }, [date]);

  const filteredOrders = ordersDetails.filter((order) => {
    const normalizedStatus = String(normalizeStatus(order?.status));
    const sourceValue = (order?.source || '').toLowerCase();
    const mediumValue = (order?.medium || '').toLowerCase();
    const couponValue = (order?.coupon || '').toLowerCase();
    const customerValue = `${order?.customerName || ''} ${order?.customerPhoneNumber || ''} ${order?.numericOrderId || ''}`.toLowerCase();
    const query = searchText.trim().toLowerCase();

    const statusMatches = statusFilter === 'all' || normalizedStatus === statusFilter;
    const searchMatches = !query
      || customerValue.includes(query)
      || sourceValue.includes(query)
      || mediumValue.includes(query)
      || couponValue.includes(query);
    const couponMatches = couponFilter === 'all'
      || (couponFilter === 'applied' && order?.couponApplied)
      || (couponFilter === 'not-applied' && !order?.couponApplied);

    return statusMatches && searchMatches && couponMatches;
  });

  const statusCounts = ordersDetails.reduce((acc, order) => {
    const key = String(normalizeStatus(order?.status));
    acc[key] = (acc[key] || 0) + 1;
    return acc;
  }, {});

  const rows = filteredOrders.map((order) => createData(
    order.numericOrderId,
    `${order?.customerName || order?.addresses?.name || 'NA'} (${order?.customerPhoneNumber || order?.addresses?.phoneNumber || 'NA'})`,
    <button onClick={() => handleViewProducts(order)} className='bg-blue-600 text-white font-medium rounded-sm text-sm px-3 h-[32px] flex items-center justify-center'>
      View
    </button>,
    (order?.source || 'Direct').toUpperCase(),
    (order?.medium || 'NA').toUpperCase(),
    order?.couponApplied ? 'YES' : 'NO',
    order?.coupon || 'NA',
    mapStatus(order?.status),
    order._id,
    formatDateToFull(order?.createdAt),
    formatAddress(order?.addresses),
    `Rs ${order?.totalPayableAmount || order?.totalAmount || 0}`,
    getPaymentMethod(order?.paymentMethod),
    order?.isCaptured ? 'YES' : 'NO'
  ));

  const handleRowClick = (id) => {
    setOrderId(id);
  };

  useEffect(() => {
    async function fetchApi() {
      if (!orderId) return;
      const singleOrderDetail = await SINGLE_ORDERS_DETAILS({ id: orderId });
      setSingleOrdersDetails(singleOrderDetail);
    }

    fetchApi();
  }, [orderId]);

  const handleExportExcel = async () => {
    const excel = await ORDERS_DETAILS_FOR_EXCEL({ startDate, endDate });

    const transformedOrders = (excel?.orders || []).map((order) => {
      return {
        ...order,
        orderId: order?.numericOrderId,
        statusLabel: mapStatus(order?.status),
        source: order?.source || 'Direct',
        medium: order?.medium || 'NA',
        couponApplied: order?.couponApplied ? 'YES' : 'NO',
        coupon: order?.coupon || 'NA',
        products: order?.products?.map((product) => product.name).join(', '),
        addresses: formatAddress(order?.addresses),
      };
    });

    exportToExcel(transformedOrders, 'Orders', 'orders.xlsx');
  };

  const onDateSelect = (selectedDate) => {
    const { startDate: nextStartDate, endDate: nextEndDate } = getStartAndEndDate(selectedDate);
    onSubmit(nextStartDate, nextEndDate);
  };

  useEffect(() => {
    async function fetchOrders() {
      const res = await ORDERS_DETAILS({
        startDate,
        endDate,
        page,
        limit: rowsPerPage,
      });

      if (res) {
        setOrdersDetails(res?.orders || []);
        setTotalOrders(res?.totalOrders || 0);
      }
    }

    fetchOrders();
  }, [page, rowsPerPage]);

  useEffect(() => {
    setPage(0);
  }, [statusFilter, couponFilter, searchText]);

  return (
    <Layout>
      <div className='w-full flex flex-col'>
        <TopBar title="Orders" />
      </div>
      <Wrapper>
        <div className='w-[90%] mx-auto rounded-2xl border border-slate-200 bg-gradient-to-r from-slate-50 via-white to-blue-50 px-6 py-5 shadow-sm'>
          <div className='flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between'>
            <div className='space-y-1'>
              <h2 className='text-2xl font-semibold text-slate-900'>Order Details</h2>
              <p className='text-sm text-slate-600'>
                Track source, medium, coupon usage, payment details, and delivery status from one view.
              </p>
            </div>
            <div className='flex flex-wrap items-center gap-3'>
              <DatePicker date={date} setDate={setDate} onSubmit={onDateSelect} />
              <Button variant='contained' onClick={handleExportExcel}>Export to Excel</Button>
            </div>
          </div>

          <div className='mt-5 grid gap-3 md:grid-cols-2 xl:grid-cols-4'>
            <div className='rounded-xl border border-slate-200 bg-white p-4'>
              <p className='text-sm text-slate-500'>Orders On This Page</p>
              <p className='mt-2 text-2xl font-semibold text-slate-900'>{filteredOrders.length}</p>
            </div>
            <div className='rounded-xl border border-slate-200 bg-white p-4'>
              <p className='text-sm text-slate-500'>Placed</p>
              <p className='mt-2 text-2xl font-semibold text-emerald-600'>{statusCounts['1'] || 0}</p>
            </div>
            <div className='rounded-xl border border-slate-200 bg-white p-4'>
              <p className='text-sm text-slate-500'>Pending</p>
              <p className='mt-2 text-2xl font-semibold text-amber-600'>{statusCounts['5'] || 0}</p>
            </div>
            <div className='rounded-xl border border-slate-200 bg-white p-4'>
              <p className='text-sm text-slate-500'>Delivered</p>
              <p className='mt-2 text-2xl font-semibold text-blue-600'>{statusCounts['3'] || 0}</p>
            </div>
          </div>
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

        <div className='w-[90%] mx-auto rounded-2xl border border-slate-200 bg-white p-5 shadow-sm'>
          <div className='flex flex-col gap-4'>
            <div className='flex flex-col gap-3 xl:flex-row xl:items-center xl:justify-between'>
              <div className='flex-1'>
                <label className='mb-2 block text-sm font-medium text-slate-700'>Search</label>
                <input
                  type='text'
                  value={searchText}
                  onChange={(e) => setSearchText(e.target.value)}
                  placeholder='Search by order id, customer, source, medium, coupon'
                  className='w-full rounded-xl border border-slate-300 px-4 py-3 text-sm outline-none transition focus:border-blue-500'
                />
              </div>
              <div className='grid gap-3 sm:grid-cols-2 xl:w-[380px]'>
                <div>
                  <label className='mb-2 block text-sm font-medium text-slate-700'>Coupon Filter</label>
                  <select
                    value={couponFilter}
                    onChange={(e) => setCouponFilter(e.target.value)}
                    className='w-full rounded-xl border border-slate-300 px-4 py-3 text-sm outline-none transition focus:border-blue-500'
                  >
                    <option value='all'>All Orders</option>
                    <option value='applied'>Coupon Applied</option>
                    <option value='not-applied'>No Coupon</option>
                  </select>
                </div>
                <div className='rounded-xl border border-slate-200 bg-slate-50 px-4 py-3'>
                  <p className='text-sm text-slate-500'>Total API Orders</p>
                  <p className='mt-1 text-xl font-semibold text-slate-900'>{totalOrders}</p>
                </div>
              </div>
            </div>

            <div>
              <label className='mb-3 block text-sm font-medium text-slate-700'>Status Filter</label>
              <div className='flex flex-wrap gap-2'>
                {STATUS_FILTERS.map((item) => {
                  const isActive = statusFilter === item.value;
                  const statusCount = item.value === 'all'
                    ? ordersDetails.length
                    : (statusCounts[item.value] || 0);

                  return (
                    <button
                      key={item.value}
                      onClick={() => setStatusFilter(item.value)}
                      className={`rounded-full border px-4 py-2 text-sm font-medium transition ${
                        isActive
                          ? 'border-blue-600 bg-blue-600 text-white'
                          : 'border-slate-300 bg-white text-slate-700 hover:border-blue-400'
                      }`}
                    >
                      {item.label} ({statusCount})
                    </button>
                  );
                })}
              </div>
            </div>
          </div>
        </div>

        <div className='w-[90%] mx-auto'>
          <CustomTable
            headings={columns}
            rows={rows}
            page={page}
            setPage={setPage}
            rowsPerPage={rowsPerPage}
            setRowsPerPage={setRowsPerPage}
            totalOrders={statusFilter === 'all' && !searchText && couponFilter === 'all' ? totalOrders : filteredOrders.length}
            handleRowClick={handleRowClick}
            handleOpen={handleOpen}
          />
        </div>
      </Wrapper>
      <OrderModal
        show={showOrderModal}
        setShow={setShowOrderModal}
        data={singleOrdersDetails?.products}
      />
    </Layout>
  );
};

export default Orders;
