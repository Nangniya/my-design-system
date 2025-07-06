import Select from './Select';
import type { IOption } from './selectContext';

export interface SelectProps {
  options?: IOption[];
  placeholder?: string;
  className?: string;
  onSelect?: (option: IOption) => void;
  label?: string;
}

export default Select;
export type { IOption };
