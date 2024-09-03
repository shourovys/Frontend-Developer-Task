import DisplayComponent from './DisplayComponent';
import PageNumberButton from './PageNumberButton';
import PaginationControls from './PaginationControls';
import PaginationPrevNextControls from './PaginationPrevNextControlsProps ';
import RowsPerPageSelector from './RowsPerPageSelector';

export type TDirection = 1 | -1;

interface IPaginationProps {
  totalRows: number;
  currentPage: number;
  rowsPerPage: number;
  onPageChange: (_page: number) => void;
  onRowsPerPageChange?: (_rowsPerPage: number) => void;
  rowsPerPageDisabled?: boolean;
}

export default function Pagination({
  totalRows,
  currentPage,
  rowsPerPage,
  onPageChange,
  onRowsPerPageChange,
  rowsPerPageDisabled,
}: IPaginationProps) {
  const totalPages = Math.ceil(totalRows / rowsPerPage);
  const pageNumbers = Array.from(Array(totalPages).keys(), (x) => x + 1);

  let startIndex: number, endIndex: number;
  if (totalPages <= 5) {
    startIndex = 0;
    endIndex = totalPages - 1;
  } else if (currentPage <= 3) {
    startIndex = 0;
    endIndex = 4;
  } else if (currentPage >= totalPages - 2) {
    startIndex = totalPages - 5;
    endIndex = totalPages - 1;
  } else {
    startIndex = currentPage - 3;
    endIndex = currentPage + 1;
  }

  const displayedPages = pageNumbers.slice(startIndex, endIndex + 1);

  // handling pagination
  const isPrevDisabled = (): boolean => currentPage <= 1;
  const isNextDisabled = (): boolean => currentPage >= totalPages;

  const handlePrevNextPaginate = (direction: TDirection) => {
    if (direction === -1 && isPrevDisabled()) {
      return;
    }
    if (direction === 1 && isNextDisabled()) {
      return;
    }

    onPageChange(currentPage + direction);
  };

  const handleNumberPaginate = (clickedPage: number) => {
    onPageChange(clickedPage);
  };

  const from = totalRows ? (currentPage - 1) * rowsPerPage + 1 : 0;
  const to =
    (currentPage - 1) * rowsPerPage + rowsPerPage < totalRows
      ? (currentPage - 1) * rowsPerPage + rowsPerPage
      : totalRows;

  return (
    <div className='flex items-center justify-between p-5 mb-5 pb-1 sm:px-6 text-sm font-medium'>
      <div className='flex justify-between flex-1 sm:hidden'>
        <PaginationPrevNextControls
          onClick={handlePrevNextPaginate}
          direction={-1}
          disabled={isPrevDisabled()}
          currentPage={currentPage}
          totalPages={totalPages}
        />
        <PaginationPrevNextControls
          onClick={handlePrevNextPaginate}
          direction={1}
          disabled={isNextDisabled()}
          currentPage={currentPage}
          totalPages={totalPages}
        />
      </div>
      <div className='hidden sm:flex sm:flex-1 sm:items-center sm:justify-between'>
        <DisplayComponent from={from} to={to} totalRows={totalRows} />

        <nav
          className='relative z-0 inline-flex gap-x-1 rounded-md'
          aria-label='Pagination'
        >
          <PaginationControls
            onClick={() => handlePrevNextPaginate(-1)}
            direction={-1}
            disabled={isPrevDisabled()}
          />
          {totalPages > 5 && currentPage > 3 && (
            <>
              <PageNumberButton
                pageNumber={1}
                currentPage={currentPage}
                onClick={handleNumberPaginate}
              />
              {currentPage > 4 && (
                <span className='relative inline-flex items-center p-1 min-w-[30px] h-[30px] justify-center cursor-default'>
                  ...
                </span>
              )}
            </>
          )}
          {displayedPages.map((page) => (
            <PageNumberButton
              key={page}
              pageNumber={page}
              currentPage={currentPage}
              onClick={handleNumberPaginate}
            />
          ))}
          {totalPages > 5 && currentPage < totalPages - 2 && (
            <>
              {currentPage < totalPages - 3 && (
                <span className='relative inline-flex items-center p-1 min-w-[30px] h-[30px] justify-center cursor-default'>
                  ...
                </span>
              )}
              <PageNumberButton
                pageNumber={totalPages}
                currentPage={currentPage}
                onClick={handleNumberPaginate}
              />
            </>
          )}
          <PaginationControls
            onClick={() => handlePrevNextPaginate(1)}
            direction={1}
            disabled={isNextDisabled()}
          />
        </nav>
        {onRowsPerPageChange && (
          <RowsPerPageSelector
            totalRows={totalRows}
            rowsPerPage={rowsPerPage}
            onRowsPerPageChange={onRowsPerPageChange}
            disabled={rowsPerPageDisabled}
          />
        )}
      </div>
    </div>
  );
}
