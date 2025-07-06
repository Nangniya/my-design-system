import { forwardRef } from 'react';
import downChevron from '../../assets/down-chevron.svg';
import { useSelectContext } from './selectContext';

interface SelectTriggerProps {
  children?: React.ReactNode;
  className?: string;
  placeholder?: string;
  label?: string;
}

const SelectTrigger = forwardRef<HTMLButtonElement, SelectTriggerProps>(
  ({ children, className = '', placeholder, label }, ref) => {
    const { open, setOpen, selected } = useSelectContext();

    const handleOpen = () => setOpen(prev => !prev);

    return (
      <>
        {label && (
          <label htmlFor="select" className="font-bold block mb-2">
            {label}
          </label>
        )}
        <button
          ref={ref}
          type="button"
          className={`
          text-left border rounded-md px-4 py-2 bg-white w-full
          border-gray-300 focus:outline-none focus:ring-2 focus:ring-primary-50
          flex items-center justify-between
          ${open && 'ring-2 ring-primary-50 border-primary-50'}
          ${className}
        `}
          onClick={handleOpen}
        >
          {children ? (
            children
          ) : selected ? (
            <span className="text-gray-100">{selected.label}</span>
          ) : (
            <span className="text-gray-500">{placeholder}</span>
          )}
          <img
            src={downChevron}
            alt="down-chevron"
            className={`w-5 h-5 transition-transform duration-300 ${open && 'rotate-180'}`}
          />
        </button>
      </>
    );
  }
);

SelectTrigger.displayName = 'SelectTrigger';

export default SelectTrigger;
