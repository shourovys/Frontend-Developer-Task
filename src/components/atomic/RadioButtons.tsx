import { cn } from '@/lib/utils';

interface IProps {
  name: string;
  inputLabel?: string;
  checked?: string | number;
  radios: { label: string; value: string | number }[];
  onChange?: (name: string, value: string | number) => void;
  disabled?: boolean;
}

function RadioButtons({
  name,
  inputLabel,
  checked,
  radios,
  onChange,
  disabled = false,
}: IProps) {
  return (
    <div className='w-full space-y-0.5'>
      {inputLabel && (
        <label
          className='inline-block w-full text-sm text-gray-700 form-label'
          htmlFor={name}
        >
          {inputLabel}
        </label>
      )}

      <div className='text-sm space-y-3'>
        {radios.map(({ label, value }) => (
          <label
            key={label}
            htmlFor={label}
            className={cn(
              'flex items-center',
              disabled ? 'cursor-default' : 'cursor-pointer'
            )}
          >
            <input
              id={label}
              value={value}
              checked={value === checked}
              onChange={(e) =>
                onChange ? onChange(name, e.target.value) : null
              }
              type='radio'
              className={cn(
                'float-left w-4 h-4 mr-1.5 transition duration-200 bg-center bg-no-repeat bg-contain border border-[#AFBACA] rounded-full appearance-none cursor-pointer checked:border-4 form-check-input checked:border-primary focus:outline-none',
                disabled
                  ? 'cursor-default bg-[#F0F1F3]'
                  : 'bg-[#F9FAFB] checked:bg-white'
              )}
              disabled={disabled}
            />
            <span
              className={cn(
                'inline-block form-check-label text-gray-600',
                !disabled && ' text-[#05060F99]'
              )}
            >
              {label}
            </span>
          </label>
        ))}
      </div>
    </div>
  );
}

export default RadioButtons;

// use example
// <RadioButtons
//     name="radio"
//     inputlabel={t`Input Label`}
//     checked={formData.radio}
//     radios={[
//         {
//             label: "Radio Button 1",
//             value: "radio button 1",
//         },
//         {
//             label: "Radio Button 2",
//             value: "radio button 2",
//         },
//     ]}
//     onChange={handleInputChange}
// />;
