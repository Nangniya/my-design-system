import createContext from '../../primitives/createContext';

export type RadioGroupContextValue = {
  name: string;
  selectedValue?: string | null;
  onValueChange: (value: string) => void;
  disabled?: boolean;
};

export const [RadioGroupProvider, useRadioGroupContext] =
  createContext<RadioGroupContextValue>('RadioGroup');
