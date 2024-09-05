import { IOrder, IOrderResponse } from '@/types/pages/order';
import fs from 'fs/promises';
import { NextRequest, NextResponse } from 'next/server';
import path from 'path';
import QueryString from 'qs';
import {
  filterOrders,
  filterOrdersByStatus,
  sortAndPaginateOrders,
} from './utils';

// Define type for order counts to handle indexing issues with string keys
type OrderStatusCounts = {
  Processing: number;
  Confirmed: number;
  Shipped: number;
  Delivered: number;
  Return: number;
  Cancelled: number;
  [key: string]: number; // Index signature to allow string keys
};

export async function GET(req: NextRequest) {
  const query = req?.url?.split('?')[1] as unknown as string;
  try {
    // Parse query parameters with default values
    const {
      offset = '0',
      limit = '10',
      sort_by = 'date',
      order = 'desc',
      search = '',
      status = [],
      paymentStatus = [],
      date = '',
      customStartDate = '',
      customEndDate = '',
    } = QueryString.parse(query) || {};

    // Convert query parameters to appropriate types
    const offsetNum = parseInt(offset as string, 10) || 0;
    const limitNum = parseInt(limit as string, 10) || 10;

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
      offsetNum,
      limitNum
    );

    // Calculate additional response fields
    const totalRevenue = filteredOrdersStatus.reduce(
      (acc, order) => acc + order.totalAmount.grandTotal,
      0
    );
    const orderItem = filteredOrdersStatus.reduce(
      (acc, order) => acc + order.products.length,
      0
    );
    const returnItem = filteredOrdersStatus.reduce(
      (acc, order) =>
        acc + (order.status === 'Return' ? order.products.length : 0),
      0
    );
    const fulfilledOrders = filteredOrdersStatus.filter(
      (order) => order.status === 'Delivered'
    ).length;

    // Count orders by status
    const orderCounts: OrderStatusCounts = filteredOrders.reduce(
      (acc: OrderStatusCounts, order) => {
        acc[order.status] = (acc[order.status] || 0) + 1;
        return acc;
      },
      {
        Processing: 0,
        Confirmed: 0,
        Shipped: 0,
        Delivered: 0,
        Return: 0,
        Cancelled: 0,
      }
    );

    // Construct the response
    const response: IOrderResponse = {
      count: filteredOrdersStatus.length,
      total: filteredOrders.length,
      Processing: orderCounts['Processing'],
      Confirmed: orderCounts['Confirmed'],
      Shipped: orderCounts['Shipped'],
      Delivered: orderCounts['Delivered'],
      Return: orderCounts['Return'],
      Cancelled: orderCounts['Cancelled'],
      totalRevenue,
      orderItem,
      returnItem,
      fulfilledOrders,
      orders: paginatedOrders,
    };

    // Send response
    return NextResponse.json(response);
  } catch (error) {
    // Handle errors and send a response
    console.error('Error fetching orders:', error);
    return NextResponse.json({
      count: 0,
      total: 0,
      Processing: 0,
      Confirmed: 0,
      Shipped: 0,
      Delivered: 0,
      Return: 0,
      Cancelled: 0,
      totalRevenue: 0,
      orderItem: 0,
      returnItem: 0,
      fulfilledOrders: 0,
      orders: [],
    });
  }
}
