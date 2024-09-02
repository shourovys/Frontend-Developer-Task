import { cn } from '@/lib/utils';

interface IProps {
  value: string;
  checked?: boolean;
  label?: string;
  onChange: (checked: boolean) => void;
  disabled?: boolean;
  labelClassName?: string;
}

function Checkbox({
  value,
  checked,
  label,
  onChange,
  disabled = false,
  labelClassName,
}: IProps) {
  return (
    <div className='flex items-center justify-start gap-x-2'>
      <input
        id={value}
        name={value}
        value={value}
        checked={checked}
        onChange={(e) => onChange(e.target.checked)}
        type='checkbox'
        className={cn(
          'form-control block h-4 p-1 aspect-square text-sm font-normal accent-primary bg-[#F9FAFB] border border-[#AFBACA] rounded transition ease-in-out m-0 focus:outline-none disabled:bg-[#F0F1F3] disabled:text-gray-600',
          !disabled && 'cursor-pointer'
        )}
        disabled={disabled}
      />
      {label && (
        <label
          htmlFor={value}
          className={cn(
            'inline-block w-full text-sm text-[#05060F99] form-label',
            labelClassName
          )}
        >
          {label}
        </label>
      )}
    </div>
  );
}

export default Checkbox;
