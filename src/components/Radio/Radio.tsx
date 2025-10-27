import React, { forwardRef } from 'react';
import { useRadioGroupContext } from './RadioGroupContext';

type RadioProps = {
  value: string;
  children?: React.ReactNode;
  disabled?: boolean;
} & Omit<React.ComponentPropsWithRef<'input'>, 'value' | 'checked' | 'onChange' | 'type'>;

const Radio = forwardRef<HTMLInputElement, RadioProps>(
  ({ value, children, disabled: itemDisabled, ...props }, ref) => {
    const { name, selectedValue, onValueChange, disabled: groupDisabled } = useRadioGroupContext();
    const disabled = groupDisabled || itemDisabled;
    const checked = selectedValue === value;

    return (
      <label
        className={`inline-flex items-center gap-2 cursor-pointer select-none ${
          disabled ? 'opacity-50 cursor-not-allowed' : ''
        }`}
      >
        <span className="relative flex items-center justify-center w-5 h-5">
          <input
            {...props}
            ref={ref}
            type="radio"
            name={name}
            value={value}
            checked={checked}
            disabled={disabled}
            onChange={() => onValueChange(value)}
            className="peer appearance-none w-5 h-5 rounded-full border-2 border-gray-30 checked:border-primary-50 checked:bg-primary-0 transition-colors focus:ring-2 focus:ring-primary-40"
          />
          <span className="pointer-events-none absolute w-3 h-3 rounded-full bg-primary-50 opacity-0 peer-checked:opacity-100 transition-opacity"></span>
        </span>
        {children && <span className="text-gray-90">{children}</span>}
      </label>
    );
  }
);
Radio.displayName = 'Radio';

export default Radio;
