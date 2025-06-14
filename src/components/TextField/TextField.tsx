import React from 'react';

/**
 * TextField 컴포넌트의 props 타입입니다.
 * @template T - 렌더링할 엘리먼트 타입 (기본값: input)
 * @property {string} label - 입력 필드의 레이블(필수)
 * @property {string} [helperText] - 입력 필드 하단에 표시되는 도움말 텍스트
 * @property {string} [error] - 에러 메시지(있으면 에러 스타일 및 메시지 표시)
 * @property {boolean} [required] - 필수 입력 여부
 * @property {(value: string) => boolean} [validate] - 입력값 유효성 검사 함수(선택)
 * @property {string} [id] - input의 id(없으면 label 기반 자동 생성)
 * @property {T} [as] - 렌더링할 엘리먼트 타입(기본값: input)
 * @property {...React.ComponentPropsWithRef<T>} 기타 input/textarea 속성
 */
type Props<T extends React.ElementType> = {
  id?: string;
  as?: T;
  label: string;
  helperText?: string;
  error?: string;
  required?: boolean;
} & React.ComponentPropsWithRef<T>;

/**
 * Polymorphic TextField 컴포넌트 타입입니다.
 * @template T - 렌더링할 엘리먼트 타입(기본값: input)
 * @param {Props<T>} props - TextField에 전달할 props
 * @returns {React.ReactElement | null}
 */
type Component = <T extends React.ElementType>(props: Props<T>) => React.ReactElement | null;

/**
 * Polymorphic한 TextField 컴포넌트입니다.
 * - label, helperText, error, required, validate 등 다양한 props를 지원합니다.
 * - as prop을 통해 input, textarea 등 다양한 엘리먼트로 렌더링할 수 있습니다.
 * - 제어/비제어 방식 모두 지원합니다.
 *
 * @param label - 입력 필드의 레이블(필수)
 * @param helperText - 입력 필드 하단에 표시되는 도움말 텍스트
 * @param error - 에러 메시지(있으면 에러 스타일 및 메시지 표시)
 * @param required - 필수 입력 여부
 * @param id - input의 id(없으면 label 기반 자동 생성)
 * @param as - 렌더링할 엘리먼트 타입(기본값: input)
 * @returns {React.ReactElement | null} 렌더링된 TextField 컴포넌트
 *
 * @example
 * // 기본 사용 예시
 * <TextField label="이름" placeholder="이름을 입력하세요" required />
 *
 * // textarea로 사용
 * <TextField as="textarea" label="소개" placeholder="자기소개를 입력하세요" />
 */
const TextField: Component = ({
  as,
  label,
  helperText,
  error,
  required,
  id,
  ref,
  value,
  onChange,
  ...props
}) => {
  const inputId = id || `textfield-${label.replace(/\s+/g, '-').toLowerCase()}`;
  const Element = as || 'input';
  const isControlled = value !== undefined && onChange !== undefined;
  const showError = Boolean(error);

  return (
    <div className="w-full flex flex-col gap-2">
      <label htmlFor={inputId} className="text-base font-bold">
        {label}
        {required && <span className="text-danger-50">*</span>}
      </label>
      {helperText && <p className="text-xs text-gray-50 font-medium">{helperText}</p>}
      <Element
        id={inputId}
        ref={ref}
        className={`
            w-full rounded-md border px-4 py-3
            ${
              showError
                ? 'border-danger-50 focus:border-danger-50 focus:ring-danger-20'
                : 'border-gray-70 focus:border-info-40 focus:ring-info-20'
            }
            outline-none transition-colors duration-200 placeholder-gray-30
          `}
        value={isControlled ? value : undefined}
        onChange={isControlled ? onChange : undefined}
        {...props}
      />
      {showError && <p className="text-danger-50 text-sm font-medium">{error}</p>}
    </div>
  );
};

export default TextField;
