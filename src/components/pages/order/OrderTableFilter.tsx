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
import Icon, { closeIcon, filterIcon } from '@/utils/icons';

const OrderTableFilter = () => {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger className='flex items-center text-[#05060F99] border border-primaryBorder py-1.5 px-3 rounded-md transition-colors hover:bg-slate-50 focus:outline-none'>
        <button>
          <Icon
            icon={filterIcon}
            className='w-3.5 h-3.5 mr-1.5'
            aria-hidden='true'
          />
          <span className='text-sm font-medium'>Filters</span>
        </button>
      </DropdownMenuTrigger>

      <DropdownMenuContent className='space-y-3.5' align='end'>
        <div className='space-x-2'>
          <span className='font-medium text-[#333843]'>
            Filters your orders
          </span>
          <span className='text-sm text-[#05060F99] underline cursor-pointer'>
            Reset
          </span>
          <Icon
            icon={closeIcon}
            className='text-[#858D9D] absolute right-2.5 top-2.5 text-lg cursor-pointer p-1.5 hover:text-slate-900'
          />
        </div>
        <DropdownMenuGroup className='space-y-3.5 max-h-[18rem] 2xl:max-h-[28rem] overflow-y-auto'>
          <Accordion type='single' collapsible>
            <AccordionItem value='Date Created'>
              <AccordionTrigger>Date Created</AccordionTrigger>
              <AccordionContent>
                <RadioButtons
                  name='radio'
                  // inputlabel='Input Label'
                  checked={'all'}
                  radios={[
                    {
                      label: 'All',
                      value: 'all',
                    },
                    {
                      label: 'Last Week',
                      value: 'lastWeek',
                    },
                    {
                      label: 'Last Month',
                      value: 'lastMonth',
                    },
                    {
                      label: 'Last 3 Month',
                      value: 'last3Month',
                    },
                    {
                      label: 'Last Year',
                      value: 'lastYear',
                    },
                    {
                      label: 'Custom Date',
                      value: 'customDate',
                    },
                  ]}
                  onChange={() => {}}
                />
              </AccordionContent>
            </AccordionItem>
          </Accordion>
          <Accordion type='single' collapsible>
            <AccordionItem value='Status'>
              <AccordionTrigger>Status</AccordionTrigger>
              <AccordionContent className='space-y-3'>
                <Checkbox
                  label='Processing'
                  value='processing'
                  onChange={() => {}}
                />
                <Checkbox label='Shipped' value='Shipped' onChange={() => {}} />
                <Checkbox
                  label='Delivered'
                  value='Delivered'
                  onChange={() => {}}
                />
                <Checkbox
                  label='Cancelled'
                  value='Cancelled'
                  onChange={() => {}}
                />
              </AccordionContent>
            </AccordionItem>
          </Accordion>
          <Accordion type='single' collapsible>
            <AccordionItem value='DateCreated'>
              <AccordionTrigger>Payment Status</AccordionTrigger>
              <AccordionContent className='space-y-3'>
                <Checkbox label='Paid' value='paid' onChange={() => {}} />
                <Checkbox label='Unpaid' value='unpaid' onChange={() => {}} />
                <Checkbox
                  label='Refunded'
                  value='refunded'
                  onChange={() => {}}
                />
                <Checkbox
                  label='In Progress'
                  value='inProgress'
                  onChange={() => {}}
                />
                <Checkbox
                  label='Canceled'
                  value='canceled'
                  onChange={() => {}}
                />
              </AccordionContent>
            </AccordionItem>
          </Accordion>
        </DropdownMenuGroup>
        <DropdownMenuGroup className='flex justify-end gap-4 py-1'>
          <Button color='outline'>Cancel</Button>
          <Button>Apply Filter</Button>
        </DropdownMenuGroup>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default OrderTableFilter;
