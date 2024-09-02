import { cn } from '@/lib/utils';
import Icon, { searchIcon } from '@/utils/icons';
import React, { useState } from 'react';
import OrderTableFilter from './OrderTableFilter';

interface ITabButtonProps {
  title: string;
  count: number;
  isActive: boolean;
  onClick: () => void;
}

const TabButton: React.FC<ITabButtonProps> = ({
  title,
  count,
  isActive,
  onClick,
}) => {
  return (
    <button
      onClick={onClick}
      className={cn(
        'flex items-center gap-1.5 p-1.5 border rounded-md transition-colors focus:outline-none focus:ring-1 focus:ring-primary',
        isActive
          ? 'border-primaryLight bg-primaryLight'
          : 'border-primaryBorder hover:bg-slate-50'
      )}
    >
      <p
        className={cn(
          'text-sm font-medium text-nowrap',
          isActive ? 'text-primary' : 'text-[#05060F99]'
        )}
      >
        {title}
      </p>
      <span
        className={cn(
          'font-bold text-xs rounded p-1',
          isActive ? 'bg-primary text-white' : 'bg-primaryLight text-primary'
        )}
      >
        {count}
      </span>
    </button>
  );
};

TabButton.displayName = 'TabButton';

const OrderTableToolbar: React.FC = () => {
  const [activeTab, setActiveTab] = useState<string>('All orders');
  const [searchQuery, setSearchQuery] = useState<string>('');

  // Tabs data
  const tabs = [
    { title: 'All orders', count: 320 },
    { title: 'Processing', count: 320 },
    { title: 'Confirmed', count: 34 },
    { title: 'Shipping', count: 320 },
    { title: 'Delivered', count: 76 },
    { title: 'Return', count: 7 },
    { title: 'Cancel', count: 44 },
  ];

  // Handle tab click
  const handleTabClick = (title: string) => {
    setActiveTab(title);
  };

  // Handle search input change
  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(event.target.value);
  };

  // Render TabButtons dynamically
  const renderTabButtons = () =>
    tabs.map((tab) => (
      <TabButton
        key={tab.title}
        title={tab.title}
        count={tab.count}
        isActive={activeTab === tab.title}
        onClick={() => handleTabClick(tab.title)}
      />
    ));

  return (
    <div className='flex items-center justify-between w-full px-5 pt-4 pb-5 gap-6'>
      {/* Tab buttons */}
      <div className='flex items-center gap-3'>{renderTabButtons()}</div>

      <div className='flex items-center gap-3'>
        {/* Search input */}
        <div className='flex items-center border border-primaryBorder py-2 px-3 rounded-md flex-1 max-w-64 xl:min-w-72 2xl:min-w-80'>
          <Icon
            icon={searchIcon}
            className='w-3.5 h-3.5 text-[#05060F99]'
            aria-hidden='true'
          />
          <input
            type='text'
            value={searchQuery}
            onChange={handleSearchChange}
            className='w-full ml-2 outline-none text-sm placeholder:text-[#05060F99]'
            placeholder='Searching order...'
            aria-label='Search orders'
          />
        </div>

        {/* Filters button */}
        <OrderTableFilter />
      </div>
    </div>
  );
};

export default OrderTableToolbar;
