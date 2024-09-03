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
import useTable, { emptyRows } from '@/hooks/useTable';
import { IActionsButton } from '@/types/components/actionButtons';
import { THandleFilterInputChange } from '@/types/components/common';
import { ITableHead } from '@/types/components/table';
import {
  IOrderApiQueryParams,
  IOrderFilter,
  IOrderResponse,
} from '@/types/pages/order';
import { createIcon, exportIcon } from '@/utils/icons';
import QueryString from 'qs';
import { useState } from 'react';
import useSWR from 'swr';

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
  } = useTable({ defaultOrderBy: 'date' });

  const TABLE_HEAD: ITableHead[] = [
    { id: 'Id', label: 'Order Id', filter: true },
    { id: 'date', label: 'Creating date', filter: true },
    { id: 'Total', label: 'Total', filter: true },
    { id: 'Quantity', label: 'Quantity', filter: true },
    { id: 'Payment', label: 'Payment status', filter: true },
    { id: 'Delivery', label: 'Delivery method', filter: true },
    { id: 'Status', label: 'Status', filter: true },
  ];

  // apply property use for apply filter. filter will apply when apply is true
  const initialFilterState: IOrderFilter = {
    id: '',
    search: '',
    status: ['all'],
    paymentStatus: [],
    date: '',
  };
  // state to store the filter values
  const [filterState, setFilterState] = useState(initialFilterState);

  const handleFilterInputChange: THandleFilterInputChange = (name, value) => {
    // apply will false in every filter state change
    setFilterState((state) => ({ ...state, apply: false, [name]: value }));
  };

  // handle the reset button for the filters
  const handleFilterStateReset = () => {
    // on filter apply filterStateRef update to initial filter state
    setFilterState(initialFilterState);
    // mutate(undefined, true)
  };

  // create the query object for the API call
  const apiQueryParams: IOrderApiQueryParams = {
    offset: (page - 1) * rowsPerPage,
    limit: rowsPerPage,
    sort_by: orderBy,
    order,
    ...(filterState.id && {
      id: filterState.id,
    }),
    ...(filterState.search && {
      search: filterState.search,
    }),
    ...(filterState.status.length && {
      status: filterState.status,
    }),
    ...(filterState.paymentStatus.length && {
      paymentStatus: filterState.paymentStatus,
    }),
    ...(filterState.date && {
      date: filterState.date,
    }),
  };

  const apiQueryString = QueryString.stringify(apiQueryParams);

  const { isLoading, data, mutate } = useSWR<IOrderResponse>(
    `/orders/?${apiQueryString}`,
    fetcher
  );

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

  const isNotFound = !data?.count && !isLoading;

  return (
    <div>
      <Breadcrumbs
        pageTitle='Orders'
        breadcrumbsActionsButtons={breadcrumbsActionsButtons}
      />

      <div className='bg-white rounded-xl border border-primaryBorder shadow-table'>
        <OrderTableInfo />
        <OrderTableToolbar
          data={data}
          filterState={filterState}
          handleFilterStateReset={handleFilterStateReset}
          handleFilterInputChange={handleFilterInputChange}
          setFilterState={setFilterState}
        />
        <Table>
          <TableHeader
            order={order}
            orderBy={orderBy}
            numSelected={selected.length}
            rowCount={data?.count}
            handleSort={handleSort}
            handleOrder={handleOrder}
            selectAllRow={(isAllSelected: boolean) => {
              if (data) {
                handleSelectAllRow(
                  isAllSelected,
                  data?.orders.map((result) => result._id.$oid)
                );
              }
            }}
            headerData={TABLE_HEAD}
          />
          <tbody className='divide-y divide-border-primaryBorder'>
            {!isLoading && (
              <>
                {data?.orders.map((row) => (
                  <OrderTableRow
                    key={row._id.$oid}
                    row={row}
                    selected={selected}
                    handleSelectRow={handleSelectRow}
                  />
                ))}
                <TableEmptyRows
                  emptyRows={
                    data ? emptyRows(page, rowsPerPage, data?.count) : 0
                  }
                />
              </>
            )}
          </tbody>
        </Table>
        <TableBodyLoading isLoading={isLoading} tableRowPerPage={rowsPerPage} />
        <TableNoData isNotFound={isNotFound} />
      </div>
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
