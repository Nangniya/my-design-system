import createContext from '../../primitives/createContext';

interface IOption {
  value: string;
  label: string;
}

interface SelectContextType {
  open: boolean;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
  selected: IOption | null;
  setSelected: React.Dispatch<React.SetStateAction<IOption | null>>;
}

const [Provider, useContext] = createContext<SelectContextType>('select');

export const SelectProvider = Provider;
export const useSelectContext = useContext;
export type { IOption, SelectContextType };
