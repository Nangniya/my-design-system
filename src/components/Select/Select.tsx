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

/**
 * Select 컴포넌트의 props 인터페이스
 */
interface SelectProps {
  /** 선택할 수 있는 옵션들의 배열 */
  options?: IOption[];
  /** 선택되지 않았을 때 표시될 텍스트 */
  placeholder?: string;
  /** 옵션이 선택되었을 때 호출되는 콜백 함수 */
  onSelect?: (option: IOption) => void;
  /** Select 컴포넌트 위에 표시될 레이블 */
  label?: string;
}

/**
 * Select 컴포넌트
 *
 * 드롭다운 형태의 선택 컴포넌트로, 사용자가 옵션 목록에서 하나를 선택할 수 있습니다.
 *
 * @example
 * ```tsx
 * const options = [
 *   { value: '1', label: '옵션 1' },
 *   { value: '2', label: '옵션 2' },
 * ];
 *
 * <Select
 *   options={options}
 *   placeholder="옵션을 선택해주세요"
 *   label="선택 항목"
 *   onSelect={(option) => console.log(option)}
 * />
 * ```
 *
 * @param options - 선택할 수 있는 옵션들의 배열
 * @param placeholder - 선택되지 않았을 때 표시될 텍스트 (기본값: '선택해 주세요.')
 * @param onSelect - 옵션이 선택되었을 때 호출되는 콜백 함수
 * @param label - Select 컴포넌트 위에 표시될 레이블
 */
const Select = ({ options = [], placeholder = '선택해 주세요.', onSelect, label }: SelectProps) => {
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
    <div>
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
