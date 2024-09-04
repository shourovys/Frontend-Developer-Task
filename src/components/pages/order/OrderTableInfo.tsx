import DateInput from '@/components/atomic/DateInput';
import { THandleFilterInputChange } from '@/types/components/common';
import { IOrderFilter, IOrderResponse } from '@/types/pages/order';
import Icon, { calendarIcon } from '@/utils/icons';

const InfoCard = ({
  title,
  value = 0,
}: {
  title: string;
  value?: string | number;
}) => {
  return (
    <div className='px-6 py-2'>
      <p className='text-sm font-medium text-[#05060F99]'>{title}</p>
      <p className='font-bold'>{value}</p>
    </div>
  );
};

interface IProps {
  data?: IOrderResponse;
  filterState: IOrderFilter;
  handleFilterInputChange: THandleFilterInputChange;
}

const OrderTableInfo: React.FC<IProps> = ({
  data,
  filterState,
  handleFilterInputChange,
}) => {
  return (
    <div className='flex items-center gap-5 h-full w-full p-5 border-b border-primaryBorder'>
      {/* date select */}
      <div className='flex items-center justify-center gap-2 px-3 py-5 border border-primaryBorder rounded-lg text-[#667085]'>
        <Icon icon={calendarIcon} />
        <DateInput
          name='customDate'
          placeholder='Select Date'
          value={filterState?.customDate}
          onChange={handleFilterInputChange}
        />
      </div>

      {/* order info  */}
      <div className='grid grid-cols-4 divide-x divide-primaryBorder border border-primaryBorder rounded-lg flex-1 '>
        <InfoCard
          title='Total Revenue'
          value={`৳ ${data?.totalRevenue || 0}`}
        />
        <InfoCard title='Order item' value={data?.orderItem} />
        <InfoCard title='Return item' value={data?.returnItem} />
        <InfoCard title='Fulfilled orders' value={data?.fulfilledOrders} />
      </div>
    </div>
  );
};

export default OrderTableInfo;
