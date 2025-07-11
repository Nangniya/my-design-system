import createContext from '../../primitives/createContext';

// 폼 상태 타입
interface FormState {
  values: Record<string, any>;
}

// 폼 컨텍스트 타입
interface FormContextType {
  // 폼 상태
  formState: FormState;

  // 폼 제출 함수
  onSubmit: (values: Record<string, any>) => void;

  // 필드 값 관리
  getFieldValue: (name: string) => any;
  setFieldValue: (name: string, value: any) => void;

  // 폼 전체 관리
  reset: () => void;

  // 폼 요소 참조
  formRef: React.RefObject<HTMLFormElement>;
}

const [Provider, useContext] = createContext<FormContextType>('form');

export const FormProvider = Provider;
export const useFormContext = useContext;
export type { FormContextType, FormState };
