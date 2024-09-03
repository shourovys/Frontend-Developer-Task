'use client';

import Breadcrumbs from '@/components/layout/Breadcrumbs';
import TableBodyLoading from '@/components/loading/TableBodyLoading';
import OrderTableInfo from '@/components/pages/order/OrderTableInfo';
import AccessTableRow from '@/components/pages/order/OrderTableRow';
import OrderTableToolbar from '@/components/pages/order/OrderTableToolbar';
import Pagination from '@/components/table/pagination/Pagination';
import Table from '@/components/table/Table';
import TableHeader from '@/components/table/TableHeader';
import TableNoData from '@/components/table/TableNoData';
import useTable from '@/hooks/useTable';
import { IActionsButton } from '@/types/components/actionButtons';
import { ITableHead } from '@/types/components/table';
import { IOrder } from '@/types/pages/order';
import { createIcon, exportIcon } from '@/utils/icons';

export default function Home() {
  const {
    page,
    rowsPerPage,
    order,
    orderBy,
    selected,
    handleChangePage,
    handleSort,
    handleOrder,
    handleChangeRowsPerPage,
    handleSelectRow,
    handleSelectAllRow,
  } = useTable({});

  const TABLE_HEAD: ITableHead[] = [
    { id: 'Id', label: 'Order Id', filter: true },
    { id: 'date', label: 'Creating date', filter: true },
    { id: 'date', label: 'Customer date', filter: true },
    { id: 'Total', label: 'Total', filter: true },
    { id: 'Quantity', label: 'Quantity', filter: true },
    { id: 'Payment', label: 'Payment status', filter: true },
    { id: 'Delivery', label: 'Delivery method', filter: true },
    { id: 'Status', label: 'Status', filter: true },
  ];

  const isLoading = false;
  const data: IOrder[] = [
    {
      _id: {
        $oid: '66bdf3f9a63c807a82aa74ea',
      },
      user: {
        firstName: 'Javier',
        lastName: 'Toy',
        email: 'Brice.Towne@yahoo.com',
        phone: '1-812-315-2160 x3536',
      },
      products: [
        {
          product: {
            $oid: '66bdf3f9a63c807a82aa74e6',
          },
          quantity: 9,
          basePrice: 164,
          totalPrice: 53,
          discount: 1423,
          _id: {
            $oid: '66bdf3f9a63c807a82aa74eb',
          },
        },
        {
          product: {
            $oid: '66bdf3f9a63c807a82aa74e7',
          },
          quantity: 8,
          basePrice: 993,
          totalPrice: 4318,
          discount: 3626,
          _id: {
            $oid: '66bdf3f9a63c807a82aa74ec',
          },
        },
        {
          product: {
            $oid: '66bdf3f9a63c807a82aa74e8',
          },
          quantity: 2,
          basePrice: 736,
          totalPrice: 1026,
          discount: 446,
          _id: {
            $oid: '66bdf3f9a63c807a82aa74ed',
          },
        },
        {
          product: {
            $oid: '66bdf3f9a63c807a82aa74e9',
          },
          quantity: 3,
          basePrice: 414,
          totalPrice: 946,
          discount: 296,
          _id: {
            $oid: '66bdf3f9a63c807a82aa74ee',
          },
        },
      ],
      totalAmount: {
        baseTotal: 12134,
        discount: 5791,
        shipping: 13,
        tax: 17,
        grandTotal: 6373,
      },
      status: 'Shipped',
      shipping: {
        name: 'Guadalupe Bashirian',
        phone: '1-243-925-5169 x9125',
        address: '8562 Kaitlyn Bridge',
        city: 'East Martinaboro',
        postalCode: '92238',
        country: 'Wallis and Futuna',
      },
      payment: {
        paymentMethod: 'Cash on Delivery',
        paymentResult: {
          id: 'd8d61e57-f452-4690-ae22-eaa986c3cfb6',
          status: 'Success',
          update_time:
            'Thu Aug 15 2024 04:17:07 GMT+0600 (Bangladesh Standard Time)',
          email_address: 'Craig.Nikolaus48@yahoo.com',
        },
        amount: 6373,
        status: 'Paid',
      },
      notes: {
        customer:
          'Comedo suppono depereo cumque curriculum causa dolorum ante.',
        admin:
          'Calamitas absens adficio audax bardus credo cibo taceo succedo.',
        invoice:
          'Magnam compello adstringo tutamen adicio quibusdam clam delibero vulnus.',
        delivery:
          'Assumenda vesper vulgo theatrum cupiditate adhaero atavus apparatus eaque.',
      },
      delivery: {
        deliveryMethod: 'Standard',
        deliveryTime:
          'Mon Oct 21 2024 04:07:10 GMT+0600 (Bangladesh Standard Time)',
        deliveryCost: 13,
        deliveryTrackingLink: 'https://minor-checkout.net',
        deliveryTrackingId: '035c220a-40b1-4a71-9081-6faef8478826',
      },
      createdAt: {
        $date: '2024-08-01T06:47:37.112Z',
      },
      history: [],
      __v: 0,
      updatedAt: {
        $date: '2024-08-15T12:26:35.369Z',
      },
    },
    {
      _id: {
        $oid: '66bdf3f9a63c807a82aa74f3',
      },
      user: {
        firstName: 'Watson',
        lastName: 'Kassulke',
        email: 'Fannie.Sanford47@hotmail.com',
        phone: '(636) 453-5538 x265',
      },
      products: [
        {
          product: {
            $oid: '66bdf3f9a63c807a82aa74ef',
          },
          quantity: 6,
          basePrice: 923,
          totalPrice: 4037,
          discount: 1501,
          _id: {
            $oid: '66bdf3f9a63c807a82aa74f4',
          },
        },
        {
          product: {
            $oid: '66bdf3f9a63c807a82aa74f0',
          },
          quantity: 7,
          basePrice: 978,
          totalPrice: 1980,
          discount: 4866,
          _id: {
            $oid: '66bdf3f9a63c807a82aa74f5',
          },
        },
        {
          product: {
            $oid: '66bdf3f9a63c807a82aa74f1',
          },
          quantity: 3,
          basePrice: 15,
          totalPrice: 16,
          discount: 29,
          _id: {
            $oid: '66bdf3f9a63c807a82aa74f6',
          },
        },
        {
          product: {
            $oid: '66bdf3f9a63c807a82aa74f2',
          },
          quantity: 4,
          basePrice: 764,
          totalPrice: 2649,
          discount: 407,
          _id: {
            $oid: '66bdf3f9a63c807a82aa74f7',
          },
        },
      ],
      totalAmount: {
        baseTotal: 15485,
        discount: 6803,
        shipping: 7,
        tax: 6,
        grandTotal: 8695,
      },
      status: 'Shipped',
      shipping: {
        name: 'Jose Fahey I',
        phone: '(433) 962-3881 x947',
        address: '95338 Bednar Extension',
        city: 'Monroeshire',
        postalCode: '11750',
        country: 'British Indian Ocean Territory (Chagos Archipelago)',
      },
      payment: {
        paymentMethod: 'Nagad',
        paymentResult: {
          id: 'eb03f029-e9bb-4198-a61f-026642142543',
          status: 'Success',
          update_time:
            'Thu Aug 15 2024 10:40:03 GMT+0600 (Bangladesh Standard Time)',
          email_address: 'Pansy5@gmail.com',
        },
        amount: 8695,
        status: 'Refunded',
      },
      notes: {
        customer:
          'Crapula argentum comburo minus crux temporibus sophismata capto.',
        admin: 'Suggero vapulus alias coniecto theatrum theatrum.',
        invoice: 'Culpo subito demoror sollers.',
        delivery:
          'Vallum benevolentia corpus suscipit deleo incidunt aegrus minima.',
      },
      delivery: {
        deliveryMethod: 'Standard',
        deliveryTime:
          'Wed Sep 11 2024 06:41:48 GMT+0600 (Bangladesh Standard Time)',
        deliveryCost: 7,
        deliveryTrackingLink: 'https://old-plane.net',
        deliveryTrackingId: '4a83c3bf-2030-4adb-bc34-e65205f972a1',
      },
      createdAt: {
        $date: '2024-06-10T16:25:57.179Z',
      },
      history: [],
      __v: 0,
      updatedAt: {
        $date: '2024-08-15T12:26:35.369Z',
      },
    },
    {
      _id: {
        $oid: '66bdf3f9a63c807a82aa74fa',
      },
      user: {
        firstName: 'Quinton',
        lastName: 'Wunsch',
        email: 'Tia49@hotmail.com',
        phone: '(540) 469-6348',
      },
      products: [
        {
          product: {
            $oid: '66bdf3f9a63c807a82aa74f8',
          },
          quantity: 4,
          basePrice: 386,
          totalPrice: 826,
          discount: 718,
          _id: {
            $oid: '66bdf3f9a63c807a82aa74fb',
          },
        },
        {
          product: {
            $oid: '66bdf3f9a63c807a82aa74f9',
          },
          quantity: 10,
          basePrice: 832,
          totalPrice: 5270,
          discount: 3050,
          _id: {
            $oid: '66bdf3f9a63c807a82aa74fc',
          },
        },
      ],
      totalAmount: {
        baseTotal: 9864,
        discount: 3768,
        shipping: 6,
        tax: 14,
        grandTotal: 6116,
      },
      status: 'Shipped',
      shipping: {
        name: 'Tim Dietrich',
        phone: '725-723-7132 x3641',
        address: '65518 Durgan Tunnel',
        city: 'Vinceville',
        postalCode: '76066',
        country: 'Comoros',
      },
      payment: {
        paymentMethod: 'Credit Card',
        paymentResult: {
          id: 'dde06106-5fb5-49bb-9cd6-36de8f6e5ca0',
          status: 'Success',
          update_time:
            'Thu Aug 15 2024 08:59:56 GMT+0600 (Bangladesh Standard Time)',
          email_address: 'Sylvester.Smith@hotmail.com',
        },
        amount: 6116,
        status: 'Cancelled',
      },
      notes: {
        customer: 'Asperiores pecto aptus spiculum.',
        admin:
          'Depraedor vulgaris ager sodalitas facere cunabula curia tergeo ulciscor.',
        invoice: 'Clam sophismata suscipio theatrum arbitro.',
        delivery: 'Thesaurus uxor sono subvenio.',
      },
      delivery: {
        deliveryMethod: 'Express',
        deliveryTime:
          'Sat Jun 07 2025 14:54:05 GMT+0600 (Bangladesh Standard Time)',
        deliveryCost: 6,
        deliveryTrackingLink: 'https://pertinent-bathtub.org/',
        deliveryTrackingId: '6d3c1dec-bd73-4e8d-b5f9-a06edf7bb376',
      },
      createdAt: {
        $date: '2024-08-05T06:05:47.949Z',
      },
      history: [],
      __v: 0,
      updatedAt: {
        $date: '2024-08-15T12:26:35.369Z',
      },
    },
  ];

  const breadcrumbsActionsButtons: IActionsButton[] = [
    {
      color: 'outline',
      icon: exportIcon,
      iconClass: '-rotate-90',
      text: 'Export',
      onClick: () => {},
    },
    {
      color: 'primary',
      icon: createIcon,
      text: 'Create Order',
      onClick: () => {},
    },
  ];

  const isNotFound = !data?.length && !isLoading;

  return (
    <div>
      <Breadcrumbs
        pageTitle='Orders'
        breadcrumbsActionsButtons={breadcrumbsActionsButtons}
      />

      <div className='bg-white rounded-xl border border-primaryBorder shadow-table'>
        <OrderTableInfo />
        <OrderTableToolbar />
        <Table>
          <TableHeader
            order={order}
            orderBy={orderBy}
            numSelected={selected.length}
            rowCount={data?.length}
            handleSort={handleSort}
            handleOrder={handleOrder}
            selectAllRow={(isAllSelected: boolean) => {
              if (data) {
                handleSelectAllRow(
                  isAllSelected,
                  data?.map((result) => result._id.$oid)
                );
              }
            }}
            headerData={TABLE_HEAD}
          />
          <tbody className='divide-y divide-border-primaryBorder'>
            {!isLoading && (
              <>
                {data.map((row) => (
                  <AccessTableRow
                    key={row._id.$oid}
                    row={row}
                    selected={selected}
                    handleSelectRow={handleSelectRow}
                  />
                ))}
                {/* <TableEmptyRows
                  emptyRows={
                    data ? emptyRows(page, rowsPerPage, data?.count) : 0
                  }
                /> */}
              </>
            )}
          </tbody>
        </Table>
        <TableBodyLoading isLoading={isLoading} tableRowPerPage={rowsPerPage} />
        <TableNoData isNotFound={isNotFound} />
      </div>
      <Pagination
        totalRows={110}
        // totalRows={data?.length || 0}
        currentPage={page}
        rowsPerPage={rowsPerPage}
        currentPath={location.pathname}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
      />
    </div>
  );
}
