import { useState, useRef } from 'react';
import useClickOutside from '../../utils/useClickOutside';
import { SelectProvider } from './selectContext';
import { withOutlet } from '../../hoc/withOutlet';
import { makePlugOf } from '../../hoc/makePlugOf';
import SelectOption from './SelectOption';
import SelectTrigger from './SelectTrigger';
import SelectContent from './SelectContent';
import type { IOption } from './selectContext';

const outletNames = ['trigger', 'content'] as const;

// 플러그인 컴포넌트들 생성
const TriggerPlugin = makePlugOf('trigger', SelectTrigger);
const ContentPlugin = makePlugOf('content', SelectContent);

// Select 컴포넌트를 withOutlet으로 감싸기
const SelectComponent = withOutlet(outletNames, ({ outlets, ...props }) => {
  const [open, setOpen] = useState(false);
  const [selected, setSelected] = useState<IOption | null>(null);
  const wrapperRef = useRef<HTMLDivElement>(null);
  useClickOutside(wrapperRef, () => setOpen(false));

  return (
    <SelectProvider value={{ open, setOpen, selected, setSelected }}>
      <div ref={wrapperRef} className="relative w-full" {...props}>
        {outlets.trigger}
        {outlets.content}
      </div>
    </SelectProvider>
  );
});

// Compound Component 패턴으로 export
const Select = Object.assign(SelectComponent, {
  Trigger: TriggerPlugin,
  Content: ContentPlugin,
  Option: SelectOption,
});

export default Select;
