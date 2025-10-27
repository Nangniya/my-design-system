import { forwardRef, useId } from 'react';
import { useControllableState } from '../../primitives/use-controllable-state';
import { RadioGroupProvider } from './RadioGroupContext';
import Radio from './Radio';

type RadioGroupProps = {
  label?: string;
  children: React.ReactNode;
  value?: string;
  defaultValue?: string;
  onValueChange?: (value: string) => void;
  disabled?: boolean;
} & Omit<React.ComponentPropsWithRef<'fieldset'>, 'onChange'>;

const RadioGroupRoot = forwardRef<HTMLFieldSetElement, RadioGroupProps>(
  ({ label, children, value: propValue, defaultValue, onValueChange, disabled, ...props }, ref) => {
    const [selectedValue, setSelectedValue] = useControllableState({
      prop: propValue,
      defaultProp: defaultValue ?? null,
      onChange: onValueChange as (value: string | null) => void,
    });

    const name = useId();

    return (
      <fieldset ref={ref} {...props} className="flex flex-col gap-2">
        {label && <legend className="mb-2 text-base font-medium">{label}</legend>}
        <RadioGroupProvider
          value={{
            name,
            selectedValue,
            onValueChange: (value: string) => setSelectedValue(value),
            disabled,
          }}
        >
          <div className="flex flex-wrap items-center gap-x-4 gap-y-2">{children}</div>
        </RadioGroupProvider>
      </fieldset>
    );
  }
);

const RadioGroup = Object.assign(RadioGroupRoot, { Item: Radio });

RadioGroup.displayName = 'RadioGroup';

export default RadioGroup;
