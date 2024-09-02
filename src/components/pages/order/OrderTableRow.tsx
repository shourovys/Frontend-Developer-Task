import Checkbox from '@/components/atomic/Checkbox';
import TableData from '@/components/table/TableData';
import TableDataAction from '@/components/table/TableDataAction';
import TableRow from '@/components/table/TableRow';
import { cn } from '@/lib/utils';
import { IOrder } from '@/types/pages/order';
import Icon, { checkIcon, copyIcon, threeDotsIcon } from '@/utils/icons';
import { format } from 'date-fns';
import Image from 'next/image';
import { useState } from 'react';

type IProps = {
  row: IOrder;
  selected: string[];
  handleSelectRow: (_selectedId: string) => void;
};

function AccessTableRow({ row, selected, handleSelectRow }: IProps) {
  const [copiedField, setCopiedField] = useState<string | null>(null);

  // Copy text to clipboard
  const handleCopyToClipboard = (text: string, field: string) => {
    navigator.clipboard.writeText(text).then(() => {
      setCopiedField(field);
      setTimeout(() => setCopiedField(null), 2000);
    });
  };

  // Determine styles for payment status
  const getPaymentStatusStyles = (status: string) => {
    const styles: Record<string, string> = {
      Paid: 'text-[#0D894F] bg-[#E5F5EB]',
      Cancelled: 'text-[#FC0000] bg-[#F9F0F0]',
      'In Progress': 'text-[#DF9934] bg-[#FFF6EA]',
      Refunded: 'text-[#4698AF] bg-[#E2F9FF]',
    };
    return styles[status] || '';
  };

  // Determine styles for order status
  const getOrderStatusStyles = (status: string) => {
    const styles: Record<string, string> = {
      Processing: 'bg-[#E5EFFF]',
    } as const;
    return styles[status] || 'bg-[#F3F8FC]';
  };

  // Format the date and time
  const formatDateTime = (dateString: string) => {
    const date = new Date(dateString);
    return format(date, "PP 'at' p");
  };

  return (
    <TableRow key={row._id.$oid} selected={selected.includes(row._id.$oid)}>
      <TableDataAction selected={selected.includes(row._id.$oid)}>
        <Checkbox
          value={`select-row-${row._id.$oid}`}
          checked={selected.includes(row._id.$oid.toString())}
          onChange={() => handleSelectRow(row._id.$oid.toString())}
        />
      </TableDataAction>
      <TableData>
        {row._id.$oid}
        <Icon
          icon={copiedField === 'id' ? checkIcon : copyIcon}
          className='text-primary text-base ml-1.5 cursor-pointer'
          onClick={() => handleCopyToClipboard(row._id.$oid, 'id')}
        />
      </TableData>
      <TableData>{formatDateTime(row.createdAt.$date)}</TableData>
      <TableData>
        <p>{row.shipping.name}</p>
        <div className='flex items-center gap-2'>
          <p className='text-[#E46A11]'>{row.shipping.phone}</p>
          <Icon
            icon={copiedField === 'phone' ? checkIcon : copyIcon}
            className='text-primary text-base cursor-pointer'
            onClick={() => handleCopyToClipboard(row.shipping.phone, 'phone')}
          />
        </div>
        <p>
          {row.shipping.address}, {row.shipping.city}
        </p>
      </TableData>
      <TableData>৳ {row.totalAmount.grandTotal}</TableData>
      <TableData>
        {row.products.reduce((acc, product) => acc + product.quantity, 0)} items
      </TableData>
      <TableData>
        <span
          className={cn(
            getPaymentStatusStyles(row.payment.status),
            'px-3 py-[5px] rounded-full'
          )}
        >
          {row.payment.status}
        </span>
      </TableData>
      <TableData>
        <Image
          src='/pathao.png'
          alt=''
          height={32}
          width={32}
          className='bg-[#F7F7F7] rounded-full mb-1 p-0.5'
        />
        Pathao
      </TableData>
      <TableData>
        <span
          className={cn(
            getOrderStatusStyles(row.status),
            'px-3 py-[5px] rounded-full'
          )}
        >
          {row.status}
        </span>
      </TableData>
      <TableData className='pr-5'>
        <div className='flex items-center justify-center w-9 aspect-square text-base bg-primaryLight text-primary rounded-full'>
          <Icon icon={threeDotsIcon} />
        </div>
      </TableData>
    </TableRow>
  );
}

export default AccessTableRow;
