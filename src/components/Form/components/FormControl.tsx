import React, { useRef, useImperativeHandle, forwardRef } from 'react';
import { useFormContext } from '../formContext';

interface FormControlProps {
  name: string;
  children?: React.ReactNode;
  label?: string;
  required?: boolean;
  placeholder?: string;
}

export interface FormControlRef {
  validate: () => boolean;
  getValue: () => any;
  setValue: (value: any) => void;
}

const FormControl = forwardRef<FormControlRef, FormControlProps>(
  ({ name, children, label, required = false, placeholder }, ref) => {
    const { setFieldValue, getFieldValue } = useFormContext();
    const inputRef = useRef<HTMLInputElement | HTMLTextAreaElement>(null);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
      setFieldValue(name, e.target.value);
    };

    const validate = () => {
      if (!inputRef.current) return true;

      const element = inputRef.current;
      return element.checkValidity();
    };

    const getValue = () => {
      return inputRef.current?.value || '';
    };

    const setValue = (value: any) => {
      if (inputRef.current) {
        inputRef.current.value = value;
        setFieldValue(name, value);
      }
    };

    // ref를 통해 외부에서 접근할 수 있는 메서드들 노출
    useImperativeHandle(ref, () => ({
      validate,
      getValue,
      setValue,
    }));

    const value = getFieldValue(name);

    return (
      <>
        {React.Children.map(children, child => {
          if (React.isValidElement(child)) {
            return React.cloneElement(child, {
              ref: inputRef,
              value,
              onChange: handleChange,
              name,
              label: label || '',
              required,
              placeholder,
              ...child.props,
            });
          }
          return child;
        })}
      </>
    );
  }
);

FormControl.displayName = 'FormControl';

export default FormControl;
