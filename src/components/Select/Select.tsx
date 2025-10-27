import { useRef, Children, isValidElement, type PropsWithChildren } from 'react';
import useClickOutside from '../../utils/useClickOutside';
import { SelectProvider } from './selectContext';
import { withOutlet, type OutletCompProps } from '../../hoc/withOutlet';
import { makePlugOf } from '../../hoc/makePlugOf';
import SelectOption from './components/SelectOption';
import SelectTrigger from './components/SelectTrigger';
import SelectContent from './components/SelectContent';
import { useControllableState } from '../../primitives/use-controllable-state';
import type { IOption } from './selectContext';

type SelectProps = PropsWithChildren<{
  value?: string;
  defaultValue?: string;
  onValueChange?: (value: string) => void;
  open?: boolean;
  defaultOpen?: boolean;
  onOpenChange?(open: boolean): void;
}>;

const outletNames = ['trigger', 'content'] as const;

const TriggerPlugin = makePlugOf('trigger', SelectTrigger);
const ContentPlugin = makePlugOf('content', SelectContent);

const SelectRoot = withOutlet(outletNames, (props: OutletCompProps<typeof outletNames>) => {
  const selectProps = props as OutletCompProps<typeof outletNames> & SelectProps;
  const {
    children,
    open: openProp,
    defaultOpen,
    onOpenChange,
    defaultValue,
    value: valueProp,
    onValueChange,
    outlets,
    ...rest
  } = selectProps;

  const [open, setOpen] = useControllableState({
    prop: openProp,
    defaultProp: defaultOpen ?? false,
    onChange: onOpenChange,
  });

  const [value, setValue] = useControllableState({
    prop: valueProp,
    defaultProp: defaultValue,
    onChange: onValueChange as (value: string | undefined) => void,
  });

  const findOptionsInChildren = (children: React.ReactNode): IOption[] => {
    const result: IOption[] = [];
    Children.forEach(children, child => {
      if (isValidElement(child)) {
        if (child.type === SelectOption) {
          result.push({ value: child.props.value, label: child.props.children });
        } else if (child.props?.children) {
          result.push(...findOptionsInChildren(child.props.children));
        }
      }
    });
    return result;
  };

  const options = findOptionsInChildren(children);

  const selected = options.find(option => option.value === value) ?? null;

  const wrapperRef = useRef<HTMLDivElement>(null);
  useClickOutside(wrapperRef, () => setOpen(false));

  const handleSetSelected = (option: IOption) => {
    setValue(option.value);
    setOpen(false);
  };

  return (
    <SelectProvider value={{ open, setOpen, selected, setSelected: handleSetSelected }}>
      <div ref={wrapperRef} className="relative w-full" {...rest}>
        {outlets.trigger}
        {outlets.content}
      </div>
    </SelectProvider>
  );
});

const Select = Object.assign(SelectRoot, {
  Trigger: TriggerPlugin,
  Content: ContentPlugin,
  Option: SelectOption,
}) as React.FC<SelectProps> & {
  Trigger: typeof TriggerPlugin;
  Content: typeof ContentPlugin;
  Option: typeof SelectOption;
};

Select.displayName = 'Select';

export default Select;
