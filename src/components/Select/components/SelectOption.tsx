import { forwardRef } from 'react';
import { useSelectContext } from '../selectContext';
import type { IOption } from '../selectContext';

interface SelectOptionProps {
  children?: React.ReactNode;
  className?: string;
  value: string;
  label?: string;
  onClick?: () => void;
}

const SelectOption = forwardRef<HTMLLIElement, SelectOptionProps>(
  ({ children, className = '', value, label, onClick }, ref) => {
    const { selected, setSelected, setOpen } = useSelectContext();

    const option: IOption = {
      value,
      label: label || (children as string) || value,
    };

    const handleSelect = () => {
      setSelected(option);
      setOpen(false);
      onClick?.();
    };

    const isSelected = selected?.value === value;

    return (
      <li
        ref={ref}
        className={`px-4 py-2 hover:bg-secondary-5 hover:text-primary-70 rounded-md cursor-pointer transition-colors ${
          isSelected && 'bg-secondary-10 text-primary-70 font-bold'
        } ${className}`}
        onClick={handleSelect}
      >
        {children || label || value}
      </li>
    );
  }
);

SelectOption.displayName = 'SelectOption';

export default SelectOption;
