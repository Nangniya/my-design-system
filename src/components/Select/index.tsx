import { SelectCompound } from './Select';
import type { IOption } from './selectContext';

/**
 * Select 컴포넌트의 props 인터페이스
 */
interface SelectProps {
  /** 선택할 수 있는 옵션들의 배열 */
  options: IOption[];
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
const Select = ({ options, placeholder = '선택해 주세요.', label }: SelectProps) => {
  return (
    <SelectCompound>
      <SelectCompound.Trigger placeholder={placeholder} label={label} />
      <SelectCompound.Content>
        {options.map(option => (
          <SelectCompound.Option key={option.value} value={option.value} label={option.label} />
        ))}
      </SelectCompound.Content>
    </SelectCompound>
  );
};

export default Select;
export type { IOption };
