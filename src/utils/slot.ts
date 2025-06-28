/**
 * props를 합치는 함수
 **/
type AnyProps = Record<string, any>;

export const mergeProps = (slotProps: AnyProps, childProps: AnyProps) => {
  const overrideProps = { ...childProps };

  for (const propName in childProps) {
    const slotPropValue = slotProps[propName];
    const childPropValue = childProps[propName];

    // 이벤트 핸들러 병합 (onClick, onSubmit 등)
    const isHandler = /^on[A-Z]/.test(propName);

    if (isHandler) {
      if (slotPropValue && childPropValue) {
        overrideProps[propName] = (...args: unknown[]) => {
          childPropValue(...args);
          slotPropValue(...args);
        };
      } else if (slotPropValue) {
        overrideProps[propName] = slotPropValue;
      }
    }
    if (propName === 'style') {
      overrideProps[propName] = { ...slotPropValue, ...childPropValue };
    }
    if (propName === 'className') {
      overrideProps[propName] = [slotPropValue, childPropValue].filter(Boolean).join(' ');
    }
  }

  return { ...slotProps, ...overrideProps };
};

type PossibleRef<T> = React.Ref<T> | undefined;

/**
 * ref를 설정하는 함수
 */
const setRef = <T>(ref: PossibleRef<T>, value: T) => {
  if (typeof ref === 'function') {
    ref(value);
  } else if (ref !== null && ref !== undefined) {
    (ref as React.MutableRefObject<T>).current = value;
  }
};

/**
 * ref를 합성하는 함수
 */
export const composeRefs = <T>(...refs: PossibleRef<T>[]) => {
  return (node: T) => refs.forEach(ref => setRef(ref, node));
};
