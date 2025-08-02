import createContext from '../../primitives/createContext';

interface IOption {
  value: any;
  label: string;
}

interface SelectContextType {
  open: boolean;
  setOpen: (open: boolean) => void;
  selected: IOption | null;
  setSelected: (option: IOption) => void;
}

export const [SelectProvider, useSelectContext] = createContext<SelectContextType>('select');
export type { IOption, SelectContextType };
