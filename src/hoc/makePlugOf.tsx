import { Slot } from '../primitives/Slot';
import { forwardRef, type ComponentPropsWithoutRef, type ForwardedRef } from 'react';
import { joinClassNames } from '../utils/joinClassNames';

const upperFirst = (str: string) => str.charAt(0).toUpperCase() + str.slice(1);

const getPluginCompDisplayName = (slotName: string) => `Plugin.${upperFirst(slotName)}`;

export const makePlugOf = (slotName: string, className?: string) => {
  const PluginComp = forwardRef(
    (props: ComponentPropsWithoutRef<'div'>, forwardedRef: ForwardedRef<HTMLElement>) => {
      const { children, className: propsClassName, ...rest } = props;

      const mergedClassName = joinClassNames(className, propsClassName);

      return (
        <Slot {...rest} className={mergedClassName} ref={forwardedRef}>
          {children}
        </Slot>
      );
    }
  );

  PluginComp.displayName = getPluginCompDisplayName(slotName);
  return PluginComp;
};
