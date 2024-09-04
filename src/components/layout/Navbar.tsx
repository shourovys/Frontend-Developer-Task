import {
  BellIcon,
  ChevronDownIcon,
  PersonIcon,
  QuestionMarkCircledIcon,
} from '@radix-ui/react-icons';

const Navbar = () => {
  return (
    <header className='h-14 md:h-[67px] bg-white w-full'>
      <div className='container mx-auto h-full flex items-center justify-end text-[#05060F99] gap-4 md:gap-6 px-3 md:px-0'>
        {/* Help Button */}
        <button className='flex items-center gap-1 text-sm font-medium'>
          <QuestionMarkCircledIcon className='h-7 w-7' />
          <span>Qzcy Help</span>
          <ChevronDownIcon className='w-4' />
        </button>

        <span className='h-5 w-0.5 bg-[#05060F1A]' />

        {/* Notifications Button */}
        <button className='relative p-1'>
          <BellIcon className='h-6 w-6' />
          <span className='bg-red-500 text-white text-[10px] font-medium rounded-full absolute -top-1 -right-0.5 aspect-square w-[18px] h-[18px] flex items-center justify-center'>
            21
          </span>
        </button>

        <span className='h-5 w-px bg-[#05060F1A]' />

        {/* User Icon */}
        <div className='flex items-center gap-1 cursor-pointer'>
          <PersonIcon className='w-7 h-7 border-2 pt-0.5 border-primary rounded-full' />
          <ChevronDownIcon className='w-4' />
        </div>
      </div>
    </header>
  );
};

export default Navbar;
