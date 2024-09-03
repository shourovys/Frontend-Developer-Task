import { cn } from '@/lib/utils';
import { TABLE_ROW_HEIGHT, TABLE_ROW_PER_PAGE } from '@/utils/config';
import createArray from '@/utils/createArray';

interface IProps {
  isLoading: boolean;
  tableRowPerPage?: number;
  tableRowHeight?: number;
  sideBorder?: boolean;
}

function TableBodyLoading({
  isLoading,
  tableRowPerPage = TABLE_ROW_PER_PAGE,
  tableRowHeight = TABLE_ROW_HEIGHT,
}: IProps) {
  if (!isLoading) {
    return null;
  }
  return (
    <div className='overflow-hidden'>
      {createArray(tableRowPerPage).map((item) => (
        <div
          className={cn(
            'w-full border-t border-white animate-pulse bg-primaryBorder'
          )}
          style={{ height: tableRowHeight }}
          key={item}
        />
      ))}
    </div>
  );
}

export default TableBodyLoading;
