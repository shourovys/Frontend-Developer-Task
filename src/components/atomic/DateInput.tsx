// import { cn } from '@/lib/utils';
// import Datepicker from 'react-tailwindcss-datepicker';
// import { DateValueType } from 'react-tailwindcss-datepicker/dist/types';
// import { dateFormat } from '../../utils/formetTime';

// interface IProps {
//   name: string;
//   label?: string;
//   value: {
//     startDate: null | string;
//     endDate: null | string;
//   };
//   placeholder?: string;
//   singleDate?: boolean;
//   onChange?: (name: string, value: DateValueType) => void;
//   disabled?: boolean;
//   format?: string;
//   required?: boolean;
// }

// function DateInput({
//   name,
//   label = '',
//   value,
//   placeholder,
//   singleDate = true,
//   onChange,
//   disabled = false,
//   format,
// }: IProps) {
//   return (
//     <Datepicker
//       primaryColor='green'
//       asSingle={singleDate}
//       useRange={!singleDate}
//       value={value}
//       placeholder={placeholder}
//       onChange={(newValue) => (onChange ? onChange(name, newValue) : null)}
//       inputClassName={cn(
//         'form-control w-full h-[30px] px-3 text-sm font-normal text-black bg-white bg-clip-padding border border-solid border-gray-300 focus:border-gray-300 dark:border-gray-300 rounded-md transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-primary focus:outline-none focus:ring-0',
//         !disabled && label && 'shadow-all-side',
//         disabled &&
//           'important_disable_color important_disable_bg custom_opacity_100 custom_cursor_default'
//       )}
//       containerClassName={cn(
//         disabled && 'important_disable_color important_disable_bg rounded-md '
//       )}
//       disabled={disabled}
//       displayFormat={format ? format : dateFormat}
//     />
//   );
// }

// export default DateInput;
