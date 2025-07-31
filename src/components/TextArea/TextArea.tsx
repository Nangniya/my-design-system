import React, { forwardRef, useCallback, type ChangeEventHandler } from 'react';
import { useControllableState } from '../../primitives/use-controllable-state';

type Props = {
  id?: string;
  required?: boolean;
  label: string;
  helperText?: string;
  error?: string;
  value?: string;
  onChange?: (value: string) => void;
  defaultValue?: string;
} & Omit<React.ComponentPropsWithRef<'textarea'>, 'value' | 'onChange' | 'defaultValue'>;

const TextArea = forwardRef<HTMLTextAreaElement, Props>(
  (
    {
      id,
      required,
      label,
      helperText,
      error,
      value: propValue,
      onChange: propOnChange,
      defaultValue,
      ...props
    },
    ref
  ) => {
    const inputId = id || `textfield-${label.replace(/\s+/g, '-').toLowerCase()}`;
    const showLabel = label && label.trim() !== '';
    const showError = !!error;
    const [value, setValue] = useControllableState<string>({
      prop: propValue,
      defaultProp: defaultValue ?? '',
      onChange: propOnChange,
    });

    const handleTextAreaChange: ChangeEventHandler<HTMLTextAreaElement> = useCallback(
      e => {
        setValue(e.target.value);
      },
      [setValue]
    );

    return (
      <div className="w-full flex flex-col gap-2">
        {showLabel && (
          <label htmlFor={inputId} className="text-base font-medium">
            {label}
            {required && <span className="text-danger-50">*</span>}
          </label>
        )}
        {helperText && <p className="text-xs text-gray-50 font-medium">{helperText}</p>}
        <textarea
          id={inputId}
          ref={ref}
          required={required}
          className={`
          w-full rounded-md border px-4 py-3
          ${
            showError
              ? 'border-danger-50 focus:border-danger-50 focus:ring-danger-20'
              : 'border-gray-70 focus:border-info-40 focus:ring-info-20'
          }
          outline-none transition-colors duration-200 placeholder-gray-30
        `}
          value={value}
          onChange={handleTextAreaChange}
          {...props}
        />
        <div className="flex justify-between">
          {showError && <p className="text-danger-50 text-sm font-medium">{error}</p>}
          <p className="text-sm font-medium text-gray-50">
            <span className="text-primary-50">{value.length}</span>/100
          </p>
        </div>
      </div>
    );
  }
);

export default TextArea;
