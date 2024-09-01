'use client';

import Breadcrumbs from '@/components/layout/Breadcrumbs';
import OrderTableInfo from '@/components/pages/order/OrderTableInfo';
import OrderTableToolbar from '@/components/pages/order/OrderTableToolbar';
import { IActionsButton } from '@/types/actionButtons';
import { createIcon, exportIcon } from '@/utils/icons';

export default function Home() {
  // Define the actions for the breadcrumbs bar
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
  return (
    <div>
      <Breadcrumbs
        pageTitle='Orders'
        breadcrumbsActionsButtons={breadcrumbsActionsButtons}
      />

      <div className='bg-white rounded-xl border border-primaryBorder shadow-table'>
        <OrderTableInfo />
        <OrderTableToolbar />
        {/* <TableAction
          breadcrumbsActions={breadcrumbsActions}
          numSelected={selected.length}
        /> */}
        {/* <Table>
          <TableHeader
            order={order}
            orderBy={orderBy}
            numSelected={selected.length}
            rowCount={data?.data.length}
            handleSort={handleSort}
            handleOrder={handleOrder}
            selectAllRow={(isAllSelected: boolean) => {
              if (data?.data) {
                handleSelectAllRow(
                  isAllSelected,
                  data?.data.map((result) => result.AccessNo.toString())
                );
              }
            }}
            headerData={TABLE_HEAD}
          />
          <tbody className='divide-y divide-gray-200'>
            {!isLoading && (
              <>
                {data?.data.map((row) => (
                  <AccessTableRow
                    key={row.AccessNo}
                    row={row}
                    selected={selected}
                    handleSelectRow={handleSelectRow}
                  />
                ))}
                <TableEmptyRows
                  emptyRows={
                    data?.data ? emptyRows(page, rowsPerPage, data?.count) : 0
                  }
                />
              </>
            )}
          </tbody>
        </Table>
        <TableBodyLoading isLoading={isLoading} tableRowPerPage={rowsPerPage} />
        <TableNoData isNotFoun   d={isNotFound} />
        <Pagination
          totalRows={data?.count || 0}
          currentPage={page}
          rowsPerPage={rowsPerPage}
          currentPath={location.pathname}
          onPageChange={handleChangePage}
          onRowsPerPageChange={handleChangeRowsPerPage}
        /> */}
      </div>
    </div>
  );
}
