import React from 'react';

type Variant = 'danger' | 'warning' | 'success' | 'info';
type Size = 'lg' | 'md' | 'sm';

type Props<T extends React.ElementType = 'button'> = {
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

const baseStyle =
  'inline-flex items-center justify-center rounded-md border outline-none cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed disabled:pointer-events-none';

/**
 * Button 컴포넌트는 다양한 상태(variant)와 크기(size)를 지원하는 디자인 시스템의 기본 버튼입니다.
 *
 * @param variant - danger, warning, success, info 중 하나로 버튼의 색상 테마를 지정합니다.
 * @param size - lg, md, sm 중 하나로 버튼의 크기를 지정합니다.
 * @param children - 버튼 내부에 표시할 내용입니다.
 * @param disabled - 버튼을 비활성화 합니다.
 *
 * @example
 * <Button variant="info" size="lg">Danger Large</Button>
 */

const Button: Component = ({ as, variant = 'info', size = 'md', ...props }) => {
  const Element = as || 'button';
  const v: Variant = variant;
  const s: Size = size;
  return <Element className={`${baseStyle} ${VARIANTS[v]} ${SIZES[s]}`} {...props} />;
};

export default Button;
