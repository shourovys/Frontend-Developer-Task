// hooks/useApiQueryParams.ts
import { IOrderApiQueryParams, IOrderFilter } from '@/types/pages/order';
import QueryString from 'qs';

// Hook to create query parameters for the API call
export const useApiQueryParams = ({
  page,
  rowsPerPage,
  orderBy,
  order,
  filterState,
}: {
  page: number;
  rowsPerPage: number;
  orderBy: string;
  order: 'asc' | 'desc';
  filterState: IOrderFilter;
}): string => {
  // Construct query parameters based on the table state and filter state
  const queryParams: IOrderApiQueryParams = {
    offset: (page - 1) * rowsPerPage,
    limit: rowsPerPage,
    sort_by: orderBy,
    order,
    ...(filterState.id && { id: filterState.id }),
    ...(filterState.search && { search: filterState.search }),
    ...(filterState.status.length && { status: filterState.status }),
    ...(filterState.paymentStatus.length && {
      paymentStatus: filterState.paymentStatus,
    }),
    ...(filterState.date && { date: filterState.date }),
    ...(filterState.customDate.startDate && {
      customStartDate: filterState.customDate.startDate,
    }),
    ...(filterState.customDate.endDate && {
      customEndDate: filterState.customDate.endDate,
    }),
  };

  return QueryString.stringify(queryParams);
};
