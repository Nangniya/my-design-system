import React, { forwardRef, useState, useImperativeHandle } from 'react';

/**
 * TextField 컴포넌트의 props 타입입니다.
 * @property {string} label - 입력 필드의 레이블(필수)
 * @property {string} [helperText] - 입력 필드 하단에 표시되는 도움말 텍스트
 * @property {string} [error] - 에러 메시지(있으면 에러 스타일 및 메시지 표시)
 * @property {boolean} [required] - 필수 입력 여부
 * @property {string} [id] - input의 id(없으면 label 기반 자동 생성)
 * @property {'input' | 'textarea'} [as] - 렌더링할 엘리먼트 타입(기본값: input)
 * @property {...React.ComponentPropsWithRef<'input'> | React.ComponentPropsWithRef<'textarea'>} 기타 input/textarea 속성
 */
type BaseProps = {
  id?: string;
  label: string;
  helperText?: string;
  error?: string;
  required?: boolean;
};

type InputProps = BaseProps & {
  as?: 'input';
} & Omit<React.ComponentPropsWithRef<'input'>, keyof BaseProps>;

type TextareaProps = BaseProps & {
  as: 'textarea';
} & Omit<React.ComponentPropsWithRef<'textarea'>, keyof BaseProps>;

type Props = InputProps | TextareaProps;

/**
 * input 또는 textarea로만 렌더링되는 TextField 컴포넌트입니다.
 * - label, helperText, error, required 등 다양한 props를 지원합니다.
 * - as prop을 통해 input 또는 textarea로 렌더링할 수 있습니다.
 * - forwardRef를 사용하여 input/textarea 요소에 직접 접근 가능합니다.
 * - HTML 기본 유효성 검사를 사용하여 typeMismatch, valueMissing 등을 감지합니다.
 *
 * @param label - 입력 필드의 레이블(필수)
 * @param helperText - 입력 필드 하단에 표시되는 도움말 텍스트
 * @param required - 필수 입력 여부
 * @param id - input의 id(없으면 label 기반 자동 생성)
 * @param as - 렌더링할 엘리먼트 타입('input' | 'textarea', 기본값: input)
 * @returns {React.ReactElement | null} 렌더링된 TextField 컴포넌트
 *
 * @example
 * // 기본 사용 예시 (input)
 * <TextField label="이름" placeholder="이름을 입력하세요" required />
 *
 * // textarea로 사용
 * <TextField as="textarea" label="소개" placeholder="자기소개를 입력하세요" />
 *
 * // ref로 접근
 * const inputRef = useRef<HTMLInputElement>(null);
 * <TextField ref={inputRef} label="이름" />
 */
const TextField = forwardRef<HTMLInputElement | HTMLTextAreaElement, Props>(
  (
    {
      as = 'input',
      label,
      helperText,
      error: externalError,
      required,
      id,
      value,
      onChange,
      ...props
    },
    ref
  ) => {
    const [internalError, setInternalError] = useState<string>('');
    const inputId = id || `textfield-${label.replace(/\s+/g, '-').toLowerCase()}`;
    const Element = as;
    const isControlled = value !== undefined && onChange !== undefined;
    const showLabel = label && label.trim() !== '';

    // 외부 에러가 있으면 우선 사용, 없으면 내부 에러 사용
    const displayError = externalError || internalError;
    const showError = !!displayError;

    // HTML 유효성 검사 이벤트 핸들러
    const handleInvalid = (e: React.FormEvent<HTMLInputElement | HTMLTextAreaElement>) => {
      e.preventDefault();
      const target = e.target as HTMLInputElement | HTMLTextAreaElement;

      if (target.validity.valueMissing) {
        setInternalError('이 필드는 필수입니다.');
      } else if (target.validity.typeMismatch) {
        if (target.type === 'email') {
          setInternalError('올바른 이메일 형식을 입력해주세요.');
        } else if (target.type === 'url') {
          setInternalError('올바른 URL 형식을 입력해주세요.');
        } else {
          setInternalError('올바른 형식을 입력해주세요.');
        }
      } else if (target.validity.tooShort) {
        setInternalError(`최소 ${target.minLength}자 이상 입력해주세요.`);
      } else if (target.validity.tooLong) {
        setInternalError(`최대 ${target.maxLength}자까지 입력 가능합니다.`);
      } else if (target.validity.rangeUnderflow) {
        const inputTarget = target as HTMLInputElement;
        setInternalError(`최소값 ${inputTarget.min} 이상 입력해주세요.`);
      } else if (target.validity.rangeOverflow) {
        const inputTarget = target as HTMLInputElement;
        setInternalError(`최대값 ${inputTarget.max} 이하로 입력해주세요.`);
      } else if (target.validity.patternMismatch) {
        setInternalError('올바른 형식을 입력해주세요.');
      } else {
        setInternalError('입력값이 올바르지 않습니다.');
      }
    };

    // 입력 시 에러 초기화
    const handleInput = (e: React.FormEvent<HTMLInputElement | HTMLTextAreaElement>) => {
      setInternalError('');
      if (onChange) {
        // onChange 타입을 올바르게 처리
        (onChange as any)(e);
      }
    };

    // ref를 통해 input/textarea 요소에 접근할 수 있도록 설정
    useImperativeHandle(
      ref,
      () => {
        return document.getElementById(inputId) as HTMLInputElement | HTMLTextAreaElement;
      },
      [inputId]
    );

    return (
      <div className="w-full flex flex-col gap-2">
        {showLabel && (
          <label htmlFor={inputId} className="text-base font-bold">
            {label}
            {required && <span className="text-danger-50">*</span>}
          </label>
        )}
        {helperText && <p className="text-xs text-gray-50 font-medium">{helperText}</p>}
        {as === 'textarea' ? (
          <textarea
            id={inputId}
            ref={ref as React.Ref<HTMLTextAreaElement>}
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
            value={isControlled ? value : undefined}
            onChange={
              isControlled ? (onChange as React.ChangeEventHandler<HTMLTextAreaElement>) : undefined
            }
            onInvalid={handleInvalid as React.FormEventHandler<HTMLTextAreaElement>}
            onInput={handleInput as React.FormEventHandler<HTMLTextAreaElement>}
            {...(props as React.ComponentPropsWithRef<'textarea'>)}
          />
        ) : (
          <input
            id={inputId}
            ref={ref as React.Ref<HTMLInputElement>}
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
            value={isControlled ? value : undefined}
            onChange={
              isControlled ? (onChange as React.ChangeEventHandler<HTMLInputElement>) : undefined
            }
            onInvalid={handleInvalid as React.FormEventHandler<HTMLInputElement>}
            onInput={handleInput as React.FormEventHandler<HTMLInputElement>}
            {...(props as React.ComponentPropsWithRef<'input'>)}
          />
        )}
        {showError && <p className="text-danger-50 text-sm font-medium">{displayError}</p>}
      </div>
    );
  }
);

TextField.displayName = 'TextField';

export default TextField;
