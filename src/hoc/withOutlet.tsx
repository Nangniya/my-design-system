import React, { Children, createElement, forwardRef, isValidElement } from 'react';
import type {
  ComponentPropsWithRef,
  ComponentPropsWithoutRef,
  ForwardedRef,
  ReactElement,
  ReactNode,
} from 'react';

const upperFirst = (str: string) => str.charAt(0).toUpperCase() + str.slice(1);
export const getPluginCompDisplayName = (slotName: string) => `Plugin.${upperFirst(slotName)}`;

export type ArrayValues<T extends readonly unknown[]> = T[number];

type OutletComponents<T extends readonly string[]> = {
  [key in ArrayValues<T>]: ReactElement | ReactElement[];
} & { default: ReactElement | ReactElement[] };

export interface OutletCompProps<T extends readonly string[]> extends ComponentPropsWithRef<'div'> {
  outlets: OutletComponents<T>;
}

export const withOutlet = <T extends readonly string[]>(
  outletArray: T,
  Comp: (props: OutletCompProps<T>) => React.ReactElement | null
) => {
  const OutletComp = forwardRef(
    (props: ComponentPropsWithoutRef<'div'>, forwardedRef: ForwardedRef<HTMLDivElement>) => {
      const childrenArray: ReactNode[] = Children.toArray(props.children);

      const outlets = [...outletArray, 'default'].reduce((prev, currentKey) => {
        if (currentKey === 'default') {
          const defaultChildren = childrenArray.filter(
            child => isValidElement(child) && !(child.type as any)?.displayName
          );
          return { ...prev, default: defaultChildren };
        } else {
          const pluginChildren = childrenArray.filter(
            child =>
              isValidElement(child) &&
              (child.type as any)?.displayName === getPluginCompDisplayName(currentKey)
          );
          return { ...prev, [currentKey]: pluginChildren };
        }
      }, {} as Partial<OutletComponents<T>>) as OutletComponents<T>;

      return <>{createElement(Comp, { outlets, ref: forwardedRef, ...props } as any)}</>;
    }
  );
  OutletComp.displayName = 'Outlet';
  return OutletComp;
};
