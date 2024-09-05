'use client';
import { fetcher } from '@/api/swrConfig';
import Breadcrumbs from '@/components/layout/Breadcrumbs';
import TableBodyLoading from '@/components/loading/TableBodyLoading';
import OrderTableInfo from '@/components/pages/order/OrderTableInfo';
import OrderTableRow from '@/components/pages/order/OrderTableRow';
import OrderTableToolbar from '@/components/pages/order/OrderTableToolbar';
import Pagination from '@/components/table/pagination/Pagination';
import Table from '@/components/table/Table';
import TableEmptyRows from '@/components/table/TableEmptyRows';
import TableHeader from '@/components/table/TableHeader';
import TableNoData from '@/components/table/TableNoData';
import { useFilter } from '@/hooks/useFilter';
import { useApiQueryParams } from '@/hooks/useOrderApiQueryPparams';
import useTable, { emptyRows } from '@/hooks/useTable';
import { IActionsButton } from '@/types/components/actionButtons';
import { ITableHead } from '@/types/components/table';
import { IOrderFilter, IOrderResponse } from '@/types/pages/order';
import { createIcon, exportIcon } from '@/utils/icons';
import QueryString from 'qs';
import { useEffect } from 'react';
import useSWR from 'swr';

export default function Home() {
  // Custom hook managing table state and handlers
  const {
    page,
    rowsPerPage,
    order,
    orderBy,
    selected,
    handleChangePage,
    handleSort,
    handleChangeRowsPerPage,
    handleSelectRow,
    handleSelectAllRows,
  } = useTable({ defaultOrderBy: 'date' });

  // Define table head columns with filtering options
  const TABLE_HEAD: ITableHead[] = [
    { id: '$oid', label: 'Order Id', filter: true },
    { id: 'date', label: 'Creating date', filter: true },
    { id: 'customer', label: 'Customer Info', filter: false },
    { id: 'grandTotal', label: 'Total', filter: true },
    { id: 'Quantity', label: 'Quantity', filter: false },
    { id: 'Payment', label: 'Payment status', filter: false },
    { id: 'Delivery', label: 'Delivery method', filter: false },
    { id: 'Status', label: 'Status', filter: true },
  ];

  // Initial state for filters
  const initialFilterState: IOrderFilter = {
    id: '',
    search: '',
    status: ['All'],
    paymentStatus: [],
    date: '',
    customDate: { startDate: '', endDate: '' },
  };

  // State and handlers for managing filters using a custom hook
  const {
    filterState,
    setFilterState,
    handleFilterInputChange,
    handleFilterStateReset,
  } = useFilter(initialFilterState);

  // Create query params for the API using a custom hook
  const apiQueryParams = useApiQueryParams({
    page,
    rowsPerPage,
    orderBy,
    order,
    filterState,
  });

  // Fetch data using SWR with the generated query string
  const { isLoading, data, error } = useSWR<IOrderResponse>(
    `/orders/?${QueryString.stringify(apiQueryParams)}`,
    fetcher
  );

  // on filter state change restart pagination
  useEffect(() => {
    handleChangePage(1);
  }, [filterState]);

  // Define actions for breadcrumb buttons
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

  // Check if no data is found
  const isNotFound = !data?.count && !isLoading && !error;

  return (
    <div>
      {/* Breadcrumbs with actions */}
      <Breadcrumbs
        pageTitle='Orders'
        breadcrumbsActionsButtons={breadcrumbsActionsButtons}
      />

      {/* Main Table Container */}
      <div className='bg-white rounded-xl border border-primaryBorder shadow-table'>
        {/* Order Table Info and Toolbar */}
        <OrderTableInfo
          data={data}
          filterState={filterState}
          handleFilterInputChange={handleFilterInputChange}
        />
        <OrderTableToolbar
          data={data}
          filterState={filterState}
          handleFilterStateReset={handleFilterStateReset}
          handleFilterInputChange={handleFilterInputChange}
          setFilterState={setFilterState}
        />

        {/* Table and Table Headers */}
        <Table>
          <TableHeader
            order={order}
            orderBy={orderBy}
            numSelected={selected.length}
            rowCount={data?.orders.length || 0}
            handleSort={handleSort}
            selectAllRow={(isAllSelected) => {
              if (data) {
                handleSelectAllRows(
                  isAllSelected,
                  data.orders.map((order) => order._id.$oid)
                );
              }
            }}
            headerData={TABLE_HEAD}
          />

          {/* Table Body and Rows */}
          <tbody className='divide-y divide-border-primaryBorder'>
            {!isLoading &&
              data?.orders.map((row) => (
                <OrderTableRow
                  key={row._id.$oid}
                  row={row}
                  selected={selected}
                  handleSelectRow={handleSelectRow}
                />
              ))}
            <TableEmptyRows
              emptyRows={data ? emptyRows(page, rowsPerPage, data.count) : 0}
            />
          </tbody>
        </Table>

        {/* Loading and No Data States */}
        <TableBodyLoading isLoading={isLoading} tableRowPerPage={rowsPerPage} />
        <TableNoData isNotFound={isNotFound} />
      </div>

      {/* Pagination Component */}
      <Pagination
        totalRows={data?.count || 0}
        currentPage={page}
        rowsPerPage={rowsPerPage}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
      />
    </div>
  );
}
