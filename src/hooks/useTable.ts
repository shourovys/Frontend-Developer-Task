import { TABLE_ROW_PER_PAGE } from '@/utils/config';
import { usePathname, useSearchParams } from 'next/navigation';
import { useState } from 'react';

interface IProps {
  // data: object[];
  pageSize?: number;
  defaultOrderBy?: string;
  defaultOrder?: 'asc' | 'desc';
  defaultPage?: number;
  defaultRowsPerPage?: number;
  defaultSelected?: string[];
  onSort?: (orderBy: string, order: 'asc' | 'desc') => void;
  onSelectRow?: (selected: string[]) => void;
  onChangePage?: (page: number) => void;
  onChangeRowsPerPage?: (rowsPerPage: number) => void;
  onChangeDense?: (dense: boolean) => void;
}

const useTable = (props: IProps) => {
  const {
    // data,
    pageSize = TABLE_ROW_PER_PAGE,
    defaultOrderBy = '',
    defaultOrder = 'asc',
    defaultPage = 1,
    defaultRowsPerPage = pageSize,
    defaultSelected = [],
    onSort,
    onSelectRow,
    onChangePage,
    onChangeRowsPerPage,
    onChangeDense,
  } = props;

  const pathname = usePathname();
  const searchParams = useSearchParams();

  // const updateRouteQuery = useUpdateRouteQuery();
  // const updateRouteQueryWithReplace = useUpdateRouteQueryWithReplace();

  const [orderBy, setOrderBy] = useState(defaultOrderBy);
  const [order, setOrder] = useState<'asc' | 'desc'>(defaultOrder);
  const [page, setPage] = useState(defaultPage);
  const [rowsPerPage, setRowsPerPage] = useState(defaultRowsPerPage);
  const [selected, setSelected] = useState(defaultSelected);
  const [dense, setDense] = useState(false);

  const handleSort = (_orderBy: string, _order: 'asc' | 'desc') => {
    setOrderBy(_orderBy);
    // updateRouteQueryWithReplace({
    //   query: { orderBy: _orderBy, order: _order },
    //   pathName: pathname,
    // });
    if (onSort) {
      onSort(_orderBy, _order);
    }
  };

  const handleOrder = (_order: 'asc' | 'desc') => {
    setOrder(_order);
  };

  const handleSelectRow = (_selectedId: string) => {
    const selectedIndex = selected.indexOf(_selectedId);

    let newSelected: string[] = [];

    if (selectedIndex === -1) {
      newSelected = newSelected.concat(selected, _selectedId);
    } else if (selectedIndex === 0) {
      newSelected = newSelected.concat(selected.slice(1));
    } else if (selectedIndex === selected.length - 1) {
      newSelected = newSelected.concat(selected.slice(0, -1));
    } else if (selectedIndex > 0) {
      newSelected = newSelected.concat(
        selected.slice(0, selectedIndex),
        selected.slice(selectedIndex + 1)
      );
    }
    setSelected(newSelected);
    if (onSelectRow) {
      onSelectRow(newSelected);
    }
  };

  const handleSelectAllRow = (selectAll: boolean, _selectedIds: string[]) => {
    if (selectAll) {
      // Select all rows
      setSelected(_selectedIds);
    } else {
      // Deselect all rows
      setSelected([]);
    }
  };

  const handleChangePage = (_page: number) => {
    setPage(_page);
    if (onChangePage) {
      onChangePage(_page);
    }
  };

  const handleChangeRowsPerPage = (_rowsPerPage: number) => {
    handleChangePage(1);
    setRowsPerPage(_rowsPerPage);
    if (onChangeRowsPerPage) {
      onChangeRowsPerPage(_rowsPerPage);
    }
  };

  const handleChangeDense = (_dense: boolean) => {
    setDense(_dense);
    if (onChangeDense) {
      onChangeDense(_dense);
    }
  };

  return {
    orderBy,
    order,
    page,
    rowsPerPage,
    selected,
    dense,
    handleSort,
    handleOrder,
    handleSelectRow,
    handleSelectAllRow,
    handleChangePage,
    handleChangeRowsPerPage,
    handleChangeDense,
  };
};

export default useTable;

export function emptyRows(
  page: number,
  rowsPerPage: number,
  arrayLength: number
): number {
  return page > 1 ? Math.max(0, page * rowsPerPage - arrayLength) : 0;
}
