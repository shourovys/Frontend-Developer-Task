import TabButton from '@/components/common/TabButton';
import useDebounce from '@/hooks/useDebounce';
import { THandleFilterInputChange } from '@/types/components/common';
import { IOrderFilter, IOrderResponse } from '@/types/pages/order';
import Icon, { searchIcon } from '@/utils/icons';
import React, { Dispatch, SetStateAction, useEffect, useState } from 'react';
import OrderTableFilter from './OrderTableFilter';

interface IProps {
  data?: IOrderResponse;
  filterState: IOrderFilter;
  handleFilterStateReset: () => void;
  handleFilterInputChange: THandleFilterInputChange;
  setFilterState: Dispatch<SetStateAction<IOrderFilter>>;
}

const OrderTableToolbar: React.FC<IProps> = ({
  data,
  filterState,
  handleFilterStateReset,
  handleFilterInputChange,
  setFilterState,
}) => {
  const [searchQuery, setSearchQuery] = useState<string>('');
  const debouncedSearchQuery = useDebounce<string>(searchQuery, 500);

  useEffect(() => {
    handleFilterInputChange('search', debouncedSearchQuery);
  }, [debouncedSearchQuery]);

  // Tabs data
  const tabs = [
    { id: 'All', title: 'All orders', count: data?.total },
    { id: 'Processing', title: 'Processing', count: data?.Processing },
    { id: 'Confirmed', title: 'Confirmed', count: data?.Confirmed },
    { id: 'Shipped', title: 'Shipping', count: data?.Shipped },
    { id: 'Delivered', title: 'Delivered', count: data?.Delivered },
    { id: 'Return', title: 'Return', count: data?.Return },
    { id: 'Cancelled', title: 'Cancel', count: data?.Cancelled },
  ];

  useEffect(() => {
    setFilterState((state) => ({
      ...state,
      status: filterState.status.length ? filterState.status : ['All'],
    }));

    if (filterState.customDate) {
      setFilterState((state) => ({
        ...state,
        date: '',
      }));
    }
  }, [filterState.date, filterState.status, filterState.customDate]);

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
        isActive={filterState.status.includes(tab.id)}
        onClick={() => handleFilterInputChange('status', [tab.id])}
      />
    ));

  return (
    <div className='flex flex-col md:flex-row items-start lg:items-center justify-between w-full px-3 md:px-5 pt-3 md:pt-4 pb-3 md:pb-5 gap-3 md:gap-6'>
      {/* Tab buttons */}
      <div className='flex items-center flex-wrap gap-1.5 md:gap-3'>
        {renderTabButtons()}
      </div>

      <div className='flex items-center gap-3 min-w-96'>
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
            placeholder='Searching order by id...'
            aria-label='Search orders'
          />
        </div>

        {/* Filters button */}
        <OrderTableFilter
          filterState={filterState}
          handleFilterStateReset={handleFilterStateReset}
          setFilterState={setFilterState}
        />
      </div>
    </div>
  );
};

export default OrderTableToolbar;
