import Icon, { calendarIcon } from '@/utils/icons';

const InfoCard = ({ title, value }: { title: string; value: string }) => {
  return (
    <div className='px-6 py-2'>
      <p className='text-sm font-medium text-[#05060F99]'>{title}</p>
      <p className='font-bold'>{value}</p>
    </div>
  );
};

const OrderTableInfo = () => {
  return (
    <div className='flex items-center gap-5 h-full w-full p-5 border-b border-primaryBorder'>
      {/* date select */}
      <div className='flex items-center justify-center gap-2 px-3 py-5 border border-primaryBorder rounded-lg text-[#667085]'>
        <Icon icon={calendarIcon} />
        <span className='font-medium text-sm text-nowrap'>Select Dates</span>
      </div>

      {/* order info  */}
      <div className='grid grid-cols-4 divide-x divide-primaryBorder border border-primaryBorder rounded-lg flex-1'>
        <InfoCard title='Total Revenue' value='$12,084' />
        <InfoCard title='Order item' value='186' />
        <InfoCard title='Return item' value='12' />
        <InfoCard title='Fulfilled orders' value='84' />
      </div>
    </div>
  );
};

export default OrderTableInfo;
