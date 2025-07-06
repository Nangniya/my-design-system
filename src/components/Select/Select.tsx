import { useState, useRef } from 'react';
import useClickOutside from '../../utils/useClickOutside';
import { SelectProvider } from './selectContext';
import { withOutlet } from '../../hoc/withOutlet';
import { makePlugOf } from '../../hoc/makePlugOf';
import SelectOption from './SelectOption';
import SelectTrigger from './SelectTrigger';
import SelectContent from './SelectContent';
import type { IOption } from './selectContext';

const outletNames = ['trigger', 'content'] as const;

// 플러그인 컴포넌트들 생성
const TriggerPlugin = makePlugOf('trigger', SelectTrigger);
const ContentPlugin = makePlugOf('content', SelectContent);

// Select 컴포넌트를 withOutlet으로 감싸기
const SelectComponent = withOutlet(outletNames, ({ outlets, ...props }) => {
  const [open, setOpen] = useState(false);
  const [selected, setSelected] = useState<IOption | null>(null);
  const wrapperRef = useRef<HTMLDivElement>(null);
  useClickOutside(wrapperRef, () => setOpen(false));

  return (
    <SelectProvider value={{ open, setOpen, selected, setSelected }}>
      <div ref={wrapperRef} className="relative w-full" {...props}>
        {outlets.trigger}
        {outlets.content}
      </div>
    </SelectProvider>
  );
});

// 기본 Select 컴포넌트 (props로 옵션들을 받음)
interface SelectProps {
  options?: IOption[];
  placeholder?: string;
  className?: string;
  onSelect?: (option: IOption) => void;
  label?: string;
}

const Select = ({
  options = [],
  placeholder = '선택해 주세요.',
  className = '',
  onSelect,
  label,
}: SelectProps) => {
  const [open, setOpen] = useState(false);
  const [selected, setSelected] = useState<IOption | null>(null);
  const wrapperRef = useRef<HTMLDivElement>(null);

  useClickOutside(wrapperRef, () => setOpen(false));

  const handleSelect = (option: IOption) => {
    setSelected(option);
    setOpen(false);
    onSelect?.(option);
  };

  return (
    <div className={className}>
      {label && (
        <label htmlFor="select" className="font-bold block mb-2">
          {label}
        </label>
      )}
      <SelectProvider value={{ open, setOpen, selected, setSelected }}>
        <div ref={wrapperRef} className="relative w-full">
          <SelectTrigger placeholder={placeholder} />
          <SelectContent>
            {options.map(option => (
              <SelectOption
                key={option.value}
                value={option.value}
                label={option.label}
                onClick={() => handleSelect(option)}
              />
            ))}
          </SelectContent>
        </div>
      </SelectProvider>
    </div>
  );
};

// Compound Component 패턴으로 export
const SelectWithOutlets = Object.assign(SelectComponent, {
  Trigger: TriggerPlugin,
  Content: ContentPlugin,
  Option: SelectOption,
});

// 기본 Select와 Compound Select 모두 export
export { SelectWithOutlets as SelectCompound };
export default Select;
