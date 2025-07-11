import React from 'react';
import { useFormContext } from '../formContext';

interface FormSubmitProps {
  children?: React.ReactNode;
  disabled?: boolean;
}

const FormSubmit: React.FC<FormSubmitProps> = ({ children }) => {
  const { onSubmit, formRef } = useFormContext();

  if (!children) return null;

  // 폼 값 수집 함수
  const collectFormValues = (): Record<string, any> => {
    const form = formRef.current;
    if (!form) return {};

    const formData = new FormData(form);
    const values: Record<string, any> = {};

    // FormData에서 값들을 객체로 변환
    for (const [key, value] of formData.entries()) {
      values[key] = value;
    }

    return values;
  };

  // 폼 유효성 검사 함수
  const validateForm = (): boolean => {
    const form = formRef.current;
    if (!form) return false;

    // 폼 내 모든 input, textarea, select 요소 가져오기
    const inputs = form.querySelectorAll('input, textarea, select');
    let isValid = true;

    inputs.forEach(input => {
      const element = input as HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement;

      // 각 요소의 유효성 검사 실행
      if (!element.checkValidity()) {
        // reportValidity()는 브라우저 기본 UI를 표시하므로 호출하지 않음
        // 대신 invalid 이벤트를 수동으로 발생시켜 TextField의 내부 에러 처리 활성화
        const invalidEvent = new Event('invalid', { bubbles: true, cancelable: true });
        element.dispatchEvent(invalidEvent);
        isValid = false;
      }
    });

    return isValid;
  };

  // 자식 컴포넌트에 제출 기능 전달
  if (React.isValidElement(children)) {
    return React.cloneElement(children, {
      onClick: (e: React.MouseEvent) => {
        // 기존 onClick이 있으면 실행
        if (children.props.onClick) children.props.onClick(e);

        // 폼 유효성 검사
        if (validateForm()) {
          // 유효성 검사 통과 시에만 폼 값 수집 후 onSubmit 실행
          const formValues = collectFormValues();
          onSubmit(formValues);
        }
        // 유효성 검사 실패 시에는 아무것도 하지 않음 (에러 메시지는 TextField에서 자동 표시)
      },
      ...children.props,
    });
  }

  // children이 유효한 React 요소가 아니면 null 반환
  return null;
};

export default FormSubmit;
