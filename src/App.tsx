import { useRef, useState } from 'react';
import TextField from './components/TextField';
import TextArea from './components/TextArea/TextArea';
import RadioGroup from './components/Radio';

const App = () => {
  const [controlledValue, setControlledValue] = useState({
    name: '',
    age: 0,
  });
  const textFieldRef = useRef<HTMLInputElement>(null);
  const [controlledRadio, setControlledRadio] = useState('1');
  const radioGroupRef = useRef<HTMLFieldSetElement>(null);

  return (
    <main className="p-8">
      <div className="space-y-8">
        <section>
          <div className="space-y-2">
            <TextField
              label="제어 TextField"
              helperText="도움말"
              value={controlledValue.name}
              onChange={value => setControlledValue(prev => ({ ...prev, name: value }))}
              placeholder="제어 value 입력"
            />
            <div className="text-xs text-gray-50">현재 값: {controlledValue.name}</div>
          </div>
        </section>
        <section>
          <TextField
            label="비제어 TextField"
            defaultValue="초기값"
            placeholder="비제어 value 입력"
            ref={textFieldRef}
          />
          <button
            onClick={() => alert(`현재 ref 값: ${textFieldRef.current?.value}`)}
            className="rounded-md bg-gray-200 px-2 py-1 text-sm"
          >
            ref 값 읽기
          </button>
        </section>
        <section>
          <TextArea label="레이블" helperText="도움말" placeholder="내용을 입력하세요" />
        </section>
        <section className="space-y-2">
          <RadioGroup
            label="제어 Radio Group"
            value={controlledRadio}
            onValueChange={(value?: string) => value && setControlledRadio(value)}
          >
            <RadioGroup.Item value="1">선택 1</RadioGroup.Item>
            <RadioGroup.Item value="2">선택 2</RadioGroup.Item>
            <RadioGroup.Item value="3" disabled>
              선택 3 (비활성)
            </RadioGroup.Item>
          </RadioGroup>
          <div className="text-xs text-gray-50">현재 값: {controlledRadio}</div>
        </section>
        <section className="space-y-2">
          <RadioGroup label="비제어 Radio Group" defaultValue="a" ref={radioGroupRef}>
            <RadioGroup.Item value="a">선택 A</RadioGroup.Item>
            <RadioGroup.Item value="b">선택 B</RadioGroup.Item>
            <RadioGroup.Item value="c">선택 C</RadioGroup.Item>
          </RadioGroup>
          <button
            onClick={() => {
              const fieldset = radioGroupRef.current;
              if (fieldset) {
                const checkedRadio = fieldset.querySelector(
                  'input[type="radio"]:checked'
                ) as HTMLInputElement;
                alert(`현재 ref 값: ${checkedRadio?.value ?? '선택되지 않음'}`);
              }
            }}
            className="rounded-md bg-gray-200 px-2 py-1 text-sm"
          >
            ref 값 읽기
          </button>
        </section>
      </div>
    </main>
  );
};

export default App;
