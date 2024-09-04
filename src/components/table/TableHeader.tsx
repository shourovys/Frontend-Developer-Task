import Checkbox from '@/components/atomic/Checkbox';
import { cn } from '@/lib/utils';
import { ITableHead } from '@/types/components/table';
import Icon, { downArrowIcon, plusIcon, upArrowIcon } from '@/utils/icons';
import {
  Tooltip,
  TooltipArrow,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '../common/Tooltip';

interface IProps {
  order: 'asc' | 'desc';
  orderBy: string;
  numSelected?: number;
  rowCount?: number;
  handleSort: (orderBy: string, order: 'asc' | 'desc') => void;
  handleOrder: (order: 'asc' | 'desc') => void;
  selectAllRow?: (selected: boolean) => void;
  headerData: ITableHead[];
}

function TableHeader({
  order,
  orderBy,
  numSelected,
  rowCount,
  handleSort,
  handleOrder,
  selectAllRow,
  headerData,
}: IProps) {
  return (
    <thead className='bg-[#F9FAFB] border-y border-primaryBorder'>
      <tr className='text-left'>
        {selectAllRow && (
          <th
            scope='col'
            className='sticky left-0 w-1 pr-1.5 pl-5 bg-[#F9FAFB]'
          >
            <Checkbox
              value='select-all-row'
              checked={rowCount !== 0 && rowCount === numSelected}
              onChange={(checked) => {
                selectAllRow(checked);
              }}
              disabled={rowCount === 0}
            />
          </th>
        )}
        {headerData.map((item) => (
          <th
            key={item.id}
            scope='col'
            className={cn(
              'px-1 py-3 text-bwTableHeaderBgText whitespace-nowrap font-medium text-xs text-[#05060F99] min-w-20 2xl:min-w-28',
              item.filter ? 'cursor-pointer' : 'cursor-default'
            )}
            onClick={() => {
              if (item.filter) {
                handleOrder(order === 'asc' ? 'desc' : 'asc');
                handleSort(item.id, order === 'asc' ? 'desc' : 'asc');
              }
            }}
          >
            {item.label}
            {item.filter && (
              <>
                <Icon
                  icon={upArrowIcon}
                  className={cn(
                    'w-2 ml-1',
                    orderBy === item.id && order === 'asc' && 'text-primary'
                  )}
                />
                <Icon
                  icon={downArrowIcon}
                  className={cn(
                    'w-2 ',
                    orderBy === item.id && order === 'desc' && 'text-primary'
                  )}
                />
              </>
            )}
          </th>
        ))}

        <th scope='col' className='pr-5 w-[70px]'>
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger>
                <Icon icon={plusIcon} className='text-[#05060F99] ' />
              </TooltipTrigger>
              <TooltipContent>
                <p>Add field</p>
                <TooltipArrow />
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
        </th>
      </tr>
    </thead>
  );
}

export default TableHeader;
