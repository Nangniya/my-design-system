import { forwardRef, useCallback, type ChangeEventHandler } from 'react';
import { useControllableState } from '../../primitives/use-controllable-state';

/**
 * TextField 컴포넌트의 props 타입입니다.
 * @property {string} label - 입력 필드의 레이블(필수)
 * @property {string} [helperText] - 입력 필드 하단에 표시되는 도움말 텍스트
 * @property {string} [error] - 에러 메시지(있으면 에러 스타일 및 메시지 표시)
 * @property {boolean} [required] - 필수 입력 여부
 * @property {string} [id] - input의 id(없으면 label 기반 자동 생성)
 * @property {string} [defaultValue] - uncontrolled 모드에서의 초기값
 * @property {...React.ComponentPropsWithRef<'input'>} 기타 input 속성
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
 * input으로만 렌더링되는 TextField 컴포넌트입니다.
 * - label, helperText, error, required 등 다양한 props를 지원합니다.
 * - forwardRef를 사용하여 input 요소에 직접 접근 가능합니다.
 * - controlled/uncontrolled 모두 지원합니다.
 *
 * @param label - 입력 필드의 레이블(필수)
 * @param helperText - 입력 필드 하단에 표시되는 도움말 텍스트
 * @param required - 필수 입력 여부
 * @param id - input의 id(없으면 label 기반 자동 생성)
 * @param defaultValue - uncontrolled 모드에서의 초기값
 * @returns {React.ReactElement | null} 렌더링된 TextField 컴포넌트
 *
 * @example
 * <TextField label="이름" placeholder="이름을 입력하세요" required />
 *
 * // ref로 접근
 * const inputRef = useRef<HTMLInputElement>(null);
 * <TextField ref={inputRef} label="이름" />
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
