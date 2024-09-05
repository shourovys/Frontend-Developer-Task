import { cn } from '@/lib/utils';
import Datepicker from 'react-tailwindcss-datepicker';
import { DateValueType } from 'react-tailwindcss-datepicker/dist/types';

interface IProps {
  name: string;
  value: { startDate: string; endDate: string };
  placeholder?: string;
  onChange?: (name: string, value: DateValueType) => void;
  disabled?: boolean;
  format?: string;
  required?: boolean;
}

function DateInput({
  name,
  value,
  placeholder,
  onChange,
  disabled = false,
  format,
}: IProps) {
  // Ensure value is correctly formatted as DateValueType
  const formattedValue: DateValueType = {
    startDate: value.startDate ? new Date(value.startDate) : null,
    endDate: value.endDate ? new Date(value.endDate) : null,
  };

  return (
    <Datepicker
      inputId='datepicker'
      primaryColor={'blue'}
      asSingle={false}
      useRange={false}
      value={formattedValue}
      placeholder={placeholder}
      onChange={(newValue) =>
        onChange && newValue ? onChange(name, newValue) : null
      }
      inputClassName={cn(
        'form-control outline-none text-[#667085] -mt-.5 placeholder:text-sm md:placeholder:text-base'
      )}
      toggleClassName='hidden'
      disabled={disabled}
      displayFormat={format ? format : 'DD-MM-YYYY'}
    />
  );
}

export default DateInput;
