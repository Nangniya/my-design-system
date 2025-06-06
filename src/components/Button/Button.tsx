import React from 'react';

type Variant = 'danger' | 'warning' | 'success' | 'info';
type Size = 'lg' | 'md' | 'sm';

type Props<T extends React.ElementType> = {
  as?: T;
  variant?: Variant;
  size?: Size;
} & React.ComponentPropsWithRef<T>;

type Component = <T extends React.ElementType>(props: Props<T>) => React.ReactElement | null;

const VARIANTS: Record<Variant, string> = {
  danger: 'bg-danger-5 text-danger-60 hover:bg-danger-10 border-danger-20',
  warning: 'bg-warning-5 text-warning-60 hover:bg-warning-10 border-warning-20',
  success: 'bg-success-5 text-success-60 hover:bg-success-10 border-success-20',
  info: 'bg-info-5 text-info-60 hover:bg-info-10 border-info-20',
};

const SIZES: Record<Size, string> = {
  lg: 'px-6 py-3 text-lg h-12',
  md: 'px-4 py-2 text-base h-10',
  sm: 'px-3 py-1 text-sm h-8',
};

const Button: Component = ({ as, variant = 'info', size = 'md', ...props }) => {
  const Element = as || 'button';
  const v: Variant = variant;
  const s: Size = size;
  return (
    <Element
      className={`${VARIANTS[v]} ${SIZES[s]} inline-flex items-center justify-center rounded-md border outline-none cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed disabled:pointer-events-none`}
      {...props}
    />
  );
};

export default Button;
