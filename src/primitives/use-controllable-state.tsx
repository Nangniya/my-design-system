import * as React from 'react';

type ChangeHandler<T> = (state: T) => void;
type SetStateFn<T> = React.Dispatch<React.SetStateAction<T>>;

export type UseControllableStateParams<T> = {
  prop?: T | undefined;
  defaultProp: T;
  onChange?: ChangeHandler<T>;
};

export type UseControllableStateReturn<T> = [T, SetStateFn<T>];

export type UseUncontrolledStateParams<T> = Omit<UseControllableStateParams<T>, 'prop'>;
export type UseUncontrolledStateReturn<T> = [
  Value: T,
  setValue: React.Dispatch<React.SetStateAction<T>>,
  OnChangeRef: React.RefObject<ChangeHandler<T> | undefined>
];

export const useControllableState = <T,>({
  prop,
  defaultProp,
  onChange = () => {},
}: UseControllableStateParams<T>): UseControllableStateReturn<T> => {
  const [uncontrolledProp, setUncontrolledProp, onChangeRef] = useUncontrolledState({
    defaultProp,
    onChange,
  });
  const isControlled = prop !== undefined;
  const value = isControlled ? prop : uncontrolledProp;

  const setValue = React.useCallback<SetStateFn<T>>(
    nextValue => {
      if (isControlled) {
        const value = isFunction(nextValue) ? nextValue(prop) : nextValue;
        if (value !== prop) onChangeRef.current?.(value);
      } else {
        setUncontrolledProp(nextValue);
      }
    },
    [isControlled, prop, setUncontrolledProp, onChangeRef]
  );

  return [value, setValue];
};

export const useUncontrolledState = <T,>({
  defaultProp,
  onChange,
}: UseUncontrolledStateParams<T>): UseUncontrolledStateReturn<T> => {
  const [value, setValue] = React.useState(defaultProp);
  const prevValueRef = React.useRef(value);

  const onChangeRef = React.useRef(onChange);
  React.useInsertionEffect(() => {
    onChangeRef.current = onChange;
  }, [onChange]);

  React.useEffect(() => {
    if (prevValueRef.current !== value) {
      onChangeRef.current?.(value);
      prevValueRef.current = value;
    }
  }, [value, prevValueRef]);

  return [value, setValue, onChangeRef];
};

const isFunction = (value: unknown) => typeof value === 'function';
