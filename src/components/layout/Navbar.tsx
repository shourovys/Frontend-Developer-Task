import Icon, {
  bellIcon,
  downIcon,
  questionIcon,
  userIcon,
} from '@/utils/icons';

const Navbar = () => {
  return (
    <header className='h-14 md:h-[67px] bg-white w-full'>
      <div className='container mx-auto h-full flex items-center justify-end text-[#05060F99] gap-4 md:gap-6 px-3 md:px-0'>
        {/* Help Button */}
        <button className='flex items-center gap-1 text-sm font-medium'>
          <Icon icon={questionIcon} className='text-xl' />
          <span>Qzcy Help</span>
          <Icon icon={downIcon} className='w-3 text-xs' />
        </button>

        <span className='h-5 w-0.5 bg-[#05060F1A]' />

        {/* Notifications Button */}
        <button className='relative p-1'>
          <Icon icon={bellIcon} className='text-xl' />
          <span className='bg-red-500 text-white text-[10px] font-medium rounded-full absolute -top-1.5 -right-1 aspect-square w-[18px] h-[18px] flex items-center justify-center'>
            21
          </span>
        </button>

        <span className='h-5 w-px bg-[#05060F1A]' />

        {/* User Icon */}
        <div className='flex items-center gap-1 cursor-pointer'>
          <Icon
            icon={userIcon}
            className='text-lg p-1 border-2 border-primary rounded-full'
          />
          <Icon icon={downIcon} className='w-3 text-xs' />
        </div>
      </div>
    </header>
  );
};

export default Navbar;
