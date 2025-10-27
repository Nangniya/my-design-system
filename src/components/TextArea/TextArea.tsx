import React, { forwardRef, useCallback, type ChangeEventHandler } from 'react';
import { useControllableState } from '../../primitives/use-controllable-state';

/**
 * TextArea 컴포넌트의 props 타입입니다.
 *
 * @property {string} label - 텍스트 영역의 레이블 (필수).
 * @property {string} [helperText] - 텍스트 영역 하단에 표시되는 도움말 텍스트.
 * @property {string} [error] - 에러 메시지 (값이 있으면 에러 스타일 및 메시지 표시).
 * @property {boolean} [required] - 필수 입력 여부.
 * @property {string} [id] - textarea 요소의 고유 ID (없으면 label 기반으로 자동 생성).
 * @property {string} [value] - 제어(controlled) 모드에서 사용되는 텍스트 영역의 현재 값. 이 prop이 제공되면 컴포넌트는 제어 컴포넌트가 됩니다.
 * @property {(value: string) => void} [onChange] - 텍스트 영역의 값이 변경될 때 호출되는 콜백 함수. 변경된 `string` 값을 인자로 받습니다.
 * @property {string} [defaultValue] - 비제어(uncontrolled) 모드에서 사용되는 텍스트 영역의 초기값. `value` prop이 없을 때 사용됩니다.
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
} & Omit<React.ComponentPropsWithRef<'textarea'>, 'value' | 'onChange' | 'defaultValue'>;

/**
 * 여러 줄의 텍스트를 입력받을 수 있는 TextArea 컴포넌트입니다.
 * - `label`, `helperText`, `error` 등 다양한 상태를 표시할 수 있습니다.
 * - `forwardRef`를 사용하여 내부 `textarea` 요소에 직접 접근할 수 있습니다.
 * - 제어(controlled) 및 비제어(uncontrolled) 모드를 모두 지원합니다.
 * - 글자 수 카운팅 기능을 포함합니다.
 *
 * @example
 * <TextArea label="자기소개" placeholder="자신을 소개해주세요." required />
 *
 * @example
 * // ref로 접근
 * const textAreaRef = useRef<HTMLTextAreaElement>(null);
 * <TextArea ref={textAreaRef} label="코멘트" />
 */
const TextArea = forwardRef<HTMLTextAreaElement, Props>(
  (
    {
      id,
      required,
      label,
      helperText,
      error,
      value: propValue,
      onChange: propOnChange,
      defaultValue,
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

    const handleTextAreaChange: ChangeEventHandler<HTMLTextAreaElement> = useCallback(
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
        <textarea
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
          onChange={handleTextAreaChange}
          {...props}
        />
        <div className="flex w-full">
          {showError && <p className="text-danger-50 text-sm font-medium">{error}</p>}
          <p className="ml-auto text-sm font-medium text-gray-50">
            <span className="text-primary-50">{value.length}</span>/100
          </p>
        </div>
      </div>
    );
  }
);

TextArea.displayName = 'TextArea';

export default TextArea;
