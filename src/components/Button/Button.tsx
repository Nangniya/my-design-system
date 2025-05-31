import styles from './Button.module.css';

type Variant = 'primary' | 'secondary' | 'danger' | 'gray';
type Size = 'lg' | 'md' | 'sm';

type Props<T extends React.ElementType> = {
  as?: T;
  variant?: Variant;
  size?: Size;
} & React.ComponentPropsWithRef<T>;

type Component = <T extends React.ElementType>(props: Props<T>) => React.ReactElement | null;

const Button: Component = ({ as, variant = 'primary', size = 'md', ...props }) => {
  const Element = as || 'button';
  return <Element className={`${styles.common} ${styles[variant]} ${styles[size]}`} {...props} />;
};

export default Button;
