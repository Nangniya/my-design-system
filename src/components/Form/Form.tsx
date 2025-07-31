import React, { useCallback, useState, useRef } from 'react';
import FormControl from './components/FormControl';
import FormSubmit from './components/FormSubmit';
import { FormProvider, type FormContextType, type FormState } from './formContext';

// Form 컴포넌트 props 타입
interface FormProps {
  initialValues?: Record<string, any>;
  onSubmit: (values: Record<string, any>) => void;
  children?: React.ReactNode;
  style?: React.CSSProperties;
}

const FormContainer: React.FC<FormProps> = ({
  children,
  initialValues = {},
  onSubmit,
  ...props
}) => {
  const [formState, setFormState] = useState<FormState>({
    values: initialValues,
  });

  const formRef = useRef<HTMLFormElement>(null);

  // 필드 값 가져오기
  const getFieldValue = useCallback(
    (name: string) => {
      return formState.values[name];
    },
    [formState.values]
  );

  // 필드 값 설정
  const setFieldValue = useCallback((name: string, value: any) => {
    setFormState(prev => ({
      ...prev,
      values: {
        ...prev.values,
        [name]: value,
      },
    }));
  }, []);

  // 폼 리셋
  const reset = useCallback(() => {
    setFormState({
      values: initialValues,
    });
  }, [initialValues]);

  const contextValue: FormContextType = {
    formState,
    onSubmit,
    getFieldValue,
    setFieldValue,
    reset,
    formRef,
  };

  return (
    <FormProvider value={contextValue}>
      <form ref={formRef} {...props}>
        {children}
      </form>
    </FormProvider>
  );
};

// Compound Component 패턴으로 export
const Form = Object.assign(FormContainer, {
  Control: FormControl,
  Submit: FormSubmit,
});

export default Form;
