import { forwardRef, useCallback, type ChangeEventHandler } from 'react';
import { useControllableState } from '../../primitives/use-controllable-state';

/**
 * TextField 컴포넌트의 props 타입입니다.
 *
 * @property {string} label - 입력 필드의 레이블 (필수).
 * @property {string} [helperText] - 입력 필드 하단에 표시되는 도움말 텍스트.
 * @property {string} [error] - 에러 메시지 (값이 있으면 에러 스타일 및 메시지 표시).
 * @property {boolean} [required] - 필수 입력 여부.
 * @property {string} [id] - input 요소의 고유 ID (없으면 label 기반으로 자동 생성).
 * @property {string} [value] - 제어(controlled) 모드에서 사용되는 입력 필드의 현재 값.
 * @property {(value: string) => void} [onChange] - 입력 필드의 값이 변경될 때 호출되는 콜백 함수.
 * @property {string} [defaultValue] - 비제어(uncontrolled) 모드에서 사용되는 입력 필드의 초기값.
 */
type Props = {
  id?: string;
  required?: boolean;
  label: string;
  helperText?: string;
  error?: string;
  value?: string;
  onChange?: (value: string) => void;
  defaultValue?: string;
} & Omit<React.ComponentPropsWithRef<'input'>, 'value' | 'onChange' | 'defaultValue'>;

/**
 * 표준 HTML input 요소를 기반으로 확장된 텍스트 입력 필드 컴포넌트입니다.
 * - `label`, `helperText`, `error` 등 UI 상태를 표현하는 다양한 props를 제공합니다.
 * - `forwardRef`를 지원하여 내부 `input` 요소에 직접 접근할 수 있습니다.
 * - 제어(controlled) 및 비제어(uncontrolled) 모드를 모두 지원하여 유연한 상태 관리가 가능합니다.
 *
 * @param {Props} props - `Omit<React.ComponentPropsWithRef<'input'>, 'value' | 'onChange' | 'defaultValue'>`를 포함하여,
 *                        `value`, `onChange`, `defaultValue`를 제외한 모든 표준 `input` 태그 속성을 지원합니다.
 * @returns {React.ReactElement} 렌더링된 TextField 컴포넌트
 *
 * @example
 * // 기본 사용법
 * <TextField label="이름" placeholder="이름을 입력하세요" required />
 *
 * @example
 * // ref로 input 요소에 직접 접근
 * const inputRef = useRef<HTMLInputElement>(null);
 * <TextField ref={inputRef} label="이메일" />
 */
const TextField = forwardRef<HTMLInputElement, Props>(
  (
    {
      id,
      required,
      label,
      helperText,
      value: propValue,
      onChange: propOnChange,
      defaultValue,
      error,
      ...props
    },
    ref
  ) => {
    const inputId = id || `textfield-${label.replace(/\s+/g, '-').toLowerCase()}`;
    const showLabel = label && label.trim() !== '';
    const showError = !!error;

    const [value, setValue] = useControllableState<string>({
      prop: propValue,
      defaultProp: defaultValue ?? '',
      onChange: propOnChange,
    });

    const handleInputChange: ChangeEventHandler<HTMLInputElement> = useCallback(
      e => {
        setValue(e.target.value);
      },
      [setValue]
    );

    return (
      <div className="w-full flex flex-col gap-2">
        {showLabel && (
          <label htmlFor={inputId} className="text-base font-medium">
            {label}
            {required && <span className="text-danger-50">*</span>}
          </label>
        )}
        {helperText && <p className="text-xs text-gray-50 font-medium">{helperText}</p>}
        <input
          id={inputId}
          ref={ref}
          required={required}
          className={`
                w-full rounded-md border px-4 py-3
                ${
                  showError
                    ? 'border-danger-50 focus:border-danger-50 focus:ring-danger-20'
                    : 'border-gray-70 focus:border-info-40 focus:ring-info-20'
                }
                outline-none transition-colors duration-200 placeholder-gray-30
              `}
          value={value}
          onChange={handleInputChange}
          {...(props as React.ComponentPropsWithRef<'input'>)}
        />
        {showError && <p className="text-danger-50 text-sm font-medium">{error}</p>}
      </div>
    );
  }
);

TextField.displayName = 'TextField';

export default TextField;
