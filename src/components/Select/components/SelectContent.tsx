import { forwardRef } from 'react';
import { useSelectContext } from '../selectContext';

interface SelectContentProps {
  children?: React.ReactNode;
  className?: string;
}

const SelectContent = forwardRef<HTMLUListElement, SelectContentProps>(
  ({ children, className = '' }, ref) => {
    const { open } = useSelectContext();

    if (!open) return null;

    return (
      <ul
        ref={ref}
        className={`absolute top-full left-0 w-full bg-white border border-gray-300 rounded-md mt-1 p-0.5 z-10 ${className}`}
      >
        {children}
      </ul>
    );
  }
);

SelectContent.displayName = 'SelectContent';

export default SelectContent;
