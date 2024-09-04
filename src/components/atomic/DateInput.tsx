import { cn } from '@/lib/utils';
import Datepicker from 'react-tailwindcss-datepicker';
import {
  DateType,
  DateValueType,
} from 'react-tailwindcss-datepicker/dist/types';

interface IProps {
  name: string;
  value: string;
  placeholder?: string;
  onChange?: (name: string, value: DateType) => void;
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
    startDate: value ? new Date(value) : null,
    endDate: value ? new Date(value) : null,
  };

  return (
    <Datepicker
      inputId='datepicker'
      primaryColor={'blue'}
      asSingle={true}
      useRange={false}
      value={formattedValue}
      placeholder={placeholder}
      onChange={(newValue) =>
        onChange && newValue ? onChange(name, newValue?.startDate) : null
      }
      inputClassName={cn('form-control outline-none text-[#667085] -mt-.5')}
      toggleClassName='hidden'
      disabled={disabled}
      displayFormat={format ? format : 'DD-MM-YYYY'}
    />
  );
}

export default DateInput;
