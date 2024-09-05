import { IOrder } from '@/types/pages/order';
import fs from 'fs/promises';
import { NextRequest, NextResponse } from 'next/server';
import path from 'path';
import QueryString from 'qs';
import {
  filterOrders,
  filterOrdersByStatus,
  sortAndPaginateOrders,
} from '../utils';

// Utility function to convert orders to CSV format
const convertOrdersToCsv = (orders: IOrder[]): string => {
  // Define CSV headers based on the properties you want to export
  const headers = [
    'Order ID',
    'Creating date',
    'Customer Info',
    'Total',
    'Quantity',
    'Payment Status',
    'Delivery method',
    'Status',
  ];
  // Map orders to CSV rows
  const rows = orders.map((order) => [
    order._id.$oid,
    new Date(order.createdAt.$date).toLocaleDateString(),
    order.shipping.name,
    `৳ ${order.totalAmount.grandTotal}`,
    `${order.products.reduce(
      (acc, product) => acc + product.quantity,
      0
    )} items`,
    order.payment.status,
    'Pathao',
    order.status,
  ]);

  // Combine headers and rows into a CSV string
  const csvContent = [headers, ...rows].map((row) => row.join(',')).join('\n');
  return csvContent;
};

export async function GET(req: NextRequest) {
  const query = req?.url?.split('?')[1] as unknown as string;
  try {
    // Parse query parameters with default values
    const {
      sort_by = 'date',
      order = 'desc',
      search = '',
      status = [],
      paymentStatus = [],
      date = '',
      customStartDate = '',
      customEndDate = '',
    } = QueryString.parse(query) || {};

    // Ensure statusFilters and paymentStatusFilters are arrays of strings
    const statusFilters = Array.isArray(status)
      ? status.map((s) => String(s))
      : [String(status)];
    const paymentStatusFilters = Array.isArray(paymentStatus)
      ? paymentStatus.map((p) => String(p))
      : [String(paymentStatus)];
    const sortOrder = order === 'asc' ? 'asc' : 'desc';

    // Fetch order data from a local JSON file
    const filePath = path.join(process.cwd(), 'public', 'test-orders.json');
    const fileContent = await fs.readFile(filePath, 'utf-8');
    const orderData: IOrder[] = JSON.parse(fileContent);

    let filteredOrders: IOrder[] = [];
    let filteredOrdersStatus: IOrder[] = [];

    // Filter by search query based on order $oid
    if (search) {
      const filteredOrderBySearch = orderData.filter((order) =>
        order._id.$oid.includes(search as string)
      );
      filteredOrders = filteredOrderBySearch;
      filteredOrdersStatus = filteredOrderBySearch;
    } else {
      // Filter, sort, and paginate orders
      filteredOrders = filterOrders(
        orderData,
        paymentStatusFilters,
        date as string,
        customStartDate as string,
        customEndDate as string
      );

      filteredOrdersStatus = filterOrdersByStatus(
        filteredOrders,
        statusFilters
      );
    }

    const paginatedOrders = sortAndPaginateOrders(
      filteredOrdersStatus,
      sort_by as string,
      sortOrder,
      0,
      filteredOrdersStatus.length
    );

    // Convert the paginated orders to CSV
    const csvData = convertOrdersToCsv(paginatedOrders);

    // Send response with CSV data
    return NextResponse.json(csvData);
  } catch (error) {
    // Handle errors and send a response
    console.error('Error fetching orders:', error);
    return NextResponse.json('');
  }
}
