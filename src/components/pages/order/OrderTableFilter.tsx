import Button from '@/components/atomic/Button';
import Checkbox from '@/components/atomic/Checkbox';
import RadioButtons from '@/components/atomic/RadioButtons';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/common/Accordion';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuTrigger,
} from '@/components/common/Dropdown';
import { THandleFilterInputChange } from '@/types/components/common';
import { IOrderFilter } from '@/types/pages/order';
import Icon, { closeIcon, filterIcon } from '@/utils/icons';
import { Dispatch, SetStateAction, useEffect, useState } from 'react';

interface IProps {
  filterState: IOrderFilter;
  handleFilterStateReset: () => void;
  setFilterState: Dispatch<SetStateAction<IOrderFilter>>;
}

const OrderTableFilter: React.FC<IProps> = ({
  filterState,
  handleFilterStateReset,
  setFilterState,
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [filter, setFilter] = useState<{
    date: string;
    status: string[];
    paymentStatus: string[];
  }>({
    date: filterState.date ? '' : 'all',
    status: filterState.status,
    paymentStatus: filterState.paymentStatus,
  });

  useEffect(() => {
    setFilter((state) => ({
      ...state,
      date:
        !filterState.customDate && !filterState.date ? 'all' : filterState.date,
      status: filterState.status,
      paymentStatus: filterState.paymentStatus,
    }));
  }, [filterState]);

  const statusFilter = {
    Processing: false,
    Shipped: false,
    Delivered: false,
    Cancelled: false,
  };
  const paymentFilter = {
    Paid: false,
    Unpaid: false,
    Refunded: false,
    Inprogress: false,
    Cancelled: false,
  };

  const handleFilterInputChange: THandleFilterInputChange = (name, value) => {
    // apply will false in every filter state change
    setFilter((state) => ({ ...state, apply: false, [name]: value }));
  };

  const handleDropDownClose = () => setIsOpen(false);

  // Apply filters action
  const applyFilters = () => {
    if (filter.date) {
      setFilterState((state) => ({
        ...state,
        date: filter.date,
        customDate: '',
        status: filter.status.filter((item) => item !== 'All'),
        paymentStatus: filter.paymentStatus,
      }));
    } else {
      setFilterState((state) => ({
        ...state,
        date: filter.date,
        status: filter.status.filter((item) => item !== 'All'),
        paymentStatus: filter.paymentStatus,
      }));
    }

    handleDropDownClose();
  };

  const handleReset = () => {
    handleFilterStateReset();
    handleDropDownClose();
  };

  return (
    <DropdownMenu open={isOpen}>
      <DropdownMenuTrigger
        onClick={() => setIsOpen(true)}
        className='focus:outline-none'
      >
        <span className='flex items-center text-[#05060F99] border border-primaryBorder py-2 px-3 rounded-md transition-colors hover:bg-slate-50 '>
          <Icon
            icon={filterIcon}
            className='w-3.5 h-3.5 mr-1.5'
            aria-hidden='true'
          />
          <span className='text-sm font-medium'>Filters</span>
        </span>
      </DropdownMenuTrigger>

      <DropdownMenuContent className='space-y-3.5' align='end'>
        <div className='space-x-2'>
          <span className='font-medium text-[#333843]'>Filter your orders</span>
          <span
            className='text-sm text-[#05060F99] underline cursor-pointer'
            onClick={handleReset}
          >
            Reset
          </span>
        </div>
        <Icon
          icon={closeIcon}
          className='text-[#858D9D] absolute right-2.5 -top-1 text-lg cursor-pointer p-1.5 hover:text-slate-900'
          onClick={handleDropDownClose}
        />
        <DropdownMenuGroup className='space-y-3.5 max-h-[18rem] 2xl:max-h-[28rem] overflow-y-auto'>
          <Accordion type='single' collapsible>
            <AccordionItem value='Date Created'>
              <AccordionTrigger>Date Created</AccordionTrigger>
              <AccordionContent>
                <RadioButtons
                  name='date'
                  checked={filter.date}
                  radios={[
                    { label: 'All', value: 'all' },
                    { label: 'Last Week', value: 'lastWeek' },
                    { label: 'Last Month', value: 'lastMonth' },
                    { label: 'Last 3 Month', value: 'last3Month' },
                    { label: 'This Year', value: 'thisYear' },
                    { label: 'Last Year', value: 'lastYear' },
                  ]}
                  onChange={handleFilterInputChange}
                />
              </AccordionContent>
            </AccordionItem>
          </Accordion>
          <Accordion type='single' collapsible>
            <AccordionItem value='Status'>
              <AccordionTrigger>Status</AccordionTrigger>
              <AccordionContent className='space-y-3'>
                {Object.keys(statusFilter).map((status) => (
                  <Checkbox
                    key={status}
                    label={status}
                    value={status}
                    checked={filter.status.includes(status)}
                    onChange={(value) =>
                      handleFilterInputChange(
                        'status',
                        filter.status.includes(status) && !value
                          ? filter.status.filter((item) => item !== status)
                          : [...filter.status, status]
                      )
                    }
                  />
                ))}
              </AccordionContent>
            </AccordionItem>
          </Accordion>
          <Accordion type='single' collapsible>
            <AccordionItem value='Payment Status'>
              <AccordionTrigger>Payment Status</AccordionTrigger>
              <AccordionContent className='space-y-3'>
                {Object.keys(paymentFilter).map((payment) => (
                  <Checkbox
                    key={`payment-${payment}`}
                    label={payment}
                    value={payment}
                    checked={filter.paymentStatus.includes(payment)}
                    onChange={(value) =>
                      handleFilterInputChange(
                        'paymentStatus',
                        filter.paymentStatus.includes(payment) && !value
                          ? filter.paymentStatus.filter(
                              (item) => item !== payment
                            )
                          : [...filter.paymentStatus, payment]
                      )
                    }
                  />
                ))}
              </AccordionContent>
            </AccordionItem>
          </Accordion>
        </DropdownMenuGroup>
        <DropdownMenuGroup className='flex justify-end gap-4 py-1'>
          <Button color='outline' onClick={handleDropDownClose}>
            Cancel
          </Button>
          <Button onClick={applyFilters}>Apply Filter</Button>
        </DropdownMenuGroup>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default OrderTableFilter;
