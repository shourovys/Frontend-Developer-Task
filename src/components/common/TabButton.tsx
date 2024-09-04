import { cn } from '@/lib/utils';

interface ITabButtonProps {
  title: string;
  count?: number;
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
        {count || 0}
      </span>
    </button>
  );
};

export default TabButton;
