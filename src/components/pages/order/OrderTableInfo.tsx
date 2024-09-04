import DateInput from '@/components/atomic/DateInput';
import InfoCard from '@/components/common/InfoCard';
import { THandleFilterInputChange } from '@/types/components/common';
import { IOrderFilter, IOrderResponse } from '@/types/pages/order';
import { CalendarIcon } from '@radix-ui/react-icons';

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
    <div className='lg:flex items-center gap-5 h-full w-full p-3 md:p-5 border-b border-primaryBorder space-y-2 lg:space-y-0'>
      {/* date select */}
      <div className='flex items-center justify-center gap-2 px-2 md:px-3 py-1.5 sm:py-2 md:py-5 border border-primaryBorder rounded-lg text-[#667085]'>
        <CalendarIcon className='w-5 h-5' />
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
