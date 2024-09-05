import { IOrder } from '@/types/pages/order';

// Helper function to filter orders based on date
export const filterOrders = (
  orders: IOrder[],
  paymentStatus: string[],
  date: string,
  customStartDate?: string,
  customEndDate?: string
): IOrder[] => {
  let filteredOrders = [...orders];

  // Filter by payment status
  filteredOrders = filteredOrders.filter((order) =>
    paymentStatus.length ? paymentStatus.includes(order.payment.status) : true
  );

  // Filter by date
  const now = new Date();

  // Filter by custom date range if both customStartDate and customEndDate are provided
  if (customStartDate && customEndDate) {
    const startDate = new Date(customStartDate);
    const endDate = new Date(customEndDate);
    filteredOrders = filteredOrders.filter(
      (order) =>
        new Date(order.createdAt.$date) >= startDate &&
        new Date(order.createdAt.$date) <= endDate
    );
  } else {
    switch (date) {
      case 'lastWeek':
        const lastWeek = new Date();
        lastWeek.setDate(now.getDate() - 7);
        filteredOrders = filteredOrders.filter(
          (order) => new Date(order.createdAt.$date) > lastWeek
        );
        break;

      case 'lastMonth':
        const lastMonth = new Date();
        lastMonth.setMonth(now.getMonth() - 1);
        filteredOrders = filteredOrders.filter(
          (order) => new Date(order.createdAt.$date) > lastMonth
        );
        break;

      case 'last3Month':
        const last3Month = new Date();
        last3Month.setMonth(now.getMonth() - 3);
        filteredOrders = filteredOrders.filter(
          (order) => new Date(order.createdAt.$date) > last3Month
        );
        break;

      case 'lastYear':
        const startOfLastYear = new Date(now.getFullYear() - 1, 0, 1);
        const endOfLastYear = new Date(
          now.getFullYear() - 1,
          11,
          31,
          23,
          59,
          59
        );
        filteredOrders = filteredOrders.filter(
          (order) =>
            new Date(order.createdAt.$date) >= startOfLastYear &&
            new Date(order.createdAt.$date) <= endOfLastYear
        );
        break;

      case 'thisYear':
        const startOfThisYear = new Date(now.getFullYear(), 0, 1);
        const endOfThisYear = new Date(now.getFullYear(), 11, 31, 23, 59, 59);
        filteredOrders = filteredOrders.filter(
          (order) =>
            new Date(order.createdAt.$date) >= startOfThisYear &&
            new Date(order.createdAt.$date) <= endOfThisYear
        );
        break;

      default:
        break;
    }
  }

  return filteredOrders;
};

// Helper function to filter orders based on status, payment status
export const filterOrdersByStatus = (
  orders: IOrder[],
  status: string[]
): IOrder[] => {
  let filteredOrders = [...orders];
  if (!status.includes('All')) {
    // Filter by status
    filteredOrders = orders.filter((order) =>
      status.length ? status.includes(order.status) : true
    );
  }

  return filteredOrders;
};

// Helper function to sort and paginate orders
export const sortAndPaginateOrders = (
  orders: IOrder[],
  sortBy: string,
  order: 'asc' | 'desc',
  offset: number,
  limit: number
): IOrder[] => {
  const sortedOrders = [...orders].sort((a, b) => {
    switch (sortBy) {
      case 'date':
        const dateA = new Date(a.createdAt.$date);
        const dateB = new Date(b.createdAt.$date);
        return order === 'asc'
          ? dateA.getTime() - dateB.getTime()
          : dateB.getTime() - dateA.getTime();
      case '$oid':
        return order === 'asc'
          ? a._id.$oid.localeCompare(b._id.$oid)
          : b._id.$oid.localeCompare(a._id.$oid);
      case 'grandTotal':
        return order === 'asc'
          ? a.totalAmount.grandTotal - b.totalAmount.grandTotal
          : b.totalAmount.grandTotal - a.totalAmount.grandTotal;
      case 'Status':
        return order === 'asc'
          ? a.status.localeCompare(b.status)
          : b.status.localeCompare(a.status);
      default:
        return 0;
    }
  });

  // Paginate results
  return sortedOrders.slice(offset, offset + limit);
};
