import { forwardRef, type ComponentPropsWithoutRef, type ForwardedRef } from 'react';

const upperFirst = (str: string) => str.charAt(0).toUpperCase() + str.slice(1);

const getPluginCompDisplayName = (slotName: string) => `Plugin.${upperFirst(slotName)}`;

export const makePlugOf = <T extends React.ComponentType<any>>(slotName: string, Component?: T) => {
  const PluginComp = forwardRef(
    (props: ComponentPropsWithoutRef<'div'>, forwardedRef: ForwardedRef<HTMLDivElement>) => {
      const { children, className: propsClassName, ...rest } = props;

      if (Component) {
        return (
          <Component {...(rest as any)} className={propsClassName} ref={forwardedRef}>
            {children}
          </Component>
        );
      }
      // Component가 없는 경우 기본 div 렌더링
      return (
        <div {...rest} className={propsClassName} ref={forwardedRef}>
          {children}
        </div>
      );
    }
  );

  PluginComp.displayName = getPluginCompDisplayName(slotName);
  return PluginComp;
};
